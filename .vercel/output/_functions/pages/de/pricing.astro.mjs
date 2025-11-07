import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment } from '../../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$PageLayout, f as footerDataDe, h as headerDataDe } from '../../chunks/PageLayout_CEoU7WHT.mjs';
import { $ as $$HeroText } from '../../chunks/HeroText_3y8PK1AY.mjs';
import { $ as $$Pricing$1, a as $$PricingOptions } from '../../chunks/PricingOptions_2KgxhorI.mjs';
import { $ as $$Steps, a as $$FAQs } from '../../chunks/Steps_ENoE_0yp.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_CDAQDkg3.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_CCMvArWO.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pricing;
  const metadata = {
    title: "Preise"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataDe, "footer": footerDataDe }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Preise", "title": "Transparente Pakete, in der Schweiz fakturiert", "subtitle": "Jedes Paket umfasst Design, Launch und menschliche Begleitung. Betreuung und Automatisierungen nach Bedarf." })} ${renderComponent($$result2, "Prices", $$Pricing$1, { "title": "Unsere schl\xFCsselfertigen Pakete", "subtitle": "W\xE4hlen Sie das Angebot, das zu Ihrem Bedarf passt. Ohne versteckte Kosten.", "prices": [
    {
      title: "Essentiel",
      subtitle: "Schl\xFCsselfertige Showcase-Seite (Code geliefert)",
      price: 999,
      period: "ab \u2014 einmalig",
      items: [
        {
          description: "Showcase-Seite mit 5 Sektionen + responsive Kontaktseite"
        },
        {
          description: "Inhalte vom Kunden geliefert; wir integrieren und formatieren"
        },
        {
          description: "Hosting nicht inbegriffen (Servicepl\xE4ne ab 79 CHF/Monat)"
        },
        {
          description: "Video-Training + Checkliste f\xFCr Eigenst\xE4ndigkeit"
        }
      ],
      callToAction: {
        text: "Projekt starten",
        href: "#modal-essential-de"
      }
    },
    {
      title: "Erweitert",
      subtitle: "Website + erweiterte Funktionen",
      price: 3e3,
      period: "ab \u2014 einmalig",
      items: [
        { description: "Enth\xE4lt das Paket Essentiel" },
        { description: "Einfaches Backend oder spezifische Funktionen" },
        { description: "End-to-End-Tests und kurze Dokumentation" }
      ],
      callToAction: {
        text: "Angebot anfragen",
        href: "/de/contact#form"
      }
    },
    {
      title: "Serviceplan",
      subtitle: "Updates und Optionen je nach Stufe",
      price: 79,
      period: "ab / Monat \u2014 ohne \xDCberraschungen",
      items: [
        {
          description: "Sicherheitsupdates und geplante Backups"
        },
        {
          description: "Uptime-Monitoring & priorisierte Korrekturen"
        },
        {
          description: "Pro-E-Mail & Schweizer Hosting ab 149\u2013249 CHF/Monat"
        },
        {
          description: "Support per E-Mail & Video innerhalb eines Arbeitstages"
        }
      ],
      callToAction: {
        text: "Serviceplan aktivieren",
        href: "/de/contact#form"
      }
    }
  ] })} ${maybeRenderHead()}<div class="mt-6 grid gap-4 max-w-7xl mx-auto px-4"> <div class="flex flex-wrap gap-4"> ${renderComponent($$result2, "PricingOptions", $$PricingOptions, { "id": "modal-essential-de", "triggerText": "", "title": "Essentiel-Pakete", "subtitle": "Automationsgrad ausw\xE4hlen", "ctaText": "W\xE4hlen", "tiers": [
    { label: "CHF 999", price: "ab 999", features: ["Statische Seite", "Einfaches Formular (E-Mail)"], href: "/de/choose-template?plan=essential999", info: ["Hosting & SSL inklusive (3 Monate)", "1 Runde kleiner Anpassungen (\u2264 30 Min)", "Kombinierbar mit Care 79 (Hosting & Sicherheit)"] },
    { label: "CHF 1\u2019249", price: "1\u2019249", features: ["Enth\xE4lt Essentiel", "1 Automation (z.\u202FB. Buchung)"], href: "/de/choose-template?plan=essential1249", primary: true, info: ["Hosting & SSL inklusive (6 Monate)", "1 Runde kleiner Anpassungen (\u2264 30 Min)", "Kombinierbar mit Care 79 (Hosting & Sicherheit)"] },
    { label: "CHF 1\u2019500", price: "1\u2019500", features: ["Enth\xE4lt Essentiel", "2\u20133 Automationen"], href: "/de/choose-template?plan=essential1500", info: ["Hosting & SSL inklusive (9 Monate)", "1 Runde kleiner Anpassungen (\u2264 30 Min)", "Kombinierbar mit Care 79 (Hosting & Sicherheit)"] }
  ], "footnote": "Hosting & SSL inklusive (3/6/9 Monate je nach Paket). Technischer Support inklusive. Inhalts-/Design\xE4nderungen separat verrechnet." })} </div> </div> ${renderComponent($$result2, "Features3", $$Features3, { "title": "Was unsere Angebote beinhalten k\xF6nnen", "subtitle": "Je nach Paket und Bedarf.", "columns": 2, "items": [
    {
      title: "Menschlicher Support",
      description: "Begleitung per E-Mail und Telefon, Antworten innerhalb eines Arbeitstages.",
      icon: "tabler:headset"
    },
    {
      title: "Schweizer Hosting (optional)",
      description: "Server in der Schweiz mit SSL, auf h\xF6heren Stufen verf\xFCgbar.",
      icon: "tabler:server"
    },
    {
      title: "Einfacher Prozess",
      description: "Austausch per E\u2011Mail und Freigaben pro Schritt (kein Kundenportal).",
      icon: "tabler:layout-dashboard"
    },
    {
      title: "Klare Fakturierung",
      description: "MwSt. inklusive, QR-Rechnung oder Twint, monatliche Zahlung m\xF6glich.",
      icon: "tabler:receipt"
    },
    {
      title: "Optimierte Performance",
      description: "Astro-Architektur und Bildoptimierung f\xFCr schnelle Ladezeiten.",
      icon: "tabler:gauge"
    },
    {
      title: "Erh\xF6hte Sicherheit",
      description: "Initiale Backups, Application-Firewall und regelm\xE4ssige Updates.",
      icon: "tabler:lock"
    }
  ], "classes": { container: "max-w-5xl" } })} ${renderComponent($$result2, "Steps", $$Steps, { "title": "So l\xE4uft Ihr Projekt ab", "tagline": "Ablauf", "isReversed": true, "items": [
    {
      title: "1. Digitale Unterschrift",
      description: "Paket best\xE4tigen und Zugang zum Onboarding erhalten.",
      icon: "tabler:edit"
    },
    {
      title: "2. Intelligenter Fragebogen",
      description: "Schl\xFCsselinformationen teilen, Visuals hochladen und Module w\xE4hlen.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "3. \xDCberwachte Produktion",
      description: "Plattform generiert Ihre Website, Expert\xB7innen finalisieren und pr\xFCfen.",
      icon: "tabler:robot"
    },
    {
      title: "4. Freigabe & Training",
      description: "Fertige Website, Video-Guide und n\xE4chste Schritte erhalten.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Prozess</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Einfacher Ablauf: Briefing, Inhaltsintegration und Freigaben per E‑Mail.
</p> </div> ` })}` })} ${renderComponent($$result2, "FAQs", $$FAQs, { "title": "Fragen zu unseren Preisen", "subtitle": "Wir setzen auf vollst\xE4ndige Transparenz.", "items": [
    {
      title: "Ist die MwSt. enthalten?",
      description: "Ja, alle Betr\xE4ge sind inkl. MwSt. Die Rechnung weist die Schweizer MwSt. und die IDE-Nummer aus."
    },
    {
      title: "Wie lange dauert das Paket Essentiel?",
      description: "Rund f\xFCnf Arbeitstage nach Eingang Ihrer Inhalte. Den genauen Zeitplan erhalten Sie beim Briefing."
    },
    {
      title: "Wie verrechnet ihr Integrationen?",
      description: "Einfache Integrationen sind enthalten. API\u2011Anbindungen und komplexe Szenarien werden offeriert."
    },
    {
      title: "Ist der Serviceplan obligatorisch?",
      description: "Nein. Pl\xE4ne zu 79 / 149 / 249 CHF/Monat verf\xFCgbar. K\xFCndigungsfrist 30 Tage."
    },
    {
      title: "Welche Zahlungsmittel akzeptiert ihr?",
      description: "Schweizer Karten, Twint, Bank\xFCberweisung und QR-Rechnung. Abonnemente monatlich oder j\xE4hrlich zahlbar."
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Angebot erhalten",
      href: "/de/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "Pakete vergleichen",
      href: "/de/services"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Wir passen jedes Paket an die Besonderheiten Ihres Unternehmens im Genfersee-Raum an.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`Brauchen Sie ein massgeschneidertes Angebot?` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/pricing.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/pricing.astro";
const $$url = "/de/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
