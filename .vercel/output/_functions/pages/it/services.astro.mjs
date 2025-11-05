import { c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_BwlJ74mX.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_CXdxRUaW.mjs';
import { $ as $$Content } from '../../chunks/Content_BQN2exuf.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_AsFnuyxK.mjs';
import { $ as $$Hero } from '../../chunks/Hero_BWPUH0FD.mjs';
import { $ as $$PageLayout, e as footerDataIt, g as headerDataIt } from '../../chunks/PageLayout_BqyLTlOK.mjs';
export { renderers } from '../../renderers.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Servizi"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataIt, "footer": footerDataIt }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "id": "services", "tagline": "I nostri servizi", "title": "Siti vetrina chiavi in mano per le PMI romande", "subtitle": "TonSiteWeb.ch combina automazione ed esperienza umana per consegnare siti di alta qualit\xE0.", "actions": [{ variant: "primary", text: "Vedi i pacchetti", href: "/it/pricing" }] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Servizi automatizzati</p> <h4 class="mt-4 text-4xl font-semibold">Design · Contenuti · Cura</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
Una piattaforma proprietaria orchestra la produzione mentre i nostri esperti si concentrano su qualità e relazione cliente.
</p> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Tre offerte, un\u2019unica qualit\xE0", "subtitle": "Scegli la formula in linea con il tuo ritmo di crescita.", "columns": 3, "items": [
    {
      title: "Essenziale",
      description: "Sito vetrina di 5 sezioni, testi ottimizzati per l\u2019Arco lemanico e lancio guidato.",
      icon: "tabler:layout"
    },
    {
      title: "Automazione",
      description: "Collega i tuoi strumenti con Zapier o Make per automatizzare form, prenotazioni e notifiche.",
      icon: "tabler:api"
    },
    {
      title: "Piano di cura",
      description: "Aggiornamenti tecnici, backup, gestione email pro e supporto pianificato a CHF 79/mese.",
      icon: "tabler:shield-check"
    }
  ] })} ${renderComponent($$result2, "Content", $$Content, { "id": "content", "isReversed": true, "items": [
    {
      title: "Produzione automatizzata",
      description: "La pipeline costruisce il sito con template settoriali che personalizziamo sulla tua identit\xE0.",
      icon: "tabler:cube"
    },
    {
      title: "Controllo umano",
      description: "Designer, copywriter ed esperti SEO verificano ogni consegna per coerenza e conformit\xE0.",
      icon: "tabler:shield-check"
    },
    {
      title: "Consegna pianificata",
      description: "Condividiamo un retroplanning chiaro e adattiamo il lancio ai vincoli della tua attivit\xE0.",
      icon: "tabler:inbox"
    },
    {
      title: "Follow-up essenziale",
      description: "Check regolari, assistenza sugli aggiornamenti e raccomandazioni pragmatiche.",
      icon: "tabler:report-analytics"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">La nostra metodologia ibrida</h3>
Automazione per la velocità, esperti per la qualità.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Pipeline supervisionata</h4> <p class="mt-6 max-w-sm text-blue-100/90">
Ogni progetto passa da controlli manuali completi: contenuti, design, conformità GDPR e test di navigazione.
</p> </div> ` })}` })} ${renderComponent($$result2, "Content", $$Content, { "id": "seo", "isAfterContent": true, "items": [
    {
      title: "SEO locale & Google Business",
      description: "Ottimizzazione tecnica, meta tag e consulenza per la tua scheda Google Business Profile.",
      icon: "tabler:map-pin"
    },
    {
      title: "Contenuti visivi",
      description: "Selezione di visual royalty-free o coordinamento con i tuoi fornitori locali per un\u2019immagine coerente.",
      icon: "tabler:photo"
    },
    {
      title: "Campagne di acquisizione",
      description: "Landing page, form e scenari email automatizzati quotati in base agli obiettivi.",
      icon: "tabler:send"
    },
    {
      title: "Dashboard cliente",
      description: "Accedi a uno spazio cliente per seguire le consegne, condividere materiali e approvare le tappe.",
      icon: "tabler:layout-dashboard"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Leve per crescere nel tempo</h3>
Attiviamo gli strumenti giusti per risultati misurabili.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Acquisizione controllata</h4> <p class="mt-6 max-w-sm text-blue-100/90">
Ti aiutiamo a prioritizzare i canali efficaci e a misurare ciò che conta per la tua attività.
</p> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "id": "support", "title": "Supporto & manutenzione", "subtitle": "Tu ti concentri sul business, noi sul resto.", "columns": 3, "items": [
    {
      title: "Supporto pianificato",
      description: "Risposte entro un giorno lavorativo via email o telefono, tracciate nel tuo spazio cliente.",
      icon: "tabler:headset"
    },
    {
      title: "Monitoraggio essenziale",
      description: "Verifiche periodiche delle performance e alert in caso di problemi.",
      icon: "tabler:antenna"
    },
    {
      title: "Aggiornamenti sicurezza",
      description: "Patch critici, backup e ripristini quando necessario.",
      icon: "tabler:tools"
    },
    {
      title: "Conformit\xE0 GDPR",
      description: "Cookie policy, note legali e banner consenso adattati alla Svizzera.",
      icon: "tabler:shield-check"
    },
    {
      title: "Gestione email",
      description: "Configurazione e supporto per caselle @tuodominio.ch con SPF/DKIM.",
      icon: "tabler:mail"
    },
    {
      title: "Evoluzioni su richiesta",
      description: "Pagine, moduli o automazioni extra in base agli obiettivi.",
      icon: "tabler:arrows-left-right"
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Prenota una demo",
      href: "/it/contact#form",
      icon: "tabler:device-desktop-analytics"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Condividi gli obiettivi: prepariamo un piano di lancio pragmatico con TonSiteWeb.ch.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`Parliamo del tuo prossimo lancio` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/services.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/services.astro";
const $$url = "/it/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
