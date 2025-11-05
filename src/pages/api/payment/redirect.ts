import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getStripe } from '~/lib/stripe';
import { determineStripePriceId, ALLOWED_PLANS, isSubscriptionPlan } from '~/lib/pricing.js';
import { buildSuccessUrl, buildCancelUrl } from '~/lib/urls.js';
import { serializeMetadata } from '~/lib/metadata.js';
import { isAllowedTemplate } from '~/lib/templates.js';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  const plan = (url.searchParams.get('plan') || 'essential').toLowerCase();
  const templateRaw = (url.searchParams.get('template') || '').trim();
  const template = isAllowedTemplate(templateRaw) ? templateRaw : '';
  const origin = ENV.ORIGIN || request.headers.get('origin') || url.origin;
  const stripe = await getStripe();

  if (!stripe)
    return new Response('Stripe not configured', { status: 501 });

  if (!ALLOWED_PLANS.includes(plan))
    return new Response('Invalid plan', { status: 400 });

  // Step 1: Try resolving from ENV first
  let priceId = determineStripePriceId(plan, ENV);

  // 🌐 Step 2: If not found, fallback to Stripe lookup_key
  if (!priceId) {
    try {
      const prices = await stripe.prices.list({
        lookup_keys: [plan],
        active: true,
        expand: ['data.product'],
      });
      priceId = prices.data[0]?.id || null;
    } catch (err) {
      console.error('Stripe lookup_key error:', err);
    }
  }

  // Step 3: Still not found → error
  if (!priceId)
    return new Response('Price not configured', { status: 400 });

  // Step 4: Create the checkout session
  const isSubscription = isSubscriptionPlan(plan);
  const metadata = serializeMetadata({ plan, template });
  const session = await stripe.checkout.sessions.create({
    mode: isSubscription ? 'subscription' : 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: buildSuccessUrl(origin),
    cancel_url: buildCancelUrl(origin),
    metadata,
  });

  // Step 5: Redirect to Stripe Checkout
  return new Response(null, {
    status: 303,
    headers: { Location: session.url! },
  });
};
