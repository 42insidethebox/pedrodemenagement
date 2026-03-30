// Paintball Maceió — gallery images
// Replace these Unsplash URLs with your own photos when available.
// Dimensions: hero=1920x1080, gallery=800x600

export const pbmHeroImage = 'https://images.unsplash.com/photo-1625490628-1ea1c3e20d16?w=1920&q=80&fit=crop';

export type PbmGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export const pbmGallery: PbmGalleryItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1625490628-1ea1c3e20d16?w=800&q=80&fit=crop',
    alt: 'Partida de paintball em campo aberto',
    caption: 'Campo floresta',
  },
  {
    src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&fit=crop',
    alt: 'Jogadores em ação com equipamento tático',
    caption: 'Equipamento profissional',
  },
  {
    src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80&fit=crop',
    alt: 'Grupo celebrando após partida',
    caption: 'Diversão garantida',
  },
  {
    src: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=800&q=80&fit=crop',
    alt: 'Arena temática zona urbana',
    caption: 'Campo urbano',
  },
  {
    src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80&fit=crop',
    alt: 'Aniversário especial no campo',
    caption: 'Eventos especiais',
  },
  {
    src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80&fit=crop',
    alt: 'Team building corporativo em campo',
    caption: 'Team building',
  },
];
