import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_Dp0aUUie.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_D40QzOgf.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_CTrUkgNe.mjs';
import { $ as $$Hero } from '../../chunks/Hero_DBbz5n4W.mjs';
import { $ as $$Stats } from '../../chunks/Stats_Bwbi_riw.mjs';
import { $ as $$Steps2 } from '../../chunks/Steps2_59wlkjyf.mjs';
import { $ as $$PageLayout, e as footerDataIt, g as headerDataIt } from '../../chunks/PageLayout_C1NlzRGT.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const metadata = {
    title: "Chi siamo"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataIt, "footer": footerDataIt }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "tagline": "Chi siamo" }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Arco lemanico</p> <h4 class="mt-4 text-4xl font-semibold">Losanna · Ginevra · Vevey · Montreux</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
Specialisti di digitale, contenuti e performance riuniti da un obiettivo comune: creare siti impeccabili per i player locali.
</p> </div> ` })}`, "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
TonSiteWeb.ch nasce a Losanna per offrire a PMI e indipendenti un sito di alto livello, consegnato rapidamente senza
      compromettere precisione e accompagnamento. Tecnologia proprietaria e specialisti locali per risultati impeccabili.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Un team lemanico che unisce automazione e servizio umano
` })}` })} ${renderComponent($$result2, "Stats", $$Stats, { "title": "I nostri riferimenti", "stats": [
    { title: "Area di intervento", amount: "Arco lemanico" },
    { title: "Approccio", amount: "Automazione + umano" },
    { title: "Piano di cura", amount: "Opzionale CHF 79/mese" },
    { title: "Lingue", amount: "FR \xB7 EN \xB7 DE" }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "title": "I nostri pilastri", "subtitle": "Applichiamo il rigore svizzero a ogni progetto.", "columns": 3, "isBeforeContent": true, "items": [
    {
      title: "Automazione controllata",
      description: "Pipeline proprietarie orchestrano contenuti, design e deploy per accelerare senza sacrificare la qualit\xE0.",
      icon: "tabler:cpu"
    },
    {
      title: "Design minimalista",
      description: "Ispirati al linguaggio elvetico, puntiamo su layout ariosi, tipografia nitida e contrasti precisi.",
      icon: "tabler:layout-grid"
    },
    {
      title: "Relazione di prossimit\xE0",
      description: "Project manager disponibili via telefono o WhatsApp per un follow-up attento anche dopo il lancio.",
      icon: "tabler:users"
    }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "columns": 3, "isAfterContent": true, "items": [
    {
      title: "Tecnologia svizzera + globale",
      description: "Astro, Tailwind e hosting svizzero per unire sovranit\xE0 e performance internazionale.",
      icon: "tabler:world"
    },
    {
      title: "Partner sul territorio",
      description: "Fotografi, copywriter e consulenti tra Ginevra e Montreux secondo le esigenze dei progetti.",
      icon: "tabler:briefcase"
    },
    {
      title: "Cultura della misura",
      description: "Analizziamo ogni rilascio e proponiamo miglioramenti mirati alla tua attivit\xE0.",
      icon: "tabler:chart-dots"
    },
    {
      title: "Supporto multilingue",
      description: "Rispondiamo in francese, inglese o tedesco secondo la preferenza del tuo team.",
      icon: "tabler:language"
    },
    {
      title: "Conformit\xE0 GDPR/LPD",
      description: "Documentazione legale fornita, consensi gestiti e dati ospitati in Svizzera.",
      icon: "tabler:shield-lock"
    },
    {
      title: "Spirito sostenibile",
      description: "Partner responsabili e ottimizzazione delle risorse per ridurre l\u2019impronta di ogni sito.",
      icon: "tabler:leaf"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.3em] text-blue-200/80">Presenza locale</p> <p class="mt-4 max-w-sm text-lg text-blue-100/90">
Operiamo da Losanna, Ginevra, Vevey e Montreux per restare vicini alle realtà dei nostri clienti.
</p> </div> ` })}` })} ${renderComponent($$result2, "Steps2", $$Steps2, { "title": "I nostri valori", "subtitle": "Tecnologia al servizio del business locale, con trasparenza e affidabilit\xE0.", "items": [
    {
      title: "Precisione",
      description: "Ogni testo e ogni pixel \xE8 verificato da un controllo qualit\xE0 umano prima della messa online."
    },
    {
      title: "Chiarezza",
      description: "Offerte all inclusive, fatture svizzere e indicatori condivisi in tempo reale con i clienti."
    },
    {
      title: "Prossimit\xE0",
      description: "Accompagnamento duraturo con referente dedicato e check-in trimestrali inclusi."
    }
  ] })} ${renderComponent($$result2, "Steps2", $$Steps2, { "title": "La nostra storia", "subtitle": "Costruiamo una piattaforma capace di consegnare siti impeccabili senza rinunciare al supporto.", "isReversed": true, "callToAction": {
    text: "Scopri i pacchetti",
    href: "/it/pricing"
  }, "items": [
    {
      title: "2021 \u2014 Lancio",
      description: "Nasce TonSiteWeb.ch a Losanna per semplificare la presenza web degli indipendenti.",
      icon: "tabler:flag"
    },
    {
      title: "2022 \u2014 Industrializzazione",
      description: "Implementazione delle pipeline automatizzate e apertura di hub a Ginevra e Vevey.",
      icon: "tabler:arrows-exchange"
    },
    {
      title: "2023 \u2014 Accelerazione",
      description: "Lancio dell\u2019offerta multilingue e partnership rafforzate con agenzie locali.",
      icon: "tabler:rocket"
    }
  ] })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Dove incontrarci", "tagline": "Presenza locale", "columns": 4, "items": [
    {
      title: "Losanna",
      description: "Quartiere Flon \u2014 incontri su richiesta"
    },
    {
      title: "Ginevra",
      description: "Rue du Rh\xF4ne \u2014 showroom partner"
    },
    {
      title: "Vevey",
      description: "Coworking La Forge \u2014 sessioni di onboarding"
    },
    {
      title: "Montreux",
      description: "Studi fotografici partner per i tuoi shooting"
    }
  ] })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/about.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/about.astro";
const $$url = "/it/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
