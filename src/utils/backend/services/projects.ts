// src/utils/backend/services/projects.ts
import type { SupabaseClient } from '@supabase/supabase-js';

import { ApiError } from '../http';
import type { ProjectInput } from '../validation';

export interface ProjectRecord {
  id: string;
  agency_id: string;
  client_id: string;
  name: string;
  status: string;
  start_date: string | null;
  due_date: string | null;
  budget: number | null;
  currency: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ListProjectsOptions {
  page: number;
  pageSize: number;
  status?: string;
  clientId?: string;
  search?: string | null;
}

export interface ListProjectsResult {
  projects: ProjectRecord[];
  total: number;
}

function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%_,]/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function listProjects(
  client: SupabaseClient,
  agencyId: string,
  options: ListProjectsOptions,
): Promise<ListProjectsResult> {
  const page = Math.max(1, options.page);
  const pageSize = Math.max(1, options.pageSize);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = client
    .from('projects')
    .select('*', { count: 'exact' })
    .eq('agency_id', agencyId);

  if (options.status) {
    query = query.eq('status', options.status);
  }

  if (options.clientId) {
    query = query.eq('client_id', options.clientId);
  }

  if (options.search) {
    const sanitized = sanitizeSearchTerm(options.search);
    if (sanitized) {
      const pattern = `%${sanitized.replace(/[%_]/g, '')}%`;
      query = query.or(
        ['name', 'notes'].map((column) => `${column}.ilike.${pattern}`).join(','),
      );
    }
  }

  const { data, error, count } = await query
    .order('due_date', { ascending: true, nullsFirst: true })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Failed to list projects', error);
    throw new ApiError(500, 'Unable to load projects');
  }

  return {
    projects: (data ?? []) as ProjectRecord[],
    total: count ?? 0,
  };
}

export async function getProjectById(
  client: SupabaseClient,
  agencyId: string,
  id: string,
): Promise<ProjectRecord> {
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('agency_id', agencyId)
    .maybeSingle();

  if (error) {
    console.error('Failed to load project', error);
    throw new ApiError(500, 'Unable to load project');
  }

  if (!data) {
    throw new ApiError(404, 'Project not found');
  }

  return data as ProjectRecord;
}

export async function createProject(
  client: SupabaseClient,
  agencyId: string,
  payload: ProjectInput,
): Promise<ProjectRecord> {
  const { data, error } = await client
    .from('projects')
    .insert({ ...payload, agency_id: agencyId })
    .select('*')
    .single();

  if (error) {
    console.error('Failed to create project', error);
    throw new ApiError(500, 'Unable to save project');
  }

  return data as ProjectRecord;
}

export async function updateProject(
  client: SupabaseClient,
  agencyId: string,
  id: string,
  payload: Partial<ProjectInput>,
): Promise<ProjectRecord> {
  const updatePayload: Record<string, unknown> = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('projects')
    .update(updatePayload)
    .eq('id', id)
    .eq('agency_id', agencyId)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to update project', error);
    throw new ApiError(500, 'Unable to update project');
  }

  if (!data) {
    throw new ApiError(404, 'Project not found');
  }

  return data as ProjectRecord;
}

export async function deleteProject(
  client: SupabaseClient,
  agencyId: string,
  id: string,
): Promise<Pick<ProjectRecord, 'id' | 'name'>> {
  const { data, error } = await client
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('agency_id', agencyId)
    .select('id, name')
    .maybeSingle();

  if (error) {
    console.error('Failed to delete project', error);
    throw new ApiError(500, 'Unable to delete project');
  }

  if (!data) {
    throw new ApiError(404, 'Project not found');
  }

  return data as Pick<ProjectRecord, 'id' | 'name'>;
}
