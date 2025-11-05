// src/utils/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.PUBLIC_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  import.meta.env.PUBLIC_SUPABASE_URL ||
  '';

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
  '';

let cachedClient: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase admin client is not configured');
  }

  cachedClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cachedClient;
}

export const adminClient = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getAdminClient() as any;
      return client[prop as keyof typeof client];
    },
  },
) as SupabaseClient;
