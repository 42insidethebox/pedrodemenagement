import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_DpQ8NPFj.mjs';
import { $ as $$PageLayout } from '../chunks/PageLayout_C0BDAYgu.mjs';
import { $ as $$Hero } from '../chunks/Hero_BK_wwOAV.mjs';
import { $ as $$Note, a as $$Features } from '../chunks/Features_HJsowMuA.mjs';
import { $ as $$Features2 } from '../chunks/Features2_BhlDX8y5.mjs';
import { $ as $$Steps, a as $$FAQs } from '../chunks/Steps_DMVgCwK2.mjs';
import { $ as $$Content } from '../chunks/Content_Bw_VJdqS.mjs';
import { $ as $$Stats } from '../chunks/Stats_BS8Dp7Qj.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_BtHIYINw.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const metadata = {
    title: "TonSiteWeb.ch \u2014 Sites vitrines suisses pour l\u2019Arc l\xE9manique",
    ignoreTitleTemplate: true
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "id": "process", "actions": [
    {
      variant: "primary",
      text: "Voir les offres",
      href: "/pricing",
      icon: "tabler:arrow-right"
    },
    { text: "Parler \xE0 un expert", href: "/contact#form" }
  ], "image": { src: "~/assets/images/hero-image.png", alt: "Interface TonSiteWeb.ch" } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Design suisse, performance maîtrisée. TonSiteWeb.ch combine automatisation et expertise locale pour livrer des sites vitrines
      fiables aux PME et indépendants de l'Arc lémanique, sans promesse irréaliste ni surcharge technique.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Votre site clé-en-main, pensé pour le marché lémanique
` })}` })}  ${renderComponent($$result2, "Note", $$Note, { "title": "Engagement", "description": "Service local, support humain et orchestrations automatis\xE9es pour un r\xE9sultat impeccable sans effort." })} ${renderComponent($$result2, "Content", $$Content, { "isAfterContent": true, "items": [] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-3">Pourquoi pas Squarespace&nbsp;?</h3> <p class="text-base mb-3">Squarespace est excellent si vous aimez le design, avez des week‑ends libres et aimez comprendre par vous‑même.</p> <p class="text-base mb-4">Mais si vous voulez simplement votre entreprise en ligne — vite, fiable, avec un support suisse — on s’en charge pour vous.</p> <ul class="mt-2 space-y-2 text-left"> <li>✓ Hébergement inclus la première année</li> <li>✓ Facture et support suisses</li> <li>✓ Pas de DIY, pas de plugins, zéro stress</li> </ul> ` })}` })}  ${renderComponent($$result2, "Features", $$Features, { "id": "features", "tagline": "Pourquoi nous choisir", "title": "La pr\xE9cision suisse appliqu\xE9e au digital", "subtitle": "Chaque projet suit un cadre clair\xA0: collecte des informations, conception, validation et mise en ligne accompagn\xE9e.", "items": [
    {
      title: "D\xE9lai ma\xEEtris\xE9",
      description: "Brief, design et mise en ligne sont r\xE9alis\xE9s en moyenne sous cinq jours ouvr\xE9s, selon la complexit\xE9 de vos contenus et int\xE9grations.",
      icon: "tabler:calendar-time"
    },
    {
      title: "Design premium sur mesure",
      description: "Charte typographique Inter/Montserrat, palettes sobres et animations l\xE9g\xE8res pour un rendu haut de gamme et coh\xE9rent.",
      icon: "tabler:sparkles"
    },
    {
      title: "Balises de base",
      description: "Titres et m\xE9ta-descriptions de base pour un affichage propre sur les moteurs de recherche (sans prestation SEO).",
      icon: "tabler:map-pin"
    },
    {
      title: "H\xE9bergement inclus 1\u02B3\u1D49 ann\xE9e",
      description: "H\xE9bergement & SSL inclus pendant 12 mois. Ensuite, renouvellement h\xE9bergement + maintenance \xE0 150\xA0CHF/an (plan care mensuel en option).",
      icon: "tabler:server"
    },
    {
      title: "Facturation suisse transparente",
      description: "Contrats clairs, TVA incluse et paiement en francs suisses via les principaux moyens helv\xE9tiques.",
      icon: "tabler:receipt"
    },
    {
      title: "Support humain local",
      description: "Nos experts bas\xE9s sur l\u2019Arc l\xE9manique vous r\xE9pondent sous un jour ouvr\xE9 par email ou t\xE9l\xE9phone, avec suivi planifi\xE9.",
      icon: "tabler:headset"
    }
  ] })}  ${renderComponent($$result2, "Content", $$Content, { "isReversed": true, "tagline": "Processus", "title": "Une orchestration en 3 temps", "items": [
    {
      title: "Brief structur\xE9",
      description: "Un questionnaire cibl\xE9 collecte vos services, horaires, t\xE9moignages et visuels pour alimenter notre IA propri\xE9taire."
    },
    {
      title: "Design & int\xE9gration",
      description: "Nos designers adaptent les sections, calibrent la typographie et int\xE8grent vos contenus, m\xE9dias et appels \xE0 l\u2019action."
    },
    {
      title: "Contr\xF4le qualit\xE9",
      description: "Relecture humaine, tests de performance et checklist RGPD avant validation finale et mise en ligne."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Votre site prêt sans stress</h3>
Trois étapes automatisées, validées par un expert local.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Workflow maîtrisé</p> <h4 class="mt-4 text-3xl font-semibold">Brief → Création → Mise en ligne</h4> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Brief clair, intégration de vos contenus et validations par email.
</p> </div> ` })}` })}  ${renderComponent($$result2, "Steps", $$Steps, { "title": "Notre m\xE9thode encadr\xE9e", "tagline": "Parcours client", "items": [
    {
      title: "Signature en ligne",
      description: "Choisissez votre pack, signez \xE9lectroniquement et recevez votre acc\xE8s client pour lancer le brief.",
      icon: "tabler:edit"
    },
    {
      title: "Onboarding guid\xE9",
      description: "Notre assistant collecte vos informations cl\xE9s et propose une arborescence adapt\xE9e \xE0 votre m\xE9tier.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "Production supervis\xE9e",
      description: "Nos pipelines g\xE9n\xE8rent le site, int\xE8grent vos contenus et notifient notre \xE9quipe pour relecture.",
      icon: "tabler:robot"
    },
    {
      title: "Validation & lancement",
      description: "Vous validez la version finale, recevez votre guide vid\xE9o et programmez la mise en ligne selon vos besoins.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Timeline</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Délai typique&nbsp;: cinq jours ouvrés après réception des contenus. Nous ajustons le planning selon vos priorités.
</p> </div> ` })}` })}  ${renderComponent($$result2, "Content", $$Content, { "isAfterContent": true, "items": [
    {
      title: "Contenus multilingues",
      description: "Fran\xE7ais en standard, option anglaise ou allemande sur devis pour accompagner votre croissance r\xE9gionale."
    },
    {
      title: "Performance optimis\xE9e",
      description: "Architecture Astro, h\xE9bergement rapide en Suisse et optimisation d\u2019images pour charger vite sur mobile."
    },
    {
      title: "Fonctionnalit\xE9s essentielles",
      description: "Formulaire de contact et prise de rendez-vous. Pour les grands projets, int\xE9grations API possibles sur devis."
    },
    {
      title: "Formation express",
      description: "Un guide vid\xE9o personnalis\xE9 pour vous approprier votre site et publier en autonomie."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate`Une présence en ligne qui reflète la précision de votre entreprise.` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <h4 class="text-3xl font-semibold">Performances maîtrisées</h4> <ul class="mt-6 space-y-3 text-left text-blue-100/90"> <li>✓ Conception mobile-first</li> <li>✓ Temps de chargement optimisé</li> <li>✓ Hébergement inclus 12 mois</li> </ul> </div> ` })}` })}  ${renderComponent($$result2, "Features2", $$Features2, { "id": "included", "title": "Ce que peut inclure votre projet", "subtitle": "Selon le pack choisi et vos besoins", "tagline": "Exemples d\u2019options", "items": [
    {
      title: "Emails professionnels",
      description: "Comptes email @votredomaine.ch configur\xE9s lors de l\u2019option maintenance (79 CHF/mois).",
      icon: "tabler:mail"
    },
    {
      title: "Balises on\u2011page",
      description: "Titres et m\xE9ta\u2011descriptions de base.",
      icon: "tabler:map-pin"
    },
    {
      title: "Support planifi\xE9",
      description: "Accompagnement par email et visio, r\xE9ponses sous un jour ouvr\xE9 pour chaque demande.",
      icon: "tabler:message"
    },
    {
      title: "Formation & guide",
      description: "Session vid\xE9o enregistr\xE9e et documentation simplifi\xE9e pour rester autonome.",
      icon: "tabler:video"
    },
    {
      title: "Modules \xE9volutifs",
      description: "Ajout de pages ou formulaires avanc\xE9s sur devis d\xE9di\xE9.",
      icon: "tabler:puzzle"
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}` })}  ${renderComponent($$result2, "Stats", $$Stats, { "title": "Des rep\xE8res clairs pour d\xE9cider", "stats": [
    { title: "D\xE9lai typique", amount: "5 jours ouvr\xE9s" },
    { title: "Pack site vitrine", amount: "999 CHF" },
    { title: "Maintenance", amount: "d\xE8s 79 CHF/mois" },
    { title: "Int\xE9grations avanc\xE9es", amount: "sur devis" }
  ] })}  ${renderComponent($$result2, "FAQs", $$FAQs, { "id": "faq", "title": "Questions fr\xE9quentes", "subtitle": "Transparence totale sur notre fa\xE7on de travailler.", "tagline": "FAQ", "classes": { container: "max-w-6xl" }, "items": [
    {
      title: "Quel est le d\xE9lai de livraison ?",
      description: "Apr\xE8s r\xE9ception des contenus, nous livrons g\xE9n\xE9ralement la premi\xE8re version en cinq jours ouvr\xE9s. Les projets avec automatisations peuvent n\xE9cessiter davantage de temps, annonc\xE9 d\xE8s le devis."
    },
    {
      title: "Le contenu est-il inclus ?",
      description: "Oui, nous r\xE9digeons ou retravaillons vos textes en fran\xE7ais avec une optimisation locale de base. Les versions anglaise ou allemande sont propos\xE9es sur devis."
    },
    {
      title: "Quels sont les niveaux de maintenance ?",
      description: "Maintenance d\xE8s 79\xA0CHF/mois avec mises \xE0 jour et sauvegardes. Options additionnelles selon vos besoins."
    },
    {
      title: "Proposez-vous des int\xE9grations ?",
      description: "Oui. Les int\xE9grations simples (formulaire, rendez\u2011vous) sont incluses. Pour des connexions API ou workflows complexes, nous \xE9tablissons un devis d\xE9di\xE9."
    },
    {
      title: "Comment se d\xE9roule le support apr\xE8s la mise en ligne ?",
      description: "Vous disposez d\u2019un acc\xE8s \xE0 notre espace client pour ouvrir des tickets. Les r\xE9ponses sont apport\xE9es sous un jour ouvr\xE9 via email ou visio planifi\xE9e."
    }
  ] })}  ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Demander une proposition",
      href: "/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "D\xE9couvrir nos tarifs",
      href: "/pricing"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Nous analysons vos besoins et proposons un plan d’action réaliste pour votre activité dans la région avec TonSiteWeb.ch.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`Prêts à clarifier votre présence en ligne ?` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/index.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
