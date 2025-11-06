// src/utils/backend/validation.ts

type Primitive = string | number | boolean | null;

function ensureString(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing or invalid "${field}"`);
  }
  return value.trim();
}

function ensureOptionalString(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'string') {
    throw new Error('Expected a string');
  }
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function ensureEnum<T extends string>(value: unknown, _field: string, allowed: readonly T[], fallback: T): T {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim().toLowerCase() as T;
  return allowed.includes(normalized) ? normalized : fallback;
}

function ensureArrayOfStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
}

function ensureNumber(value: unknown, field: string): number {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(numeric)) {
    throw new Error(`Invalid number for "${field}"`);
  }
  return numeric;
}

function ensureOptionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    throw new Error('Invalid numeric value');
  }
  return numeric;
}

function ensureDateString(value: unknown, field: string, allowNull = false): string | null {
  if ((value === null || value === undefined || value === '') && allowNull) return null;
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing or invalid "${field}"`);
  }
  return value;
}

function ensureObject(value: unknown, field: string): Record<string, Primitive | Primitive[] | Record<string, unknown>> {
  if (value === null || value === undefined) return {};
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Invalid object for "${field}"`);
  }
  return value as Record<string, Primitive | Primitive[] | Record<string, unknown>>;
}

const DOCUMENT_STATUSES = ['draft', 'sent', 'signed', 'archived'] as const;
const DOCUMENT_TYPES = ['proposal', 'contract', 'brief', 'report', 'asset'] as const;
const CLIENT_STATUSES = ['lead', 'active', 'inactive'] as const;
const PROJECT_STATUSES = ['discovery', 'in_progress', 'on_hold', 'completed'] as const;
const TASK_STATUSES = ['todo', 'in_progress', 'blocked', 'done'] as const;
const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;
const INVOICE_STATUSES = ['draft', 'sent', 'paid', 'overdue'] as const;
const WEBSITE_STATUSES = ['draft', 'content_review', 'ready', 'live', 'paused'] as const;
const SUPPORT_STATUSES = ['open', 'in_progress', 'waiting', 'resolved', 'closed'] as const;
const SUPPORT_PRIORITIES = ['low', 'normal', 'high', 'urgent'] as const;
const SUPPORT_TYPES = ['bug', 'content_change', 'design', 'upgrade', 'billing', 'general'] as const;

export type DocumentInput = {
  title: string;
  document_type: typeof DOCUMENT_TYPES[number];
  status: typeof DOCUMENT_STATUSES[number];
  storage_path: string;
  metadata: Record<string, unknown>;
};

export function parseDocumentPayload(payload: unknown): DocumentInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid document payload');
  }

  const body = payload as Record<string, unknown>;
  return {
    title: ensureString(body.title, 'title'),
    document_type: ensureEnum(body.document_type, 'document_type', DOCUMENT_TYPES, 'proposal'),
    status: ensureEnum(body.status, 'status', DOCUMENT_STATUSES, 'draft'),
    storage_path: ensureString(body.storage_path, 'storage_path'),
    metadata: ensureObject(body.metadata, 'metadata'),
  };
}

export function parseDocumentUpdate(payload: unknown): Partial<DocumentInput> {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid document payload');
  }

  const body = payload as Record<string, unknown>;
  const result: Partial<DocumentInput> = {};

  if (body.title !== undefined) result.title = ensureString(body.title, 'title');
  if (body.document_type !== undefined)
    result.document_type = ensureEnum(body.document_type, 'document_type', DOCUMENT_TYPES, 'proposal');
  if (body.status !== undefined) result.status = ensureEnum(body.status, 'status', DOCUMENT_STATUSES, 'draft');
  if (body.storage_path !== undefined) result.storage_path = ensureString(body.storage_path, 'storage_path');
  if (body.metadata !== undefined) result.metadata = ensureObject(body.metadata, 'metadata');

  return result;
}

export type ClientInput = {
  company_name: string;
  primary_contact: string | null;
  email: string | null;
  phone: string | null;
  status: typeof CLIENT_STATUSES[number];
  services: string[];
  notes: string | null;
  metadata?: Record<string, unknown>;
};

export function parseClientPayload(payload: unknown): ClientInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid client payload');
  }

  const body = payload as Record<string, unknown>;
  const email = ensureOptionalString(body.email);

  if (email && !/.+@.+\..+/.test(email)) {
    throw new Error('Invalid email address');
  }

  return {
    company_name: ensureString(body.company_name, 'company_name'),
    primary_contact: ensureOptionalString(body.primary_contact),
    email,
    phone: ensureOptionalString(body.phone),
    status: ensureEnum(body.status, 'status', CLIENT_STATUSES, 'lead'),
    services: ensureArrayOfStrings(body.services),
    notes: ensureOptionalString(body.notes),
    metadata: ensureObject(body.metadata, 'metadata'),
  };
}

export type ProjectInput = {
  name: string;
  client_id: string;
  status: typeof PROJECT_STATUSES[number];
  start_date: string | null;
  due_date: string | null;
  budget: number | null;
  currency: string | null;
  notes: string | null;
};

export function parseProjectPayload(payload: unknown): ProjectInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid project payload');
  }

  const body = payload as Record<string, unknown>;
  return {
    name: ensureString(body.name, 'name'),
    client_id: ensureString(body.client_id, 'client_id'),
    status: ensureEnum(body.status, 'status', PROJECT_STATUSES, 'discovery'),
    start_date: ensureDateString(body.start_date, 'start_date', true),
    due_date: ensureDateString(body.due_date, 'due_date', true),
    budget: ensureOptionalNumber(body.budget),
    currency: ensureOptionalString(body.currency),
    notes: ensureOptionalString(body.notes),
  };
}

export type TaskInput = {
  title: string;
  project_id: string;
  assignee_id: string | null;
  status: typeof TASK_STATUSES[number];
  priority: typeof TASK_PRIORITIES[number];
  due_date: string | null;
  description: string | null;
};

export function parseTaskPayload(payload: unknown): TaskInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid task payload');
  }

  const body = payload as Record<string, unknown>;
  return {
    title: ensureString(body.title, 'title'),
    project_id: ensureString(body.project_id, 'project_id'),
    assignee_id: ensureOptionalString(body.assignee_id),
    status: ensureEnum(body.status, 'status', TASK_STATUSES, 'todo'),
    priority: ensureEnum(body.priority, 'priority', TASK_PRIORITIES, 'medium'),
    due_date: ensureDateString(body.due_date, 'due_date', true),
    description: ensureOptionalString(body.description),
  };
}

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unit_amount: number;
};

export type WebsiteInput = {
  name: string;
  client_id: string | null;
  status: typeof WEBSITE_STATUSES[number];
  domain: string | null;
  preview_url: string | null;
  production_url: string | null;
  google_doc_id: string | null;
  google_folder_id: string | null;
  template_key: string | null;
  metadata: Record<string, unknown>;
};

export function parseWebsitePayload(payload: unknown): WebsiteInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid website payload');
  }

  const body = payload as Record<string, unknown>;
  const domain = ensureOptionalString(body.domain);
  const preview = ensureOptionalString(body.preview_url);
  const production = ensureOptionalString(body.production_url);

  const normalizedDomain = domain && !domain.startsWith('http') ? `https://${domain}` : domain;
  const normalizedPreview = preview && !preview.startsWith('http') ? `https://${preview}` : preview;
  const normalizedProduction = production && !production.startsWith('http') ? `https://${production}` : production;

  return {
    name: ensureString(body.name, 'name'),
    client_id: ensureOptionalString(body.client_id),
    status: ensureEnum(body.status, 'status', WEBSITE_STATUSES, 'draft'),
    domain: normalizedDomain,
    preview_url: normalizedPreview,
    production_url: normalizedProduction,
    google_doc_id: ensureOptionalString(body.google_doc_id),
    google_folder_id: ensureOptionalString(body.google_folder_id),
    template_key: ensureOptionalString(body.template_key),
    metadata: ensureObject(body.metadata, 'metadata'),
  };
}

export function parseWebsiteUpdatePayload(payload: unknown): Partial<WebsiteInput> {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid website payload');
  }

  const body = payload as Record<string, unknown>;
  const result: Partial<WebsiteInput> = {};

  if (body.name !== undefined) result.name = ensureString(body.name, 'name');
  if (body.client_id !== undefined) result.client_id = ensureOptionalString(body.client_id);
  if (body.status !== undefined) result.status = ensureEnum(body.status, 'status', WEBSITE_STATUSES, 'draft');

  if (body.domain !== undefined) {
    const domain = ensureOptionalString(body.domain);
    result.domain = domain && !domain.startsWith('http') ? `https://${domain}` : domain;
  }
  if (body.preview_url !== undefined) {
    const preview = ensureOptionalString(body.preview_url);
    result.preview_url = preview && !preview.startsWith('http') ? `https://${preview}` : preview;
  }
  if (body.production_url !== undefined) {
    const prod = ensureOptionalString(body.production_url);
    result.production_url = prod && !prod.startsWith('http') ? `https://${prod}` : prod;
  }
  if (body.google_doc_id !== undefined) result.google_doc_id = ensureOptionalString(body.google_doc_id);
  if (body.google_folder_id !== undefined)
    result.google_folder_id = ensureOptionalString(body.google_folder_id);
  if (body.template_key !== undefined) result.template_key = ensureOptionalString(body.template_key);
  if (body.metadata !== undefined) result.metadata = ensureObject(body.metadata, 'metadata');

  return result;
}

export type WebsiteSectionInput = {
  section_key: string;
  heading: string | null;
  content: string | null;
  media: Record<string, unknown>[];
  google_doc_id: string | null;
  google_doc_heading: string | null;
};

export function parseWebsiteSectionPayload(payload: unknown): WebsiteSectionInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid website section payload');
  }

  const body = payload as Record<string, unknown>;

  return {
    section_key: ensureString(body.section_key, 'section_key'),
    heading: ensureOptionalString(body.heading),
    content: ensureOptionalString(body.content),
    media: Array.isArray(body.media)
      ? body.media.filter((item) => item && typeof item === 'object') as Record<string, unknown>[]
      : [],
    google_doc_id: ensureOptionalString(body.google_doc_id),
    google_doc_heading: ensureOptionalString(body.google_doc_heading),
  };
}

export function parseWebsiteSectionUpdatePayload(payload: unknown): Partial<WebsiteSectionInput> {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid website section payload');
  }

  const body = payload as Record<string, unknown>;
  const result: Partial<WebsiteSectionInput> = {};

  if (body.section_key !== undefined) result.section_key = ensureString(body.section_key, 'section_key');
  if (body.heading !== undefined) result.heading = ensureOptionalString(body.heading);
  if (body.content !== undefined) result.content = ensureOptionalString(body.content);
  if (body.media !== undefined) {
    result.media = Array.isArray(body.media)
      ? body.media.filter((item) => item && typeof item === 'object') as Record<string, unknown>[]
      : [];
  }
  if (body.google_doc_id !== undefined) result.google_doc_id = ensureOptionalString(body.google_doc_id);
  if (body.google_doc_heading !== undefined)
    result.google_doc_heading = ensureOptionalString(body.google_doc_heading);

  return result;
}

export type SupportRequestInput = {
  website_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  request_type: typeof SUPPORT_TYPES[number];
  description: string | null;
  status: typeof SUPPORT_STATUSES[number];
  priority: typeof SUPPORT_PRIORITIES[number];
  metadata: Record<string, unknown>;
};

export function parseSupportRequestPayload(payload: unknown): SupportRequestInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid support request payload');
  }

  const body = payload as Record<string, unknown>;
  const email = ensureOptionalString(body.customer_email);
  if (email && !/.+@.+\..+/.test(email)) {
    throw new Error('Invalid customer email');
  }

  return {
    website_id: ensureOptionalString(body.website_id),
    customer_email: email,
    customer_name: ensureOptionalString(body.customer_name),
    request_type: ensureEnum(body.request_type, 'request_type', SUPPORT_TYPES, 'general'),
    description: ensureOptionalString(body.description),
    status: ensureEnum(body.status, 'status', SUPPORT_STATUSES, 'open'),
    priority: ensureEnum(body.priority, 'priority', SUPPORT_PRIORITIES, 'normal'),
    metadata: ensureObject(body.metadata, 'metadata'),
  };
}

export function parseSupportRequestUpdatePayload(payload: unknown): Partial<SupportRequestInput> {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid support request payload');
  }

  const body = payload as Record<string, unknown>;
  const result: Partial<SupportRequestInput> = {};

  if (body.website_id !== undefined) result.website_id = ensureOptionalString(body.website_id);
  if (body.customer_email !== undefined) {
    const email = ensureOptionalString(body.customer_email);
    if (email && !/.+@.+\..+/.test(email)) {
      throw new Error('Invalid customer email');
    }
    result.customer_email = email;
  }
  if (body.customer_name !== undefined) result.customer_name = ensureOptionalString(body.customer_name);
  if (body.request_type !== undefined)
    result.request_type = ensureEnum(body.request_type, 'request_type', SUPPORT_TYPES, 'general');
  if (body.description !== undefined) result.description = ensureOptionalString(body.description);
  if (body.status !== undefined) result.status = ensureEnum(body.status, 'status', SUPPORT_STATUSES, 'open');
  if (body.priority !== undefined)
    result.priority = ensureEnum(body.priority, 'priority', SUPPORT_PRIORITIES, 'normal');
  if (body.metadata !== undefined) result.metadata = ensureObject(body.metadata, 'metadata');

  return result;
}

export type SubscriptionUpdateInput = {
  priceId?: string | null;
  cancelAtPeriodEnd?: boolean;
};

export function parseSubscriptionUpdatePayload(payload: unknown): SubscriptionUpdateInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid subscription payload');
  }

  const body = payload as Record<string, unknown>;
  const result: SubscriptionUpdateInput = {};
  if (body.priceId !== undefined) {
    result.priceId = ensureOptionalString(body.priceId);
  }
  if (body.cancelAtPeriodEnd !== undefined) {
    result.cancelAtPeriodEnd = Boolean(body.cancelAtPeriodEnd);
  }
  return result;
}

export type InvoiceInput = {
  invoice_number: string;
  client_id: string;
  project_id: string | null;
  status: typeof INVOICE_STATUSES[number];
  issue_date: string;
  due_date: string;
  currency: string;
  amount: number;
  line_items: InvoiceLineItem[];
  notes: string | null;
};

export function parseInvoicePayload(payload: unknown): InvoiceInput {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid invoice payload');
  }

  const body = payload as Record<string, unknown>;
  const lineItemsRaw = Array.isArray(body.line_items) ? body.line_items : [];
  const line_items = lineItemsRaw.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid line item');
    }
    const row = item as Record<string, unknown>;
    return {
      description: ensureString(row.description, 'line_items.description'),
      quantity: ensureNumber(row.quantity, 'line_items.quantity'),
      unit_amount: ensureNumber(row.unit_amount, 'line_items.unit_amount'),
    };
  });

  return {
    invoice_number: ensureString(body.invoice_number, 'invoice_number'),
    client_id: ensureString(body.client_id, 'client_id'),
    project_id: ensureOptionalString(body.project_id),
    status: ensureEnum(body.status, 'status', INVOICE_STATUSES, 'draft'),
    issue_date: ensureDateString(body.issue_date, 'issue_date')!,
    due_date: ensureDateString(body.due_date, 'due_date')!,
    currency: ensureString(body.currency, 'currency').toUpperCase(),
    amount: ensureNumber(body.amount, 'amount'),
    line_items,
    notes: ensureOptionalString(body.notes),
  };
}

export function validateId(id: string | null | undefined): string {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid ID');
  }
  return id;
}

export function validateFields(obj: Record<string, unknown>, required: string[]) {
  for (const key of required) {
    if (obj[key] === undefined || obj[key] === null) {
      throw new Error(`Missing required field: ${key}`);
    }
  }
}
