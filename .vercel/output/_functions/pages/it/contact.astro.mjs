import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$PageLayout, d as footerDataIt, e as headerDataIt } from '../../chunks/PageLayout_vzMlS6La.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_TIfZOsru.mjs';
import { $ as $$Contact$1 } from '../../chunks/Contact_BSyzgnKJ.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_D0Km4c9L.mjs';
export { renderers } from '../../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Contatto"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataIt, "footer": footerDataIt }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Contatto", "title": "Parliamo del tuo sito chiavi in mano", "subtitle": "Un esperto TonSiteWeb.ch risponde entro un giorno lavorativo." })} ${renderComponent($$result2, "ContactUs", $$Contact$1, { "id": "form", "title": "Richiedi demo o preventivo", "subtitle": "Compila il modulo: ti richiameremo o fisseremo una videochiamata per preparare il lancio (timeline tipica: 5 giorni lavorativi).", "inputs": [
    {
      type: "text",
      name: "name",
      label: "Nome e cognome"
    },
    {
      type: "email",
      name: "email",
      label: "Email professionale"
    },
    {
      type: "text",
      name: "company",
      label: "Azienda"
    },
    {
      type: "select",
      name: "service",
      label: "Pacchetto desiderato",
      options: [
        { label: "Essenziale", value: "essentiel" },
        { label: "Automazione", value: "automation" },
        { label: "Piano di cura", value: "maintenance" },
        { label: "Altro / da definire", value: "custom" }
      ]
    }
  ], "textarea": {
    label: "Il tuo progetto",
    placeholder: "Descrivi attivit\xE0, obiettivi e tempi."
  }, "disclaimer": {
    label: "Inviando il modulo accetti che TonSiteWeb.ch tratti i tuoi dati per rispondere alla richiesta, secondo la nostra privacy policy."
  }, "description": "Siamo disponibili dal luned\xEC al venerd\xEC, 9:00\u201317:00. Parliamo francese, inglese e tedesco." })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Contatto diretto", "subtitle": "Scegli il canale pi\xF9 comodo.", "items": [
    {
      title: "Telefono",
      description: "+41 21 555 24 24",
      icon: "tabler:phone"
    },
    {
      title: "Email",
      description: "support@tonsiteweb.ch",
      icon: "tabler:mail"
    },
    {
      title: "Indirizzo",
      description: "Rue du Grand-Ch\xEAne 8, 1003 Losanna",
      icon: "tabler:map-pin"
    },
    {
      title: "Disponibilit\xE0",
      description: "Dal luned\xEC al venerd\xEC, 9:00 \u2013 17:00",
      icon: "tabler:calendar-time"
    },
    {
      title: "Supporto clienti",
      description: "support@tonsiteweb.ch \u2014 risposta entro un giorno lavorativo",
      icon: "tabler:help"
    }
  ] })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/contact.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/contact.astro";
const $$url = "/it/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
