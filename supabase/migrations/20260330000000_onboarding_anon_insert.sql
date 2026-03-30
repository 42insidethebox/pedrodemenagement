-- Allow anonymous users to INSERT into onboarding_submissions
-- (form submits directly from the browser using the anon key)

-- Enable RLS if not already enabled
ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (idempotent)
DROP POLICY IF EXISTS "anon_insert_onboarding" ON public.onboarding_submissions;

-- Allow anyone to insert a new submission (anon + authenticated)
CREATE POLICY "anon_insert_onboarding"
  ON public.onboarding_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Storage: allow anon uploads to onboarding-assets bucket
-- Run this in the Supabase dashboard → Storage → onboarding-assets → Policies
-- or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('onboarding-assets', 'onboarding-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "anon_upload_onboarding_assets" ON storage.objects;
CREATE POLICY "anon_upload_onboarding_assets"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'onboarding-assets');
