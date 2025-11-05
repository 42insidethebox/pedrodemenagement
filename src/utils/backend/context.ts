// src/utils/backend/context.ts
import type { User } from '@supabase/supabase-js';

import { getAdminClient } from '../supabase/admin';

async function ensureAgency(user: User) {
  const client = getAdminClient();
  const { data, error } = await client
    .from('agencies')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Failed to load agency', error);
    throw error;
  }

  if (data) return data;

  const name = String(user.user_metadata?.full_name || user.email || 'TonSiteWeb Agency');
  const { data: inserted, error: insertError } = await client
    .from('agencies')
    .insert({ owner_id: user.id, name })
    .select('*')
    .single();

  if (insertError) {
    console.error('Failed to create agency', insertError);
    throw insertError;
  }

  return inserted;
}

async function syncAgencyMember(agencyId: string, user: User) {
  const client = getAdminClient();
  const payload = {
    agency_id: agencyId,
    user_id: user.id,
    full_name: user.user_metadata?.full_name ?? null,
    email: user.email ?? null,
    role: 'owner',
  };

  const { error } = await client
    .from('agency_members')
    .upsert(payload, { onConflict: 'agency_id,user_id' });

  if (error) {
    console.error('Failed to sync agency member', error);
    throw error;
  }
}

export async function getAgencyContext(user: User) {
  if (!user?.id) throw new Error('Missing user');

  const agency = await ensureAgency(user);
  await syncAgencyMember(agency.id, user);

  return { agency, user };
}
