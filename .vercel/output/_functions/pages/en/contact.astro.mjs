import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$PageLayout, a as footerDataEn, b as headerDataEn } from '../../chunks/PageLayout_56pJNQwh.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_DQyeEvvq.mjs';
import { $ as $$Contact$1 } from '../../chunks/Contact_UzL2Jgyf.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_sHlwcKky.mjs';
export { renderers } from '../../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Contact"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataEn, "footer": footerDataEn }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Contact", "title": "Let\u2019s discuss your turnkey site", "subtitle": "A MonWebsite.ch expert replies within one business day." })} ${renderComponent($$result2, "ContactUs", $$Contact$1, { "id": "form", "title": "Request a demo or quote", "subtitle": "Fill out the form and we\u2019ll call or schedule a video meeting to prepare your launch (typical timeline: 5 business days).", "inputs": [
    {
      type: "text",
      name: "name",
      label: "Full name"
    },
    {
      type: "email",
      name: "email",
      label: "Business email"
    },
    {
      type: "text",
      name: "company",
      label: "Company"
    },
    {
      type: "select",
      name: "service",
      label: "Desired pack",
      options: [
        { label: "Essential", value: "essential" },
        { label: "Automation", value: "automation" },
        { label: "Care & security", value: "maintenance" },
        { label: "Custom / to define", value: "custom" }
      ]
    }
  ], "textarea": {
    label: "Your project",
    placeholder: "Describe your business, objectives and deadlines."
  }, "disclaimer": {
    label: "By submitting this form you agree that MonWebsite.ch processes your data to answer your request, in line with our privacy policy."
  }, "description": "Our offices are open Monday to Friday, 9am\u20135pm. We speak French, English and German." })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Direct contact", "subtitle": "Choose the channel that suits you best.", "items": [
    {
      title: "Phone",
      description: "+41 21 555 24 24",
      icon: "tabler:phone"
    },
    {
      title: "Email",
      description: "hello@monwebsite.ch",
      icon: "tabler:mail"
    },
    {
      title: "Address",
      description: "Rue du Grand-Ch\xEAne 8, 1003 Lausanne",
      icon: "tabler:map-pin"
    },
    {
      title: "Availability",
      description: "Monday to Friday, 9:00 \u2013 17:00",
      icon: "tabler:calendar-time"
    },
    {
      title: "Client support",
      description: "support@monwebsite.ch \u2014 reply within one business day",
      icon: "tabler:help"
    }
  ] })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/contact.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/contact.astro";
const $$url = "/en/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
