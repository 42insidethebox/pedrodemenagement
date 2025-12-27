import type { APIRoute } from 'astro';

import { getStripe } from '~/lib/stripe';
import { maisonCortesConfig } from '~/tenants/maison-cortes/config';
import { maisonCortesProducts } from '~/tenants/maison-cortes/products';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const sku = String(formData.get('sku') || '');
  const product = maisonCortesProducts.find((item) => item.id === sku);

  if (!product) {
    return new Response('Produit introuvable', { status: 404 });
  }

  const stripe = await getStripe();
  if (!stripe) {
    return new Response('Stripe non configuré', { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const successUrl = `${origin}/maison-cortes?statut=ok`;
  const cancelUrl = `${origin}/maison-cortes?statut=annule`;
  const productName = `${product.city} / ${product.object} ${product.index}`;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'chf',
    billing_address_collection: 'auto',
    shipping_address_collection: { allowed_countries: [maisonCortesConfig.shipping.country] },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: maisonCortesConfig.shipping.label,
          type: 'fixed_amount',
          fixed_amount: { amount: maisonCortesConfig.shipping.flatFee * 100, currency: 'chf' },
        },
      },
    ],
    allow_promotion_codes: false,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'chf',
          unit_amount: product.priceChf * 100,
          product_data: {
            name: productName,
            description: product.specs.join(' '),
            metadata: { tenant: 'maison-cortes', sku: product.id },
          },
        },
      },
    ],
    metadata: { tenant: 'maison-cortes', sku: product.id, city: product.city },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return new Response(null, {
    status: 303,
    headers: { Location: session.url ?? successUrl },
  });
};

export const GET: APIRoute = async () =>
  new Response('Méthode non autorisée', {
    status: 405,
    headers: { Allow: 'POST' },
  });
