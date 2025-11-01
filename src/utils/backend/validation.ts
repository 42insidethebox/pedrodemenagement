// src/utils/backend/validation.ts

/**
 * Basic validation and type definitions for document records.
 */

export type DocumentInput = {
  title: string;
  description?: string | null;
  file_url?: string | null;
  status?: 'draft' | 'final' | 'archived';
  agency_id?: string;
};

/**
 * A simple runtime validation schema for incoming document data.
 * This version doesn’t rely on zod/yup to keep build minimal.
 */
export const documentSchema = {
  validate(input: Partial<DocumentInput>): asserts input is DocumentInput {
    if (!input.title || typeof input.title !== 'string') {
      throw new Error('Invalid document: missing or invalid "title"');
    }

    if (input.status && !['draft', 'final', 'archived'].includes(input.status)) {
      throw new Error('Invalid document: bad "status"');
    }

    // you could add more field checks here if needed
  },
};

/**
 * Generic field validators (still usable elsewhere).
 */
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
