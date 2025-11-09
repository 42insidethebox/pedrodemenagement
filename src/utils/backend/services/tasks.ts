// src/utils/backend/services/tasks.ts
import type { SupabaseClient } from '@supabase/supabase-js';

import { ApiError } from '../http';
import type { TaskInput } from '../validation';

export interface TaskRecord {
  id: string;
  agency_id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assignee_id: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ListTasksOptions {
  page: number;
  pageSize: number;
  status?: string;
  priority?: string;
  projectId?: string;
  assigneeId?: string;
  search?: string | null;
}

export interface ListTasksResult {
  tasks: TaskRecord[];
  total: number;
}

function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%_,]/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function listTasks(
  client: SupabaseClient,
  agencyId: string,
  options: ListTasksOptions,
): Promise<ListTasksResult> {
  const page = Math.max(1, options.page);
  const pageSize = Math.max(1, options.pageSize);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = client
    .from('tasks')
    .select('*', { count: 'exact' })
    .eq('agency_id', agencyId);

  if (options.status) {
    query = query.eq('status', options.status);
  }

  if (options.priority) {
    query = query.eq('priority', options.priority);
  }

  if (options.projectId) {
    query = query.eq('project_id', options.projectId);
  }

  if (options.assigneeId) {
    query = query.eq('assignee_id', options.assigneeId);
  }

  if (options.search) {
    const sanitized = sanitizeSearchTerm(options.search);
    if (sanitized) {
      const pattern = `%${sanitized.replace(/[%_]/g, '')}%`;
      query = query.or(
        ['title', 'description']
          .map((column) => `${column}.ilike.${pattern}`)
          .join(','),
      );
    }
  }

  const { data, error, count } = await query
    .order('due_date', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Failed to list tasks', error);
    throw new ApiError(500, 'Unable to load tasks');
  }

  return {
    tasks: (data ?? []) as TaskRecord[],
    total: count ?? 0,
  };
}

export async function getTaskById(
  client: SupabaseClient,
  agencyId: string,
  id: string,
): Promise<TaskRecord> {
  const { data, error } = await client
    .from('tasks')
    .select('*')
    .eq('id', id)
    .eq('agency_id', agencyId)
    .maybeSingle();

  if (error) {
    console.error('Failed to load task', error);
    throw new ApiError(500, 'Unable to load task');
  }

  if (!data) {
    throw new ApiError(404, 'Task not found');
  }

  return data as TaskRecord;
}

export async function createTask(
  client: SupabaseClient,
  agencyId: string,
  payload: TaskInput,
): Promise<TaskRecord> {
  const { data, error } = await client
    .from('tasks')
    .insert({ ...payload, agency_id: agencyId })
    .select('*')
    .single();

  if (error) {
    console.error('Failed to create task', error);
    throw new ApiError(500, 'Unable to save task');
  }

  return data as TaskRecord;
}

export async function updateTask(
  client: SupabaseClient,
  agencyId: string,
  id: string,
  payload: Partial<TaskInput>,
): Promise<TaskRecord> {
  const updatePayload = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('tasks')
    .update(updatePayload)
    .eq('id', id)
    .eq('agency_id', agencyId)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to update task', error);
    throw new ApiError(500, 'Unable to update task');
  }

  if (!data) {
    throw new ApiError(404, 'Task not found');
  }

  return data as TaskRecord;
}

export async function deleteTask(
  client: SupabaseClient,
  agencyId: string,
  id: string,
): Promise<Pick<TaskRecord, 'id' | 'title'>> {
  const { data, error } = await client
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('agency_id', agencyId)
    .select('id, title')
    .maybeSingle();

  if (error) {
    console.error('Failed to delete task', error);
    throw new ApiError(500, 'Unable to delete task');
  }

  if (!data) {
    throw new ApiError(404, 'Task not found');
  }

  return data as Pick<TaskRecord, 'id' | 'title'>;
}
