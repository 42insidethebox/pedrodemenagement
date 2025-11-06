import type { APIRoute } from 'astro';

import { provisionWebsiteWorkspace, getDocumentSections } from '~/lib/google-docs';
import { logAgencyActivity } from '~/utils/backend/activity';
import { getAgencyContext } from '~/utils/backend/context';
import { parseWebsitePayload, parseWebsiteSectionPayload } from '~/utils/backend/validation';
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

export const GET: APIRoute = withAuth(async ({ locals }) => {
  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();

    const { data: websites, error } = await client
      .from('websites')
      .select('*')
      .eq('agency_id', agency.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load websites', error);
      return new Response(JSON.stringify({ error: 'Unable to load websites' }), { status: 500 });
    }

    const ids = (websites ?? []).map((site) => site.id);
    let sectionsMap: Record<string, unknown[]> = {};

    if (ids.length > 0) {
      const { data: sections, error: sectionError } = await client
        .from('website_sections')
        .select('*')
        .in('website_id', ids);

      if (!sectionError && sections) {
        sectionsMap = sections.reduce<Record<string, unknown[]>>((acc, section) => {
          const key = section.website_id;
          if (!acc[key]) acc[key] = [];
          acc[key].push(section);
          return acc;
        }, {});
      }
    }

    const payload = (websites ?? []).map((site) => ({
      ...site,
      sections: sectionsMap[site.id] ?? [],
    }));

    return new Response(JSON.stringify({ websites: payload }), { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in GET /api/backend/websites', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

export const POST: APIRoute = withAuth(async ({ locals, request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), { status: 400 });
  }

  let websitePayload: ReturnType<typeof parseWebsitePayload>;
  try {
    websitePayload = parseWebsitePayload(body);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid website payload' }),
      { status: 400 },
    );
  }

  const sectionPayloads: ReturnType<typeof parseWebsiteSectionPayload>[] = Array.isArray(body?.sections)
    ? body.sections.map((section: unknown) => parseWebsiteSectionPayload(section))
    : [];

  try {
    const { agency } = await getAgencyContext(locals.user!);
    const client = getAdminClient();

    let googleDocId = websitePayload.google_doc_id;
    let googleFolderId = websitePayload.google_folder_id;

    if (!googleDocId) {
      const workspace = await provisionWebsiteWorkspace(websitePayload.name);
      if (workspace.docId) googleDocId = workspace.docId;
      if (workspace.folderId) googleFolderId = workspace.folderId;
    }

    const insertPayload = {
      ...websitePayload,
      agency_id: agency.id,
      google_doc_id: googleDocId,
      google_folder_id: googleFolderId,
    };

    const { data: website, error } = await client
      .from('websites')
      .insert(insertPayload)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to create website', error);
      return new Response(JSON.stringify({ error: 'Unable to save website' }), { status: 500 });
    }

    const sectionsToInsert: any[] = [];

    if (sectionPayloads.length) {
      sectionPayloads.forEach((section) => {
        sectionsToInsert.push({
          website_id: website.id,
          section_key: section.section_key || slugify(section.heading || 'section'),
          heading: section.heading,
          content: section.content,
          media: section.media,
          google_doc_id: section.google_doc_id || googleDocId,
          google_doc_heading: section.google_doc_heading || section.heading,
        });
      });
    } else if (googleDocId) {
      const docSections = await getDocumentSections(googleDocId);
      docSections.forEach((section) => {
        sectionsToInsert.push({
          website_id: website.id,
          section_key: slugify(section.heading),
          heading: section.heading,
          content: section.content,
          media: [],
          google_doc_id: googleDocId,
          google_doc_heading: section.heading,
        });
      });
    }

    if (sectionsToInsert.length) {
      await client.from('website_sections').insert(sectionsToInsert);
    }

    await logAgencyActivity(agency.id, 'website_created', 'website', website.id, {
      name: website.name,
      status: website.status,
    });

    return new Response(
      JSON.stringify({
        website,
        sections: sectionsToInsert,
      }),
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 503 });
    }
    console.error('Unexpected error in POST /api/backend/websites', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
});

