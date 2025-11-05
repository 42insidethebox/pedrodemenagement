import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_BwlJ74mX.mjs';
import { $ as $$Features2 } from '../../chunks/Features2_AsFnuyxK.mjs';
import { $ as $$Features3 } from '../../chunks/Features3_D14xZ8uE.mjs';
import { $ as $$Hero } from '../../chunks/Hero_BWPUH0FD.mjs';
import { $ as $$Stats } from '../../chunks/Stats_DCUffHu6.mjs';
import { $ as $$Steps2 } from '../../chunks/Steps2_DT6ybMv8.mjs';
import { $ as $$PageLayout, f as footerDataDe, h as headerDataDe } from '../../chunks/PageLayout_BqyLTlOK.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://tonsiteweb.ch");
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const metadata = {
    title: "\xDCber uns"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "header": headerDataDe, "footer": footerDataDe }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "tagline": "\xDCber TonSiteWeb.ch" }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-slate-900 to-slate-800 p-10 text-left text-white shadow-2xl"> <p class="text-sm uppercase tracking-[0.35em] text-blue-200/80">Genfersee-Bogen</p> <h4 class="mt-4 text-4xl font-semibold">Lausanne · Genf · Vevey · Montreux</h4> <p class="mt-6 max-w-xl text-lg text-blue-100/90">
Spezialist·innen für Digital, Content und Performance verfolgen ein Ziel: fehlerfreie Websites für lokale Akteur·innen zu bauen.
</p> </div> ` })}`, "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
TonSiteWeb.ch wurde in Lausanne gegründet, um KMU und Selbstständigen hochwertige Websites schnell bereitzustellen – ohne
      Kompromisse bei Präzision und Begleitung. Proprietäre Technologie trifft auf lokale Expert·innen für makellose Ergebnisse.
` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
Ein Team aus dem Genfersee-Raum vereint Automatisierung und Service
` })}` })} ${renderComponent($$result2, "Stats", $$Stats, { "title": "Unsere Kennzahlen", "stats": [
    { title: "Einsatzgebiet", amount: "Genfersee-Bogen" },
    { title: "Ansatz", amount: "Automatisierung + Mensch" },
    { title: "Serviceplan", amount: "Optional CHF 79/Monat" },
    { title: "Sprachen", amount: "FR \xB7 EN \xB7 DE" }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "title": "Unsere S\xE4ulen", "subtitle": "Wir setzen Schweizer Genauigkeit in jedem Projekt um.", "columns": 3, "isBeforeContent": true, "items": [
    {
      title: "Gesteuerte Automatisierung",
      description: "Eigene Pipelines orchestrieren Inhalte, Design und Deployment \u2013 schnell, ohne Qualit\xE4tseinbussen.",
      icon: "tabler:cpu"
    },
    {
      title: "Minimalistisches Design",
      description: "Schweizer Formensprache mit luftigen Layouts, klarer Typografie und pr\xE4zisen Kontrasten.",
      icon: "tabler:layout-grid"
    },
    {
      title: "N\xE4he zu Kund\xB7innen",
      description: "Projektleiter\xB7innen sind telefonisch oder via WhatsApp erreichbar \u2013 auch nach dem Launch.",
      icon: "tabler:users"
    }
  ] })} ${renderComponent($$result2, "Features3", $$Features3, { "columns": 3, "isAfterContent": true, "items": [
    {
      title: "Schweizer & globale Tech",
      description: "Astro, Tailwind und Schweizer Hosting vereinen Souver\xE4nit\xE4t und internationale Performance.",
      icon: "tabler:world"
    },
    {
      title: "Partner vor Ort",
      description: "Fotograf\xB7innen, Texter\xB7innen und Berater\xB7innen zwischen Genf und Montreux nach Bedarf.",
      icon: "tabler:briefcase"
    },
    {
      title: "Kultur der Messbarkeit",
      description: "Wir analysieren jeden Launch und schlagen massgeschneiderte Optimierungen vor.",
      icon: "tabler:chart-dots"
    },
    {
      title: "Mehrsprachiger Support",
      description: "Antworten auf Franz\xF6sisch, Englisch oder Deutsch \u2013 je nach Teampr\xE4ferenz.",
      icon: "tabler:language"
    },
    {
      title: "DSGVO/LPD-konform",
      description: "Rechtstexte bereitgestellt, Einwilligungen verwaltet und Daten in der Schweiz gehostet.",
      icon: "tabler:shield-lock"
    },
    {
      title: "Nachhaltiges Denken",
      description: "Verantwortungsvolle Partner und ressourcenschonende Optimierung f\xFCr geringere Emissionen.",
      icon: "tabler:leaf"
    }
  ] }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate` <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-10 text-white shadow-xl"> <p class="text-sm uppercase tracking-[0.3em] text-blue-200/80">Lokale Präsenz</p> <p class="mt-4 max-w-sm text-lg text-blue-100/90">
Wir arbeiten aus Lausanne, Genf, Vevey und Montreux – nah an den Realitäten unserer Kundschaft.
</p> </div> ` })}` })} ${renderComponent($$result2, "Steps2", $$Steps2, { "title": "Unsere Werte", "subtitle": "Technologie im Dienst lokaler Unternehmen \u2013 transparent und verl\xE4sslich.", "items": [
    {
      title: "Pr\xE4zision",
      description: "Jeder Text und jedes Pixel wird vor dem Go-Live von Menschen gepr\xFCft."
    },
    {
      title: "Klarheit",
      description: "All-inclusive-Angebote, Schweizer Rechnungen und geteilte Kennzahlen in Echtzeit."
    },
    {
      title: "N\xE4he",
      description: "Langfristige Begleitung mit fester Ansprechperson und quartalsweisen Check-ins inklusive."
    }
  ] })} ${renderComponent($$result2, "Steps2", $$Steps2, { "title": "Unsere Geschichte", "subtitle": "Wir bauen eine Plattform, die perfekte Websites liefert \u2013 ohne auf Begleitung zu verzichten.", "isReversed": true, "callToAction": {
    text: "Pakete entdecken",
    href: "/de/pricing"
  }, "items": [
    {
      title: "2021 \u2014 Gr\xFCndung",
      description: "Start von TonSiteWeb.ch in Lausanne, um die Online-Pr\xE4senz von Selbstst\xE4ndigen zu vereinfachen.",
      icon: "tabler:flag"
    },
    {
      title: "2022 \u2014 Skalierung",
      description: "Rollout unserer automatisierten Pipelines und neue Standorte in Genf und Vevey.",
      icon: "tabler:arrows-exchange"
    },
    {
      title: "2023 \u2014 Beschleunigung",
      description: "Launch unseres mehrsprachigen Angebots und st\xE4rkere Partnerschaften mit lokalen Agenturen.",
      icon: "tabler:rocket"
    }
  ] })} ${renderComponent($$result2, "Features2", $$Features2, { "title": "Wo wir Sie treffen", "tagline": "Lokale Pr\xE4senz", "columns": 4, "items": [
    {
      title: "Lausanne",
      description: "Quartier Flon \u2013 Termine auf Anfrage"
    },
    {
      title: "Genf",
      description: "Rue du Rh\xF4ne \u2013 Partner-Showroom"
    },
    {
      title: "Vevey",
      description: "Coworking La Forge \u2013 Onboarding-Sessions"
    },
    {
      title: "Montreux",
      description: "Partner-Fotostudios f\xFCr Shootings"
    }
  ] })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/about.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/de/about.astro";
const $$url = "/de/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
