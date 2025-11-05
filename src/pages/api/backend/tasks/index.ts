import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { parseTaskPayload } from '~/utils/backend/validation';
import { getAdminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const GET: APIRoute = withAuth(async ({ locals }) => {
  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('tasks')
      .select('*')
      .eq('agency_id', agency.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load tasks', error);
      return new Response(JSON.stringify({ error: 'Unable to load tasks' }), { status: 500 });
    }

    return new Response(JSON.stringify({ tasks: data ?? [] }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/tasks', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const POST: APIRoute = withAuth(async ({ locals, request }) => {
  let payload: ReturnType<typeof parseTaskPayload>;

  try {
    payload = parseTaskPayload(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('tasks')
      .insert({ ...payload, agency_id: agency.id })
      .select('*')
      .single();

    if (error) {
      console.error('Failed to create task', error);
      return new Response(JSON.stringify({ error: 'Unable to save task' }), { status: 500 });
    }

    await logAgencyActivity(agency.id, 'task_created', 'task', data.id, {
      title: data.title,
      status: data.status,
    });

    return new Response(JSON.stringify({ task: data }), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in POST /api/backend/tasks', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
