import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getSupabaseAdmin } from '~/lib/supabase';
import { sendContactConfirmationEmail, sendContactNotificationEmail } from '~/lib/email';
import { detectRequestLocale } from '~/lib/locale';
import { assertRateLimit } from '~/lib/rate-limit';
import { resolveTenantFromRequest } from '~/lib/tenants';

export const prerender = false;

const MAX_CONTACT_BODY_BYTES = 64 * 1024;
const MIN_FORM_AGE_MS = 1800;
const MAX_FIELD_LENGTH = 5000;
const HONEYPOT_FIELDS = ['website_url', 'company_url', 'fax_number'];

function getSubmittedValue(fields: Map<string, string[]>, key: string) {
  return (fields.get(key)?.[0] || '').trim();
}

function isHtmlFormSubmission(contentType: string) {
  return !contentType.includes('application/json');
}

function sameOriginOrNoOrigin(request: Request, url: URL) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === url.host;
  } catch {
    return false;
  }
}

function botResponse(contentType: string) {
  if (isHtmlFormSubmission(contentType)) return new Response(null, { status: 204 });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

function isTooFastSubmission(fields: Map<string, string[]>) {
  const raw = getSubmittedValue(fields, 'form_started_at');
  if (!raw) return false;
  const startedAt = Number(raw);
  if (!Number.isFinite(startedAt)) return true;
  return Date.now() - startedAt < MIN_FORM_AGE_MS;
}

function hasHoneypotValue(fields: Map<string, string[]>) {
  return HONEYPOT_FIELDS.some((field) => Boolean(getSubmittedValue(fields, field)));
}

function tooManyLinks(value: string) {
  const matches = value.match(/https?:\/\/|www\./gi);
  return (matches?.length || 0) > 5;
}

function classifyIopartnerRequest(source: string, fields: Map<string, string[]>) {
  if (!source.startsWith('iopartner-') && source !== 'standard-deployment-offer') return '';

  const needType = getSubmittedValue(fields, 'need_type');
  const budget = getSubmittedValue(fields, 'budget');
  const timeline = getSubmittedValue(fields, 'timeline');
  const decisionMaker = getSubmittedValue(fields, 'decision_maker');

  if (source === 'standard-deployment-offer') return 'standard-website';
  if (needType === 'referral') return 'referral';
  if (needType === 'quick_question') return 'consulting-60';
  if (needType === 'consulting') return timeline === 'urgent' ? 'consulting-60' : 'consulting-140';
  if (needType === 'standard_website') return 'standard-website';
  if (needType === 'website_plus') return 'website-plus';
  if (needType === 'custom_software' || needType === 'automation') return 'project-proposal';
  if (budget === 'under_500') return 'free-response';
  if (budget === '1000_1500') return 'standard-website';
  if (budget === '1500_2500') return 'website-plus';
  if (budget === '2500_5000' || budget === '5000_plus') return 'project-proposal';
  if (timeline === 'urgent') return 'consulting-60';
  if (decisionMaker === 'other' || decisionMaker === 'not_sure') return 'free-response';

  return 'free-response';
}

function recommendationLabel(nextStep: string) {
  switch (nextStep) {
    case 'consulting-60':
      return 'Prochaine etape probable: consultation courte CHF 60 / 15 min';
    case 'consulting-140':
      return 'Prochaine etape probable: consulting CHF 140 / h';
    case 'standard-website':
      return 'Prochaine etape probable: site standard CHF 999';
    case 'website-plus':
      return 'Prochaine etape probable: site standard plus CHF 1 500';
    case 'project-proposal':
      return 'Prochaine etape probable: cadrage projet / proposition sur mesure';
    case 'referral':
      return 'Prochaine etape probable: recommandation externe ou orientation';
    case 'free-response':
      return 'Prochaine etape probable: reponse initiale gratuite';
    default:
      return '';
  }
}

export const POST: APIRoute = async ({ request, url, locals }) => {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_CONTACT_BODY_BYTES) {
      return new Response(JSON.stringify({ ok: false, error: 'Payload too large' }), { status: 413 });
    }

    assertRateLimit(request, { key: 'contact', limit: 3, window: 60 });
    const ctype = request.headers.get('content-type') || '';
    if (!sameOriginOrNoOrigin(request, url)) return botResponse(ctype);

    const submittedContext = new Map<string, string[]>();
    const protectionContext = new Map<string, string[]>();
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

      for (const [rawKey, rawValue] of Object.entries(data)) {
        if (typeof rawValue !== 'string' || !rawValue.trim()) continue;
        const key = rawKey.replace(/\[\]$/, '');
        const value = rawValue.trim().slice(0, MAX_FIELD_LENGTH);
        if (key === 'form_started_at' || HONEYPOT_FIELDS.includes(key)) {
          protectionContext.set(key, [value]);
          continue;
        }
        submittedContext.set(key, [value]);
      }
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
        'form_started_at',
        ...HONEYPOT_FIELDS,
      ]);

      for (const [rawKey, rawValue] of form.entries()) {
        const key = rawKey.replace(/\[\]$/, '');
        if (typeof rawValue !== 'string' || !rawValue.trim()) continue;
        if (key === 'form_started_at' || HONEYPOT_FIELDS.includes(key)) {
          protectionContext.set(key, [rawValue.trim().slice(0, MAX_FIELD_LENGTH)]);
          continue;
        }
        if (ignoredFields.has(key)) continue;
        const values = submittedContext.get(key) ?? [];
        values.push(rawValue.trim().slice(0, MAX_FIELD_LENGTH));
        submittedContext.set(key, values);
      }
    }

    if (hasHoneypotValue(protectionContext) || isTooFastSubmission(protectionContext)) return botResponse(ctype);

    if (submittedContext.size) {
      const context = Array.from(submittedContext.entries())
        .map(([key, values]) => `${key}: ${values.join(', ')}`)
        .join('\n');
      message = [message, `Contexte formulaire:\n${context}`].filter(Boolean).join('\n\n');
    }

    if (tooManyLinks([name, email, company, message].join('\n'))) return botResponse(ctype);

    const nextStep = classifyIopartnerRequest(source, submittedContext);
    const label = recommendationLabel(nextStep);
    if (label) {
      message = [message, label].filter(Boolean).join('\n\n');
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
      const tenantThankYou =
        tenant.source === 'host' || !tenant.slug || tenant.slug === 'pedro'
          ? '/thank-you'
          : `/${tenant.slug}/thank-you`;
      const nextQuery = nextStep ? `?next=${encodeURIComponent(nextStep)}` : '';
      const to = `${url.origin}${tenantThankYou}${nextQuery}`;
      return new Response(null, { status: 303, headers: { Location: to } });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    if (e instanceof Response) return e;
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), { status: 500 });
  }
};
