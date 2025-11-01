// src/utils/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('⚠️ Missing Supabase admin env vars');
}

export const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});
