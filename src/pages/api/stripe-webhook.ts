import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getStripe } from '~/lib/stripe';
import { getSupabaseAdmin } from '~/lib/supabase';
import { extractMetadataFromSession, logSystemEvent, updateOrderStatusInSupabase, updateOrderStatusBySubscriptionId } from '~/lib/orders';
import { sendAdminNotificationEmail, sendClientConfirmationEmail } from '~/lib/email';
import { triggerTemplateDeployment } from '~/lib/deployment.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const stripe = await getStripe();
  if (!stripe) return new Response('Stripe not configured', { status: 501 });

  const sig = request.headers.get('stripe-signature');
  const whSecret = ENV.STRIPE_WEBHOOK_SECRET;
  if (!sig || !whSecret) return new Response('Missing signature', { status: 400 });

  const rawBody = await request.text();
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    const sb = getSupabaseAdmin();
    if (sb) await sb.from('webhooks').insert({ provider: 'stripe', type: event.type, payload: event });

    if (event.type === 'checkout.session.completed') {
      const s = event.data.object;
      const md = extractMetadataFromSession(s);

      if (sb)
        await sb.from('orders').insert({
          stripe_session_id: s.id,
          amount_total: s.amount_total,
          currency: s.currency,
          mode: s.mode,
          customer_email: s.customer_details?.email,
          subscription_id: (s as any).subscription || null,
          status: s.payment_status,
        });

      try { await logSystemEvent('order.created', { session_id: s.id, metadata: md }); } catch {}
      try { await sendAdminNotificationEmail({ session_id: s.id, metadata: md }); } catch {}
      try { await sendClientConfirmationEmail({ customer_email: s.customer_details?.email }); } catch {}
    }

    if (event.type === 'invoice.paid') {
      const inv = event.data.object;
      if (inv.subscription) {
        try { await updateOrderStatusBySubscriptionId(String(inv.subscription), 'paid'); } catch {}
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      try { await updateOrderStatusBySubscriptionId(String(sub.id), 'cancelled'); } catch {}
    }

    if (event.type === 'checkout.session.completed') {
      try { await triggerTemplateDeployment(event.data.object); } catch {}
    }
  } catch (e) {
    // ignore to prevent retries storms
  }

  return new Response('ok');
};
