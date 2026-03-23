const phoneLocal = '021 323 28 03';
const phoneIntl = '41213232803';
const whatsappMessage = encodeURIComponent('Bonjour Exostif Coiffure, je souhaite prendre rendez-vous.');
const whatsappUrl = `https://wa.me/${phoneIntl}?text=${whatsappMessage}`;

export const exostifCoiffureConfig = {
  slug: 'exostif-coiffure',
  domain: 'exostif.ch',
  phone: phoneLocal,
  phoneIntlDisplay: '+41 21 323 28 03',
  telHref: `tel:+${phoneIntl}`,
  email: 'contact@exostif.ch',
  address: 'Lausanne',
  bookingUrl: `tel:+${phoneIntl}`,
  bookingChannel: 'phone' as const,
  bookingLabel: 'Appeler le salon',
  whatsappUrl,
  googleReviewsUrl:
    'https://www.google.com/search?q=Exostif+Coiffure+Lausanne&hl=fr',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43936.76073234!2d6.5941!3d46.5197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRXhvc3RpZiBDb2lmZnVyZQ!5e0!3m2!1sfr!2sch!4v1700000000000!5m2!1sfr!2sch',
  mapLink: 'https://www.google.com/maps/search/Exostif+Coiffure+Lausanne',
};

export type ExostifCoiffureConfig = typeof exostifCoiffureConfig;
