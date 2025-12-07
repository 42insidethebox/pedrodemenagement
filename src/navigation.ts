import { getPermalink } from './utils/permalinks';

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

export const headerData: Navigation = {
  links: [
    { text: 'Accueil', href: getPermalink('/') },
    { text: 'Services', href: getPermalink('/services') },
    { text: 'Tarifs', href: getPermalink('/pricing') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Réserver un déménagement', href: getPermalink('/contact#form') }],
};

export const footerData: FooterNavigation = {
  links: [
    {
      title: 'Pedro Déménagement',
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
        { text: 'hello@pedrodemenagement.ch', href: 'mailto:hello@pedrodemenagement.ch' },
        { text: '+41 21 555 24 24', href: 'tel:+41215552424' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Conditions générales', href: getPermalink('/terms') },
    { text: 'Politique de confidentialité', href: getPermalink('/privacy') },
  ],
  socialLinks: [],
  footNote: `
    © ${new Date().getFullYear()} Pedro Déménagement · Déménagements en Suisse romande.
  `,
};
