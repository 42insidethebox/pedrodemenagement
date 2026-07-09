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
    amountChf: 2500,
    priceLabel: { fr: '2 500 CHF', en: 'CHF 2,500', de: 'CHF 2’500', it: 'CHF 2’500' },
    title: {
      fr: 'Application ou portail dédié',
      en: 'Dedicated app or portal',
      de: 'Dedizierte App oder Portal',
      it: 'App o portale dedicato',
    },
    summary: {
      fr: 'Quand le besoin demande une base projet séparée, des rôles, des écrans spécifiques ou un parcours métier.',
      en: 'When the need requires a separate project base, roles, custom screens, or a business workflow.',
      de: 'Wenn der Bedarf eine separate Projektbasis, Rollen, eigene Screens oder einen Geschäftsworkflow braucht.',
      it: 'Quando serve una base progetto separata, ruoli, schermate specifiche o un workflow métier.',
    },
    stripeDescription: {
      fr: 'IOPartner — Application ou portail dédié',
      en: 'IOPartner — Dedicated app or portal',
      de: 'IOPartner — Dedizierte App oder Portal',
      it: 'IOPartner — App o portale dedicato',
    },
  },
  'private-2200': {
    key: 'private-2200',
    amountChf: 2200,
    priceLabel: { fr: '2 200 CHF', en: 'CHF 2,200', de: 'CHF 2’200', it: 'CHF 2’200' },
    title: {
      fr: 'Site administrable + Builder.io',
      en: 'Editable site + Builder.io',
      de: 'Editierbare Website + Builder.io',
      it: 'Sito modificabile + Builder.io',
    },
    summary: {
      fr: 'Même logique de présence web, avec Builder.io configuré et une passation visuelle pour modifier certaines zones à vos risques.',
      en: 'Same web-presence logic, with Builder.io configured and a visual handoff to edit selected areas at your own risk.',
      de: 'Gleiche Web-Präsenz-Logik, mit Builder.io und visueller Übergabe für ausgewählte Bereiche auf eigenes Risiko.',
      it: 'Stessa logica di presenza web, con Builder.io configurato e handoff visuale per modificare alcune zone a vostro rischio.',
    },
    stripeDescription: {
      fr: 'IOPartner — Site administrable + Builder.io',
      en: 'IOPartner — Editable site + Builder.io',
      de: 'IOPartner — Editierbare Website + Builder.io',
      it: 'IOPartner — Sito modificabile + Builder.io',
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
