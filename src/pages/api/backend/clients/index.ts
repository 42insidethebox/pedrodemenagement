import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { parseClientPayload } from '~/utils/backend/validation';
import { getAdminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const GET: APIRoute = withAuth(async ({ locals }) => {
  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('clients')
      .select('*')
      .eq('agency_id', agency.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load clients', error);
      return new Response(JSON.stringify({ error: 'Unable to load clients' }), { status: 500 });
    }

    return new Response(JSON.stringify({ clients: data ?? [] }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/clients', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const POST: APIRoute = withAuth(async ({ locals, request }) => {
  let payload: ReturnType<typeof parseClientPayload>;

  try {
    payload = parseClientPayload(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();
    const { data, error } = await client
      .from('clients')
      .insert({ ...payload, agency_id: agency.id })
      .select('*')
      .single();

    if (error) {
      console.error('Failed to create client', error);
      return new Response(JSON.stringify({ error: 'Unable to save client' }), { status: 500 });
    }

    await logAgencyActivity(agency.id, 'client_created', 'client', data.id, {
      company_name: data.company_name,
      status: data.status,
    });

    return new Response(JSON.stringify({ client: data }), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in POST /api/backend/clients', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
