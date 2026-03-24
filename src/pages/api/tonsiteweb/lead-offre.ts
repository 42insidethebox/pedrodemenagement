import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getSupabaseAdmin } from '~/lib/supabase';
import { sendContactNotificationEmail } from '~/lib/email';
import { assertRateLimit } from '~/lib/rate-limit';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    assertRateLimit(request, { key: 'lead-offre', limit: 3, window: 3600 });

    const form = await request.formData();
    const prenom       = String(form.get('prenom') || '').trim();
    const telephone    = String(form.get('telephone') || '').trim();
    const email        = String(form.get('email') || '').trim();
    const secteur      = String(form.get('secteur') || '').trim();
    const utm_source   = String(form.get('utm_source') || '').trim();
    const utm_campaign = String(form.get('utm_campaign') || '').trim();

    if (!prenom || !telephone) {
      return new Response(null, {
        status: 303,
        headers: { Location: '/tonsiteweb/offre?error=missing' },
      });
    }

    const sb = getSupabaseAdmin();
    if (sb) {
      await sb.from('leads').insert({
        name: prenom,
        email: email || null,
        company: secteur,
        message: `TEL: ${telephone} | SECTEUR: ${secteur} | UTM: ${utm_source}/${utm_campaign}`,
        source: 'fb-offre500',
        tenant_id: 'tonsiteweb',
      });
    }

    if (ENV.RESEND_API_KEY) {
      await sendContactNotificationEmail({
        name: prenom,
        email: email || ENV.SUPPORT_EMAIL || '',
        company: secteur,
        message: `📞 RAPPELER: ${telephone}\nSecteur: ${secteur}`,
        source: `offre500 | ${utm_source}/${utm_campaign}`,
        locale: 'fr',
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: '/tonsiteweb/offre-merci' },
    });
  } catch (e) {
    if (e instanceof Response) return e;
    return new Response(null, {
      status: 303,
      headers: { Location: '/tonsiteweb/offre?error=server' },
    });
  }
};
