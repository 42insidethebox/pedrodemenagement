import { getPermalink, getAsset } from './utils/permalinks';

type Navigation = {
  links: Array<
    | {
        text: string;
        href: string;
      }
    | {
        text: string;
        links: { text: string; href: string }[];
      }
  >;
  actions: { text: string; href: string }[];
};

type FooterNavigation = {
  links: { title: string; links: { text: string; href: string }[] }[];
  secondaryLinks: { text: string; href: string }[];
  socialLinks: { ariaLabel: string; icon: string; href: string }[];
  footNote: string;
};

const languageLinks = [
  { text: 'Français', href: getPermalink('/') },
  { text: 'English', href: getPermalink('/en') },
  { text: 'Deutsch', href: getPermalink('/de') },
  { text: 'Italiano', href: getPermalink('/it') },
];

export const headerDataFr: Navigation = {
  links: [
    {
      text: 'Solutions',
      links: [
        {
          text: 'Sites vitrines clé-en-main',
          href: getPermalink('/#process'),
        },
        {
          text: 'Accompagnement continu',
          href: getPermalink('/services'),
        },
        {
          text: 'Support & Maintenance',
          href: getPermalink('/services#support'),
        },
        {
          text: 'Contenus multilingues',
          href: getPermalink('/services#content'),
        },
      ],
    },
    {
      text: 'Tarifs',
      href: getPermalink('/pricing'),
    },
    {
      text: 'À propos',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    { text: 'FAQ', href: getPermalink('/#faq') },
    {
      text: 'Langue',
      links: languageLinks,
    },
  ],
  actions: [
    { text: 'Demander une démo', href: getPermalink('/contact#form') },
  ],
};

export const footerDataFr: FooterNavigation = {
  links: [
    {
      title: 'TonSiteWeb.ch',
      links: [
        { text: 'Notre approche', href: getPermalink('/about') },
        { text: 'Notre processus', href: getPermalink('/#process') },
        { text: 'Tarifs', href: getPermalink('/pricing') },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Site vitrine clé-en-main', href: getPermalink('/services') },
        { text: 'Contenus & structure', href: getPermalink('/services#content') },
        { text: 'Support continu', href: getPermalink('/services#support') },
        { text: 'Multilingue', href: getPermalink('/services#content') },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: 'Parler à un expert', href: getPermalink('/contact#form') },
        { text: 'support@tonsiteweb.ch', href: 'mailto:support@tonsiteweb.ch' },
        { text: '+41 21 555 24 24', href: 'tel:+41215552424' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Conditions générales', href: getPermalink('/terms') },
    { text: 'Politique de confidentialité', href: getPermalink('/privacy') },
    ...languageLinks.map((link) => ({ text: link.text, href: link.href })),
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} TonSiteWeb.ch · Conception digitale suisse, basée sur l'Arc Lémanique.
  `,
};

export const headerDataEn: Navigation = {
  links: [
    {
      text: 'Solutions',
      links: [
        { text: 'Turnkey showcase sites', href: getPermalink('/en#process') },
        { text: 'Ongoing support', href: getPermalink('/en/services') },
        { text: 'Care & Maintenance', href: getPermalink('/en/services#support') },
        { text: 'Multilingual content', href: getPermalink('/en/services#content') },
      ],
    },
    { text: 'Pricing', href: getPermalink('/en/pricing') },
    { text: 'About', href: getPermalink('/en/about') },
    { text: 'Contact', href: getPermalink('/en/contact') },
    { text: 'FAQ', href: getPermalink('/en#faq') },
    { text: 'Language', links: languageLinks },
  ],
  actions: [{ text: 'Request a demo', href: getPermalink('/en/contact#form') }],
};

export const footerDataEn: FooterNavigation = {
  links: [
    {
      title: 'TonSiteWeb.ch',
      links: [
        { text: 'Our approach', href: getPermalink('/en/about') },
        { text: 'Our process', href: getPermalink('/en#process') },
        { text: 'Pricing', href: getPermalink('/en/pricing') },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Turnkey website', href: getPermalink('/en/services') },
        { text: 'Content & structure', href: getPermalink('/en/services#content') },
        { text: 'Continuous care', href: getPermalink('/en/services#support') },
        { text: 'Multilingual', href: getPermalink('/en/services#content') },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: 'Talk to an expert', href: getPermalink('/en/contact#form') },
        { text: 'support@tonsiteweb.ch', href: 'mailto:support@tonsiteweb.ch' },
        { text: '+41 21 555 24 24', href: 'tel:+41215552424' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/en/terms') },
    { text: 'Privacy', href: getPermalink('/en/privacy') },
    ...languageLinks.map((link) => ({ text: link.text, href: link.href })),
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} TonSiteWeb.ch · Swiss digital agency serving the Léman Arc.
  `,
};

export const headerDataDe: Navigation = {
  links: [
    {
      text: 'Lösungen',
      links: [
        { text: 'Schlüsselfertige Websites', href: getPermalink('/de#process') },
        { text: 'Begleitung & Beratung', href: getPermalink('/de/services') },
        { text: 'Support & Wartung', href: getPermalink('/de/services#support') },
        { text: 'Mehrsprachige Inhalte', href: getPermalink('/de/services#content') },
      ],
    },
    { text: 'Preise', href: getPermalink('/de/pricing') },
    { text: 'Über uns', href: getPermalink('/de/about') },
    { text: 'Kontakt', href: getPermalink('/de/contact') },
    { text: 'FAQ', href: getPermalink('/de#faq') },
    { text: 'Sprache', links: languageLinks },
  ],
  actions: [{ text: 'Demo anfragen', href: getPermalink('/de/contact#form') }],
};

export const footerDataDe: FooterNavigation = {
  links: [
    {
      title: 'TonSiteWeb.ch',
      links: [
        { text: 'Unsere Arbeitsweise', href: getPermalink('/de/about') },
        { text: 'Ablauf', href: getPermalink('/de#process') },
        { text: 'Preise', href: getPermalink('/de/pricing') },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Website-Paket', href: getPermalink('/de/services') },
        { text: 'Inhalte & Struktur', href: getPermalink('/de/services#content') },
        { text: 'Betreuung', href: getPermalink('/de/services#support') },
        { text: 'Mehrsprachig', href: getPermalink('/de/services#content') },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { text: 'Mit uns sprechen', href: getPermalink('/de/contact#form') },
        { text: 'support@tonsiteweb.ch', href: 'mailto:support@tonsiteweb.ch' },
        { text: '+41 21 555 24 24', href: 'tel:+41215552424' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'AGB', href: getPermalink('/de/terms') },
    { text: 'Datenschutz', href: getPermalink('/de/privacy') },
    ...languageLinks.map((link) => ({ text: link.text, href: link.href })),
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} TonSiteWeb.ch · Schweizer Digitalagentur für den Genfersee-Bogen.
  `,
};

export const headerDataIt: Navigation = {
  links: [
    {
      text: 'Soluzioni',
      links: [
        { text: 'Siti vetrina chiavi in mano', href: getPermalink('/it#process') },
        { text: 'Accompagnamento continuo', href: getPermalink('/it/services') },
        { text: 'Supporto e manutenzione', href: getPermalink('/it/services#support') },
        { text: 'Contenuti multilingue', href: getPermalink('/it/services#content') },
      ],
    },
    { text: 'Prezzi', href: getPermalink('/it/pricing') },
    { text: 'Chi siamo', href: getPermalink('/it/about') },
    { text: 'Contatto', href: getPermalink('/it/contact') },
    { text: 'FAQ', href: getPermalink('/it#faq') },
    { text: 'Lingua', links: languageLinks },
  ],
  actions: [{ text: 'Richiedi una demo', href: getPermalink('/it/contact#form') }],
};

export const footerDataIt: FooterNavigation = {
  links: [
    {
      title: 'TonSiteWeb.ch',
      links: [
        { text: 'Il nostro approccio', href: getPermalink('/it/about') },
        { text: 'Il nostro processo', href: getPermalink('/it#process') },
        { text: 'Prezzi', href: getPermalink('/it/pricing') },
      ],
    },
    {
      title: 'Servizi',
      links: [
        { text: 'Sito vetrina', href: getPermalink('/it/services') },
        { text: 'Contenuti & struttura', href: getPermalink('/it/services#content') },
        { text: 'Assistenza continuativa', href: getPermalink('/it/services#support') },
        { text: 'Multilingua', href: getPermalink('/it/services#content') },
      ],
    },
    {
      title: 'Contatti',
      links: [
        { text: 'Parla con un esperto', href: getPermalink('/it/contact#form') },
        { text: 'support@tonsiteweb.ch', href: 'mailto:support@tonsiteweb.ch' },
        { text: '+41 21 555 24 24', href: 'tel:+41215552424' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Condizioni generali', href: getPermalink('/it/terms') },
    { text: 'Privacy', href: getPermalink('/it/privacy') },
    ...languageLinks.map((link) => ({ text: link.text, href: link.href })),
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} TonSiteWeb.ch · Agenzia digitale svizzera per l'Arco lemanico.
  `,
};

export const headerData = headerDataFr;
export const footerData = footerDataFr;
