import { w as withAuth, g as getAgencyContext, a as adminClient } from '../../../../chunks/auth_BV2vXfx8.mjs';
export { renderers } from '../../../../renderers.mjs';

const documentSchema = {
  validate(input) {
    if (!input.title || typeof input.title !== "string") {
      throw new Error('Invalid document: missing or invalid "title"');
    }
    if (input.status && !["draft", "final", "archived"].includes(input.status)) {
      throw new Error('Invalid document: bad "status"');
    }
  }
};

function ensureRecord(record, table = "unknown") {
  return record;
}

const prerender = false;
const loadDocument = async (id, agencyId) => ensureRecord("documents", { });
const GET = withAuth(async ({ locals, params }) => {
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
});
const PUT = withAuth(async ({ locals, params, request }) => {
  const context = await getAgencyContext(locals.user);
  const existing = await loadDocument(params.id, context.agency.id);
  if (!existing) {
    return new Response(JSON.stringify({ error: "Document not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  const payload = documentSchema.partial().parse(await request.json());
  const metadata = payload.metadata;
  const { data, error } = await adminClient.from("documents").update({
    ...payload,
    metadata: metadata ?? existing.metadata
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
});
const DELETE = withAuth(async ({ locals, params }) => {
  const context = await getAgencyContext(locals.user);
  const existing = await loadDocument(params.id, context.agency.id);
  if (!existing) {
    return new Response(JSON.stringify({ error: "Document not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  const { error } = await adminClient.from("documents").delete().eq("id", params.id).eq("agency_id", context.agency.id);
  if (error) {
    console.error("Failed to delete document", error);
    return new Response(JSON.stringify({ error: "Unable to delete document" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(null, { status: 204 });
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
