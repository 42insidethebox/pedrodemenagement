export type BrandKey = 'pedro' | 'lausanne' | 'urgent' | 'debarras';

/**
 * Map request host to a brand key. Default to "pedro" if unknown.
 */
export function getBrandFromHost(host: string | null | undefined): BrandKey {
  const value = (host || '').toLowerCase();
  if (!value) return 'pedro';

  if (value.includes('lausannedemenagement.ch')) return 'lausanne';
  if (value.includes('demenagementurgent.ch')) return 'urgent';
  if (value.includes('debarraslausanne.ch')) return 'debarras';
  return 'pedro';
}
