import { getSupabaseAdmin } from './supabase';
import { logger } from './logger.js';

export type OrderStatus = 'pending' | 'paid' | 'active' | 'cancelled' | 'unpaid' | 'refunded';

export async function insertOrder(data: Record<string, any>) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data: row, error } = await sb.from('orders').insert(data).select('*').single();
  if (error) throw error;
  return row;
}

export async function updateOrder(orderId: number | string, fields: Record<string, any>) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data: row, error } = await sb.from('orders').update(fields).eq('id', orderId).select('*').single();
  if (error) throw error;
  return row;
}

export async function fetchOrderBySessionId(sessionId: string) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data: row } = await sb.from('orders').select('*').eq('stripe_session_id', sessionId).single();
  return row;
}

export async function updateOrderStatusInSupabase(sessionId: string, status: OrderStatus, extra?: Record<string, any>) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const update = { status, ...(extra || {}) } as any;
  const { data: row, error } = await sb
    .from('orders')
    .update(update)
    .eq('stripe_session_id', sessionId)
    .select('*')
    .single();
  if (error) throw error;
  return row;
}

export async function updateOrderStatusBySubscriptionId(subscriptionId: string, status: OrderStatus, extra?: Record<string, any>) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const update = { status, ...(extra || {}) } as any;
  const { data: row, error } = await sb
    .from('orders')
    .update(update)
    .eq('subscription_id', subscriptionId)
    .select('*')
    .maybeSingle();
  if (error) throw error;
  return row;
}

export function extractMetadataFromSession(session: any) {
  try {
    const md = session?.metadata || {};
    return {
      plan: String(md.plan || '').toLowerCase(),
      template: String(md.template || ''),
      name: String(md.name || ''),
      email: String(md.email || session?.customer_details?.email || ''),
      company: String(md.company || ''),
      phone: String(md.phone || ''),
      clientSlug: String(md.clientSlug || ''),
    };
  } catch (e) {
    logger.error(e as any, { where: 'extractMetadataFromSession' });
    return { plan: '', template: '', name: '', email: '', company: '', phone: '', clientSlug: '' };
  }
}

export async function logSystemEvent(eventType: string, payload: any) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  await sb.from('webhooks').insert({ provider: 'system', type: eventType, payload });
}
