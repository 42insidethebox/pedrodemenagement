import { c as createComponent, a as renderTemplate, r as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_C7RkpNfc.mjs';
import { $ as $$BackendLayout } from '../../chunks/BackendLayout_DNowksUb.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ` <script type="module">
  import { authFetch } from '~/utils/backend/api';

  const tableBody = document.getElementById('team-table');
  const refreshButton = document.getElementById('team-refresh');

  const renderTeam = (team) => {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const members = Array.isArray(team) ? team : [];

    if (!members.length) {
      tableBody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Invite teammates via Supabase Auth to populate this list.</td></tr>';
      return;
    }

    members.forEach((member) => {
      const row = document.createElement('tr');
      row.innerHTML = \`
        <td class="px-4 py-3">
          <div class="font-medium text-white">\${member.full_name ?? '\u2014'}</div>
          <div class="text-xs text-slate-400">\${member.id}</div>
        </td>
        <td class="px-4 py-3 text-sm">\${member.user_id}</td>
        <td class="px-4 py-3 text-sm capitalize">\${member.role}</td>
        <td class="px-4 py-3 text-xs text-slate-300">\${member.timezone ?? '\u2014'}</td>\`;
      tableBody.appendChild(row);
    });
  };

  const loadTeam = async () => {
    if (tableBody) {
      tableBody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Loading team\u2026</td></tr>';
    }
    try {
      const response = await authFetch('/team');
      renderTeam(response.team ?? []);
    } catch (error) {
      console.error(error);
      if (tableBody) {
        tableBody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-red-400">Unable to load team.</td></tr>';
      }
    }
  };

  refreshButton?.addEventListener('click', () => {
    loadTeam();
  });

  await loadTeam();
<\/script>`], ["", ` <script type="module">
  import { authFetch } from '~/utils/backend/api';

  const tableBody = document.getElementById('team-table');
  const refreshButton = document.getElementById('team-refresh');

  const renderTeam = (team) => {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const members = Array.isArray(team) ? team : [];

    if (!members.length) {
      tableBody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Invite teammates via Supabase Auth to populate this list.</td></tr>';
      return;
    }

    members.forEach((member) => {
      const row = document.createElement('tr');
      row.innerHTML = \\\`
        <td class="px-4 py-3">
          <div class="font-medium text-white">\\\${member.full_name ?? '\u2014'}</div>
          <div class="text-xs text-slate-400">\\\${member.id}</div>
        </td>
        <td class="px-4 py-3 text-sm">\\\${member.user_id}</td>
        <td class="px-4 py-3 text-sm capitalize">\\\${member.role}</td>
        <td class="px-4 py-3 text-xs text-slate-300">\\\${member.timezone ?? '\u2014'}</td>\\\`;
      tableBody.appendChild(row);
    });
  };

  const loadTeam = async () => {
    if (tableBody) {
      tableBody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Loading team\u2026</td></tr>';
    }
    try {
      const response = await authFetch('/team');
      renderTeam(response.team ?? []);
    } catch (error) {
      console.error(error);
      if (tableBody) {
        tableBody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-red-400">Unable to load team.</td></tr>';
      }
    }
  };

  refreshButton?.addEventListener('click', () => {
    loadTeam();
  });

  await loadTeam();
<\/script>`])), renderComponent($$result, "BackendLayout", $$BackendLayout, { "pageTitle": "Settings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="space-y-8"> <div class="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-6 shadow-lg shadow-slate-950/40"> <h2 class="text-lg font-semibold text-white">Supabase configuration</h2> <p class="mt-2 text-sm text-slate-400">Drop these environment variables into your deployment to activate the backend.</p> <div class="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm font-mono text-slate-200"> <p class="text-xs uppercase tracking-wide text-slate-500">.env</p> <pre class="mt-2 whitespace-pre-wrap text-slate-200">PUBLIC_SUPABASE_URL=&lt;your-project-url&gt;
PUBLIC_SUPABASE_ANON_KEY=&lt;your-anon-key&gt;
SUPABASE_SERVICE_ROLE_KEY=&lt;your-service-role-key&gt;</pre> </div> <p class="mt-3 text-xs text-slate-500">
Rotate keys in Supabase dashboard → Settings → API. Your service role key stays server-side only.
</p> </div> <div class="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-6 shadow-lg shadow-slate-950/40"> <div class="flex items-center justify-between"> <h2 class="text-lg font-semibold text-white">Team directory</h2> <button id="team-refresh" class="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800">Refresh</button> </div> <p class="mt-2 text-sm text-slate-400">Profiles are auto-created for new Supabase users and linked to the primary agency.</p> <div class="mt-4 overflow-x-auto"> <table class="min-w-full text-left text-sm"> <thead class="text-xs uppercase tracking-wide text-slate-400"> <tr> <th class="px-4 py-3">Name</th> <th class="px-4 py-3">Email</th> <th class="px-4 py-3">Role</th> <th class="px-4 py-3">Timezone</th> </tr> </thead> <tbody id="team-table" class="divide-y divide-slate-800 text-slate-200"> <tr> <td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Loading team…</td> </tr> </tbody> </table> </div> </div> <div class="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-6 shadow-lg shadow-slate-950/40"> <h2 class="text-lg font-semibold text-white">Database schema</h2> <p class="mt-2 text-sm text-slate-400">
Run the SQL in <code class="text-blue-300">supabase/schema.sql</code> on your Supabase instance to provision tables, references and indexes used by this workspace.
</p> <a href="https://supabase.com/docs/guides/database/connecting" target="_blank" rel="noreferrer" class="mt-4 inline-flex items-center rounded-lg border border-blue-500/40 px-4 py-2 text-sm text-blue-300 hover:bg-blue-500/10">
Supabase docs ↗
</a> </div> </section> ` }));
}, "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/app/settings.astro", void 0);

const $$file = "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/pages/app/settings.astro";
const $$url = "/app/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
