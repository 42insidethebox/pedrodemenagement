import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$PageLayout, d as footerDataIt, e as headerDataIt } from '../chunks/PageLayout_Dv6PWVVn.mjs';
import { $ as $$Hero } from '../chunks/Hero_Dd0RL5IT.mjs';
import { $ as $$Note, a as $$Features } from '../chunks/Features_C0BWhUsK.mjs';
import { $ as $$Features2 } from '../chunks/Features2_CXSUoGFH.mjs';
import { $ as $$Steps, a as $$FAQs } from '../chunks/Steps_U4hm8CwK.mjs';
import { $ as $$Content } from '../chunks/Content_BPmtK-Jy.mjs';
import { $ as $$Stats } from '../chunks/Stats_CFJE7zOr.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_DhJAECSa.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const metadata = {
    title: "TonSiteWeb.ch \u2014 Siti svizzeri chiavi in mano per l\u2019Arco lemanico",
    ignoreTitleTemplate: true
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataIt, "footer": footerDataIt }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "id": "process", "actions": [
    {
      variant: "primary",
      text: "Vedi le offerte",
      href: "/it/pricing",
      icon: "tabler:arrow-right"
    },
    { text: "Parla con un esperto", href: "/it/contact#form" }
  ], "image": { src: "~/assets/images/hero-image.png", alt: "Interfaccia TonSiteWeb.ch" } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Design svizzero, performance controllata. TonSiteWeb.ch combina automazione ed esperienza locale per consegnare siti
      affidabili a PMI e indipendenti dell’Arco lemanico, senza promesse irrealistiche né complessità tecnica.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Il tuo sito chiavi in mano pensato per il mercato lemanico
` })}` })} ${renderComponent($$result2, "Note", $$Note, { "title": "Impegno", "description": "Servizio locale, supporto umano e orchestrazione automatizzata per un risultato impeccabile senza sforzo." })} ${renderComponent($$result2, "Features", $$Features, { "id": "features", "tagline": "Perch\xE9 sceglierci", "title": "Precisione svizzera applicata al digitale", "subtitle": "Ogni progetto segue un quadro chiaro: raccolta dati, design, validazione e messa online guidata.", "items": [
    {
      title: "Tempistiche controllate",
      description: "Briefing, design e pubblicazione sono completati in media in cinque giorni lavorativi, in base a contenuti e integrazioni.",
      icon: "tabler:calendar-time"
    },
    {
      title: "Design premium su misura",
      description: "Tipografia Inter/Montserrat, palette sobrie e animazioni leggere per un\u2019identit\xE0 elegante e coerente.",
      icon: "tabler:sparkles"
    },
    {
      title: "SEO locale essenziale",
      description: "Struttura, tag e testi ottimizzati per Losanna, Ginevra, Montreux e comuni vicini per valorizzare la tua presenza locale.",
      icon: "tabler:map-pin"
    },
    {
      title: "Hosting incluso il 1\xBA anno",
      description: "Hosting & SSL inclusi per 12 mesi. Poi rinnovo hosting + manutenzione a CHF 150/anno (piano mensile opzionale disponibile).",
      icon: "tabler:server"
    },
    {
      title: "Fatturazione svizzera trasparente",
      description: "Contratti chiari, IVA inclusa e pagamenti in CHF con i principali metodi elvetici.",
      icon: "tabler:receipt"
    },
    {
      title: "Supporto umano locale",
      description: "Esperti basati nell\u2019Arco lemanico rispondono entro un giorno lavorativo via email o telefono, con follow-up pianificato.",
      icon: "tabler:headset"
    }
  ] })} ${renderComponent($$result2, "Content", $$Content, { "isReversed": true, "tagline": "Processo", "title": "Un\u2019orchestrazione in tre fasi", "items": [
    {
      title: "Brief strutturato",
      description: "Un questionario mirato raccoglie servizi, orari, testimonianze e visual per la nostra IA proprietaria."
    },
    {
      title: "Design & integrazione",
      description: "I designer adattano le sezioni, calibrano la tipografia e integrano contenuti, media e call to action."
    },
    {
      title: "Quality assurance",
      description: "Revisione umana, test di performance e checklist GDPR prima della validazione finale e messa online."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Il tuo sito senza stress</h3>
Tre step automatizzati, validati da un esperto locale.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Workflow controllato</p> <h4 class="mt-4 text-3xl font-semibold">Brief → Creazione → Lancio</h4> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Ogni fase è tracciata nel tuo spazio cliente con notifiche, retroplanning e approvazioni chiare.
</p> </div> ` })}` })} ${renderComponent($$result2, "Steps", $$Steps, { "title": "Il nostro metodo strutturato", "tagline": "Percorso cliente", "items": [
    {
      title: "Firma digitale",
      description: "Scegli il pacchetto, firma online e ricevi l\u2019accesso cliente per avviare il brief.",
      icon: "tabler:edit"
    },
    {
      title: "Onboarding guidato",
      description: "Il nostro assistente raccoglie le informazioni chiave e propone una struttura adatta al tuo settore.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "Produzione supervisionata",
      description: "Le pipeline generano il sito, integrano i contenuti e avvisano il team per la revisione.",
      icon: "tabler:robot"
    },
    {
      title: "Validazione & lancio",
      description: "Approvi la versione finale, ricevi la guida video e programmi la messa online.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Timeline</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Consegna tipica: cinque giorni lavorativi dopo aver ricevuto i contenuti. Adeguiamo la pianificazione alle tue priorità.
</p> </div> ` })}` })} ${renderComponent($$result2, "Content", $$Content, { "isAfterContent": true, "items": [
    {
      title: "Contenuti multilingue",
      description: "Francese incluso, versione inglese o tedesca su richiesta per accompagnare la crescita."
    },
    {
      title: "Performance ottimizzata",
      description: "Architettura Astro, hosting svizzero rapido e ottimizzazione immagini per velocit\xE0 mobile."
    },
    {
      title: "Integrazioni essenziali",
      description: "Modulo contatto, prenotazioni o connessione al tuo strumento via Zapier (da CHF 1\u2019200)."
    },
    {
      title: "Formazione express",
      description: "Video personalizzato di 15 minuti per gestire il sito in autonomia."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate`Una presenza online che riflette la precisione della tua azienda.` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <h4 class="text-3xl font-semibold">Performance misurata</h4> <ul class="mt-6 space-y-3 text-left text-blue-100/90"> <li>✓ Design mobile-first</li> <li>✓ Tempi di caricamento ottimizzati</li> <li>✓ Hosting incluso per il primo anno</li> </ul> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "id": "included", "title": "Tutto incluso", "subtitle": "Una soluzione chiavi in mano per gli imprenditori romandi", "tagline": "Compreso in ogni pacchetto", "items": [
    {
      title: "Hosting in Svizzera",
      description: "Server in Svizzera con certificato SSL e backup iniziali coperti per 12 mesi.",
      icon: "tabler:server"
    },
    {
      title: "Email professionali",
      description: "Caselle @tuodominio.ch configurate con il piano di cura (CHF 79/mese).",
      icon: "tabler:mail"
    },
    {
      title: "SEO di prossimit\xE0",
      description: "Struttura, titoli e meta description orientati all\u2019Arco lemanico per essere trovati localmente.",
      icon: "tabler:map-pin"
    },
    {
      title: "Supporto pianificato",
      description: "Assistenza via email e video con risposta entro un giorno lavorativo.",
      icon: "tabler:message"
    },
    {
      title: "Formazione & guide",
      description: "Sessione video registrata e documentazione semplificata per restare autonomi.",
      icon: "tabler:video"
    },
    {
      title: "Moduli scalabili",
      description: "Pagine aggiuntive, automazioni o form avanzati su richiesta.",
      icon: "tabler:puzzle"
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}` })} ${renderComponent($$result2, "Stats", $$Stats, { "title": "Riferimenti chiari per decidere", "stats": [
    { title: "Timeline tipica", amount: "5 giorni lavorativi" },
    { title: "Pacchetto vetrina", amount: "CHF 999" },
    { title: "Piano di cura", amount: "CHF 79/mese" },
    { title: "Automazioni Zapier", amount: "da CHF 1\u2019200" }
  ] })} ${renderComponent($$result2, "FAQs", $$FAQs, { "id": "faq", "title": "Domande frequenti", "subtitle": "Massima trasparenza sul nostro modo di lavorare.", "tagline": "FAQ", "classes": { container: "max-w-6xl" }, "items": [
    {
      title: "Quali sono i tempi di consegna?",
      description: "Dopo aver ricevuto i contenuti consegniamo la prima versione in circa cinque giorni lavorativi. Le automazioni possono richiedere pi\xF9 tempo: lo indichiamo nel preventivo."
    },
    {
      title: "I testi sono inclusi?",
      description: "S\xEC, scriviamo o adattiamo i testi in francese. Versioni inglese o tedesca sono quotate a parte."
    },
    {
      title: "Cosa include il piano di cura?",
      description: "Piano da CHF 79/mese con aggiornamenti di sicurezza, backup regolari e monitoraggio uptime. Opzioni aggiuntive su richiesta."
    },
    {
      title: "Offrite integrazioni?",
      description: "S\xEC. Integrazioni semplici (form, prenotazioni) incluse. Connessioni API o workflow avanzati su preventivo."
    },
    {
      title: "Come funziona il supporto dopo il lancio?",
      description: "Supporto via e\u2011mail o video pianificata, risposta entro un giorno lavorativo."
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Richiedi una proposta",
      href: "/it/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "Scopri i prezzi",
      href: "/it/pricing"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Analizziamo le esigenze e definiamo un piano d’azione realistico per la tua attività nell’Arco lemanico.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`Pronti a chiarire la vostra presenza online?` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/index.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/index.astro";
const $$url = "/it";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
