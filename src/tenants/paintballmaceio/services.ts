export type PbmPackage = {
  id: string;
  badge?: string;
  name: string;
  tagline: string;
  minPlayers: number;
  maxPlayers: number;
  shots: number;
  duration: string;
  price: number;
  priceUnit: string;
  includes: string[];
  highlight?: boolean;
};

export const pbmPackages: PbmPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Primeira missão',
    minPlayers: 6,
    maxPlayers: 14,
    shots: 100,
    duration: '1h',
    price: 65,
    priceUnit: 'R$/pessoa',
    includes: ['100 bolinhas por pessoa', 'Equipamento completo', '1 campo à escolha', 'Monitor presente'],
  },
  {
    id: 'batalha',
    name: 'Batalha',
    tagline: 'O clássico',
    minPlayers: 10,
    maxPlayers: 30,
    shots: 200,
    duration: '2h',
    price: 110,
    priceUnit: 'R$/pessoa',
    includes: ['200 bolinhas por pessoa', 'Equipamento completo', '2 campos rotativos', 'Monitor presente', 'Fotos da partida'],
    highlight: true,
    badge: 'Mais popular',
  },
  {
    id: 'guerra-total',
    name: 'Guerra Total',
    tagline: 'Máxima adrenalina',
    minPlayers: 16,
    maxPlayers: 60,
    shots: 400,
    duration: '3h',
    price: 195,
    priceUnit: 'R$/pessoa',
    includes: ['400 bolinhas por pessoa', 'Equipamento premium', 'Todos os campos', 'Monitor exclusivo', 'Fotos + vídeo', 'Área de churrasco reservada'],
  },
  {
    id: 'aniversario',
    name: 'Aniversário',
    tagline: 'Festa inesquecível',
    minPlayers: 10,
    maxPlayers: 40,
    shots: 200,
    duration: '2h30',
    price: 130,
    priceUnit: 'R$/pessoa',
    includes: ['200 bolinhas por pessoa', 'Equipamento completo', '2 campos rotativos', 'Espaço decorado', 'Bolo incluso (até 30 pessoas)', 'Fotos da celebração', 'Mimo para o(a) aniversariante'],
    badge: '🎂 Festa',
  },
];

export const pbmExtras = [
  { name: 'Bolinha extra (pacote 50)', price: 'R$ 25' },
  { name: 'Colete tático premium', price: 'R$ 15/pessoa' },
  { name: 'Área de churrasco (avulso)', price: 'R$ 200' },
  { name: 'Fotografia profissional', price: 'R$ 150/sessão' },
];
