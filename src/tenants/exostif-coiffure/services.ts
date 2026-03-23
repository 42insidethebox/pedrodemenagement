export type ServiceItem = {
  name: string;
  price: string;
  description?: string;
  duration?: string;
};

export type ServiceCategory = {
  title: string;
  items: ServiceItem[];
};

export type ServiceGenderKey = 'femme' | 'homme';

export type ServicePanel = {
  title: string;
  categories: ServiceCategory[];
};

export const exostifServicePanels: Record<ServiceGenderKey, ServicePanel> = {
  femme: {
    title: 'Femme',
    categories: [
      {
        title: 'Coupes',
        items: [
          { name: 'Coupe Frange', price: '10 CHF' },
          { name: 'Coupe Femme', price: '40 CHF' },
          { name: 'Coupe Fille (0–11 ans)', price: '25 CHF' },
          { name: 'Coupe Fille (11–16 ans)', price: '35 CHF' },
        ],
      },
      {
        title: 'Brushing / Séchage',
        items: [
          { name: 'Brushing Cheveux Court', price: '35 CHF' },
          { name: 'Brushing Cheveux Mi-Long', price: '42 CHF' },
          { name: 'Brushing Cheveux Long', price: '48 CHF' },
          { name: 'Brushing Cheveux Très Long', price: '55 CHF' },
          { name: 'Séchage', price: '15 CHF' },
        ],
      },
      {
        title: 'Coloration',
        items: [
          { name: 'Coloration Racines', price: '55 CHF' },
          { name: 'Coloration Complète Court', price: '75 CHF' },
          { name: 'Coloration Complète Mi-Long', price: '90 CHF' },
          { name: 'Coloration Complète Long', price: '110 CHF' },
        ],
      },
      {
        title: 'Mèches / Balayage',
        items: [
          { name: 'Balayage / Mèches Mi-Long', price: '150 CHF' },
          { name: 'Balayage / Mèches Long', price: '180 CHF' },
          { name: 'Mèches Demi-Tête Court', price: '90 CHF' },
          { name: 'Mèches Tête Entière Court', price: '120 CHF' },
          { name: 'Mèches Repousse', price: '130 CHF' },
        ],
      },
      {
        title: 'Lissage',
        items: [
          { name: 'Lissage Brésilien Court', price: '180 CHF' },
          { name: 'Lissage Brésilien Mi-Long', price: '280 CHF' },
          { name: 'Lissage Brésilien Long', price: '320 CHF' },
          { name: 'Lissage Brésilien Très Long', price: '360 CHF' },
        ],
      },
      {
        title: 'Soins',
        items: [
          { name: 'Masque Nutritif', price: '15 CHF' },
          { name: 'Soin Kératine', price: '20 CHF' },
          { name: 'Shampoing + Soin', price: '25 CHF' },
        ],
      },
      {
        title: 'Permanente',
        items: [
          { name: 'Permanente Cheveux Court', price: '130 CHF' },
          { name: 'Permanente Cheveux Mi-Long', price: '170 CHF' },
          { name: 'Permanente Cheveux Long', price: '250 CHF' },
        ],
      },
      {
        title: 'Chignon / Mariage',
        items: [
          { name: 'Chignon Simple (Court)', price: '55 CHF' },
          { name: 'Chignon Élaboré (Mi-Long)', price: '75 CHF' },
          { name: 'Chignon Mariée (Long)', price: '90 CHF' },
          { name: 'Coiffure Mariée avec Essai', price: '160 CHF' },
        ],
      },
    ],
  },
  homme: {
    title: 'Homme',
    categories: [
      {
        title: 'Coupes',
        items: [
          { name: 'Coupe Homme', price: '28 CHF' },
          { name: 'Coupe Garçon (0–11 ans)', price: '20 CHF' },
          { name: 'Coupe Garçon (11–16 ans)', price: '24 CHF' },
          { name: 'Coupe Nuque', price: '10 CHF' },
          { name: 'Coupe Tondeuse', price: '20 CHF' },
        ],
      },
      {
        title: 'Barbe',
        items: [
          { name: 'Taille de Barbe', price: '15 CHF' },
          { name: 'Rasage Classique', price: '20 CHF' },
        ],
      },
    ],
  },
};

const previewFromPanel = (panel: ServicePanel, limit: number): ServiceItem[] =>
  panel.categories
    .flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        description: category.title,
      }))
    )
    .slice(0, limit);

export const exostifServices: { femme: ServiceCategory; homme: ServiceCategory } = {
  femme: {
    title: exostifServicePanels.femme.title,
    items: previewFromPanel(exostifServicePanels.femme, 8),
  },
  homme: {
    title: exostifServicePanels.homme.title,
    items: previewFromPanel(exostifServicePanels.homme, 6),
  },
};

export const bookingCta = 'Réserver un rendez-vous';
