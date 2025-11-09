import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { parseClientUpdate } from '~/utils/backend/validation';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const GET: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing client id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const { data, error } = await client
      .from('clients')
      .select('*')
      .eq('id', id)
      .eq('agency_id', agency.id)
      .maybeSingle();

    if (error) {
      console.error('Failed to load client', error);
      return new Response(JSON.stringify({ error: 'Unable to load client' }), { status: 500 });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ client: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/clients/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing client id' }), { status: 400 });
  }

  let payload: ReturnType<typeof parseClientUpdate>;

  try {
    payload = parseClientUpdate(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const { data, error } = await client
      .from('clients')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Failed to update client', error);
      return new Response(JSON.stringify({ error: 'Unable to update client' }), { status: 500 });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404 });
    }

    await logAgencyActivity(client, agency.id, 'client_updated', 'client', data.id, {
      company_name: data.company_name,
      status: data.status,
    });

    return new Response(JSON.stringify({ client: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in PATCH /api/backend/clients/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing client id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const { data, error } = await client
      .from('clients')
      .delete()
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('id, company_name')
      .maybeSingle();

    if (error) {
      console.error('Failed to delete client', error);
      return new Response(JSON.stringify({ error: 'Unable to delete client' }), { status: 500 });
    }

    if (data) {
      await logAgencyActivity(client, agency.id, 'client_deleted', 'client', data.id, {
        company_name: data.company_name,
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in DELETE /api/backend/clients/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
