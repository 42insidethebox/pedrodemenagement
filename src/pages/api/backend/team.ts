import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { getAdminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const GET: APIRoute = withAuth(async ({ locals }) => {
  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('agency_members')
      .select('*')
      .eq('agency_id', agency.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to load team', error);
      return new Response(JSON.stringify({ error: 'Unable to load team' }), { status: 500 });
    }

    return new Response(JSON.stringify({ team: data ?? [] }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/team', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
