# Welwitschia Group Platform

[![Build Status](https://github.com/jedidja-cto/welwitschia-group/workflows/CI/badge.svg)](https://github.com/jedidja-cto/welwitschia-group/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/docs/hosting)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A Next.js 14 App Router project for the corporate website and secure client portal. It includes public marketing pages and a reusable component library.

## Overview

- Corporate site: Home, About, Divisions, Industries, Pricing, Careers, Contact
- Client portal: Login, Dashboard, Projects, Assets, Metrics, Tasks, Settings
- API: Server-side endpoints (e.g., `/api/client/init`)
- Data: client portal stubs ready to be wired to your preferred backend

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
                    │    Backend      │
                    │                 │
                    │ • Auth          │
                    │ • Database      │
                    │ • Storage       │
                    └─────────────────┘
```

## Tech Stack

- Next.js 14, TypeScript, Tailwind CSS
- Firebase Hosting
- Testing: Vitest, Jest (legacy auth tests), Playwright (E2E)

## Project Structure

- `src/app/` — App Router pages for both site and portal
  - Public: `page.tsx`, `about/`, `divisions/`, `industries/`, `pricing/`, `careers/`, `contact/`
  - Portal: `client/(unauth)/` and `client/(app)/` layouts, `client/dashboard/`
  - API: `app/api/client/init/route.ts`
- `src/components/` — Design system and layouts (`MainLayout`, `Navbar`, `Footer`, client UI)
- `src/lib/` — Core clients (`clientApi`, `clientData`, helpers)
- `e2e/`, `playwright.config.ts` — Optional E2E tests

## Authentication

- Client auth is currently stubbed (no backend). Portal pages are accessible without authentication.

## Environment

No backend environment variables are required for the current setup.

## Getting Started

- Install: `npm install`
- Dev: `npm run dev` then open `http://localhost:3000`
- Build: `npm run build`
- Start (prod): `npm run start`

## Testing

- Unit: `npm run test` (Vitest)
- Auth tests: removed
- E2E: `npm run test:e2e` (run `npx playwright install` once). Start the dev server before E2E; `webServer` is commented in `playwright.config.ts`.

## Deployment

- Firebase Hosting: use `firebase deploy --only hosting` for static hosting.

## Data Model

Data models previously documented for Supabase have been removed.

Backend-specific RLS and storage details have been removed.

## Routes

- Public: `/`, `/about`, `/divisions`, `/industries`, `/pricing`, `/careers`, `/contact`
- Portal: `/client/login`, `/client/dashboard`, `/client/dashboard/projects`, `/client/dashboard/assets`, `/client/dashboard/metrics`, `/client/dashboard/tasks`, `/client/dashboard/settings`

## Scripts

- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`
- `npm run test`, `npm run test:e2e`

## Troubleshooting

- Use `firebase use <project-id>` to switch hosting projects.
- If you want Next.js SSR/APIs on Firebase, upgrade to Blaze and run `firebase init hosting:frameworks`.
- Playwright on Windows: run `npx playwright install`; start dev server manually.

## Notes

- `@sanity/client` is available for future CMS integrations.
- Keep server keys on the server only; use server routes for privileged actions.
