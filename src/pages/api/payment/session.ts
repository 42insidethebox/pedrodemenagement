import type { APIRoute } from 'astro';
import { getStripe } from '~/lib/stripe';
import { fetchOrderBySessionId } from '~/lib/orders';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id') || '';
  if (!sessionId) return new Response('Missing session_id', { status: 400 });

  const stripe = await getStripe();
  if (!stripe) return new Response('Stripe not configured', { status: 501 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const order = await fetchOrderBySessionId(sessionId);
    return new Response(JSON.stringify({
      id: session.id,
      customer_email: session.customer_details?.email || null,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata || {},
      order_number: order?.order_number ?? null,
      amount_total_order: order?.amount_total ?? null,
      plan: order?.plan ?? session.metadata?.plan ?? null,
      template: order?.template_key ?? session.metadata?.template ?? null,
      locale: order?.metadata?.locale ?? session.metadata?.locale ?? null,
    }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Not found' }), { status: 404 });
  }
};

