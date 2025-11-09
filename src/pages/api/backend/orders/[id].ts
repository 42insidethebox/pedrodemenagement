import type { APIRoute } from 'astro';

import type { SupabaseClient } from '@supabase/supabase-js';

import { logAgencyActivity } from '~/utils/backend/activity';
import { getAgencyContext } from '~/utils/backend/context';
import { parseOrderUpdatePayload } from '~/utils/backend/validation';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

function parseOrderId(value: string | undefined) {
  if (!value) {
    throw new Error('Missing order id');
  }
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric <= 0) {
    throw new Error('Invalid order id');
  }
  return numeric;
}

async function loadOrder(client: SupabaseClient, agencyId: string, orderId: number) {
  const { data, error } = await client
    .from('orders')
    .select('*')
    .eq('agency_id', agencyId)
    .eq('id', orderId)
    .maybeSingle();

  if (error) {
    console.error('Failed to load order', error);
    throw new Error('LOAD_FAILED');
  }

  return data;
}

export const GET: APIRoute = withAuth(async ({ locals, params }) => {
  let orderId: number;
  try {
    orderId = parseOrderId(params.id ? String(params.id) : undefined);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid order id' }),
      { status: 400 },
    );
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const order = await loadOrder(client, agency.id, orderId);
    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to load order' }), { status: 500 });
    }
    console.error('Unexpected error in GET /api/backend/orders/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  let orderId: number;
  try {
    orderId = parseOrderId(params.id ? String(params.id) : undefined);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid order id' }),
      { status: 400 },
    );
  }

  let payload: ReturnType<typeof parseOrderUpdatePayload>;
  try {
    payload = parseOrderUpdatePayload(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const existing = await loadOrder(client, agency.id, orderId);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    const { data, error } = await client
      .from('orders')
      .update(payload)
      .eq('agency_id', agency.id)
      .eq('id', orderId)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to update order', error);
      return new Response(JSON.stringify({ error: 'Unable to update order' }), { status: 500 });
    }

    await logAgencyActivity(client, agency.id, 'order_updated', 'order', String(orderId), {
      before_status: existing.status ?? null,
      after_status: data.status ?? null,
      order_number: data.order_number ?? null,
    });

    return new Response(JSON.stringify({ order: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to process order' }), { status: 500 });
    }
    console.error('Unexpected error in PATCH /api/backend/orders/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  let orderId: number;
  try {
    orderId = parseOrderId(params.id ? String(params.id) : undefined);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid order id' }),
      { status: 400 },
    );
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const existing = await loadOrder(client, agency.id, orderId);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    const { error } = await client
      .from('orders')
      .delete()
      .eq('agency_id', agency.id)
      .eq('id', orderId);

    if (error) {
      console.error('Failed to delete order', error);
      return new Response(JSON.stringify({ error: 'Unable to delete order' }), { status: 500 });
    }

    await logAgencyActivity(client, agency.id, 'order_deleted', 'order', String(orderId), {
      order_number: existing.order_number ?? null,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to process order' }), { status: 500 });
    }
    console.error('Unexpected error in DELETE /api/backend/orders/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
