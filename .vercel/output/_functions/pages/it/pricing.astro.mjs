import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$PageLayout, c as footerDataIt, d as headerDataIt } from '../../chunks/PageLayout_4vEQIg5R.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_o99nZMnb.mjs';
import { $ as $$Pricing$1 } from '../../chunks/Pricing_nHoC3SX5.mjs';
import { $ as $$Steps, a as $$FAQs } from '../../chunks/Steps_BQ6IAsXf.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_CQ7iOd8g.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_BsQXy_i8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://monwebsite.ch");
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
      period: "CHF \u2014 pagamento unico",
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
      callToAction: {
        text: "Avvia il progetto",
        href: "/it/contact#form"
      }
    },
    {
      title: "Automazione",
      subtitle: "Sito + 1 flusso Zapier/Make",
      price: 1200,
      period: "CHF \u2014 pagamento unico",
      items: [
        {
          description: "Include il pacchetto Essenziale"
        },
        {
          description: "Connessione a uno strumento via Zapier o Make (1 automazione)"
        },
        {
          description: "Test end-to-end e documentazione semplice"
        },
        {
          description: "Fino a 4 automazioni: CHF 1\u2019500"
        }
      ],
      callToAction: {
        text: "Richiedi preventivo automazioni",
        href: "/it/contact#form"
      },
      hasRibbon: true,
      ribbonTitle: "Il pi\xF9 richiesto"
    },
    {
      title: "Piano di cura",
      subtitle: "Aggiornamenti e email professionali",
      price: 79,
      period: "CHF / mese \u2014 senza sorprese",
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
      callToAction: {
        text: "Attiva il piano",
        href: "/it/contact#form"
      }
    }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "title": "Vantaggi inclusi", "subtitle": "Ogni offerta comprende queste garanzie.", "columns": 2, "items": [
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
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Processo</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
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
      title: "Come fatturate automazioni extra?",
      description: "Ogni flusso aggiuntivo \xE8 preventivato in anticipo. Tre-quattro automazioni standard costano CHF 1\u2019500."
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
