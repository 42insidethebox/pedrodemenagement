import type { APIRoute } from 'astro';

import { IOPARTNER_CUSTOM_TIER_FLOW, type IoPartnerCustomTierKey } from '~/data/iopartnerCustomTierFlow';
import { getSupabaseAdmin } from '~/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  const form = await request.formData();
  const track = String(form.get('track') || '').trim() as IoPartnerCustomTierKey;
  const locale = String(form.get('locale') || 'fr').trim();
  const localePrefix = ['en', 'de', 'it'].includes(locale) ? `/${locale}` : '';
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const company = String(form.get('company') || '').trim();
  const notes = String(form.get('notes') || '').trim();

  const tier = IOPARTNER_CUSTOM_TIER_FLOW[track];
  if (!tier || !name || !email || !phone) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: `${localePrefix}/custom-tier?track=${encodeURIComponent(track || 'private-2000')}&error=missing`,
      },
    });
  }

  const summary = [
    `Track: ${track}`,
    `Tier: ${tier.title.fr}`,
    `Price: ${tier.priceLabel.fr}`,
    company ? `Company: ${company}` : '',
    notes ? `Notes: ${notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const sb = getSupabaseAdmin();
  if (sb) {
    await sb.from('leads').insert({
      name,
      email,
      company: company || null,
      message: summary,
      source: `iopartner-custom-tier-${track}`,
      tenant_id: 'iopartner',
    });
  }

  const redirect = new URL('/api/payment/redirect', url.origin);
  redirect.searchParams.set('tenant', 'iopartner');
  redirect.searchParams.set('email', email);
  redirect.searchParams.set('name', name);
  redirect.searchParams.set('phone', phone);
  redirect.searchParams.set('company', company);
  redirect.searchParams.set('template', track);
  redirect.searchParams.set('locale', locale);

  if (tier.amountChf) {
    redirect.searchParams.set('plan', 'custom');
    redirect.searchParams.set('amount', String(tier.amountChf));
    redirect.searchParams.set(
      'description',
      tier.stripeDescription[locale as keyof typeof tier.stripeDescription] || tier.stripeDescription.fr
    );
  } else {
    redirect.searchParams.set('plan', tier.fallbackPlan || 'session140');
  }

  return new Response(null, { status: 303, headers: { Location: redirect.toString() } });
};
