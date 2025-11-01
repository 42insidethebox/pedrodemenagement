import type { APIRoute } from 'astro';

import { getAgencyContext } from '~/utils/backend/context';
import { documentSchema, type DocumentInput } from '~/utils/backend/validation';
import { adminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';
import { ensureRecord } from '~/utils/backend/repository';

type DocumentRecord = DocumentInput & {
  id: string;
  agency_id: string;
  created_at?: string;
  updated_at?: string;
};

const loadDocument = async (id: string, agencyId: string) =>
  ensureRecord<DocumentRecord>('documents', { id, agency_id: agencyId });

export const GET: APIRoute = withAuth(async ({ locals, params }) => {
  const context = await getAgencyContext(locals.user!);
  const document = await loadDocument(params.id!, context.agency.id);

  if (!document) {
    return new Response(JSON.stringify({ error: 'Document not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ document }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

export const PUT: APIRoute = withAuth(async ({ locals, params, request }) => {
  const context = await getAgencyContext(locals.user!);
  const existing = await loadDocument(params.id!, context.agency.id);

  if (!existing) {
    return new Response(JSON.stringify({ error: 'Document not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const payload: Partial<DocumentInput> = documentSchema.partial().parse(await request.json());
  const metadata = (payload as Partial<DocumentInput> & { metadata?: DocumentInput['metadata'] }).metadata;

  const { data, error } = await adminClient
    .from('documents')
    .update({
      ...payload,
      metadata: metadata ?? existing.metadata,
    })
    .eq('id', params.id!)
    .eq('agency_id', context.agency.id)
    .select('*')
    .single();

  if (error) {
    console.error('Failed to update document', error);
    return new Response(JSON.stringify({ error: 'Unable to update document' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ document: data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const context = await getAgencyContext(locals.user!);
  const existing = await loadDocument(params.id!, context.agency.id);

  if (!existing) {
    return new Response(JSON.stringify({ error: 'Document not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error } = await adminClient
    .from('documents')
    .delete()
    .eq('id', params.id!)
    .eq('agency_id', context.agency.id);

  if (error) {
    console.error('Failed to delete document', error);
    return new Response(JSON.stringify({ error: 'Unable to delete document' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(null, { status: 204 });
});
