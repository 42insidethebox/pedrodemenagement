import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '~/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json().catch(() => ({}));
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const company = String(data.company || '').trim();
  const details = String(data.details || '').trim();

  const sb = getSupabaseAdmin();
  if (sb) {
    await sb.from('leads').insert({ name, email, company, message: details, source: 'demo' });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

