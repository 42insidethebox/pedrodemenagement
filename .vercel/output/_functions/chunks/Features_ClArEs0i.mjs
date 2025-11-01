import { d as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, u as unescapeHTML, F as Fragment, a as renderTemplate } from './astro/server_CGLXZ7Kv.mjs';
import { g as $$Icon } from './PageLayout_4vEQIg5R.mjs';
import { $ as $$WidgetWrapper } from './WidgetWrapper_DdnkWp3O.mjs';
import { $ as $$ItemGrid } from './ItemGrid_BE3f6bEk.mjs';
import { $ as $$Headline } from './Headline_DJNx1UoH.mjs';

const $$Astro$1 = createAstro("https://monwebsite.ch");
const $$Note = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Note;
  const {
    icon = "tabler:info-square",
    title = await Astro2.slots.render("title"),
    description = await Astro2.slots.render("description")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="bg-blue-50 dark:bg-slate-800 not-prose"> <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-md text-center font-medium"> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5 inline-block align-text-bottom font-bold" })} <span class="font-bold">${unescapeHTML(title)}</span> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(description)}` })} </div> </section>`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/components/widgets/Note.astro", void 0);

const $$Astro = createAstro("https://monwebsite.ch");
const $$Features = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Features;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    tagline = await Astro2.slots.render("tagline"),
    items = [],
    columns = 2,
    defaultIcon,
    id,
    isDark = false,
    classes = {},
    bg = await Astro2.slots.render("bg")
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "WidgetWrapper", $$WidgetWrapper, { "id": id, "isDark": isDark, "containerClass": `max-w-5xl ${classes?.container ?? ""}`, "bg": bg }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Headline", $$Headline, { "title": title, "subtitle": subtitle, "tagline": tagline, "classes": classes?.headline })} ${renderComponent($$result2, "ItemGrid", $$ItemGrid, { "items": items, "columns": columns, "defaultIcon": defaultIcon, "classes": {
    container: "",
    title: "md:text-[1.3rem]",
    icon: "text-white bg-primary rounded-full w-10 h-10 p-2 md:w-12 md:h-12 md:p-3 mr-4 rtl:ml-4 rtl:mr-0",
    ...classes?.items ?? {}
  } })} ` })}`;
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/components/widgets/Features.astro", void 0);

export { $$Note as $, $$Features as a };
