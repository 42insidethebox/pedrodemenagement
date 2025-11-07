import type { APIRoute } from 'astro';
import { getSupabaseAnon, getSupabaseAdmin } from '~/lib/supabase';
import { logger } from '~/lib/logger.js';
import { sendPasswordChangedEmail } from '~/lib/email';
import { detectRequestLocale } from '~/lib/locale';
import { assertRateLimit } from '~/lib/rate-limit';

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  assertRateLimit(request, { key: 'auth:reset', limit: 10, window: 300 });
  const payload = await request.json().catch(() => null);
  const token = typeof payload?.token === 'string' ? payload.token.trim() : '';
  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload?.password === 'string' ? payload.password : '';
  const locale = detectRequestLocale(request, url);

  if (!token || !email || password.length < 8) {
    return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
  }

  const anon = getSupabaseAnon();
  const admin = getSupabaseAdmin();

  if (!anon || !admin) {
    return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
  }

  try {
    const { data: verification, error: verifyError } = await anon.auth.verifyOtp({
      type: 'recovery',
      email,
      token,
    });

    if (verifyError || !verification?.user?.id) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(verification.user.id, { password });
    if (updateError) {
      logger.error(updateError, { where: 'auth.reset.updateUser' });
      return new Response(JSON.stringify({ error: 'Unable to update password' }), { status: 400 });
    }

    await sendPasswordChangedEmail(email, locale);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    logger.error(error, { where: 'auth.reset' });
    return new Response(JSON.stringify({ error: 'Unable to reset password' }), { status: 500 });
  }
};
