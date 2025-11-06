import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$PageLayout, f as footerDataDe, h as headerDataDe } from '../chunks/PageLayout_eGdiW9lQ.mjs';
import { $ as $$Hero } from '../chunks/Hero_HFxushFr.mjs';
import { $ as $$Note, a as $$Features } from '../chunks/Features_BOk6MIKO.mjs';
import { $ as $$Features2 } from '../chunks/Features2_BhHeE5yg.mjs';
import { $ as $$Steps, a as $$FAQs } from '../chunks/Steps_BTcjI0eg.mjs';
import { $ as $$Content } from '../chunks/Content_CbHoUpQk.mjs';
import { $ as $$Stats } from '../chunks/Stats_BpjNaqc9.mjs';
import { $ as $$CallToAction } from '../chunks/CallToAction_Cu4ccqUO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const metadata = {
    title: "TonSiteWeb.ch \u2014 Schweizer Websites f\xFCr den Genfersee-Raum",
    ignoreTitleTemplate: true
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataDe, "footer": footerDataDe }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "id": "process", "actions": [
    {
      variant: "primary",
      text: "Pakete ansehen",
      href: "/de/pricing",
      icon: "tabler:arrow-right"
    },
    { text: "Mit Expert\xB7in sprechen", href: "/de/contact#form" }
  ], "image": { src: "~/assets/images/hero-image.png", alt: "TonSiteWeb.ch Oberfl\xE4che" } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Schweizer Design, kontrollierte Performance. TonSiteWeb.ch verbindet Automatisierung mit lokaler Expertise, um verlässliche
      Showcase-Seiten für KMU und Selbstständige im Genfersee-Bogen zu liefern – ohne unrealistische Versprechen oder technischen Ballast.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Ihre schlüsselfertige Website für den Markt am Genfersee
` })}` })} ${renderComponent($$result2, "Note", $$Note, { "title": "Versprechen", "description": "Lokaler Service, menschlicher Support und automatisierte Abl\xE4ufe f\xFCr ein makelloses Resultat ohne Zusatzaufwand." })} ${renderComponent($$result2, "Features", $$Features, { "id": "features", "tagline": "Warum wir", "title": "Schweizer Pr\xE4zision f\xFCr Ihren digitalen Auftritt", "subtitle": "Jedes Projekt folgt einem klaren Rahmen: Briefing, Gestaltung, Freigabe und begleiteter Go-Live.", "items": [
    {
      title: "Geplanter Zeitrahmen",
      description: "Briefing, Design und Launch werden in der Regel innerhalb von f\xFCnf Arbeitstagen abgeschlossen \u2013 je nach Inhalt und Integrationen.",
      icon: "tabler:calendar-time"
    },
    {
      title: "Premium-Design nach Mass",
      description: "Typografie Inter/Montserrat, zur\xFCckhaltende Farbwelten und sanfte Animationen f\xFCr einen hochwertigen, einheitlichen Auftritt.",
      icon: "tabler:sparkles"
    },
    {
      title: "Lokales SEO als Standard",
      description: "Struktur, Meta-Tags und Texte auf Lausanne, Genf, Montreux und umliegende Gemeinden ausgerichtet \u2013 f\xFCr echte N\xE4he.",
      icon: "tabler:map-pin"
    },
    {
      title: "Hosting im 1. Jahr inklusive",
      description: "Hosting & SSL f\xFCr 12 Monate inklusive. Danach Hosting + Wartung f\xFCr CHF 150/Jahr (optional monatlicher Serviceplan verf\xFCgbar).",
      icon: "tabler:server"
    },
    {
      title: "Transparente Schweizer Fakturierung",
      description: "Klare Vertr\xE4ge, MwSt. inklusive und Zahlung in CHF \xFCber die g\xE4ngigen Schweizer Kan\xE4le.",
      icon: "tabler:receipt"
    },
    {
      title: "Lokaler Support",
      description: "Expert\xB7innen aus dem Genfersee-Raum antworten innerhalb eines Arbeitstages per E-Mail oder Telefon \u2013 mit geplantem Follow-up.",
      icon: "tabler:headset"
    }
  ] })} ${renderComponent($$result2, "Content", $$Content, { "isReversed": true, "tagline": "Prozess", "title": "Eine Orchestrierung in drei Schritten", "items": [
    {
      title: "Strukturiertes Briefing",
      description: "Ein fokussierter Fragebogen sammelt Leistungen, \xD6ffnungszeiten, Testimonials und Visuals f\xFCr unsere eigene KI."
    },
    {
      title: "Design & Integration",
      description: "Unsere Designer passen die Sektionen an, verfeinern die Typografie und integrieren Ihre Inhalte, Medien und Call-to-Actions."
    },
    {
      title: "Qualit\xE4tssicherung",
      description: "Manuelles Lektorat, Performance-Tests und DSGVO-Checkliste vor der finalen Freigabe und dem Go-Live."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Ihre Website ohne Stress</h3>
Drei automatisierte Schritte, validiert von einem lokalen Profi.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Kontrollierter Workflow</p> <h4 class="mt-4 text-3xl font-semibold">Briefing → Kreation → Launch</h4> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Jeder Meilenstein wird in Ihrem Kundenbereich mit Benachrichtigungen, Retro-Planung und klaren Freigaben dokumentiert.
</p> </div> ` })}` })} ${renderComponent($$result2, "Steps", $$Steps, { "title": "Unsere strukturierte Methode", "tagline": "Kundenreise", "items": [
    {
      title: "Digitale Signatur",
      description: "W\xE4hlen Sie Ihr Paket, unterzeichnen Sie elektronisch und erhalten Sie Zugang zum Briefing.",
      icon: "tabler:edit"
    },
    {
      title: "Gef\xFChrtes Onboarding",
      description: "Unser Assistent sammelt die wichtigsten Informationen und schl\xE4gt eine Struktur passend zu Ihrem Gewerbe vor.",
      icon: "tabler:clipboard-list"
    },
    {
      title: "\xDCberwachte Produktion",
      description: "Pipelines generieren die Website, integrieren Inhalte und benachrichtigen unser Team zur Kontrolle.",
      icon: "tabler:robot"
    },
    {
      title: "Freigabe & Launch",
      description: "Sie validieren die finale Version, erhalten Ihr Video-Training und planen den Go-Live.",
      icon: "tabler:rocket"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Timeline</p> <p class="mt-6 max-w-xs text-base text-blue-100/90">
Typische Lieferung: fünf Arbeitstage nach Eingang Ihrer Inhalte. Wir passen den Plan an Ihre Prioritäten an.
</p> </div> ` })}` })} ${renderComponent($$result2, "Content", $$Content, { "isAfterContent": true, "items": [
    {
      title: "Mehrsprachige Inhalte",
      description: "Franz\xF6sisch als Standard, optionale englische oder deutsche Versionen auf Anfrage \u2013 f\xFCr Ihr Wachstum."
    },
    {
      title: "Optimierte Performance",
      description: "Astro-Architektur, schnelles Schweizer Hosting und Bildoptimierung f\xFCr mobile Geschwindigkeit."
    },
    {
      title: "Essenzielle Integrationen",
      description: "Kontaktformular, Buchung oder Tool-Anbindung via Zapier (ab CHF 1\u2019200)."
    },
    {
      title: "Schnelles Training",
      description: "Ein 15-min\xFCtiges Video-Training, damit Sie Ihre Website eigenst\xE4ndig pflegen k\xF6nnen."
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}`, "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate`Eine Online-Präsenz, die Ihre Präzision widerspiegelt.` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <h4 class="text-3xl font-semibold">Messbare Performance</h4> <ul class="mt-6 space-y-3 text-left text-blue-100/90"> <li>✓ Mobile-First Design</li> <li>✓ Optimierte Ladezeiten</li> <li>✓ Hosting im ersten Jahr inklusive</li> </ul> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "id": "included", "title": "Alles drin", "subtitle": "Eine schl\xFCsselfertige L\xF6sung f\xFCr Unternehmer:innen in der Romandie", "tagline": "In jedem Paket enthalten", "items": [
    {
      title: "Hosting in der Schweiz",
      description: "Server in der Schweiz mit SSL-Zertifikat und anf\xE4nglichen Backups f\xFCr 12 Monate.",
      icon: "tabler:server"
    },
    {
      title: "Professionelle E-Mails",
      description: "E-Mail-Konten @ihrdomain.ch inklusive im Serviceplan (CHF 79/Monat).",
      icon: "tabler:mail"
    },
    {
      title: "Lokales SEO",
      description: "Struktur, \xDCberschriften und Meta-Descriptions auf den Genfersee-Raum ausgerichtet.",
      icon: "tabler:map-pin"
    },
    {
      title: "Geplanter Support",
      description: "Unterst\xFCtzung per E-Mail und Video, Antworten innerhalb eines Arbeitstages.",
      icon: "tabler:message"
    },
    {
      title: "Training & Guides",
      description: "Aufgezeichnete Session und vereinfachte Dokumentation f\xFCr Ihre Autonomie.",
      icon: "tabler:video"
    },
    {
      title: "Skalierbare Module",
      description: "Zus\xE4tzliche Seiten, Automationen oder Formulare auf Anfrage.",
      icon: "tabler:puzzle"
    }
  ] }, { "bg": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "bg" }, { "default": ($$result4) => renderTemplate` <div class="absolute inset-0 bg-blue-50 dark:bg-transparent"></div> ` })}` })} ${renderComponent($$result2, "Stats", $$Stats, { "title": "Klare Kennzahlen f\xFCr Ihre Entscheidung", "stats": [
    { title: "Typischer Zeitrahmen", amount: "5 Arbeitstage" },
    { title: "Showcase-Paket", amount: "CHF 999" },
    { title: "Serviceplan", amount: "CHF 79/Monat" },
    { title: "Zapier-Automationen", amount: "ab CHF 1\u2019200" }
  ] })} ${renderComponent($$result2, "FAQs", $$FAQs, { "id": "faq", "title": "H\xE4ufige Fragen", "subtitle": "Transparenz \xFCber unsere Arbeitsweise.", "tagline": "FAQ", "classes": { container: "max-w-6xl" }, "items": [
    {
      title: "Wie lange dauert die Lieferung?",
      description: "Nach Eingang Ihrer Inhalte liefern wir die erste Version in der Regel innerhalb von f\xFCnf Arbeitstagen. Automatisierungen k\xF6nnen l\xE4nger dauern \u2013 wir kommunizieren den Zeitplan im Angebot."
    },
    {
      title: "Sind Texte inklusive?",
      description: "Ja, wir schreiben oder \xFCberarbeiten Ihre franz\xF6sischen Texte. Englische oder deutsche Versionen bieten wir auf Anfrage an."
    },
    {
      title: "Was umfasst der Serviceplan?",
      description: "Service ab CHF 79/Monat umfasst Sicherheitsupdates, regelm\xE4ssige Backups und Uptime\u2011Monitoring. Optionen nach Bedarf."
    },
    {
      title: "Bietet ihr Integrationen an?",
      description: "Ja. Einfache Integrationen (Formulare, Buchungen) sind enthalten. API\u2011Anbindungen oder komplexe Workflows offerieren wir auf Anfrage."
    },
    {
      title: "Wie funktioniert der Support nach dem Launch?",
      description: "Support per E\u2011Mail oder geplanter Video\u2011Session, Antwort innerhalb eines Arbeitstages."
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Angebot anfordern",
      href: "/de/contact#form",
      icon: "tabler:mail-forward"
    },
    {
      text: "Preise entdecken",
      href: "/de/pricing"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Wir analysieren Ihren Bedarf und erstellen einen realistischen Aktionsplan für Ihr Unternehmen im Genfersee-Bogen.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`Bereit für eine klar strukturierte Online-Präsenz?` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/index.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/index.astro";
const $$url = "/de";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
