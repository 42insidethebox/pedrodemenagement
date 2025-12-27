import { maisonCortesTheme } from './theme';

export type MaisonCortesProduct = {
  id: string;
  city: 'LUGANO' | 'GENÈVE' | 'ZÜRICH';
  object: string;
  index: string;
  specs: string[];
  priceChf: number;
  accent?: string;
};

const { colors } = maisonCortesTheme;

export const maisonCortesProducts: MaisonCortesProduct[] = [
  {
    id: 'lugano-bracelet-02',
    city: 'LUGANO',
    object: 'BRACELET',
    index: '02',
    specs: ['Sterling silver (925).', 'Gold-plated surface.', '318 laboratory-grown diamonds.', 'Width 7 mm.'],
    priceChf: 530,
    accent: colors.accentLugano,
  },
  {
    id: 'geneve-pendant-03',
    city: 'GENÈVE',
    object: 'PENDANT',
    index: '03',
    specs: ['Medical-grade titanium core.', 'Gold-plated surface.', '176 laboratory-grown diamonds.', 'Length 28 mm.'],
    priceChf: 610,
    accent: colors.accentGeneve,
  },
  {
    id: 'zurich-ring-01',
    city: 'ZÜRICH',
    object: 'RING',
    index: '01',
    specs: ['Stainless steel frame.', 'Gold-plated surface.', 'Laser-etched serial number.', 'Width 5 mm.'],
    priceChf: 340,
    accent: colors.accentZurich,
  },
];
