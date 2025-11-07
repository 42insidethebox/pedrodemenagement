import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

export const GET: APIRoute = withAuth(async ({ locals }) => {
  const { agency, user, client } = await getAgencyContext(locals);
  const now = new Date();
  const nowIso = now.toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const parseCount = (label: string, result: { count: number | null; error: unknown }) => {
    if (result.error) {
      console.error(`Failed to load count for ${label}`, result.error);
      return 0;
    }
    return result.count ?? 0;
  };

  const [
    clientsResult,
    activeProjectsResult,
    liveWebsitesResult,
    overdueTasksResult,
    blockedTasksResult,
    inProgressTasksResult,
    invoicesResult,
    recentDocumentsResult,
    recentActivitiesResult,
  ] =
    await Promise.all([
      client
        .from('clients')
        .select('id', { count: 'exact', head: true })
        .eq('agency_id', agency.id),
      client
        .from('projects')
        .select('id', { count: 'exact', head: true })
        .eq('agency_id', agency.id)
        .neq('status', 'completed'),
      client
        .from('websites')
        .select('id', { count: 'exact', head: true })
        .eq('agency_id', agency.id)
        .eq('status', 'live'),
      client
        .from('tasks')
        .select('id', { count: 'exact', head: true })
        .eq('agency_id', agency.id)
        .not('status', 'eq', 'done')
        .not('due_date', 'is', null)
        .lt('due_date', nowIso),
      client
        .from('tasks')
        .select('id', { count: 'exact', head: true })
        .eq('agency_id', agency.id)
        .eq('status', 'blocked'),
      client
        .from('tasks')
        .select('id', { count: 'exact', head: true })
        .eq('agency_id', agency.id)
        .eq('status', 'in_progress'),
      client
        .from('invoices')
        .select('amount, status, issue_date, due_date')
        .eq('agency_id', agency.id),
      client
        .from('documents')
        .select('*')
        .eq('agency_id', agency.id)
        .order('created_at', { ascending: false })
        .limit(5),
      client
        .from('activities')
        .select('*')
        .eq('agency_id', agency.id)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

  const clientsCount = parseCount('clients', clientsResult);
  const activeProjectsCount = parseCount('projects', activeProjectsResult);
  const liveWebsitesCount = parseCount('websites-live', liveWebsitesResult);
  const overdueTasksCount = parseCount('tasks-overdue', overdueTasksResult);
  const blockedTasksCount = parseCount('tasks-blocked', blockedTasksResult);
  const inProgressTasksCount = parseCount('tasks-in-progress', inProgressTasksResult);

  const invoices = invoicesResult.error ? [] : invoicesResult.data ?? [];
  const outstandingAmount = invoices
    .filter((invoice) => invoice.status === 'sent' || invoice.status === 'overdue')
    .reduce((total, invoice) => total + (invoice.amount ?? 0), 0);

  const revenueLast30Days = invoices
    .filter((invoice) => invoice.status === 'paid' && invoice.issue_date >= thirtyDaysAgo)
    .reduce((total, invoice) => total + (invoice.amount ?? 0), 0);

  const documents = recentDocumentsResult.error ? [] : recentDocumentsResult.data ?? [];
  const activities = recentActivitiesResult.error ? [] : recentActivitiesResult.data ?? [];

  return new Response(
    JSON.stringify({
      agency,
      user,
      metrics: {
        clients: clientsCount,
        activeProjects: activeProjectsCount,
        liveWebsites: liveWebsitesCount,
        outstandingAmount,
        revenueLast30Days,
      },
      tasks: {
        overdue: overdueTasksCount,
        blocked: blockedTasksCount,
        inProgress: inProgressTasksCount,
      },
      documents,
      activities,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  );
});
