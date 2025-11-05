import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DnB5G7FG.mjs';
import { manifest } from './manifest_BW3GefJX.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/backend/dashboard/summary.astro.mjs');
const _page4 = () => import('./pages/api/backend/documents/_id_.astro.mjs');
const _page5 = () => import('./pages/api/contact.astro.mjs');
const _page6 = () => import('./pages/api/demo.astro.mjs');
const _page7 = () => import('./pages/api/domains/search.astro.mjs');
const _page8 = () => import('./pages/api/health.astro.mjs');
const _page9 = () => import('./pages/api/payment/checkout.astro.mjs');
const _page10 = () => import('./pages/api/payment/portal.astro.mjs');
const _page11 = () => import('./pages/api/payment/redirect.astro.mjs');
const _page12 = () => import('./pages/api/payment/session.astro.mjs');
const _page13 = () => import('./pages/api/stripe-webhook.astro.mjs');
const _page14 = () => import('./pages/app/clients.astro.mjs');
const _page15 = () => import('./pages/app/documents.astro.mjs');
const _page16 = () => import('./pages/app/invoices.astro.mjs');
const _page17 = () => import('./pages/app/projects.astro.mjs');
const _page18 = () => import('./pages/app/settings.astro.mjs');
const _page19 = () => import('./pages/app/tasks.astro.mjs');
const _page20 = () => import('./pages/app.astro.mjs');
const _page21 = () => import('./pages/choose-template.astro.mjs');
const _page22 = () => import('./pages/contact.astro.mjs');
const _page23 = () => import('./pages/de/about.astro.mjs');
const _page24 = () => import('./pages/de/choose-template.astro.mjs');
const _page25 = () => import('./pages/de/contact.astro.mjs');
const _page26 = () => import('./pages/de/pricing.astro.mjs');
const _page27 = () => import('./pages/de/privacy.astro.mjs');
const _page28 = () => import('./pages/de/services.astro.mjs');
const _page29 = () => import('./pages/de/terms.astro.mjs');
const _page30 = () => import('./pages/de.astro.mjs');
const _page31 = () => import('./pages/en/about.astro.mjs');
const _page32 = () => import('./pages/en/choose-template.astro.mjs');
const _page33 = () => import('./pages/en/contact.astro.mjs');
const _page34 = () => import('./pages/en/pricing.astro.mjs');
const _page35 = () => import('./pages/en/privacy.astro.mjs');
const _page36 = () => import('./pages/en/services.astro.mjs');
const _page37 = () => import('./pages/en/terms.astro.mjs');
const _page38 = () => import('./pages/en.astro.mjs');
const _page39 = () => import('./pages/it/about.astro.mjs');
const _page40 = () => import('./pages/it/choose-template.astro.mjs');
const _page41 = () => import('./pages/it/contact.astro.mjs');
const _page42 = () => import('./pages/it/pricing.astro.mjs');
const _page43 = () => import('./pages/it/privacy.astro.mjs');
const _page44 = () => import('./pages/it/services.astro.mjs');
const _page45 = () => import('./pages/it/terms.astro.mjs');
const _page46 = () => import('./pages/it.astro.mjs');
const _page47 = () => import('./pages/pricing.astro.mjs');
const _page48 = () => import('./pages/privacy.astro.mjs');
const _page49 = () => import('./pages/services.astro.mjs');
const _page50 = () => import('./pages/terms.astro.mjs');
const _page51 = () => import('./pages/thank-you.astro.mjs');
const _page52 = () => import('./pages/_---blog_/_category_/_---page_.astro.mjs');
const _page53 = () => import('./pages/_---blog_/_tag_/_---page_.astro.mjs');
const _page54 = () => import('./pages/_---blog_/_---page_.astro.mjs');
const _page55 = () => import('./pages/index.astro.mjs');
const _page56 = () => import('./pages/_---blog_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/backend/dashboard/summary.ts", _page3],
    ["src/pages/api/backend/documents/[id].ts", _page4],
    ["src/pages/api/contact.ts", _page5],
    ["src/pages/api/demo.ts", _page6],
    ["src/pages/api/domains/search.ts", _page7],
    ["src/pages/api/health.ts", _page8],
    ["src/pages/api/payment/checkout.ts", _page9],
    ["src/pages/api/payment/portal.ts", _page10],
    ["src/pages/api/payment/redirect.ts", _page11],
    ["src/pages/api/payment/session.ts", _page12],
    ["src/pages/api/stripe-webhook.ts", _page13],
    ["src/pages/app/clients.astro", _page14],
    ["src/pages/app/documents.astro", _page15],
    ["src/pages/app/invoices.astro", _page16],
    ["src/pages/app/projects.astro", _page17],
    ["src/pages/app/settings.astro", _page18],
    ["src/pages/app/tasks.astro", _page19],
    ["src/pages/app/index.astro", _page20],
    ["src/pages/choose-template.astro", _page21],
    ["src/pages/contact.astro", _page22],
    ["src/pages/de/about.astro", _page23],
    ["src/pages/de/choose-template.astro", _page24],
    ["src/pages/de/contact.astro", _page25],
    ["src/pages/de/pricing.astro", _page26],
    ["src/pages/de/privacy.md", _page27],
    ["src/pages/de/services.astro", _page28],
    ["src/pages/de/terms.md", _page29],
    ["src/pages/de/index.astro", _page30],
    ["src/pages/en/about.astro", _page31],
    ["src/pages/en/choose-template.astro", _page32],
    ["src/pages/en/contact.astro", _page33],
    ["src/pages/en/pricing.astro", _page34],
    ["src/pages/en/privacy.md", _page35],
    ["src/pages/en/services.astro", _page36],
    ["src/pages/en/terms.md", _page37],
    ["src/pages/en/index.astro", _page38],
    ["src/pages/it/about.astro", _page39],
    ["src/pages/it/choose-template.astro", _page40],
    ["src/pages/it/contact.astro", _page41],
    ["src/pages/it/pricing.astro", _page42],
    ["src/pages/it/privacy.md", _page43],
    ["src/pages/it/services.astro", _page44],
    ["src/pages/it/terms.md", _page45],
    ["src/pages/it/index.astro", _page46],
    ["src/pages/pricing.astro", _page47],
    ["src/pages/privacy.md", _page48],
    ["src/pages/services.astro", _page49],
    ["src/pages/terms.md", _page50],
    ["src/pages/thank-you.astro", _page51],
    ["src/pages/[...blog]/[category]/[...page].astro", _page52],
    ["src/pages/[...blog]/[tag]/[...page].astro", _page53],
    ["src/pages/[...blog]/[...page].astro", _page54],
    ["src/pages/index.astro", _page55],
    ["src/pages/[...blog]/index.astro", _page56]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "43f51406-9ca9-416a-949e-5c7308d9b70f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
