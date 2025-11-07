import type { APIRoute } from 'astro';

import { withAuth } from '~/utils/supabase/auth';
import { getAdminClient } from '~/utils/supabase/admin';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

function parseLimit(url: URL) {
  const value = Number(url.searchParams.get('limit') ?? '50');
  if (Number.isNaN(value) || value <= 0) return 50;
  return Math.min(Math.floor(value), 200);
}

export const GET: APIRoute = withAuth(async ({ request, locals }) => {
  try {
    const url = new URL(request.url);
    const limit = parseLimit(url);
    const statusFilter = url.searchParams.get('status')?.trim().toLowerCase();

    const client = getAdminClient(locals);
    let query = client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Failed to load orders', error);
      return new Response(JSON.stringify({ error: 'Unable to load orders' }), { status: 500 });
    }

    const orders = data ?? [];
    const totalRevenue = orders
      .filter((order) => ['paid', 'complete'].includes(String(order.status || '').toLowerCase()))
      .reduce((sum, order) => sum + (Number(order.amount_total) || 0), 0);

    const recurring = orders.filter((order) => String(order.mode || '').toLowerCase() === 'subscription');

    return new Response(
      JSON.stringify({
        orders,
        metrics: {
          count: orders.length,
          recurringCount: recurring.length,
          revenue: totalRevenue,
          latest: orders[0] ?? null,
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/orders', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

