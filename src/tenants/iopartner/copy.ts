import { detectRequestLocale } from '../../lib/locale.js';

import {
  iopartnerConfig,
  iopartnerLaunchOffers,
  iopartnerSystemsOffers,
  type IoPartnerLaunchOfferKey,
  type IoPartnerSystemsOfferKey,
} from './config.js';

export const IOPARTNER_LOCALES = ['fr', 'en', 'de', 'it'] as const;

export type IoPartnerLocale = (typeof IOPARTNER_LOCALES)[number];
export type IoPartnerPageKey = 'home' | 'services' | 'pricing' | 'contact' | 'privacy' | 'terms';

type IoPartnerCopy = {
  shell: any;
  meta: Record<IoPartnerPageKey, { title: string; description: string }>;
  home: any;
  services: any;
  pricing: any;
  contact: any;
  privacy: any;
  terms: any;
};

const isIoPartnerLocale = (value: string): value is IoPartnerLocale =>
  IOPARTNER_LOCALES.includes(value as IoPartnerLocale);

const hostFromRequest = (request: Request, url?: URL | string | null) => {
  const targetUrl = url instanceof URL ? url : url ? new URL(url, request.url) : new URL(request.url);

  return [request.headers.get('x-forwarded-host'), request.headers.get('host'), targetUrl.host]
    .flatMap((value) => (value || '').split(','))
    .map((value) => value.trim().toLowerCase().split(':')[0])
    .filter(Boolean);
};

export function resolveIoPartnerLocale(request: Request, url?: URL | string | null): IoPartnerLocale {
  const detected = detectRequestLocale(request, url, 'fr');
  return isIoPartnerLocale(detected) ? detected : 'fr';
}

export function resolveIoPartnerBasePath(request: Request, url?: URL | string | null) {
  const isIoPartnerHost = hostFromRequest(request, url).some((host) => host.includes(iopartnerConfig.domain));
  return isIoPartnerHost ? '' : iopartnerConfig.basePath;
}

const launchFirst = iopartnerLaunchOffers[0];
const launchSecond = iopartnerLaunchOffers[1];
const launchThird = iopartnerLaunchOffers[2];
const systemsFirst = iopartnerSystemsOffers[0];
const systemsSecond = iopartnerSystemsOffers[1];
const systemsThird = iopartnerSystemsOffers[2];

const copy: Record<IoPartnerLocale, IoPartnerCopy> = {
  fr: {
    shell: {
      logoTagline: 'Web systems and operator advisory',
      languageLabel: 'Langue',
      nav: {
        services: 'Services',
        pricing: 'Tarifs',
        contact: 'Contact',
      },
      workspace: {
        label: 'Pages app',
        overview: 'Vue d’ensemble',
        clients: 'Clients',
        projects: 'Projets',
        websites: 'Sites',
        tasks: 'Taches',
        documents: 'Documents',
        invoices: 'Factures',
        orders: 'Commandes',
        support: 'Support',
        subscriptions: 'Abonnements',
        settings: 'Parametres',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'Base en Suisse',
      deliveryArtifact: 'Conseil adosse a la livraison',
      footer: {
        positioningLabel: 'Positionnement',
        positioningTitle: 'Un partenaire pour lancer, operer et arbitrer.',
        positioningBody:
          "IO Partner rassemble l'ancienne couche TonSiteWeb et la couche Precision Systems: lancement web, revue operateur, infrastructure Linux et accompagnement de gouvernance leger, dans le meme interlocuteur.",
        navigateLabel: 'Navigation',
        directLabel: 'Direct',
        privacy: 'Confidentialite',
        terms: 'Conditions',
        location: 'Lausanne, Suisse',
      },
      whatsappPrefillMessage: 'Bonjour, je souhaite reserver un diagnostic IO Partner sur Teams.',
    },
    meta: {
      home: {
        title: 'IO Partner',
        description:
          'Web systems, diagnostics, Linux implementation and advisory board support for operators who need one serious partner.',
      },
      services: {
        title: 'Services',
        description:
          'IO Partner couvre les sites web, les workflows, les systemes Linux, les revues operateur et un accompagnement advisory board.',
      },
      pricing: {
        title: 'Tarifs',
        description:
          'Trois offres web de lancement, puis diagnostic Teams, session de travail et formule advisory board.',
      },
      contact: {
        title: 'Contact',
        description:
          'Reserve un diagnostic Teams, ecris sur WhatsApp ou contacte IO Partner pour un projet web, Linux ou advisory board.',
      },
      privacy: {
        title: 'Confidentialite',
        description: 'Traitement des donnees pour les demandes, reservations et projets IO Partner.',
      },
      terms: {
        title: 'Conditions',
        description: 'Conditions simples pour les diagnostics, projets et accompagnements IO Partner.',
      },
    },
    home: {
      eyebrow: 'Web systems, Linux, advisory',
      title: 'Un seul partenaire pour lancer, clarifier et faire tourner les systemes qui soutiennent votre activite.',
      lead: "IO Partner fusionne l'ancienne logique TonSiteWeb et Precision Systems. Vous pouvez y entrer par un site web a lancer, un diagnostic Teams de 15 minutes, un besoin Linux ou un besoin de regard senior plus continu.",
      ctaBook: 'Reserver 15 min sur Teams',
      ctaWhatsapp: 'Verifier le fit sur WhatsApp',
      heroCard: {
        eyebrow: 'Ce que couvre IO Partner',
        title: 'Build plus advisory, pas seulement du discours.',
        points: [
          'Sites web et workflows de lancement pour PME, agences et independants.',
          'Diagnostics operateur quand une decision est urgente, floue ou bloquee.',
          'Systèmes Linux, self-hosting raisonnable, structure outillage et supervision.',
          'Formule advisory board pour garder un cerveau senior au-dessus des priorites.',
        ],
        note: "Le point fort n'est pas un outil particulier. C'est la capacite a diagnostiquer, cadrer puis executer ou superviser la suite.",
      },
      areas: {
        eyebrow: 'Axes',
        title: 'Quatre couches qui peuvent vivre ensemble.',
        cards: [
          {
            title: 'Launch web systems',
            body: 'Sites vitrines, structure de contenu, mise en ligne, workflows legers et socle commercial propre.',
          },
          {
            title: 'Diagnostic Teams',
            body: 'Une session courte pour cadrer un choix, une friction, un repositionnement ou une priorite technique.',
          },
          {
            title: 'Linux and operations',
            body: 'Machines, services, tooling, self-hosting pragmatique, hygiene infrastructure et simplification.',
          },
          {
            title: 'Advisory board light',
            body: 'Revue reguliere des priorites, lecture externe senior, arbitrages et escalade quand il faut decider vite.',
          },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'Sorties',
          title: 'Ce qui repart avec vous',
          items: [
            'Un cadrage plus propre du probleme.',
            'Une recommandation concrete sur le prochain mouvement.',
            'Un memo ou une carte de decision quand le sujet le demande.',
            'Si besoin, un scope de livraison web, Linux ou workflow.',
          ],
        },
        fit: {
          eyebrow: 'Bon fit',
          title: 'Quand IO Partner est le plus utile',
          items: [
            'Vous voulez un seul point de contact entre advisory et execution.',
            'Votre site, vos operations ou vos outils creent une friction reelle.',
            'Vous avez besoin de seniorite sans recruter a plein temps.',
            'Vous cherchez un partenaire qui peut aussi livrer.',
          ],
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: "Le pipeline fait partie de l'offre.",
        lead: 'Teams si le sujet est court. Scope et delivery si la suite le justifie. Le point dentree reste simple.',
        nodes: [
          { label: '01', title: 'Creneau choisi', body: 'Le bon point dentree est choisi: site, diagnostic Teams, Linux ou advisory.' },
          { label: '02', title: 'Fit confirme', body: 'Le besoin est qualifie avant de mobiliser du temps ou un projet plus large.' },
          { label: '03', title: 'Lien Teams ou brief', body: 'Vous recevez le lien de session ou le cadre de brief selon le type de mission.' },
          { label: '04', title: 'Diagnostic ou revue', body: 'Le sujet est travaille sans detour: decision, architecture, priorites ou friction operationnelle.' },
          { label: '05', title: 'Next step scope', body: 'Vous repartez avec une recommandation, un plan de lancement, un scope Linux ou une formule continue.' },
        ],
      },
      closing: {
        eyebrow: 'Start here',
        title: (config: typeof iopartnerConfig) =>
          `${config.offerDuration} pour verifier si le sujet doit rester court ou devenir un vrai chantier.`,
        lead: "Si le sujet merite plus, IO Partner peut ensuite basculer vers la livraison web, la structuration Linux ou une formule advisory board.",
        ctaContact: 'Voir le contact',
        ctaPricing: 'Voir les tarifs',
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Un site web, un diagnostic, un systeme Linux ou un board advisory: meme logique, meme standard.',
      lead: "IO Partner travaille pour des operateurs qui ne veulent pas separer artificiellement le conseil, la structure et l'execution.",
      cards: [
        {
          eyebrow: '01',
          title: 'Launch web systems',
          body: 'Socle web pour lancer une presence propre et utile, avec la logique TonSiteWeb conservee a l interieur de la nouvelle marque.',
          items: [
            'Site vitrine et pages de conversion.',
            'Choix de structure, contenu, workflow et mise en ligne.',
            'Packs clairs pour independants, agences et PME.',
          ],
        },
        {
          eyebrow: '02',
          title: 'Teams diagnostics',
          body: 'Session courte quand il faut arbitrer une question commerciale, technique ou operatoire sans theatre de consulting.',
          items: [
            'Decision framing.',
            'Positionnement et architecture d offre.',
            'Workflow drag, tooling sprawl, AI fit.',
          ],
        },
        {
          eyebrow: '03',
          title: 'Linux systems option',
          body: 'Quand le besoin depasse le site: machines, services, observabilite, hygiene et architecture simple mais defendable.',
          items: [
            'Linux servers and service setup.',
            'Self-hosting pragmatique et maintenance raisonnable.',
            'Documentation, supervision et reduction de complexite.',
          ],
        },
        {
          eyebrow: '04',
          title: 'Advisory board light',
          body: "Une formule pour garder un regard senior au-dessus des priorites sans monter une couche de management fictive.",
          items: [
            'Cadence mensuelle ou bimensuelle.',
            'Revue des priorites et des risques.',
            'Support de decision pour fondateurs, operateurs et petites equipes.',
          ],
        },
      ],
      fit: {
        good: {
          eyebrow: 'Bon fit',
          title: 'Quand reserver',
          items: [
            'Vous avez un besoin operatoire reel, pas juste une curiosite.',
            'Vous voulez que le conseil puisse ensuite se traduire en livraison.',
            'Vous avez besoin de clarifier un sujet web, Linux ou workflow vite.',
          ],
        },
        bad: {
          eyebrow: 'Pas le bon fit',
          title: 'Quand ne pas reserver',
          items: [
            'Vous cherchez du support grand public ou du depannage informatique diffuse.',
            'Vous voulez une exploration gratuite sans intention claire.',
            'Vous attendez un grand programme de transformation flou sans proprietaire interne.',
          ],
        },
      },
      closing: {
        eyebrow: 'Point dentree',
        title: (config: typeof iopartnerConfig) =>
          `${config.offerDuration} sur Teams pour cadrer avant de surconstruire.`,
        lead: "Le diagnostic court sert de filtre. Si le bon mouvement est un site, un systeme Linux ou un accompagnement advisory board, la suite se scope apres.",
        ctaBook: 'Reserver le diagnostic',
        ctaPricing: 'Comparer les offres',
      },
    },
    pricing: {
      eyebrow: 'Tarifs',
      title: 'Deux couches de prix: lancer vite, puis arbitrer ou structurer plus lourd si le sujet le merite.',
      lead: "Le bloc web garde la logique TonSiteWeb. Le bloc systems couvre le diagnostic Teams, les sessions de travail et l'accompagnement continu.",
      launch: {
        eyebrow: 'Lancement web',
        title: 'Les offres de lancement',
        lead: 'Pour mettre en ligne un site utile rapidement, avec le bon niveau de workflow selon la complexite.',
        tiers: {
          launch: {
            eyebrow: 'Essentiel',
            title: 'Site vitrine',
            summary: 'Le point de depart le plus simple pour etre en ligne proprement.',
            items: [
              'Site vitrine professionnel.',
              'Structure de contenu et contact.',
              'Livraison typique en quelques jours ouvrables.',
            ],
            cta: 'Demarrer ce niveau',
          },
          launchWorkflow: {
            eyebrow: 'Workflow',
            title: 'Site + un workflow',
            summary: 'Pour ajouter une automatisation legere sans transformer le projet en monstre.',
            items: [
              'Tout le pack essentiel.',
              'Une integration ou automatisation legere.',
              'Meilleure continuité entre site et operations.',
            ],
            cta: 'Verifier ce niveau',
          },
          launchOps: {
            eyebrow: 'Ops stack',
            title: 'Site + ops stack',
            summary: 'Quand le site doit deja s accrocher a plusieurs flux ou a une logique plus operatoire.',
            items: [
              'Tout le niveau precedent.',
              'Deux a trois automatisations ou handoffs.',
              'Plus de rigueur de scope et de livraison.',
            ],
            cta: 'Discuter de ce niveau',
          },
        },
      },
      systems: {
        eyebrow: 'Systems and advisory',
        title: 'Le bloc Teams, Linux et advisory board',
        lead: "Le diagnostic est le filtre. Les sessions longues et la formule board existent pour les sujets qui ont vraiment gagne le droit d'etre traites plus loin.",
        tiers: {
          diagnostic: {
            eyebrow: 'Teams diagnostic',
            title: '15-minute operator cut',
            summary: 'Session payante courte pour clarifier un point de friction ou de decision.',
            items: [
              'Teams discussion concentree.',
              'Arbitrage, clarification ou fit assessment.',
              'Recommandation sur la suite.',
            ],
            cta: 'Reserver Teams',
          },
          working: {
            eyebrow: 'Working session',
            title: 'Session de travail',
            summary: 'Pour un sujet qui a besoin de plus de profondeur ou d architecture.',
            items: [
              'Temps plus long et signal plus dense.',
              'Web systems, Linux, workflow ou decision structure.',
              'Peut deboucher sur un vrai scope de livraison.',
            ],
            cta: 'Demander une session',
          },
          board: {
            eyebrow: 'Advisory board',
            title: 'Retainer de supervision',
            summary: 'Une couche legere de seniorite continue pour garder les priorites propres.',
            items: [
              'Cadence mensuelle ou bimensuelle.',
              'Board operatorial, pas coaching flou.',
              'Bon fit pour fondateurs, agences et petites equipes.',
            ],
            cta: 'Discuter du board',
          },
        },
      },
      process: {
        eyebrow: 'Process',
        title: 'Toujours le meme pipeline court.',
        lead: 'Entree simple, scope propre, escalation seulement si la suite le justifie.',
        nodes: [
          { label: '01', title: 'Need chosen', body: 'Web launch, Teams diagnostic, Linux option or advisory board.' },
          { label: '02', title: 'Fit checked', body: 'Le bon niveau de prix et de temps est choisi avant engagement plus large.' },
          { label: '03', title: 'Session or brief', body: 'Teams link, brief structure or scope conversation sent ahead of time.' },
          { label: '04', title: 'Live work', body: 'Decision, review or build direction happens in live context, not in vague back-and-forth.' },
          { label: '05', title: 'Scoped next move', body: 'Memo, launch plan, Linux scope or recurring board cadence.' },
        ],
      },
      cards: [
        {
          title: 'Linux implementation is scoped separately',
          body: 'Les projets Linux ou self-hosted ne sont pas vendus comme une case magique. Le diagnostic determine si le besoin est reel et comment le structurer.',
        },
        {
          title: 'The board is limited on purpose',
          body: 'La formule advisory board reste selective. Elle est utile quand il y a de vraies decisions recurrentes, pas pour occuper un abonnement.',
        },
        {
          title: 'Not every project starts with a site',
          body: 'IO Partner peut commencer par Teams, par un brief web ou par une friction infrastructure selon le vrai point de blocage.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Le moyen le plus propre: reserver Teams si le sujet tient en 15 minutes, sinon envoyer le contexte.',
      lead: "Le point dentree n'a pas besoin d'etre dramatise. Choisissez le bon canal et IO Partner cadrera la suite.",
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Envoyer le contexte',
          body: 'Pratique si vous devez decrire rapidement le sujet avant de choisir entre site, Linux, Teams ou board.',
          cta: 'Ecrire sur WhatsApp',
        },
        booking: {
          eyebrow: 'Teams',
          title: 'Reserver le diagnostic',
          liveBody: 'Choisissez un creneau et recevez le lien Teams automatiquement.',
          fallbackBody: 'Demandez le lien de reservation ou le bon creneau via WhatsApp si le calendrier public nest pas encore branche.',
          liveCta: 'Ouvrir la reservation',
          fallbackCta: 'Demander le lien',
        },
        email: {
          eyebrow: 'Email',
          title: 'Projet plus large',
          body: 'Pour un contexte plus long, un scope Linux ou une formule board, le mail reste utile.',
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Choix du canal, puis cadrage rapide.',
        lead: 'WhatsApp, Teams ou email: le premier objectif reste le meme, reduire le bruit avant de faire grossir le sujet.',
        nodes: [
          { label: '01', title: 'Channel chosen', body: 'WhatsApp, Teams or email depending on how formed the need already is.' },
          { label: '02', title: 'Context received', body: 'The need is framed before a larger promise is made.' },
          { label: '03', title: 'Right entry point', body: 'Short Teams call, web brief, Linux review or board conversation.' },
          { label: '04', title: 'Live clarification', body: 'The important tradeoffs are named explicitly.' },
          { label: '05', title: 'Next step', body: 'Booking, scope, delivery or recurring cadence.' },
        ],
      },
      notes: {
        eyebrow: 'Notes',
        items: () => [
          `Diagnostic court: ${systemsFirst.duration} pour ${systemsFirst.price}.`,
          `Session de travail: ${systemsSecond.duration} pour ${systemsSecond.price}.`,
          `Formule board: ${systemsThird.price}, scope apres fit.`,
          'Les sujets Linux ou de livraison plus lourde sont scopes apres le premier cadrage.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Confidentialite',
      title: 'Une politique simple pour un partenaire qui traite des sujets operatoires parfois sensibles.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} traite les informations necessaires pour repondre a une demande, reserver une session, livrer un projet ou preparer un accompagnement continu.`,
      collected: {
        title: 'Ce qui peut etre collecte',
        items: [
          'Nom, email, telephone et informations de reservation ou de paiement.',
          'Contexte partage sur votre activite, votre site, vos systemes, vos outils ou votre infrastructure.',
          'Elements techniques ou notes de cadrage utilises pour comprendre le besoin et preparer la suite.',
        ],
      },
      usage: {
        title: 'Usage',
        items: [
          'Repondre a votre message et verifier le bon point dentree.',
          'Traiter un diagnostic, un projet web, un scope Linux ou un accompagnement board.',
          'Envoyer un suivi, un memo ou une proposition quand cela a ete demande.',
        ],
      },
      tools: {
        title: 'Outils externes',
        body: 'La reservation peut passer par Calendly, la messagerie par WhatsApp, les sessions par Microsoft Teams et le paiement par le canal de paiement choisi. Chaque fournisseur peut traiter les donnees selon sa propre politique.',
        contactLead: 'Pour une question sur les donnees ou une demande de suppression, ecrivez a',
      },
    },
    terms: {
      eyebrow: 'Conditions',
      title: 'Conditions simples pour des diagnostics, des projets et une couche advisory.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} opere des diagnostics, des projets web, des scopes Linux et des accompagnements continus via ${config.operator}. Toute reservation ou commande implique l'acceptation des principes ci-dessous.`,
      scope: {
        title: 'Perimetre',
        items: () => [
          `${launchFirst.label}: ${launchFirst.price}.`,
          `${launchSecond.label}: ${launchSecond.price}.`,
          `${launchThird.label}: ${launchThird.price}.`,
          `${systemsFirst.label}: ${systemsFirst.duration} pour ${systemsFirst.price}.`,
          `${systemsSecond.label}: ${systemsSecond.duration} pour ${systemsSecond.price}.`,
          `Advisory board: ${systemsThird.price}, scope et cadence apres qualification.`,
        ],
      },
      scheduling: {
        title: 'Organisation',
        items: [
          'Le contexte doit etre fourni assez tot pour rendre le temps reserve utile.',
          'Les sujets Linux ou de livraison plus lourde peuvent necessiter un scope separe avant execution.',
          'Le resultat promis est un cadrage, une recommandation ou une livraison definie, pas une garantie business abstraite.',
        ],
      },
      confidentiality: {
        title: 'Confidentialite et usage',
        body: 'Les informations partagees sont traitees comme confidentielles et utilisees uniquement pour comprendre le besoin, fournir la mission demandee et preparer les suivis explicitement utiles.',
        contactLead: 'Les questions contractuelles peuvent etre envoyees a',
      },
    },
  },
  en: {
    shell: {
      logoTagline: 'Web systems and operator advisory',
      languageLabel: 'Language',
      nav: {
        services: 'Services',
        pricing: 'Pricing',
        contact: 'Contact',
      },
      workspace: {
        label: 'App pages',
        overview: 'Overview',
        clients: 'Clients',
        projects: 'Projects',
        websites: 'Websites',
        tasks: 'Tasks',
        documents: 'Documents',
        invoices: 'Invoices',
        orders: 'Orders',
        support: 'Support',
        subscriptions: 'Subscriptions',
        settings: 'Settings',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'Swiss-based',
      deliveryArtifact: 'Advisory backed by delivery',
      footer: {
        positioningLabel: 'Positioning',
        positioningTitle: 'One partner for launch, systems, and operator decisions.',
        positioningBody:
          'IO Partner merges the old TonSiteWeb layer with the Precision Systems layer: launch-ready web systems, paid diagnostics, Linux implementation, and light advisory board support under one serious operating relationship.',
        navigateLabel: 'Navigate',
        directLabel: 'Direct',
        privacy: 'Privacy',
        terms: 'Terms',
        location: 'Lausanne, Switzerland',
      },
      whatsappPrefillMessage: 'Hello, I would like to book an IO Partner Teams diagnostic.',
    },
    meta: {
      home: {
        title: 'IO Partner',
        description:
          'IO Partner combines websites, operator diagnostics, Linux systems work, and advisory board support for modern operators.',
      },
      services: {
        title: 'Services',
        description:
          'Web launch, Teams diagnostics, Linux systems implementation, and light advisory board support.',
      },
      pricing: {
        title: 'Pricing',
        description:
          'Three launch offers, plus paid Teams diagnostics, working sessions, and advisory board support.',
      },
      contact: {
        title: 'Contact',
        description:
          'Book a Teams diagnostic or send context for a website, Linux systems, workflow, or advisory board need.',
      },
      privacy: {
        title: 'Privacy',
        description: 'Privacy information for IO Partner enquiries, sessions, and delivery work.',
      },
      terms: {
        title: 'Terms',
        description: 'Simple terms for IO Partner diagnostics, delivery, and recurring support.',
      },
    },
    home: {
      eyebrow: 'Web systems, Linux, advisory',
      title: 'One partner to launch, clarify, and run the systems behind your business.',
      lead: 'IO Partner merges what TonSiteWeb and Precision Systems used to do separately. You can enter through a website launch, a paid 15-minute Teams diagnostic, a Linux systems need, or a lighter advisory board relationship.',
      ctaBook: 'Book 15 min on Teams',
      ctaWhatsapp: 'Check fit on WhatsApp',
      heroCard: {
        eyebrow: 'What IO Partner covers',
        title: 'Build plus advisory, not abstract thinking sessions.',
        points: [
          'Launch-ready websites and operating workflows for SMEs, agencies, and independents.',
          'Short operator diagnostics when a decision is urgent, unclear, or blocked.',
          'Linux systems, pragmatic self-hosting, tooling structure, and operational hygiene.',
          'Advisory board style support to keep a senior mind above the priorities.',
        ],
        note: 'The differentiator is not a specific tool. It is the ability to diagnose, frame, then either deliver or supervise the next step.',
      },
      areas: {
        eyebrow: 'Layers',
        title: 'Four layers that can live together.',
        cards: [
          { title: 'Launch web systems', body: 'Showcase sites, content structure, go-live, light workflows, and a clean commercial base.' },
          { title: 'Teams diagnostic', body: 'A short paid session to frame a choice, friction, repositioning issue, or technical priority.' },
          { title: 'Linux and operations', body: 'Machines, services, pragmatic self-hosting, tool structure, and simplification.' },
          { title: 'Advisory board light', body: 'A recurring senior layer for priorities, reviews, and decisions without fake management theatre.' },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'Outputs',
          title: 'What leaves the session',
          items: [
            'A cleaner definition of the real problem.',
            'A defensible next move.',
            'A memo or decision map when the topic needs it.',
            'If relevant, a scoped web, Linux, or workflow delivery path.',
          ],
        },
        fit: {
          eyebrow: 'Good fit',
          title: 'When IO Partner is most useful',
          items: [
            'You want one serious point of contact between advisory and delivery.',
            'Your site, operations, or tools are creating real drag.',
            'You need senior judgment without hiring full time.',
            'You want a partner who can also implement.',
          ],
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'The pipeline is part of the promise.',
        lead: 'Teams when the issue is short. Scope and delivery when the issue earns it. The entry stays simple.',
        nodes: [
          { label: '01', title: 'Need chosen', body: 'Website launch, Teams diagnostic, Linux option, or advisory board.' },
          { label: '02', title: 'Fit confirmed', body: 'The right level is chosen before more time or scope gets consumed.' },
          { label: '03', title: 'Teams link or brief', body: 'You receive the call link or the project brief structure ahead of time.' },
          { label: '04', title: 'Live review', body: 'The issue is worked directly: decision, architecture, priorities, or operating friction.' },
          { label: '05', title: 'Next-step scope', body: 'Recommendation, launch plan, Linux scope, or recurring board cadence.' },
        ],
      },
      closing: {
        eyebrow: 'Start here',
        title: (config: typeof iopartnerConfig) =>
          `${config.offerDuration} to decide whether the issue should stay short or become a real project.`,
        lead: 'If the issue deserves more, IO Partner can move from the diagnostic into web delivery, Linux structure, or recurring operator support.',
        ctaContact: 'Open contact',
        ctaPricing: 'View pricing',
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Website launch, operator diagnostics, Linux systems, and advisory board support under one roof.',
      lead: 'IO Partner is built for operators who do not want to separate advice, systems structure, and practical delivery into disconnected vendors.',
      cards: [
        {
          eyebrow: '01',
          title: 'Launch web systems',
          body: 'The TonSiteWeb commercial logic stays inside the merged brand as a cleaner launch layer.',
          items: ['Showcase sites and conversion pages.', 'Content structure, workflow choices, and go-live.', 'Clear launch packs for independents, agencies, and SMEs.'],
        },
        {
          eyebrow: '02',
          title: 'Teams diagnostics',
          body: 'Short paid sessions for commercial, technical, or operating questions that need signal more than theatre.',
          items: ['Decision framing.', 'Positioning and offer architecture.', 'Workflow drag, tool sprawl, AI fit.'],
        },
        {
          eyebrow: '03',
          title: 'Linux systems option',
          body: 'When the need goes beyond a site: machines, services, hygiene, observability, and operational simplicity.',
          items: ['Linux servers and service setup.', 'Pragmatic self-hosting and maintenance.', 'Documentation, supervision, and complexity reduction.'],
        },
        {
          eyebrow: '04',
          title: 'Advisory board light',
          body: 'A recurring senior layer to review priorities and risks without turning the relationship into vague coaching.',
          items: ['Monthly or twice-monthly cadence.', 'Priority and risk review.', 'Useful for founders, agencies, and small operator teams.'],
        },
      ],
      fit: {
        good: {
          eyebrow: 'Good fit',
          title: 'When to book',
          items: [
            'You have a real operating need, not just curiosity.',
            'You want advice that can translate into delivery.',
            'You need to clarify a web, Linux, workflow, or board-level issue fast.',
          ],
        },
        bad: {
          eyebrow: 'Not the fit',
          title: 'When not to book',
          items: [
            'You need consumer-style IT support or diffuse troubleshooting.',
            'You want free brainstorming with no commercial intent.',
            'You expect a vague large transformation promise with no internal owner.',
          ],
        },
      },
      closing: {
        eyebrow: 'Entry point',
        title: (config: typeof iopartnerConfig) => `${config.offerDuration} on Teams before overbuilding the problem.`,
        lead: 'The short diagnostic stays the filter. If the right move is a site, a Linux scope, or a board-style relationship, that gets scoped after the call.',
        ctaBook: 'Book the diagnostic',
        ctaPricing: 'Compare offers',
      },
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Two layers of pricing: launch quickly, then structure heavier work only if the issue earns it.',
      lead: 'The website layer keeps the old TonSiteWeb logic. The systems layer covers Teams diagnostics, working sessions, and recurring senior support.',
      launch: {
        eyebrow: 'Web launch',
        title: 'Launch offers',
        lead: 'For getting a useful site live quickly, with the right amount of workflow depending on complexity.',
        tiers: {
          launch: {
            eyebrow: 'Essential',
            title: 'Showcase site',
            summary: 'The cleanest starting level for getting online properly.',
            items: ['Professional showcase site.', 'Content structure and contact flow.', 'Typical delivery in a few business days.'],
            cta: 'Start this level',
          },
          launchWorkflow: {
            eyebrow: 'Workflow',
            title: 'Site + one workflow',
            summary: 'For adding a light automation without turning the project into a monster.',
            items: ['Everything in essential.', 'One light integration or automation.', 'Better continuity between site and operations.'],
            cta: 'Check this level',
          },
          launchOps: {
            eyebrow: 'Ops stack',
            title: 'Site + ops stack',
            summary: 'When the site already needs to connect to several flows or a more operational structure.',
            items: ['Everything in the previous level.', 'Two to three automations or handoffs.', 'More rigour in scope and delivery.'],
            cta: 'Discuss this level',
          },
        },
      },
      systems: {
        eyebrow: 'Systems and advisory',
        title: 'Teams, Linux, and board support',
        lead: 'The diagnostic is the filter. Longer sessions and the board layer exist for issues that genuinely deserve more depth.',
        tiers: {
          diagnostic: {
            eyebrow: 'Teams diagnostic',
            title: '15-minute operator cut',
            summary: 'A short paid session for clarifying a friction point or a decision.',
            items: ['Focused Teams discussion.', 'Decision, clarification, or fit assessment.', 'Recommendation on the next move.'],
            cta: 'Book Teams',
          },
          working: {
            eyebrow: 'Working session',
            title: 'Working session',
            summary: 'For issues that need more depth, architecture, or live review.',
            items: ['Longer time window and denser signal.', 'Web systems, Linux, workflows, or decision structure.', 'Can turn into a real scoped delivery path.'],
            cta: 'Request session',
          },
          board: {
            eyebrow: 'Advisory board',
            title: 'Recurring senior layer',
            summary: 'A light retainer for keeping priorities and decisions cleaner over time.',
            items: ['Monthly or twice-monthly cadence.', 'Operator board, not vague coaching.', 'Best for founders, agencies, and small teams.'],
            cta: 'Discuss board support',
          },
        },
      },
      process: {
        eyebrow: 'Process',
        title: 'The same short pipeline every time.',
        lead: 'Simple entry, clean scope, escalation only when the issue earns it.',
        nodes: [
          { label: '01', title: 'Need chosen', body: 'Website launch, Teams diagnostic, Linux option, or advisory board.' },
          { label: '02', title: 'Fit checked', body: 'The right price and time level are chosen before larger promises are made.' },
          { label: '03', title: 'Session or brief', body: 'Teams link, brief structure, or scope conversation sent ahead of time.' },
          { label: '04', title: 'Live work', body: 'Decision, review, or build direction happens in live context, not vague back-and-forth.' },
          { label: '05', title: 'Scoped next move', body: 'Memo, launch plan, Linux scope, or recurring board cadence.' },
        ],
      },
      cards: [
        {
          title: 'Linux work is scoped separately',
          body: 'Linux or self-hosted delivery is not sold as a magic checkbox. The diagnostic determines whether the need is real and how it should be structured.',
        },
        {
          title: 'Board capacity stays limited',
          body: 'The advisory board offer remains selective. It is meant for real recurring decisions, not to fill a subscription slot.',
        },
        {
          title: 'Not every project starts with a website',
          body: 'IO Partner can start with Teams, with a web brief, or with an infrastructure friction depending on the true blocker.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'The cleanest option: book Teams if the issue fits 15 minutes, otherwise send the context.',
      lead: 'The entry point does not need theatre. Choose the right channel and IO Partner will frame the next step.',
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Send the context',
          body: 'Useful when you need to describe the issue before choosing between website, Linux, Teams, or board support.',
          cta: 'Write on WhatsApp',
        },
        booking: {
          eyebrow: 'Teams',
          title: 'Book the diagnostic',
          liveBody: 'Choose a slot and receive the Teams link automatically.',
          fallbackBody: 'Ask for the right slot or booking link over WhatsApp if the public calendar is not wired yet.',
          liveCta: 'Open booking',
          fallbackCta: 'Ask for the link',
        },
        email: {
          eyebrow: 'Email',
          title: 'Larger scope',
          body: 'For longer context, Linux scope, or advisory board discussion, email is still useful.',
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Channel first, framing second.',
        lead: 'WhatsApp, Teams, or email: the first goal stays the same, reduce noise before expanding the issue.',
        nodes: [
          { label: '01', title: 'Channel chosen', body: 'WhatsApp, Teams, or email depending on how formed the need already is.' },
          { label: '02', title: 'Context received', body: 'The need is framed before a larger promise is made.' },
          { label: '03', title: 'Right entry point', body: 'Short Teams call, web brief, Linux review, or board conversation.' },
          { label: '04', title: 'Live clarification', body: 'The important tradeoffs are named explicitly.' },
          { label: '05', title: 'Next step', body: 'Booking, scope, delivery, or recurring cadence.' },
        ],
      },
      notes: {
        eyebrow: 'Notes',
        items: () => [
          `Short diagnostic: ${systemsFirst.duration} for ${systemsFirst.price}.`,
          `Working session: ${systemsSecond.duration} for ${systemsSecond.price}.`,
          `Board support: ${systemsThird.price}, scoped after fit.`,
          'Linux or heavier delivery topics are scoped after the first framing step.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Privacy',
      title: 'A simple policy for an operating partner that may handle sensitive business context.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} processes the information needed to reply to enquiries, book sessions, deliver projects, and prepare recurring support.`,
      collected: {
        title: 'What may be collected',
        items: [
          'Name, email, phone number, and booking or payment information.',
          'Context shared about your business, website, systems, tools, or infrastructure.',
          'Technical elements or scoping notes used to understand the need and prepare the next step.',
        ],
      },
      usage: {
        title: 'How it is used',
        items: [
          'Reply to your request and confirm the right entry point.',
          'Run a diagnostic, a web project, a Linux scope, or recurring board support.',
          'Send follow-up, memo, or proposal when that follow-up is explicitly useful.',
        ],
      },
      tools: {
        title: 'Third-party tools',
        body: 'Booking may use Calendly, messaging may use WhatsApp, sessions may use Microsoft Teams, and payment may use the selected payment channel. Each provider may process data under its own policy.',
        contactLead: 'For data questions or deletion requests, write to',
      },
    },
    terms: {
      eyebrow: 'Terms',
      title: 'Simple terms for diagnostics, delivery work, and recurring senior support.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} operates diagnostics, web projects, Linux scopes, and recurring support through ${config.operator}. Any booking or order implies acceptance of the principles below.`,
      scope: {
        title: 'Scope',
        items: () => [
          `${launchFirst.label}: ${launchFirst.price}.`,
          `${launchSecond.label}: ${launchSecond.price}.`,
          `${launchThird.label}: ${launchThird.price}.`,
          `${systemsFirst.label}: ${systemsFirst.duration} for ${systemsFirst.price}.`,
          `${systemsSecond.label}: ${systemsSecond.duration} for ${systemsSecond.price}.`,
          `Advisory board: ${systemsThird.price}, cadence scoped after qualification.`,
        ],
      },
      scheduling: {
        title: 'Scheduling',
        items: [
          'Enough context should be shared early enough to make the reserved time useful.',
          'Linux or heavier delivery topics may require a separate scope before execution starts.',
          'The promised output is framing, recommendation, or defined delivery, not an abstract guaranteed business result.',
        ],
      },
      confidentiality: {
        title: 'Confidentiality and use',
        body: 'Shared information is treated as confidential and used only to understand the need, deliver the requested work, and prepare explicitly useful follow-up.',
        contactLead: 'Contract questions can be sent to',
      },
    },
  },
  de: {
    shell: {
      logoTagline: 'Websysteme und Operator Advisory',
      languageLabel: 'Sprache',
      nav: {
        services: 'Services',
        pricing: 'Preise',
        contact: 'Kontakt',
      },
      workspace: {
        label: 'App-Seiten',
        overview: 'Ubersicht',
        clients: 'Kunden',
        projects: 'Projekte',
        websites: 'Websites',
        tasks: 'Aufgaben',
        documents: 'Dokumente',
        invoices: 'Rechnungen',
        orders: 'Bestellungen',
        support: 'Support',
        subscriptions: 'Abos',
        settings: 'Einstellungen',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'In der Schweiz',
      deliveryArtifact: 'Beratung mit Lieferfaehigkeit',
      footer: {
        positioningLabel: 'Positionierung',
        positioningTitle: 'Ein Partner fuer Launch, Systeme und Operator-Entscheide.',
        positioningBody:
          'IO Partner verbindet die alte TonSiteWeb-Schicht mit der Precision-Systems-Schicht: Web-Launch, bezahlte Diagnosen, Linux-Umsetzung und leichte Advisory-Board-Begleitung in einer einzigen Beziehung.',
        navigateLabel: 'Navigation',
        directLabel: 'Direkt',
        privacy: 'Datenschutz',
        terms: 'AGB',
        location: 'Lausanne, Schweiz',
      },
      whatsappPrefillMessage: 'Hallo, ich moechte eine IO Partner Teams-Diagnose buchen.',
    },
    meta: {
      home: {
        title: 'IO Partner',
        description:
          'IO Partner vereint Websites, Operator-Diagnosen, Linux-Systemarbeit und Advisory-Board-Begleitung.',
      },
      services: {
        title: 'Services',
        description: 'Web-Launch, Teams-Diagnosen, Linux-Systeme und wiederkehrende Senior-Begleitung.',
      },
      pricing: {
        title: 'Preise',
        description: 'Drei Launch-Angebote plus Teams-Diagnosen, Working Sessions und Advisory-Board-Support.',
      },
      contact: {
        title: 'Kontakt',
        description: 'Buchen Sie eine Teams-Diagnose oder senden Sie den Kontext fuer Website-, Linux- oder Advisory-Bedarf.',
      },
      privacy: {
        title: 'Datenschutz',
        description: 'Datenschutzinformationen fuer IO Partner Anfragen, Sessions und Projekte.',
      },
      terms: {
        title: 'AGB',
        description: 'Einfache Bedingungen fuer IO Partner Diagnosen, Umsetzung und laufende Begleitung.',
      },
    },
    home: {
      eyebrow: 'Websysteme, Linux, Advisory',
      title: 'Ein Partner, um die Systeme hinter Ihrem Geschaeft zu starten, zu klaeren und zu betreiben.',
      lead: 'IO Partner vereint, was TonSiteWeb und Precision Systems frueher getrennt gemacht haben. Der Einstieg kann ueber einen Website-Launch, eine bezahlte 15-Minuten-Teams-Diagnose, ein Linux-Thema oder eine leichtere Advisory-Board-Beziehung erfolgen.',
      ctaBook: '15 Min auf Teams buchen',
      ctaWhatsapp: 'Fit auf WhatsApp pruefen',
      heroCard: {
        eyebrow: 'Was IO Partner abdeckt',
        title: 'Build plus Advisory, nicht nur abstrakte Gespraeche.',
        points: [
          'Launch-faehige Websites und Workflows fuer KMU, Agenturen und Selbststaendige.',
          'Kurze Operator-Diagnosen fuer dringende, unklare oder blockierte Entscheidungen.',
          'Linux-Systeme, pragmatisches Self-Hosting, Tooling-Struktur und Betriebshygiene.',
          'Advisory-Board-artige Begleitung fuer einen senioren Blick ueber Prioritaeten.',
        ],
        note: 'Der Unterschied ist kein einzelnes Tool, sondern die Faehigkeit zu diagnostizieren, zu rahmen und danach zu liefern oder zu begleiten.',
      },
      areas: {
        eyebrow: 'Ebenen',
        title: 'Vier Ebenen, die zusammenpassen.',
        cards: [
          { title: 'Launch web systems', body: 'Showcase-Seiten, Inhaltsstruktur, Go-live, leichte Workflows und eine saubere kommerzielle Basis.' },
          { title: 'Teams diagnostic', body: 'Eine kurze bezahlte Session fuer Entscheidungen, Friktionen, Repositionierung oder technische Prioritaeten.' },
          { title: 'Linux and operations', body: 'Maschinen, Services, pragmatisches Self-Hosting, Tool-Struktur und Vereinfachung.' },
          { title: 'Advisory board light', body: 'Eine wiederkehrende Senior-Schicht fuer Prioritaeten, Reviews und Entscheide ohne Management-Theater.' },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'Outputs',
          title: 'Was die Session hinterlaesst',
          items: [
            'Eine klarere Definition des Problems.',
            'Einen verteidigbaren naechsten Schritt.',
            'Ein Memo oder eine Entscheidungs-Karte, wenn noetig.',
            'Falls relevant, einen Scope fuer Web-, Linux- oder Workflow-Lieferung.',
          ],
        },
        fit: {
          eyebrow: 'Good fit',
          title: 'Wann IO Partner am nützlichsten ist',
          items: [
            'Sie wollen einen serioesen Kontakt zwischen Advisory und Delivery.',
            'Ihre Website, Ihr Betrieb oder Ihre Tools erzeugen echte Reibung.',
            'Sie brauchen Senioritaet ohne Vollzeit-Hire.',
            'Sie wollen einen Partner, der auch umsetzen kann.',
          ],
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Die Pipeline ist Teil des Versprechens.',
        lead: 'Teams, wenn das Thema kurz ist. Scope und Lieferung, wenn das Thema es verdient. Der Einstieg bleibt einfach.',
        nodes: [
          { label: '01', title: 'Need chosen', body: 'Website-Launch, Teams-Diagnose, Linux-Option oder Advisory Board.' },
          { label: '02', title: 'Fit confirmed', body: 'Das richtige Level wird gewaehlt, bevor mehr Zeit oder Scope verbraucht wird.' },
          { label: '03', title: 'Teams link or brief', body: 'Sie erhalten den Call-Link oder die Brief-Struktur vorab.' },
          { label: '04', title: 'Live review', body: 'Das Thema wird direkt bearbeitet: Entscheidung, Architektur, Prioritaeten oder Reibung.' },
          { label: '05', title: 'Next-step scope', body: 'Empfehlung, Launch-Plan, Linux-Scope oder wiederkehrende Cadence.' },
        ],
      },
      closing: {
        eyebrow: 'Start here',
        title: (config: typeof iopartnerConfig) =>
          `${config.offerDuration}, um zu entscheiden, ob das Thema kurz bleiben oder ein echtes Projekt werden soll.`,
        lead: 'Wenn das Thema mehr verdient, kann IO Partner danach in Web-Delivery, Linux-Struktur oder wiederkehrende Operator-Begleitung wechseln.',
        ctaContact: 'Kontakt oeffnen',
        ctaPricing: 'Preise ansehen',
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Website-Launch, Operator-Diagnosen, Linux-Systeme und Advisory-Board-Begleitung unter einem Dach.',
      lead: 'IO Partner ist fuer Operatoren gebaut, die Beratung, Systemstruktur und praktische Lieferung nicht auf getrennte Anbieter verteilen wollen.',
      cards: [
        {
          eyebrow: '01',
          title: 'Launch web systems',
          body: 'Die TonSiteWeb-Logik bleibt innerhalb der fusionierten Marke als saubere Launch-Schicht erhalten.',
          items: ['Showcase-Seiten und Conversion-Pages.', 'Inhaltsstruktur, Workflow-Wahl und Go-live.', 'Klare Launch-Pakete fuer Selbststaendige, Agenturen und KMU.'],
        },
        {
          eyebrow: '02',
          title: 'Teams diagnostics',
          body: 'Kurze bezahlte Sessions fuer kommerzielle, technische oder operative Fragen, die mehr Signal als Theater brauchen.',
          items: ['Decision framing.', 'Positionierung und Angebotsarchitektur.', 'Workflow drag, Tool-Sprawl, AI fit.'],
        },
        {
          eyebrow: '03',
          title: 'Linux systems option',
          body: 'Wenn das Thema ueber die Website hinausgeht: Maschinen, Services, Hygiene, Observability und betriebliche Einfachheit.',
          items: ['Linux-Server und Service-Setup.', 'Pragmatisches Self-Hosting und Wartung.', 'Dokumentation, Supervision und Komplexitaetsreduktion.'],
        },
        {
          eyebrow: '04',
          title: 'Advisory board light',
          body: 'Eine wiederkehrende Senior-Schicht fuer Prioritaeten und Risiken ohne vages Coaching-Gefuehl.',
          items: ['Monatliche oder zweiwoechentliche Cadence.', 'Prioritaeten- und Risiko-Review.', 'Nuetzlich fuer Gruender, Agenturen und kleine Teams.'],
        },
      ],
      fit: {
        good: {
          eyebrow: 'Good fit',
          title: 'Wann buchen',
          items: [
            'Sie haben einen echten operativen Bedarf, nicht nur Neugier.',
            'Sie wollen Beratung, die sich in Lieferung uebersetzen kann.',
            'Sie muessen ein Web-, Linux-, Workflow- oder Board-Thema schnell klaeren.',
          ],
        },
        bad: {
          eyebrow: 'Not the fit',
          title: 'Wann nicht buchen',
          items: [
            'Sie brauchen klassischen Consumer-IT-Support oder diffuse Fehlersuche.',
            'Sie wollen kostenlose Brainstorming-Zeit ohne Kaufabsicht.',
            'Sie erwarten ein grosses diffuses Transformationsversprechen ohne internen Owner.',
          ],
        },
      },
      closing: {
        eyebrow: 'Entry point',
        title: (config: typeof iopartnerConfig) => `${config.offerDuration} auf Teams, bevor das Problem ueberbaut wird.`,
        lead: 'Die kurze Diagnose bleibt der Filter. Wenn der richtige Schritt eine Website, ein Linux-Scope oder eine Advisory-Board-Beziehung ist, wird das danach gescopet.',
        ctaBook: 'Diagnose buchen',
        ctaPricing: 'Angebote vergleichen',
      },
    },
    pricing: {
      eyebrow: 'Preise',
      title: 'Zwei Preis-Schichten: schnell starten, dann nur dann vertiefen, wenn das Thema es verdient.',
      lead: 'Die Website-Schicht behaelt die alte TonSiteWeb-Logik. Die Systems-Schicht deckt Teams-Diagnosen, Working Sessions und wiederkehrende Senior-Begleitung ab.',
      launch: {
        eyebrow: 'Web launch',
        title: 'Launch-Angebote',
        lead: 'Fuer eine schnelle nuetzliche Website mit der richtigen Workflow-Tiefe je nach Komplexitaet.',
        tiers: {
          launch: {
            eyebrow: 'Essential',
            title: 'Showcase site',
            summary: 'Das sauberste Startniveau fuer einen professionellen Online-Auftritt.',
            items: ['Professionelle Showcase-Website.', 'Inhaltsstruktur und Kontaktfluss.', 'Typische Lieferung in wenigen Werktagen.'],
            cta: 'Dieses Level starten',
          },
          launchWorkflow: {
            eyebrow: 'Workflow',
            title: 'Site + one workflow',
            summary: 'Fuer eine leichte Automation ohne Monsterprojekt.',
            items: ['Alles aus Essential.', 'Eine leichte Integration oder Automation.', 'Mehr Kontinuitaet zwischen Website und Betrieb.'],
            cta: 'Dieses Level pruefen',
          },
          launchOps: {
            eyebrow: 'Ops stack',
            title: 'Site + ops stack',
            summary: 'Wenn die Website bereits mehrere Fluesse oder mehr operative Struktur braucht.',
            items: ['Alles aus dem vorherigen Level.', 'Zwei bis drei Automationen oder Handoffs.', 'Mehr Strenge in Scope und Lieferung.'],
            cta: 'Dieses Level besprechen',
          },
        },
      },
      systems: {
        eyebrow: 'Systems and advisory',
        title: 'Teams, Linux und Board-Support',
        lead: 'Die Diagnose bleibt der Filter. Laengere Sessions und die Board-Schicht existieren fuer Themen, die wirklich mehr Tiefe verdienen.',
        tiers: {
          diagnostic: {
            eyebrow: 'Teams diagnostic',
            title: '15-minute operator cut',
            summary: 'Eine kurze bezahlte Session fuer Reibungspunkte oder Entscheide.',
            items: ['Fokussiertes Teams-Gespraech.', 'Entscheidung, Klaerung oder Fit-Assessment.', 'Empfehlung fuer den naechsten Schritt.'],
            cta: 'Teams buchen',
          },
          working: {
            eyebrow: 'Working session',
            title: 'Working session',
            summary: 'Fuer Themen mit mehr Tiefe, Architektur oder Live-Review-Bedarf.',
            items: ['Laengeres Zeitfenster und dichteres Signal.', 'Websysteme, Linux, Workflows oder Entscheidungsstruktur.', 'Kann in echten Delivery-Scope uebergehen.'],
            cta: 'Session anfragen',
          },
          board: {
            eyebrow: 'Advisory board',
            title: 'Recurring senior layer',
            summary: 'Ein leichtes Retainer-Modell fuer sauberere Prioritaeten und Entscheidungen ueber Zeit.',
            items: ['Monatliche oder zweiwoechentliche Cadence.', 'Operator Board statt vages Coaching.', 'Am besten fuer Gruender, Agenturen und kleine Teams.'],
            cta: 'Board-Support besprechen',
          },
        },
      },
      process: {
        eyebrow: 'Process',
        title: 'Immer dieselbe kurze Pipeline.',
        lead: 'Einfacher Einstieg, sauberer Scope, Eskalation nur wenn das Thema es verdient.',
        nodes: [
          { label: '01', title: 'Need chosen', body: 'Website-Launch, Teams-Diagnose, Linux-Option oder Advisory Board.' },
          { label: '02', title: 'Fit checked', body: 'Preis- und Zeitniveau werden gewaehlt, bevor groessere Versprechen gemacht werden.' },
          { label: '03', title: 'Session or brief', body: 'Teams-Link, Brief-Struktur oder Scope-Gespraech vorab.' },
          { label: '04', title: 'Live work', body: 'Entscheidung, Review oder Build-Richtung entsteht live statt in vagem Pingpong.' },
          { label: '05', title: 'Scoped next move', body: 'Memo, Launch-Plan, Linux-Scope oder wiederkehrende Cadence.' },
        ],
      },
      cards: [
        {
          title: 'Linux work is scoped separately',
          body: 'Linux- oder Self-Hosted-Lieferung ist keine magische Checkbox. Die Diagnose klaert, ob der Bedarf real ist und wie er gebaut werden soll.',
        },
        {
          title: 'Board capacity stays limited',
          body: 'Das Advisory-Board-Angebot bleibt selektiv. Es ist fuer echte wiederkehrende Entscheidungen gedacht, nicht fuer ein Abo um des Abos willen.',
        },
        {
          title: 'Not every project starts with a website',
          body: 'IO Partner kann mit Teams, mit einem Web-Brief oder mit einer Infrastruktur-Reibung starten, je nach echtem Blocker.',
        },
      ],
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Am saubersten: Teams buchen, wenn das Thema in 15 Minuten passt, sonst den Kontext schicken.',
      lead: 'Der Einstieg braucht kein Theater. Waehlen Sie den richtigen Kanal und IO Partner rahmt den naechsten Schritt.',
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Kontext senden',
          body: 'Nuetzlich, wenn Sie das Thema erst beschreiben muessen, bevor Website, Linux, Teams oder Board sinnvoll gewaehlt werden kann.',
          cta: 'Auf WhatsApp schreiben',
        },
        booking: {
          eyebrow: 'Teams',
          title: 'Diagnose buchen',
          liveBody: 'Waehlen Sie einen Slot und erhalten Sie den Teams-Link automatisch.',
          fallbackBody: 'Fragen Sie den passenden Slot oder Link per WhatsApp an, wenn der oeffentliche Kalender noch nicht verbunden ist.',
          liveCta: 'Booking oeffnen',
          fallbackCta: 'Link anfragen',
        },
        email: {
          eyebrow: 'Email',
          title: 'Groesserer Scope',
          body: 'Fuer laengeren Kontext, Linux-Scope oder Advisory-Board-Gespraech bleibt E-Mail sinnvoll.',
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Erst Kanal, dann Framing.',
        lead: 'WhatsApp, Teams oder E-Mail: Das erste Ziel bleibt gleich, Rauschen reduzieren bevor das Thema groesser wird.',
        nodes: [
          { label: '01', title: 'Channel chosen', body: 'WhatsApp, Teams oder E-Mail je nach Formgrad des Bedarfs.' },
          { label: '02', title: 'Context received', body: 'Der Bedarf wird gerahmt, bevor ein groesseres Versprechen gemacht wird.' },
          { label: '03', title: 'Right entry point', body: 'Kurzer Teams-Call, Web-Brief, Linux-Review oder Board-Gespraech.' },
          { label: '04', title: 'Live clarification', body: 'Die wichtigen Tradeoffs werden explizit benannt.' },
          { label: '05', title: 'Next step', body: 'Booking, Scope, Delivery oder wiederkehrende Cadence.' },
        ],
      },
      notes: {
        eyebrow: 'Hinweise',
        items: () => [
          `Kurze Diagnose: ${systemsFirst.duration} fuer ${systemsFirst.price}.`,
          `Working Session: ${systemsSecond.duration} fuer ${systemsSecond.price}.`,
          `Board-Support: ${systemsThird.price}, nach Fit gescopet.`,
          'Linux- oder schwerere Delivery-Themen werden nach dem ersten Framing gescopet.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Datenschutz',
      title: 'Eine einfache Richtlinie fuer einen Partner, der auch sensible Betriebs-Kontexte sehen kann.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} verarbeitet die Informationen, die noetig sind, um Anfragen zu beantworten, Sessions zu buchen, Projekte zu liefern und wiederkehrende Begleitung vorzubereiten.`,
      collected: {
        title: 'Was erhoben werden kann',
        items: [
          'Name, E-Mail, Telefonnummer sowie Booking- oder Zahlungsinformationen.',
          'Geteilter Kontext zu Geschaeft, Website, Systemen, Tools oder Infrastruktur.',
          'Technische Elemente oder Scope-Notizen, um den Bedarf zu verstehen und den naechsten Schritt vorzubereiten.',
        ],
      },
      usage: {
        title: 'Verwendung',
        items: [
          'Auf Ihre Anfrage antworten und den richtigen Einstieg bestaetigen.',
          'Diagnose, Webprojekt, Linux-Scope oder wiederkehrende Begleitung durchfuehren.',
          'Follow-up, Memo oder Angebot senden, wenn das explizit sinnvoll ist.',
        ],
      },
      tools: {
        title: 'Drittanbieter-Tools',
        body: 'Booking kann ueber Calendly laufen, Messaging ueber WhatsApp, Sessions ueber Microsoft Teams und Zahlung ueber den gewaehlten Zahlungskanal. Jeder Anbieter verarbeitet Daten nach eigener Richtlinie.',
        contactLead: 'Bei Datenfragen oder Loeschanfragen schreiben Sie an',
      },
    },
    terms: {
      eyebrow: 'AGB',
      title: 'Einfache Bedingungen fuer Diagnosen, Delivery und wiederkehrende Senior-Begleitung.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} betreibt Diagnosen, Webprojekte, Linux-Scopes und laufende Begleitung ueber ${config.operator}. Jede Buchung oder Bestellung impliziert die Zustimmung zu den untenstehenden Prinzipien.`,
      scope: {
        title: 'Scope',
        items: () => [
          `${launchFirst.label}: ${launchFirst.price}.`,
          `${launchSecond.label}: ${launchSecond.price}.`,
          `${launchThird.label}: ${launchThird.price}.`,
          `${systemsFirst.label}: ${systemsFirst.duration} fuer ${systemsFirst.price}.`,
          `${systemsSecond.label}: ${systemsSecond.duration} fuer ${systemsSecond.price}.`,
          `Advisory board: ${systemsThird.price}, Cadence nach Qualifizierung.`,
        ],
      },
      scheduling: {
        title: 'Organisation',
        items: [
          'Genug Kontext sollte frueh geteilt werden, damit reservierte Zeit wirklich nuetzlich ist.',
          'Linux- oder schwerere Delivery-Themen koennen einen separaten Scope vor der Umsetzung brauchen.',
          'Das versprochene Resultat ist Framing, Empfehlung oder definierte Lieferung, nicht ein abstrakt garantiertes Business-Ergebnis.',
        ],
      },
      confidentiality: {
        title: 'Vertraulichkeit und Nutzung',
        body: 'Geteilte Informationen werden vertraulich behandelt und nur genutzt, um den Bedarf zu verstehen, die angefragte Arbeit zu liefern und explizit sinnvolle Follow-ups vorzubereiten.',
        contactLead: 'Vertragsfragen koennen gesendet werden an',
      },
    },
  },
  it: {
    shell: {
      logoTagline: 'Web systems e operator advisory',
      languageLabel: 'Lingua',
      nav: {
        services: 'Servizi',
        pricing: 'Prezzi',
        contact: 'Contatto',
      },
      workspace: {
        label: 'Pagine app',
        overview: 'Panoramica',
        clients: 'Clienti',
        projects: 'Progetti',
        websites: 'Siti',
        tasks: 'Attivita',
        documents: 'Documenti',
        invoices: 'Fatture',
        orders: 'Ordini',
        support: 'Supporto',
        subscriptions: 'Abbonamenti',
        settings: 'Impostazioni',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'Basato in Svizzera',
      deliveryArtifact: 'Advisory con capacita di delivery',
      footer: {
        positioningLabel: 'Posizionamento',
        positioningTitle: 'Un partner per launch, systems e decisioni operative.',
        positioningBody:
          'IO Partner unisce il vecchio livello TonSiteWeb con il livello Precision Systems: lancio web, diagnosi a pagamento, implementazione Linux e supporto advisory board leggero nella stessa relazione.',
        navigateLabel: 'Navigazione',
        directLabel: 'Diretto',
        privacy: 'Privacy',
        terms: 'Condizioni',
        location: 'Lausanne, Svizzera',
      },
      whatsappPrefillMessage: 'Ciao, vorrei prenotare una diagnosi IO Partner su Teams.',
    },
    meta: {
      home: {
        title: 'IO Partner',
        description: 'IO Partner unisce siti web, diagnosi operative, sistemi Linux e supporto advisory board.',
      },
      services: {
        title: 'Servizi',
        description: 'Launch web, diagnosi Teams, sistemi Linux e supporto senior ricorrente.',
      },
      pricing: {
        title: 'Prezzi',
        description: 'Tre offerte launch piu diagnosi Teams, working session e supporto advisory board.',
      },
      contact: {
        title: 'Contatto',
        description: 'Prenota una diagnosi Teams o invia il contesto per un bisogno web, Linux o advisory.',
      },
      privacy: {
        title: 'Privacy',
        description: 'Informazioni privacy per richieste, sessioni e progetti IO Partner.',
      },
      terms: {
        title: 'Condizioni',
        description: 'Condizioni semplici per diagnosi, delivery e supporto continuativo IO Partner.',
      },
    },
    home: {
      eyebrow: 'Web systems, Linux, advisory',
      title: 'Un solo partner per lanciare, chiarire e far funzionare i sistemi dietro la tua attivita.',
      lead: 'IO Partner unisce cio che TonSiteWeb e Precision Systems facevano separatamente. Si puo entrare da un launch web, da una diagnosi Teams da 15 minuti, da un bisogno Linux o da una relazione advisory board piu leggera.',
      ctaBook: 'Prenota 15 min su Teams',
      ctaWhatsapp: 'Verifica il fit su WhatsApp',
      heroCard: {
        eyebrow: 'Cosa copre IO Partner',
        title: 'Build piu advisory, non solo conversazioni astratte.',
        points: [
          'Siti e workflow di launch per PMI, agenzie e indipendenti.',
          'Diagnosi operative brevi quando una decisione e urgente, confusa o bloccata.',
          'Sistemi Linux, self-hosting pragmatico, struttura tool e igiene operativa.',
          'Supporto stile advisory board per mantenere una mente senior sopra le priorita.',
        ],
        note: 'Il vantaggio non e un singolo tool. E la capacita di diagnosticare, inquadrare e poi consegnare o supervisionare la prossima mossa.',
      },
      areas: {
        eyebrow: 'Livelli',
        title: 'Quattro livelli che possono convivere.',
        cards: [
          { title: 'Launch web systems', body: 'Siti vetrina, struttura contenuti, go-live, workflow leggeri e base commerciale pulita.' },
          { title: 'Teams diagnostic', body: 'Una sessione breve a pagamento per decisioni, attrito, riposizionamento o priorita tecnica.' },
          { title: 'Linux and operations', body: 'Macchine, servizi, self-hosting pragmatico, struttura dei tool e semplificazione.' },
          { title: 'Advisory board light', body: 'Uno strato senior ricorrente per priorita, review e decisioni senza teatro manageriale.' },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'Output',
          title: 'Cosa esce dalla sessione',
          items: [
            'Una definizione piu pulita del problema reale.',
            'Una prossima mossa difendibile.',
            'Un memo o una mappa decisionale quando serve.',
            'Se rilevante, uno scope per delivery web, Linux o workflow.',
          ],
        },
        fit: {
          eyebrow: 'Good fit',
          title: 'Quando IO Partner e piu utile',
          items: [
            'Vuoi un unico punto serio tra advisory e delivery.',
            'Sito, operazioni o tool stanno creando attrito reale.',
            'Hai bisogno di seniority senza assumere full time.',
            'Vuoi un partner che possa anche implementare.',
          ],
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'La pipeline fa parte della promessa.',
        lead: 'Teams se il tema e breve. Scope e delivery se il tema se lo guadagna. L ingresso resta semplice.',
        nodes: [
          { label: '01', title: 'Need chosen', body: 'Launch web, diagnosi Teams, opzione Linux o advisory board.' },
          { label: '02', title: 'Fit confirmed', body: 'Il livello giusto viene scelto prima di consumare altro tempo o scope.' },
          { label: '03', title: 'Teams link or brief', body: 'Ricevi il link della call o la struttura del brief in anticipo.' },
          { label: '04', title: 'Live review', body: 'Il tema viene lavorato direttamente: decisione, architettura, priorita o attrito operativo.' },
          { label: '05', title: 'Next-step scope', body: 'Raccomandazione, piano di launch, scope Linux o cadenza ricorrente.' },
        ],
      },
      closing: {
        eyebrow: 'Start here',
        title: (config: typeof iopartnerConfig) =>
          `${config.offerDuration} per capire se il tema deve restare corto o diventare un vero progetto.`,
        lead: 'Se il tema merita di piu, IO Partner puo poi passare alla delivery web, alla struttura Linux o al supporto operator ricorrente.',
        ctaContact: 'Apri contatto',
        ctaPricing: 'Vedi prezzi',
      },
    },
    services: {
      eyebrow: 'Servizi',
      title: 'Launch web, diagnosi operative, sistemi Linux e supporto advisory board sotto lo stesso tetto.',
      lead: 'IO Partner e costruito per operatori che non vogliono separare advisory, struttura dei sistemi e delivery pratico in vendor scollegati.',
      cards: [
        {
          eyebrow: '01',
          title: 'Launch web systems',
          body: 'La logica commerciale TonSiteWeb resta dentro il nuovo marchio come strato di launch piu pulito.',
          items: ['Siti vetrina e pagine di conversione.', 'Struttura contenuti, scelta workflow e go-live.', 'Pacchetti launch chiari per indipendenti, agenzie e PMI.'],
        },
        {
          eyebrow: '02',
          title: 'Teams diagnostics',
          body: 'Sessioni brevi a pagamento per domande commerciali, tecniche o operative che hanno bisogno di segnale, non di teatro.',
          items: ['Decision framing.', 'Posizionamento e architettura dell offerta.', 'Workflow drag, tool sprawl, AI fit.'],
        },
        {
          eyebrow: '03',
          title: 'Linux systems option',
          body: 'Quando il bisogno va oltre il sito: macchine, servizi, hygiene, observability e semplicita operativa.',
          items: ['Server Linux e setup servizi.', 'Self-hosting pragmatico e manutenzione.', 'Documentazione, supervisione e riduzione della complessita.'],
        },
        {
          eyebrow: '04',
          title: 'Advisory board light',
          body: 'Uno strato senior ricorrente per priorita e rischi senza scivolare nel coaching vago.',
          items: ['Cadenza mensile o bisettimanale.', 'Review di priorita e rischi.', 'Utile per founder, agenzie e piccoli team.'],
        },
      ],
      fit: {
        good: {
          eyebrow: 'Good fit',
          title: 'Quando prenotare',
          items: [
            'Hai un bisogno operativo reale, non solo curiosita.',
            'Vuoi advisory che possa tradursi in delivery.',
            'Devi chiarire velocemente un tema web, Linux, workflow o board.',
          ],
        },
        bad: {
          eyebrow: 'Not the fit',
          title: 'Quando non prenotare',
          items: [
            'Ti serve supporto IT consumer o troubleshooting diffuso.',
            'Cerchi brainstorming gratuito senza intento commerciale.',
            'Ti aspetti una grande promessa di trasformazione vaga senza owner interno.',
          ],
        },
      },
      closing: {
        eyebrow: 'Entry point',
        title: (config: typeof iopartnerConfig) => `${config.offerDuration} su Teams prima di sovracostruire il problema.`,
        lead: 'La diagnosi breve resta il filtro. Se la mossa giusta e un sito, uno scope Linux o una relazione board, viene definita dopo.',
        ctaBook: 'Prenota la diagnosi',
        ctaPricing: 'Confronta le offerte',
      },
    },
    pricing: {
      eyebrow: 'Prezzi',
      title: 'Due livelli di prezzo: launch veloce, poi struttura piu pesante solo se il tema se lo guadagna.',
      lead: 'Il livello web mantiene la logica TonSiteWeb. Il livello systems copre diagnosi Teams, working session e supporto senior ricorrente.',
      launch: {
        eyebrow: 'Web launch',
        title: 'Offerte di launch',
        lead: 'Per mettere online un sito utile rapidamente, con la giusta profondita di workflow secondo la complessita.',
        tiers: {
          launch: {
            eyebrow: 'Essential',
            title: 'Showcase site',
            summary: 'Il punto di partenza piu pulito per andare online bene.',
            items: ['Sito vetrina professionale.', 'Struttura contenuti e flusso contatto.', 'Consegna tipica in pochi giorni lavorativi.'],
            cta: 'Avvia questo livello',
          },
          launchWorkflow: {
            eyebrow: 'Workflow',
            title: 'Site + one workflow',
            summary: 'Per aggiungere una leggera automazione senza creare un progetto mostruoso.',
            items: ['Tutto il livello essential.', 'Una integrazione o automazione leggera.', 'Piu continuita tra sito e operazioni.'],
            cta: 'Verifica questo livello',
          },
          launchOps: {
            eyebrow: 'Ops stack',
            title: 'Site + ops stack',
            summary: 'Quando il sito deve gia collegarsi a piu flussi o a una struttura piu operativa.',
            items: ['Tutto il livello precedente.', 'Due o tre automazioni o handoff.', 'Piu rigore di scope e delivery.'],
            cta: 'Discuti questo livello',
          },
        },
      },
      systems: {
        eyebrow: 'Systems and advisory',
        title: 'Teams, Linux e supporto board',
        lead: 'La diagnosi resta il filtro. Sessioni lunghe e board esistono per temi che meritano davvero piu profondita.',
        tiers: {
          diagnostic: {
            eyebrow: 'Teams diagnostic',
            title: '15-minute operator cut',
            summary: 'Una sessione breve a pagamento per chiarire attrito o decisione.',
            items: ['Discussione Teams focalizzata.', 'Decisione, chiarimento o fit assessment.', 'Raccomandazione per la prossima mossa.'],
            cta: 'Prenota Teams',
          },
          working: {
            eyebrow: 'Working session',
            title: 'Working session',
            summary: 'Per temi che richiedono piu profondita, architettura o live review.',
            items: ['Finestra piu lunga e segnale piu denso.', 'Web systems, Linux, workflow o struttura decisionale.', 'Puo diventare uno scope reale di delivery.'],
            cta: 'Richiedi sessione',
          },
          board: {
            eyebrow: 'Advisory board',
            title: 'Recurring senior layer',
            summary: 'Un retainer leggero per mantenere piu pulite priorita e decisioni nel tempo.',
            items: ['Cadenza mensile o bisettimanale.', 'Operator board, non coaching vago.', 'Ideale per founder, agenzie e piccoli team.'],
            cta: 'Discuti il board',
          },
        },
      },
      process: {
        eyebrow: 'Process',
        title: 'Sempre la stessa pipeline corta.',
        lead: 'Ingresso semplice, scope pulito, escalation solo se il tema se lo guadagna.',
        nodes: [
          { label: '01', title: 'Need chosen', body: 'Launch web, diagnosi Teams, opzione Linux o advisory board.' },
          { label: '02', title: 'Fit checked', body: 'Livello di prezzo e tempo scelto prima di promettere di piu.' },
          { label: '03', title: 'Session or brief', body: 'Link Teams, struttura del brief o conversazione di scope in anticipo.' },
          { label: '04', title: 'Live work', body: 'Decisione, review o direzione build succedono dal vivo, non in ping-pong vago.' },
          { label: '05', title: 'Scoped next move', body: 'Memo, piano launch, scope Linux o cadenza ricorrente.' },
        ],
      },
      cards: [
        {
          title: 'Linux work is scoped separately',
          body: 'La delivery Linux o self-hosted non e una casella magica. La diagnosi chiarisce se il bisogno e reale e come va strutturato.',
        },
        {
          title: 'Board capacity stays limited',
          body: 'L offerta advisory board resta selettiva. Serve per decisioni ricorrenti vere, non per riempire uno slot in abbonamento.',
        },
        {
          title: 'Not every project starts with a website',
          body: 'IO Partner puo iniziare da Teams, da un brief web o da una frizione infrastrutturale secondo il vero blocco.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contatto',
      title: 'La via piu pulita: prenota Teams se il tema entra in 15 minuti, altrimenti invia il contesto.',
      lead: 'Il punto di ingresso non ha bisogno di teatro. Scegli il canale giusto e IO Partner inquadra il passo successivo.',
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Invia il contesto',
          body: 'Utile se devi descrivere il tema prima di scegliere tra sito, Linux, Teams o board.',
          cta: 'Scrivi su WhatsApp',
        },
        booking: {
          eyebrow: 'Teams',
          title: 'Prenota la diagnosi',
          liveBody: 'Scegli uno slot e ricevi automaticamente il link Teams.',
          fallbackBody: 'Chiedi slot o link via WhatsApp se il calendario pubblico non e ancora collegato.',
          liveCta: 'Apri prenotazione',
          fallbackCta: 'Chiedi il link',
        },
        email: {
          eyebrow: 'Email',
          title: 'Scope piu grande',
          body: 'Per contesto piu lungo, scope Linux o board, la mail resta utile.',
        },
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Prima il canale, poi il framing.',
        lead: 'WhatsApp, Teams o email: il primo obiettivo resta lo stesso, ridurre il rumore prima di allargare il tema.',
        nodes: [
          { label: '01', title: 'Channel chosen', body: 'WhatsApp, Teams o email secondo quanto il bisogno e gia formato.' },
          { label: '02', title: 'Context received', body: 'Il bisogno viene inquadrato prima di fare promesse piu grandi.' },
          { label: '03', title: 'Right entry point', body: 'Short Teams call, web brief, Linux review o board conversation.' },
          { label: '04', title: 'Live clarification', body: 'I tradeoff importanti vengono nominati esplicitamente.' },
          { label: '05', title: 'Next step', body: 'Booking, scope, delivery o cadenza ricorrente.' },
        ],
      },
      notes: {
        eyebrow: 'Note',
        items: () => [
          `Diagnosi breve: ${systemsFirst.duration} per ${systemsFirst.price}.`,
          `Working session: ${systemsSecond.duration} per ${systemsSecond.price}.`,
          `Board support: ${systemsThird.price}, dopo il fit.`,
          'I temi Linux o di delivery piu pesante vengono scoped dopo il primo framing.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Privacy',
      title: 'Una policy semplice per un partner operativo che puo trattare contesto sensibile.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} tratta le informazioni necessarie per rispondere alle richieste, prenotare sessioni, consegnare progetti e preparare supporto ricorrente.`,
      collected: {
        title: 'Cosa puo essere raccolto',
        items: [
          'Nome, email, telefono e informazioni di booking o pagamento.',
          'Contesto condiviso su business, sito, sistemi, tool o infrastruttura.',
          'Elementi tecnici o note di scope usati per capire il bisogno e preparare il passo successivo.',
        ],
      },
      usage: {
        title: 'Utilizzo',
        items: [
          'Rispondere alla richiesta e confermare il giusto punto di ingresso.',
          'Gestire diagnosi, progetto web, scope Linux o supporto ricorrente.',
          'Inviare follow-up, memo o proposta quando quel follow-up e esplicitamente utile.',
        ],
      },
      tools: {
        title: 'Strumenti terzi',
        body: 'La prenotazione puo usare Calendly, la messaggistica WhatsApp, le sessioni Microsoft Teams e il pagamento il canale scelto. Ogni fornitore puo trattare i dati secondo la propria policy.',
        contactLead: 'Per domande sui dati o richieste di cancellazione, scrivi a',
      },
    },
    terms: {
      eyebrow: 'Condizioni',
      title: 'Condizioni semplici per diagnosi, delivery e supporto senior ricorrente.',
      lead: (config: typeof iopartnerConfig) =>
        `${config.name} opera diagnosi, progetti web, scope Linux e supporto ricorrente tramite ${config.operator}. Ogni prenotazione o ordine implica accettazione dei principi qui sotto.`,
      scope: {
        title: 'Perimetro',
        items: () => [
          `${launchFirst.label}: ${launchFirst.price}.`,
          `${launchSecond.label}: ${launchSecond.price}.`,
          `${launchThird.label}: ${launchThird.price}.`,
          `${systemsFirst.label}: ${systemsFirst.duration} per ${systemsFirst.price}.`,
          `${systemsSecond.label}: ${systemsSecond.duration} per ${systemsSecond.price}.`,
          `Advisory board: ${systemsThird.price}, cadenza definita dopo qualifica.`,
        ],
      },
      scheduling: {
        title: 'Organizzazione',
        items: [
          'Serve abbastanza contesto in anticipo per rendere utile il tempo riservato.',
          'I temi Linux o di delivery piu pesante possono richiedere uno scope separato prima dell esecuzione.',
          'L output promesso e framing, raccomandazione o delivery definita, non un risultato business astratto garantito.',
        ],
      },
      confidentiality: {
        title: 'Riservatezza e uso',
        body: 'Le informazioni condivise vengono trattate come riservate e usate solo per capire il bisogno, fornire il lavoro richiesto e preparare follow-up esplicitamente utili.',
        contactLead: 'Le domande contrattuali possono essere inviate a',
      },
    },
  },
};

export function getIoPartnerCopy(locale: IoPartnerLocale) {
  return copy[locale] || copy.fr;
}

export function getIoPartnerLaunchTierCopy(locale: IoPartnerLocale, key: IoPartnerLaunchOfferKey) {
  return getIoPartnerCopy(locale).pricing.launch.tiers[key];
}

export function getIoPartnerSystemsTierCopy(locale: IoPartnerLocale, key: IoPartnerSystemsOfferKey) {
  return getIoPartnerCopy(locale).pricing.systems.tiers[key];
}
