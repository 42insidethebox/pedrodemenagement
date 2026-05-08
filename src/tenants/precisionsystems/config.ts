const fallbackPhoneDisplay = '+41 76 798 27 93';
const fallbackPhoneIntl = '41767982793';
const phoneDisplay = process.env.PRECISIONSYSTEMS_PHONE_DISPLAY || fallbackPhoneDisplay;
const phoneIntl =
  (process.env.PRECISIONSYSTEMS_PHONE_INTL || fallbackPhoneIntl).replace(/\D/g, '') || fallbackPhoneIntl;
const email = process.env.PRECISIONSYSTEMS_EMAIL || 'support@tonsiteweb.ch';
const calendlyUrl = process.env.PRECISIONSYSTEMS_CALENDLY_URL || '';
const defaultWhatsAppMessage = 'Bonjour, je souhaite reserver un diagnostic strategique Precision Systems.';

const buildWhatsAppUrl = (message: string) => `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;

const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage);

export const precisionSystemsOffers = [
  { key: 'diagnostic', label: 'Strategic Diagnostic', duration: '15 min', price: '150 CHF' },
  { key: 'advisory', label: 'Advisory Session', duration: '30 min', price: '290 CHF' },
  { key: 'working', label: 'Working Session', duration: '60 min', price: '490 CHF' },
] as const;

export type PrecisionSystemsOffer = (typeof precisionSystemsOffers)[number];
export type PrecisionSystemsOfferKey = PrecisionSystemsOffer['key'];
export const precisionSystemsPrimaryOffer = precisionSystemsOffers[0];

export const precisionSystemsConfig = {
  slug: 'precisionsystems',
  basePath: '/precisionsystems',
  domain: 'precisionsystems.ch',
  name: 'Precision Systems',
  phone: phoneDisplay,
  phoneIntl,
  telHref: `tel:+${phoneIntl}`,
  whatsappUrl,
  email,
  calendlyUrl,
  bookingUrl: calendlyUrl || whatsappUrl,
  bookingChannel: calendlyUrl ? 'calendly' : ('whatsapp' as const),
  bookingLabel: calendlyUrl ? 'Book a call' : 'Write on WhatsApp',
  operator: 'TonSiteWeb Sarl',
  location: 'Lausanne, Switzerland',
  offers: precisionSystemsOffers,
  offerDuration: precisionSystemsPrimaryOffer.duration,
  offerPrice: precisionSystemsPrimaryOffer.price,
  sessionPlatform: 'Microsoft Teams',
  diagnosticArtifact: 'Obsidian map + next-step memo',
};

export type PrecisionSystemsConfig = typeof precisionSystemsConfig;

export const getPrecisionSystemsWhatsAppUrl = (message = defaultWhatsAppMessage) => buildWhatsAppUrl(message);

export const getPrecisionSystemsBookingUrl = (message = defaultWhatsAppMessage) =>
  calendlyUrl || buildWhatsAppUrl(message);
