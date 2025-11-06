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

export async function sendWelcomeEmail(to: string, name?: string | null, verifyUrl?: string) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Bienvenue chez TonSiteWeb';
  const verifyBlock = verifyUrl
    ? `<p>Validez votre adresse email en cliquant sur <a href="${escapeHtml(verifyUrl)}">ce lien sécurisé</a>.</p>`
    : '';
  const html = `
    <p>${escapeHtml(name || 'Bonjour')} 👋,</p>
    <p>Votre compte TonSiteWeb a été créé avec succès.</p>
    <p>Vous pouvez dès maintenant vous connecter pour suivre vos projets, gérer vos paiements et demander des ajustements.</p>
    ${verifyBlock}
    <p>Besoin d'aide ? Répondez simplement à cet email.</p>
  `;
  return sendEmailInternal(subject, to, html);
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Réinitialisez votre mot de passe';
  const html = `
    <p>Nous avons reçu une demande de réinitialisation de mot de passe.</p>
    <p><a href="${escapeHtml(resetUrl)}">Cliquez ici pour définir un nouveau mot de passe</a>.</p>
    <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
  `;
  return sendEmailInternal(subject, to, html);
}

export async function sendPasswordChangedEmail(to: string) {
  if (!to) return { ok: false, error: 'Missing recipient' };
  const subject = 'Mot de passe mis à jour';
  const html = `
    <p>Votre mot de passe TonSiteWeb a été modifié avec succès.</p>
    <p>Si vous n'êtes pas à l'origine de ce changement, contactez immédiatement notre équipe support.</p>
  `;
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
  const html = `
    <p>Bonjour 👋,</p>
    <p>Nous venons de terminer la première version de <strong>${escapeHtml(projectName)}</strong>.</p>
    <p>Consultez la maquette : <a href="${escapeHtml(previewUrl)}">${escapeHtml(previewUrl)}</a></p>
    <p>Ajoutez vos commentaires directement dans le document partagé. Nous sommes prêts pour les derniers ajustements.</p>
  `;
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
  const html = `
    <p>Bonjour,</p>
    <p>Nous avons dû ajuster le calendrier du projet <strong>${escapeHtml(projectName)}</strong>.</p>
    <p>La nouvelle date de livraison estimée est le <strong>${escapeHtml(newEta)}</strong>.</p>
    <p>Contactez-nous si vous avez besoin d'un point rapide.</p>
  `;
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
  const html = `
    <p>Nouvelle demande client reçue.</p>
    <p><strong>${escapeHtml(customerName || 'Client TonSiteWeb')}</strong> : ${escapeHtml(summary)}</p>
    <p>Connectez-vous au portail pour suivre et facturer l'intervention.</p>
  `;
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
  const html = `
    <p>Bonjour,</p>
    <p>Nous confirmons que votre abonnement <strong>${escapeHtml(subscriptionId)}</strong> a bien été ${
      action === 'updated' ? 'mis à jour.' : 'annulé.'
    }</p>
    <p>Besoin d'aide ou d'ajustements ? Répondez simplement à cet email.</p>
  `;
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
  const html = `
    <p>Vous avez reçu un nouveau retour client pour <strong>${escapeHtml(project)}</strong>.</p>
    <p><em>${escapeHtml(author || 'Client')}</em> a écrit :</p>
    <blockquote>${escapeHtml(message)}</blockquote>
  `;
  return sendEmailInternal(subject, to, html);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
