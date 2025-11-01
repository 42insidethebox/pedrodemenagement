import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$PageLayout, f as footerDataDe, h as headerDataDe } from '../../chunks/PageLayout_4vEQIg5R.mjs';
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
    title: "Preise"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataDe, "footer": footerDataDe }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroText", $$HeroText, { "tagline": "Preise", "title": "Transparente Pakete, in der Schweiz fakturiert", "subtitle": "Jedes Paket umfasst Design, Launch und menschliche Begleitung. Betreuung und Automatisierungen nach Bedarf." })} ${renderComponent($$result2, "Prices", $$Pricing$1, { "title": "Unsere schl\xFCsselfertigen Pakete", "subtitle": "W\xE4hlen Sie das Angebot, das zu Ihrem Bedarf passt. Ohne versteckte Kosten.", "prices": [
    {
      title: "Essentiel",
      subtitle: "Schl\xFCsselfertige Showcase-Seite",
      price: 999,
      period: "CHF \u2014 einmalig",
      items: [
        {
          description: "Showcase-Seite mit 5 Sektionen + responsive Kontaktseite"
        },
        {
          description: "Franz\xF6sische Texte optimiert f\xFCr den Genfersee-Raum"
        },
        {
          description: "Schweizer Hosting & SSL-Zertifikat f\xFCr 12 Monate inklusive"
        },
        {
          description: "Video-Training + Checkliste f\xFCr Eigenst\xE4ndigkeit"
        }
      ],
      callToAction: {
        text: "Projekt starten",
        href: "/de/contact#form"
      }
    },
    {
      title: "Automatisierung",
      subtitle: "Website + 1 Zapier/Make-Flow",
      price: 1200,
      period: "CHF \u2014 einmalig",
      items: [
        {
          description: "Enth\xE4lt das Paket Essentiel"
        },
        {
          description: "Anbindung eines Tools via Zapier oder Make (1 Automation)"
        },
        {
          description: "End-to-End-Tests und einfache Dokumentation"
        },
        {
          description: "Bis zu 4 Automationen: CHF 1\u2019500"
        }
      ],
      callToAction: {
        text: "Automatisierungsangebot anfragen",
        href: "/de/contact#form"
      },
      hasRibbon: true,
      ribbonTitle: "Beliebtestes"
    },
    {
      title: "Serviceplan",
      subtitle: "Updates und Profi-E-Mails",
      price: 79,
      period: "CHF / Monat \u2014 ohne \xDCberraschungen",
      items: [
        {
          description: "Sicherheitsupdates und geplante Backups"
        },
        {
          description: "Uptime-Monitoring & priorisierte Korrekturen"
        },
        {
          description: "Verwaltung der @ihredomain.ch E-Mail-Konten"
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
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "title": "Inklusive Leistungen", "subtitle": "Alle Angebote beinhalten diese Garantien.", "columns": 2, "items": [
    {
      title: "Menschlicher Support",
      description: "Begleitung per E-Mail und Telefon, Antworten innerhalb eines Arbeitstages.",
      icon: "tabler:headset"
    },
    {
      title: "Souver\xE4nes Hosting",
      description: "Server in der Schweiz, DSGVO/LPD-konform, SSL inklusive.",
      icon: "tabler:server"
    },
    {
      title: "Kunden-Dashboard",
      description: "Fortschritt verfolgen, Inhalte teilen und Schritte online freigeben.",
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
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Prozess</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Von der Unterschrift bis zum Launch – jeder Schritt wird in Ihrem Kundenbereich protokolliert.
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
      title: "Wie verrechnet ihr zus\xE4tzliche Automationen?",
      description: "Jeder zus\xE4tzliche Flow wird vorab offeriert. Drei bis vier Standard-Automatismen kosten CHF 1\u2019500."
    },
    {
      title: "Ist der Serviceplan obligatorisch?",
      description: "Nein. Sie k\xF6nnen die Website selbst verwalten oder uns f\xFCr CHF 79/Monat beauftragen (30 Tage K\xFCndigungsfrist)."
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
