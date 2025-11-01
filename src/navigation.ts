import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Solutions',
      links: [
        {
          text: 'Sites vitrines 24 h',
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
      text: 'Templates',
      links: [
        {
          text: 'Artisans & commerces',
          href: getPermalink('/homes/personal'),
        },
        {
          text: 'Applications mobiles',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: 'SaaS & plateformes',
          href: getPermalink('/homes/saas'),
        },
        {
          text: 'Startups & innovation',
          href: getPermalink('/homes/startup'),
        },
        {
          text: 'Landing conversion',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: 'Landing pré-lancement',
          href: getPermalink('/landing/pre-launch'),
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
    {
      text: 'Ressources',
      links: [
        { text: 'Étapes du projet', href: getPermalink('/#process') },
        { text: 'Foire aux questions', href: getPermalink('/#faq') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    {
      text: 'Langue',
      links: [
        { text: 'Français', href: getPermalink('/') },
        { text: 'English', href: getPermalink('/en') },
        { text: 'Deutsch', href: getPermalink('/de') },
        { text: 'Italiano', href: getPermalink('/it') },
      ],
    },
  ],
  actions: [
    { text: 'Demander une démo', href: getPermalink('/contact#form') },
  ],
};

export const footerData = {
  links: [
    {
      title: 'MonWebsite.ch',
      links: [
        { text: 'Notre approche', href: getPermalink('/about') },
        { text: 'Processus 24 h', href: getPermalink('/#process') },
        { text: 'Tarifs', href: getPermalink('/pricing') },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Site vitrine clé-en-main', href: getPermalink('/services') },
        { text: 'Contenus & SEO local', href: getPermalink('/services#seo') },
        { text: 'Support continu', href: getPermalink('/services#support') },
        { text: 'Multilingue', href: getPermalink('/services#content') },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: 'Parler à un expert', href: getPermalink('/contact#form') },
        { text: 'hello@monwebsite.ch', href: 'mailto:hello@monwebsite.ch' },
        { text: '+41 21 555 24 24', href: 'tel:+41215552424' },
      ],
    },
    {
      title: 'Templates',
      links: [
        { text: 'Artisans', href: getPermalink('/homes/personal') },
        { text: 'SaaS', href: getPermalink('/homes/saas') },
        { text: 'Landing pages', href: getPermalink('/landing/lead-generation') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Conditions générales', href: getPermalink('/terms') },
    { text: 'Politique de confidentialité', href: getPermalink('/privacy') },
    { text: 'English', href: getPermalink('/en') },
    { text: 'Deutsch', href: getPermalink('/de') },
    { text: 'Italiano', href: getPermalink('/it') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} MonWebsite.ch · Conception digitale suisse, basée sur l'Arc Lémanique.
  `,
};
