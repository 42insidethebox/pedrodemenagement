// src/utils/backend/services/orders.ts
import type { SupabaseClient } from '@supabase/supabase-js';

import { ApiError } from '../http';
import { ORDER_STATUSES, type OrderUpdateInput } from '../validation';

export interface OrderRecord {
  id: number;
  created_at: string;
  order_number: string;
  agency_id: string | null;
  stripe_session_id: string | null;
  subscription_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  company: string | null;
  phone: string | null;
  plan: string | null;
  template_key: string | null;
  amount_total: number | null;
  currency: string | null;
  mode: string | null;
  status: string | null;
  metadata: Record<string, unknown> | null;
}

export interface ListOrdersOptions {
  limit: number;
  statuses?: readonly string[];
}

export interface OrderMetrics {
  count: number;
  recurringCount: number;
  revenue: number;
  latest: OrderRecord | null;
}

function normalizeStatusesForQuery(statuses?: readonly string[]): string[] | undefined {
  if (!statuses || statuses.length === 0) return undefined;

  const knownStatuses = new Set<string>(ORDER_STATUSES);
  const expanded = statuses.flatMap((status) => {
    if (status === 'canceled') {
      return ['cancelled', 'canceled'];
    }
    if (status === 'cancelled') {
      return ['cancelled', 'canceled'];
    }
    return knownStatuses.has(status) ? [status] : [];
  });

  if (expanded.length === 0) {
    return undefined;
  }

  return Array.from(new Set(expanded));
}

function applyStatusFilters(
  query: ReturnType<SupabaseClient['from']>,
  statuses?: readonly string[],
) {
  const normalized = normalizeStatusesForQuery(statuses);
  if (!normalized || normalized.length === 0) {
    return query;
  }

  if (normalized.length === 1) {
    return query.eq('status', normalized[0]);
  }

  return query.in('status', normalized);
}

export async function listOrders(
  client: SupabaseClient,
  agencyId: string,
  options: ListOrdersOptions,
): Promise<OrderRecord[]> {
  const limit = Math.max(1, Math.min(options.limit, 200));

  try {
    const query = applyStatusFilters(
      client
        .from('orders')
        .select('*')
        .eq('agency_id', agencyId)
        .order('created_at', { ascending: false })
        .limit(limit),
      options.statuses,
    );

    const { data, error } = await query;
    if (error) {
      console.error('Failed to list orders', error);
      throw new ApiError(500, 'Unable to load orders');
    }

    return (data ?? []) as OrderRecord[];
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('Unexpected error while listing orders', error);
    throw new ApiError(500, 'Unable to load orders');
  }
}

export async function getOrderById(
  client: SupabaseClient,
  agencyId: string,
  id: number,
): Promise<OrderRecord> {
  const { data, error } = await client
    .from('orders')
    .select('*')
    .eq('agency_id', agencyId)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Failed to load order', error);
    throw new ApiError(500, 'Unable to load order');
  }

  if (!data) {
    throw new ApiError(404, 'Order not found');
  }

  return data as OrderRecord;
}

export async function updateOrder(
  client: SupabaseClient,
  agencyId: string,
  id: number,
  payload: OrderUpdateInput,
): Promise<OrderRecord> {
  const { data, error } = await client
    .from('orders')
    .update(payload)
    .eq('agency_id', agencyId)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to update order', error);
    throw new ApiError(500, 'Unable to update order');
  }

  if (!data) {
    throw new ApiError(404, 'Order not found');
  }

  return data as OrderRecord;
}

export async function deleteOrder(
  client: SupabaseClient,
  agencyId: string,
  id: number,
): Promise<OrderRecord> {
  const { data, error } = await client
    .from('orders')
    .delete()
    .eq('agency_id', agencyId)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to delete order', error);
    throw new ApiError(500, 'Unable to delete order');
  }

  if (!data) {
    throw new ApiError(404, 'Order not found');
  }

  return data as OrderRecord;
}

export async function computeOrderMetrics(
  client: SupabaseClient,
  agencyId: string,
  statuses?: readonly string[],
): Promise<OrderMetrics> {
  const normalized = normalizeStatusesForQuery(statuses);

  try {
    const [totalResult, recurringResult, revenueResult, latestResult] = await Promise.all([
      applyStatusFilters(
        client.from('orders').select('id', { count: 'exact', head: true }).eq('agency_id', agencyId),
        normalized,
      ),
      applyStatusFilters(
        client
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('agency_id', agencyId)
          .eq('mode', 'subscription'),
        normalized,
      ),
      applyStatusFilters(
        client.from('orders').select('amount_total').eq('agency_id', agencyId),
        normalized,
      ).in('status', ['paid', 'complete']),
      applyStatusFilters(
        client
          .from('orders')
          .select('*')
          .eq('agency_id', agencyId)
          .order('created_at', { ascending: false })
          .limit(1),
        normalized,
      ).maybeSingle(),
    ]);

    if (totalResult.error) {
      console.error('Failed to compute order count', totalResult.error);
    }
    if (recurringResult.error) {
      console.error('Failed to compute recurring order count', recurringResult.error);
    }
    if (revenueResult.error) {
      console.error('Failed to compute order revenue', revenueResult.error);
    }
    if (latestResult.error) {
      console.error('Failed to fetch latest order', latestResult.error);
    }

    const revenueRows = revenueResult.error ? [] : revenueResult.data ?? [];
    const revenue = revenueRows.reduce((sum, row) => sum + (Number(row?.amount_total) || 0), 0);

    return {
      count: totalResult.error ? 0 : totalResult.count ?? 0,
      recurringCount: recurringResult.error ? 0 : recurringResult.count ?? 0,
      revenue,
      latest: latestResult.error ? null : (latestResult.data as OrderRecord | null),
    };
  } catch (error) {
    console.error('Unexpected error while computing order metrics', error);
    return { count: 0, recurringCount: 0, revenue: 0, latest: null };
  }
}

