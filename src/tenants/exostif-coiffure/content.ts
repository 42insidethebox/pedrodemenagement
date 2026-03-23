import { exostifCoiffureConfig } from './config';

export const exostifContent = {
  hero: {
    srH1: 'Coiffeur à Lausanne',
    title: 'Le soin du geste.\nLa précision du résultat.',
    subtitle: 'Salon de coiffure — Lausanne',
    cta: 'Appeler le salon',
    imageAlt: 'Réalisation Exostif Coiffure — coupe et couleur',
  },
  signature: {
    title: 'Notre approche',
    paragraphs: [
      'Un accueil chaleureux et une écoute attentive pour comprendre votre style, vos attentes et les particularités de votre cheveu.',
      'Des techniques maîtrisées : coupes structurées, colorations précises, soins capillaires adaptés à chaque texture.',
      'La santé du cheveu au cœur de chaque prestation : produits sélectionnés, gestes protecteurs et résultats durables.',
      'Une expérience soignée du début à la fin, avec une attention constante aux finitions et à la satisfaction du client.',
    ],
  },
  location: {
    heading: 'Votre salon à Lausanne.',
    subheading: 'Une adresse reconnue pour la qualité de service.',
    imageAlt: 'Extérieur du salon Exostif Coiffure à Lausanne',
  },
  testimonials: [
    {
      quote:
        "Un salon exceptionnel ! L'équipe est professionnelle, l'ambiance agréable et le résultat dépasse toujours mes attentes.",
      author: 'Cliente satisfaite',
      stars: 5,
      when: 'Récemment',
      reviewerMeta: 'Avis Google',
      link: exostifCoiffureConfig.googleReviewsUrl,
    },
    {
      quote: 'Très bonne coupe, service rapide et personnel sympathique. Je recommande vivement.',
      author: 'Client fidèle',
      stars: 5,
      when: 'Il y a 1 mois',
      reviewerMeta: 'Avis Google',
      link: exostifCoiffureConfig.googleReviewsUrl,
    },
    {
      quote:
        'Note de 4.6 sur Google avec plus de 178 avis — un salon qui mérite amplement sa réputation. Qualité constante.',
      author: 'Visiteur régulier',
      stars: 5,
      when: 'Il y a 2 mois',
      reviewerMeta: '178 avis',
      link: exostifCoiffureConfig.googleReviewsUrl,
    },
    {
      quote: 'Accueil souriant, délai respecté et coiffure réussie. Je reviendrai sans hésiter.',
      author: 'Nouveau client',
      stars: 5,
      when: 'Il y a 3 semaines',
      reviewerMeta: 'Avis Google',
      link: exostifCoiffureConfig.googleReviewsUrl,
    },
  ],
  footer: {
    note: 'Salon de coiffure professionnel à Lausanne. Coupes, colorations, soins capillaires, lissage et coiffures mariage.',
  },
};

export type ExostifContent = typeof exostifContent;
