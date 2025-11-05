import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_BwlJ74mX.mjs';
import { $ as $$PageLayout, c as footerDataEn, d as headerDataEn } from '../../chunks/PageLayout_BqyLTlOK.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_ClQR8WMz.mjs';
import { $ as $$Pricing$1 } from '../../chunks/Pricing_BoTyvBYR.mjs';
import { $ as $$PricingOptions } from '../../chunks/PricingOptions_DemqZGFn.mjs';
import { $ as $$Steps, a as $$FAQs } from '../../chunks/Steps_BjELtjt8.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_D14xZ8uE.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_CXdxRUaW.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pricing;
  const metadata = {
    title: "Pricing"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataEn, "footer": footerDataEn }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Pricing", "title": "Transparent packages, billed in Switzerland", "subtitle": "Every pack includes design, launch and human support. Care is optional; integrations on quote." })} ${renderComponent($$result2, "Prices", $$Pricing$1, { "title": "Our turnkey packs", "subtitle": "Choose the offer that fits your needs. No hidden fees.", "prices": [
    {
      title: "Essential",
      subtitle: "Turnkey showcase site (code delivered)",
      price: 999,
      period: "from \u2014 one-time",
      items: [
        {
          description: "Showcase site with 5 sections + responsive contact page"
        },
        {
          description: "Client-provided content; we integrate and format it"
        },
        {
          description: "Video training + autonomy checklist"
        }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-essential-en">Explore</a>'
    },
    {
      title: "Advanced",
      subtitle: "Site + advanced features",
      price: 3e3,
      period: "from \u2014 one-time",
      items: [
        { description: "Includes the Essential pack" },
        { description: "Simple backend + template (up to 5,000 CHF)" },
        { description: "Bespoke projects 10,000 CHF+ \u2014 let\u2019s talk" },
        { description: "End-to-end testing and concise docs" }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-advanced-en">Explore</a>'
    },
    {
      title: "Care & security",
      subtitle: "Updates and options by tier",
      price: 79,
      period: "from / month \u2014 no surprises",
      items: [
        {
          description: "Security updates and scheduled backups"
        },
        {
          description: "Uptime monitoring & priority fixes"
        },
        {
          description: "Pro email & Swiss hosting from 149\u2013249 CHF/month"
        },
        {
          description: "Email & video support within one business day"
        }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-care-en">Choose</a>'
    }
  ] })} ${maybeRenderHead()}<div class="mt-6 grid gap-4 max-w-7xl mx-auto px-4"> <div class="flex flex-wrap gap-4"> ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-essential-en", "triggerText": "", "title": "Essential packs", "subtitle": "Choose your automation level", "ctaText": "Choose", "tiers": [
    { label: "CHF 999", price: "from 999", features: ["Static site", "Simple form (email)"], href: "/en/choose-template?plan=essential999", info: ["Hosting & SSL included (12 months)", "1 round of small edits (\u2264 30min)", "No continuous redesigns"] },
    { label: "CHF 1,249", price: "1,249", features: ["Includes Essential", "1 automation (e.g., booking)"], href: "/en/choose-template?plan=essential1249", primary: true, info: ["Hosting & SSL included (12 months)", "1 round of small edits (\u2264 30min)", "No continuous redesigns"] },
    { label: "CHF 1,500", price: "1,500", features: ["Includes Essential", "2\u20133 automations"], href: "/en/choose-template?plan=essential1500", info: ["Hosting & SSL included (12 months)", "1 round of small edits (\u2264 30min)", "No continuous redesigns"] }
  ], "footnote": "First\u2011year hosting & SSL included. Technical assistance included. Content/design changes billed separately." })} ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-advanced-en", "triggerText": "", "title": "Advanced pack", "subtitle": "Template + small backend (3\u20135k) or bespoke (10k+)", "ctaText": "Choose", "tiers": [
    { label: "Up to 5,000 CHF", price: "from 3,000", features: ["Template + light backend (e.g., headless shop)", "1\u20132 automations"], href: "/en/contact?plan=advanced_5k#form" },
    { label: "Bespoke", price: "10,000 CHF+", features: ["Custom project", "Scope + quote"], href: "/en/contact?plan=bespoke_10k_plus#form", primary: true },
    { label: "Consulting", price: "on request", features: ["Scoping workshop", "Architecture & strategy"], href: "/en/contact?plan=consulting#form" }
  ], "footnote": "High\u2011traffic usage billed per use. No server included." })} ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-care-en", "triggerText": "", "title": "Care plans (hosting & security)", "subtitle": "Swiss hosting + security patches", "ctaText": "Choose", "tiers": [
    { label: "Care 79", price: "CHF 79/mo", features: ["Hosting & SSL", "Security updates"], href: "/api/payment/redirect?plan=care79" },
    { label: "Care 149", price: "CHF 149/mo", features: ["Includes Care 79", "Priority support (light)"], href: "/api/payment/redirect?plan=care149", primary: true },
    { label: "Care 249", price: "CHF 249/mo", features: ["Includes Care 149", "Extended support & minor changes"], href: "/api/payment/redirect?plan=care249" }
  ] })} </div> </div> ${renderComponent($$result2, "Features3", $$Features3, { "title": "What our offers can include", "subtitle": "Depending on plan and needs.", "columns": 2, "items": [
    {
      title: "Human support",
      description: "Email and phone assistance, responses within one business day.",
      icon: "tabler:headset"
    },
    {
      title: "Swiss hosting included",
      description: "Servers in Switzerland with SSL included for the first 12 months.",
      icon: "tabler:server"
    },
    {
      title: "Simple process",
      description: "Email-based exchanges and step approvals (no client portal).",
      icon: "tabler:layout-dashboard"
    },
    {
      title: "Clear billing",
      description: "VAT included, QR invoice or Twint, monthly payments available.",
      icon: "tabler:receipt"
    },
    {
      title: "Optimised performance",
      description: "Astro architecture and image optimisation for fast loading.",
      icon: "tabler:gauge"
    },
    {
      title: "Enhanced security",
      description: "Initial backups, application firewall and regular updates.",
      icon: "tabler:lock"
    }
  ], "classes": { container: "max-w-5xl" } })} ${renderComponent($$result2, "Steps", $$Steps, { "title": "How your project unfolds", "tagline": "Journey", "isReversed": true, "items": [
    {
      title: "1. Digital signature",
      description: "Confirm your pack and receive onboarding access.",
      icon: "tabler:edit"
    },
    {
      title: "2. Smart questionnaire",
      description: "Share key information, upload visuals and pick your modules.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "3. Supervised production",
      description: "Our platform generates your site while experts fine-tune and review.",
      icon: "tabler:robot"
    },
    {
      title: "4. Approval & training",
      description: "Receive your ready-to-use site, video guide and next steps recap.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Process</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Simple journey: brief, content integration and approvals by email.
</p> </div> ` })}` })} ${renderComponent($$result2, "FAQs", $$FAQs, { "title": "Pricing questions", "subtitle": "We believe in total transparency.", "items": [
    {
      title: "Is VAT included?",
      description: "Yes, all amounts include VAT. The invoice shows Swiss VAT and IDE number."
    },
    {
      title: "What is the average timeline for the Essential pack?",
      description: "Around five business days after we receive your content. We share a detailed schedule during the brief."
    },
    {
      title: "How do you bill integrations?",
      description: "Simple integrations are included. API connections and advanced scenarios are quoted."
    },
    {
      title: "Is the care plan mandatory?",
      description: "No. Care from CHF 79/month with a 30-day notice to cancel."
    },
    {
      title: "Which payment methods do you accept?",
      description: "Swiss cards, Twint, bank transfer and QR billing. Subscriptions can be paid monthly or annually."
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Get a proposal",
      href: "/en/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "Compare packs",
      href: "/en/services"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
We adapt each offer to the specifics of your business in the Léman Arc.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Need a tailored quote?
` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/pricing.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/pricing.astro";
const $$url = "/en/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
