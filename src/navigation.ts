import { getPermalink } from './utils/permalinks';
import type { BrandProfile } from './lib/brands.config';
import { BRANDS } from './lib/brands.config';

type Navigation = {
  links: { text: string; href: string }[];
  actions: { text: string; href: string }[];
};

type FooterNavigation = {
  links: { title: string; links: { text: string; href: string }[] }[];
  secondaryLinks: { text: string; href: string }[];
  socialLinks: { ariaLabel: string; icon: string; href: string }[];
  footNote: string;
};

type NavigationBrand = Pick<BrandProfile, 'name' | 'email' | 'phone' | 'legalOperator'>;

export const buildHeaderData = (_brand: NavigationBrand): Navigation => ({
  links: [
    { text: 'Accueil', href: getPermalink('/') },
    { text: 'Services', href: getPermalink('/services') },
    { text: 'Tarifs', href: getPermalink('/pricing') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Réserver un déménagement', href: getPermalink('/contact#form') }],
});

export const buildFooterData = (brand: NavigationBrand): FooterNavigation => ({
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
      links: [
        { text: 'Déménagement appartement', href: getPermalink('/services') + '#appartement' },
        { text: 'Maisons & villas', href: getPermalink('/services') + '#services' },
        { text: 'Longue distance', href: getPermalink('/services') + '#services' },
        { text: 'Emballage & protection', href: getPermalink('/services') + '#emballage' },
      ],
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
    © ${new Date().getFullYear()} ${brand.legalOperator || brand.name} · Déménagements en Suisse romande.
  `,
});

// Fallback static exports for legacy imports
export const headerData = buildHeaderData(BRANDS.pedro);
export const footerData = buildFooterData(BRANDS.pedro);
