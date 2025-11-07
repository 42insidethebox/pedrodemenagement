import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { logAgencyActivity } from '~/utils/backend/activity';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing invoice id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const { data, error } = await client
      .from('invoices')
      .delete()
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('id, invoice_number')
      .maybeSingle();

    if (error) {
      console.error('Failed to delete invoice', error);
      return new Response(JSON.stringify({ error: 'Unable to delete invoice' }), { status: 500 });
    }

    if (data) {
      await logAgencyActivity(client, agency.id, 'invoice_deleted', 'invoice', data.id, {
        invoice_number: data.invoice_number,
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in DELETE /api/backend/invoices/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
