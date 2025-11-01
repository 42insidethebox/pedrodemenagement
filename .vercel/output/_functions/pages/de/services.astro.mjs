import { c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_CGLXZ7Kv.mjs';
import { $ as $$CallToAction } from '../../chunks/CallToAction_BsQXy_i8.mjs';
import { $ as $$Content } from '../../chunks/Content_CALXXvF4.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_DeFtIjNq.mjs';
import { $ as $$Hero } from '../../chunks/Hero_BP7I7sN2.mjs';
import { $ as $$PageLayout, f as footerDataDe, h as headerDataDe } from '../../chunks/PageLayout_4vEQIg5R.mjs';
export { renderers } from '../../renderers.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Leistungen"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataDe, "footer": footerDataDe }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "id": "services", "tagline": "Unsere Leistungen", "title": "Schl\xFCsselfertige Showcase-Seiten f\xFCr KMU der Romandie", "subtitle": "MonWebsite.ch kombiniert Automatisierung und menschliche Expertise, um hochwertige Websites mit laufender Betreuung zu liefern.", "actions": [{ variant: "primary", text: "Pakete ansehen", href: "/de/pricing" }] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Automatisierte Services</p> <h4 class="mt-4 text-4xl font-semibold">Design · Inhalt · Betreuung</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
Eine eigene Plattform orchestriert die Produktion, während sich unsere Expert·innen um Qualität und Beziehung kümmern.
</p> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Drei Angebote, ein Anspruch", "subtitle": "W\xE4hlen Sie die Formel, die zu Ihrem Wachstum passt.", "columns": 3, "items": [
    {
      title: "Essentiel",
      description: "Showcase-Seite mit f\xFCnf Sektionen, Texte f\xFCr den Genfersee-Raum und begleiteter Launch.",
      icon: "tabler:layout"
    },
    {
      title: "Automatisierung",
      description: "Anbindung Ihrer Tools via Zapier oder Make f\xFCr automatisierte Formulare, Buchungen und Benachrichtigungen.",
      icon: "tabler:api"
    },
    {
      title: "Serviceplan",
      description: "Technische Updates, Backups, E-Mail-Management und geplanter Support f\xFCr CHF 79/Monat.",
      icon: "tabler:shield-check"
    }
  ] })} ${renderComponent($$result2, "Content", $$Content, { "id": "content", "isReversed": true, "items": [
    {
      title: "Automatisierte Produktion",
      description: "Unsere Pipeline baut Ihre Website auf Basis branchenspezifischer Templates, angepasst an Ihre Identit\xE4t.",
      icon: "tabler:cube"
    },
    {
      title: "Menschliche Kontrolle",
      description: "Designer\xB7innen, Texter\xB7innen und SEO-Expert\xB7innen pr\xFCfen jedes Ergebnis f\xFCr Koh\xE4renz und Compliance.",
      icon: "tabler:shield-check"
    },
    {
      title: "Geplante Auslieferung",
      description: "Wir teilen einen klaren Retro-Plan und richten den Launch nach Ihren betrieblichen Vorgaben aus.",
      icon: "tabler:inbox"
    },
    {
      title: "Essentielles Follow-up",
      description: "Regelm\xE4ssige Check-ins, Unterst\xFCtzung bei Updates und pragmatische Empfehlungen.",
      icon: "tabler:report-analytics"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Unsere hybride Methodik</h3>
Automatisierung für Geschwindigkeit, Expert·innen für Qualität.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-slate-900 to-slate-800 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Überwachte Pipeline</h4> <p class="mt-6 max-w-sm text-blue-100/90">
Jedes Projekt durchläuft manuelle Checks: Inhalte, Design, DSGVO-Konformität und Usability-Tests.
</p> </div> ` })}` })} ${renderComponent($$result2, "Content", $$Content, { "id": "seo", "isAfterContent": true, "items": [
    {
      title: "Lokales SEO & Google-Profile",
      description: "Technische Optimierung, Meta-Texte und Beratung f\xFCr Ihr Google Business Profile.",
      icon: "tabler:map-pin"
    },
    {
      title: "Visuelle Inhalte",
      description: "Auswahl lizenzfreier Visuals oder Koordination mit Ihren lokalen Partnern f\xFCr ein stimmiges Erscheinungsbild.",
      icon: "tabler:photo"
    },
    {
      title: "Akquise-Kampagnen",
      description: "Landing Pages, Formulare und automatisierte E-Mail-Strecken \u2013 je nach Zielsetzung.",
      icon: "tabler:send"
    },
    {
      title: "Kunden-Dashboard",
      description: "Zugang zu einem Kundenbereich, um Deliverables zu verfolgen, Inhalte zu teilen und Schritte freizugeben.",
      icon: "tabler:layout-dashboard"
    }
  ] }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate` <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">Hebel für nachhaltigen Erfolg</h3>
Wir aktivieren die passenden Tools für messbare Resultate.
` })}`, "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-left text-white shadow-xl"> <h4 class="text-3xl font-semibold">Kontrollierte Akquise</h4> <p class="mt-6 max-w-sm text-blue-100/90">
Wir priorisieren gemeinsam wirksame Kanäle und messen, was für Ihr Geschäft zählt.
</p> </div> ` })}` })} ${renderComponent($$result2, "Features2", $$Features2, { "id": "support", "title": "Support & Betreuung", "subtitle": "Sie konzentrieren sich auf Ihr Business \u2013 wir k\xFCmmern uns um den Rest.", "columns": 3, "items": [
    {
      title: "Geplanter Support",
      description: "Antworten innerhalb eines Arbeitstages per E-Mail oder Telefon, dokumentiert im Kundenbereich.",
      icon: "tabler:headset"
    },
    {
      title: "Essentielles Monitoring",
      description: "Regelm\xE4ssige Performance-Checks und Alarme bei erkannten Problemen.",
      icon: "tabler:antenna"
    },
    {
      title: "Sicherheits-Updates",
      description: "Kritische Patches, Backups und Wiederherstellung bei Bedarf.",
      icon: "tabler:tools"
    },
    {
      title: "DSGVO-Konformit\xE4t",
      description: "Cookie-Richtlinie, Rechtstexte und Consent-Banner passend zur Schweiz.",
      icon: "tabler:shield-check"
    },
    {
      title: "E-Mail-Verwaltung",
      description: "Einrichtung und Support Ihrer @ihredomain.ch Konten mit SPF/DKIM.",
      icon: "tabler:mail"
    },
    {
      title: "Erweiterungen auf Anfrage",
      description: "Zus\xE4tzliche Seiten, Module oder Automationen passend zu Ihren Zielen.",
      icon: "tabler:arrows-left-right"
    }
  ] })} ${renderComponent($$result2, "CallToAction", $$CallToAction, { "actions": [
    {
      variant: "primary",
      text: "Demo vereinbaren",
      href: "/de/contact#form",
      icon: "tabler:device-desktop-analytics"
    }
  ] }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
Teilen Sie Ihre Ziele – wir erstellen einen komplett betreuten Launch-Plan mit MonWebsite.ch.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`Sprechen wir über Ihren nächsten Launch` })}` })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/services.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/services.astro";
const $$url = "/de/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
