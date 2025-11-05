import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { parseProjectPayload } from '~/utils/backend/validation';
import { getAdminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const GET: APIRoute = withAuth(async ({ locals }) => {
  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('projects')
      .select('*')
      .eq('agency_id', agency.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load projects', error);
      return new Response(JSON.stringify({ error: 'Unable to load projects' }), { status: 500 });
    }

    return new Response(JSON.stringify({ projects: data ?? [] }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/projects', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const POST: APIRoute = withAuth(async ({ locals, request }) => {
  let payload: ReturnType<typeof parseProjectPayload>;

  try {
    payload = parseProjectPayload(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('projects')
      .insert({ ...payload, agency_id: agency.id })
      .select('*')
      .single();

    if (error) {
      console.error('Failed to create project', error);
      return new Response(JSON.stringify({ error: 'Unable to save project' }), { status: 500 });
    }

    await logAgencyActivity(agency.id, 'project_created', 'project', data.id, {
      name: data.name,
      status: data.status,
    });

    return new Response(JSON.stringify({ project: data }), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in POST /api/backend/projects', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
