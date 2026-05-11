export type PricingCategoryId = 'websites' | 'ai' | 'infra' | 'support';

export type PricingBilling = 'fixed' | 'add-on' | 'session' | 'hourly' | 'recurring' | 'custom';

export type PricingScope = 'standardized' | 'bounded' | 'variable' | 'reactive' | 'strategic';

export type PricingCTAKey =
  | 'checkout_999'
  | 'checkout_1500'
  | 'quote'
  | 'diagnostic'
  | 'custom_systems';

export interface PricingCategory {
  id: PricingCategoryId;
  label: string;
  description: string;
  priceBand: string;
  anchorId: string;
  note: string;
  ctaKey: PricingCTAKey;
}

export interface PricingItem {
  id: string;
  category: PricingCategoryId;
  service: string;
  basePrice: string;
  billing: PricingBilling;
  scope: PricingScope;
  notes?: string;
}

export interface PricingCta {
  key: PricingCTAKey;
  label: string;
  href: string;
}

export interface CustomSystemsTrack {
  key: string;
  amountLabel: string;
  title: string;
  summary: string;
  href: string;
}

export const IOPARTNER_FR_PRICING_BILLING_LABELS: Record<PricingBilling, string> = {
  fixed: 'Fixe',
  'add-on': 'Add-on',
  session: 'Session',
  hourly: 'Horaire',
  recurring: 'Récurrent',
  custom: 'Custom',
};

export const IOPARTNER_FR_PRICING_SCOPE_LABELS: Record<PricingScope, string> = {
  standardized: 'Standardisé',
  bounded: 'Borné',
  variable: 'Variable',
  reactive: 'Réactif',
  strategic: 'Stratégique',
};

export const IOPARTNER_FR_PRICE_LABELS = {
  websiteLaunch: '999 CHF',
  websiteBookingAddOn: '250 CHF',
  websiteEmailAddOn: '250 CHF',
  websiteMultilingual: '290 CHF',
  websiteSeo: '390 CHF',
  websiteRevision: '190 CHF',
  websitePriority: '290 CHF',
  websiteSprint: '1 249 CHF',
  websiteGrowth: '1 500 CHF',
  websiteCustom: '2 000+ CHF',
  diagnostic: '80 CHF / 15 min',
  aiAudit: '290 CHF',
  aiAssistantFrom: 'dès 990 CHF',
  aiFaqBot: '690 CHF',
  aiContentPipeline: '790 CHF',
  promptLibrary: '390 CHF',
  aiWorkshop: '490 CHF',
  infraAudit: '490 CHF',
  infraMigrationFrom: 'dès 1 490 CHF',
  nextcloudFrom: 'dès 990 CHF',
  vpsHardening: '390 CHF',
  proxmoxFrom: 'dès 2 490 CHF',
  backupSetup: '290 CHF',
  trainingHourly: '140 CHF / h',
  workshopHalfDay: '420 CHF',
  workshopFullDay: '840 CHF',
  trainingSprint: '1 200+ CHF',
  consultingHourly: '140 CHF / h',
  consultingStarter: '420 CHF',
  consultingSprint: '1 200+ CHF',
  consultingQuote: 'Sur devis',
  supportCare: '79 CHF / mois',
  supportManagedInfra: 'dès 249 CHF / mois',
  emergencyAssistance: '190 CHF / h',
  technicalPartnerMonthly: 'dès 990 CHF / mois',
  monthlyAdvisory: '120 CHF',
  retainerRange: '79–249 CHF / mois',
  retainerCare: '79 CHF / mois',
  retainerManaged: 'dès 249 CHF / mois',
  retainerPartner: 'dès 990 CHF / mois',
  retainerQuote: 'Sur devis',
  aiStarter: 'dès 990 CHF',
  aiMulti: 'dès 990 CHF',
  aiCustom: 'dès 990 CHF',
  infraStarter: '390 CHF',
  infraPrivate: 'dès 990 CHF',
  infraPlatform: 'dès 2 490 CHF',
  privateCodebase: '2 000 CHF',
  privateCodebaseHandoff: '2 200 CHF',
  backendLight: '4 500 CHF',
  heavierSystems: '8 000+ CHF',
  supportRangeFull: '79 CHF / mois à dès 990 CHF / mois',
} as const;

export const IOPARTNER_FR_PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'websites',
    label: 'Websites',
    description:
      'Lancement standardisé, options publiques et additions bornées pour les websites marketing et vitrines.',
    priceBand: '999 CHF + options publiques',
    anchorId: 'websites',
    note:
      'Le Launch Site sert de base. Les add-ons et corrections bornées s’ajoutent selon le périmètre validé.',
    ctaKey: 'checkout_999',
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    description:
      'Audits, bots, assistants et ateliers IA avec prix fixes pour le borné et prix de départ pour les intégrations variables.',
    priceBand: '290 CHF à dès 990 CHF',
    anchorId: 'ai-automation',
    note:
      'Les lignes “dès” couvrent les cas où le flux dépend des outils, données, validations et intégrations déjà en place.',
    ctaKey: 'diagnostic',
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    description:
      'Audits, hardening, sauvegardes et déploiements Linux/open-source avec prix publics visibles avant contact.',
    priceBand: '290 CHF à dès 2 490 CHF',
    anchorId: 'open-infrastructure',
    note:
      'Les migrations, stacks multi-service et déploiements Proxmox restent variables car le vrai coût dépend de la complexité existante.',
    ctaKey: 'diagnostic',
  },
  {
    id: 'support',
    label: 'Support',
    description:
      'Maintenance récurrente, support réactif, présence technique et advisory mensuel pour garder les opérations propres.',
    priceBand: '79 CHF / mois à dès 990 CHF / mois',
    anchorId: 'managed-support',
    note:
      'Le support récurrent se dimensionne sur la cadence, la criticité et le niveau d’implication attendu côté équipe.',
    ctaKey: 'quote',
  },
];

export const IOPARTNER_FR_PRICING_ITEMS: PricingItem[] = [
  {
    id: 'website-launch-site',
    category: 'websites',
    service: 'Launch Site',
    basePrice: '999 CHF',
    billing: 'fixed',
    scope: 'standardized',
    notes: 'Base vitrine standardisée pour démarrer rapidement.',
  },
  {
    id: 'website-booking-integration',
    category: 'websites',
    service: 'Booking Integration',
    basePrice: '250 CHF',
    billing: 'add-on',
    scope: 'standardized',
    notes: 'Ajout de prise de rendez-vous ou d’un outil équivalent.',
  },
  {
    id: 'website-business-email-setup',
    category: 'websites',
    service: 'Business Email Setup',
    basePrice: '250 CHF',
    billing: 'add-on',
    scope: 'standardized',
    notes: 'Configuration de boîtes professionnelles et réglages essentiels.',
  },
  {
    id: 'website-multilingual-setup',
    category: 'websites',
    service: 'Multilingual Setup',
    basePrice: '290 CHF',
    billing: 'add-on',
    scope: 'variable',
    notes: 'Selon le nombre de langues, contenus et ajustements nécessaires.',
  },
  {
    id: 'website-seo-optimization',
    category: 'websites',
    service: 'SEO Optimization',
    basePrice: '390 CHF',
    billing: 'add-on',
    scope: 'variable',
    notes: 'Optimisation on-page, structure et amélioration technique ciblée.',
  },
  {
    id: 'website-extra-revision-round',
    category: 'websites',
    service: 'Extra Revision Round',
    basePrice: '190 CHF',
    billing: 'fixed',
    scope: 'bounded',
    notes: 'Tour de révision supplémentaire hors cadre initial.',
  },
  {
    id: 'website-priority-delivery',
    category: 'websites',
    service: 'Priority Delivery',
    basePrice: '290 CHF',
    billing: 'fixed',
    scope: 'bounded',
    notes: 'Accélération du planning quand la production reste cadrée.',
  },
  {
    id: 'ai-workflow-audit',
    category: 'ai',
    service: 'AI Workflow Audit',
    basePrice: '290 CHF',
    billing: 'fixed',
    scope: 'bounded',
    notes: 'Audit ciblé d’un flux IA ou automation avant build.',
  },
  {
    id: 'ai-assistant-setup',
    category: 'ai',
    service: 'AI Assistant Setup',
    basePrice: 'dès 990 CHF',
    billing: 'custom',
    scope: 'variable',
    notes: 'Assistant interne ou métier selon les intégrations réelles.',
  },
  {
    id: 'ai-faq-bot',
    category: 'ai',
    service: 'AI FAQ Bot',
    basePrice: '690 CHF',
    billing: 'fixed',
    scope: 'standardized',
    notes: 'Bot FAQ cadré pour réponses publiques ou internes simples.',
  },
  {
    id: 'ai-content-pipeline',
    category: 'ai',
    service: 'AI Content Pipeline',
    basePrice: '790 CHF',
    billing: 'custom',
    scope: 'variable',
    notes: 'Pipeline de génération, validation et publication selon vos outils.',
  },
  {
    id: 'ai-prompt-library',
    category: 'ai',
    service: 'Prompt Library Creation',
    basePrice: '390 CHF',
    billing: 'fixed',
    scope: 'bounded',
    notes: 'Bibliothèque de prompts et consignes structurées pour l’équipe.',
  },
  {
    id: 'ai-team-workshop',
    category: 'ai',
    service: 'AI Team Workshop',
    basePrice: '490 CHF',
    billing: 'session',
    scope: 'bounded',
    notes: 'Atelier opérationnel pour faire adopter les bons usages.',
  },
  {
    id: 'infra-linux-migration-audit',
    category: 'infra',
    service: 'Linux Migration Audit',
    basePrice: '490 CHF',
    billing: 'fixed',
    scope: 'bounded',
    notes: 'Audit initial avant migration ou refonte d’environnement.',
  },
  {
    id: 'infra-smb-linux-migration',
    category: 'infra',
    service: 'SMB Linux Migration',
    basePrice: 'dès 1 490 CHF',
    billing: 'custom',
    scope: 'variable',
    notes: 'Migration PME selon postes, dépendances et continuité attendue.',
  },
  {
    id: 'infra-nextcloud-setup',
    category: 'infra',
    service: 'Nextcloud Setup',
    basePrice: 'dès 990 CHF',
    billing: 'custom',
    scope: 'variable',
    notes: 'Déploiement Nextcloud selon utilisateurs, stockage et accès.',
  },
  {
    id: 'infra-vps-hardening',
    category: 'infra',
    service: 'VPS Hardening',
    basePrice: '390 CHF',
    billing: 'fixed',
    scope: 'bounded',
    notes: 'Mise au propre d’un VPS existant avec sécurisation ciblée.',
  },
  {
    id: 'infra-proxmox-deployment',
    category: 'infra',
    service: 'Proxmox Deployment',
    basePrice: 'dès 2 490 CHF',
    billing: 'custom',
    scope: 'variable',
    notes: 'Déploiement Proxmox ou virtualisation plus structurée.',
  },
  {
    id: 'infra-backup-setup',
    category: 'infra',
    service: 'Backup Setup',
    basePrice: '290 CHF',
    billing: 'fixed',
    scope: 'bounded',
    notes: 'Sauvegardes de base, vérifications et routine de restauration.',
  },
  {
    id: 'support-website-care',
    category: 'support',
    service: 'Website Care',
    basePrice: '79 CHF/mo',
    billing: 'recurring',
    scope: 'standardized',
    notes: 'Maintenance légère et continuité simple pour le website.',
  },
  {
    id: 'support-managed-infra',
    category: 'support',
    service: 'Managed Infra',
    basePrice: 'dès 249 CHF/mo',
    billing: 'recurring',
    scope: 'variable',
    notes: 'Suivi infra récurrent selon fréquence, périmètre et criticité.',
  },
  {
    id: 'support-emergency-assistance',
    category: 'support',
    service: 'Emergency Assistance',
    basePrice: '190 CHF/h',
    billing: 'hourly',
    scope: 'reactive',
    notes: 'Intervention réactive quand il faut résoudre vite un incident.',
  },
  {
    id: 'support-technical-partner',
    category: 'support',
    service: 'Technical Partner',
    basePrice: 'dès 990 CHF/mo',
    billing: 'recurring',
    scope: 'strategic',
    notes: 'Présence technique plus profonde pour pilotage et décisions régulières.',
  },
  {
    id: 'support-monthly-advisory-call',
    category: 'support',
    service: 'Monthly Advisory Call',
    basePrice: '120 CHF',
    billing: 'session',
    scope: 'bounded',
    notes: 'Point mensuel de cadrage, revue et arbitrage léger.',
  },
];

export const IOPARTNER_FR_PRICING_CTA_MAP: Record<PricingCTAKey, PricingCta> = {
  checkout_999: { key: 'checkout_999', label: 'Choisir le Launch Site', href: '/choose-template?plan=essential999' },
  checkout_1500: { key: 'checkout_1500', label: 'Choisir le pack croissance', href: '/choose-template?plan=essential1500' },
  quote: { key: 'quote', label: 'Demander un devis', href: '/contact#form' },
  diagnostic: { key: 'diagnostic', label: 'Réserver le diagnostic', href: '/custom-systems#diagnostic' },
  custom_systems: { key: 'custom_systems', label: 'Voir la progression custom', href: '/custom-systems' },
};

export const IOPARTNER_FR_CUSTOM_SYSTEMS_TRACKS: CustomSystemsTrack[] = [
  {
    key: 'starter-1500',
    amountLabel: IOPARTNER_FR_PRICE_LABELS.websiteGrowth,
    title: 'Site standard + WhatsApp + Calendly',
    summary:
      'Toujours sur le moteur IOPartner, quand le sujet reste standard mais demande plus de prises de contact.',
    href: '/choose-template?plan=essential1500',
  },
  {
    key: 'private-2000',
    amountLabel: IOPARTNER_FR_PRICE_LABELS.privateCodebase,
    title: 'Codebase privée',
    summary: 'Quand vous devez sortir de l’infrastructure mutualisée et garder votre propre base de projet.',
    href: '/custom-systems?track=private-2000#diagnostic',
  },
  {
    key: 'private-2200',
    amountLabel: IOPARTNER_FR_PRICE_LABELS.privateCodebaseHandoff,
    title: 'Codebase privée + transmission',
    summary: 'Même base privée, avec passation structurée et explication claire de ce qui est livré.',
    href: '/custom-systems?track=private-2200#diagnostic',
  },
  {
    key: 'backend-4500',
    amountLabel: IOPARTNER_FR_PRICE_LABELS.backendLight,
    title: 'Back-end léger',
    summary: 'Le bon niveau pour une logique métier légère, de la collecte, de la synchronisation ou un portail simple.',
    href: '/custom-systems?track=backend-4500#diagnostic',
  },
  {
    key: 'shop-8000',
    amountLabel: IOPARTNER_FR_PRICE_LABELS.heavierSystems,
    title: 'Headless shop ou système plus lourd',
    summary: 'Quand il faut un vrai sujet d’architecture, de commerce headless, d’admin ou de plateforme interne.',
    href: '/custom-systems?track=shop-8000#diagnostic',
  },
];

export const IOPARTNER_FR_WEBSITE_FUNNEL = {
  launchTierId: 'website-launch-site',
  sprintTierId: 'website-sprint',
  growthTierId: 'website-growth',
  customTierId: 'website-custom',
  diagnosticLabel: IOPARTNER_FR_PRICE_LABELS.diagnostic,
  standardPathLead:
    'Trois repères website: 999 CHF pour lancer, 1 249 CHF pour optimiser ou migrer, 1 500 CHF pour un site croissance avec rendez-vous. Au-delà, on bascule sur la voie custom.',
} as const;

export function getPricingCategory(categoryId: PricingCategoryId): PricingCategory | undefined {
  return IOPARTNER_FR_PRICING_CATEGORIES.find((category) => category.id === categoryId);
}

export function getPricingItemsByCategory(categoryId: PricingCategoryId): PricingItem[] {
  return IOPARTNER_FR_PRICING_ITEMS.filter((item) => item.category === categoryId);
}

export function getPricingCta(ctaKey: PricingCTAKey): PricingCta {
  return IOPARTNER_FR_PRICING_CTA_MAP[ctaKey];
}
