import type { ImageMetadata } from 'astro';

export type OgImageItem = {
  id: string;
  src: ImageMetadata;
  alt: string;
  filename: string;
};

const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/onglesgel_images/*.{png,jpg,jpeg,webp}');

const toBaseName = (filepath: string) => filepath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'image';
const toAlt = (name: string) => `Réalisation Ongles Gel Lausanne — ${name.replace(/[_-]+/g, ' ')}`;

export async function getOgGalleryData(): Promise<{ images: OgImageItem[]; heroImage: OgImageItem | null }> {
  const loaded = await Promise.all(
    Object.entries(imageModules).map(async ([path, load]) => {
      const base = toBaseName(path);
      try {
        const mod = await load();
        return {
          id: base,
          src: mod.default,
          alt: toAlt(base),
          filename: base,
        } satisfies OgImageItem;
      } catch {
        return null;
      }
    })
  );

  const images = loaded
    .filter((item): item is OgImageItem => !!item)
    .sort((a, b) => a.filename.localeCompare(b.filename, 'fr', { sensitivity: 'base', numeric: true }));

  const heroImage = images[0] ?? null;
  return { images, heroImage };
}
