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
  fonts?: {
    sans?: string;
    heading?: string;
    serif?: string;
  };
  hero?: {
    image?: string;
    overlay?: string;
    texture?: string;
  };
  theme?: {
    bg?: string;
    gradient?: string;
    accent?: string;
    surface?: string;
    card?: string;
    shadow?: string;
    pattern?: string;
  };
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
    fonts: { sans: 'Inter Variable', heading: 'Space Grotesk' },
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
    fonts: { sans: 'Manrope', heading: 'Archivo' },
    theme: {
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #1e3a8a 60%, #0b1836 100%)',
      surface: 'rgba(14,165,233,0.08)',
      card: 'rgba(14,165,233,0.1)',
    },
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
    fonts: { sans: 'Archivo', heading: 'Bebas Neue' },
    theme: {
      bg: '#0b0f1a',
      gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 55%, #f97316 100%)',
      accent: '#ef4444',
      surface: 'rgba(239,68,68,0.08)',
      card: 'rgba(15,15,20,0.75)',
      shadow: '0 25px 70px -35px rgba(239,68,68,0.65)',
    },
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
    fonts: { sans: 'DM Sans', heading: 'Playfair Display' },
    theme: {
      gradient: 'radial-gradient(circle at 10% 20%, #0f766e 0%, #022c22 45%, #0f172a 100%)',
      surface: 'rgba(16,185,129,0.08)',
      card: 'rgba(6,95,70,0.16)',
      shadow: '0 22px 60px -30px rgba(16,185,129,0.6)',
    },
    ...shared,
  },
  transport: {
    key: 'transport',
    name: 'Transport Meubles',
    shortName: 'Transport',
    domain: 'transportmeubles.ch',
    seoTitle: 'Transport de meubles — Suisse romande',
    seoDescription: 'Transport sécurisé de meubles, emballage et arrimage renforcé.',
    primaryColor: '#5b21b6',
    secondaryColor: '#f59e0b',
    fonts: { sans: 'Space Grotesk', heading: 'Space Grotesk' },
    theme: {
      bg: '#0b0617',
      gradient: 'linear-gradient(120deg, #111827 0%, #312e81 55%, #f59e0b 100%)',
      accent: '#f59e0b',
      surface: 'rgba(91,33,182,0.2)',
      card: 'rgba(26,14,54,0.8)',
      shadow: '0 28px 80px -40px rgba(91,33,182,0.7)',
      pattern: 'radial-gradient(circle at 20% 20%, rgba(245,158,11,0.16) 0, transparent 30%)',
    },
    ...shared,
  },
  videmaison: {
    key: 'videmaison',
    name: 'Vide Maison',
    shortName: 'Vide Maison',
    domain: 'videmaison.ch',
    seoTitle: 'Vide maison — Désencombrement complet',
    seoDescription: 'Vidage complet, tri et évacuation rapide, protections incluses.',
    primaryColor: '#b45309',
    secondaryColor: '#f97316',
    fonts: { sans: 'DM Sans', heading: 'Cormorant Garamond', serif: 'Cormorant Garamond' },
    theme: {
      bg: '#f7f2ec',
      gradient: 'linear-gradient(135deg, #fff7ed 0%, #f59e0b 55%, #7c2d12 100%)',
      surface: 'rgba(245,158,11,0.12)',
      card: 'rgba(244, 232, 222, 0.9)',
      shadow: '0 18px 60px -40px rgba(124,45,18,0.55)',
    },
    ...shared,
  },
  videsuccession: {
    key: 'videsuccession',
    name: 'Vide Succession',
    shortName: 'Vide Succession',
    domain: 'videsuccession.ch',
    seoTitle: 'Vide succession — Gestion délicate et rapide',
    seoDescription: 'Tri, débarras et coordination administrative pour successions.',
    primaryColor: '#0f172a',
    secondaryColor: '#d97706',
    fonts: { sans: 'Manrope', heading: 'Playfair Display', serif: 'Playfair Display' },
    theme: {
      bg: '#0b0c14',
      gradient: 'radial-gradient(circle at 10% 10%, #1f2937 0%, #0b0c14 40%, #000000 100%)',
      accent: '#d97706',
      surface: 'rgba(217,119,6,0.12)',
      card: 'rgba(15,17,27,0.85)',
      shadow: '0 30px 90px -45px rgba(217,119,6,0.65)',
    },
    ...shared,
  },
  nettoyagesuccession: {
    key: 'nettoyagesuccession',
    name: 'Nettoyage Succession',
    shortName: 'Nettoyage',
    domain: 'nettoyagesuccession.ch',
    seoTitle: 'Nettoyage succession — Remise en état complète',
    seoDescription: 'Nettoyage complet après succession, remise en état prête à louer/vendre.',
    primaryColor: '#0f766e',
    secondaryColor: '#22d3ee',
    fonts: { sans: 'Work Sans', heading: 'Space Grotesk' },
    theme: {
      bg: '#f8fbfd',
      gradient: 'linear-gradient(135deg, #ecfeff 0%, #67e8f9 45%, #0f172a 100%)',
      accent: '#22d3ee',
      surface: 'rgba(103,232,249,0.12)',
      card: '#ffffff',
      shadow: '0 18px 55px -35px rgba(15,118,110,0.5)',
      pattern: 'radial-gradient(circle at 70% 10%, rgba(103,232,249,0.15) 0, transparent 35%)',
    },
    ...shared,
  },
  lausannenettoyage: {
    key: 'lausannenettoyage',
    name: 'Nettoyage Lausanne',
    shortName: 'Nettoyage Lausanne',
    domain: 'lausannenettoyage.ch',
    seoTitle: 'Nettoyage Lausanne — Appartements, bureaux, remise en état',
    seoDescription: 'Nettoyage complet à Lausanne : remises en état, bureaux et fin de chantier, avec contrôle qualité.',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0f172a',
    fonts: { sans: 'Work Sans', heading: 'Space Grotesk' },
    theme: {
      bg: '#f7fbff',
      gradient: 'linear-gradient(135deg, #e0f2fe 0%, #0ea5e9 45%, #0f172a 100%)',
      accent: '#38bdf8',
      surface: 'rgba(224,242,254,0.18)',
      card: '#ffffff',
      shadow: '0 22px 70px -45px rgba(14,165,233,0.55)',
      pattern: 'radial-gradient(circle at 15% 20%, rgba(56,189,248,0.12) 0, transparent 30%)',
    },
    ...shared,
  },
  etatdeslieux: {
    key: 'etatdeslieux',
    name: 'État des lieux Lausanne',
    shortName: 'État des lieux',
    domain: 'etatdeslieuxlausanne.ch',
    seoTitle: 'État des lieux Lausanne — Constat précis et rapide',
    seoDescription: 'États des lieux locatifs, rapports photo et délai court.',
    primaryColor: '#0f172a',
    secondaryColor: '#60a5fa',
    fonts: { sans: 'Archivo', heading: 'IBM Plex Mono' },
    theme: {
      bg: '#050814',
      gradient: 'linear-gradient(120deg, #0b1224 0%, #0f172a 45%, #0ea5e9 100%)',
      accent: '#38bdf8',
      surface: 'rgba(96,165,250,0.1)',
      card: 'rgba(5,8,20,0.85)',
      shadow: '0 22px 70px -45px rgba(56,189,248,0.65)',
      pattern:
        'repeating-linear-gradient(90deg, rgba(96,165,250,0.05), rgba(96,165,250,0.05) 1px, transparent 1px, transparent 24px)',
    },
    ...shared,
  },
};
