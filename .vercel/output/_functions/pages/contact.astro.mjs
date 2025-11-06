import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$PageLayout } from '../chunks/PageLayout_DHKJQKmh.mjs';
import { $ as $$HeroText } from '../chunks/HeroText_BbzIdBU8.mjs';
import { $ as $$Contact$1 } from '../chunks/Contact_l1qXsF3Z.mjs';
import { $ as $$Features2 } from '../chunks/Features2_CKSkF_sF.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Contact"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Contact", "title": "Parlons de votre site cl\xE9-en-main", "subtitle": "Un expert TonSiteWeb.ch vous r\xE9pond sous un jour ouvr\xE9." })} ${renderComponent($$result2, "ContactUs", $$Contact$1, { "id": "form", "title": "Demander une d\xE9mo ou un devis", "subtitle": "Remplissez le formulaire, nous vous recontactons par t\xE9l\xE9phone ou visio pour pr\xE9parer votre mise en ligne (d\xE9lai typique\xA0: 5 jours ouvr\xE9s).", "inputs": [
    {
      type: "text",
      name: "name",
      label: "Nom et pr\xE9nom"
    },
    {
      type: "email",
      name: "email",
      label: "Email professionnel"
    },
    {
      type: "text",
      name: "company",
      label: "Entreprise"
    },
    {
      type: "select",
      name: "service",
      label: "Pack souhait\xE9",
      options: [
        { label: "Essentiel", value: "essentiel" },
        { label: "Automatisation", value: "automation" },
        { label: "Maintenance s\xE9curit\xE9", value: "maintenance" },
        { label: "Autre / \xE0 d\xE9finir", value: "custom" }
      ]
    }
  ], "textarea": {
    label: "Votre projet",
    placeholder: "Pr\xE9sentez votre activit\xE9, vos objectifs et vos d\xE9lais."
  }, "disclaimer": {
    label: "En envoyant ce formulaire, vous acceptez que TonSiteWeb.ch traite vos donn\xE9es pour r\xE9pondre \xE0 votre demande, conform\xE9ment \xE0 notre politique de confidentialit\xE9."
  }, "description": "Nos bureaux sont ouverts du lundi au vendredi, 9h-17h. Nous parlons fran\xE7ais, anglais et allemand." })}  ${renderComponent($$result2, "Features2", $$Features2, { "title": "Contact direct", "subtitle": "Choisissez le canal qui vous convient le mieux.", "items": [
    {
      title: "T\xE9l\xE9phone",
      description: "+41 21 555 24 24",
      icon: "tabler:phone"
    },
    {
      title: "Email",
      description: "support@tonsiteweb.ch",
      icon: "tabler:mail"
    },
    {
      title: "Adresse",
      description: "Rue du Grand-Ch\xEAne 8, 1003 Lausanne",
      icon: "tabler:map-pin"
    },
    {
      title: "Disponibilit\xE9",
      description: "Du lundi au vendredi, 9h00 \u2013 17h00",
      icon: "tabler:calendar-time"
    },
    {
      title: "Support client",
      description: "support@tonsiteweb.ch \u2014 r\xE9ponse sous un jour ouvr\xE9",
      icon: "tabler:help"
    }
  ] })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/contact.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
