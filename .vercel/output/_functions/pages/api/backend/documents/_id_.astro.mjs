import { l as logAgencyActivity } from '../../../../chunks/activity__EFcq8Am.mjs';
import { g as getAgencyContext } from '../../../../chunks/context_C5WovHz2.mjs';
import { b as badRequest, o as ok, s as serviceUnavailable, h as handleApiError, n as noContent } from '../../../../chunks/http_DzTdw9sP.mjs';
import { g as getDocumentById, u as updateDocument, d as deleteDocument } from '../../../../chunks/documents_BjVsGtHw.mjs';
import { b as parseDocumentUpdate } from '../../../../chunks/validation_DDAwkv1e.mjs';
import { w as withAuth } from '../../../../chunks/auth_DY46_O_j.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const SUPABASE_ERROR = "Supabase admin client is not configured";
const GET = withAuth(async ({ locals, params }) => {
  const id = params.id;
  if (!id) {
    return badRequest("Missing document id");
  }
  try {
    const { agency, client } = await getAgencyContext(locals);
    const document = await getDocumentById(client, agency.id, id);
    return ok({ document });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return serviceUnavailable("Supabase not configured");
    }
    return handleApiError(error, "Unexpected error in GET /api/backend/documents/[id]");
  }
});
const PUT = withAuth(async ({ locals, params, request }) => {
  const id = params.id;
  if (!id) {
    return badRequest("Missing document id");
  }
  let payload;
  try {
    payload = parseDocumentUpdate(await request.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid payload";
    return badRequest(message);
  }
  try {
    const { agency, client } = await getAgencyContext(locals);
    const existing = await getDocumentById(client, agency.id, id);
    const metadata = payload.metadata ?? existing.metadata ?? {};
    const updated = await updateDocument(client, agency.id, id, { ...payload, metadata });
    await logAgencyActivity(client, agency.id, "document_updated", "document", updated.id, {
      title: updated.title,
      document_type: updated.document_type,
      status: updated.status
    });
    return ok({ document: updated });
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return serviceUnavailable("Supabase not configured");
    }
    return handleApiError(error, "Unexpected error in PUT /api/backend/documents/[id]");
  }
});
const DELETE = withAuth(async ({ locals, params }) => {
  const id = params.id;
  if (!id) {
    return badRequest("Missing document id");
  }
  try {
    const { agency, client } = await getAgencyContext(locals);
    const deleted = await deleteDocument(client, agency.id, id);
    await logAgencyActivity(client, agency.id, "document_deleted", "document", deleted.id, {
      title: deleted.title,
      document_type: deleted.document_type
    });
    return noContent();
  } catch (error) {
    if (error instanceof Error && error.message === SUPABASE_ERROR) {
      return serviceUnavailable("Supabase not configured");
    }
    return handleApiError(error, "Unexpected error in DELETE /api/backend/documents/[id]");
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
