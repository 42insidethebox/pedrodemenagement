import type { APIRoute } from 'astro';

const SUPPORTED = ['fr', 'en', 'de', 'it'] as const;
export type Locale = (typeof SUPPORTED)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

export function resolveLocaleFromRequest(request: Request, fallback: Locale = DEFAULT_LOCALE): Locale {
  const cookie = request.headers.get('cookie') || '';
  const cookieMatch = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('aw_lang='));
  const cookieLang = cookieMatch ? cookieMatch.split('=')[1] : '';

  const accept = (request.headers.get('accept-language') || '').slice(0, 2).toLowerCase();

  return (SUPPORTED.find((l) => l === cookieLang) ??
    SUPPORTED.find((l) => l === accept) ??
    fallback) as Locale;
}

// Helper to expose locale to API routes (if needed later)
export type LocaleAwareAPIRoute = APIRoute & { locale?: Locale };
