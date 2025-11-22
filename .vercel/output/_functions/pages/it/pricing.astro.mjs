import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$PageLayout, d as footerDataIt, e as headerDataIt } from '../../chunks/PageLayout_vzMlS6La.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_TIfZOsru.mjs';
import { $ as $$Pricing$1, a as $$PricingOptions } from '../../chunks/PricingOptions_1YTqeuGJ.mjs';
import { $ as $$Steps, a as $$FAQs } from '../../chunks/Steps_rf5ChemV.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_ksOyBffg.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_4wNwm0Bs.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pricing;
  const metadata = {
    title: "Prezzi"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataIt, "footer": footerDataIt }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Prezzi", "title": "Pacchetti trasparenti, fatturati in Svizzera", "subtitle": "Ogni pacchetto include design, messa online e supporto umano. Piano di cura e automazioni su misura." })} ${renderComponent($$result2, "Prices", $$Pricing$1, { "title": "I nostri pacchetti chiavi in mano", "subtitle": "Scegli la soluzione pi\xF9 adatta. Nessun costo nascosto.", "prices": [
    {
      title: "Essenziale",
      subtitle: "Sito vetrina chiavi in mano",
      price: 999,
      period: "da \u2014 pagamento unico",
      items: [
        {
          description: "Sito vetrina con 5 sezioni + pagina contatti responsive"
        },
        {
          description: "Copywriting in francese ottimizzato per l\u2019Arco lemanico"
        },
        {
          description: "Hosting svizzero & certificato SSL inclusi per 12 mesi"
        },
        {
          description: "Video training + checklist di autonomia"
        }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-essential-it">Scopri</a>'
    },
    {
      title: "Avanzato",
      subtitle: "Sito + funzionalit\xE0 avanzate",
      price: 3e3,
      period: "da \u2014 pagamento unico",
      items: [
        { description: "Include il pacchetto Essenziale" },
        { description: "Backend semplice + template (fino a 5\u2019000 CHF)" },
        { description: "Progetti su misura da 10\u2019000 CHF+ \u2014 parliamone" },
        { description: "Test end-to-end e documentazione concisa" }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-advanced-it">Scopri</a>'
    },
    {
      title: "Piano di cura",
      subtitle: "Aggiornamenti e email professionali",
      price: 79,
      period: "da / mese \u2014 senza sorprese",
      items: [
        {
          description: "Aggiornamenti di sicurezza e backup pianificati"
        },
        {
          description: "Monitoraggio uptime & interventi prioritari"
        },
        {
          description: "Gestione caselle @tuodominio.ch professionali"
        },
        {
          description: "Supporto email e video entro un giorno lavorativo"
        }
      ],
      callToAction: '<a class="btn btn-primary" href="#modal-care-it">Scegli</a>'
    }
  ] })} ${maybeRenderHead()}<div class="mt-6 grid gap-4 max-w-7xl mx-auto px-4"> <div class="flex flex-wrap gap-4"> ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-essential-it", "triggerText": "", "title": "Pacchetti Essenziale", "subtitle": "Scegli il livello di automazione", "ctaText": "Scegli", "tiers": [
    { label: "CHF 999", price: "da 999", features: ["Sito statico", "Form semplice (email)"], href: "/it/choose-template?plan=essential999", info: ["Hosting & SSL inclusi (3 mesi)", "1 giro di piccole modifiche (\u2264 30 min)", "Abbinabile a Care 79 (hosting & sicurezza)"] },
    { label: "CHF 1\u2019249", price: "1\u2019249", features: ["Include Essenziale", "1 automazione (es: prenotazione)"], href: "/it/choose-template?plan=essential1249", primary: true, info: ["Hosting & SSL inclusi (6 mesi)", "1 giro di piccole modifiche (\u2264 30 min)", "Abbinabile a Care 79 (hosting & sicurezza)"] },
    { label: "CHF 1\u2019500", price: "1\u2019500", features: ["Include Essenziale", "2\u20133 automazioni"], href: "/it/choose-template?plan=essential1500", info: ["Hosting & SSL inclusi (9 mesi)", "1 giro di piccole modifiche (\u2264 30 min)", "Abbinabile a Care 79 (hosting & sicurezza)"] }
  ], "footnote": "Hosting & SSL inclusi (3/6/9 mesi a seconda del pacchetto). Assistenza tecnica inclusa. Modifiche di contenuto o design fatturate a parte." })} ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-advanced-it", "triggerText": "", "title": "Pacchetto Avanzato", "subtitle": "Template + backend leggero (3\u20135k) o su misura (10k+)", "ctaText": "Scegli", "tiers": [
    { label: "Fino a 5\u2019000 CHF", price: "da 3\u2019000", features: ["Template + backend leggero (es: headless shop)", "1\u20132 automazioni"], href: "/it/contact?plan=advanced_5k#form" },
    { label: "Su misura", price: "10\u2019000 CHF+", features: ["Progetto personalizzato", "Scoping + preventivo"], href: "/it/contact?plan=bespoke_10k_plus#form", primary: true },
    { label: "Consulenza", price: "su richiesta", features: ["Workshop di scoping", "Architettura & strategia"], href: "/it/contact?plan=consulting#form" }
  ], "footnote": "Alto traffico fatturato a consumo. Nessun server incluso." })} ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-care-it", "triggerText": "", "title": "Piani Care (hosting & sicurezza)", "subtitle": "Hosting svizzero + patch di sicurezza", "ctaText": "Scegli", "tiers": [
    { label: "Care 79", price: "CHF 79/mese", features: ["Hosting & SSL", "Aggiornamenti di sicurezza"], href: "/api/payment/redirect?plan=care79" },
    { label: "Care 149", price: "CHF 149/mese", features: ["Include Care 79", "Supporto prioritario leggero"], href: "/api/payment/redirect?plan=care149", primary: true },
    { label: "Care 249", price: "CHF 249/mese", features: ["Include Care 149", "Supporto esteso & piccole modifiche"], href: "/api/payment/redirect?plan=care249" }
  ] })} </div> </div> ${renderComponent($$result2, "Features3", $$Features3, { "title": "Vantaggi inclusi", "subtitle": "Ogni offerta comprende queste garanzie.", "columns": 2, "items": [
    {
      title: "Supporto umano",
      description: "Assistenza via email e telefono, risposta entro un giorno lavorativo.",
      icon: "tabler:headset"
    },
    {
      title: "Hosting sovrano",
      description: "Server in Svizzera, conformi GDPR/LPD, con SSL incluso.",
      icon: "tabler:server"
    },
    {
      title: "Dashboard cliente",
      description: "Monitora avanzamento, condividi contenuti e approva le fasi online.",
      icon: "tabler:layout-dashboard"
    },
    {
      title: "Fatturazione chiara",
      description: "IVA inclusa, fattura QR o Twint, possibilit\xE0 di rate mensili.",
      icon: "tabler:receipt"
    },
    {
      title: "Performance ottimizzata",
      description: "Architettura Astro e immagini ottimizzate per caricamenti rapidi.",
      icon: "tabler:gauge"
    },
    {
      title: "Sicurezza potenziata",
      description: "Backup iniziali, firewall applicativo e aggiornamenti regolari.",
      icon: "tabler:lock"
    }
  ], "classes": { container: "max-w-5xl" } })} ${renderComponent($$result2, "Steps", $$Steps, { "title": "Come si svolge il progetto", "tagline": "Percorso", "isReversed": true, "items": [
    {
      title: "1. Firma digitale",
      description: "Conferma il pacchetto e ricevi l\u2019accesso onboarding.",
      icon: "tabler:edit"
    },
    {
      title: "2. Questionario smart",
      description: "Inserisci informazioni chiave, carica visual e scegli i moduli.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "3. Produzione supervisionata",
      description: "La piattaforma genera il sito, gli esperti rifiniscono e verificano.",
      icon: "tabler:robot"
    },
    {
      title: "4. Validazione & training",
      description: "Ricevi il sito pronto, la guida video e il riepilogo delle prossime azioni.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Processo</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Dalla firma al lancio, ogni fase è tracciata e documentata nel tuo spazio cliente.
</p> </div> ` })}` })} ${renderComponent($$result2, "FAQs", $$FAQs, { "title": "Domande sui prezzi", "subtitle": "Crediamo nella massima trasparenza.", "items": [
    {
      title: "L\u2019IVA \xE8 inclusa?",
      description: "S\xEC, tutti gli importi sono IVA inclusa. La fattura indica l\u2019IVA svizzera e il numero IDE."
    },
    {
      title: "Qual \xE8 la tempistica media per l\u2019Essenziale?",
      description: "Circa cinque giorni lavorativi dopo aver ricevuto i contenuti. Condividiamo il planning durante il brief."
    },
    {
      title: "Come fatturate le integrazioni?",
      description: "Le integrazioni semplici sono incluse. Connessioni API e scenari avanzati sono preventivati."
    },
    {
      title: "Il piano di cura \xE8 obbligatorio?",
      description: "No. Puoi gestire il sito in autonomia oppure affidarci il piano da CHF 79/mese, disdicibile con 30 giorni di preavviso."
    },
    {
      title: "Quali metodi di pagamento accettate?",
      description: "Carte svizzere, Twint, bonifico bancario e fattura QR. Gli abbonamenti possono essere mensili o annuali."
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Ricevi una proposta",
      href: "/it/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "Confronta i pacchetti",
      href: "/it/services"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Adattiamo ogni offerta alle specificità della tua attività nell’Arco lemanico.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Hai bisogno di un preventivo su misura?
` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/pricing.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/it/pricing.astro";
const $$url = "/it/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
