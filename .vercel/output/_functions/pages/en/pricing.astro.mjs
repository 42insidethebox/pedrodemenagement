import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$PageLayout, a as footerDataEn, b as headerDataEn } from '../../chunks/PageLayout_4vEQIg5R.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_o99nZMnb.mjs';
import { $ as $$Pricing$1 } from '../../chunks/Pricing_nHoC3SX5.mjs';
import { $ as $$Steps, a as $$FAQs } from '../../chunks/Steps_BQ6IAsXf.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_CQ7iOd8g.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_BsQXy_i8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://monwebsite.ch");
const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pricing;
  const metadata = {
    title: "Pricing"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataEn, "footer": footerDataEn }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Pricing", "title": "Transparent packages, billed in Switzerland", "subtitle": "Every pack includes design, launch and human support. Care and automations are added as needed." })} ${renderComponent($$result2, "Prices", $$Pricing$1, { "title": "Our turnkey packs", "subtitle": "Choose the offer that fits your needs. No hidden fees.", "prices": [
    {
      title: "Essential",
      subtitle: "Turnkey showcase site",
      price: 999,
      period: "CHF \u2014 one-time",
      items: [
        {
          description: "Showcase site with 5 sections + responsive contact page"
        },
        {
          description: "French copywriting optimised for the L\xE9man Arc"
        },
        {
          description: "Swiss hosting & SSL certificate included for 12 months"
        },
        {
          description: "Video training + autonomy checklist"
        }
      ],
      callToAction: {
        text: "Start my project",
        href: "/en/contact#form"
      }
    },
    {
      title: "Automation",
      subtitle: "Site + 1 Zapier/Make flow",
      price: 1200,
      period: "CHF \u2014 one-time",
      items: [
        {
          description: "Includes the Essential pack"
        },
        {
          description: "Connection to one tool via Zapier or Make (1 automation)"
        },
        {
          description: "End-to-end testing and simple documentation"
        },
        {
          description: "Up to 4 automations: CHF 1,500"
        }
      ],
      callToAction: {
        text: "Request an automation quote",
        href: "/en/contact#form"
      },
      hasRibbon: true,
      ribbonTitle: "Most popular"
    },
    {
      title: "Care & security",
      subtitle: "Updates and pro email",
      price: 79,
      period: "CHF / month \u2014 no surprises",
      items: [
        {
          description: "Security updates and scheduled backups"
        },
        {
          description: "Uptime monitoring & priority fixes"
        },
        {
          description: "Management of @yourdomain.ch professional emails"
        },
        {
          description: "Email & video support within one business day"
        }
      ],
      callToAction: {
        text: "Activate care plan",
        href: "/en/contact#form"
      }
    }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "title": "Included benefits", "subtitle": "All our offers come with these guarantees.", "columns": 2, "items": [
    {
      title: "Human support",
      description: "Email and phone assistance, responses within one business day.",
      icon: "tabler:headset"
    },
    {
      title: "Sovereign hosting",
      description: "Servers located in Switzerland, GDPR/LPD compliant with SSL certificate included.",
      icon: "tabler:server"
    },
    {
      title: "Client dashboard",
      description: "Track progress, share content and approve each step online.",
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
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Process</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
From signature to launch, every milestone is timestamped and documented in your client space.
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
      title: "How do you bill extra automations?",
      description: "Each additional flow is quoted upfront. Three to four standard automations are CHF 1,500."
    },
    {
      title: "Is the care plan mandatory?",
      description: "No. You can manage the site yourself or entrust us with the CHF 79/month plan, cancellable with 30 days notice."
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
