import type { APIRoute } from 'astro';
import { handleUnifiedCheckout } from '~/lib/checkout';

export const prerender = false;

const wrap = async (ctx: Parameters<APIRoute>[0]) => {
  try {
    return await handleUnifiedCheckout(ctx);
  } catch (e) {
    console.error('[checkout] unhandled error:', e instanceof Error ? e.stack : String(e));
    return new Response('Internal error', { status: 500 });
  }
};

export const GET: APIRoute = async (ctx) => wrap(ctx);
export const POST: APIRoute = async (ctx) => wrap(ctx);
