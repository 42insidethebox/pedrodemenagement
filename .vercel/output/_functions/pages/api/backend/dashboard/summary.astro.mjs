import { w as withAuth, g as getAgencyContext, a as adminClient } from '../../../../chunks/auth_BV2vXfx8.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const GET = withAuth(async ({ locals }) => {
  const { agency, user } = await getAgencyContext(locals.user);
  const now = /* @__PURE__ */ new Date();
  const nowIso = now.toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3).toISOString();
  const parseCount = (label, result) => {
    if (result.error) {
      console.error(`Failed to load count for ${label}`, result.error);
      return 0;
    }
    return result.count ?? 0;
  };
  const [
    clientsResult,
    activeProjectsResult,
    overdueTasksResult,
    blockedTasksResult,
    inProgressTasksResult,
    invoicesResult,
    recentDocumentsResult,
    recentActivitiesResult
  ] = await Promise.all([
    adminClient.from("clients").select("id", { count: "exact", head: true }).eq("agency_id", agency.id),
    adminClient.from("projects").select("id", { count: "exact", head: true }).eq("agency_id", agency.id).neq("status", "completed"),
    adminClient.from("tasks").select("id", { count: "exact", head: true }).eq("agency_id", agency.id).not("status", "eq", "done").not("due_date", "is", null).lt("due_date", nowIso),
    adminClient.from("tasks").select("id", { count: "exact", head: true }).eq("agency_id", agency.id).eq("status", "blocked"),
    adminClient.from("tasks").select("id", { count: "exact", head: true }).eq("agency_id", agency.id).eq("status", "in_progress"),
    adminClient.from("invoices").select("amount, status, issue_date, due_date").eq("agency_id", agency.id),
    adminClient.from("documents").select("*").eq("agency_id", agency.id).order("created_at", { ascending: false }).limit(5),
    adminClient.from("activities").select("*").eq("agency_id", agency.id).order("created_at", { ascending: false }).limit(10)
  ]);
  const clientsCount = parseCount("clients", clientsResult);
  const activeProjectsCount = parseCount("projects", activeProjectsResult);
  const overdueTasksCount = parseCount("tasks-overdue", overdueTasksResult);
  const blockedTasksCount = parseCount("tasks-blocked", blockedTasksResult);
  const inProgressTasksCount = parseCount("tasks-in-progress", inProgressTasksResult);
  const invoices = invoicesResult.error ? [] : invoicesResult.data ?? [];
  const outstandingAmount = invoices.filter((invoice) => invoice.status === "sent" || invoice.status === "overdue").reduce((total, invoice) => total + (invoice.amount ?? 0), 0);
  const revenueLast30Days = invoices.filter((invoice) => invoice.status === "paid" && invoice.issue_date >= thirtyDaysAgo).reduce((total, invoice) => total + (invoice.amount ?? 0), 0);
  const documents = recentDocumentsResult.error ? [] : recentDocumentsResult.data ?? [];
  const activities = recentActivitiesResult.error ? [] : recentActivitiesResult.data ?? [];
  return new Response(
    JSON.stringify({
      agency,
      user,
      metrics: {
        clients: clientsCount,
        activeProjects: activeProjectsCount,
        outstandingAmount,
        revenueLast30Days
      },
      tasks: {
        overdue: overdueTasksCount,
        blocked: blockedTasksCount,
        inProgress: inProgressTasksCount
      },
      documents,
      activities
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
