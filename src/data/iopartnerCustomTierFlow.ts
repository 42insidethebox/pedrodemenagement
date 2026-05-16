export type IoPartnerCustomTierKey = 'private-2000' | 'private-2200' | 'backend-4500' | 'shop-8000';

export type IoPartnerCustomTierConfig = {
  key: IoPartnerCustomTierKey;
  amountChf: number | null;
  fallbackPlan?: 'session140';
  priceLabel: {
    fr: string;
    en: string;
    de: string;
    it: string;
  };
  title: {
    fr: string;
    en: string;
    de: string;
    it: string;
  };
  summary: {
    fr: string;
    en: string;
    de: string;
    it: string;
  };
  stripeDescription: {
    fr: string;
    en: string;
    de: string;
    it: string;
  };
};

export const IOPARTNER_CUSTOM_TIER_FLOW: Record<IoPartnerCustomTierKey, IoPartnerCustomTierConfig> = {
  'private-2000': {
    key: 'private-2000',
    amountChf: 2000,
    priceLabel: { fr: '2 000 CHF', en: 'CHF 2,000', de: 'CHF 2’000', it: 'CHF 2’000' },
    title: {
      fr: 'Codebase privée',
      en: 'Private codebase',
      de: 'Private Codebase',
      it: 'Codebase privato',
    },
    summary: {
      fr: 'Quand vous voulez sortir de l’infrastructure mutualisée et garder votre propre base de projet.',
      en: 'When you want to leave the shared infrastructure and keep your own project base.',
      de: 'Wenn Sie die gemeinsame Infrastruktur verlassen und eine eigene Projektbasis behalten wollen.',
      it: 'Quando volete uscire dall’infrastruttura condivisa e mantenere una vostra base di progetto.',
    },
    stripeDescription: {
      fr: 'IOPartner — Codebase privée',
      en: 'IOPartner — Private codebase',
      de: 'IOPartner — Private Codebase',
      it: 'IOPartner — Codebase privato',
    },
  },
  'private-2200': {
    key: 'private-2200',
    amountChf: 2200,
    priceLabel: { fr: '2 200 CHF', en: 'CHF 2,200', de: 'CHF 2’200', it: 'CHF 2’200' },
    title: {
      fr: 'Codebase privée + transmission',
      en: 'Private codebase + handoff',
      de: 'Private Codebase + Übergabe',
      it: 'Codebase privato + passaggio',
    },
    summary: {
      fr: 'Même base privée, avec une vraie passation et une explication structurée de ce qui a été livré.',
      en: 'Same private base, with a real handoff and a structured explanation of what was delivered.',
      de: 'Gleiche private Basis, mit echter Übergabe und strukturierter Erklärung des Lieferumfangs.',
      it: 'Stessa base privata, con una vera passazione e una spiegazione strutturata di ciò che è stato consegnato.',
    },
    stripeDescription: {
      fr: 'IOPartner — Codebase privée + transmission',
      en: 'IOPartner — Private codebase + handoff',
      de: 'IOPartner — Private Codebase + Übergabe',
      it: 'IOPartner — Codebase privato + passaggio',
    },
  },
  'backend-4500': {
    key: 'backend-4500',
    amountChf: 4500,
    priceLabel: { fr: '4 500 CHF', en: 'CHF 4,500', de: 'CHF 4’500', it: 'CHF 4’500' },
    title: {
      fr: 'Back-end léger',
      en: 'Light backend',
      de: 'Leichtes Backend',
      it: 'Backend leggero',
    },
    summary: {
      fr: 'Le bon niveau pour un “hello backend” sérieux : logique métier légère, collecte, synchronisation ou portail simple.',
      en: 'The right level for a serious “hello backend”: light business logic, intake, sync, or a simple portal.',
      de: 'Das richtige Niveau für ein seriöses “Hello Backend”: leichte Business-Logik, Intake, Sync oder ein simples Portal.',
      it: 'Il livello giusto per un “hello backend” serio: logica business leggera, intake, sync o portale semplice.',
    },
    stripeDescription: {
      fr: 'IOPartner — Back-end léger',
      en: 'IOPartner — Light backend',
      de: 'IOPartner — Leichtes Backend',
      it: 'IOPartner — Backend leggero',
    },
  },
  'shop-8000': {
    key: 'shop-8000',
    amountChf: null,
    fallbackPlan: 'session140',
    priceLabel: { fr: '8 000+ CHF', en: 'CHF 8,000+', de: 'CHF 8’000+', it: 'CHF 8’000+' },
    title: {
      fr: 'Headless shop ou système plus lourd',
      en: 'Headless shop or heavier system',
      de: 'Headless Shop oder schwereres System',
      it: 'Headless shop o sistema più pesante',
    },
    summary: {
      fr: 'Quand il faut un vrai sujet d’architecture, de commerce headless, d’admin, de portail ou de plateforme interne.',
      en: 'When it is a real architecture, headless commerce, admin, portal, or internal platform subject.',
      de: 'Wenn es ein echtes Architektur-, Headless-Commerce-, Admin-, Portal- oder internes Plattformthema ist.',
      it: 'Quando serve un vero tema di architettura, commercio headless, admin, portale o piattaforma interna.',
    },
    stripeDescription: {
      fr: 'IOPartner — Session architecture 1 h',
      en: 'IOPartner — 1h architecture session',
      de: 'IOPartner — 1h Architektur-Session',
      it: 'IOPartner — Sessione architettura 1 h',
    },
  },
};

