import type { APIRoute } from 'astro';

import type { SupabaseClient } from '@supabase/supabase-js';

import { logAgencyActivity } from '~/utils/backend/activity';
import { getAgencyContext } from '~/utils/backend/context';
import { parseSupportRequestUpdatePayload } from '~/utils/backend/validation';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

async function loadSupportRequest(client: SupabaseClient, agencyId: string, id: string) {
  const { data, error } = await client
    .from('support_requests')
    .select('*')
    .eq('agency_id', agencyId)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Failed to load support request', error);
    throw new Error('LOAD_FAILED');
  }

  return data;
}

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  const ticketId = String(params.id || '');
  if (!ticketId) {
    return new Response(JSON.stringify({ error: 'Missing ticket id' }), { status: 400 });
  }

  let payload: ReturnType<typeof parseSupportRequestUpdatePayload>;
  try {
    payload = parseSupportRequestUpdatePayload(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);

    const existing = await loadSupportRequest(client, agency.id, ticketId);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Support request not found' }), { status: 404 });
    }

    if (Object.keys(payload).length === 0) {
      return new Response(JSON.stringify({ request: existing }), { status: 200 });
    }

    const { data, error } = await client
      .from('support_requests')
      .update(payload)
      .eq('agency_id', agency.id)
      .eq('id', ticketId)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to update support request', error);
      return new Response(JSON.stringify({ error: 'Unable to update ticket' }), { status: 500 });
    }

    await logAgencyActivity(client, agency.id, 'support_request_updated', 'support_request', ticketId, {
      before_status: existing.status,
      after_status: data.status,
      priority: data.priority,
    });

    return new Response(JSON.stringify({ request: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to process ticket' }), { status: 500 });
    }
    console.error('Unexpected error in PATCH /api/backend/support/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const ticketId = String(params.id || '');
  if (!ticketId) {
    return new Response(JSON.stringify({ error: 'Missing ticket id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);

    const existing = await loadSupportRequest(client, agency.id, ticketId);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Support request not found' }), { status: 404 });
    }

    const { error } = await client
      .from('support_requests')
      .delete()
      .eq('agency_id', agency.id)
      .eq('id', ticketId);

    if (error) {
      console.error('Failed to delete support request', error);
      return new Response(JSON.stringify({ error: 'Unable to delete ticket' }), { status: 500 });
    }

    await logAgencyActivity(client, agency.id, 'support_request_deleted', 'support_request', ticketId, {
      request_type: existing.request_type,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to process ticket' }), { status: 500 });
    }
    console.error('Unexpected error in DELETE /api/backend/support/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

