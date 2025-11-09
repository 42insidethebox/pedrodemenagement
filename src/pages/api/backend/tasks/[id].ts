import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { parseTaskUpdate } from '~/utils/backend/validation';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const GET: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing task id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const { data, error } = await client
      .from('tasks')
      .select('*')
      .eq('id', id)
      .eq('agency_id', agency.id)
      .maybeSingle();

    if (error) {
      console.error('Failed to load task', error);
      return new Response(JSON.stringify({ error: 'Unable to load task' }), { status: 500 });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ task: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/tasks/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing task id' }), { status: 400 });
  }

  let payload: ReturnType<typeof parseTaskUpdate>;

  try {
    payload = parseTaskUpdate(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const { data, error } = await client
      .from('tasks')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Failed to update task', error);
      return new Response(JSON.stringify({ error: 'Unable to update task' }), { status: 500 });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }

    await logAgencyActivity(client, agency.id, 'task_updated', 'task', data.id, {
      title: data.title,
      status: data.status,
      priority: data.priority,
    });

    return new Response(JSON.stringify({ task: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in PATCH /api/backend/tasks/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing task id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
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
      await logAgencyActivity(client, agency.id, 'task_deleted', 'task', data.id, {
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
