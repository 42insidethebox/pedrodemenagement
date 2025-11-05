import { normalizePhoneNumber } from './phone.js';
import { generateClientSlug } from './slug.js';

export function serializeMetadata(input) {
  const name = toStr(input?.name);
  const email = toStr(input?.email).toLowerCase();
  const company = toStr(input?.company);
  const phone = normalizePhoneNumber(toStr(input?.phone));
  const template = toStr(input?.template);
  const plan = toStr(input?.plan).toLowerCase();
  const clientSlug = generateClientSlug(name, company);

  const meta = { name, email, company, phone, template, plan, clientSlug };
  return JSON.parse(JSON.stringify(meta));
}

function toStr(v) {
  return typeof v === 'string' ? v.trim() : '';
}

