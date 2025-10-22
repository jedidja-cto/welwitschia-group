# Supabase CLI Workflow

This project includes migrations to manage schema and storage via Supabase CLI.

## Prerequisites
- Install CLI: `npm i -g supabase`
- Login: `supabase login` (or `supabase login --token <ACCESS_TOKEN>`)
- Link project: `supabase link --project-ref <YOUR_PROJECT_REF>`

## Apply Migrations
- Push all migrations: `supabase db push`
- Start local Supabase (Docker required): `supabase start`
- Reset local DB with migrations + seed (if any): `supabase db reset`

## Migrations Included
- `migrations/0001_client_portal_init.sql` — core tables (clients, projects, assets, metrics, tasks, invoices, contact_submissions) and RLS policies
- `migrations/0002_storage_buckets.sql` — creates `assets` (private) and `public` buckets, adds basic `storage.objects` policies

## Types Generation
- Generate TypeScript types: `supabase gen types typescript --linked > src/lib/database.types.ts`

## Environment Variables
Add the following to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://<YOUR_PROJECT_REF>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_ANON_KEY>
NEXT_PUBLIC_SUPABASE_ASSETS_BUCKET=assets
```
For local Supabase, get values from `supabase status`.

## Notes
- Contact form submissions are open for inserts (public) and restricted to admins for reads.
- Assets bucket is private; use signed URLs for downloads.
- Adjust storage policies to your exact role model if needed.