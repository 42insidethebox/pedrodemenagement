import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ params, request }) => {
  const p = params.path as string[] | string | undefined;
  const rest = Array.isArray(p) ? p.join('/') : (p ?? '');
  const url = new URL(`/app/${rest}`, request.url);
  return Response.redirect(url, 307);
};
