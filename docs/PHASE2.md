# TonSiteWeb – Phase 2 Backend & Automation

This repo now includes a minimal backend scaffold that runs on Vercel using Astro API routes.

## What’s included

- API routes (serverless):
  - `POST /api/contact` → store lead in Supabase + optional email
  - `POST /api/demo` → store demo request in Supabase
  - `POST /api/payment/checkout` → create Stripe Checkout session (one‑time or subscription) and return URL
  - `POST /api/payment/portal` → create Stripe Billing Portal session
  - `POST /api/stripe-webhook` → verify and persist Stripe events (checkout.session.completed)
- Utilities:
  - `src/lib/env.ts` → safe env access
  - `src/lib/supabase.ts` → Supabase admin/anon clients
  - `src/lib/stripe.ts` → on‑demand Stripe client
  - `src/lib/email.ts` → Resend email sender (optional)
- Database schema: `db/schema.sql`
- Env template: `.env.example`

## Configure

1) Copy `.env.example` → `.env` and set values.
2) Create Stripe Prices for Essential/Advanced/Care, then set `PRICE_*` IDs.
3) Create a Stripe webhook endpoint that points to `/api/stripe-webhook` and set `STRIPE_WEBHOOK_SECRET`.
4) Create a Supabase project and run `db/schema.sql` (SQL editor) to create tables.
5) Set the same env vars in Vercel Project Settings → Environment Variables.

## Deploy

- The adapter is `@astrojs/vercel` with `output: "hybrid"`, so pages remain static while API routes run as serverless functions.
- When env vars are absent, routes return safe 501/200 responses without breaking build.

## Example calls

- Create checkout session:
  `POST /api/payment/checkout` → `{ plan: "essential"|"advanced"|"care79" }`
- Open billing portal:
  `POST /api/payment/portal` → `{ customerId: "cus_..." }`
- Lead:
  `POST /api/contact` → `{ name, email, company, message }`

## Next steps

- Add auth (Supabase Auth) and a simple `/app` portal listing projects
- Extend webhook handling to create/update client/project rows
- Add scheduled tasks (Vercel Cron) for reminders and monitoring

