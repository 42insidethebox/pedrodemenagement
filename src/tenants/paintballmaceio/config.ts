const whatsappNumber = '5582999990000';
const whatsappMsg = encodeURIComponent('Olá! Quero saber mais sobre os pacotes de paintball em Maceió.');
export const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

export const pbmConfig = {
  slug: 'paintballmaceio',
  domain: 'paintballmaceio.com.br',
  name: 'Paintball Maceió',
  phone: '(82) 99999-0000',
  telHref: `tel:+5582999990000`,
  whatsappUrl,
  whatsappLabel: 'WhatsApp',
  email: 'contato@paintballmaceio.com.br',
  address: 'Rodovia AL-101 Norte, km 5 — Maceió, AL',
  mapLink: 'https://www.google.com/maps/search/Paintball+Maceio+AL',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126227.77!2d-35.7!3d-9.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMaceio!5e0!3m2!1spt-BR!2sbr!4v1700000000000',
  bookingUrl: whatsappUrl,
  bookingLabel: 'Reservar agora',
  instagram: 'https://instagram.com/paintballmaceio',
  hours: 'Terça a domingo, 8h–18h',
  mapsUrl: 'https://www.google.com/maps/search/Paintball+Maceio+AL',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126227.77!2d-35.7!3d-9.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMaceio!5e0!3m2!1spt-BR!2sbr!4v1700000000000',
};

export type PbmConfig = typeof pbmConfig;
