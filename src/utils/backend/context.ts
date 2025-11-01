// src/utils/backend/context.ts
import { adminClient } from '../supabase/admin';

export async function getAgencyContext(user: { id: string }) {
  if (!user?.id) throw new Error('Missing user');

  // fetch agency info
  const { data: agency, error } = await adminClient
    .from('agencies')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Failed to load agency context', error);
    throw error;
  }

  return { agency, user };
}
