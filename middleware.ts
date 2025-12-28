import type { MiddlewareHandler } from 'astro';
import { resolveTenantFromRequest, tenantBasePath } from '~/lib/tenants';

const SKIP_PREFIXES = [
  '/api/',
  '/_astro',
  '/_image',
  '/favicon',
  '/assets',
  '/robots',
  '/sitemap',
  '/@fs',
  '/node_modules',
  '/auth',
  '/app',
  '/decapcms',
];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const resolved = resolveTenantFromRequest(context.request);
  context.locals.tenant = resolved;

  const url = new URL(context.request.url);
  const basePath = tenantBasePath(resolved);
  const hasPrefix = basePath && url.pathname.startsWith(basePath);
  const shouldSkip = SKIP_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
  const headers = new Headers(context.request.headers);
  headers.set('x-tenant-id', resolved.slug);

  // Normalize legacy TonSiteWeb prefixed URLs to the host-based model
  if (resolved.slug === 'tonsiteweb' && url.pathname.startsWith('/tonsiteweb')) {
    const stripped = url.pathname.replace(/^\/tonsiteweb/, '') || '/';
    const target = new URL(stripped, url);
    return Response.redirect(target.toString(), 308);
  }

  if (!shouldSkip && basePath) {
    const shouldStripPrefix = hasPrefix && resolved.preserveBasePath !== true;
    const shouldAddPrefix =
      basePath &&
      !hasPrefix &&
      resolved.source === 'host' &&
      resolved.skipHostRewrite !== true;

    if (shouldStripPrefix) {
      url.pathname = url.pathname.slice(basePath.length) || '/';
    } else if (shouldAddPrefix) {
      const merged = `${basePath}${url.pathname}`;
      url.pathname = merged !== '/' && merged.endsWith('/') ? merged.slice(0, -1) : merged;
    }
  }

  const init: RequestInit = {
    headers,
    method: context.request.method,
    redirect: context.request.redirect,
  };
  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
    init.body = context.request.body;
  }

  return next({ request: new Request(url.toString(), init) });
};
