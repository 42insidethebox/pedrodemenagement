import type { APIRoute } from 'astro';

import type { SupabaseClient } from '@supabase/supabase-js';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { parseProjectUpdate } from '~/utils/backend/validation';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

type ProjectRecord = {
  id: string;
  agency_id: string;
  client_id: string | null;
  name: string;
  status: string;
  start_date: string | null;
  due_date: string | null;
  budget: number | null;
  currency: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
};

async function loadProject(client: SupabaseClient, agencyId: string, projectId: string) {
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('agency_id', agencyId)
    .maybeSingle();

  if (error) {
    console.error('Failed to load project', error);
    throw error;
  }

  return (data as ProjectRecord | null) ?? null;
}

export const GET: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing project id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const project = await loadProject(client, agency.id, id);

    if (!project) {
      return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ project }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/projects/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing project id' }), { status: 400 });
  }

  let payload: ReturnType<typeof parseProjectUpdate>;

  try {
    payload = parseProjectUpdate(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const existing = await loadProject(client, agency.id, id);

    if (!existing) {
      return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
    }

    const updatePayload = { ...payload } as Record<string, unknown>;
    if (!updatePayload.metadata) {
      delete updatePayload.metadata;
    }

    const { data, error } = await client
      .from('projects')
      .update(updatePayload)
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Failed to update project', error);
      return new Response(JSON.stringify({ error: 'Unable to update project' }), { status: 500 });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
    }

    await logAgencyActivity(client, agency.id, 'project_updated', 'project', id, {
      previous_status: existing.status,
      new_status: (data as ProjectRecord).status,
      budget: (data as ProjectRecord).budget,
    });

    return new Response(JSON.stringify({ project: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in PATCH /api/backend/projects/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing project id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const existing = await loadProject(client, agency.id, id);

    if (!existing) {
      return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
    }

    const { error } = await client
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('agency_id', agency.id);

    if (error) {
      console.error('Failed to delete project', error);
      return new Response(JSON.stringify({ error: 'Unable to delete project' }), { status: 500 });
    }

    await logAgencyActivity(client, agency.id, 'project_deleted', 'project', id, {
      name: existing.name,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in DELETE /api/backend/projects/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
