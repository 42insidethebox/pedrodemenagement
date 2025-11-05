import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '~/lib/supabase';
import { ENV } from '~/lib/env';
import { logger } from '~/lib/logger.js';
import { sendPasswordResetEmail } from '~/lib/email';

export const prerender = false;

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  const payload = await request.json().catch(() => null);
  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : '';

  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
  }

  try {
    const redirectTo = `${ENV.ORIGIN}/auth/reset`;
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: { redirectTo },
    });

    if (error) {
      logger.error(error, { where: 'auth.forgot.generateLink' });
      // Avoid leaking user existence – return success regardless
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    const resetUrl = data?.properties?.action_link;
    if (resetUrl) {
      await sendPasswordResetEmail(email, resetUrl);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    logger.error(error, { where: 'auth.forgot' });
    return new Response(JSON.stringify({ error: 'Unable to process request' }), { status: 500 });
  }
};
