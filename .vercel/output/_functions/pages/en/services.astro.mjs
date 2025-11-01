import { c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_BsQXy_i8.mjs';
import { $ as $$Content } from '../../chunks/Content_CALXXvF4.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_DeFtIjNq.mjs';
import { $ as $$Hero } from '../../chunks/Hero_BP7I7sN2.mjs';
import { $ as $$PageLayout, a as footerDataEn, b as headerDataEn } from '../../chunks/PageLayout_4vEQIg5R.mjs';
export { renderers } from '../../renderers.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Services"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataEn, "footer": footerDataEn }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "id": "services", "tagline": "Our services", "title": "Turnkey showcase sites for Romandie SMEs", "subtitle": "MonWebsite.ch blends automation and human expertise to deliver high-end websites with ongoing care.", "actions": [{ variant: "primary", text: "See pricing", href: "/en/pricing" }] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Automated services</p> <h4 class="mt-4 text-4xl font-semibold">Design · Content · Care</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
A proprietary platform orchestrates production while our experts focus on quality and client relationships.
</p> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Three offers, one standard", "subtitle": "Pick the formula that matches your growth pace.", "columns": 3, "items": [
    {
      title: "Essential",
      description: "Five-section showcase site, copy tuned for the L\xE9man Arc and guided launch.",
      icon: "tabler:layout"
    },
    {
      title: "Automation",
      description: "Connect to your tools via Zapier or Make to automate forms, bookings and notifications.",
      icon: "tabler:api"
    },
    {
      title: "Care & security",
      description: "Technical updates, backups, pro email management and planned support at CHF 79/month.",
      icon: "tabler:shield-check"
    }
  ] })} ${renderComponent($$result2, "Content", $$Content, { "id": "content", "isReversed": true, "items": [
    {
      title: "Automated production",
      description: "Our pipeline assembles your site using industry templates that we tailor to your identity.",
      icon: "tabler:cube"
    },
    {
      title: "Human control",
      description: "Designers, writers and SEO specialists review each deliverable to ensure coherence and compliance.",
      icon: "tabler:shield-check"
    },
    {
      title: "Planned delivery",
      description: "We share a clear retro-planning and adapt launch timing to your business constraints.",
      icon: "tabler:inbox"
    },
    {
      title: "Essential follow-up",
      description: "Regular checkpoints, assistance with updates and pragmatic recommendations.",
      icon: "tabler:report-analytics"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Our hybrid methodology</h3>
Automation for speed, experts for quality.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Supervised pipeline</h4> <p class="mt-6 max-w-sm text-blue-100/90">
Every project goes through full human checks: content, design, GDPR compliance and navigation tests.
</p> </div> ` })}` })} ${renderComponent($$result2, "Content", $$Content, { "id": "seo", "isAfterContent": true, "items": [
    {
      title: "Local SEO & Google profiles",
      description: "Technical optimisation, metadata writing and guidance for your Google Business Profile.",
      icon: "tabler:map-pin"
    },
    {
      title: "Visual content",
      description: "Curated royalty-free visuals or coordination with your local providers for consistent imagery.",
      icon: "tabler:photo"
    },
    {
      title: "Acquisition campaigns",
      description: "Landing pages, forms and automated email scenarios quoted according to your goals.",
      icon: "tabler:send"
    },
    {
      title: "Client dashboard",
      description: "Access a client area to track deliverables, share content and approve steps.",
      icon: "tabler:layout-dashboard"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Levers built to last</h3>
We activate the right tools to deliver measurable outcomes.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Controlled acquisition</h4> <p class="mt-6 max-w-sm text-blue-100/90">
We help you prioritise effective channels and measure what truly matters to your activity.
</p> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "id": "support", "title": "Support & care", "subtitle": "Focus on your business\u2014we handle the rest.", "columns": 3, "items": [
    {
      title: "Planned support",
      description: "Replies within one business day by email or phone, tracked via your client area.",
      icon: "tabler:headset"
    },
    {
      title: "Essential monitoring",
      description: "Regular performance checks and alerts whenever an issue is detected.",
      icon: "tabler:antenna"
    },
    {
      title: "Security updates",
      description: "Critical patches, backups and restoration whenever needed.",
      icon: "tabler:tools"
    },
    {
      title: "GDPR compliance",
      description: "Cookie policy, legal mentions and consent banner tailored to Switzerland.",
      icon: "tabler:shield-check"
    },
    {
      title: "Email management",
      description: "Setup and support for your @yourdomain.ch accounts with SPF/DKIM.",
      icon: "tabler:mail"
    },
    {
      title: "Enhancements on demand",
      description: "Additional pages, modules or automations quoted to match your objectives.",
      icon: "tabler:arrows-left-right"
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Schedule a demo",
      href: "/en/contact#form",
      icon: "tabler:device-desktop-analytics"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Share your goals and we’ll prepare a fully managed launch plan with MonWebsite.ch.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Let’s discuss your next launch
` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/services.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/services.astro";
const $$url = "/en/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
