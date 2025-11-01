// src/utils/supabase/auth.ts
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Middleware wrapper to ensure user is authenticated.
 */
export function withAuth(handler: APIRoute): APIRoute {
  return async (context) => {
    const authHeader = context.request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    context.locals.user = data.user;
    return handler(context);
  };
}

export { supabase };
