import type { APIRoute } from 'astro';

import { sendSupportTicketEmail, sendSupportConfirmationEmail } from '~/lib/email';
import { ENV } from '~/lib/env';
import { detectRequestLocale } from '~/lib/locale';
import { logAgencyActivity } from '~/utils/backend/activity';
import { getAgencyContext } from '~/utils/backend/context';
import { parseSupportRequestPayload } from '~/utils/backend/validation';
import { getAdminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const GET: APIRoute = withAuth(async ({ locals }) => {
  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();

    const { data, error } = await client
      .from('support_requests')
      .select('*')
      .eq('agency_id', agency.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load support requests', error);
      return new Response(JSON.stringify({ error: 'Unable to load support pipeline' }), { status: 500 });
    }

    return new Response(JSON.stringify({ requests: data ?? [] }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/support', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const POST: APIRoute = withAuth(async ({ locals, request }) => {
  let payload: ReturnType<typeof parseSupportRequestPayload>;

  try {
    const body = await request.json();
    payload = parseSupportRequestPayload(body);
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();

    const insertPayload = { ...payload, agency_id: agency.id };
    const { data, error } = await client
      .from('support_requests')
      .insert(insertPayload)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to create support request', error);
      return new Response(JSON.stringify({ error: 'Unable to create ticket' }), { status: 500 });
    }

    await logAgencyActivity(agency.id, 'support_request_created', 'support_request', data.id, {
      request_type: data.request_type,
      priority: data.priority,
    });

    const locale = detectRequestLocale(request, new URL(request.url));

    if (ENV.SUPPORT_EMAIL) {
      const summary = payload.description || payload.request_type;
      await sendSupportTicketEmail({
        to: ENV.SUPPORT_EMAIL,
        ticketId: data.id,
        summary,
        customerName: payload.customer_name,
        priority: payload.priority,
        locale,
      });
    }

    if (payload.customer_email) {
      const summary = payload.description || payload.request_type;
      await sendSupportConfirmationEmail({
        to: payload.customer_email,
        ticketId: data.id,
        summary,
        locale,
      });
    }

    return new Response(JSON.stringify({ request: data }), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in POST /api/backend/support', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

