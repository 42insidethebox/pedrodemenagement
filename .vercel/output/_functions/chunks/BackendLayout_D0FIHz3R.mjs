import { d as createAstro, c as createComponent, e as renderHead, f as renderSlot, a as renderTemplate } from './astro/server_CGLXZ7Kv.mjs';
import 'clsx';

const $$Astro = createAstro("https://monwebsite.ch");
const $$BackendLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BackendLayout;
  const { pageTitle = "Dashboard", children } = Astro2.props;
  return renderTemplate`<html lang="en" class="bg-slate-950 text-slate-100"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageTitle}</title>${renderHead()}</head> <body class="min-h-screen flex flex-col"> <aside class="w-full bg-slate-900 p-4 shadow-lg"> <h1 class="text-lg font-semibold text-white">${pageTitle}</h1> </aside> <main class="flex-1 container mx-auto p-6"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-slate-900 text-center py-4 text-xs text-slate-500">
© ${(/* @__PURE__ */ new Date()).getFullYear()} tonsiteweb.ch
</footer> </body></html>`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/layouts/BackendLayout.astro", void 0);

export { $$BackendLayout as $ };
