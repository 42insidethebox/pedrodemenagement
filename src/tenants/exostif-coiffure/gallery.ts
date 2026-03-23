import type { ImageMetadata } from 'astro';

type GalleryLayout = 'large' | 'tall' | 'wide' | 'square';

export type ExostifImageItem = {
  id: string;
  src: ImageMetadata;
  alt: string;
  filename: string;
};

export type GalleryItem = ExostifImageItem & {
  layout: GalleryLayout;
};

type GalleryData = {
  heroImage: ExostifImageItem | null;
  gallery: GalleryItem[];
  fullGallery: GalleryItem[];
  locationImage: ExostifImageItem | null;
  atelierInteriorImage: ExostifImageItem | null;
  atelierDetailImage: ExostifImageItem | null;
};

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/tolocoiffure_images/*.{png,jpg,jpeg,webp,avif}'
);

const heroPriority = ['hero', 'salon', 'coupe', 'balayage', 'couleur'];
const locationPriority = ['salon', 'exterieur', 'devanture', 'adresse'];
const atelierInteriorPriority = ['interieur', 'atelier', 'salon', 'fauteuil'];
const atelierDetailPriority = ['detail', 'ciseau', 'finition', 'coupe'];
const layoutCycle: GalleryLayout[] = ['large', 'tall', 'square', 'wide', 'square', 'tall'];

const toBaseName = (filepath: string) => filepath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'image';
const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
const manualAlt: Record<string, string> = {
  balayage_soft_lights: 'Réalisation Exostif Coiffure — Balayage signature aux reflets doux',
  balayage_soft_waves: 'Réalisation Exostif Coiffure — Balayage ondulé, finition lumineuse',
  balayage_soft_waves2: 'Réalisation Exostif Coiffure — Balayage naturel aux tons beige doré',
  balayage_soft_waves3: 'Réalisation Exostif Coiffure — Balayage fondu, transitions ultra douces',
  balayage_soft_waves4: 'Réalisation Exostif Coiffure — Balayage glossy, lumière uniforme',
  elegant_profile_soft_waves: 'Profil élégant avec ondulations naturelles',
  pefect_bob: 'Coupe bob précise avec finition soignée',
  classic_fade: 'Classic fade propre avec contours nets',
  closeup_scissors_men_hair: 'Détail coupe homme aux ciseaux',
  distinguished_middle_age_man: 'Coupe homme élégante et mature',
  grey_blending_specialist: 'Travail expert sur cheveux poivre et sel',
  hair_color_correction: 'Correction couleur avec rendu naturel',
  hair_transformation_keratin: 'Transformation capillaire avec soin kératine',
  man_refined_business: 'Look homme raffiné, finition professionnelle',
  ultra_detail_beard: 'Finition barbe ultra précise',
  brunette_to_blonde: 'Transition brune vers blond lumineux',
  curly_woman: 'Coiffure femme sur cheveux bouclés',
  elegant_male: 'Style homme élégant en lumière studio',
};

const toAltFromName = (name: string) => {
  if (manualAlt[name]) return manualAlt[name];
  const clean = name.replace(/\d+/g, ' ').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return `Réalisation Exostif Coiffure — ${clean}`;
};

async function buildSourceList(): Promise<ExostifImageItem[]> {
  const loaded = await Promise.all(
    Object.entries(imageModules).map(async ([path, load]) => {
      const base = toBaseName(path);
      try {
        const mod = await load();
        return {
          id: toSlug(base),
          src: mod.default,
          alt: toAltFromName(base),
          filename: base,
        } satisfies ExostifImageItem;
      } catch {
        return null;
      }
    })
  );

  return loaded
    .filter((item): item is ExostifImageItem => !!item)
    .sort((a, b) => a.filename.localeCompare(b.filename, 'fr', { sensitivity: 'base', numeric: true }));
}

function pickFromPool(pool: ExostifImageItem[], priority: string[]): ExostifImageItem | null {
  if (!pool.length) return null;
  const lowerPriority = priority.map((p) => p.toLowerCase());
  const found =
    lowerPriority
      .map((needle) => pool.find((item) => item.filename.toLowerCase().includes(needle)))
      .find(Boolean) ?? pool[0];

  const idx = pool.findIndex((item) => item.id === found.id);
  if (idx >= 0) pool.splice(idx, 1);
  return found;
}

function withLayouts(items: ExostifImageItem[]): GalleryItem[] {
  return items.map((item, index) => ({
    ...item,
    layout: layoutCycle[index % layoutCycle.length],
  }));
}

export async function getExostifGalleryData(): Promise<GalleryData> {
  const sourceList = await buildSourceList();
  const pool = [...sourceList];

  const heroCandidate = pickFromPool(pool, heroPriority);
  const locationImage = pickFromPool(pool, locationPriority) || heroCandidate;
  const atelierInteriorImage = pickFromPool(pool, atelierInteriorPriority) || heroCandidate;
  const atelierDetailImage = pickFromPool(pool, atelierDetailPriority) || heroCandidate;

  const gallery = withLayouts(pool);
  const fullGallery = withLayouts(sourceList);

  return {
    heroImage: heroCandidate,
    gallery,
    fullGallery,
    locationImage,
    atelierInteriorImage,
    atelierDetailImage,
  };
}
