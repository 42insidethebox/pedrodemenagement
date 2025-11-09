import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import type { SupabaseClient } from '@supabase/supabase-js';

import { logAgencyActivity } from '~/utils/backend/activity';
import { parseInvoiceUpdate } from '~/utils/backend/validation';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

type InvoiceRecord = {
  id: string;
  agency_id: string;
  client_id: string | null;
  project_id: string | null;
  invoice_number: string;
  status: string;
  issue_date: string | null;
  due_date: string | null;
  currency: string | null;
  amount: number | null;
  line_items: Array<Record<string, unknown>> | null;
  notes: string | null;
};

async function loadInvoice(client: SupabaseClient, agencyId: string, id: string) {
  const { data, error } = await client
    .from('invoices')
    .select('*')
    .eq('id', id)
    .eq('agency_id', agencyId)
    .maybeSingle();

  if (error) {
    console.error('Failed to load invoice', error);
    throw error;
  }

  return (data as InvoiceRecord | null) ?? null;
}

export const GET: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing invoice id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const invoice = await loadInvoice(client, agency.id, id);

    if (!invoice) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ invoice }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/invoices/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing invoice id' }), { status: 400 });
  }

  let payload: ReturnType<typeof parseInvoiceUpdate>;

  try {
    payload = parseInvoiceUpdate(await request.json());
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid payload' }), {
      status: 400,
    });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const existing = await loadInvoice(client, agency.id, id);

    if (!existing) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), { status: 404 });
    }

    const { data, error } = await client
      .from('invoices')
      .update(payload)
      .eq('id', id)
      .eq('agency_id', agency.id)
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Failed to update invoice', error);
      return new Response(JSON.stringify({ error: 'Unable to update invoice' }), { status: 500 });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), { status: 404 });
    }

    await logAgencyActivity(client, agency.id, 'invoice_updated', 'invoice', id, {
      previous_status: existing.status,
      new_status: (data as InvoiceRecord).status,
      amount: (data as InvoiceRecord).amount,
    });

    return new Response(JSON.stringify({ invoice: data }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in PATCH /api/backend/invoices/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing invoice id' }), { status: 400 });
  }

  try {
    const { agency, client } = await getAgencyContext(locals);
    const existing = await loadInvoice(client, agency.id, id);

    if (!existing) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), { status: 404 });
    }

    const { error } = await client
      .from('invoices')
      .delete()
      .eq('id', id)
      .eq('agency_id', agency.id);

    if (error) {
      console.error('Failed to delete invoice', error);
      return new Response(JSON.stringify({ error: 'Unable to delete invoice' }), { status: 500 });
    }

    await logAgencyActivity(client, agency.id, 'invoice_deleted', 'invoice', id, {
      invoice_number: existing.invoice_number,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in DELETE /api/backend/invoices/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});
