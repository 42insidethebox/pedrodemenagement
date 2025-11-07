import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getStripe } from '~/lib/stripe';
import { getSupabaseAdmin } from '~/lib/supabase';
import {
  buildOrderDraftFromSession,
  extractMetadataFromSession,
  generateOrderNumber,
  logSystemEvent,
  updateOrderStatusInSupabase,
  updateOrderStatusBySubscriptionId,
} from '~/lib/orders';
import { provisionWebsiteWorkspace, shareFileWithEmail } from '~/lib/google-docs';
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
      const session = event.data.object;
      const draft = buildOrderDraftFromSession(session);
      const metadata = draft.metadata ?? extractMetadataFromSession(session);

      let orderRecord = { ...draft, order_number: await generateOrderNumber() } as any;

      if (sb) {
        for (let attempt = 0; attempt < 5; attempt += 1) {
          const payload = { ...orderRecord, order_number: attempt === 0 ? orderRecord.order_number : await generateOrderNumber() };
          const { data, error } = await sb.from('orders').insert(payload).select('*').maybeSingle();
          if (!error && data) {
            orderRecord = data;
            break;
          }
          if (!error) {
            orderRecord = { ...payload };
            break;
          }
          if (error && String(error.code) === '23505') {
            orderRecord = { ...payload };
            continue;
          }
          if (error) {
            orderRecord = { ...payload };
            break;
          }
        }
      }

      const emailOrder = {
        ...orderRecord,
        metadata,
        customer_email: orderRecord.customer_email || session?.customer_details?.email || metadata.email,
        plan: orderRecord.plan || metadata.plan,
        template_key: orderRecord.template_key || metadata.template,
      };

      try {
        const projectName = metadata?.company || metadata?.name || 'Projet TonSiteWeb';
        const workspace = await provisionWebsiteWorkspace(`${projectName} – ${emailOrder.order_number || 'Projet'}`);
        if (workspace?.docId) {
          (emailOrder as any).content_doc_url = `https://docs.google.com/document/d/${workspace.docId}/edit`;
          if (emailOrder.customer_email) {
            try { await shareFileWithEmail(workspace.docId, String(emailOrder.customer_email), 'writer'); } catch {}
          }
        }
      } catch {}

      try { await logSystemEvent('order.created', { session_id: session.id, order_number: emailOrder.order_number, metadata }); } catch {}
      try { await sendAdminNotificationEmail(emailOrder); } catch {}
      try { await sendClientConfirmationEmail(emailOrder); } catch {}
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
