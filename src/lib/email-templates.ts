import fs from 'node:fs';
import path from 'node:path';

import { ENV } from './env';

type CTA = { label: string; url: string } | null;

export type EmailLocale = 'fr' | 'en' | 'de' | 'it';

const DEFAULT_LOCALE: EmailLocale = 'fr';
const SUPPORTED_LOCALES: EmailLocale[] = ['fr', 'en', 'de', 'it'];

const TEMPLATE_CACHE = new Map<string, TemplateDefinition>();

type TemplateDefinition = {
  subject: string;
  preheader?: string;
  body: string;
};

type TemplateRenderResult = {
  subject: string;
  preheader?: string;
  html: string;
};

function escapeHtml(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripTagsToText(html: string) {
  return String(html || '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatCurrency(amount: unknown, currency: string | null | undefined, locale: EmailLocale) {
  const value = typeof amount === 'number' ? amount : Number(amount || 0);
  if (!Number.isFinite(value)) return '—';
  const cur = currency || 'CHF';
  const localeTag =
    locale === 'fr'
      ? 'fr-CH'
      : locale === 'de'
        ? 'de-CH'
        : locale === 'it'
          ? 'it-CH'
          : 'en-CH';
  try {
    return new Intl.NumberFormat(localeTag, { style: 'currency', currency: cur.toUpperCase() }).format(value / 100);
  } catch {
    return `${(value / 100).toFixed(2)} ${cur.toUpperCase()}`.trim();
  }
}

function getBrand() {
  return {
    name: ENV.SENDER_NAME || 'TonSiteWeb.ch',
    supportEmail: ENV.SUPPORT_EMAIL || 'support@tonsiteweb.ch',
    origin: ENV.ORIGIN || 'https://tonsiteweb.ch',
    bg: '#f9fafb',
    cardBg: '#ffffff',
    text: '#0f172a',
    muted: '#475569',
    border: '#e2e8f0',
    primary: '#111827',
    primaryText: '#ffffff',
  } as const;
}

export function renderLayout({
  title,
  preheader,
  contentHtml,
  cta,
  locale = DEFAULT_LOCALE,
}: {
  title: string;
  preheader?: string;
  contentHtml: string;
  cta?: CTA;
  locale?: EmailLocale;
}) {
  const brand = getBrand();
  const lang = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const safePre = escapeHtml(preheader || stripTagsToText(contentHtml).slice(0, 140));

  return `<!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0; padding:0; background:${brand.bg}; color:${brand.text}; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;">
      <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">${safePre}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${brand.bg};">
        <tr>
          <td align="center" style="padding:24px 12px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:600px; max-width:100%; background:${brand.cardBg}; border-radius:12px; border:1px solid ${brand.border};">
              <tr>
                <td style="padding:24px 28px; border-bottom:1px solid ${brand.border};">
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; font-size:18px; font-weight:700; color:${brand.text};">
                    ${escapeHtml(brand.name)}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px;">
                  <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial; font-size:16px; line-height:24px; color:${brand.text};">
                    ${contentHtml}
                  </div>
                  ${
                    cta
                      ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td align="left" style="border-radius:8px; background:${brand.primary};">
                    <a href="${escapeHtml(cta.url)}" target="_blank" style="display:inline-block; color:${brand.primaryText}; text-decoration:none; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial; font-size:16px; line-height:20px; padding:12px 18px; border-radius:8px;">${escapeHtml(cta.label)}</a>
                  </td></tr></table>`
                      : ''
                  }
                </td>
              </tr>
              <tr>
                <td style="padding:16px 28px; border-top:1px solid ${brand.border}; background:${brand.cardBg};">
                  <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial; font-size:12px; line-height:18px; color:${brand.muted};">
                    ${escapeHtml(brand.name)} · <a href="mailto:${escapeHtml(brand.supportEmail)}" style="color:${brand.muted}; text-decoration:underline;">${escapeHtml(brand.supportEmail)}</a>
                  </div>
                </td>
              </tr>
            </table>
            <div style="height:24px; line-height:24px;">&nbsp;</div>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function resolveLocale(locale?: string | null): EmailLocale {
  if (!locale) return DEFAULT_LOCALE;
  const lower = locale.toLowerCase();
  if (SUPPORTED_LOCALES.includes(lower as EmailLocale)) {
    return lower as EmailLocale;
  }
  return DEFAULT_LOCALE;
}

function templateRoot() {
  return path.resolve(process.cwd(), 'emails');
}

function templatePath(templateKey: string, locale: EmailLocale) {
  const safeKey = templateKey.replace(/\\+/g, '/').replace(/^\/+|\/+$/g, '');
  return path.join(templateRoot(), `${safeKey}.${locale}.html`);
}

function parseTemplate(content: string): TemplateDefinition {
  const meta: Record<string, string> = {};
  let body = content;
  const metaRegex = /^<!--\s*([a-zA-Z0-9_-]+)\s*:\s*([\s\S]*?)\s*-->\s*/;
  let match = metaRegex.exec(body);
  while (match) {
    meta[match[1].toLowerCase()] = match[2].trim();
    body = body.slice(match[0].length);
    match = metaRegex.exec(body);
  }
  return {
    subject: meta.subject || 'Notification',
    preheader: meta.preheader,
    body: body.trim(),
  };
}

function loadTemplate(templateKey: string, locale: EmailLocale): TemplateDefinition | null {
  const cacheKey = `${templateKey}__${locale}`;
  if (TEMPLATE_CACHE.has(cacheKey)) {
    return TEMPLATE_CACHE.get(cacheKey)!;
  }

  const fullPath = templatePath(templateKey, locale);
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const parsed = parseTemplate(content);
    TEMPLATE_CACHE.set(cacheKey, parsed);
    return parsed;
  } catch (error) {
    if (locale !== DEFAULT_LOCALE) {
      return loadTemplate(templateKey, DEFAULT_LOCALE);
    }
    return null;
  }
}

function getValue(source: Record<string, any>, key: string) {
  if (!source) return undefined;
  return key.split('.').reduce<any>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return acc[part];
    }
    return undefined;
  }, source);
}

function applyPlaceholders(template: string, data: Record<string, any>) {
  if (!template) return '';
  const triple = /{{{\s*([a-zA-Z0-9_.-]+)\s*}}}/g;
  const double = /{{\s*([a-zA-Z0-9_.-]+)\s*}}/g;
  const withRaw = template.replace(triple, (match, key) => {
    const value = getValue(data, key);
    return value === undefined || value === null ? '' : String(value);
  });
  return withRaw.replace(double, (match, key) => {
    const value = getValue(data, key);
    return value === undefined || value === null ? '' : escapeHtml(String(value));
  });
}

export function renderEmailTemplate(
  templateKey: string,
  {
    locale,
    data = {},
    cta,
  }: {
    locale?: string | null;
    data?: Record<string, any>;
    cta?: CTA;
  } = {},
): TemplateRenderResult {
  const resolvedLocale = resolveLocale(locale);
  const definition = loadTemplate(templateKey, resolvedLocale);
  if (!definition) {
    throw new Error(`Email template not found: ${templateKey}`);
  }

  const brand = getBrand();
  const context = {
    ...data,
    locale: resolvedLocale,
    brand,
    brand_name: brand.name,
    support_email: brand.supportEmail,
    origin: brand.origin,
  } as Record<string, any>;

  const subject = applyPlaceholders(definition.subject, context);
  const preheader = definition.preheader ? applyPlaceholders(definition.preheader, context) : undefined;
  const body = applyPlaceholders(definition.body, context);

  const html = renderLayout({
    title: subject,
    preheader,
    contentHtml: body,
    cta,
    locale: resolvedLocale,
  });

  return { subject, preheader, html };
}

export function formatAmountForLocale(amount: unknown, currency: string | null | undefined, locale: EmailLocale) {
  return formatCurrency(amount, currency, locale);
}

export function getSupportedEmailLocales() {
  return [...SUPPORTED_LOCALES];
}
