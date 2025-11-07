import type { APIRoute } from 'astro';

import type { SupabaseClient } from '@supabase/supabase-js';

import { sendSubscriptionUpdateEmail } from '~/lib/email';
import { getStripe } from '~/lib/stripe';
import { logAgencyActivity } from '~/utils/backend/activity';
import { getAgencyContext } from '~/utils/backend/context';
import { parseSubscriptionUpdatePayload } from '~/utils/backend/validation';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

async function storeEvent(
  client: SupabaseClient,
  agencyId: string,
  subscriptionId: string,
  eventType: string,
  payload: Record<string, unknown>,
) {
  try {
    await client.from('subscription_events').insert({
      agency_id: agencyId,
      subscription_id: subscriptionId,
      customer_email: typeof payload.customer_email === 'string' ? payload.customer_email : null,
      event_type: eventType,
      payload,
    });
  } catch (error) {
    console.error('Failed to persist subscription event', error);
  }
}

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  const subscriptionId = String(params.id || '');
  if (!subscriptionId) {
    return new Response(JSON.stringify({ error: 'Missing subscription id' }), { status: 400 });
  }

  let payload: ReturnType<typeof parseSubscriptionUpdatePayload>;
  try {
    payload = parseSubscriptionUpdatePayload(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const stripe = await getStripe();
    if (!stripe) {
      return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 503 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (!subscription) {
      return new Response(JSON.stringify({ error: 'Subscription not found' }), { status: 404 });
    }

    const params: {
      items?: Array<{ id: string; price: string }>;
      cancel_at_period_end?: boolean;
    } = {};
    let hasUpdates = false;
    if (payload.priceId) {
      const items = subscription.items?.data ?? [];
      const firstItem = items[0];
      if (!firstItem?.id) {
        return new Response(JSON.stringify({ error: 'Unable to update price for this subscription' }), { status: 400 });
      }
      params.items = [{ id: firstItem.id, price: payload.priceId }];
      hasUpdates = true;
    }
    if (payload.cancelAtPeriodEnd !== undefined) {
      params.cancel_at_period_end = payload.cancelAtPeriodEnd;
      hasUpdates = true;
    }

    if (!hasUpdates) {
      return new Response(JSON.stringify({ subscription }), { status: 200 });
    }

    const updated = await stripe.subscriptions.update(subscriptionId, params);

    await storeEvent(client, agency.id, subscriptionId, 'updated', {
      cancel_at_period_end: updated.cancel_at_period_end,
      price: payload.priceId ?? null,
      customer_email: updated.customer_email ?? null,
    });

    await logAgencyActivity(client, agency.id, 'subscription_updated', 'subscription', subscriptionId, {
      cancel_at_period_end: updated.cancel_at_period_end,
      price: payload.priceId ?? null,
    });

    const recipient = updated.customer_email || subscription.customer_email || null;
    if (recipient) {
      await sendSubscriptionUpdateEmail({
        to: recipient,
        subscriptionId,
        action: 'updated',
      });
    }

    return new Response(JSON.stringify({ subscription: updated }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in PATCH /api/backend/subscriptions/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const subscriptionId = String(params.id || '');
  if (!subscriptionId) {
    return new Response(JSON.stringify({ error: 'Missing subscription id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const stripe = await getStripe();
    if (!stripe) {
      return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 503 });
    }

    const deleted = await stripe.subscriptions.cancel(subscriptionId, { invoice_now: false, prorate: false });

    await storeEvent(client, agency.id, subscriptionId, 'canceled', {
      cancel_at_period_end: deleted.cancel_at_period_end,
      customer_email: deleted.customer_email ?? null,
    });

    await logAgencyActivity(client, agency.id, 'subscription_canceled', 'subscription', subscriptionId, {
      cancel_at_period_end: deleted.cancel_at_period_end,
    });

    const recipient = deleted.customer_email ?? null;
    if (recipient) {
      await sendSubscriptionUpdateEmail({
        to: recipient,
        subscriptionId,
        action: 'canceled',
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in DELETE /api/backend/subscriptions/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

