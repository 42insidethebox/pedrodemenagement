import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_BwlJ74mX.mjs';
import { $ as $$PageLayout } from '../chunks/PageLayout_BqyLTlOK.mjs';
import { $ as $$HeroText } from '../chunks/HeroText_ClQR8WMz.mjs';
import { $ as $$Pricing$1 } from '../chunks/Pricing_BoTyvBYR.mjs';
import { $ as $$PricingOptions } from '../chunks/PricingOptions_DemqZGFn.mjs';
import { $ as $$Steps, a as $$FAQs } from '../chunks/Steps_BjELtjt8.mjs';
import { $ as $$Features3 } from '../chunks/Features3_D14xZ8uE.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_CXdxRUaW.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pricing;
  const metadata = {
    title: "Tarifs"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Tarifs", "title": "Des offres transparentes, factur\xE9es en Suisse", "subtitle": "Chaque pack inclut la conception, la mise en ligne et un accompagnement humain. Maintenance et automatisations sont propos\xE9es selon vos besoins." })}  ${renderComponent($$result2, "Prices", $$Pricing$1, { "title": "Nos packs cl\xE9s-en-main", "subtitle": "Choisissez l\u2019offre qui correspond \xE0 votre besoin. Sans frais cach\xE9s.", "prices": [
    {
      title: "Essentiel",
      subtitle: "Site vitrine cl\xE9-en-main",
      price: 999,
      period: "d\xE8s \u2014 paiement unique",
      items: [
        {
          description: "Site vitrine 5 sections + page contact responsive"
        },
        {
          description: "Int\xE9gration et mise en forme de vos contenus"
        },
        {
          description: "Guide vid\xE9o et check\u2011list d\u2019autonomie"
        }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-essential">D\xE9couvrir</a>'
    },
    {
      title: "Avanc\xE9",
      subtitle: "Site + fonctionnalit\xE9s avanc\xE9es",
      price: 3e3,
      period: "d\xE8s \u2014 paiement unique",
      items: [
        { description: "Inclut tout le pack Essentiel" },
        { description: "Back\u2011end simple + template (jusqu\u2019\xE0 5\u202F000\u202FCHF)" },
        { description: "Projets sur\u2011mesure 10\u202F000\u202FCHF+ \u2014 parlons\u2011en" },
        { description: "Tests de bout en bout et documentation simple" }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-advanced">D\xE9couvrir</a>'
    },
    {
      title: "Maintenance s\xE9curit\xE9",
      subtitle: "Mises \xE0 jour et options selon niveau",
      price: 79,
      period: "d\xE8s / mois \u2014 sans surprise",
      items: [
        {
          description: "Mises \xE0 jour de s\xE9curit\xE9 et sauvegardes planifi\xE9es"
        },
        {
          description: "Surveillance de disponibilit\xE9 & correctifs prioritaires"
        },
        {
          description: "Emails pro & h\xE9bergement suisse \xE0 partir de 149\u2013249 CHF/mois"
        },
        {
          description: "Support email et visio sous un jour ouvr\xE9"
        }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-care">Choisir</a>'
    }
  ] })}  ${maybeRenderHead()}<div class="sr-only" aria-hidden="true"></div> <div class="mt-0 grid gap-0"> <div class="hidden" id="modals"></div> </div> <div class="mt-6 grid gap-4 max-w-7xl mx-auto px-4"> <div class="flex flex-wrap gap-4"> <div id="insert-essential"> ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-essential", "triggerText": "", "title": "Packs Essentiel", "subtitle": "Choisissez votre niveau d\u2019automatisation", "ctaText": "Choisir", "tiers": [
    {
      label: "CHF 999",
      price: "d\xE8s 999",
      features: ["Site statique", "Formulaire simple (email)"],
      href: "/choose-template?plan=essential999",
      info: ["H\xE9bergement & SSL inclus (12 mois)", "1 aller\u2011retour de petites retouches (\u2264 30\u202Fmin)", "Pas d\u2019\xE9volutions continues"]
    },
    {
      label: "CHF 1\u202F249",
      price: "1\u202F249",
      features: ["Inclut Essentiel", "1 automatisation (ex: prise de RDV)"],
      href: "/choose-template?plan=essential1249",
      primary: true,
      info: ["H\xE9bergement & SSL inclus (12 mois)", "1 aller\u2011retour de petites retouches (\u2264 30\u202Fmin)", "Pas d\u2019\xE9volutions continues"]
    },
    {
      label: "CHF 1\u202F500",
      price: "1\u202F500",
      features: ["Inclut Essentiel", "2\u20133 automatisations"],
      href: "/choose-template?plan=essential1500",
      info: ["H\xE9bergement & SSL inclus (12 mois)", "1 aller\u2011retour de petites retouches (\u2264 30\u202Fmin)", "Pas d\u2019\xE9volutions continues"]
    }
  ], "footnote": "H\xE9bergement & SSL inclus la 1\u02B3\u1D49 ann\xE9e. Assistance technique incluse. Modifications de contenu ou design factur\xE9es s\xE9par\xE9ment." })} </div> <div id="insert-advanced"> ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-advanced", "triggerText": "", "title": "Pack Avanc\xE9", "subtitle": "Template + petit back\u2011end (3\u20135\u202Fk) ou sur\u2011mesure (10\u202Fk+)", "ctaText": "Choisir", "tiers": [
    {
      label: "Jusqu\u2019\xE0 5\u202F000\u202FCHF",
      price: "d\xE8s 3\u202F000",
      features: ["Template + back\u2011end l\xE9ger (ex\xA0: headless shop)", "1\u20132 automatisations"],
      href: "/contact?plan=advanced_5k#form"
    },
    {
      label: "Sur\u2011mesure",
      price: "10\u202F000\u202FCHF+",
      features: ["Projet personnalis\xE9", "Cahier des charges & devis"],
      href: "/contact?plan=bespoke_10k_plus#form",
      primary: true
    },
    {
      label: "Conseil",
      price: "\xE0 d\xE9finir",
      features: ["Atelier cadrage", "Architecture & strat\xE9gie"],
      href: "/contact?plan=consulting#form"
    }
  ], "footnote": "Les demandes \xE0 fort trafic sont factur\xE9es \xE0 l\u2019usage. Aucun serveur inclus." })} </div> <div id="insert-care"> ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-care", "triggerText": "", "title": "Plans Care (h\xE9bergement & s\xE9curit\xE9)", "subtitle": "H\xE9bergement suisse + correctifs de s\xE9curit\xE9", "ctaText": "Choisir", "tiers": [
    {
      label: "Care 79",
      price: "CHF 79/mois",
      features: ["H\xE9bergement & SSL", "Mises \xE0 jour s\xE9curit\xE9"],
      href: "/api/payment/redirect?plan=care79"
    },
    {
      label: "Care 149",
      price: "CHF 149/mois",
      features: ["Inclut Care 79", "Support prioritaire l\xE9ger"],
      href: "/api/payment/redirect?plan=care149",
      primary: true
    },
    {
      label: "Care 249",
      price: "CHF 249/mois",
      features: ["Inclut Care 149", "Support \xE9tendu & \xE9volutions mineures"],
      href: "/api/payment/redirect?plan=care249"
    }
  ] })} </div> </div> </div>  ${renderComponent($$result2, "Features3", $$Features3, { "title": "Ce que peuvent inclure nos offres", "subtitle": "Selon le pack choisi et vos besoins.", "columns": 2, "items": [
    {
      title: "Support humain",
      description: "Accompagnement par email et t\xE9l\xE9phone, r\xE9ponses sous un jour ouvr\xE9.",
      icon: "tabler:headset"
    },
    {
      title: "Processus simple",
      description: "\xC9changes par email et validations par \xE9tapes (pas d\u2019espace client \xE0 g\xE9rer).",
      icon: "tabler:layout-dashboard"
    },
    {
      title: "Facturation claire",
      description: "TVA incluse, facture QR ou Twint, mensualisation disponible.",
      icon: "tabler:receipt"
    },
    {
      title: "Performance optimis\xE9e",
      description: "Architecture Astro et optimisation d\u2019images pour un chargement rapide.",
      icon: "tabler:gauge"
    },
    {
      title: "S\xE9curit\xE9 renforc\xE9e",
      description: "Sauvegardes initiales, pare-feu applicatif et mises \xE0 jour r\xE9guli\xE8res.",
      icon: "tabler:lock"
    }
  ], "classes": { container: "max-w-5xl" } })}  ${renderComponent($$result2, "Steps", $$Steps, { "title": "Comment se d\xE9roule votre projet", "tagline": "Parcours", "isReversed": true, "items": [
    {
      title: "1. Signature num\xE9rique",
      description: "Validez le pack choisi et recevez votre acc\xE8s onboarding.",
      icon: "tabler:edit"
    },
    {
      title: "2. Questionnaire intelligent",
      description: "Renseignez vos informations cl\xE9s, importez vos visuels et s\xE9lectionnez vos modules.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "3. Production supervis\xE9e",
      description: "Notre plateforme g\xE9n\xE8re votre site, nos experts ajustent et contr\xF4lent.",
      icon: "tabler:robot"
    },
    {
      title: "4. Validation & formation",
      description: "Recevez votre site pr\xEAt, le guide vid\xE9o et un r\xE9capitulatif de vos prochaines \xE9tapes.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Process</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Brief, intégration de vos contenus et validations par email.
</p> </div> ` })}` })}  ${renderComponent($$result2, "FAQs", $$FAQs, { "title": "Questions sur nos tarifs", "subtitle": "Nous croyons en une transparence totale.", "items": [
    {
      title: "Les prix incluent-ils la TVA ?",
      description: "Oui, tous les montants sont affich\xE9s TTC. La facture mentionne la TVA suisse et le num\xE9ro IDE."
    },
    {
      title: "Quel est le d\xE9lai moyen pour le pack Essentiel ?",
      description: "Comptez environ cinq jours ouvr\xE9s apr\xE8s r\xE9ception de vos contenus. Nous vous donnons un planning pr\xE9cis lors du brief."
    },
    {
      title: "Comment facturez-vous les int\xE9grations ?",
      description: "Les int\xE9grations simples sont incluses. Les connexions API et sc\xE9narios avanc\xE9s font l\u2019objet d\u2019un devis d\xE9di\xE9."
    },
    {
      title: "La maintenance est-elle obligatoire ?",
      description: "Non. Maintenance d\xE8s 79 CHF/mois, r\xE9siliable avec un pr\xE9avis de 30 jours."
    },
    {
      title: "Quels moyens de paiement acceptez-vous ?",
      description: "Cartes suisses, Twint, virement bancaire et facturation QR. Les abonnements peuvent \xEAtre pay\xE9s mensuellement ou annuellement."
    }
  ] })}  ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Recevoir une proposition",
      href: "/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "Comparer les packs",
      href: "/services"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Nous adaptons chaque offre aux spécificités de votre activité sur l’Arc lémanique.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Besoin d’un devis personnalisé ?
` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/pricing.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/pricing.astro";
const $$url = "/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
