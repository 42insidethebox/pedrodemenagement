const fallbackPhoneDisplay = '+41 76 798 27 93';
const fallbackPhoneIntl = '41767982793';
const phoneDisplay = process.env.IOPARTNER_PHONE_DISPLAY || fallbackPhoneDisplay;
const phoneIntl = (process.env.IOPARTNER_PHONE_INTL || fallbackPhoneIntl).replace(/\D/g, '') || fallbackPhoneIntl;
const email = process.env.IOPARTNER_EMAIL || 'support@iopartner.ch';
const calendlyUrl = process.env.IOPARTNER_CALENDLY_URL || '';
const operator = process.env.IOPARTNER_OPERATOR || 'TonSiteWeb Sàrl';
const defaultWhatsAppMessage = 'Bonjour, je souhaite reserver un diagnostic IO Partner.';

const buildWhatsAppUrl = (message: string) => `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;

const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage);

export const iopartnerLaunchOffers = [
  { key: 'launch', label: 'Launch Site', duration: '3-5 days', price: '999 CHF' },
  { key: 'launchWorkflow', label: 'Site + Workflow', duration: '3-5 days', price: '1249 CHF' },
  { key: 'launchOps', label: 'Site + Ops Stack', duration: '3-5 days', price: '1500 CHF' },
] as const;

export const iopartnerSystemsOffers = [
  { key: 'diagnostic', label: 'Technical Diagnostic', duration: '15 min', price: '60 CHF' },
  { key: 'working', label: 'Working Session', duration: '60 min', price: '490 CHF' },
  { key: 'board', label: 'Advisory Board', duration: 'monthly', price: 'from 1200 CHF' },
] as const;

export type IoPartnerLaunchOffer = (typeof iopartnerLaunchOffers)[number];
export type IoPartnerLaunchOfferKey = IoPartnerLaunchOffer['key'];
export type IoPartnerSystemsOffer = (typeof iopartnerSystemsOffers)[number];
export type IoPartnerSystemsOfferKey = IoPartnerSystemsOffer['key'];

export const iopartnerPrimaryOffer = iopartnerSystemsOffers[0];

export const iopartnerConfig = {
  slug: 'iopartner',
  basePath: '/iopartner',
  domain: 'iopartner.ch',
  name: 'IO Partner',
  phone: phoneDisplay,
  phoneIntl,
  telHref: `tel:+${phoneIntl}`,
  whatsappUrl,
  email,
  calendlyUrl,
  bookingUrl: calendlyUrl || whatsappUrl,
  bookingChannel: calendlyUrl ? 'calendly' : ('whatsapp' as const),
  bookingLabel: calendlyUrl ? 'Book Teams call' : 'Write on WhatsApp',
  operator,
  location: 'Lausanne, Switzerland',
  launchOffers: iopartnerLaunchOffers,
  systemsOffers: iopartnerSystemsOffers,
  offerDuration: iopartnerPrimaryOffer.duration,
  offerPrice: iopartnerPrimaryOffer.price,
  sessionPlatform: 'Microsoft Teams',
  diagnosticArtifact: 'Operator memo + next-step map',
  implementationLead: 'Web, Linux, and workflow delivery',
};

export type IoPartnerConfig = typeof iopartnerConfig;

export const getIoPartnerWhatsAppUrl = (message = defaultWhatsAppMessage) => buildWhatsAppUrl(message);

export const getIoPartnerBookingUrl = (message = defaultWhatsAppMessage) => calendlyUrl || buildWhatsAppUrl(message);
