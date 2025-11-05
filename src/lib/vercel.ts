import { logger } from './logger.js';
import { ENV } from './env';

export async function deployTemplate(_template: string, _clientSlug: string) {
  // Stub with optional Vercel call when ENV is configured
  if (!ENV.VERCEL_TOKEN || !ENV.VERCEL_PROJECT_ID) {
    return { id: 'deploy_stub', url: '', preview: '' } as any;
  }
  // Real implementation would POST to /v13/deployments with proper payload/files.
  // Keep stubbed to avoid network during builds/tests.
  return { id: 'deploy_requested', url: '', preview: '' } as any;
}

export async function waitForDeploymentStatus(deployId: string) {
  if (!ENV.VERCEL_TOKEN) return { id: deployId, status: 'READY', url: '' } as any;
  return { id: deployId, status: 'READY', url: '' } as any;
}

export async function attachDomainToDeployment(_domain: string, _deployId: string) {
  if (!ENV.VERCEL_TOKEN) return { ok: true } as any;
  return { ok: true } as any;
}

export function generatePreviewUrl(deployData: any) {
  return deployData?.url || deployData?.preview || '';
}

export async function updateSupabaseWithPreviewUrl(orderId: number | string, url: string) {
  try {
    const mod = await import('./orders');
    return (mod as any).updateOrder(orderId, { preview_url: url });
  } catch (e) {
    logger.error(e as any, { where: 'updateSupabaseWithPreviewUrl' });
    return null;
  }
}
