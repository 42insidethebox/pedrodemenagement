import { c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_D-qkxWc_.mjs';
import { $ as $$Content } from '../chunks/Content_CAcisoMG.mjs';
import { $ as $$Features2 } from '../chunks/Features2_CKSkF_sF.mjs';
import { $ as $$Hero } from '../chunks/Hero_D-NL8TYE.mjs';
import { $ as $$PageLayout } from '../chunks/PageLayout_DHKJQKmh.mjs';
export { renderers } from '../renderers.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Services"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "id": "services", "tagline": "Nos services", "title": "Des sites vitrines cl\xE9-en-main, pens\xE9s pour les PME romandes", "subtitle": "TonSiteWeb.ch combine automatisation et expertise humaine pour livrer des sites haut de gamme.", "actions": [{ variant: "primary", text: "Voir les packs", href: "/pricing" }] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Services automatisés</p> <h4 class="mt-4 text-4xl font-semibold">Design · Contenu · Maintenance</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
Une plateforme propriétaire qui orchestre la production pendant que nos experts se concentrent sur la qualité et la relation client.
</p> </div> ` })}` })}  ${renderComponent($$result2, "Features2", $$Features2, { "title": "Trois offres, une m\xEAme exigence", "subtitle": "Choisissez la formule qui correspond \xE0 votre rythme de croissance.", "columns": 3, "items": [
    {
      title: "Essentiel",
      description: "Site vitrine de 5 sections, int\xE9gration de vos contenus et mise en ligne accompagn\xE9e.",
      icon: "tabler:layout"
    },
    {
      title: "Automatisation",
      description: "Formulaires, prises de rendez\u2011vous et int\xE9grations API sur devis pour automatiser vos flux.",
      icon: "tabler:api"
    },
    {
      title: "Maintenance s\xE9curit\xE9",
      description: "Mises \xE0 jour techniques, sauvegardes, gestion d\u2019emails pro et support planifi\xE9 \xE0 79 CHF/mois.",
      icon: "tabler:shield-check"
    }
  ] })}  ${renderComponent($$result2, "Content", $$Content, { "id": "content", "isReversed": true, "items": [
    {
      title: "Production automatis\xE9e",
      description: "Notre pipeline assemble votre site en s\u2019appuyant sur des gabarits sectoriels que nous adaptons \xE0 votre identit\xE9.",
      icon: "tabler:cube"
    },
    {
      title: "Contr\xF4le humain",
      description: "Designers, r\xE9dacteurs et experts SEO valident chaque livrable pour garantir coh\xE9rence et conformit\xE9.",
      icon: "tabler:shield-check"
    },
    {
      title: "Livraison planifi\xE9e",
      description: "Nous partageons un r\xE9troplanning clair et adaptons la mise en ligne selon vos contraintes m\xE9tier.",
      icon: "tabler:inbox"
    },
    {
      title: "Suivi essentiel",
      description: "Points de contr\xF4le r\xE9guliers, assistance pour vos mises \xE0 jour et recommandations pragmatiques.",
      icon: "tabler:report-analytics"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Notre méthodologie hybride</h3>
Automatisation pour la vitesse, experts pour la qualité.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Pipeline supervisé</h4> <p class="mt-6 max-w-sm text-blue-100/90">
Chaque projet suit un contrôle humain complet&nbsp;: contenus, design, conformité RGPD et tests de navigation.
</p> </div> ` })}` })}  ${renderComponent($$result2, "Content", $$Content, { "id": "seo", "isAfterContent": true, "items": [
    {
      title: "Balises on\u2011page",
      description: "Titres et m\xE9ta\u2011descriptions de base.",
      icon: "tabler:map-pin"
    },
    {
      title: "Contenus visuels",
      description: "S\xE9lection de visuels libres de droits ou coordination avec vos prestataires locaux pour un rendu coh\xE9rent.",
      icon: "tabler:photo"
    },
    {
      title: "Campagnes d\u2019acquisition",
      description: "Landing pages, formulaires et sc\xE9narios email automatis\xE9s sur devis selon vos objectifs.",
      icon: "tabler:send"
    },
    {
      title: "Processus simple",
      description: "\xC9changes par email et validations par \xE9tapes. Pas d\u2019espace client \xE0 g\xE9rer.",
      icon: "tabler:layout-dashboard"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Des leviers pour durer</h3>
Nous activons les bons outils pour générer des résultats mesurables.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Acquisition maîtrisée</h4> <p class="mt-6 max-w-sm text-blue-100/90">
Nous vous aidons à prioriser les leviers efficaces et à mesurer les résultats réellement utiles à votre activité.
</p> </div> ` })}` })}  ${renderComponent($$result2, "Features2", $$Features2, { "id": "support", "title": "Support & maintenance", "subtitle": "Restez concentr\xE9s sur votre m\xE9tier, nous g\xE9rons le reste.", "columns": 3, "items": [
    {
      title: "Support planifi\xE9",
      description: "R\xE9ponses sous un jour ouvr\xE9 par email ou t\xE9l\xE9phone, suivi via votre espace client.",
      icon: "tabler:headset"
    },
    {
      title: "Surveillance essentielle",
      description: "V\xE9rifications r\xE9guli\xE8res des performances et alertes en cas de probl\xE8me d\xE9tect\xE9.",
      icon: "tabler:antenna"
    },
    {
      title: "Mises \xE0 jour s\xE9curit\xE9",
      description: "Application des correctifs critiques, sauvegardes et restauration si n\xE9cessaire.",
      icon: "tabler:tools"
    },
    {
      title: "Conformit\xE9 RGPD",
      description: "Politique de cookies, mentions l\xE9gales et banni\xE8re de consentement adapt\xE9es \xE0 la Suisse.",
      icon: "tabler:shield-check"
    },
    {
      title: "Gestion des emails",
      description: "Configuration et support de vos comptes @votredomaine.ch avec SPF/DKIM.",
      icon: "tabler:mail"
    },
    {
      title: "\xC9volutions sur devis",
      description: "Ajout de pages, modules ou automatisations suppl\xE9mentaires selon vos objectifs.",
      icon: "tabler:arrows-left-right"
    }
  ] })}  ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Planifier une d\xE9mo",
      href: "/contact#form",
      icon: "tabler:device-desktop-analytics"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Partagez vos objectifs; nous préparons un plan de lancement pragmatique avec TonSiteWeb.ch.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Discutons de votre prochaine mise en ligne
` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/services.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
