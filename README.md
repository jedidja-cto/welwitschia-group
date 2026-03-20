# Welwitschia Group Platform

[![Build Status](https://github.com/jedidja-cto/welwitschia-group/workflows/CI/badge.svg)](https://github.com/jedidja-cto/welwitschia-group/actions)

## Stack

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/docs/hosting)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)

A Next.js 14 App Router project for the Welwitschia Group corporate website and secure client portal. It includes public marketing pages, a reusable component library, and static hosting through Firebase Hosting.

## Overview

- Corporate site pages for Home, About, Divisions, Industries, Pricing, Careers, and Contact
- Client portal flows for Login, Dashboard, Projects, Assets, Metrics, Tasks, and Settings
- App Router structure that keeps public pages and portal pages in one codebase
- Static hosting deployment through Firebase Hosting

## Architecture

```text
+-----------------+    +-----------------+    +-----------------+
|   Public Site   |    |  Client Portal  |    |   API Routes    |
|                 |    |                 |    |                 |
| - Home          |    | - Login         |    | - /api/client/  |
| - About         |    | - Dashboard     |    |   init          |
| - Divisions     |    | - Projects      |    | - Server-side   |
| - Industries    |    | - Assets        |    |   operations    |
| - Contact       |    | - Metrics       |    |                 |
+-----------------+    +-----------------+    +-----------------+
         |                       |                       |
         +-----------------------+-----------------------+
                                 |
                    +-------------------------+
                    |        Backend          |
                    |                         |
                    | - Auth                  |
                    | - Database              |
                    | - Storage               |
                    +-------------------------+
```

## Project Structure

- `src/app/`: App Router pages for the public site, client portal, and route handlers
- `src/components/`: shared UI, section components, layout components, and pricing flows
- `src/lib/`: project data, helper utilities, and supporting logic
- `public/`: static assets and case study imagery
- `e2e/`: Playwright end-to-end coverage

## Authentication

Client authentication is currently stubbed. Portal pages are present in the codebase, but a production auth backend is not wired in yet.

## Environment

No backend environment variables are required for the current static hosting setup.

## Getting Started

- Install dependencies: `npm install`
- Start development: `npm run dev`
- Build for production: `npm run build`
- Start the production server locally: `npm run start`

## Testing

- Unit tests: `npm run test`
- End-to-end tests: `npm run test:e2e`
- Playwright setup on a new machine: `npx playwright install`

## Deployment

- Firebase Hosting deploy: `firebase deploy --only hosting`
- Switch Firebase projects when needed: `firebase use <project-id>`

## Routes

- Public: `/`, `/about`, `/divisions`, `/industries`, `/pricing`, `/careers`, `/contact`
- Portal: `/client/login`, `/client/dashboard`, `/client/dashboard/projects`, `/client/dashboard/assets`, `/client/dashboard/metrics`, `/client/dashboard/tasks`, `/client/dashboard/settings`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run test`
- `npm run test:e2e`

## Notes

- `@sanity/client` is available if a CMS integration is added later
- Keep any privileged credentials on the server side only
- If SSR or API hosting is needed on Firebase later, initialize Firebase frameworks hosting separately
