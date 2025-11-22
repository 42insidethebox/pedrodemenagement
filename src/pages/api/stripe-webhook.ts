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
  sanitizeOrderDbPayload,
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

      let orderRecord = {
        ...draft,
        order_number: draft.order_number || (await generateOrderNumber()),
        plan: draft.plan || metadata.plan || null,
        template_key: draft.template_key || metadata.template || null,
        customer_name: draft.customer_name || metadata.name || null,
        company: draft.company || metadata.company || null,
        phone: draft.phone || metadata.phone || null,
      } as any;

      if (sb) {
        const dbPayload = sanitizeOrderDbPayload(orderRecord);
        const { data, error } = await sb.from('orders').insert(dbPayload).select('*').maybeSingle();
        if (error) {
          console.error('Failed to insert order from Stripe webhook', { error, dbPayload });
        } else if (data) {
          orderRecord = { ...orderRecord, ...data };
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
        try { await updateOrderStatusBySubscriptionId(String(inv.subscription), 'paid'); } catch (err) {
          console.error('Failed to mark order paid from invoice.paid', err);
        }
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      try { await updateOrderStatusBySubscriptionId(String(sub.id), 'cancelled'); } catch (err) {
        console.error('Failed to mark order cancelled from subscription.deleted', err);
      }
    }

    if (event.type === 'checkout.session.completed') {
      try { await triggerTemplateDeployment(event.data.object); } catch {}
    }
  } catch (e) {
    console.error('Stripe webhook handler failed', e);
    return new Response('error', { status: 500 });
  }

  return new Response('ok');
};
