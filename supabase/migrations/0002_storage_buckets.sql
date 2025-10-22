-- Ensure buckets exist
insert into storage.buckets (id, name, public) values ('assets', 'Client Assets', false)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public) values ('public', 'Public Assets', true)
  on conflict (id) do nothing;

-- Ensure policies are replaced if already present
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