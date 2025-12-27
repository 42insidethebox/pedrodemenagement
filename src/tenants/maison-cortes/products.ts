export type MaisonCortesProduct = {
  id: string;
  city: 'LUGANO' | 'GENEVE' | 'ZURICH' | 'LAUSANNE' | 'ZERMATT';
  citySlug: 'lugano' | 'geneve' | 'zurich' | 'lausanne' | 'zermatt';
  object: string;
  index: string;
  objectSlug: string;
  specs: string[];
  priceChf: number;
};

export const maisonCortesProducts: MaisonCortesProduct[] = [
  {
    id: 'lugano-bracelet-02',
    city: 'LUGANO',
    citySlug: 'lugano',
    object: 'BRACELET',
    index: '02',
    objectSlug: 'bracelet-02',
    specs: ['Sterling silver (925).', 'Gold-plated surface.', '318 diamonds.', 'Width 7 mm.'],
    priceChf: 530,
  },
  {
    id: 'geneve-pendant-03',
    city: 'GENEVE',
    citySlug: 'geneve',
    object: 'PENDANT',
    index: '03',
    objectSlug: 'pendant-03',
    specs: ['Medical-grade titanium core.', 'Gold-plated surface.', '176 diamonds.', 'Length 28 mm.'],
    priceChf: 610,
  },
  {
    id: 'zurich-ring-01',
    city: 'ZURICH',
    citySlug: 'zurich',
    object: 'RING',
    index: '01',
    objectSlug: 'ring-01',
    specs: ['Stainless steel frame.', 'Gold-plated surface.', 'Laser-etched serial number.', 'Width 5 mm.'],
    priceChf: 340,
  },
  {
    id: 'lausanne-bracelet-01',
    city: 'LAUSANNE',
    citySlug: 'lausanne',
    object: 'BRACELET',
    index: '01',
    objectSlug: 'bracelet-01',
    specs: ['Sterling silver (925).', 'Brushed finish.', '84 diamonds.', 'Width 6 mm.'],
    priceChf: 420,
  },
  {
    id: 'zermatt-watch-01',
    city: 'ZERMATT',
    citySlug: 'zermatt',
    object: 'WATCH',
    index: '01',
    objectSlug: 'watch-01',
    specs: ['Stainless steel case.', 'Satin black dial.', '66 diamonds.', 'Case 34 mm.'],
    priceChf: 980,
  },
];

export const maisonCortesCities = Array.from(
  new Map(maisonCortesProducts.map((product) => [product.citySlug, { name: product.city, slug: product.citySlug }])).values()
);
