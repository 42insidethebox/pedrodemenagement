import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_BwlJ74mX.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_AsFnuyxK.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_D14xZ8uE.mjs';
import { $ as $$Hero } from '../../chunks/Hero_BWPUH0FD.mjs';
import { $ as $$Stats } from '../../chunks/Stats_DCUffHu6.mjs';
import { $ as $$Steps2 } from '../../chunks/Steps2_DT6ybMv8.mjs';
import { $ as $$PageLayout, c as footerDataEn, d as headerDataEn } from '../../chunks/PageLayout_BqyLTlOK.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const metadata = {
    title: "About"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataEn, "footer": footerDataEn }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "tagline": "About TonSiteWeb.ch" }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Léman Arc</p> <h4 class="mt-4 text-4xl font-semibold">Lausanne · Geneva · Vevey · Montreux</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
Digital, content and performance specialists united around one goal: building flawless sites for local businesses.
</p> </div> ` })}`, "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
TonSiteWeb.ch was born in Lausanne to give SMEs and independents a high-end website delivered quickly without compromising
      on accuracy or support. We combine proprietary technology with local experts to guarantee impeccable results.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
A Léman-based team mixing automation with human service
` })}` })} ${renderComponent($$result2, "Stats", $$Stats, { "title": "Our benchmarks", "stats": [
    { title: "Service area", amount: "L\xE9man Arc" },
    { title: "Approach", amount: "Automation + human" },
    { title: "Care plan", amount: "Optional CHF 79/mo" },
    { title: "Languages", amount: "FR \xB7 EN \xB7 DE" }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "title": "Our pillars", "subtitle": "We apply Swiss rigour to every project we deliver.", "columns": 3, "isBeforeContent": true, "items": [
    {
      title: "Managed automation",
      description: "Our proprietary pipelines orchestrate content, design and deployment to speed up each project without sacrificing quality.",
      icon: "tabler:cpu"
    },
    {
      title: "Minimalist design",
      description: "Inspired by Swiss codes, we focus on airy layouts, crisp typography and precise contrast.",
      icon: "tabler:layout-grid"
    },
    {
      title: "Close relationships",
      description: "Project leads remain available by phone or WhatsApp for attentive follow-up\u2014even after launch.",
      icon: "tabler:users"
    }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "columns": 3, "isAfterContent": true, "items": [
    {
      title: "Swiss + global tech",
      description: "Astro, Tailwind and Swiss-based hosting for both sovereignty and global performance.",
      icon: "tabler:world"
    },
    {
      title: "On-the-ground partners",
      description: "Photographers, copywriters and consultants located between Geneva and Montreux to match your needs.",
      icon: "tabler:briefcase"
    },
    {
      title: "Measurement culture",
      description: "We analyse the impact of every delivery and suggest improvements tailored to your activity.",
      icon: "tabler:chart-dots"
    },
    {
      title: "Multilingual support",
      description: "We answer in French, English or German depending on your team\u2019s preference.",
      icon: "tabler:language"
    },
    {
      title: "Swiss/EU GDPR compliance",
      description: "Legal documentation provided, consent managed and data hosted on Swiss territory.",
      icon: "tabler:shield-lock"
    },
    {
      title: "Sustainable mindset",
      description: "Responsible partners and resource optimisation to reduce each site\u2019s footprint.",
      icon: "tabler:leaf"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.3em] text-blue-200/80">Local presence</p> <p class="mt-4 max-w-sm text-lg text-blue-100/90">
We operate from Lausanne, Geneva, Vevey and Montreux to stay close to our clients’ field realities.
</p> </div> ` })}` })} ${renderComponent($$result2, "Steps2", $$Steps2, { "title": "Our values", "subtitle": "Technology serving local business\u2014with transparency and reliability.", "items": [
    {
      title: "Precision",
      description: "Every line of copy and every pixel is reviewed by a human quality check before production."
    },
    {
      title: "Clarity",
      description: "All-inclusive offers, Swiss invoices and real-time indicators shared with our clients."
    },
    {
      title: "Proximity",
      description: "Long-term support with a dedicated point of contact and quarterly touchpoints included."
    }
  ] })} ${renderComponent($$result2, "Steps2", $$Steps2, { "title": "Our story", "subtitle": "We are building a platform that delivers impeccable sites without compromising on support.", "isReversed": true, "callToAction": {
    text: "See our plans",
    href: "/en/pricing"
  }, "items": [
    {
      title: "2021 \u2014 Launch",
      description: "TonSiteWeb.ch is founded in Lausanne to simplify independents\u2019 online presence.",
      icon: "tabler:flag"
    },
    {
      title: "2022 \u2014 Industrialisation",
      description: "Roll-out of our automated pipelines and new hubs in Geneva and Vevey.",
      icon: "tabler:arrows-exchange"
    },
    {
      title: "2023 \u2014 Acceleration",
      description: "Launch of our multilingual offer and reinforced partnerships with local agencies.",
      icon: "tabler:rocket"
    }
  ] })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Where to meet us", "tagline": "Local presence", "columns": 4, "items": [
    {
      title: "Lausanne",
      description: "Flon district \u2014 meetings on demand"
    },
    {
      title: "Geneva",
      description: "Rue du Rh\xF4ne \u2014 partner showroom"
    },
    {
      title: "Vevey",
      description: "La Forge coworking \u2014 onboarding sessions"
    },
    {
      title: "Montreux",
      description: "Partner photo studios for your shoots"
    }
  ] })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/about.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/about.astro";
const $$url = "/en/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
