import type { BrandKey } from './brand';

export type BrandProfile = {
  key: BrandKey;
  name: string;
  domain: string;
  shortName?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  legalOperator?: string;
  seoTitle?: string;
  seoDescription?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

const shared = {
  phone: '+41 76 798 27 93',
  whatsapp: 'https://wa.me/41767982793',
  email: 'pedro@pedrodemenagement.ch',
  legalOperator: 'Pedro Déménagement',
};

export const BRANDS: Record<BrandKey, BrandProfile> = {
  pedro: {
    key: 'pedro',
    name: 'Pedro Déménagement',
    shortName: 'Pedro',
    domain: 'pedrodemenagement.ch',
    seoTitle: 'Pedro Déménagement — Déménagements en Suisse romande',
    seoDescription:
      'Équipe locale, protections complètes et planning maîtrisé pour vos déménagements en Suisse romande.',
    primaryColor: '#0f172a',
    secondaryColor: '#1e40af',
    ...shared,
  },
  lausanne: {
    key: 'lausanne',
    name: 'Déménagement Lausanne',
    shortName: 'Lausanne Déménagement',
    domain: 'lausannedemenagement.ch',
    seoTitle: 'Déménagement Lausanne — Votre déménagement local',
    seoDescription:
      'Déménagement Lausanne & Vaud : accès en ville assurés, protections professionnelles, service transparent et fiable.',
    primaryColor: '#1e3a8a',
    secondaryColor: '#0ea5e9',
    ...shared,
  },
  urgent: {
    key: 'urgent',
    name: 'Déménagement Urgent',
    shortName: 'Urgent',
    domain: 'demenagementurgent.ch',
    seoTitle: 'Déménagement Urgent — Intervention rapide',
    seoDescription:
      'Déménagements urgents en Suisse romande : intervention rapide, équipe formée, protections sol/murs et véhicule spécialisé.',
    primaryColor: '#b91c1c',
    secondaryColor: '#f97316',
    ...shared,
  },
  debarras: {
    key: 'debarras',
    name: 'Débarras Lausanne',
    shortName: 'Débarras',
    domain: 'debarraslausanne.ch',
    seoTitle: 'Débarras Lausanne — Service complet et rapide',
    seoDescription:
      'Débarras d’appartements, caves et locaux à Lausanne et environs. Tri, manutention et évacuation rapides.',
    primaryColor: '#065f46',
    secondaryColor: '#10b981',
    ...shared,
  },
};
