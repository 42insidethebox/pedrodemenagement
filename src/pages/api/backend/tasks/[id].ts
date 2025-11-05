import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { getAdminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing task id' }), { status: 400 });
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('id, title')
      .maybeSingle();

    if (error) {
      console.error('Failed to delete task', error);
      return new Response(JSON.stringify({ error: 'Unable to delete task' }), { status: 500 });
    }

    if (data) {
      await logAgencyActivity(agency.id, 'task_deleted', 'task', data.id, {
        title: data.title,
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in DELETE /api/backend/tasks/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
