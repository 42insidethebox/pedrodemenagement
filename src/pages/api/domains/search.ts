import type { APIRoute } from 'astro';

// Minimal stub for a GoDaddy domain search proxy.
// Set GODADDY_API_KEY and GODADDY_API_SECRET in your env to enable live calls.

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const q = (url.searchParams.get('q') || '').trim();
  const maxPriceChf = Number(url.searchParams.get('max') || 20);

  // When no query provided, return empty list
  if (!q) return new Response(JSON.stringify({ results: [] }), { headers: { 'content-type': 'application/json' } });

  try {
    // Example external call (commented to avoid network during local dev):
    // const key = process.env.GODADDY_API_KEY;
    // const secret = process.env.GODADDY_API_SECRET;
    // if (!key || !secret) throw new Error('GoDaddy API not configured');
    // const r = await fetch(`https://api.godaddy.com/v1/domains/suggest?query=${encodeURIComponent(q)}&country=CH&city=Lausanne&sources=SPONSORED`, {
    //   headers: { Authorization: `sso-key ${key}:${secret}` },
    // });
    // const data = await r.json();

    // Stubbed sample data (prices in CHF/year):
    const data = [
      { domain: `${q}.ch`, price: 12.5 },
      { domain: `${q}.com`, price: 10.9 },
      { domain: `${q}.swiss`, price: 85.0 },
      { domain: `${q}-studio.ch`, price: 14.2 },
      { domain: `${q}.net`, price: 19.5 },
    ];

    const results = data.filter((d: any) => Number(d.price) <= maxPriceChf).slice(0, 10);
    return new Response(JSON.stringify({ results }), { headers: { 'content-type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || 'search_failed' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};

