import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_BwlJ74mX.mjs';
import { $ as $$Features3 } from '../chunks/Features3_D14xZ8uE.mjs';
import { $ as $$Hero } from '../chunks/Hero_BWPUH0FD.mjs';
import { $ as $$Stats } from '../chunks/Stats_DCUffHu6.mjs';
import { $ as $$Steps2 } from '../chunks/Steps2_DT6ybMv8.mjs';
import { $ as $$PageLayout } from '../chunks/PageLayout_BqyLTlOK.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const metadata = {
    title: "\xC0 propos"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "tagline": "\xC0 propos de TonSiteWeb.ch" }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Arc Lémanique</p> <h4 class="mt-4 text-4xl font-semibold">Lausanne · Genève · Vevey · Montreux</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
Des spécialistes du digital, du contenu et de la performance web réunis autour d’un objectif&nbsp;: créer des sites irréprochables pour les acteurs locaux.
</p> </div> ` })}`, "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
TonSiteWeb.ch est née à Lausanne pour offrir aux PME et indépendants un site web haut de gamme, livré rapidement et sans
      sacrifier la précision ni l’accompagnement. Nous combinons une technologie propriétaire et des experts locaux pour garantir
      un résultat impeccable.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Une équipe lémanique qui marie automatisation et service humain
` })}` })}  ${renderComponent($$result2, "Stats", $$Stats, { "title": "Nos rep\xE8res", "stats": [
    { title: "Approche", amount: "Automatisation + humain" },
    { title: "Maintenance", amount: "d\xE8s 79 CHF/mois" }
  ] })}  ${renderComponent($$result2, "Features3", $$Features3, { "title": "Nos piliers", "subtitle": "Nous appliquons la rigueur suisse \xE0 chaque projet livr\xE9.", "columns": 3, "isBeforeContent": true, "items": [
    {
      title: "Automatisation ma\xEEtris\xE9e",
      description: "Nos pipelines propri\xE9taires orchestrent contenus, design et d\xE9ploiement pour acc\xE9l\xE9rer chaque projet sans sacrifier la qualit\xE9.",
      icon: "tabler:cpu"
    },
    {
      title: "Design minimaliste",
      description: "Inspir\xE9s par les codes helv\xE9tiques, nous misons sur des mises en page a\xE9r\xE9es, typographies nettes et contrastes pr\xE9cis.",
      icon: "tabler:layout-grid"
    },
    {
      title: "Relation de proximit\xE9",
      description: "Nos chefs de projet sont disponibles par t\xE9l\xE9phone ou WhatsApp pour un suivi attentif, m\xEAme apr\xE8s la mise en ligne.",
      icon: "tabler:users"
    }
  ] })}  ${renderComponent($$result2, "Features3", $$Features3, { "columns": 3, "isAfterContent": true, "items": [
    {
      title: "Tech suisse + mondiale",
      description: "Stack Astro, Tailwind et h\xE9bergement bas\xE9 en Suisse pour conjuguer souverainet\xE9 et performance internationale.",
      icon: "tabler:world"
    },
    {
      title: "Partenaires terrain",
      description: "R\xE9seau de photographes, r\xE9dacteurs et consultants bas\xE9s entre Gen\xE8ve et Montreux selon les besoins des projets.",
      icon: "tabler:briefcase"
    },
    {
      title: "Culture de la mesure",
      description: "Nous analysons l\u2019impact de chaque livraison et proposons des pistes d\u2019am\xE9lioration adapt\xE9es \xE0 votre activit\xE9.",
      icon: "tabler:chart-dots"
    },
    {
      title: "Support multilingue",
      description: "Nous r\xE9pondons en fran\xE7ais, anglais ou allemand selon la pr\xE9f\xE9rence de vos \xE9quipes.",
      icon: "tabler:language"
    },
    {
      title: "Respect du RGPD suisse/UE",
      description: "Documentation juridique fournie, consentements g\xE9r\xE9s et donn\xE9es h\xE9berg\xE9es sur territoire helv\xE9tique.",
      icon: "tabler:shield-lock"
    },
    {
      title: "Esprit durable",
      description: "S\xE9lection de partenaires responsables et optimisation des ressources pour r\xE9duire l\u2019empreinte carbone de chaque site.",
      icon: "tabler:leaf"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.3em] text-blue-200/80">Présence locale</p> <p class="mt-4 max-w-sm text-lg text-blue-100/90">
Nous opérons depuis Lausanne, Genève, Vevey et Montreux pour rester au plus proche des réalités terrain de nos clients.
</p> </div> ` })}` })}  ${renderComponent($$result2, "Steps2", $$Steps2, { "title": "Nos valeurs", "subtitle": "Nous croyons \xE0 une technologie qui sert le business local, avec transparence et fiabilit\xE9.", "items": [
    {
      title: "Pr\xE9cision",
      description: "Chaque ligne de contenu et chaque pixel sont v\xE9rifi\xE9s par un contr\xF4le qualit\xE9 humain avant mise en production."
    },
    {
      title: "Clart\xE9",
      description: "Des offres tout inclus, des factures suisses et des indicateurs partag\xE9s en temps r\xE9el avec nos clients."
    },
    {
      title: "Proximit\xE9",
      description: "Nous accompagnons nos clients sur la dur\xE9e avec un interlocuteur d\xE9di\xE9 et des points trimestriels offerts."
    }
  ] })}   ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/about.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
