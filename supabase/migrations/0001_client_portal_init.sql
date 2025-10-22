-- contact_submissions: replace existing insert policy with explicit roles (idempotent)
DROP POLICY IF EXISTS "contact_submissions_insert_public" ON public.contact_submissions;
CREATE POLICY "contact_submissions_insert_public" ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- storage.objects: replace insert/select policies with explicit definitions (idempotent)
DROP POLICY IF EXISTS "assets_insert_authenticated" ON storage.objects;
CREATE POLICY "assets_insert_authenticated" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'assets');

DROP POLICY IF EXISTS "assets_select_authenticated" ON storage.objects;
CREATE POLICY "assets_select_authenticated" ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'assets');

DROP POLICY IF EXISTS "public_select_all" ON storage.objects;
CREATE POLICY "public_select_all" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'public');