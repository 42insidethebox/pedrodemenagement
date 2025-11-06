import { randomBytes } from 'crypto';

import { getSupabaseAdmin } from './supabase';
import { logger } from './logger.js';

const ORDER_PREFIX = 'TSW';
const ORDER_RANDOM_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function formatUtcDatePart(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function randomOrderSuffix(length: number) {
  const bytes = randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i += 1) {
    const index = bytes[i] % ORDER_RANDOM_ALPHABET.length;
    result += ORDER_RANDOM_ALPHABET.charAt(index);
  }
  return result;
}

export async function generateOrderNumber() {
  const base = `${ORDER_PREFIX}-${formatUtcDatePart(new Date())}`;
  const client = getSupabaseAdmin();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const suffix = randomOrderSuffix(4 + attempt);
    const candidate = `${base}-${suffix}`;
    if (!client) return candidate;

    const { data } = await client.from('orders').select('id').eq('order_number', candidate).maybeSingle();
    if (!data) return candidate;
  }

  // As a final fallback, include a timestamp-based suffix to avoid blocking order creation.
  const fallback = `${base}-${Date.now().toString(36).toUpperCase()}`;
  return fallback;
}

export type OrderStatus = 'pending' | 'paid' | 'active' | 'cancelled' | 'unpaid' | 'refunded';

export async function insertOrder(data: Record<string, any>) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const payload = { ...data };
  if (!payload.order_number) {
    payload.order_number = await generateOrderNumber();
  }
  const { data: row, error } = await sb.from('orders').insert(payload).select('*').single();
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

export function buildOrderDraftFromSession(session: any) {
  const metadata = extractMetadataFromSession(session);
  const amount = typeof session?.amount_total === 'number' ? session.amount_total : null;

  return {
    stripe_session_id: session?.id ?? null,
    subscription_id: (session as any)?.subscription ?? null,
    customer_email: metadata.email || session?.customer_details?.email || null,
    customer_name: metadata.name || session?.customer_details?.name || null,
    company: metadata.company || null,
    phone: metadata.phone || null,
    plan: metadata.plan || null,
    template_key: metadata.template || null,
    amount_total: amount,
    currency: session?.currency || null,
    mode: session?.mode || null,
    status: session?.payment_status || null,
    metadata,
  };
}

export async function logSystemEvent(eventType: string, payload: any) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  await sb.from('webhooks').insert({ provider: 'system', type: eventType, payload });
}
