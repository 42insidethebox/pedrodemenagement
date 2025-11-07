import { g as getAgencyContext } from '../../../../chunks/context_DNXiXfuF.mjs';
import { a as parseDocumentUpdate } from '../../../../chunks/validation_B_1A_rZS.mjs';
import { g as getAdminClient } from '../../../../chunks/admin_D2MILzzI.mjs';
import { w as withAuth } from '../../../../chunks/auth_DDcfvRJZ.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const SUPABASE_ERROR = "Supabase admin client is not configured";
async function loadDocument(id, agencyId) {
  const client = getAdminClient();
  const { data, error } = await client.from("documents").select("*").eq("id", id).eq("agency_id", agencyId).maybeSingle();
  if (error) {
    console.error("Failed to load document", error);
    throw error;
  }
  if (!data) return null;
  return data;
}
const GET = withAuth(async ({ locals, params }) => {
  try {
    const context = await getAgencyContext(locals.user);
    const document = await loadDocument(params.id, context.agency.id);
    if (!document) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ document }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: "Supabase not configured" }), { status: 503 });
    }
    console.error("Unexpected error in GET /api/backend/documents/[id]", error);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500 });
  }
});
const PUT = withAuth(async ({ locals, params, request }) => {
  try {
    const context = await getAgencyContext(locals.user);
    const existing = await loadDocument(params.id, context.agency.id);
    if (!existing) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    let payload;
    try {
      payload = parseDocumentUpdate(await request.json());
    } catch (error2) {
      return new Response(JSON.stringify({ error: error2 instanceof Error ? error2.message : "Invalid payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const metadata = payload.metadata ?? existing.metadata ?? {};
    const client = getAdminClient();
    const { data, error } = await client.from("documents").update({
      ...payload,
      metadata
    }).eq("id", params.id).eq("agency_id", context.agency.id).select("*").single();
    if (error) {
      console.error("Failed to update document", error);
      return new Response(JSON.stringify({ error: "Unable to update document" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ document: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: "Supabase not configured" }), { status: 503 });
    }
    console.error("Unexpected error in PUT /api/backend/documents/[id]", error);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500 });
  }
});
const DELETE = withAuth(async ({ locals, params }) => {
  try {
    const context = await getAgencyContext(locals.user);
    const existing = await loadDocument(params.id, context.agency.id);
    if (!existing) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const client = getAdminClient();
    const { error } = await client.from("documents").delete().eq("id", params.id).eq("agency_id", context.agency.id);
    if (error) {
      console.error("Failed to delete document", error);
      return new Response(JSON.stringify({ error: "Unable to delete document" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return new Response(JSON.stringify({ error: "Supabase not configured" }), { status: 503 });
    }
    console.error("Unexpected error in DELETE /api/backend/documents/[id]", error);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500 });
  }
});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
