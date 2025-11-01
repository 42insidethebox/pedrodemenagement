import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$PageLayout, a as footerDataEn, b as headerDataEn } from '../chunks/PageLayout_4vEQIg5R.mjs';
import { $ as $$Hero } from '../chunks/Hero_BP7I7sN2.mjs';
import { $ as $$Note, a as $$Features } from '../chunks/Features_ClArEs0i.mjs';
import { $ as $$Features2 } from '../chunks/Features2_DeFtIjNq.mjs';
import { $ as $$Steps, a as $$FAQs } from '../chunks/Steps_BQ6IAsXf.mjs';
import { $ as $$Content } from '../chunks/Content_CALXXvF4.mjs';
import { $ as $$Stats } from '../chunks/Stats_DlmrVVqd.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_BsQXy_i8.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://monwebsite.ch");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const metadata = {
    title: "MonWebsite.ch \u2014 Swiss turnkey sites for the L\xE9man Arc",
    ignoreTitleTemplate: true
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataEn, "footer": footerDataEn }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "id": "process", "actions": [
    {
      variant: "primary",
      text: "View plans",
      href: "/en/pricing",
      icon: "tabler:arrow-right"
    },
    { text: "Talk to an expert", href: "/en/contact#form" }
  ], "image": { src: "~/assets/images/hero-image.png", alt: "MonWebsite.ch interface" } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Swiss design, controlled performance. MonWebsite.ch blends automation and local expertise to deliver reliable showcase
      sites for SMEs and independents across the Léman Arc—without unrealistic promises or technical overload.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Your turnkey website, tailored to the Léman market
` })}` })} ${renderComponent($$result2, "Note", $$Note, { "title": "Commitment", "description": "Local service, human support and automated orchestration for a flawless result without extra effort." })} ${renderComponent($$result2, "Features", $$Features, { "id": "features", "tagline": "Why work with us", "title": "Swiss precision applied to digital", "subtitle": "Every project follows a clear framework: discovery, design, validation and guided go-live.", "items": [
    {
      title: "Managed timeline",
      description: "Briefing, design and launch are typically completed within five business days, depending on content and integrations.",
      icon: "tabler:calendar-time"
    },
    {
      title: "Premium bespoke design",
      description: "Inter/Montserrat typography, refined palettes and subtle animations for a high-end, cohesive visual identity.",
      icon: "tabler:sparkles"
    },
    {
      title: "Essential local SEO",
      description: "Structure, tags and copy tuned for Lausanne, Geneva, Montreux and neighbouring towns to showcase your local roots.",
      icon: "tabler:map-pin"
    },
    {
      title: "Optional care plan",
      description: "Security patches, backups and uptime checks available at CHF 79/month so your site stays up-to-date effortlessly.",
      icon: "tabler:shield-check"
    },
    {
      title: "Transparent Swiss billing",
      description: "Clear contracts, VAT included and CHF payments through the main Swiss methods.",
      icon: "tabler:receipt"
    },
    {
      title: "Local human support",
      description: "Experts based around the L\xE9man Arc answer within one business day by email or phone, with scheduled follow-up.",
      icon: "tabler:headset"
    }
  ] })} ${renderComponent($$result2, "Content", $$Content, { "isReversed": true, "tagline": "Process", "title": "A three-step orchestration", "items": [
    {
      title: "Structured brief",
      description: "A focused questionnaire gathers your services, hours, testimonials and visuals for our proprietary AI."
    },
    {
      title: "Design & integration",
      description: "Our designers adapt sections, fine-tune typography and integrate your content, media and calls to action."
    },
    {
      title: "Quality assurance",
      description: "Human proofreading, performance tests and GDPR checklist before the final approval and launch."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Your site delivered without stress</h3>
Three automated steps, validated by a local expert.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Controlled workflow</p> <h4 class="mt-4 text-3xl font-semibold">Brief → Creation → Launch</h4> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Each milestone is tracked in your client space with notifications, retro-planning and clear approvals.
</p> </div> ` })}` })} ${renderComponent($$result2, "Steps", $$Steps, { "title": "Our structured method", "tagline": "Client journey", "items": [
    {
      title: "Digital signature",
      description: "Choose your pack, sign electronically and receive client access to start the brief.",
      icon: "tabler:edit"
    },
    {
      title: "Guided onboarding",
      description: "Our assistant gathers key information and proposes a structure tailored to your industry.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "Supervised production",
      description: "Pipelines generate the site, integrate your content and alert our team for review.",
      icon: "tabler:robot"
    },
    {
      title: "Approval & launch",
      description: "You approve the final version, receive your video guide and schedule the go-live.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Timeline</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Typical delivery: five business days after we receive your content. We adjust the schedule to your priorities.
</p> </div> ` })}` })} ${renderComponent($$result2, "Content", $$Content, { "isAfterContent": true, "items": [
    {
      title: "Multilingual content",
      description: "French by default, with optional English or German versions quoted separately to support growth."
    },
    {
      title: "Optimised performance",
      description: "Astro architecture, fast Swiss hosting and image optimisation for quick mobile loading."
    },
    {
      title: "Essential integrations",
      description: "Contact form, booking flow or favourite tool connection via Zapier (from CHF 1,200)."
    },
    {
      title: "Express training",
      description: "A tailored 15-minute video guide so you can update your site independently."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate`An online presence reflecting your company’s precision.` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <h4 class="text-3xl font-semibold">Measured performance</h4> <ul class="mt-6 space-y-3 text-left text-blue-100/90"> <li>✓ Mobile-first design</li> <li>✓ Optimised loading times</li> <li>✓ Optional care plan at CHF 79/month</li> </ul> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "id": "included", "title": "Everything you need", "subtitle": "A turnkey solution for Romandie entrepreneurs", "tagline": "Included in every pack", "items": [
    {
      title: "Swiss hosting",
      description: "Servers based in Switzerland with SSL certificate and initial backups covered for 12 months.",
      icon: "tabler:server"
    },
    {
      title: "Professional email",
      description: "Email accounts @yourdomain.ch configured with the care plan (CHF 79/month).",
      icon: "tabler:mail"
    },
    {
      title: "Proximity SEO",
      description: "Structure, headings and meta descriptions oriented to the L\xE9man Arc so you appear locally.",
      icon: "tabler:map-pin"
    },
    {
      title: "Planned support",
      description: "Email and video assistance with replies within one business day for every request.",
      icon: "tabler:message"
    },
    {
      title: "Training & guides",
      description: "Recorded video session and simplified documentation for ongoing autonomy.",
      icon: "tabler:video"
    },
    {
      title: "Scalable modules",
      description: "Additional pages, automations or advanced forms available on demand.",
      icon: "tabler:puzzle"
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}` })} ${renderComponent($$result2, "Stats", $$Stats, { "title": "Clear benchmarks to decide", "stats": [
    { title: "Typical timeline", amount: "5 business days" },
    { title: "Showcase pack", amount: "CHF 999" },
    { title: "Care & security", amount: "CHF 79/mo" },
    { title: "Zapier automations", amount: "from CHF 1,200" }
  ] })} ${renderComponent($$result2, "FAQs", $$FAQs, { "id": "faq", "title": "Frequently asked questions", "subtitle": "Transparency on how we work.", "tagline": "FAQ", "classes": { container: "max-w-6xl" }, "items": [
    {
      title: "What is the delivery timeline?",
      description: "After receiving your content, we usually deliver the first version within five business days. Automation projects may take longer\u2014we share the schedule in the proposal."
    },
    {
      title: "Is copywriting included?",
      description: "Yes, we write or adapt your French copy with a local SEO focus. English or German versions are quoted separately."
    },
    {
      title: "What does the CHF 79/month care plan include?",
      description: "Security updates, regular backups, uptime monitoring and management of your professional email accounts."
    },
    {
      title: "Do you provide automations?",
      description: "Yes. A simple integration via Zapier or Make starts at CHF 1,200. Expect CHF 1,500 for three to four automations. We detail each flow in the proposal."
    },
    {
      title: "How does support work after launch?",
      description: "You get access to our client portal to submit tickets. Responses are provided within one business day via email or scheduled video sessions."
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Request a proposal",
      href: "/en/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "Explore pricing",
      href: "/en/pricing"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
We analyse your needs and outline a realistic action plan for your business across the Léman Arc.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`Ready to clarify your online presence?` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/index.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
