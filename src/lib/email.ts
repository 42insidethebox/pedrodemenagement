import { ENV } from './env';
import { logger } from './logger.js';

// Internal low-level sender used by helpers below
async function sendEmailInternal(subject: string, to: string, html: string) {
  const key = ENV.RESEND_API_KEY;
  if (!key) return { ok: false, error: 'RESEND_API_KEY missing' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${ENV.SENDER_NAME} <${ENV.SUPPORT_EMAIL}>`,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text };
    }
    return { ok: true };
  } catch (e: any) {
    logger.error(e, { where: 'sendEmail' });
    return { ok: false, error: e?.message || 'Failed' };
  }
}

// Public API: matches usage across API routes
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return sendEmailInternal(subject, to, html);
}

export async function sendAdminNotificationEmail(order: any) {
  const to = ENV.SUPPORT_EMAIL;
  const subject = 'New order received';
  const html = `<p>New order</p><pre>${escapeHtml(JSON.stringify(order, null, 2))}</pre>`;
  return sendEmailInternal(subject, to, html);
}

export async function sendClientConfirmationEmail(order: any) {
  const to = order?.customer_email || order?.email;
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'We received your order';
  const html = `<p>Thanks for your order. We will be in touch shortly.</p>`;
  return sendEmailInternal(subject, to, html);
}

export async function sendDeploymentReadyEmail(order: any, previewUrl: string) {
  const to = order?.customer_email || order?.email;
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Preview is ready';
  const html = `<p>Your preview is ready:</p><p><a href="${previewUrl}">${previewUrl}</a></p>`;
  return sendEmailInternal(subject, to, html);
}

export async function sendInvoiceOrReceiptEmail(_stripeData: any) {
  return { ok: true };
}

export function renderEmailTemplate(_templateName: string, data: any) {
  return `<pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
