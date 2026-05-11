import TonHomeFr from '~/pages/iopartner/index.astro';
import TonHomeEn from '~/pages/iopartner/en/index.astro';
import TonHomeDe from '~/pages/iopartner/de/index.astro';
import TonHomeIt from '~/pages/iopartner/it/index.astro';

import TonPricingFr from '~/pages/iopartner/pricing.astro';
import TonPricingEn from '~/pages/iopartner/en/pricing.astro';
import TonPricingDe from '~/pages/iopartner/de/pricing.astro';
import TonPricingIt from '~/pages/iopartner/it/pricing.astro';

import TonServicesFr from '~/pages/iopartner/services.astro';
import TonServicesEn from '~/pages/iopartner/en/services.astro';
import TonServicesDe from '~/pages/iopartner/de/services.astro';
import TonServicesIt from '~/pages/iopartner/it/services.astro';

import TonContactFr from '~/pages/iopartner/contact.astro';
import TonContactEn from '~/pages/iopartner/en/contact.astro';
import TonContactDe from '~/pages/iopartner/de/contact.astro';
import TonContactIt from '~/pages/iopartner/it/contact.astro';

import TonAboutFr from '~/pages/iopartner/about.astro';
import TonAboutEn from '~/pages/iopartner/en/about.astro';
import TonAboutDe from '~/pages/iopartner/de/about.astro';
import TonAboutIt from '~/pages/iopartner/it/about.astro';

import TonThankYouFr from '~/pages/iopartner/thank-you.astro';
import TonThankYouEn from '~/pages/iopartner/en/thank-you.astro';
import TonThankYouDe from '~/pages/iopartner/de/thank-you.astro';
import TonThankYouIt from '~/pages/iopartner/it/thank-you.astro';

import TonChooseTemplateFr from '~/pages/iopartner/choose-template.astro';
import TonChooseTemplateEn from '~/pages/iopartner/en/choose-template.astro';
import TonChooseTemplateDe from '~/pages/iopartner/de/choose-template.astro';
import TonChooseTemplateIt from '~/pages/iopartner/it/choose-template.astro';

import TonTermsFr from '~/pages/iopartner/terms.md';
import TonTermsEn from '~/pages/iopartner/en/terms.md';
import TonTermsDe from '~/pages/iopartner/de/terms.md';
import TonTermsIt from '~/pages/iopartner/it/terms.md';

import TonPrivacyFr from '~/pages/iopartner/privacy.md';
import TonPrivacyEn from '~/pages/iopartner/en/privacy.md';
import TonPrivacyDe from '~/pages/iopartner/de/privacy.md';
import TonPrivacyIt from '~/pages/iopartner/it/privacy.md';

type Locale = 'fr' | 'en' | 'de' | 'it';

type PageKey =
  | 'home'
  | 'pricing'
  | 'services'
  | 'contact'
  | 'about'
  | 'thank-you'
  | 'choose-template'
  | 'terms'
  | 'privacy';

type TonComponent = (props?: Record<string, unknown>) => Promise<unknown> | unknown;

const pages: Record<PageKey, Record<Locale, TonComponent>> = {
  home: { fr: TonHomeFr, en: TonHomeEn, de: TonHomeDe, it: TonHomeIt },
  pricing: { fr: TonPricingFr, en: TonPricingEn, de: TonPricingDe, it: TonPricingIt },
  services: { fr: TonServicesFr, en: TonServicesEn, de: TonServicesDe, it: TonServicesIt },
  contact: { fr: TonContactFr, en: TonContactEn, de: TonContactDe, it: TonContactIt },
  about: { fr: TonAboutFr, en: TonAboutEn, de: TonAboutDe, it: TonAboutIt },
  'thank-you': { fr: TonThankYouFr, en: TonThankYouEn, de: TonThankYouDe, it: TonThankYouIt },
  'choose-template': {
    fr: TonChooseTemplateFr,
    en: TonChooseTemplateEn,
    de: TonChooseTemplateDe,
    it: TonChooseTemplateIt,
  },
  terms: { fr: TonTermsFr, en: TonTermsEn, de: TonTermsDe, it: TonTermsIt },
  privacy: { fr: TonPrivacyFr, en: TonPrivacyEn, de: TonPrivacyDe, it: TonPrivacyIt },
};

function resolveLocale(pathname: string, request?: Request): Locale {
  const match = pathname.match(/^\/(fr|en|de|it)(?=\/|$)/);
  if (match?.[1]) return match[1] as Locale;

  const supported: Locale[] = ['fr', 'en', 'de', 'it'];
  const cookie = request?.headers.get('cookie') || '';
  const langCookie = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('aw_lang='));
  const cookieLang = langCookie ? (langCookie.split('=')[1] as Locale) : undefined;
  if (cookieLang && supported.includes(cookieLang)) return cookieLang;

  const accept = (request?.headers.get('accept-language') || '').slice(0, 2).toLowerCase() as Locale;
  if (accept && supported.includes(accept)) return accept;

  return 'fr';
}

export function resolveIoPartnerComponent(page: PageKey, url: URL, request?: Request): TonComponent {
  const locale = resolveLocale(url.pathname, request);
  const table = pages[page];
  return table[locale] || table.fr;
}
