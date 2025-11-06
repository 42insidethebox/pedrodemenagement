import type { APIRoute } from 'astro';

import { getDocumentSections } from '~/lib/google-docs';
import { sendProjectDelayedEmail, sendProjectReadyEmail } from '~/lib/email';
import { logAgencyActivity } from '~/utils/backend/activity';
import { getAgencyContext } from '~/utils/backend/context';
import {
  parseWebsiteUpdatePayload,
  parseWebsiteSectionPayload,
  parseWebsiteSectionUpdatePayload,
} from '~/utils/backend/validation';
import { getAdminClient } from '~/utils/supabase/admin';
import { withAuth } from '~/utils/supabase/auth';

export const prerender = false;

const SUPABASE_ERROR = 'Supabase admin client is not configured';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 64) || 'section';
}

async function loadWebsite(agencyId: string, websiteId: string) {
  const client = getAdminClient();
  const { data, error } = await client
    .from('websites')
    .select('*')
    .eq('agency_id', agencyId)
    .eq('id', websiteId)
    .maybeSingle();

  if (error) {
    console.error('Failed to load website', error);
    throw new Error('LOAD_FAILED');
  }

  return data;
}

async function loadSections(websiteId: string) {
  const client = getAdminClient();
  const { data, error } = await client
    .from('website_sections')
    .select('*')
    .eq('website_id', websiteId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to load website sections', error);
    throw new Error('LOAD_FAILED');
  }

  return data ?? [];
}

export const GET: APIRoute = withAuth(async ({ locals, params }) => {
  const websiteId = String(params.id || '');
  if (!websiteId) {
    return new Response(JSON.stringify({ error: 'Missing website id' }), { status: 400 });
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const website = await loadWebsite(agency.id, websiteId);
    if (!website) {
      return new Response(JSON.stringify({ error: 'Website not found' }), { status: 404 });
    }

    const sections = await loadSections(websiteId);
    return new Response(JSON.stringify({ website, sections }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to load website' }), { status: 500 });
    }
    console.error('Unexpected error in GET /api/backend/websites/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const PATCH: APIRoute = withAuth(async ({ locals, params, request }) => {
  const websiteId = String(params.id || '');
  if (!websiteId) {
    return new Response(JSON.stringify({ error: 'Missing website id' }), { status: 400 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), { status: 400 });
  }

  let updatePayload: ReturnType<typeof parseWebsiteUpdatePayload>;
  try {
    updatePayload = parseWebsiteUpdatePayload(body);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid website payload' }),
      { status: 400 },
    );
  }

  const syncFromDoc = Boolean(body?.syncFromDoc);
  const rawSections = syncFromDoc ? [] : Array.isArray(body?.sections) ? body.sections : [];
  const sectionsToInsert: any[] = [];
  const sectionsToUpdate: { id: string; data: ReturnType<typeof parseWebsiteSectionUpdatePayload> }[] = [];
  const sectionsToDelete: string[] = [];

  for (const rawSection of rawSections) {
    if (!rawSection || typeof rawSection !== 'object') continue;
    const action = typeof rawSection.action === 'string' ? rawSection.action : '';
    const id = typeof rawSection.id === 'string' ? rawSection.id : '';

    if (action === 'delete' && id) {
      sectionsToDelete.push(id);
      continue;
    }

    if (id) {
      try {
        const payload = parseWebsiteSectionUpdatePayload(rawSection);
        if (Object.keys(payload).length > 0) {
          if (payload.section_key) {
            payload.section_key = slugify(payload.section_key);
          } else if (payload.heading) {
            payload.section_key = slugify(payload.heading);
          }
          sectionsToUpdate.push({ id, data: payload });
        }
      } catch (error) {
        console.warn('Skipping invalid website section update', error);
      }
      continue;
    }

    try {
      const sectionKey =
        typeof rawSection.section_key === 'string'
          ? rawSection.section_key
          : typeof rawSection.heading === 'string'
          ? slugify(rawSection.heading)
          : slugify('section');
      const payload = parseWebsiteSectionPayload({ ...rawSection, section_key: sectionKey });
      sectionsToInsert.push({
        website_id: websiteId,
        section_key: slugify(payload.section_key),
        heading: payload.heading,
        content: payload.content,
        media: payload.media,
        google_doc_id: payload.google_doc_id,
        google_doc_heading: payload.google_doc_heading || payload.heading,
      });
    } catch (error) {
      console.warn('Skipping invalid website section payload', error);
    }
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();

    const existing = await loadWebsite(agency.id, websiteId);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Website not found' }), { status: 404 });
    }

    let updatedWebsite = existing;
    if (Object.keys(updatePayload).length > 0) {
      const { data, error } = await client
        .from('websites')
        .update(updatePayload)
        .eq('agency_id', agency.id)
        .eq('id', websiteId)
        .select('*')
        .single();

      if (error) {
        console.error('Failed to update website', error);
        return new Response(JSON.stringify({ error: 'Unable to update website' }), { status: 500 });
      }

      updatedWebsite = data;

      await logAgencyActivity(agency.id, 'website_updated', 'website', websiteId, {
        before_status: existing.status,
        after_status: data.status,
      });
    }

    if (sectionsToInsert.length) {
      await client.from('website_sections').insert(sectionsToInsert);
    }

    for (const entry of sectionsToUpdate) {
      const payload = { ...entry.data } as Record<string, unknown>;
      if (payload.section_key) {
        payload.section_key = slugify(String(payload.section_key));
      }
      const { error } = await client
        .from('website_sections')
        .update(payload)
        .eq('website_id', websiteId)
        .eq('id', entry.id);
      if (error) {
        console.error('Failed to update website section', { error, sectionId: entry.id });
      }
    }

    if (sectionsToDelete.length) {
      const { error } = await client
        .from('website_sections')
        .delete()
        .eq('website_id', websiteId)
        .in('id', sectionsToDelete);
      if (error) {
        console.error('Failed to delete website sections', error);
      }
    }

    if (syncFromDoc && updatedWebsite.google_doc_id) {
      const docSections = await getDocumentSections(updatedWebsite.google_doc_id);
      if (docSections.length) {
        await client.from('website_sections').delete().eq('website_id', websiteId);
        await client.from('website_sections').insert(
          docSections.map((section) => ({
            website_id: websiteId,
            section_key: slugify(section.heading),
            heading: section.heading,
            content: section.content,
            media: [],
            google_doc_id: updatedWebsite.google_doc_id,
            google_doc_heading: section.heading,
          })),
        );
        await logAgencyActivity(agency.id, 'website_synced', 'website', websiteId, {
          google_doc_id: updatedWebsite.google_doc_id,
          sections: docSections.length,
        });
      }
    }

    if (updatePayload.status && updatePayload.status !== existing.status && existing.client_id) {
      const { data: clientRecord } = await client
        .from('clients')
        .select('email, company_name, primary_contact')
        .eq('id', existing.client_id)
        .maybeSingle();
      const recipient = clientRecord?.email ?? null;
      if (recipient) {
        if (['ready', 'live'].includes(updatePayload.status)) {
          const previewUrl = updatePayload.preview_url ?? updatedWebsite.preview_url ?? '';
          if (previewUrl) {
            await sendProjectReadyEmail({
              to: recipient,
              projectName: updatedWebsite.name,
              previewUrl,
            });
          }
        } else if (updatePayload.status === 'paused') {
          const metadata = (updatePayload.metadata ?? updatedWebsite.metadata ?? {}) as Record<string, unknown>;
          const eta = typeof metadata.delay_eta === 'string' ? (metadata.delay_eta as string) : '';
          if (eta) {
            await sendProjectDelayedEmail({
              to: recipient,
              projectName: updatedWebsite.name,
              newEta: eta,
            });
          }
        }
      }
    }

    const sections = await loadSections(websiteId);
    return new Response(JSON.stringify({ website: updatedWebsite, sections }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to process website' }), { status: 500 });
    }
    console.error('Unexpected error in PATCH /api/backend/websites/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const DELETE: APIRoute = withAuth(async ({ locals, params }) => {
  const websiteId = String(params.id || '');
  if (!websiteId) {
    return new Response(JSON.stringify({ error: 'Missing website id' }), { status: 400 });
  }

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();

    const existing = await loadWebsite(agency.id, websiteId);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Website not found' }), { status: 404 });
    }

    const { error } = await client
      .from('websites')
      .delete()
      .eq('agency_id', agency.id)
      .eq('id', websiteId);

    if (error) {
      console.error('Failed to delete website', error);
      return new Response(JSON.stringify({ error: 'Unable to delete website' }), { status: 500 });
    }

    await logAgencyActivity(agency.id, 'website_deleted', 'website', websiteId, { name: existing.name });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    if (error instanceof Error && error.message === 'LOAD_FAILED') {
      return new Response(JSON.stringify({ error: 'Unable to delete website' }), { status: 500 });
    }
    console.error('Unexpected error in DELETE /api/backend/websites/[id]', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

