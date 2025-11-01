import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BgrVykBU.mjs';
import { manifest } from './manifest_CMYZnqdp.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/backend/dashboard/summary.astro.mjs');
const _page4 = () => import('./pages/api/backend/documents/_id_.astro.mjs');
const _page5 = () => import('./pages/app/clients.astro.mjs');
const _page6 = () => import('./pages/app/documents.astro.mjs');
const _page7 = () => import('./pages/app/invoices.astro.mjs');
const _page8 = () => import('./pages/app/projects.astro.mjs');
const _page9 = () => import('./pages/app/settings.astro.mjs');
const _page10 = () => import('./pages/app/tasks.astro.mjs');
const _page11 = () => import('./pages/app.astro.mjs');
const _page12 = () => import('./pages/contact.astro.mjs');
const _page13 = () => import('./pages/de/about.astro.mjs');
const _page14 = () => import('./pages/de/contact.astro.mjs');
const _page15 = () => import('./pages/de/pricing.astro.mjs');
const _page16 = () => import('./pages/de/privacy.astro.mjs');
const _page17 = () => import('./pages/de/services.astro.mjs');
const _page18 = () => import('./pages/de/terms.astro.mjs');
const _page19 = () => import('./pages/de.astro.mjs');
const _page20 = () => import('./pages/en/about.astro.mjs');
const _page21 = () => import('./pages/en/contact.astro.mjs');
const _page22 = () => import('./pages/en/pricing.astro.mjs');
const _page23 = () => import('./pages/en/privacy.astro.mjs');
const _page24 = () => import('./pages/en/services.astro.mjs');
const _page25 = () => import('./pages/en/terms.astro.mjs');
const _page26 = () => import('./pages/en.astro.mjs');
const _page27 = () => import('./pages/it/about.astro.mjs');
const _page28 = () => import('./pages/it/contact.astro.mjs');
const _page29 = () => import('./pages/it/pricing.astro.mjs');
const _page30 = () => import('./pages/it/privacy.astro.mjs');
const _page31 = () => import('./pages/it/services.astro.mjs');
const _page32 = () => import('./pages/it/terms.astro.mjs');
const _page33 = () => import('./pages/it.astro.mjs');
const _page34 = () => import('./pages/pricing.astro.mjs');
const _page35 = () => import('./pages/privacy.astro.mjs');
const _page36 = () => import('./pages/rss.xml.astro.mjs');
const _page37 = () => import('./pages/services.astro.mjs');
const _page38 = () => import('./pages/terms.astro.mjs');
const _page39 = () => import('./pages/_---blog_/_category_/_---page_.astro.mjs');
const _page40 = () => import('./pages/_---blog_/_tag_/_---page_.astro.mjs');
const _page41 = () => import('./pages/_---blog_/_---page_.astro.mjs');
const _page42 = () => import('./pages/index.astro.mjs');
const _page43 = () => import('./pages/_---blog_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/backend/dashboard/summary.ts", _page3],
    ["src/pages/api/backend/documents/[id].ts", _page4],
    ["src/pages/app/clients.astro", _page5],
    ["src/pages/app/documents.astro", _page6],
    ["src/pages/app/invoices.astro", _page7],
    ["src/pages/app/projects.astro", _page8],
    ["src/pages/app/settings.astro", _page9],
    ["src/pages/app/tasks.astro", _page10],
    ["src/pages/app/index.astro", _page11],
    ["src/pages/contact.astro", _page12],
    ["src/pages/de/about.astro", _page13],
    ["src/pages/de/contact.astro", _page14],
    ["src/pages/de/pricing.astro", _page15],
    ["src/pages/de/privacy.md", _page16],
    ["src/pages/de/services.astro", _page17],
    ["src/pages/de/terms.md", _page18],
    ["src/pages/de/index.astro", _page19],
    ["src/pages/en/about.astro", _page20],
    ["src/pages/en/contact.astro", _page21],
    ["src/pages/en/pricing.astro", _page22],
    ["src/pages/en/privacy.md", _page23],
    ["src/pages/en/services.astro", _page24],
    ["src/pages/en/terms.md", _page25],
    ["src/pages/en/index.astro", _page26],
    ["src/pages/it/about.astro", _page27],
    ["src/pages/it/contact.astro", _page28],
    ["src/pages/it/pricing.astro", _page29],
    ["src/pages/it/privacy.md", _page30],
    ["src/pages/it/services.astro", _page31],
    ["src/pages/it/terms.md", _page32],
    ["src/pages/it/index.astro", _page33],
    ["src/pages/pricing.astro", _page34],
    ["src/pages/privacy.md", _page35],
    ["src/pages/rss.xml.ts", _page36],
    ["src/pages/services.astro", _page37],
    ["src/pages/terms.md", _page38],
    ["src/pages/[...blog]/[category]/[...page].astro", _page39],
    ["src/pages/[...blog]/[tag]/[...page].astro", _page40],
    ["src/pages/[...blog]/[...page].astro", _page41],
    ["src/pages/index.astro", _page42],
    ["src/pages/[...blog]/index.astro", _page43]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "bae2e355-b95f-4fbe-ba4d-47618a74c435",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
