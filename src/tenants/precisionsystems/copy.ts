import { detectRequestLocale } from '../../lib/locale.js';

import { precisionSystemsConfig, precisionSystemsOffers, type PrecisionSystemsOfferKey } from './config.js';

export const PRECISION_SYSTEMS_LOCALES = ['fr', 'en', 'de', 'it'] as const;

export type PrecisionSystemsLocale = (typeof PRECISION_SYSTEMS_LOCALES)[number];
export type PrecisionSystemsPageKey = 'home' | 'services' | 'pricing' | 'contact' | 'privacy' | 'terms';

type PrecisionSystemsCopy = {
  shell: any;
  meta: Record<PrecisionSystemsPageKey, { title: string; description: string }>;
  home: any;
  services: any;
  pricing: any;
  contact: any;
  privacy: any;
  terms: any;
};

const isPrecisionSystemsLocale = (value: string): value is PrecisionSystemsLocale =>
  PRECISION_SYSTEMS_LOCALES.includes(value as PrecisionSystemsLocale);

const hostFromRequest = (request: Request, url?: URL | string | null) => {
  const targetUrl = url instanceof URL ? url : url ? new URL(url, request.url) : new URL(request.url);

  return [request.headers.get('x-forwarded-host'), request.headers.get('host'), targetUrl.host]
    .flatMap((value) => (value || '').split(','))
    .map((value) => value.trim().toLowerCase().split(':')[0])
    .filter(Boolean);
};

export function resolvePrecisionSystemsLocale(request: Request, url?: URL | string | null): PrecisionSystemsLocale {
  const detected = detectRequestLocale(request, url, 'fr');
  return isPrecisionSystemsLocale(detected) ? detected : 'fr';
}

export function resolvePrecisionSystemsBasePath(request: Request, url?: URL | string | null) {
  const isPrecisionSystemsHost = hostFromRequest(request, url).some((host) =>
    host.includes(precisionSystemsConfig.domain)
  );
  return isPrecisionSystemsHost ? '' : precisionSystemsConfig.basePath;
}

const firstOffer = precisionSystemsOffers[0];
const secondOffer = precisionSystemsOffers[1];
const thirdOffer = precisionSystemsOffers[2];

const copy: Record<PrecisionSystemsLocale, PrecisionSystemsCopy> = {
  fr: {
    shell: {
      logoTagline: 'Diagnostics stratégiques',
      languageLabel: 'Langue',
      nav: {
        services: 'Services',
        pricing: 'Tarifs',
        contact: 'Contact',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'Basé en Suisse',
      deliveryArtifact: 'Adossé à des systèmes réellement opérés',
      footer: {
        positioningLabel: 'Positionnement',
        positioningTitle: 'Diagnostics stratégiques pour opérateurs.',
        positioningBody:
          "Precision Systems compresse les problèmes flous de positionnement, de systèmes et de workflows IA en un ensemble plus petit de décisions réellement actionnables, adossés à une expérience concrète de déploiement via l'écosystème Tonsiteweb.",
        navigateLabel: 'Navigation',
        directLabel: 'Direct',
        privacy: 'Confidentialité',
        terms: 'Conditions',
        location: 'Lausanne, Suisse',
      },
      whatsappPrefillMessage: 'Bonjour, je souhaite réserver un diagnostic stratégique Precision Systems.',
    },
    meta: {
      home: {
        title: 'Precision Systems',
        description:
          'Diagnostics stratégiques pour fondateurs et opérateurs. Positionnement, systèmes et décisions IA compressés en prochaines étapes plus nettes.',
      },
      services: {
        title: 'Services',
        description:
          'Precision Systems fournit des diagnostics stratégiques pour le positionnement, les workflows, les systèmes et les décisions IA qui ont des conséquences opérationnelles.',
      },
      pricing: {
        title: 'Tarifs',
        description:
          'Trois niveaux : diagnostic stratégique 15 min à 150 CHF, session conseil 30 min à 290 CHF et session de travail 60 min à 490 CHF.',
      },
      contact: {
        title: 'Contact',
        description:
          'Choisissez un créneau, confirmez le paiement et recevez votre lien Teams, ou demandez le lien de réservation via WhatsApp.',
      },
      privacy: {
        title: 'Confidentialité',
        description: 'Informations de confidentialité pour les demandes, paiements et réservations Precision Systems.',
      },
      terms: {
        title: 'Conditions',
        description: 'Conditions des diagnostics et sessions Precision Systems.',
      },
    },
    home: {
      eyebrow: 'Diagnostics stratégiques pour fondateurs et opérateurs',
      title: "Achetez de la clarté avant que l'ambiguïté ne coûte plus cher.",
      lead: "Precision Systems n'est pas du consulting générique. C'est un diagnostic payé pour les moments où un sujet de positionnement, de systèmes ou de workflow IA fuit déjà du temps, du revenu ou de la concentration, avec un advisory issu d'une vraie expérience d'opération et de déploiement.",
      ctaBook: 'Réserver le diagnostic',
      ctaWhatsapp: 'Vérifier le fit sur WhatsApp',
      heroCard: {
        eyebrow: 'Ce qui se diagnostique',
        title: 'Des questions avec vraies conséquences opérationnelles.',
        points: [
          "Votre offre est comprise en interne mais n'atterrit plus clairement sur le marché.",
          'Votre équipe est coincée entre trop d’outils, de handoffs ou de workflows fragiles.',
          "Vous voulez savoir où l'IA aide vraiment, et où elle ajoute seulement du bruit.",
        ],
        note: "La valeur n'est pas la conversation. La valeur est la compression : diagnostic plus rapide, arbitrages plus propres, prochain mouvement plus défendable.",
      },
      areas: {
        eyebrow: 'Angles de travail',
        title: 'Trois endroits où la clarté paie vite.',
        cards: [
          {
            title: "Positionnement et architecture d'offre",
            body: 'Revoir la promesse, la lisibilité commerciale, les gaps de message et la structure de votre offre.',
          },
          {
            title: 'Systèmes et friction de workflow',
            body: 'Isoler les goulots, la dispersion des outils, les handoffs confus et les couches qui ralentissent l’exécution.',
          },
          {
            title: 'Fit IA, automation et décisions',
            body: 'Distinguer ce qui doit être automatisé, ce qui doit rester humain et où investir le prochain effort.',
          },
        ],
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Choisissez un créneau. Payez. Rejoignez Teams. Repartez avec une carte.',
        lead: 'La première session est construite comme un diagnostic, pas comme un appel de découverte gratuit. Le pipeline fait partie du produit.',
        nodes: [
          {
            label: '01',
            title: 'Choisissez le créneau',
            body: 'Prenez la fenêtre de 15 minutes qui convient au problème et au niveau de décision.',
          },
          {
            label: '02',
            title: 'Confirmez le paiement',
            body: 'Le paiement verrouille le créneau et filtre les demandes sans vraie intention.',
          },
          {
            label: '03',
            title: 'Recevez le lien Teams',
            body: 'Vous recevez le lien, le cadre et une demande de contexte courte avant la session.',
          },
          {
            label: '04',
            title: 'Diagnostic en direct',
            body: 'Le sujet est travaillé en direct avec cadrage, arbitrages et lecture opérateur senior.',
          },
          {
            label: '05',
            title: 'Carte visuelle + prochaine étape',
            body: 'Vous repartez avec une visualisation du problème et une recommandation nette sur la suite.',
          },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'Vous repartez avec',
          title: 'Une décision plus nette, pas plus de bruit.',
          items: [
            'Un diagnostic direct du vrai problème.',
            'Une carte visuelle du sujet pendant ou après la session.',
            'Une recommandation sur le meilleur prochain mouvement.',
            'Un passage au niveau suivant seulement si le problème le justifie.',
          ],
        },
        fit: {
          eyebrow: 'Bon fit',
          title: 'Pour les personnes qui paient volontiers pour de la compression.',
          items: [
            'Fondateurs qui repositionnent une offre ou repricent un service.',
            'Opérateurs qui veulent nettoyer un workflow ou une couche système devenue coûteuse.',
            'Équipes qui évaluent une décision IA ou automation avec un vrai impact business.',
          ],
        },
      },
      closing: {
        eyebrow: 'Point d’entrée',
        title: (config: typeof precisionSystemsConfig) =>
          `${firstOffer.duration} pour ${firstOffer.price}. Plus profond seulement si c’est mérité.`,
        lead: "Le diagnostic stratégique est la porte d'entrée. Si le sujet demande plus de temps de travail, le passage en session advisory ou working session se décide après la première lecture.",
        ctaContact: 'Voir le pipeline',
        ctaPricing: 'Voir les tarifs',
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Diagnostics stratégiques pour le positionnement, les systèmes et les workflows IA.',
      lead: "Vous n'achetez pas des heures de consulting génériques. Vous achetez un diagnostic plus rapide, un cadrage plus propre et un prochain mouvement plus défendable, adossés à une vraie capacité d'implémentation et de déploiement.",
      cards: [
        {
          eyebrow: '01',
          title: "Positionnement et architecture d'offre",
          body: 'Quand le marché entend autre chose que ce que vous pensez vendre.',
          items: ['Promesse et lisibilité', 'Gaps de positionnement', 'Repricing ou simplification'],
        },
        {
          eyebrow: '02',
          title: 'Systèmes et friction de workflow',
          body: 'Quand les outils, les handoffs ou les règles opératoires commencent à coûter du temps et de la clarté.',
          items: ['Goulots de workflow', 'Sprawl d’outils', 'Confusion de responsabilité'],
        },
        {
          eyebrow: '03',
          title: 'Fit IA et automation',
          body: "Quand l'IA semble prometteuse mais que personne n'a encore tranché où elle aide vraiment.",
          items: ['Évaluation du fit', 'Réduction du risque', 'Priorité d’implémentation'],
        },
        {
          eyebrow: '04',
          title: 'Compression de décision',
          body: 'Quand la vraie valeur est de réduire un sujet flou à quelques arbitrages clairs.',
          items: ['Cadre de décision', 'Tradeoffs visibles', 'Prochaine étape défendable'],
        },
      ],
      fit: {
        good: {
          eyebrow: 'Quand réserver',
          title: 'Le bon usage de Precision Systems',
          items: [
            'Vous voulez une lecture externe senior avant de bouger plus de budget, de temps ou de complexité.',
            "Vous sentez déjà le coût d'un sujet mal cadré et vous voulez une décision rapide.",
            "Vous préférez payer un diagnostic net plutôt qu'accumuler des appels gratuits et vagues.",
          ],
        },
        bad: {
          eyebrow: 'Quand ne pas réserver',
          title: 'Ce que ce site ne vend pas',
          items: [
            'Une implémentation complète dans la première session.',
            'Du coaching large sans question ou décision concrète.',
            'Des appels exploratoires gratuits sans intention réelle.',
          ],
        },
      },
      closing: {
        eyebrow: 'Commencez petit, pas cheap',
        title: () => `Diagnostic stratégique ${firstOffer.duration} à ${firstOffer.price}.`,
        lead: "Le point d'entrée est court mais premium. Si le diagnostic révèle une vraie surface de travail, la suite passe en 30 ou 60 minutes avec un périmètre plus clair.",
        ctaBook: 'Réserver le diagnostic',
        ctaPricing: 'Voir les niveaux',
      },
    },
    pricing: {
      eyebrow: 'Tarifs',
      title: 'Le prix doit refléter la valeur de la décision, pas juste les minutes.',
      lead: "Precision Systems commence par un diagnostic premium, puis s'étend seulement si plus de temps de travail est réellement justifié.",
      tiersEyebrow: 'Niveaux',
      tiersTitle: 'Trois formats, trois intensités.',
      tiersLead:
        "On n'ouvre pas directement un gros mandat. On commence par lire correctement le problème, puis on augmente la profondeur seulement si c'est rationnel.",
      tiers: {
        diagnostic: {
          eyebrow: 'Niveau 01',
          title: 'Diagnostic stratégique',
          summary:
            'Le meilleur point d’entrée pour une lecture en direct du problème, des arbitrages et du prochain mouvement.',
          items: [
            'Choix du créneau et confirmation de paiement',
            'Session Teams de 15 minutes',
            'Carte visuelle du sujet',
            'Recommandation directe sur la suite',
          ],
          cta: 'Réserver ce niveau',
        },
        advisory: {
          eyebrow: 'Niveau 02',
          title: 'Session conseil',
          summary:
            'Pour les décisions qui demandent plus de surface, plus de nuance ou un recadrage plus profond après le diagnostic.',
          items: [
            '30 minutes de travail ciblé',
            'Tradeoffs plus détaillés',
            'Recadrage de positionnement ou de système',
            'Décision de suivi plus ferme',
          ],
          cta: 'Passer au niveau 02',
        },
        working: {
          eyebrow: 'Niveau 03',
          title: 'Session de travail',
          summary:
            'Pour les sujets qui nécessitent une vraie session de restructuration, de problem-solving ou de cadrage opératoire en direct.',
          items: [
            '60 minutes de travail en profondeur',
            'Cartographie live du système ou de la décision',
            'Priorités restructurées',
            'Sortie exploitable immédiatement',
          ],
          cta: 'Passer au niveau 03',
        },
      },
      process: {
        eyebrow: 'Pipeline',
        title: 'Le pipeline fait partie de la promesse.',
        lead: 'Choix du créneau, paiement, lien Teams, diagnostic en direct, carte visuelle. La forme soutient le positionnement et la crédibilité du premium.',
        nodes: [
          {
            label: '01',
            title: 'Créneau choisi',
            body: 'Le bon niveau est sélectionné selon la taille du sujet.',
          },
          {
            label: '02',
            title: 'Paiement confirmé',
            body: 'Le créneau est confirmé avant toute consommation de temps.',
          },
          {
            label: '03',
            title: 'Lien Teams',
            body: 'Le cadre et le lien arrivent avant la session.',
          },
          {
            label: '04',
            title: 'Diagnostic live',
            body: 'Le sujet est travaillé sans détour, avec signal élevé et friction basse.',
          },
          {
            label: '05',
            title: 'Carte + recommandation',
            body: 'Vous repartez avec une visualisation et une suite clairement formulée.',
          },
        ],
      },
      cards: [
        {
          title: 'Inclus',
          body: 'Un diagnostic direct, un cadre de décision, et un artefact concret qui rend la session durable.',
        },
        {
          title: 'Non inclus',
          body: 'Un projet de production complet, une implémentation technique intégrale ou des ateliers longs dans le prix d’entrée.',
        },
        {
          title: 'Meilleure utilisation',
          body: 'Réservez quand une meilleure lecture du problème vous ferait déjà économiser du temps, du focus ou une mauvaise décision.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Choisissez le créneau ou demandez le lien de réservation.',
      lead: 'Si le problème est déjà clair, prenez la route diagnostic. Si le fit est encore flou, envoyez un message WhatsApp court et on vous dira quel niveau est rationnel.',
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Vérification du fit',
          body: 'Le plus utile quand vous voulez un regard extérieur rapide avant de réserver.',
          cta: 'Écrire sur WhatsApp',
        },
        booking: {
          eyebrow: 'Réservation',
          title: 'Créneau + paiement',
          liveBody: 'Choisissez la session, confirmez le paiement et recevez le lien Teams automatiquement.',
          fallbackBody:
            'Utilisez WhatsApp pour recevoir le lien de réservation et de paiement correspondant au bon niveau.',
          liveCta: 'Ouvrir la réservation',
          fallbackCta: 'Demander le lien',
        },
        email: {
          eyebrow: 'Email',
          title: 'Brief structuré',
          body: 'Utile quand le contexte est dense et que vous voulez envoyer une synthèse courte avant la session.',
        },
      },
      pipeline: {
        eyebrow: 'Ce qui se passe après',
        title: 'La session ne commence pas au “bonjour”.',
        lead: "Le produit est le pipeline complet : sélection, paiement, lien, diagnostic, carte et recommandation. C'est ce qui soutient le premium.",
        nodes: [
          {
            label: '01',
            title: 'Choisissez le niveau',
            body: '15, 30 ou 60 minutes selon la taille du sujet.',
          },
          {
            label: '02',
            title: 'Confirmez le paiement',
            body: 'Le paiement protège la qualité et la concentration du format.',
          },
          {
            label: '03',
            title: 'Recevez Teams',
            body: 'Le lien et la demande de contexte arrivent avant le créneau.',
          },
          {
            label: '04',
            title: 'Travail en direct',
            body: 'On travaille le vrai problème, pas une couche cosmétique autour.',
          },
          {
            label: '05',
            title: 'Carte + prochain mouvement',
            body: 'Vous repartez avec une visualisation utile et une suite nette.',
          },
        ],
      },
      notes: {
        eyebrow: 'Notes de session',
        items: () => [
          `Diagnostic stratégique: ${firstOffer.duration} pour ${firstOffer.price}.`,
          `Session conseil: ${secondOffer.duration} pour ${secondOffer.price}.`,
          `Session de travail: ${thirdOffer.duration} pour ${thirdOffer.price}.`,
          'On ne monte en niveau supérieur que si le diagnostic montre que c’est justifié.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Confidentialité',
      title: 'Comment les données de réservation, de paiement et de session sont traitées.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems est exploité par ${config.operator}. Nous collectons uniquement les informations nécessaires pour répondre aux demandes, confirmer les paiements, organiser les sessions et assurer le suivi des demandes actives.`,
      collected: {
        title: 'Ce qui peut être collecté',
        items: [
          'Nom, coordonnées et informations de réservation fournis via WhatsApp, email ou la plateforme de réservation.',
          'Contexte partagé sur votre activité, votre offre, votre système ou votre question de décision.',
          'Métadonnées de paiement et de planification nécessaires pour confirmer la session.',
        ],
      },
      usage: {
        title: 'Comment ces données sont utilisées',
        items: [
          'Répondre à votre demande et confirmer le bon niveau de session.',
          'Traiter la réservation, le paiement et la session.',
          'Préparer un suivi ou une recommandation si vous le demandez.',
        ],
      },
      tools: {
        title: 'Outils tiers',
        body: 'La planification peut passer par Calendly, la messagerie par WhatsApp, les paiements par le canal de paiement choisi et les sessions par Microsoft Teams. Chaque fournisseur peut traiter les données selon ses propres politiques.',
        contactLead: 'Pour une demande de confidentialité ou de suppression, écrivez à',
      },
    },
    terms: {
      eyebrow: 'Conditions',
      title: 'Conditions simples pour un produit de diagnostic premium.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems propose des diagnostics et sessions de conseil opérés par ${config.operator}. Réserver une session implique l’acceptation des principes ci-dessous.`,
      scope: {
        title: 'Périmètre',
        items: () => [
          `Diagnostic stratégique: ${firstOffer.duration} à ${firstOffer.price}.`,
          `Session conseil: ${secondOffer.duration} à ${secondOffer.price}.`,
          `Session de travail: ${thirdOffer.duration} à ${thirdOffer.price}.`,
          "L'implémentation, l'exécution ou un projet de production complet ne sont pas inclus sauf cadrage séparé.",
        ],
      },
      scheduling: {
        title: 'Planification',
        items: [
          'Merci de fournir assez de contexte avant la session pour que le temps soit réellement utile.',
          'Si un report est nécessaire, utilisez le canal de réservation initial le plus tôt possible.',
          'Le résultat promis est un diagnostic, un cadrage et une recommandation, pas une garantie de résultat business.',
        ],
      },
      confidentiality: {
        title: 'Confidentialité',
        body: 'Le contexte partagé est traité comme confidentiel et utilisé uniquement pour comprendre la question, délivrer la session et préparer un éventuel suivi explicitement demandé.',
        contactLead: 'Les questions sur les conditions peuvent être envoyées à',
      },
    },
  },
  en: {
    shell: {
      logoTagline: 'Strategic diagnostics',
      languageLabel: 'Language',
      nav: {
        services: 'Services',
        pricing: 'Pricing',
        contact: 'Contact',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'Swiss-based',
      deliveryArtifact: 'Backed by real deployment systems',
      footer: {
        positioningLabel: 'Positioning',
        positioningTitle: 'Strategic diagnostics for operators.',
        positioningBody:
          'Precision Systems compresses ambiguous positioning, systems, and AI workflow problems into a smaller set of decisions you can actually act on, backed by real deployment experience through the Tonsiteweb ecosystem.',
        navigateLabel: 'Navigate',
        directLabel: 'Direct',
        privacy: 'Privacy',
        terms: 'Terms',
        location: 'Lausanne, Switzerland',
      },
      whatsappPrefillMessage: 'Hello, I would like to book a Precision Systems strategic diagnostic.',
    },
    meta: {
      home: {
        title: 'Precision Systems',
        description:
          'Strategic diagnostics for founders and operators. Positioning, systems, and AI workflow decisions compressed into sharper next moves.',
      },
      services: {
        title: 'Services',
        description:
          'Precision Systems delivers strategic diagnostics for positioning, workflows, systems, and AI decisions with real operational consequences.',
      },
      pricing: {
        title: 'Pricing',
        description:
          'Three tiers: Strategic Diagnostic 15 min at 150 CHF, Advisory Session 30 min at 290 CHF, and Working Session 60 min at 490 CHF.',
      },
      contact: {
        title: 'Contact',
        description:
          'Choose a slot, confirm payment, and receive your Teams link, or request the booking link by WhatsApp.',
      },
      privacy: {
        title: 'Privacy',
        description: 'Privacy information for Precision Systems inquiries, payments, and bookings.',
      },
      terms: {
        title: 'Terms',
        description: 'Terms for Precision Systems diagnostics and advisory sessions.',
      },
    },
    home: {
      eyebrow: 'Strategic diagnostics for founders and operators',
      title: 'Buy clarity before ambiguity gets more expensive.',
      lead: 'Precision Systems is not generic consulting. It is a paid diagnostic for moments where positioning, systems, or AI workflow decisions are already leaking time, revenue, or focus, with advisory grounded in real operated systems.',
      ctaBook: 'Book the diagnostic',
      ctaWhatsapp: 'Check fit on WhatsApp',
      heroCard: {
        eyebrow: 'What gets diagnosed',
        title: 'Questions with real operational consequences.',
        points: [
          'Your offer still makes sense internally, but no longer lands clearly in the market.',
          'Your team is stuck between too many tools, handoffs, or fragile workflows.',
          'You need to know where AI actually helps and where it only adds noise.',
        ],
        note: 'The value is not the conversation. The value is compression: faster diagnosis, cleaner tradeoffs, and a more defensible next move.',
      },
      areas: {
        eyebrow: 'Work angles',
        title: 'Three places where clarity pays back fast.',
        cards: [
          {
            title: 'Positioning and offer architecture',
            body: 'Review the promise, the commercial legibility, the messaging gaps, and the structure of the offer itself.',
          },
          {
            title: 'Systems and workflow drag',
            body: 'Isolate bottlenecks, tool sprawl, unclear handoffs, and the layers that are slowing execution down.',
          },
          {
            title: 'AI, automation, and decision fit',
            body: 'Separate what should be automated, what should stay human, and where the next effort should go.',
          },
        ],
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Choose the slot. Pay. Join Teams. Leave with a map.',
        lead: 'The first session is built like a diagnostic, not a casual discovery call. The pipeline is part of the product.',
        nodes: [
          {
            label: '01',
            title: 'Choose the slot',
            body: 'Take the 15-minute window that fits the problem and the decision you need to make.',
          },
          {
            label: '02',
            title: 'Confirm payment',
            body: 'Payment locks the slot and filters out requests with no real buying intent.',
          },
          {
            label: '03',
            title: 'Receive the Teams link',
            body: 'You get the link, the frame, and a short context request before the session.',
          },
          {
            label: '04',
            title: 'Live strategic diagnostic',
            body: 'The issue gets worked live with framing, tradeoffs, and a senior operator read.',
          },
          {
            label: '05',
            title: 'Visual map + next move',
            body: 'You leave with a visualized problem map and a direct recommendation on what to do next.',
          },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'You leave with',
          title: 'A sharper decision, not more noise.',
          items: [
            'A direct diagnosis of the real issue.',
            'A visual problem map during or after the session.',
            'A recommendation for the best next move.',
            'A move to the next tier only if the problem justifies it.',
          ],
        },
        fit: {
          eyebrow: 'Good fit',
          title: 'For people who happily pay for compression.',
          items: [
            'Founders repositioning an offer or repricing a service.',
            'Operators cleaning up a workflow or systems layer that has become expensive.',
            'Teams evaluating an AI or automation decision with real business impact.',
          ],
        },
      },
      closing: {
        eyebrow: 'Entry point',
        title: () => `${firstOffer.duration} for ${firstOffer.price}. Go deeper only when it is earned.`,
        lead: 'The Strategic Diagnostic is the gate. If the issue needs more working time, the move into Advisory or Working Session happens only after the first read.',
        ctaContact: 'See the pipeline',
        ctaPricing: 'See pricing',
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Strategic diagnostics for positioning, systems, and AI workflows.',
      lead: 'You are not buying generic consulting hours. You are buying a faster diagnosis, cleaner framing, and a more defensible next move, backed by real implementation and deployment capability.',
      cards: [
        {
          eyebrow: '01',
          title: 'Positioning and offer architecture',
          body: 'When the market hears something different from what you think you are selling.',
          items: ['Promise and legibility', 'Positioning gaps', 'Repricing or simplification'],
        },
        {
          eyebrow: '02',
          title: 'Systems and workflow drag',
          body: 'When tools, handoffs, or operating rules start costing time and clarity.',
          items: ['Workflow bottlenecks', 'Tool sprawl', 'Ownership confusion'],
        },
        {
          eyebrow: '03',
          title: 'AI and automation fit',
          body: 'When AI sounds promising but nobody has yet decided where it genuinely helps.',
          items: ['Fit assessment', 'Risk reduction', 'Implementation priority'],
        },
        {
          eyebrow: '04',
          title: 'Decision compression',
          body: 'When the real value is reducing a messy problem to a small number of clear tradeoffs.',
          items: ['Decision frame', 'Visible tradeoffs', 'Defensible next step'],
        },
      ],
      fit: {
        good: {
          eyebrow: 'When to book',
          title: 'The right use of Precision Systems',
          items: [
            'You want a senior outside read before moving more budget, time, or complexity.',
            'You can already feel the cost of a poorly framed problem and want a faster decision.',
            'You would rather pay for a sharp diagnostic than collect vague free calls.',
          ],
        },
        bad: {
          eyebrow: 'When not to book',
          title: 'What this site does not sell',
          items: [
            'A full implementation inside the first session.',
            'Broad coaching with no concrete decision or problem attached.',
            'Free exploratory calls with no real buying intent.',
          ],
        },
      },
      closing: {
        eyebrow: 'Start small, not cheap',
        title: () => `${firstOffer.label} ${firstOffer.duration} at ${firstOffer.price}.`,
        lead: 'The entry point is short but premium. If the diagnostic reveals a real working surface, the next step moves into 30 or 60 minutes with a clearer scope.',
        ctaBook: 'Book the diagnostic',
        ctaPricing: 'See the tiers',
      },
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'The price should reflect the value of the decision, not just the minutes.',
      lead: 'Precision Systems starts with a premium diagnostic, then expands only when more working time is actually justified.',
      tiersEyebrow: 'Tiers',
      tiersTitle: 'Three formats, three intensities.',
      tiersLead:
        'The point is not to open a big project too early. The point is to read the problem correctly first, then increase depth only if it is rational.',
      tiers: {
        diagnostic: {
          eyebrow: 'Tier 01',
          title: 'Strategic Diagnostic',
          summary: 'The best first entry for a live read on the problem, the tradeoffs, and the next move.',
          items: [
            'Slot selection and payment confirmation',
            '15-minute Teams session',
            'Shared visual map of the issue',
            'Direct recommendation on what happens next',
          ],
          cta: 'Book this tier',
        },
        advisory: {
          eyebrow: 'Tier 02',
          title: 'Advisory Session',
          summary:
            'For decisions that need more surface area, nuance, or a deeper reframing after the first diagnostic.',
          items: [
            '30 minutes of targeted work',
            'Deeper tradeoff analysis',
            'Positioning or systems reframing',
            'Stronger follow-up decision memo',
          ],
          cta: 'Move to tier 02',
        },
        working: {
          eyebrow: 'Tier 03',
          title: 'Working Session',
          summary: 'For issues that need true restructuring, live problem solving, or operator-level working time.',
          items: [
            '60 minutes of deeper working time',
            'Live mapping of the system or decision',
            'Restructured priorities',
            'Output that is usable immediately after the session',
          ],
          cta: 'Move to tier 03',
        },
      },
      process: {
        eyebrow: 'Pipeline',
        title: 'The pipeline is part of the promise.',
        lead: 'Slot selection, payment, Teams link, live diagnostic, visual map. The format supports the positioning and makes the premium credible.',
        nodes: [
          { label: '01', title: 'Slot chosen', body: 'The right tier is selected based on the size of the problem.' },
          { label: '02', title: 'Payment confirmed', body: 'The session is confirmed before any time is consumed.' },
          { label: '03', title: 'Teams link', body: 'The frame and session link arrive before the call.' },
          {
            label: '04',
            title: 'Live diagnostic',
            body: 'The issue gets worked without detours, with high signal and low friction.',
          },
          {
            label: '05',
            title: 'Map + recommendation',
            body: 'You leave with a visualization and a clearly worded next step.',
          },
        ],
      },
      cards: [
        {
          title: 'Included',
          body: 'A direct diagnosis, a decision frame, and a concrete artifact that makes the session durable.',
        },
        {
          title: 'Not included',
          body: 'A full production project, end-to-end technical implementation, or long workshops inside the entry price.',
        },
        {
          title: 'Best use',
          body: 'Book when a better read of the problem would already save time, focus, or a bad decision.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Choose the slot or request the booking link.',
      lead: 'If the problem is already clear, take the diagnostic route. If the fit is still unclear, send a short WhatsApp message and we will tell you which tier is rational.',
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Fit check',
          body: 'Best when you want a quick outside read before booking.',
          cta: 'Write on WhatsApp',
        },
        booking: {
          eyebrow: 'Booking',
          title: 'Slot + payment',
          liveBody: 'Choose the session, confirm payment, and receive the Teams link automatically.',
          fallbackBody: 'Use WhatsApp to receive the booking and payment link for the right tier.',
          liveCta: 'Open booking',
          fallbackCta: 'Request the link',
        },
        email: {
          eyebrow: 'Email',
          title: 'Structured brief',
          body: 'Useful when the context is dense and you want to send a short summary before the session.',
        },
      },
      pipeline: {
        eyebrow: 'What happens next',
        title: 'The session does not start at hello.',
        lead: 'The product is the whole pipeline: selection, payment, link, diagnostic, map, and recommendation. That is what supports the premium.',
        nodes: [
          { label: '01', title: 'Choose the tier', body: '15, 30, or 60 minutes depending on the size of the issue.' },
          { label: '02', title: 'Confirm payment', body: 'Payment protects the quality and focus of the format.' },
          { label: '03', title: 'Receive Teams', body: 'The link and context request arrive before the slot.' },
          { label: '04', title: 'Work live', body: 'We work the real problem, not a cosmetic layer around it.' },
          {
            label: '05',
            title: 'Map + next move',
            body: 'You leave with a useful visualization and a clear next step.',
          },
        ],
      },
      notes: {
        eyebrow: 'Session notes',
        items: () => [
          `${firstOffer.label}: ${firstOffer.duration} for ${firstOffer.price}.`,
          `${secondOffer.label}: ${secondOffer.duration} for ${secondOffer.price}.`,
          `${thirdOffer.label}: ${thirdOffer.duration} for ${thirdOffer.price}.`,
          'You only move up a tier if the diagnostic shows that more depth is justified.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Privacy',
      title: 'How booking, payment, and session data is handled.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems is operated by ${config.operator}. We collect only the information needed to answer inquiries, confirm payments, organize sessions, and follow up on active requests.`,
      collected: {
        title: 'What may be collected',
        items: [
          'Name, contact details, and booking information provided through WhatsApp, email, or the booking platform.',
          'The context you share about your business, offer, system, or decision question.',
          'Basic payment and scheduling metadata needed to confirm the session.',
        ],
      },
      usage: {
        title: 'How it is used',
        items: [
          'To respond to your request and confirm the right session tier.',
          'To process the booking, payment, and session.',
          'To prepare a follow-up or recommendation if requested.',
        ],
      },
      tools: {
        title: 'Third-party tools',
        body: 'Scheduling may run through Calendly, messaging through WhatsApp, payment through the chosen payment channel, and sessions through Microsoft Teams. Each provider may process data according to its own policies.',
        contactLead: 'For privacy or deletion requests, write to',
      },
    },
    terms: {
      eyebrow: 'Terms',
      title: 'Simple terms for a premium diagnostic product.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems offers diagnostics and advisory sessions operated by ${config.operator}. Booking a session implies acceptance of the principles below.`,
      scope: {
        title: 'Scope',
        items: () => [
          `${firstOffer.label}: ${firstOffer.duration} at ${firstOffer.price}.`,
          `${secondOffer.label}: ${secondOffer.duration} at ${secondOffer.price}.`,
          `${thirdOffer.label}: ${thirdOffer.duration} at ${thirdOffer.price}.`,
          'Implementation, execution, or a full production project are not included unless scoped separately.',
        ],
      },
      scheduling: {
        title: 'Scheduling',
        items: [
          'Please provide enough context before the session for the time to be genuinely useful.',
          'If rescheduling is needed, use the original booking channel as early as possible.',
          'The promised outcome is diagnosis, framing, and recommendation, not a guaranteed business result.',
        ],
      },
      confidentiality: {
        title: 'Confidentiality',
        body: 'Shared context is treated as confidential and used only to understand the question, deliver the session, and prepare explicitly requested follow-up work.',
        contactLead: 'Questions about terms can be sent to',
      },
    },
  },
  de: {
    shell: {
      logoTagline: 'Strategische Diagnosen',
      languageLabel: 'Sprache',
      nav: {
        services: 'Leistungen',
        pricing: 'Preise',
        contact: 'Kontakt',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'In der Schweiz',
      deliveryArtifact: 'Getragen von real betriebenen Systemen',
      footer: {
        positioningLabel: 'Positionierung',
        positioningTitle: 'Strategische Diagnosen für Operatoren.',
        positioningBody:
          'Precision Systems verdichtet unscharfe Positionierungs-, System- und KI-Workflow-Probleme auf einen kleineren Satz von Entscheidungen, auf die man wirklich handeln kann, getragen von echter Deployment-Erfahrung im Tonsiteweb-Ökosystem.',
        navigateLabel: 'Navigation',
        directLabel: 'Direkt',
        privacy: 'Datenschutz',
        terms: 'Bedingungen',
        location: 'Lausanne, Schweiz',
      },
      whatsappPrefillMessage: 'Hallo, ich möchte eine strategische Precision Systems Diagnose buchen.',
    },
    meta: {
      home: {
        title: 'Precision Systems',
        description:
          'Strategische Diagnosen für Gründer und Operatoren. Positionierung, Systeme und KI-Workflow-Entscheidungen werden in schärfere nächste Schritte verdichtet.',
      },
      services: {
        title: 'Leistungen',
        description:
          'Precision Systems liefert strategische Diagnosen für Positionierung, Workflows, Systeme und KI-Entscheidungen mit echten operativen Folgen.',
      },
      pricing: {
        title: 'Preise',
        description:
          'Drei Stufen: Strategische Diagnose 15 Min. für 150 CHF, Beratungssession 30 Min. für 290 CHF und Arbeitssession 60 Min. für 490 CHF.',
      },
      contact: {
        title: 'Kontakt',
        description:
          'Wählen Sie einen Slot, bestätigen Sie die Zahlung und erhalten Sie Ihren Teams-Link, oder fordern Sie den Buchungslink per WhatsApp an.',
      },
      privacy: {
        title: 'Datenschutz',
        description: 'Datenschutzhinweise für Precision Systems Anfragen, Zahlungen und Buchungen.',
      },
      terms: {
        title: 'Bedingungen',
        description: 'Bedingungen für Precision Systems Diagnosen und Advisory Sessions.',
      },
    },
    home: {
      eyebrow: 'Strategische Diagnosen für Gründer und Operatoren',
      title: 'Kaufen Sie Klarheit, bevor Unschärfe noch teurer wird.',
      lead: 'Precision Systems ist keine generische Beratung. Es ist eine bezahlte Diagnose für Momente, in denen Positionierungs-, System- oder KI-Workflow-Entscheidungen bereits Zeit, Umsatz oder Fokus verlieren lassen, mit Advisory aus real betriebenen Systemen.',
      ctaBook: 'Diagnose buchen',
      ctaWhatsapp: 'Fit auf WhatsApp prüfen',
      heroCard: {
        eyebrow: 'Was diagnostiziert wird',
        title: 'Fragen mit echten operativen Konsequenzen.',
        points: [
          'Ihr Angebot ist intern logisch, landet aber im Markt nicht mehr klar genug.',
          'Ihr Team steckt zwischen zu vielen Tools, Übergaben oder fragilen Workflows fest.',
          'Sie müssen wissen, wo KI wirklich hilft und wo sie nur Rauschen erzeugt.',
        ],
        note: 'Der Wert ist nicht das Gespräch. Der Wert ist Verdichtung: schnellere Diagnose, sauberere Trade-offs und ein besser verteidigbarer nächster Schritt.',
      },
      areas: {
        eyebrow: 'Arbeitsfelder',
        title: 'Drei Stellen, an denen Klarheit schnell zurückzahlt.',
        cards: [
          {
            title: 'Positionierung und Angebotsarchitektur',
            body: 'Versprechen, kommerzielle Lesbarkeit, Message-Gaps und die Struktur des Angebots selbst überprüfen.',
          },
          {
            title: 'Systeme und Workflow-Reibung',
            body: 'Engpässe, Tool-Wildwuchs, unklare Übergaben und die Schichten identifizieren, die Ausführung bremsen.',
          },
          {
            title: 'KI, Automation und Entscheidungs-Fit',
            body: 'Trennen, was automatisiert werden sollte, was menschlich bleiben sollte und wohin der nächste Aufwand gehört.',
          },
        ],
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Slot wählen. Bezahlen. Teams beitreten. Mit einer Karte rausgehen.',
        lead: 'Die erste Session ist wie eine Diagnose gebaut, nicht wie ein lockerer Kennenlerncall. Die Pipeline ist Teil des Produkts.',
        nodes: [
          {
            label: '01',
            title: 'Slot wählen',
            body: 'Nehmen Sie das 15-Minuten-Fenster, das zum Problem und zur Entscheidung passt.',
          },
          {
            label: '02',
            title: 'Zahlung bestätigen',
            body: 'Die Zahlung sperrt den Slot und filtert Anfragen ohne echte Kaufabsicht.',
          },
          {
            label: '03',
            title: 'Teams-Link erhalten',
            body: 'Sie erhalten Link, Rahmen und eine kurze Kontextabfrage vor der Session.',
          },
          {
            label: '04',
            title: 'Live-Diagnose',
            body: 'Das Thema wird live mit Rahmung, Trade-offs und Senior-Operator-Lesart bearbeitet.',
          },
          {
            label: '05',
            title: 'Visuelle Karte + nächster Schritt',
            body: 'Sie gehen mit einer visualisierten Problemkarte und einer direkten Empfehlung heraus.',
          },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'Sie gehen raus mit',
          title: 'Einer schärferen Entscheidung, nicht mehr Rauschen.',
          items: [
            'Einer direkten Diagnose des eigentlichen Problems.',
            'Einer visuellen Problemkarte während oder nach der Session.',
            'Einer Empfehlung für den besten nächsten Schritt.',
            'Einem Wechsel in die nächste Stufe nur, wenn das Problem es rechtfertigt.',
          ],
        },
        fit: {
          eyebrow: 'Guter Fit',
          title: 'Für Menschen, die gern für Verdichtung zahlen.',
          items: [
            'Gründer, die ein Angebot neu positionieren oder einen Service neu bepreisen.',
            'Operatoren, die einen teuren Workflow oder eine Systemschicht bereinigen wollen.',
            'Teams, die eine KI- oder Automationsentscheidung mit echtem Business-Impact bewerten.',
          ],
        },
      },
      closing: {
        eyebrow: 'Einstiegspunkt',
        title: () => `${firstOffer.duration} für ${firstOffer.price}. Tiefer nur, wenn es verdient ist.`,
        lead: 'Die strategische Diagnose ist das Tor. Wenn das Thema mehr Arbeitszeit braucht, erfolgt der Wechsel in Beratungssession oder Arbeitssession erst nach dem ersten Read.',
        ctaContact: 'Pipeline ansehen',
        ctaPricing: 'Preise ansehen',
      },
    },
    services: {
      eyebrow: 'Leistungen',
      title: 'Strategische Diagnosen für Positionierung, Systeme und KI-Workflows.',
      lead: 'Sie kaufen keine generischen Beratungsstunden. Sie kaufen schnellere Diagnose, sauberere Rahmung und einen besser verteidigbaren nächsten Schritt, getragen von echter Implementierungs- und Deployment-Fähigkeit.',
      cards: [
        {
          eyebrow: '01',
          title: 'Positionierung und Angebotsarchitektur',
          body: 'Wenn der Markt etwas anderes hört als das, was Sie zu verkaufen glauben.',
          items: ['Versprechen und Lesbarkeit', 'Positionierungslücken', 'Repricing oder Vereinfachung'],
        },
        {
          eyebrow: '02',
          title: 'Systeme und Workflow-Reibung',
          body: 'Wenn Tools, Übergaben oder operative Regeln Zeit und Klarheit kosten.',
          items: ['Workflow-Engpässe', 'Tool-Wildwuchs', 'Unklare Zuständigkeiten'],
        },
        {
          eyebrow: '03',
          title: 'KI- und Automations-Fit',
          body: 'Wenn KI vielversprechend klingt, aber noch niemand entschieden hat, wo sie wirklich hilft.',
          items: ['Fit-Bewertung', 'Risikoreduktion', 'Umsetzungs-Priorität'],
        },
        {
          eyebrow: '04',
          title: 'Entscheidungsverdichtung',
          body: 'Wenn der wahre Wert darin liegt, ein chaotisches Problem auf wenige klare Trade-offs zu reduzieren.',
          items: ['Entscheidungsrahmen', 'Sichtbare Trade-offs', 'Verteidigbarer nächster Schritt'],
        },
      ],
      fit: {
        good: {
          eyebrow: 'Wann buchen',
          title: 'Der richtige Einsatz von Precision Systems',
          items: [
            'Sie wollen einen externen Senior-Read, bevor Sie mehr Budget, Zeit oder Komplexität bewegen.',
            'Sie spüren bereits die Kosten eines schlecht gerahmten Problems und wollen schneller entscheiden.',
            'Sie zahlen lieber für eine scharfe Diagnose als für vage kostenlose Calls.',
          ],
        },
        bad: {
          eyebrow: 'Wann nicht buchen',
          title: 'Was diese Seite nicht verkauft',
          items: [
            'Eine vollständige Umsetzung in der ersten Session.',
            'Breites Coaching ohne konkrete Entscheidung oder Problem.',
            'Kostenlose Explorationsgespräche ohne echte Kaufabsicht.',
          ],
        },
      },
      closing: {
        eyebrow: 'Klein starten, nicht billig',
        title: () => `Strategische Diagnose ${firstOffer.duration} für ${firstOffer.price}.`,
        lead: 'Der Einstieg ist kurz, aber premium. Wenn die Diagnose eine echte Arbeitsfläche zeigt, geht der nächste Schritt in 30 oder 60 Minuten mit klarerem Scope weiter.',
        ctaBook: 'Diagnose buchen',
        ctaPricing: 'Stufen ansehen',
      },
    },
    pricing: {
      eyebrow: 'Preise',
      title: 'Der Preis sollte den Wert der Entscheidung abbilden, nicht nur die Minuten.',
      lead: 'Precision Systems startet mit einer Premium-Diagnose und erweitert nur dann, wenn mehr Arbeitszeit tatsächlich gerechtfertigt ist.',
      tiersEyebrow: 'Stufen',
      tiersTitle: 'Drei Formate, drei Intensitäten.',
      tiersLead:
        'Der Punkt ist nicht, zu früh ein grosses Projekt zu öffnen. Der Punkt ist, das Problem zuerst korrekt zu lesen und Tiefe nur dann zu erhöhen, wenn es rational ist.',
      tiers: {
        diagnostic: {
          eyebrow: 'Stufe 01',
          title: 'Strategische Diagnose',
          summary:
            'Der beste erste Einstieg für einen Live-Read des Problems, der Trade-offs und des nächsten Schritts.',
          items: [
            'Slot-Auswahl und Zahlungsbestätigung',
            '15-Minuten-Teams-Session',
            'Geteilte visuelle Karte des Problems',
            'Direkte Empfehlung für den nächsten Schritt',
          ],
          cta: 'Diese Stufe buchen',
        },
        advisory: {
          eyebrow: 'Stufe 02',
          title: 'Beratungssession',
          summary:
            'Für Entscheidungen, die nach der ersten Diagnose mehr Fläche, Nuance oder tieferes Reframing brauchen.',
          items: [
            '30 Minuten gezielte Arbeit',
            'Tiefere Trade-off-Analyse',
            'Reframing von Positionierung oder System',
            'Stärkeres Follow-up-Memo',
          ],
          cta: 'Zu Stufe 02 wechseln',
        },
        working: {
          eyebrow: 'Stufe 03',
          title: 'Arbeitssession',
          summary:
            'Für Themen, die echte Restrukturierung, Live-Problem-Solving oder Operator-Level-Arbeitszeit brauchen.',
          items: [
            '60 Minuten tiefere Arbeitszeit',
            'Live-Mapping von System oder Entscheidung',
            'Neu strukturierte Prioritäten',
            'Output, der sofort nutzbar ist',
          ],
          cta: 'Zu Stufe 03 wechseln',
        },
      },
      process: {
        eyebrow: 'Pipeline',
        title: 'Die Pipeline ist Teil des Versprechens.',
        lead: 'Slot-Auswahl, Zahlung, Teams-Link, Live-Diagnose, visuelle Karte. Das Format stützt die Positionierung und macht das Premium glaubwürdig.',
        nodes: [
          { label: '01', title: 'Slot gewählt', body: 'Die passende Stufe wird nach Grösse des Problems gewählt.' },
          { label: '02', title: 'Zahlung bestätigt', body: 'Die Session ist bestätigt, bevor Zeit verbraucht wird.' },
          { label: '03', title: 'Teams-Link', body: 'Rahmen und Link kommen vor dem Call.' },
          {
            label: '04',
            title: 'Live-Diagnose',
            body: 'Das Thema wird ohne Umwege mit hohem Signal und geringer Reibung bearbeitet.',
          },
          {
            label: '05',
            title: 'Karte + Empfehlung',
            body: 'Sie gehen mit einer Visualisierung und einem klar formulierten nächsten Schritt heraus.',
          },
        ],
      },
      cards: [
        {
          title: 'Enthalten',
          body: 'Eine direkte Diagnose, ein Entscheidungsrahmen und ein konkretes Artefakt, das die Session haltbar macht.',
        },
        {
          title: 'Nicht enthalten',
          body: 'Ein vollständiges Produktionsprojekt, End-to-End-Umsetzung oder lange Workshops im Einstiegspreis.',
        },
        {
          title: 'Beste Nutzung',
          body: 'Buchen Sie, wenn ein besserer Read des Problems bereits Zeit, Fokus oder eine Fehlentscheidung sparen würde.',
        },
      ],
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Wählen Sie den Slot oder fordern Sie den Buchungslink an.',
      lead: 'Wenn das Problem schon klar ist, nehmen Sie den Diagnoseweg. Wenn der Fit noch unscharf ist, schicken Sie eine kurze WhatsApp-Nachricht und wir sagen Ihnen, welche Stufe rational ist.',
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Fit-Check',
          body: 'Am besten, wenn Sie vor der Buchung einen schnellen externen Read wollen.',
          cta: 'Auf WhatsApp schreiben',
        },
        booking: {
          eyebrow: 'Buchung',
          title: 'Slot + Zahlung',
          liveBody: 'Wählen Sie die Session, bestätigen Sie die Zahlung und erhalten Sie den Teams-Link automatisch.',
          fallbackBody: 'Nutzen Sie WhatsApp, um den Buchungs- und Zahlungslink für die richtige Stufe zu erhalten.',
          liveCta: 'Buchung öffnen',
          fallbackCta: 'Link anfordern',
        },
        email: {
          eyebrow: 'E-Mail',
          title: 'Strukturierter Brief',
          body: 'Sinnvoll, wenn der Kontext dicht ist und Sie vor der Session eine kurze Zusammenfassung senden möchten.',
        },
      },
      pipeline: {
        eyebrow: 'Was als Nächstes passiert',
        title: 'Die Session beginnt nicht erst beim Hallo.',
        lead: 'Das Produkt ist die ganze Pipeline: Auswahl, Zahlung, Link, Diagnose, Karte und Empfehlung. Das trägt das Premium.',
        nodes: [
          { label: '01', title: 'Stufe wählen', body: '15, 30 oder 60 Minuten je nach Grösse des Themas.' },
          { label: '02', title: 'Zahlung bestätigen', body: 'Die Zahlung schützt Qualität und Fokus des Formats.' },
          { label: '03', title: 'Teams erhalten', body: 'Link und Kontextabfrage kommen vor dem Slot.' },
          {
            label: '04',
            title: 'Live arbeiten',
            body: 'Wir arbeiten am echten Problem, nicht an einer kosmetischen Hülle darum.',
          },
          {
            label: '05',
            title: 'Karte + nächster Schritt',
            body: 'Sie gehen mit einer nützlichen Visualisierung und einem klaren nächsten Schritt heraus.',
          },
        ],
      },
      notes: {
        eyebrow: 'Session-Hinweise',
        items: () => [
          `Strategische Diagnose: ${firstOffer.duration} für ${firstOffer.price}.`,
          `Beratungssession: ${secondOffer.duration} für ${secondOffer.price}.`,
          `Arbeitssession: ${thirdOffer.duration} für ${thirdOffer.price}.`,
          'Sie wechseln nur dann in eine höhere Stufe, wenn die Diagnose zeigt, dass mehr Tiefe gerechtfertigt ist.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Datenschutz',
      title: 'Wie Buchungs-, Zahlungs- und Sitzungsdaten verarbeitet werden.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems wird von ${config.operator} betrieben. Wir erfassen nur die Informationen, die nötig sind, um Anfragen zu beantworten, Zahlungen zu bestätigen, Sessions zu organisieren und aktive Anliegen nachzuverfolgen.`,
      collected: {
        title: 'Was erfasst werden kann',
        items: [
          'Name, Kontaktdaten und Buchungsinformationen über WhatsApp, E-Mail oder die Buchungsplattform.',
          'Der Kontext, den Sie zu Ihrem Geschäft, Angebot, System oder Ihrer Entscheidungsfrage teilen.',
          'Grundlegende Zahlungs- und Terminmetadaten, die zur Bestätigung der Session nötig sind.',
        ],
      },
      usage: {
        title: 'Wie die Daten verwendet werden',
        items: [
          'Um auf Ihre Anfrage zu antworten und die richtige Session-Stufe zu bestätigen.',
          'Um Buchung, Zahlung und Session abzuwickeln.',
          'Um auf Wunsch ein Follow-up oder eine Empfehlung vorzubereiten.',
        ],
      },
      tools: {
        title: 'Drittanbieter-Tools',
        body: 'Terminplanung kann über Calendly laufen, Messaging über WhatsApp, Zahlung über den gewählten Zahlungskanal und Sessions über Microsoft Teams. Jeder Anbieter kann Daten gemäss den eigenen Richtlinien verarbeiten.',
        contactLead: 'Für Datenschutz- oder Löschanfragen schreiben Sie an',
      },
    },
    terms: {
      eyebrow: 'Bedingungen',
      title: 'Einfache Bedingungen für ein Premium-Diagnoseprodukt.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems bietet Diagnosen und Beratungssessions an, betrieben von ${config.operator}. Mit der Buchung einer Session akzeptieren Sie die untenstehenden Grundsätze.`,
      scope: {
        title: 'Umfang',
        items: () => [
          `Strategische Diagnose: ${firstOffer.duration} für ${firstOffer.price}.`,
          `Beratungssession: ${secondOffer.duration} für ${secondOffer.price}.`,
          `Arbeitssession: ${thirdOffer.duration} für ${thirdOffer.price}.`,
          'Umsetzung, Ausführung oder ein vollständiges Produktionsprojekt sind nicht enthalten, sofern nicht separat vereinbart.',
        ],
      },
      scheduling: {
        title: 'Planung',
        items: [
          'Bitte geben Sie vor der Session genug Kontext, damit die Zeit wirklich nützlich ist.',
          'Falls eine Verschiebung nötig ist, nutzen Sie den ursprünglichen Buchungskanal so früh wie möglich.',
          'Das versprochene Ergebnis ist Diagnose, Rahmung und Empfehlung, nicht ein garantiertes Business-Ergebnis.',
        ],
      },
      confidentiality: {
        title: 'Vertraulichkeit',
        body: 'Geteilter Kontext wird vertraulich behandelt und nur genutzt, um die Frage zu verstehen, die Session durchzuführen und explizit gewünschtes Follow-up vorzubereiten.',
        contactLead: 'Fragen zu den Bedingungen können gesendet werden an',
      },
    },
  },
  it: {
    shell: {
      logoTagline: 'Diagnostica strategica',
      languageLabel: 'Lingua',
      nav: {
        services: 'Servizi',
        pricing: 'Prezzi',
        contact: 'Contatto',
      },
      whatsapp: 'WhatsApp',
      swissBased: 'Con base in Svizzera',
      deliveryArtifact: 'Supportato da sistemi realmente operati',
      footer: {
        positioningLabel: 'Posizionamento',
        positioningTitle: 'Diagnostica strategica per operatori.',
        positioningBody:
          'Precision Systems comprime problemi ambigui di posizionamento, sistemi e workflow AI in un insieme più piccolo di decisioni davvero azionabili, supportate da esperienza reale di deployment nell’ecosistema Tonsiteweb.',
        navigateLabel: 'Naviga',
        directLabel: 'Diretto',
        privacy: 'Privacy',
        terms: 'Condizioni',
        location: 'Losanna, Svizzera',
      },
      whatsappPrefillMessage: 'Ciao, vorrei prenotare una diagnosi strategica Precision Systems.',
    },
    meta: {
      home: {
        title: 'Precision Systems',
        description:
          'Diagnostica strategica per founder e operatori. Decisioni su posizionamento, sistemi e workflow AI compresse in prossime mosse più nitide.',
      },
      services: {
        title: 'Servizi',
        description:
          'Precision Systems offre diagnostica strategica per posizionamento, workflow, sistemi e decisioni AI con vere conseguenze operative.',
      },
      pricing: {
        title: 'Prezzi',
        description:
          'Tre livelli: diagnosi strategica 15 min a 150 CHF, sessione consulenza 30 min a 290 CHF e sessione di lavoro 60 min a 490 CHF.',
      },
      contact: {
        title: 'Contatto',
        description:
          'Scegli la fascia oraria, conferma il pagamento e ricevi il link Teams, oppure richiedi il link di prenotazione via WhatsApp.',
      },
      privacy: {
        title: 'Privacy',
        description: 'Informazioni privacy per richieste, pagamenti e prenotazioni Precision Systems.',
      },
      terms: {
        title: 'Condizioni',
        description: 'Condizioni per diagnosi e sessioni advisory Precision Systems.',
      },
    },
    home: {
      eyebrow: 'Diagnostica strategica per founder e operatori',
      title: "Compra chiarezza prima che l'ambiguità diventi più costosa.",
      lead: 'Precision Systems non è consulenza generica. È una diagnosi a pagamento per i momenti in cui decisioni su posizionamento, sistemi o workflow AI stanno già perdendo tempo, ricavi o focus, con advisory radicato in sistemi realmente operati.',
      ctaBook: 'Prenota la diagnosi',
      ctaWhatsapp: 'Verifica il fit su WhatsApp',
      heroCard: {
        eyebrow: 'Cosa viene diagnosticato',
        title: 'Domande con vere conseguenze operative.',
        points: [
          'La tua offerta ha ancora senso internamente, ma sul mercato non arriva più con chiarezza.',
          'Il team è bloccato tra troppi strumenti, handoff o workflow fragili.',
          'Hai bisogno di capire dove l’AI aiuta davvero e dove aggiunge solo rumore.',
        ],
        note: 'Il valore non è la conversazione. Il valore è la compressione: diagnosi più rapida, trade-off più puliti e una prossima mossa più difendibile.',
      },
      areas: {
        eyebrow: 'Angoli di lavoro',
        title: 'Tre punti in cui la chiarezza ripaga in fretta.',
        cards: [
          {
            title: 'Posizionamento e architettura dell’offerta',
            body: 'Rivedere promessa, leggibilità commerciale, gap di messaggio e struttura dell’offerta.',
          },
          {
            title: 'Sistemi e attrito di workflow',
            body: 'Isolare colli di bottiglia, proliferazione di tool, handoff poco chiari e gli strati che rallentano l’esecuzione.',
          },
          {
            title: 'Fit AI, automazione e decisione',
            body: 'Separare ciò che va automatizzato, ciò che deve restare umano e dove va il prossimo sforzo.',
          },
        ],
      },
      pipeline: {
        eyebrow: 'Pipeline',
        title: 'Scegli lo slot. Paga. Entra su Teams. Esci con una mappa.',
        lead: 'La prima sessione è costruita come una diagnosi, non come una call conoscitiva informale. La pipeline è parte del prodotto.',
        nodes: [
          {
            label: '01',
            title: 'Scegli lo slot',
            body: 'Prendi la finestra da 15 minuti giusta per il problema e per la decisione.',
          },
          {
            label: '02',
            title: 'Conferma il pagamento',
            body: 'Il pagamento blocca lo slot e filtra le richieste senza reale intenzione di acquisto.',
          },
          {
            label: '03',
            title: 'Ricevi il link Teams',
            body: 'Ricevi link, frame e breve richiesta di contesto prima della sessione.',
          },
          {
            label: '04',
            title: 'Diagnosi live',
            body: 'Il tema viene lavorato in diretta con framing, trade-off e lettura da operatore senior.',
          },
          {
            label: '05',
            title: 'Mappa visiva + prossima mossa',
            body: 'Esci con una mappa del problema e una raccomandazione diretta sul passo successivo.',
          },
        ],
      },
      outcomes: {
        deliverables: {
          eyebrow: 'Esci con',
          title: 'Una decisione più nitida, non più rumore.',
          items: [
            'Una diagnosi diretta del vero problema.',
            'Una mappa visiva del tema durante o dopo la sessione.',
            'Una raccomandazione sulla migliore prossima mossa.',
            'Un passaggio al livello successivo solo se il problema lo giustifica.',
          ],
        },
        fit: {
          eyebrow: 'Buon fit',
          title: 'Per chi paga volentieri la compressione.',
          items: [
            'Founder che stanno riposizionando un’offerta o riprezzando un servizio.',
            'Operatori che stanno ripulendo un workflow o un layer di sistemi diventato costoso.',
            'Team che valutano una decisione AI o di automazione con vero impatto business.',
          ],
        },
      },
      closing: {
        eyebrow: 'Punto di ingresso',
        title: () => `${firstOffer.duration} per ${firstOffer.price}. Più in profondità solo se meritato.`,
        lead: 'La diagnosi strategica è il gate. Se il tema richiede più tempo di lavoro, il passaggio a sessione consulenza o sessione di lavoro avviene solo dopo la prima lettura.',
        ctaContact: 'Vedi la pipeline',
        ctaPricing: 'Vedi i prezzi',
      },
    },
    services: {
      eyebrow: 'Servizi',
      title: 'Diagnostica strategica per posizionamento, sistemi e workflow AI.',
      lead: 'Non stai comprando ore di consulenza generiche. Stai comprando una diagnosi più rapida, un framing più pulito e una prossima mossa più difendibile, supportati da reale capacità di implementazione e deployment.',
      cards: [
        {
          eyebrow: '01',
          title: 'Posizionamento e architettura dell’offerta',
          body: 'Quando il mercato sente qualcosa di diverso da ciò che credi di stare vendendo.',
          items: ['Promessa e leggibilità', 'Gap di posizionamento', 'Riprezzamento o semplificazione'],
        },
        {
          eyebrow: '02',
          title: 'Sistemi e attrito di workflow',
          body: 'Quando strumenti, handoff o regole operative iniziano a costare tempo e chiarezza.',
          items: ['Colli di bottiglia', 'Proliferazione di tool', 'Confusione di ownership'],
        },
        {
          eyebrow: '03',
          title: 'Fit AI e automazione',
          body: 'Quando l’AI sembra promettente ma nessuno ha ancora deciso dove aiuta davvero.',
          items: ['Valutazione del fit', 'Riduzione del rischio', 'Priorità di implementazione'],
        },
        {
          eyebrow: '04',
          title: 'Compressione decisionale',
          body: 'Quando il vero valore è ridurre un problema caotico a pochi trade-off chiari.',
          items: ['Frame decisionale', 'Trade-off visibili', 'Prossimo passo difendibile'],
        },
      ],
      fit: {
        good: {
          eyebrow: 'Quando prenotare',
          title: 'L’uso giusto di Precision Systems',
          items: [
            'Vuoi una lettura esterna senior prima di muovere più budget, tempo o complessità.',
            'Senti già il costo di un problema mal inquadrato e vuoi decidere più in fretta.',
            'Preferisci pagare una diagnosi netta piuttosto che accumulare call gratuite e vaghe.',
          ],
        },
        bad: {
          eyebrow: 'Quando non prenotare',
          title: 'Cosa questo sito non vende',
          items: [
            'Un’implementazione completa dentro la prima sessione.',
            'Coaching ampio senza una decisione o un problema concreto.',
            'Call esplorative gratuite senza reale intenzione di acquisto.',
          ],
        },
      },
      closing: {
        eyebrow: 'Inizia piccolo, non economico',
        title: () => `Diagnosi strategica ${firstOffer.duration} a ${firstOffer.price}.`,
        lead: 'L’ingresso è breve ma premium. Se la diagnosi rivela una vera superficie di lavoro, il passo successivo passa a 30 o 60 minuti con scope più chiaro.',
        ctaBook: 'Prenota la diagnosi',
        ctaPricing: 'Vedi i livelli',
      },
    },
    pricing: {
      eyebrow: 'Prezzi',
      title: 'Il prezzo deve riflettere il valore della decisione, non solo i minuti.',
      lead: 'Precision Systems parte con una diagnosi premium e si espande solo quando più tempo di lavoro è davvero giustificato.',
      tiersEyebrow: 'Livelli',
      tiersTitle: 'Tre formati, tre intensità.',
      tiersLead:
        'Il punto non è aprire troppo presto un progetto grande. Il punto è leggere correttamente il problema e aumentare la profondità solo se è razionale.',
      tiers: {
        diagnostic: {
          eyebrow: 'Livello 01',
          title: 'Diagnosi strategica',
          summary: 'Il miglior primo ingresso per una lettura live del problema, dei trade-off e della prossima mossa.',
          items: [
            'Scelta dello slot e conferma del pagamento',
            'Sessione Teams di 15 minuti',
            'Mappa visiva condivisa del problema',
            'Raccomandazione diretta sul prossimo passo',
          ],
          cta: 'Prenota questo livello',
        },
        advisory: {
          eyebrow: 'Livello 02',
          title: 'Sessione consulenza',
          summary:
            'Per decisioni che, dopo la prima diagnosi, richiedono più superficie, più sfumatura o un reframing più profondo.',
          items: [
            '30 minuti di lavoro mirato',
            'Analisi dei trade-off più profonda',
            'Reframing di posizionamento o sistema',
            'Memo di follow-up più forte',
          ],
          cta: 'Passa al livello 02',
        },
        working: {
          eyebrow: 'Livello 03',
          title: 'Sessione di lavoro',
          summary:
            'Per temi che richiedono vera ristrutturazione, problem solving live o tempo di lavoro da operatore.',
          items: [
            '60 minuti di lavoro più profondo',
            'Mappatura live del sistema o della decisione',
            'Priorità ristrutturate',
            'Output usabile subito dopo la sessione',
          ],
          cta: 'Passa al livello 03',
        },
      },
      process: {
        eyebrow: 'Pipeline',
        title: 'La pipeline è parte della promessa.',
        lead: 'Scelta dello slot, pagamento, link Teams, diagnosi live, mappa visiva. Il formato sostiene il posizionamento e rende credibile il premium.',
        nodes: [
          {
            label: '01',
            title: 'Slot scelto',
            body: 'Il livello giusto viene selezionato in base alla dimensione del problema.',
          },
          {
            label: '02',
            title: 'Pagamento confermato',
            body: 'La sessione è confermata prima che venga consumato tempo.',
          },
          { label: '03', title: 'Link Teams', body: 'Frame e link arrivano prima della call.' },
          {
            label: '04',
            title: 'Diagnosi live',
            body: 'Il tema viene lavorato senza deviazioni, con alto segnale e bassa frizione.',
          },
          {
            label: '05',
            title: 'Mappa + raccomandazione',
            body: 'Esci con una visualizzazione e un prossimo passo chiaramente formulato.',
          },
        ],
      },
      cards: [
        {
          title: 'Incluso',
          body: 'Una diagnosi diretta, un frame decisionale e un artefatto concreto che rende la sessione durevole.',
        },
        {
          title: 'Non incluso',
          body: 'Un progetto di produzione completo, implementazione end-to-end o workshop lunghi nel prezzo di ingresso.',
        },
        {
          title: 'Uso migliore',
          body: 'Prenota quando una lettura migliore del problema ti farebbe già risparmiare tempo, focus o una cattiva decisione.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contatto',
      title: 'Scegli lo slot o richiedi il link di prenotazione.',
      lead: 'Se il problema è già chiaro, prendi la strada della diagnosi. Se il fit è ancora sfocato, manda un breve messaggio WhatsApp e ti diremo quale livello è razionale.',
      cards: {
        whatsapp: {
          eyebrow: 'WhatsApp',
          title: 'Fit check',
          body: 'Ideale quando vuoi una lettura esterna rapida prima di prenotare.',
          cta: 'Scrivi su WhatsApp',
        },
        booking: {
          eyebrow: 'Prenotazione',
          title: 'Slot + pagamento',
          liveBody: 'Scegli la sessione, conferma il pagamento e ricevi il link Teams automaticamente.',
          fallbackBody: 'Usa WhatsApp per ricevere il link di prenotazione e pagamento del livello giusto.',
          liveCta: 'Apri prenotazione',
          fallbackCta: 'Richiedi il link',
        },
        email: {
          eyebrow: 'Email',
          title: 'Brief strutturato',
          body: 'Utile quando il contesto è denso e vuoi inviare un breve riepilogo prima della sessione.',
        },
      },
      pipeline: {
        eyebrow: 'Cosa succede dopo',
        title: 'La sessione non inizia con “ciao”.',
        lead: 'Il prodotto è tutta la pipeline: selezione, pagamento, link, diagnosi, mappa e raccomandazione. È questo che sostiene il premium.',
        nodes: [
          { label: '01', title: 'Scegli il livello', body: '15, 30 o 60 minuti a seconda della dimensione del tema.' },
          { label: '02', title: 'Conferma il pagamento', body: 'Il pagamento protegge qualità e focus del formato.' },
          { label: '03', title: 'Ricevi Teams', body: 'Link e richiesta di contesto arrivano prima dello slot.' },
          {
            label: '04',
            title: 'Lavora live',
            body: 'Lavoriamo sul vero problema, non su uno strato cosmetico attorno ad esso.',
          },
          {
            label: '05',
            title: 'Mappa + prossima mossa',
            body: 'Esci con una visualizzazione utile e un passo successivo chiaro.',
          },
        ],
      },
      notes: {
        eyebrow: 'Note di sessione',
        items: () => [
          `Diagnosi strategica: ${firstOffer.duration} per ${firstOffer.price}.`,
          `Sessione consulenza: ${secondOffer.duration} per ${secondOffer.price}.`,
          `Sessione di lavoro: ${thirdOffer.duration} per ${thirdOffer.price}.`,
          'Si sale di livello solo se la diagnosi mostra che più profondità è giustificata.',
        ],
      },
    },
    privacy: {
      eyebrow: 'Privacy',
      title: 'Come vengono gestiti dati di prenotazione, pagamento e sessione.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems è gestito da ${config.operator}. Raccogliamo solo le informazioni necessarie per rispondere alle richieste, confermare i pagamenti, organizzare le sessioni e seguire le richieste attive.`,
      collected: {
        title: 'Cosa può essere raccolto',
        items: [
          'Nome, contatti e dati di prenotazione forniti tramite WhatsApp, email o piattaforma di booking.',
          'Il contesto che condividi sulla tua attività, offerta, sistema o domanda decisionale.',
          'Metadati base di pagamento e pianificazione necessari per confermare la sessione.',
        ],
      },
      usage: {
        title: 'Come vengono usati i dati',
        items: [
          'Per rispondere alla tua richiesta e confermare il livello giusto di sessione.',
          'Per processare prenotazione, pagamento e sessione.',
          'Per preparare un follow-up o una raccomandazione se richiesto.',
        ],
      },
      tools: {
        title: 'Strumenti di terze parti',
        body: 'La pianificazione può passare da Calendly, la messaggistica da WhatsApp, il pagamento dal canale di pagamento scelto e le sessioni da Microsoft Teams. Ogni fornitore può trattare i dati secondo le proprie policy.',
        contactLead: 'Per richieste privacy o cancellazione dati, scrivi a',
      },
    },
    terms: {
      eyebrow: 'Condizioni',
      title: 'Condizioni semplici per un prodotto diagnostico premium.',
      lead: (config: typeof precisionSystemsConfig) =>
        `Precision Systems offre diagnosi e sessioni advisory gestite da ${config.operator}. Prenotare una sessione implica l’accettazione dei principi qui sotto.`,
      scope: {
        title: 'Perimetro',
        items: () => [
          `Diagnosi strategica: ${firstOffer.duration} per ${firstOffer.price}.`,
          `Sessione consulenza: ${secondOffer.duration} per ${secondOffer.price}.`,
          `Sessione di lavoro: ${thirdOffer.duration} per ${thirdOffer.price}.`,
          'Implementazione, esecuzione o un progetto di produzione completo non sono inclusi salvo accordo separato.',
        ],
      },
      scheduling: {
        title: 'Pianificazione',
        items: [
          'Fornisci abbastanza contesto prima della sessione perché il tempo sia davvero utile.',
          'Se serve riprogrammare, usa il canale di prenotazione originale il prima possibile.',
          'Il risultato promesso è diagnosi, framing e raccomandazione, non un risultato business garantito.',
        ],
      },
      confidentiality: {
        title: 'Riservatezza',
        body: 'Il contesto condiviso viene trattato come riservato e usato solo per capire la domanda, erogare la sessione e preparare follow-up richiesti esplicitamente.',
        contactLead: 'Le domande sulle condizioni possono essere inviate a',
      },
    },
  },
};

export function getPrecisionSystemsCopy(locale: PrecisionSystemsLocale) {
  return copy[locale] || copy.fr;
}

export function getPrecisionSystemsTierCopy(locale: PrecisionSystemsLocale, key: PrecisionSystemsOfferKey) {
  return getPrecisionSystemsCopy(locale).pricing.tiers[key];
}
