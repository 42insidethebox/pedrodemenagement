import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing project id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const { data, error } = await client
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('id, name')
      .maybeSingle();

    if (error) {
      console.error('Failed to delete project', error);
      return new Response(JSON.stringify({ error: 'Unable to delete project' }), { status: 500 });
    }

    if (data) {
      await logAgencyActivity(client, agency.id, 'project_deleted', 'project', data.id, {
        name: data.name,
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in DELETE /api/backend/projects/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
