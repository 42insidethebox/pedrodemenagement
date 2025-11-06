import { ENV } from './env';
import { logger } from './logger.js';
import { renderTemplate, renderLayout } from './email-templates';

function isFullHtml(html: string) {
  const s = (html || '').trim().toLowerCase();
  return s.startsWith('<!doctype html') || s.startsWith('<html');
}

function stripTagsToText(html: string) {
  return String(html || '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Internal low-level sender used by helpers below
async function sendEmailInternal(subject: string, to: string, html: string) {
  const key = ENV.RESEND_API_KEY;
  if (!key) return { ok: false, error: 'RESEND_API_KEY missing' };
  try {
    // Always ensure a branded layout; if caller already passed a full HTML document, keep it.
    const finalHtml = isFullHtml(html)
      ? html
      : renderLayout({
          title: subject,
          preheader: stripTagsToText(html).slice(0, 140),
          contentHtml: html,
        });
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
        html: finalHtml,
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
  if (!to) return { ok: false, error: 'Missing support email' };
  const subject = order?.order_number
    ? `Nouvelle commande ${order.order_number}`
    : 'Nouvelle commande';
  const html = renderTemplate('admin_notification', { order });
  return sendEmailInternal(subject, to, html);
}

export async function sendClientConfirmationEmail(order: any) {
  const to = order?.customer_email || order?.email;
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = order?.order_number
    ? `Votre commande ${order.order_number} est confirmée`
    : 'Votre commande est confirmée';
  const html = renderTemplate('client_confirmation', { order });
  return sendEmailInternal(subject, to, html);
}

export async function sendDeploymentReadyEmail(order: any, previewUrl: string) {
  const to = order?.customer_email || order?.email;
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Preview is ready';
  const html = renderTemplate('project_ready', { projectName: order?.projectName || 'Votre site', previewUrl });
  return sendEmailInternal(subject, to, html);
}

export async function sendInvoiceOrReceiptEmail(_stripeData: any) {
  return { ok: true };
}

export function renderEmailTemplate(_templateName: string, data: any) {
  // Bridge to real templates
  return renderTemplate(_templateName, data);
}

export async function sendWelcomeEmail(to: string, name?: string | null, verifyUrl?: string) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Bienvenue chez TonSiteWeb';
  const html = renderTemplate('welcome', { name, verifyUrl });
  return sendEmailInternal(subject, to, html);
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Réinitialisez votre mot de passe';
  const html = renderTemplate('password_reset', { resetUrl });
  return sendEmailInternal(subject, to, html);
}

export async function sendPasswordChangedEmail(to: string) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Mot de passe mis à jour';
  const html = renderTemplate('password_changed', {});
  return sendEmailInternal(subject, to, html);
}

export async function sendProjectReadyEmail({
  to,
  projectName,
  previewUrl,
}: {
  to: string;
  projectName: string;
  previewUrl: string;
}) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = `Votre site ${escapeHtml(projectName)} est prêt à être validé`;
  const html = renderTemplate('project_ready', { projectName, previewUrl });
  return sendEmailInternal(subject, to, html);
}

export async function sendProjectDelayedEmail({
  to,
  projectName,
  newEta,
}: {
  to: string;
  projectName: string;
  newEta: string;
}) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = `Mise à jour du planning pour ${escapeHtml(projectName)}`;
  const html = renderTemplate('project_delayed', { projectName, newEta });
  return sendEmailInternal(subject, to, html);
}

export async function sendSupportTicketEmail({
  to,
  ticketId,
  summary,
  customerName,
  priority,
}: {
  to: string;
  ticketId: string;
  summary: string;
  customerName?: string | null;
  priority?: string | null;
}) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = `Nouveau ticket #${escapeHtml(ticketId)} (${escapeHtml(priority || 'normal')})`;
  const html = renderTemplate('support_ticket', { ticketId, summary, customerName, priority });
  return sendEmailInternal(subject, to, html);
}

export async function sendSubscriptionUpdateEmail({
  to,
  subscriptionId,
  action,
}: {
  to: string;
  subscriptionId: string;
  action: 'updated' | 'canceled';
}) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = `Votre abonnement ${escapeHtml(subscriptionId)} a été ${action === 'updated' ? 'mis à jour' : 'annulé'}`;
  const html = renderTemplate('subscription_update', { subscriptionId, action });
  return sendEmailInternal(subject, to, html);
}

export async function sendFeedbackNotificationEmail({
  to,
  message,
  project,
  author,
}: {
  to: string;
  message: string;
  project: string;
  author?: string;
}) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = `Nouveau retour client sur ${project}`;
  const html = renderTemplate('feedback_notification', { message, project, author });
  return sendEmailInternal(subject, to, html);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
