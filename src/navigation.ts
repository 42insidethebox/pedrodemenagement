import { getPermalink } from './utils/permalinks';
import type { BrandProfile } from './lib/brands.config';
import { BRANDS } from './lib/brands.config';
import type { BrandKey } from './lib/brand';

type Navigation = {
  links: { text: string; href: string }[];
  actions: { text: string; href: string }[];
  brandName?: string;
  brandKey?: BrandKey;
};

type FooterNavigation = {
  links: { title: string; links: { text: string; href: string }[] }[];
  secondaryLinks: { text: string; href: string }[];
  socialLinks: { ariaLabel: string; icon: string; href: string }[];
  footNote: string;
};

type NavigationBrand = Pick<BrandProfile, 'name' | 'email' | 'phone' | 'legalOperator'> & { key?: BrandKey };

const lceT = <T,>(locale: string, fr: T, en: T, de: T, it: T, ar?: T, zh?: T): T => {
  if (locale === 'en') return en;
  if (locale === 'de') return de;
  if (locale === 'it') return it;
  if (locale === 'ar' && ar !== undefined) return ar;
  if (locale === 'zh' && zh !== undefined) return zh;
  return fr;
};

const lamT = <T,>(locale: string, fr: T, en: T, de: T, it: T): T => {
  if (locale === 'en') return en;
  if (locale === 'de') return de;
  if (locale === 'it') return it;
  return fr;
};

export const buildHeaderData = (brand: NavigationBrand & { key?: BrandKey }, locale: string = 'fr'): Navigation => {
  const navLinks =
    brand.key === 'laclemanexperience'
      ? [
          { text: lceT(locale, 'Accueil', 'Home', 'Startseite', 'Home', 'الرئيسية', '首页'), href: getPermalink('/') },
          { text: lceT(locale, 'Services', 'Experiences', 'Erlebnisse', 'Esperienze', 'التجارب', '体验'), href: getPermalink('/services') },
          { text: lceT(locale, 'Tarifs', 'Pricing', 'Preise', 'Prezzi', 'الأسعار', '价格'), href: getPermalink('/pricing') },
          { text: lceT(locale, 'Contact', 'Contact', 'Kontakt', 'Contatto', 'اتصال', '联系'), href: getPermalink('/contact') },
        ]
      : brand.key === 'lausanne'
        ? [
            { text: lamT(locale, 'Accueil', 'Home', 'Startseite', 'Home'), href: getPermalink('/') },
            { text: lamT(locale, 'Services', 'Services', 'Leistungen', 'Servizi'), href: getPermalink('/services') },
            { text: lamT(locale, 'Tarifs', 'Pricing', 'Preise', 'Prezzi'), href: getPermalink('/pricing') },
            { text: lamT(locale, 'Contact', 'Contact', 'Kontakt', 'Contatto'), href: getPermalink('/contact') },
          ]
        : [
            { text: 'Accueil', href: getPermalink('/') },
            { text: 'Services', href: getPermalink('/services') },
            { text: 'Tarifs', href: getPermalink('/pricing') },
            { text: 'Contact', href: getPermalink('/contact') },
          ];

  const actionText =
    brand.key === 'lausanne'
      ? lamT(locale, 'Réserver mon déménagement', 'Schedule my move', 'Umzug planen', 'Pianifica il trasloco')
      : brand.key === 'urgent'
        ? 'Intervention express'
        : brand.key === 'debarras'
          ? 'Planifier un débarras'
          : brand.key === 'transport'
            ? 'Planifier un transport'
            : brand.key === 'videmaison'
              ? 'Organiser un vide maison'
              : brand.key === 'videsuccession'
                ? 'Planifier un vide succession'
                : brand.key === 'nettoyagesuccession' || brand.key === 'lausannenettoyage'
                  ? 'Programmer un nettoyage'
                  : brand.key === 'etatdeslieux'
                    ? 'Programmer un état des lieux'
                    : brand.key === 'laclemanexperience'
                      ? lceT(locale, 'Réserver une expérience', 'Book an experience', 'Erlebnis buchen', 'Prenotare un’esperienza', 'احجز تجربة', '预订体验')
                      : 'Réserver un déménagement';

  return {
    links: navLinks,
    actions: [
      {
        text: actionText,
        href: getPermalink('/contact#form'),
      },
    ],
    brandName: brand.name,
    brandKey: brand.key,
  };
};

export const buildFooterData = (brand: NavigationBrand, locale: string = 'fr'): FooterNavigation => {
  const vertical =
    brand.key === 'laclemanexperience'
      ? lceT(locale, 'Expériences privées autour du Léman.', 'Private experiences around Lake Geneva.', 'Private Erlebnisse rund um den Genfersee.', 'Esperienze private attorno al Lemano.', 'تجارب خاصة حول بحيرة ليمان.', '莱蒙湖畔私享体验。')
      : brand.key === 'lausanne'
        ? lamT(locale, 'Déménagements en Suisse romande.', 'Moves across Suisse romande.', 'Umzüge in der Romandie.', 'Traslochi in Svizzera romanda.')
        : 'Déménagements en Suisse romande.';

  const serviceLinks =
    brand.key === 'laclemanexperience'
      ? [
          { text: lceT(locale, 'Expériences', 'Experiences', 'Erlebnisse', 'Esperienze', 'التجارب', '体验'), href: getPermalink('/services') },
          { text: lceT(locale, 'Tarifs', 'Pricing', 'Preise', 'Prezzi', 'الأسعار', '价格'), href: getPermalink('/pricing') },
          { text: lceT(locale, 'Conciergerie', 'Concierge', 'Concierge', 'Concierge', 'كونسيرج', '礼宾'), href: getPermalink('/contact') },
        ]
      : brand.key === 'lausanne'
        ? [
            { text: lamT(locale, 'Déménagement appartement', 'Apartment moves', 'Wohnungsumzüge', 'Traslochi appartamento'), href: getPermalink('/services') + '#appartement' },
            { text: lamT(locale, 'Maisons & villas', 'Houses & villas', 'Häuser & Villen', 'Case & ville'), href: getPermalink('/services') + '#services' },
            { text: lamT(locale, 'Longue distance', 'Long distance', 'Langstrecke', 'Lunga distanza'), href: getPermalink('/services') + '#services' },
            { text: lamT(locale, 'Emballage & protection', 'Packing & protection', 'Packen & Schutz', 'Imballaggio & protezione'), href: getPermalink('/services') + '#emballage' },
          ]
        : [
            { text: 'Déménagement appartement', href: getPermalink('/services') + '#appartement' },
            { text: 'Maisons & villas', href: getPermalink('/services') + '#services' },
            { text: 'Longue distance', href: getPermalink('/services') + '#services' },
            { text: 'Emballage & protection', href: getPermalink('/services') + '#emballage' },
          ];

  const topLinks =
    brand.key === 'laclemanexperience'
      ? [
          { text: lceT(locale, 'Accueil', 'Home', 'Startseite', 'Home', 'الرئيسية', '首页'), href: getPermalink('/') },
          { text: lceT(locale, 'Services', 'Experiences', 'Erlebnisse', 'Esperienze', 'التجارب', '体验'), href: getPermalink('/services') },
          { text: lceT(locale, 'Tarifs', 'Pricing', 'Preise', 'Prezzi', 'الأسعار', '价格'), href: getPermalink('/pricing') },
        ]
      : brand.key === 'lausanne'
        ? [
            { text: lamT(locale, 'Accueil', 'Home', 'Startseite', 'Home'), href: getPermalink('/') },
            { text: lamT(locale, 'Services', 'Services', 'Leistungen', 'Servizi'), href: getPermalink('/services') },
            { text: lamT(locale, 'Tarifs', 'Pricing', 'Preise', 'Prezzi'), href: getPermalink('/pricing') },
          ]
        : [
            { text: 'Accueil', href: getPermalink('/') },
            { text: 'Services', href: getPermalink('/services') },
            { text: 'Tarifs', href: getPermalink('/pricing') },
          ];

  const contactLinks =
    brand.key === 'laclemanexperience'
      ? [
          { text: lceT(locale, 'Demander un devis', 'Request a quote', 'Offerte anfragen', 'Richiedi un preventivo', 'طلب عرض سعر', '索取报价'), href: getPermalink('/contact#form') },
          ...(brand.email ? [{ text: brand.email, href: `mailto:${brand.email}` }] : []),
          ...(brand.phone ? [{ text: brand.phone, href: `tel:${brand.phone.replace(/\s+/g, '')}` }] : []),
        ]
      : brand.key === 'lausanne'
        ? [
            { text: lamT(locale, 'Demander un devis', 'Request a quote', 'Offerte anfragen', 'Richiedi un preventivo'), href: getPermalink('/contact#form') },
            ...(brand.email ? [{ text: brand.email, href: `mailto:${brand.email}` }] : []),
            ...(brand.phone ? [{ text: brand.phone, href: `tel:${brand.phone.replace(/\s+/g, '')}` }] : []),
          ]
        : [
            { text: 'Demander un devis', href: getPermalink('/contact#form') },
            ...(brand.email ? [{ text: brand.email, href: `mailto:${brand.email}` }] : []),
            ...(brand.phone ? [{ text: brand.phone, href: `tel:${brand.phone.replace(/\s+/g, '')}` }] : []),
          ];

  return {
    links: [
      {
        title: brand.name,
        links: topLinks,
      },
      {
        title: brand.key === 'laclemanexperience' ? lceT(locale, 'Nos services', 'Our services', 'Unsere Services', 'I nostri servizi', 'خدماتنا', '我们的服务') : 'Nos services',
        links: serviceLinks,
      },
      {
        title: brand.key === 'laclemanexperience' ? lceT(locale, 'Contact', 'Contact', 'Kontakt', 'Contatto', 'اتصال', '联系') : 'Contact',
        links: contactLinks,
      },
    ],
    secondaryLinks:
      brand.key === 'laclemanexperience'
        ? [
            { text: lceT(locale, 'Conditions générales', 'Terms', 'AGB', 'Termini', 'الشروط', '条款'), href: getPermalink('/terms') },
            { text: lceT(locale, 'Politique de confidentialité', 'Privacy policy', 'Datenschutz', 'Privacy', 'الخصوصية', '隐私政策'), href: getPermalink('/privacy') },
          ]
        : [
            { text: 'Conditions générales', href: getPermalink('/terms') },
            { text: 'Politique de confidentialité', href: getPermalink('/privacy') },
          ],
    socialLinks: [],
    footNote: `
    © ${new Date().getFullYear()} ${brand.legalOperator || brand.name} · ${vertical}
  `,
  };
};

// Fallback static exports for legacy imports
export const headerData = buildHeaderData(BRANDS.pedro);
export const footerData = buildFooterData(BRANDS.pedro);
