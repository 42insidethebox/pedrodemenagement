import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getSupabaseAdmin } from '~/lib/supabase';
import { sendContactConfirmationEmail, sendContactNotificationEmail } from '~/lib/email';
import { detectRequestLocale } from '~/lib/locale';
import { assertRateLimit } from '~/lib/rate-limit';
import { resolveTenantFromRequest } from '~/lib/tenants';

export const prerender = false;

export const POST: APIRoute = async ({ request, url, locals }) => {
  try {
    assertRateLimit(request, { key: 'contact', limit: 5, window: 60 });
    const ctype = request.headers.get('content-type') || '';
    let name = '',
      email = '',
      company = '',
      message = '',
      source = 'contact',
      tenantOverride = '';
    if (ctype.includes('application/json')) {
      const data = await request.json().catch(() => ({}));
      name = String(data.name || '').trim();
      email = String(data.email || '').trim();
      company = String(data.company || '').trim();
      message = String(data.message || '').trim();
      source = String(data.source || 'contact').trim();
      tenantOverride = String(data.tenant || data.tenant_id || '').trim();
    } else {
      const form = await request.formData();
      name = String(form.get('name') || '').trim();
      email = String(form.get('email') || '').trim();
      company = String(form.get('company') || '').trim();
      message = String(form.get('message') || form.get('textarea') || '').trim();
      source = String(form.get('source') || 'contact').trim();
      tenantOverride = String(form.get('tenant') || form.get('tenant_id') || '').trim();

      const ignoredFields = new Set([
        'tenant',
        'tenant_id',
        'source',
        'locale',
        'name',
        'email',
        'company',
        'message',
        'textarea',
        'disclaimer',
      ]);
      const submittedContext = new Map<string, string[]>();

      for (const [rawKey, rawValue] of form.entries()) {
        const key = rawKey.replace(/\[\]$/, '');
        if (ignoredFields.has(key) || typeof rawValue !== 'string' || !rawValue.trim()) continue;
        const values = submittedContext.get(key) ?? [];
        values.push(rawValue.trim());
        submittedContext.set(key, values);
      }

      if (submittedContext.size) {
        const context = Array.from(submittedContext.entries())
          .map(([key, values]) => `${key}: ${values.join(', ')}`)
          .join('\n');
        message = [message, `Contexte formulaire:\n${context}`].filter(Boolean).join('\n\n');
      }
    }
    const tenant = tenantOverride
      ? resolveTenantFromRequest(request, tenantOverride)
      : ((locals?.tenant as ReturnType<typeof resolveTenantFromRequest> | undefined) ??
        resolveTenantFromRequest(request));

    const sb = getSupabaseAdmin();
    if (sb) {
      await sb.from('leads').insert({ name, email, company, message, source, tenant_id: tenant.slug });
    }

    const locale = detectRequestLocale(request, url);

    if (ENV.RESEND_API_KEY && email) {
      await sendContactNotificationEmail({
        name,
        email,
        company,
        message,
        source,
        locale,
        tenant,
      });
      await sendContactConfirmationEmail({
        to: email,
        name,
        message,
        locale,
        tenant,
      });
    }

    // Optional Zapier hook
    if (ENV.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(ENV.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, company, message, source, tenant_id: tenant.slug }),
        });
      } catch {
        // Optional automation hook must not block contact form submissions.
      }
    }

    // Redirect HTML form submissions to a thank-you page
    if (!ctype.includes('application/json')) {
      const tenantThankYou = tenant.slug && tenant.slug !== 'pedro' ? `/${tenant.slug}/thank-you` : '/thank-you';
      const to = `${url.origin}${tenantThankYou}`;
      return new Response(null, { status: 303, headers: { Location: to } });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    if (e instanceof Response) return e;
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), { status: 500 });
  }
};
