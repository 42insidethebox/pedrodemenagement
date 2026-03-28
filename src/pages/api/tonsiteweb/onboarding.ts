import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getSupabaseAdmin } from '~/lib/supabase';
import { sendEmailTemplate } from '~/lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    const sessionId     = String(form.get('session_id') || '').trim();
    const businessName  = String(form.get('business_name') || '').trim();
    const tagline       = String(form.get('tagline') || '').trim();
    const sector        = String(form.get('sector') || '').trim();
    const description   = String(form.get('description') || '').trim();
    const address       = String(form.get('address') || '').trim();
    const phone         = String(form.get('phone') || '').trim();
    const siteEmail     = String(form.get('site_email') || '').trim();
    const hours         = String(form.get('hours') || '').trim();
    const colorPrimary  = String(form.get('color_primary_hex') || form.get('color_primary') || '').trim();
    const colorSecondary = String(form.get('color_secondary_hex') || form.get('color_secondary') || '').trim();
    const style         = String(form.get('style') || '').trim();
    const instagram     = String(form.get('instagram') || '').trim();
    const facebook      = String(form.get('facebook') || '').trim();
    const domainDesired = String(form.get('domain_desired') || '').trim();
    const domainOwned   = form.get('domain_owned') === 'yes';
    const references    = String(form.get('references') || '').trim();
    const notes         = String(form.get('notes') || '').trim();

    if (!businessName || !description) {
      return new Response(null, {
        status: 303,
        headers: { Location: `/tonsiteweb/onboarding?error=missing&session_id=${encodeURIComponent(sessionId)}` },
      });
    }

    // Collect services
    const services = [];
    for (let i = 1; i <= 4; i++) {
      const name = String(form.get(`service_${i}_name`) || '').trim();
      if (!name) continue;
      services.push({
        name,
        desc: String(form.get(`service_${i}_desc`) || '').trim(),
        price: String(form.get(`service_${i}_price`) || '').trim(),
      });
    }

    const sb = getSupabaseAdmin();

    // Upload files to Supabase Storage
    let logoUrl: string | null = null;
    const photoUrls: string[] = [];

    if (sb) {
      const logoFile = form.get('logo') as File | null;
      if (logoFile && logoFile.size > 0) {
        const ext = logoFile.name.split('.').pop() || 'png';
        const path = `${sessionId || Date.now()}/logo.${ext}`;
        const bytes = await logoFile.arrayBuffer();
        const { data } = await sb.storage
          .from('onboarding-assets')
          .upload(path, bytes, { contentType: logoFile.type, upsert: true });
        if (data?.path) {
          const { data: urlData } = sb.storage.from('onboarding-assets').getPublicUrl(data.path);
          logoUrl = urlData?.publicUrl || null;
        }
      }

      const photoFiles = form.getAll('photos') as File[];
      for (const photo of photoFiles.slice(0, 3)) {
        if (!photo || photo.size === 0) continue;
        const ext = photo.name.split('.').pop() || 'jpg';
        const path = `${sessionId || Date.now()}/photo_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const bytes = await photo.arrayBuffer();
        const { data } = await sb.storage
          .from('onboarding-assets')
          .upload(path, bytes, { contentType: photo.type, upsert: true });
        if (data?.path) {
          const { data: urlData } = sb.storage.from('onboarding-assets').getPublicUrl(data.path);
          if (urlData?.publicUrl) photoUrls.push(urlData.publicUrl);
        }
      }

      // Insert submission
      await sb.from('onboarding_submissions').insert({
        session_id: sessionId || null,
        tenant_id: 'tonsiteweb',
        business_name: businessName,
        tagline: tagline || null,
        sector: sector || null,
        description,
        services,
        address: address || null,
        phone: phone || null,
        email: siteEmail || null,
        hours: hours || null,
        color_primary: colorPrimary || null,
        color_secondary: colorSecondary || null,
        style: style || null,
        logo_url: logoUrl,
        photo_urls: photoUrls.length > 0 ? photoUrls : null,
        instagram: instagram || null,
        facebook: facebook || null,
        domain_desired: domainDesired || null,
        domain_owned: domainOwned,
        references: references || null,
        notes: notes || null,
      });
    }

    // Send admin notification email
    if (ENV.RESEND_API_KEY && ENV.SUPPORT_EMAIL) {
      const servicesList = services.map(s => `• ${s.name}${s.price ? ` (${s.price})` : ''}: ${s.desc}`).join('\n');
      const html = `
        <h2>Nouvelle fiche onboarding — ${businessName}</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          ${[
            ['Entreprise', businessName],
            ['Slogan', tagline],
            ['Secteur', sector],
            ['Description', description],
            ['Services', servicesList || '—'],
            ['Adresse', address],
            ['Téléphone', phone],
            ['Email site', siteEmail],
            ['Horaires', hours],
            ['Couleur principale', colorPrimary],
            ['Couleur secondaire', colorSecondary],
            ['Style', style],
            ['Instagram', instagram],
            ['Facebook', facebook],
            ['Domaine souhaité', domainDesired],
            ['Domaine déjà acheté', domainOwned ? 'Oui' : 'Non'],
            ['Références', references],
            ['Notes', notes],
            ['Logo', logoUrl || '—'],
            ['Session Stripe', sessionId],
          ].map(([k, v]) => `<tr><td style="padding:4px 10px;font-weight:600;border:1px solid #e5e7eb;width:180px;">${k}</td><td style="padding:4px 10px;border:1px solid #e5e7eb;">${v || '—'}</td></tr>`).join('')}
        </table>
        ${photoUrls.length > 0 ? `<p style="margin-top:12px;"><strong>Photos :</strong><br>${photoUrls.map(u => `<a href="${u}">${u}</a>`).join('<br>')}</p>` : ''}
      `;
      await sendEmailTemplate({
        template: 'default',
        to: ENV.SUPPORT_EMAIL,
        locale: 'fr',
        data: { title: `Onboarding — ${businessName}`, html },
        bccSupport: false,
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: '/tonsiteweb/onboarding-merci' },
    });
  } catch (e) {
    console.error('[onboarding] error:', e);
    const sid = '';
    return new Response(null, {
      status: 303,
      headers: { Location: '/tonsiteweb/onboarding?error=server' },
    });
  }
};
