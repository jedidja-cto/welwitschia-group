# Welwitschia Group Platform

[![Build Status](https://github.com/jedidja-cto/welwitschia-group/workflows/CI/badge.svg)](https://github.com/jedidja-cto/welwitschia-group/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A Next.js 14 App Router project for the corporate website and secure client portal. It includes public marketing pages, a reusable component library, and a Supabase-backed portal for clients to access projects, assets, and metrics.

## Overview

- Corporate site: Home, About, Divisions, Industries, Pricing, Careers, Contact
- Client portal: Login, Dashboard, Projects, Assets, Metrics, Tasks, Settings
- API: Server-side endpoints (e.g., `/api/client/init`) using Supabase service role
- Data: Supabase tables and storage for client records, projects, tasks, invoices, assets

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Public Site   │    │  Client Portal  │    │   API Routes    │
│                 │    │                 │    │                 │
│ • Home          │    │ • Login         │    │ • /api/client/  │
│ • About         │    │ • Dashboard     │    │   init          │
│ • Divisions     │    │ • Projects      │    │ • Server-side   │
│ • Industries    │    │ • Assets        │    │   operations    │
│ • Contact       │    │ • Metrics       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │    Supabase     │
                    │                 │
                    │ • Auth          │
                    │ • Database      │
                    │ • Storage       │
                    │ • RLS Policies  │
                    └─────────────────┘
```

## Tech Stack

- Next.js 14, TypeScript, Tailwind CSS
- Supabase (Auth, DB, Storage)
- Testing: Vitest, Jest (legacy auth tests), Playwright (E2E)

## Project Structure

- `src/app/` — App Router pages for both site and portal
  - Public: `page.tsx`, `about/`, `divisions/`, `industries/`, `pricing/`, `careers/`, `contact/`
  - Portal: `client/(unauth)/` and `client/(app)/` layouts, `client/dashboard/`
  - API: `app/api/client/init/route.ts`
- `src/components/` — Design system and layouts (`MainLayout`, `Navbar`, `Footer`, client UI)
- `src/lib/` — Core clients (`supabaseClient`, `supabaseAdmin`, `clientApi`, `supabaseStorage`)
- `supabase/` — Local config and migrations (apply to your project)
- `e2e/`, `playwright.config.ts` — Optional E2E tests

## Authentication

- Client auth via Supabase. Session persists with `persistSession` and `autoRefreshToken`.
- `ProtectedRoute` guards portal pages and listens to `onAuthStateChange()`.
- Dashboard layout reloads client profile on sign-in/token refresh; redirects on sign-out/no session.
- Login page redirects authenticated users to `\client\dashboard` and initializes a client record on first signup.

## Environment

Add to `.env.local` (and your host, e.g. Vercel):

```
NEXT_PUBLIC_SUPABASE_URL=... 
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # server-only (API routes)
NEXT_PUBLIC_SUPABASE_ASSETS_BUCKET=assets  # optional, defaults to "assets"
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## Getting Started

- Install: `npm install`
- Dev: `npm run dev` then open `http://localhost:3000`
- Build: `npm run build`
- Start (prod): `npm run start`

## Testing

- Unit: `npm run test` (Vitest)
- Auth tests: `npm run test:auth` (Jest)
- E2E: `npm run test:e2e` (run `npx playwright install` once). Start the dev server before E2E; `webServer` is commented in `playwright.config.ts`.

## Deployment

- Vercel: Import repo, set env vars, deploy. Ensure Supabase tables/RLS are applied.
- Node hosting: `npm run build` then `npm run start` with env vars configured.

## Data Model

### Database Tables

**clients**
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- email (text)
- name (text)
- role (text, default: 'client')
- created_at (timestamp)
- updated_at (timestamp)
```

**projects**
```sql
- id (uuid, primary key)
- client_id (uuid, references clients.id)
- title (text)
- description (text)
- status (text: 'active', 'completed', 'on-hold')
- progress (integer, 0-100)
- created_at (timestamp)
- updated_at (timestamp)
```

**tasks**
```sql
- id (uuid, primary key)
- project_id (uuid, references projects.id)
- title (text)
- description (text)
- completed (boolean, default: false)
- due_date (timestamp)
- created_at (timestamp)
```

**invoices**
```sql
- id (uuid, primary key)
- client_id (uuid, references clients.id)
- project_id (uuid, references projects.id, nullable)
- amount (decimal)
- status (text: 'pending', 'paid', 'overdue')
- due_date (timestamp)
- created_at (timestamp)
```

**assets**
```sql
- id (uuid, primary key)
- client_id (uuid, references clients.id)
- project_id (uuid, references projects.id, nullable)
- name (text)
- file_path (text)
- file_size (bigint)
- mime_type (text)
- created_at (timestamp)
```

### Row Level Security (RLS)

All tables implement RLS policies to ensure clients can only access their own data:
- `clients`: Users can only view/update their own client record
- `projects`, `tasks`, `invoices`, `assets`: Users can only access records where `client_id` matches their client record

### Storage

- **Bucket**: `assets` (configurable via `NEXT_PUBLIC_SUPABASE_ASSETS_BUCKET`)
- **Structure**: `/{client_id}/{project_id?}/{filename}`
- **Policies**: Authenticated users can only access files in their client folder

## Routes

- Public: `/`, `/about`, `/divisions`, `/industries`, `/pricing`, `/careers`, `/contact`
- Portal: `/client/login`, `/client/dashboard`, `/client/dashboard/projects`, `/client/dashboard/assets`, `/client/dashboard/metrics`, `/client/dashboard/tasks`, `/client/dashboard/settings`

## Scripts

- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`
- `npm run test`, `npm run test:e2e`, `npm run test:auth`

## Troubleshooting

- 401 from Supabase: verify env vars and RLS policies.
- Auth loops: confirm `onAuthStateChange()` and session persistence are active.
- Playwright on Windows: run `npx playwright install`; start dev server manually.

## Notes

- `@sanity/client` is available for future CMS integrations.
- Keep server keys on the server only; use server routes for privileged actions.
