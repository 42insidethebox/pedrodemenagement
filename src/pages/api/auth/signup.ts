import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '~/lib/supabase';
import { ENV } from '~/lib/env';
import { logger } from '~/lib/logger.js';
import { sendWelcomeEmail } from '~/lib/email';
import { assertRateLimit } from '~/lib/rate-limit';

export const prerender = false;

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  assertRateLimit(request, { key: 'auth:signup', limit: 5, window: 300 });
  const payload = await request.json().catch(() => null);
  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload?.password === 'string' ? payload.password : '';
  const fullName = typeof payload?.name === 'string' ? payload.name.trim() : '';
  const phone = typeof payload?.phone === 'string' ? payload.phone.trim() : '';

  if (!isValidEmail(email) || password.length < 8) {
    return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
  }

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      phone,
      user_metadata: { full_name: fullName, phone },
    });

    if (error) {
      const status = error.status === 409 ? 409 : 400;
      return new Response(JSON.stringify({ error: error.message }), { status });
    }

    let verifyUrl = '';
    try {
      const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
        type: 'signup',
        email,
        password,
        options: { redirectTo: `${ENV.ORIGIN}/auth/callback` },
      });
      if (!linkError) {
        verifyUrl = linkData?.properties?.action_link ?? '';
      }
    } catch (linkError: any) {
      logger.error(linkError, { where: 'auth.signup.generateLink' });
    }

    if (verifyUrl) {
      await sendWelcomeEmail(email, fullName || null, verifyUrl);
    } else {
      await sendWelcomeEmail(email, fullName || null);
    }

    return new Response(
      JSON.stringify({ id: data?.user?.id, email: data?.user?.email, status: 'pending_confirmation' }),
      { status: 201 },
    );
  } catch (error: any) {
    logger.error(error, { where: 'auth.signup' });
    return new Response(JSON.stringify({ error: 'Unable to create account' }), { status: 500 });
  }
};
