export const ALLOWED_TEMPLATES = [
  'classic-clean',
  'bold-contrast',
  'serif-elegance',
  'minimal-grid',
  'warm-landing',
  'artisan-folio',
  // TonSiteWeb choose-template IDs
  'lausanne-demenagement',
  'tolo-coiffure',
  'maison-cortes',
  'onglesgel',
  'restaurant',
  'artisan',
  'therapie',
  'fiduciaire',
  'surprise',
];

export function isAllowedTemplate(id) {
  return id ? ALLOWED_TEMPLATES.includes(String(id)) : false;
}

