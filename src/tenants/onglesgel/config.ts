const whatsappNumberIntl = '41772403387';
const whatsappMessage = encodeURIComponent('Bonjour Ivanna, je souhaite prendre rendez-vous.');
const whatsappUrl = `https://wa.me/${whatsappNumberIntl}?text=${whatsappMessage}`;

export const onglesGelConfig = {
  slug: 'onglesgel',
  domain: 'onglesgel.ch',
  phone: '077 240 33 87',
  telHref: whatsappUrl,
  email: 'contact@onglesgel.ch',
  address: 'Rue Pré-du-Marché 6, 1004 Lausanne',
  bookingUrl: whatsappUrl,
  bookingLabel: 'Réserver',
  whatsappUrl,
  whatsappLabel: 'WhatsApp',
  mapLink: 'https://www.google.com/maps/search/Rue+Pré-du-Marché+6+Lausanne',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.604931783173!2d6.629121576793354!3d46.5235379711126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c2fcf179a9b4d%3A0xe750f51e57e837c2!2sTolo%20Coiffure!5e0!3m2!1sen!2sch!4v1700000000000!5m2!1sen!2sch',
};

export type OnglesGelConfig = typeof onglesGelConfig;
