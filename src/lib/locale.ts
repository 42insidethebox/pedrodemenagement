import type { EmailLocale } from './email-templates';
import { resolveEmailLocale } from './email';

const LOCALE_QUERY_KEYS = ['lang', 'locale', 'language'];

function extractFromAcceptLanguage(header: string | null | undefined) {
  if (!header) return null;
  const [first] = header.split(',');
  if (!first) return null;
  const base = first.split(';')[0]?.trim();
  if (!base) return null;
  const short = base.includes('-') ? base.split('-')[0] : base;
  return short;
}

export function detectRequestLocale(request: Request, url?: URL, fallback?: string | null): EmailLocale {
  let candidate: string | null | undefined = null;
  if (url) {
    for (const key of LOCALE_QUERY_KEYS) {
      const value = url.searchParams.get(key);
      if (value) {
        candidate = value;
        break;
      }
    }
    if (!candidate) {
      const segments = url.pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        candidate = segments[0];
      }
    }
  }
  if (!candidate) {
    candidate = extractFromAcceptLanguage(request.headers.get('accept-language'));
  }
  if (!candidate && fallback) {
    candidate = fallback;
  }
  return resolveEmailLocale(candidate ?? undefined);
}
