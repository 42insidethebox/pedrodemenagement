import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ params, request }) => {
  const p = params.path as string[] | string | undefined;
  const rest = Array.isArray(p) ? p.join('/') : (p ?? '');
  const normalized = rest ? rest.replace(/^\/+/, '') : '';
  const base = new URL(request.url);
  const path = normalized ? `/app/${normalized}` : '/app';
  const target = new URL(path, base.origin);
  return Response.redirect(target, 307);
};
