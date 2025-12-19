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

export const buildHeaderData = (brand: NavigationBrand & { key?: BrandKey }): Navigation => ({
  links: [
    { text: 'Accueil', href: getPermalink('/') },
    { text: 'Services', href: getPermalink('/services') },
    { text: 'Tarifs', href: getPermalink('/pricing') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [
    {
      text:
        brand.key === 'lausanne'
          ? 'Réserver mon déménagement'
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
                      ? 'Réserver une expérience'
                    : 'Réserver un déménagement',
      href: getPermalink('/contact#form'),
    },
  ],
  brandName: brand.name,
  brandKey: brand.key,
});

export const buildFooterData = (brand: NavigationBrand): FooterNavigation => {
  const vertical =
    brand.key === 'laclemanexperience'
      ? 'Expériences privées autour du Léman.'
      : 'Déménagements en Suisse romande.';

  const serviceLinks =
    brand.key === 'laclemanexperience'
      ? [
          { text: 'Expériences', href: getPermalink('/services') },
          { text: 'Tarifs', href: getPermalink('/pricing') },
          { text: 'Conciergerie', href: getPermalink('/contact') },
        ]
      : [
          { text: 'Déménagement appartement', href: getPermalink('/services') + '#appartement' },
          { text: 'Maisons & villas', href: getPermalink('/services') + '#services' },
          { text: 'Longue distance', href: getPermalink('/services') + '#services' },
          { text: 'Emballage & protection', href: getPermalink('/services') + '#emballage' },
        ];

  return {
    links: [
      {
        title: brand.name,
        links: [
          { text: 'Accueil', href: getPermalink('/') },
          { text: 'Services', href: getPermalink('/services') },
          { text: 'Tarifs', href: getPermalink('/pricing') },
        ],
      },
      {
        title: 'Nos services',
        links: serviceLinks,
      },
      {
        title: 'Contact',
        links: [
          { text: 'Demander un devis', href: getPermalink('/contact#form') },
          ...(brand.email ? [{ text: brand.email, href: `mailto:${brand.email}` }] : []),
          ...(brand.phone ? [{ text: brand.phone, href: `tel:${brand.phone.replace(/\s+/g, '')}` }] : []),
        ],
      },
    ],
    secondaryLinks: [
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
