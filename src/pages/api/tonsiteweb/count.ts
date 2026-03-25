import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '~/lib/supabase';

export const prerender = false;

const STATIC_FALLBACK = 47;

export const GET: APIRoute = async () => {
  const sb = getSupabaseAdmin();
  if (sb) {
    try {
      const { count, error } = await sb
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('tenant_id', 'tonsiteweb')
        .eq('status', 'paid');
      if (!error && typeof count === 'number') {
        return new Response(JSON.stringify({ count: count + STATIC_FALLBACK }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
        });
      }
    } catch (_) {}
  }
  return new Response(JSON.stringify({ count: STATIC_FALLBACK }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
  });
};
