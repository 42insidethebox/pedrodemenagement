import type { APIRoute } from 'astro';
import type { User } from '@supabase/supabase-js';

import { getSupabaseAnon, getSupabaseAdmin } from '~/lib/supabase';
import { logger } from '~/lib/logger.js';

export const prerender = false;

function normalizeNext(value: unknown) {
  if (typeof value !== 'string') return null;
  if (!/^\/[a-zA-Z0-9\-_/]*$/.test(value)) return null;
  if (value.includes('..')) return null;
  return value || null;
}

export const POST: APIRoute = async ({ request }) => {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== 'object') {
    return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
  }

  const accessToken = typeof payload.accessToken === 'string' ? payload.accessToken.trim() : '';
  const refreshToken = typeof payload.refreshToken === 'string' ? payload.refreshToken.trim() : '';
  const otpToken = typeof payload.token === 'string' ? payload.token.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const expiresAt = Number(payload.expiresAt) || null;
  const requestedType = typeof payload.type === 'string' ? payload.type.trim() : 'signup';
  const allowedTypes = ['signup', 'invite', 'magiclink', 'recovery', 'email_change'] as const;
  type VerifyType = (typeof allowedTypes)[number];
  const type: VerifyType = allowedTypes.includes(requestedType as VerifyType)
    ? ((requestedType as VerifyType) ?? 'signup')
    : 'signup';
  const next = normalizeNext((payload as Record<string, unknown>).next);

  const supabase = getSupabaseAnon();
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
  }

  try {
    let user: User | null = null;
    let session: {
      accessToken: string;
      refreshToken: string | null;
      expiresAt: number | null;
    } | null = null;

    if (accessToken) {
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (error || !data?.user) {
        return new Response(JSON.stringify({ error: 'Verification token expired. Please request a new email.' }), {
          status: 401,
        });
      }
      user = data.user;
      session = {
        accessToken,
        refreshToken: refreshToken || null,
        expiresAt,
      };
    } else if (otpToken && email) {
      const { data, error } = await supabase.auth.verifyOtp({ email, token: otpToken, type });
      if (error || !data?.user) {
        logger.warn('OTP verification failed', { error, email, type });
        return new Response(JSON.stringify({ error: 'Invalid or expired confirmation code.' }), { status: 401 });
      }
      user = data.user;
      if (data.session?.access_token) {
        session = {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token ?? null,
          expiresAt: data.session.expires_at ?? null,
        };
      }
    } else {
      return new Response(JSON.stringify({ error: 'Missing verification token' }), { status: 400 });
    }

    const admin = getSupabaseAdmin();
    if (admin && user && user.id && !user.email_confirmed_at) {
      const currentUser = user;
      try {
        const { data: updated, error: updateError } = await admin.auth.admin.updateUserById(currentUser.id, {
          email_confirm: true,
        });
        if (!updateError && updated?.user) {
          user = updated.user;
        }
      } catch (error) {
        logger.warn('Unable to force email confirmation', { error, userId: currentUser.id });
      }
    }

    return new Response(
      JSON.stringify({
        user,
        session,
        next: next ?? '/app',
      }),
      { status: 200 },
    );
  } catch (error) {
    logger.error(error, { where: 'auth.verify' });
    return new Response(JSON.stringify({ error: 'Unable to verify account' }), { status: 500 });
  }
};
