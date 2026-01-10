import type { MiddlewareHandler } from 'astro';
import { resolveTenantFromRequest, tenantBasePath } from '~/lib/tenants';
import { getWebsiteByHost } from '~/lib/website-resolver';

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
  '/__site',
];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const resolved = resolveTenantFromRequest(context.request);
  context.locals.tenant = resolved;

  const url = new URL(context.request.url);
  const hostLower = url.host.toLowerCase();
  const basePath = tenantBasePath(resolved);
  const hasPrefix = basePath && url.pathname.startsWith(basePath);
  const shouldSkip = SKIP_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
  const headers = new Headers(context.request.headers);
  headers.set('x-tenant-id', resolved.slug);

  // Multi-tenant site resolver (customer sites)
  if (!shouldSkip) {
    const website = await getWebsiteByHost(hostLower);
    if (website && resolved.source === 'fallback') {
      context.locals.website = website;
      headers.set('x-website-id', website.website.id);
      const targetPath = `/__site${url.pathname === '/' ? '' : url.pathname}`;
      url.pathname = targetPath;
      const init: RequestInit = {
        headers,
        method: context.request.method,
        redirect: context.request.redirect,
      };
      if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
        init.body = context.request.body;
      }
      return next({ request: new Request(url.toString(), init) });
    }
  }

  // Explicit host guard for Atelier Mémoire to avoid falling back to déménagement pages
  if (hostLower.includes('ateliermemoire.ch') && !url.pathname.startsWith('/atelier-memoire')) {
    const target = new URL(`/atelier-memoire${url.pathname === '/' ? '' : url.pathname}${url.search}`, url);
    return Response.redirect(target.toString(), 308);
  }

  // Hard redirect Atelier Mémoire host to its dedicated base path to avoid falling back to generic content
  if (resolved.slug === 'ateliermemoire') {
    const shouldRedirect = !url.pathname.startsWith('/atelier-memoire');
    if (shouldRedirect) {
      const target = new URL(`/atelier-memoire${url.pathname === '/' ? '' : url.pathname}${url.search}`, url);
      return Response.redirect(target.toString(), 308);
    }
  }

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
