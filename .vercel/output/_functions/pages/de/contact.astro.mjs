import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$PageLayout, f as footerDataDe, h as headerDataDe } from '../../chunks/PageLayout_56pJNQwh.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_DQyeEvvq.mjs';
import { $ as $$Contact$1 } from '../../chunks/Contact_UzL2Jgyf.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_sHlwcKky.mjs';
export { renderers } from '../../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Kontakt"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataDe, "footer": footerDataDe }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Kontakt", "title": "Lassen Sie uns \xFCber Ihre Website sprechen", "subtitle": "Eine Expertin oder ein Experte meldet sich innerhalb eines Arbeitstages." })} ${renderComponent($$result2, "ContactUs", $$Contact$1, { "id": "form", "title": "Demo oder Angebot anfragen", "subtitle": "F\xFCllen Sie das Formular aus \u2013 wir melden uns per Telefon oder Video, um den Launch vorzubereiten (typischer Zeitrahmen: 5 Arbeitstage).", "inputs": [
    {
      type: "text",
      name: "name",
      label: "Vor- und Nachname"
    },
    {
      type: "email",
      name: "email",
      label: "Gesch\xE4ftliche E-Mail"
    },
    {
      type: "text",
      name: "company",
      label: "Unternehmen"
    },
    {
      type: "select",
      name: "service",
      label: "Gew\xFCnschtes Paket",
      options: [
        { label: "Essentiel", value: "essentiel" },
        { label: "Automatisierung", value: "automation" },
        { label: "Serviceplan", value: "maintenance" },
        { label: "Individuell / zu definieren", value: "custom" }
      ]
    }
  ], "textarea": {
    label: "Ihr Projekt",
    placeholder: "Beschreiben Sie Ihr Unternehmen, Ziele und Zeitplan."
  }, "disclaimer": {
    label: "Mit dem Absenden stimmen Sie zu, dass MonWebsite.ch Ihre Daten verarbeitet, um Ihre Anfrage zu beantworten \u2013 gem\xE4ss unserer Datenschutzerkl\xE4rung."
  }, "description": "Unsere B\xFCros sind Montag bis Freitag von 9\u201317 Uhr ge\xF6ffnet. Wir sprechen Franz\xF6sisch, Englisch und Deutsch." })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Direkter Kontakt", "subtitle": "W\xE4hlen Sie den Kanal, der zu Ihnen passt.", "items": [
    {
      title: "Telefon",
      description: "+41 21 555 24 24",
      icon: "tabler:phone"
    },
    {
      title: "E-Mail",
      description: "hello@monwebsite.ch",
      icon: "tabler:mail"
    },
    {
      title: "Adresse",
      description: "Rue du Grand-Ch\xEAne 8, 1003 Lausanne",
      icon: "tabler:map-pin"
    },
    {
      title: "Erreichbarkeit",
      description: "Montag bis Freitag, 09:00 \u2013 17:00",
      icon: "tabler:calendar-time"
    },
    {
      title: "Kundensupport",
      description: "support@monwebsite.ch \u2014 Antwort innerhalb eines Arbeitstages",
      icon: "tabler:help"
    }
  ] })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/contact.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/contact.astro";
const $$url = "/de/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
