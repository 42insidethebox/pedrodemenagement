import type { APIRoute } from 'astro';
import { ENV } from '~/lib/env';
import { getSupabaseAdmin } from '~/lib/supabase';
import { sendEmail } from '~/lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const ctype = request.headers.get('content-type') || '';
    let name = '', email = '', company = '', message = '', source = 'contact';
    if (ctype.includes('application/json')) {
      const data = await request.json().catch(() => ({}));
      name = String(data.name || '').trim();
      email = String(data.email || '').trim();
      company = String(data.company || '').trim();
      message = String(data.message || '').trim();
      source = String(data.source || 'contact').trim();
    } else {
      const form = await request.formData();
      name = String(form.get('name') || '').trim();
      email = String(form.get('email') || '').trim();
      company = String(form.get('company') || '').trim();
      message = String(form.get('message') || form.get('textarea') || '').trim();
      source = String(form.get('source') || 'contact').trim();
    }

    const sb = getSupabaseAdmin();
    if (sb) {
      await sb.from('leads').insert({ name, email, company, message, source });
    }

    if (ENV.RESEND_API_KEY && email) {
      await sendEmail({
        to: ENV.SUPPORT_EMAIL!,
        subject: `New contact lead: ${name || email}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company}</p><p>${message}</p>`,
      });
      // Acknowledge to client
      await sendEmail({
        to: email,
        subject: 'We received your message',
        html: `<p>Hi ${name || ''},</p><p>Thanks for reaching out to TonSiteWeb. We will get back to you shortly.</p>`,
      });
    }

    // Optional Zapier hook
    if (ENV.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(ENV.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, company, message, source }),
        });
      } catch {}
    }

    // Redirect HTML form submissions to a thank-you page
    if (!ctype.includes('application/json')) {
      const to = `${ENV.ORIGIN || url.origin}/thank-you`;
      return new Response(null, { status: 303, headers: { Location: to } });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), { status: 200 });
  }
};
