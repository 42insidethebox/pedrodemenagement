export type OgServiceItem = {
  name: string;
  detail?: string;
  price: string;
};

export type OgServiceGroup = {
  number: string;
  category: string;
  items: OgServiceItem[];
};

export const ogServices: OgServiceGroup[] = [
  {
    number: '01',
    category: 'Pose gel',
    items: [
      { name: 'Gel builder sur naturel', detail: 'renforcement & allongement court', price: 'dès CHF 80' },
      { name: 'Gel couleur (shellac)', detail: 'pose sur ongles naturels', price: 'dès CHF 80' },
      { name: 'French gel', detail: 'pointe blanche ou colorée', price: 'dès CHF 70' },
      { name: 'Remplissage gel', detail: 'toutes 3–4 semaines', price: 'dès CHF 70' },
    ],
  },
  {
    number: '02',
    category: 'Extensions',
    items: [
      { name: 'Extensions capsule', detail: 'longueur au choix', price: 'dès CHF 90' },
      { name: 'Extensions gel sur tips', detail: 'effet naturel ou dramatique', price: 'dès CHF 85' },
      { name: 'Dépose extensions', price: 'CHF 30' },
    ],
  },
  {
    number: '03',
    category: 'Nail art',
    items: [
      { name: 'Nail art simple', detail: '2–4 doigts, motif au choix', price: 'dès CHF 20' },
      { name: 'Nail art full set', detail: '10 doigts, création sur mesure', price: 'dès CHF 45' },
      { name: 'Ombré / dégradé', detail: 'baby boomer ou couleur', price: 'dès CHF 75' },
      { name: 'Paillettes & pierres', detail: 'en supplément', price: 'dès CHF 10' },
    ],
  },
  {
    number: '04',
    category: 'Soins & finitions',
    items: [
      { name: 'Manucure express', detail: 'forme, cuticules, vernis', price: 'CHF 35' },
      { name: 'Soin paraffine mains', detail: 'nutrition intense', price: 'CHF 25' },
      { name: 'Dépose vernis gel', price: 'CHF 15' },
    ],
  },
];
