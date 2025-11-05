import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getStripe } from '~/lib/stripe';
import { determineStripePriceId, ALLOWED_PLANS, isSubscriptionPlan } from '~/lib/pricing.js';
import { buildSuccessUrl, buildCancelUrl } from '~/lib/urls.js';
import { serializeMetadata } from '~/lib/metadata.js';
import { isAllowedTemplate } from '~/lib/templates.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json().catch(() => ({}));
  const plan = String(data.plan || 'essential').toLowerCase();
  const templateRaw = String(data.template || '').trim();
  const template = isAllowedTemplate(templateRaw) ? templateRaw : '';
  const origin = ENV.ORIGIN || request.headers.get('origin') || 'http://localhost:4321';

  const stripe = await getStripe();
  if (!stripe) return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 501 });

  if (!ALLOWED_PLANS.includes(plan))
    return new Response(JSON.stringify({ error: 'Invalid plan' }), { status: 400 });

  const priceId = determineStripePriceId(plan, ENV);
  if (!priceId) return new Response(JSON.stringify({ error: 'Price not configured' }), { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: isSubscriptionPlan(plan) ? 'subscription' : 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: buildSuccessUrl(origin),
    cancel_url: buildCancelUrl(origin),
    metadata: serializeMetadata({ plan, template }),
  });

  return new Response(JSON.stringify({ url: session.url }), { status: 200 });
};
