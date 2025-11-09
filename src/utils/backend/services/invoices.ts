// src/utils/backend/services/invoices.ts
import type { SupabaseClient } from '@supabase/supabase-js';

import { ApiError } from '../http';
import type { InvoiceInput } from '../validation';

export interface InvoiceRecord {
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
  line_items: InvoiceInput['line_items'] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ListInvoicesOptions {
  page: number;
  pageSize: number;
  status?: string;
  clientId?: string;
  projectId?: string;
  search?: string | null;
}

export interface ListInvoicesResult {
  invoices: InvoiceRecord[];
  total: number;
}

function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%_,]/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function listInvoices(
  client: SupabaseClient,
  agencyId: string,
  options: ListInvoicesOptions,
): Promise<ListInvoicesResult> {
  const page = Math.max(1, options.page);
  const pageSize = Math.max(1, options.pageSize);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = client
    .from('invoices')
    .select('*', { count: 'exact' })
    .eq('agency_id', agencyId);

  if (options.status) {
    query = query.eq('status', options.status);
  }

  if (options.clientId) {
    query = query.eq('client_id', options.clientId);
  }

  if (options.projectId) {
    query = query.eq('project_id', options.projectId);
  }

  if (options.search) {
    const sanitized = sanitizeSearchTerm(options.search);
    if (sanitized) {
      const pattern = `%${sanitized.replace(/[%_]/g, '')}%`;
      query = query.or(
        ['invoice_number', 'notes']
          .map((column) => `${column}.ilike.${pattern}`)
          .join(','),
      );
    }
  }

  const { data, error, count } = await query
    .order('issue_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Failed to list invoices', error);
    throw new ApiError(500, 'Unable to load invoices');
  }

  return {
    invoices: (data ?? []) as InvoiceRecord[],
    total: count ?? 0,
  };
}

export async function getInvoiceById(
  client: SupabaseClient,
  agencyId: string,
  id: string,
): Promise<InvoiceRecord> {
  const { data, error } = await client
    .from('invoices')
    .select('*')
    .eq('id', id)
    .eq('agency_id', agencyId)
    .maybeSingle();

  if (error) {
    console.error('Failed to load invoice', error);
    throw new ApiError(500, 'Unable to load invoice');
  }

  if (!data) {
    throw new ApiError(404, 'Invoice not found');
  }

  return data as InvoiceRecord;
}

export async function createInvoice(
  client: SupabaseClient,
  agencyId: string,
  payload: InvoiceInput,
): Promise<InvoiceRecord> {
  const { data, error } = await client
    .from('invoices')
    .insert({ ...payload, agency_id: agencyId })
    .select('*')
    .single();

  if (error) {
    console.error('Failed to create invoice', error);
    throw new ApiError(500, 'Unable to save invoice');
  }

  return data as InvoiceRecord;
}

export async function updateInvoice(
  client: SupabaseClient,
  agencyId: string,
  id: string,
  payload: Partial<InvoiceInput>,
): Promise<InvoiceRecord> {
  const updatePayload = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('invoices')
    .update(updatePayload)
    .eq('id', id)
    .eq('agency_id', agencyId)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to update invoice', error);
    throw new ApiError(500, 'Unable to update invoice');
  }

  if (!data) {
    throw new ApiError(404, 'Invoice not found');
  }

  return data as InvoiceRecord;
}

export async function deleteInvoice(
  client: SupabaseClient,
  agencyId: string,
  id: string,
): Promise<Pick<InvoiceRecord, 'id' | 'invoice_number'>> {
  const { data, error } = await client
    .from('invoices')
    .delete()
    .eq('id', id)
    .eq('agency_id', agencyId)
    .select('id, invoice_number')
    .maybeSingle();

  if (error) {
    console.error('Failed to delete invoice', error);
    throw new ApiError(500, 'Unable to delete invoice');
  }

  if (!data) {
    throw new ApiError(404, 'Invoice not found');
  }

  return data as Pick<InvoiceRecord, 'id' | 'invoice_number'>;
}
