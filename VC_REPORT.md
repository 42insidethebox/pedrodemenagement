# Technical & Business Report — Multi-Tenant Swiss Web Platform
## Rapport Technique et Commercial — Plateforme Web Multi-Tenant Suisse

> **Document prepared for:** Investor due diligence
> **Date:** March 2026
> **Confidentiality:** Private — do not distribute

---

# ENGLISH VERSION

---

## 1. Executive Summary

This platform is a production-grade, multi-tenant web application built on Astro 5 and Supabase, serving **15 live branded websites** from a single codebase deployed on Vercel serverless infrastructure. The system combines a cluster of Swiss service brands (moving, cleaning, clearance, inspection, luxury experiences) with a productized SaaS offering — **TonSiteWeb** — that allows SMEs to launch their own white-labelled websites. Every tenant shares the same rendering engine, Stripe payment pipeline, email automation, booking system, and Supabase backend, while being fully isolated by brand identity, color scheme, typography, domain, and data.

---

## 2. Platform Overview

**What it is:** A "website factory" for Swiss SMEs and service businesses, built as a single Astro SSR application where each customer-facing brand is a fully independent tenant resolved at request time from the incoming HTTP host header.

**Core value proposition:**
- One codebase → 15 live branded websites with full feature parity
- New tenant onboarding requires zero infrastructure provisioning — add a domain and a brand config entry
- All shared infrastructure (database, payments, email, booking engine) is battle-tested across 15 production tenants
- TonSiteWeb turns the platform into a product: SMEs buy a website, and the platform provisions, renders, and manages it on their custom domain

**Live domains include:**
`pedrodemenagement.ch` · `lausannedemenagement.ch` · `demenagementurgent.ch` · `transportmeubles.ch` · `debarraslausanne.ch` · `videmaison.ch` · `videsuccession.ch` · `nettoyagesuccession.ch` · `lausannenettoyage.ch` · `etatdeslieuxlausanne.ch` · `laclemanexperience.ch` · `maisoncortes.ch` · `ateliermemoire.ch` · `tolocoiffure.ch` · `tonsiteweb.ch` / `tonwebsite.ch`

---

## 3. Multi-Tenant Architecture

This is the technical core of the platform. Every inbound HTTP request is resolved to exactly one tenant before any page logic executes. All rendering, theming, data access, emails, and payment flows are tenant-scoped from that point forward.

### 3.1 Tenant Registry

Tenants are defined in two source files:

**`src/lib/brands.config.ts`** — 15 brand profiles, each carrying:
- Identity: `key`, `name`, `shortName`, `domain`, `phone`, `whatsapp`, `email`, `legalOperator`
- SEO: `seoTitle`, `seoDescription`
- Visual theme: `primaryColor`, `secondaryColor`, `fonts` (sans / heading / serif), `theme` (bg, gradient, accent, surface, card, shadow, pattern)
- Hero: `image`, `overlay`, `texture`

**`src/lib/tenants.ts`** — 15 `TenantConfig` entries built from brands plus extras:

```
brandTenants (14) = all BRANDS entries except maisoncortes, auto-mapped with:
  - slug  = brand.key
  - domains = [brand.domain, www.brand.domain]
  - basePath = '/atelier-memoire' | '/tolo-coiffure' | undefined
  - preserveBasePath = true (for ateliermemoire + tolo-coiffure)

extraTenants (2) = manually defined:
  - maison-cortes  →  brandKey='maisoncortes', basePath='/maison-cortes', preserveBasePath=true
  - tonsiteweb     →  domains=[tonsiteweb.ch, tonwebsite.ch, …], no basePath
```

The exported `TENANTS` array is the single source of truth for the entire resolution system.

### 3.2 Tenant Resolution Algorithm

Executed on **every request** in `src/middleware.ts` via `resolveTenantFromRequest()`:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Incoming HTTP Request                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  1. Host Match          │  x-forwarded-host / host / url.host
              │  (highest priority)     │  → TENANTS.find(t => matchesHost(host, t))
              └────────────┬───────────┘
                           │ no match
                           ▼
              ┌────────────────────────┐
              │  2. Query Param         │  ?tenant=<slug>
              │                         │  → tenantBySlug[slug]
              └────────────┬───────────┘
                           │ no match
                           ▼
              ┌────────────────────────┐
              │  3. Path Prefix         │  /atelier-memoire/*, /maison-cortes/*
              │                         │  → tenantBySlug[pathSegments[0]]
              └────────────┬───────────┘
                           │ no match
                           ▼
              ┌────────────────────────┐
              │  4. Fallback            │  defaults to tenant slug='pedro'
              └────────────┬───────────┘
                           │
                           ▼
              context.locals.tenant = TenantContext {
                slug, brandKey, domains, basePath,
                source: 'host'|'query'|'path'|'fallback',
                host
              }
```

The host matching logic (`matchesHost`) handles:
- Exact domain match: `lausannedemenagement.ch`
- www prefix: `www.lausannedemenagement.ch`
- Subdomain wildcard: `anything.tonsiteweb.ch`
- Local dev suffix: `lausanne.local`
- Slug-based subdomain: `lausanne.localhost`

### 3.3 Context Propagation

Once resolved, the tenant context flows through the full request lifecycle:

```
middleware.ts
  └─ context.locals.tenant = TenantContext

Pages (.astro)
  └─ const tenant = Astro.locals.tenant
  └─ const brand = BRANDS[tenant.brandKey]

Layouts (PageLayout.astro)
  └─ Applies CSS custom properties from brand.theme:
     --aw-color-primary, --aw-color-secondary, --brand-accent,
     --brand-bg, --brand-gradient, --brand-surface, --brand-card,
     --aw-font-sans, --aw-font-heading, --aw-font-serif

API Routes
  └─ const tenant = getTenantFromContext({ request, locals })
  └─ All Supabase writes include: { tenant_id: tenant.slug }
  └─ All Supabase reads filter on: .eq('tenant_id', tenant.slug)
```

### 3.4 Data Isolation

Every record written to Supabase carries a `tenant_id` column equal to the tenant slug. Every read filters on this column. There is no shared mutable state between tenants at the database layer.

```
leads         → tenant_id = tenant.slug
bookings      → tenant_id = tenant.slug
booking_blocks→ tenant_id = tenant.slug
orders        → tenant_id = tenant.slug
websites      → agency_id (FK to agencies.id, which is user-scoped)
```

Row-Level Security (RLS) policies are enabled on all sensitive tables, enforced at the PostgreSQL layer via Supabase Auth JWT claims.

### 3.5 Brand Theming System

Each of the 15 brands has a complete visual identity stored in `brands.config.ts`:

| Brand | Primary | Secondary | Fonts |
|---|---|---|---|
| Pedro Déménagement | `#0f172a` | `#1e40af` | Inter Variable / Space Grotesk |
| Lausanne Déménagement | `#1e3a8a` | `#0ea5e9` | Manrope / Archivo |
| Déménagement Urgent | `#b91c1c` | `#f97316` | Archivo / Bebas Neue |
| Débarras Lausanne | `#065f46` | `#10b981` | DM Sans / Playfair Display |
| Transport Meubles | `#1f2a44` | `#f2b045` | Space Grotesk / Space Grotesk |
| Vide Maison | `#b45309` | `#c58f55` | DM Sans / Cormorant Garamond |
| Vide Succession | `#0f172a` | `#d97706` | Manrope / Playfair Display |
| Nettoyage Succession | `#0f766e` | `#22d3ee` | Work Sans / Space Grotesk |
| Nettoyage Lausanne | `#0ea5e9` | `#0f172a` | Work Sans / Space Grotesk |
| Lac Léman Experience | `#0f766e` | `#1e293b` | Manrope / Playfair Display |
| État des lieux Lausanne | `#1e3a8a` | `#0ea5e9` | Manrope / Archivo |
| Maison Cortes | `#111111` | `#6B6B6B` | Libre Baskerville / Libre Baskerville |
| Atelier Mémoire | `#e8e8e4` | `#c7a374` | Inter / Libre Baskerville |
| Tolo Coiffure | `#2B1D14` | `#C8B38A` | Inter / Playfair Display |
| TonSiteWeb | `#0f172a` | `#2563eb` | Inter Variable / Space Grotesk |

CSS custom properties are injected at the layout level, so every page — hero, pricing, contact, footer — renders in the correct brand identity without any tenant-specific component code.

### 3.6 BasePath Tenants

Three tenants use internal path prefixes while serving clean URLs externally:

| Tenant | Internal Path | External URL | Mechanism |
|---|---|---|---|
| Atelier Mémoire | `/atelier-memoire/*` | `ateliermemoire.ch/*` | 308 redirect on host match |
| Tolo Coiffure | `/tolo-coiffure/*` | `tolocoiffure.ch/*` | Transparent internal rewrite |
| Maison Cortes | `/maison-cortes/*` | `maisoncortes.ch/*` | preserveBasePath = true |

This allows all tenants to coexist in a single Vercel deployment without path collisions.

### 3.7 Customer Site Fallback (TonSiteWeb)

When an unknown host (a TonSiteWeb customer's custom domain) hits the platform, the middleware performs a Supabase lookup via `getWebsiteByHost()`:

```
Unknown host → getWebsiteByHost(host) → Supabase websites + website_domains tables
  → if found: rewrite request to /__site/<original-path>
              inject headers: x-website-id, x-original-path
  → /__site/[...path].astro renders from website_sections table
```

This means TonSiteWeb customers can point any domain to the platform and have their content rendered dynamically — no redeployment required.

---

## 4. Tech Stack

### Frontend
| Technology | Version | Role |
|---|---|---|
| Astro | 5.0 | SSR framework, page routing, component model |
| TypeScript | 5.8.3 | Type safety across all layers |
| Tailwind CSS | 3.4.17 | Utility-first styling |
| astro-icon | 1.1.5 | SVG icon system |
| @astrolib/seo | 1.0.0-beta.8 | Meta tags, Open Graph, structured data |
| unpic | 4.1.3 | CDN-agnostic image optimization |

### Backend & Data
| Technology | Version | Role |
|---|---|---|
| Supabase | 2.78.0 | PostgreSQL, Auth (JWT), RLS, real-time |
| Stripe | 19.2.0 | Payments (one-time + subscriptions), webhooks |
| Resend | — | Transactional email (22 HTML templates, 4 locales) |
| googleapis | 164.1.0 | Google Docs/Drive content sync |

### Infrastructure
| Technology | Role |
|---|---|
| Vercel (serverless) | Primary deployment — Node.js 20.x, auto-scaling, zero ops |
| Netlify | Fallback deployment target |
| Docker + Nginx | Containerized self-hosting option |
| Vite (via Astro) | Build system, code splitting, asset pipeline |

### Output Mode
The application runs in Astro `server` mode: every page is server-rendered on demand, enabling per-request tenant resolution, locale detection, and dynamic Supabase data fetching. Static assets (`/_astro/*`) are cached for 1 year as immutable.

---

## 5. Tenant Profiles

### 5.1 Moving Services Cluster (10 brands)

All 10 brands share the same lead capture pipeline, contact forms, pricing pages, and service catalog — differentiated only by brand config. The booking engine (with Stripe payment) is live on Lausanne Déménagement and extensible to all.

| Slug | Brand | Domain | Specialty |
|---|---|---|---|
| `pedro` | Pedro Déménagement | pedrodemenagement.ch | Default / full-service moving, Suisse romande |
| `lausanne` | Déménagement Lausanne | lausannedemenagement.ch | Local Lausanne & Vaud, live booking + payment |
| `urgent` | Déménagement Urgent | demenagementurgent.ch | Rapid-response moves, red/orange emergency branding |
| `transport` | Transport Meubles | transportmeubles.ch | Furniture-only transport, dark navy theme |
| `debarras` | Débarras Lausanne | debarraslausanne.ch | Clearance/junk removal, deep green theme |
| `videmaison` | Vide Maison | videmaison.ch | Full-home emptying, warm beige premium |
| `videsuccession` | Vide Succession | videsuccession.ch | Estate clearance, dark gold theme |
| `nettoyagesuccession` | Nettoyage Succession | nettoyagesuccession.ch | Post-succession deep clean |
| `lausannenettoyage` | Nettoyage Lausanne | lausannenettoyage.ch | Commercial & residential cleaning |
| `etatdeslieux` | État des lieux Lausanne | etatdeslieuxlausanne.ch | Property inspection reports |

### 5.2 Luxury & Concierge

| Slug | Brand | Domain | Specialty |
|---|---|---|---|
| `laclemanexperience` | Lac Léman Experience | laclemanexperience.ch | Premium Lake Geneva experiences: sunset cruises, UNESCO vineyards, private dining. **6 languages** (FR/EN/DE/IT/AR/ZH). |

### 5.3 SaaS Product

| Slug | Brand | Domains | Specialty |
|---|---|---|---|
| `tonsiteweb` | TonSiteWeb | tonsiteweb.ch / tonwebsite.ch | Website builder SaaS for Swiss SMEs. Multi-plan Stripe subscriptions. Dashboard with clients, projects, tasks, websites, invoices, orders, support. Content provisioned via Google Docs. Customer sites rendered on custom domains via Supabase fallback. |

### 5.4 Specialty Verticals

| Slug | Brand | Domain | Specialty |
|---|---|---|---|
| `maison-cortes` | Maison Cortes | maisoncortes.ch | Curated gold-plated brass objects. Full e-commerce: 500+ SKUs, cart, TTL reservations, Stripe checkout. |
| `ateliermemoire` | Atelier Mémoire | ateliermemoire.ch | Vintage photo restoration & colorisation. Online/postal submission workflow. FR/DE/IT. |
| `tolo-coiffure` | Tolo Coiffure | tolocoiffure.ch | Premium hair salon in Lausanne. Service catalog, gallery, booking-ready. |

---

## 6. Revenue Streams

### 6.1 Lead Capture → Service Conversion
**Applicable to:** All 10 moving/service brands + État des lieux + Lac Léman Experience

Every contact form on every brand posts to `/api/contact`, which:
1. Saves the lead to Supabase `leads` table with `tenant_id`
2. Sends a confirmation email to the customer (Resend)
3. Sends a notification email to the brand's operator
4. Optionally triggers a Zapier webhook for CRM routing

The operator converts leads via phone/WhatsApp. This is a high-margin, low-tech-dependency model proven in the Swiss service market.

### 6.2 Booking + Online Payment
**Applicable to:** Lausanne Déménagement (live), extensible to all service brands

```
Customer selects date/time → POST /api/booking → Stripe checkout session
→ Payment confirmed → Stripe webhook → booking.status = 'confirmed'
→ Confirmation email to customer + admin notification
```

The booking engine handles:
- Real-time availability from Supabase (conflict detection against `bookings` + `booking_blocks`)
- Stripe `mode: 'payment'` for one-time service fees
- Timezone-aware scheduling
- Localized confirmation emails (FR/EN/DE/IT)

Price is configured per tenant via environment variables (`LAUSANNE_BOOKING_PRICE_CHF`), making it trivially extensible.

### 6.3 E-Commerce
**Applicable to:** Maison Cortes

- Product catalog from `data/maison-cortes-inventory.json` (500+ SKUs: bracelets, rings, chains, watches, earrings, pendants)
- TTL-based cart reservations (prevents overselling during checkout)
- Stripe one-time payment checkout
- Webhook at `/api/maison-cortes/webhook` confirms order and updates inventory
- Orders tracked in Supabase

### 6.4 SaaS Subscriptions
**Applicable to:** TonSiteWeb

Four plan tiers, priced in CHF, managed in Stripe:

| Plan | Target | Description |
|---|---|---|
| Essential | Solo/freelance | Single-page showcase, basic customisation |
| Advanced | SME | Multi-page, e-commerce, custom domain |
| Care (79/149/249 CHF) | Ongoing support | Tiered annual maintenance packages |
| Premium (999–1500 CHF) | Enterprise/agency | Full build + priority support + domain provisioning |

Stripe webhook handles:
- `checkout.session.completed` → provisions website in Supabase, deploys template, sends welcome email
- `invoice.paid` → renews subscription record
- `customer.subscription.deleted` → cancels account

---

## 7. API Surface

**44+ serverless endpoints** deployed as Vercel functions. All return JSON or HTML depending on `Accept` header / form submission context.

### Public Endpoints (all tenants)

| Endpoint | Method | Purpose |
|---|---|---|
| `GET /api/health` | GET | Liveness probe — stateless, no DB dependency |
| `POST /api/contact` | POST | Lead capture → Supabase `leads` + email |
| `POST /api/demo` | POST | Demo signup (TonSiteWeb) |
| `POST /api/feedback` | POST | In-page feedback |
| `GET /api/booking` | GET | Availability slots for a given date |
| `POST /api/booking` | POST | Create booking + Stripe checkout session |
| `POST /api/stripe-webhook` | POST | Stripe event handler (booking, order, subscription) |

### Auth (TonSiteWeb)

| Endpoint | Purpose |
|---|---|
| `POST /api/auth/register` | Signup — 12-char password policy, Resend welcome email |
| `POST /api/auth/signin` | Login — email + password, rate-limited |
| `POST /api/auth/forgot-password` | Reset email via Resend |
| `POST /api/auth/reset-password` | Password update |
| `GET /api/auth/session` | Validate session token |
| `GET /api/auth/verify` | Email confirmation |

### Payment (TonSiteWeb)

| Endpoint | Purpose |
|---|---|
| `POST /api/payment/checkout` | Create Stripe checkout session |
| `GET /api/payment/session` | Retrieve session details |
| `GET /api/payment/redirect` | Post-payment redirect handler |
| `GET /api/payment/portal` | Stripe customer portal link |

### Backend CRUD (TonSiteWeb Dashboard)

| Resource | Endpoints |
|---|---|
| Clients | `GET/POST /api/backend/clients`, `GET/PUT/DELETE /api/backend/clients/[id]` |
| Projects | `GET/POST /api/backend/projects`, `GET/PUT/DELETE /api/backend/projects/[id]` |
| Tasks | `GET/POST /api/backend/tasks`, `GET/PUT/DELETE /api/backend/tasks/[id]` |
| Invoices | `GET/POST /api/backend/invoices`, `GET/PUT/DELETE /api/backend/invoices/[id]` |
| Subscriptions | `GET/POST /api/backend/subscriptions`, `GET/PUT/DELETE /api/backend/subscriptions/[id]` |
| Websites | `GET/POST /api/backend/websites`, `GET/PUT/DELETE /api/backend/websites/[id]` |
| Orders | `GET /api/backend/orders`, `GET /api/backend/orders/[id]` |
| Team | `GET/POST /api/backend/team`, `DELETE /api/backend/team/[id]` |
| Documents | `GET/POST /api/backend/documents`, `GET/PUT/DELETE /api/backend/documents/[id]` |
| Support | `GET/POST /api/backend/support`, `GET/PUT /api/backend/support/[id]` |
| Dashboard | `GET /api/backend/dashboard/summary` |

### Specialty Tenant Endpoints

| Endpoint | Purpose |
|---|---|
| `POST /api/maison-cortes/select` | Add/remove cart items (TTL reservations) |
| `POST /api/maison-cortes/checkout` | E-commerce checkout |
| `POST /api/maison-cortes/webhook` | Order confirmation |
| `POST /api/atelier-memoire/checkout` | Photo restoration service checkout |
| `GET /api/domains/search` | Domain availability search (TonSiteWeb) |

**Rate limiting** is applied to all public endpoints: 6–10 requests per 60-second window per IP, enforced in `src/lib/rate-limit.ts`.

---

## 8. Internationalisation (i18n)

**6 supported languages:** French (default), English, German, Italian, Arabic, Chinese

**Resolution priority:**
1. `aw_lang` cookie (set by client-side language picker, persisted in localStorage)
2. Path prefix: `/(fr|en|de|it|ar|zh)/...` (used in TonSiteWeb marketing pages)
3. Query param: `?lang=en`
4. `Accept-Language` HTTP header
5. Brand default locale (`laclemanexperience` defaults to `en`, all others to `fr`)

**Localized email templates:** 22 HTML email templates × 4 locales (FR/EN/DE/IT) = 88 locale-specific email files under `/emails/`

**Currency formatting:** `Intl.NumberFormat` with locale-aware CHF formatting (e.g., `CHF 149.00` in EN, `149.00 CHF` in FR)

**TonSiteWeb** has fully localized marketing pages under `/tonsiteweb/(fr|en|de|it)/` covering home, pricing, services, contact, about, and choose-template.

---

## 9. Security & Compliance

### Authentication & Authorization
- **Supabase Auth** (JWT Bearer tokens) for TonSiteWeb dashboard access
- `withAuth()` middleware wrapper validates tokens on all `/api/backend/*` routes
- Agency context (`getAgencyContext()`) enforces that every user operates within their own data scope
- Service role key (unrestricted DB access) is server-only, never exposed to clients

### Database Security
- **Row-Level Security (RLS)** enabled on all sensitive Supabase tables
- Policies: "Owners manage agencies" (`owner_id = auth.uid()`), "Members manage agency resources" (cross-check `agency_members` table)
- Multi-tenant domain migration (`20250213_multi_tenant_domains.sql`) and RLS hardening (`20250212_harden_backend.sql`) applied via versioned migrations

### Rate Limiting
- `assertRateLimit(request, { key, limit, window })` applied per-endpoint
- Contact: 6 req/60s · Auth: 5–10 req/60–300s · Booking: configured per tenant

### Geographic Access Control
- **Swiss IP-only mode** (`SWISS_IP_ONLY=1`) enforces that only Swiss-originating traffic (detected via `x-vercel-ip-country`, `cf-ipcountry`, `x-country-code` headers) can access tenant pages in production
- Bypass via `x-geo-bypass-token` header (configurable secret) for authorized testing from abroad
- Returns a branded 403 HTML response for blocked traffic

### Input Security
- Stripe webhook signature verification (HMAC-SHA256 via `STRIPE_WEBHOOK_SECRET`)
- HTML escaping (`escapeHtml()`) applied to all user data rendered in email templates
- Server-side form validation on all API routes
- Secrets managed exclusively via Vercel environment variables — never committed to the repository

### Privacy
- `/privacy` and `/terms` pages per tenant
- Lead data retained in Supabase with configurable DPO contact
- No third-party analytics without opt-in

---

## 10. Deployment & Scalability

### Primary: Vercel Serverless
- **Runtime:** Node.js 20.x on Vercel serverless functions
- **Scaling:** Automatic — each request is an independent function invocation
- **30+ domains** routed to a single Vercel project via the tenant resolution system
- **Asset caching:** `/_astro/*` served with `Cache-Control: public, max-age=31536000, immutable` (1-year CDN cache)
- **Cold start:** ~200ms typical; <50ms warm (Stripe and googleapis are lazy-loaded, not bundled)
- **Vite build cache** stored at `/tmp/astro-pedrodemenagement-vite-cache` to avoid root filesystem ownership issues in CI

### Fallback: Netlify
- `netlify.toml` configured with identical build command and asset cache headers
- Zero additional configuration required to deploy

### Self-Hosted: Docker + Nginx
- `Dockerfile` provides a multi-stage build: Node.js LTS → `npm install` → `astro build` → Nginx stable Alpine serving `dist/`
- Port 8080
- `docker-compose.yml` for local or on-premise deployment

### Build Pipeline
```bash
npm run build       # Astro → Vercel serverless output
npm run check       # TypeScript check + ESLint + Prettier
npm run test        # Node native test runner
npm run smoke       # E2E smoke tests against deployed endpoints
vercel deploy       # Push to Vercel
```

---

## 11. Roadmap

The current platform is production-grade for lead capture, booking, and e-commerce. The following milestones are identified for the next funding phase:

| Priority | Item | Status | Effort |
|---|---|---|---|
| P0 | TonSiteWeb Dashboard: wire app routes to Supabase CRUD + auth guards | In progress (API layer complete, UI shells exist) | 3–5 days |
| P0 | Lead integrity across all brands: verify all forms post to `/api/contact` | Mostly complete, regression test needed | 1 day |
| P1 | Domain provisioning: complete GoDaddy API integration (skeleton exists in `/api/domains/`) | Skeleton exists | 3 days |
| P1 | Error monitoring: Sentry or Datadog integration | Not started | 1 day |
| P1 | CI/CD: Playwright E2E test suite on every commit | Smoke scripts exist | 3 days |
| P2 | Booking engine: expand to all 10 service brands | Live on Lausanne, config-driven | 2 days per brand |
| P2 | Maison Cortes: migrate inventory JSON → Supabase for real-time stock management | JSON file exists | 2 days |
| P2 | Atelier Mémoire: finalize photo upload + processing workflow | Routes exist | 2–4 days |

---

## 12. Technical Appendix

### A. Key File Paths

| File | Purpose |
|---|---|
| `src/lib/brands.config.ts` | 15 brand profiles (identity, SEO, theme) |
| `src/lib/tenants.ts` | TenantConfig registry, `resolveTenantFromRequest()` |
| `src/middleware.ts` | Request interception: tenant resolution, geo-lock, basePath rewriting |
| `src/lib/env.ts` | 47 typed environment variables |
| `src/lib/supabase.ts` | `getSupabaseAdmin()`, `getSupabaseAnon()` |
| `src/lib/stripe.ts` | Stripe client initialization |
| `src/lib/booking.ts` | `parseBookingPayload()`, `checkBookingConflicts()`, availability |
| `src/lib/email.ts` | `sendTransactionalEmail()` via Resend |
| `src/lib/email-templates.ts` | `renderEmailTemplate()`, locale-aware, CHF formatting |
| `src/lib/website-resolver.ts` | `getWebsiteByHost()` — TonSiteWeb customer domain lookup |
| `src/lib/rate-limit.ts` | `assertRateLimit()` — IP-based rate limiter |
| `src/pages/api/contact.ts` | Lead capture (all brands) |
| `src/pages/api/booking.ts` | Booking creation + Stripe session |
| `src/pages/api/stripe-webhook.ts` | Stripe event handler |
| `src/layouts/PageLayout.astro` | Brand-aware layout (CSS vars, header, footer) |
| `src/pages/__site/[...path].astro` | TonSiteWeb customer site fallback renderer |
| `supabase/migrations/` | Versioned schema + RLS migrations |
| `emails/` | 22 × 4-locale HTML email templates |

### B. Environment Variables (47 keys)

**Required:**
```
SUPABASE_URL · SUPABASE_ANON_KEY · SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY · STRIPE_PUBLISHABLE_KEY · STRIPE_WEBHOOK_SECRET
RESEND_API_KEY · SENDER_EMAIL · SENDER_NAME
```

**Deployment:**
```
SITE_URL / PUBLIC_SITE_URL / ORIGIN
VERCEL_TOKEN · VERCEL_PROJECT_ID · VERCEL_TEAM_ID
DOMAIN_ROOT
```

**Integrations:**
```
ZAPIER_WEBHOOK_URL
GODADDY_API_KEY · GODADDY_API_SECRET
GOOGLE_SERVICE_ACCOUNT_EMAIL · GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
GOOGLE_DRIVE_PARENT_FOLDER_ID · DOCS_SECTION_TEMPLATE_ID
```

**Feature flags:**
```
SWISS_IP_ONLY · SWISS_IP_BYPASS_TOKEN
DEPLOY_AUTOMATION_ENABLED
```

**Pricing (Stripe price IDs):**
```
PRICE_ESSENTIAL · PRICE_ADVANCED
PRICE_CARE_79 · PRICE_CARE_149 · PRICE_CARE_249
PRICE_ESSENTIAL_999 · PRICE_ESSENTIAL_1249 · PRICE_ESSENTIAL_1500
```

**Booking:**
```
LAUSANNE_BOOKING_PRICE_CHF · LAUSANNE_BOOKING_CURRENCY · LAUSANNE_BOOKING_PRODUCT_NAME
```

### C. Database Schema Summary

| Table | Tenant Isolation | Key Columns |
|---|---|---|
| `leads` | `tenant_id` | name, email, company, message, source, locale |
| `bookings` | `tenant_id` | status, customer_name/email/phone, service, address, start_time, end_time, timezone, stripe_session_id, amount_total |
| `booking_blocks` | `tenant_id` | start_time, end_time (admin-managed unavailability) |
| `agencies` | `owner_id` (auth) | name, slug, plan, owner_id |
| `agency_members` | via agency | user_id, agency_id, role |
| `clients` | via agency | name, email, status |
| `projects` | via agency | name, client_id, status |
| `tasks` | via agency | title, project_id, status, due_date |
| `invoices` | via agency | client_id, amount, status, due_date |
| `documents` | via agency | title, client_id, type, status |
| `websites` | `agency_id` | slug, name, domain, plan, status, template_key |
| `website_domains` | via website | domain, is_primary, is_verified |
| `website_sections` | via website | section_key, heading, content, google_doc_id |
| `orders` | `tenant_id` | order_number (TSW-YYYYMMDD-XXXX), status, stripe_session_id |
| `support_requests` | via agency | title, status, priority |

### D. Tenant Registry (Complete)

| Slug | Brand | Domain(s) | Type | BasePath | Locales |
|---|---|---|---|---|---|
| `pedro` | Pedro Déménagement | pedrodemenagement.ch | Moving (default) | — | fr |
| `lausanne` | Déménagement Lausanne | lausannedemenagement.ch | Moving + booking | — | fr/en/de/it |
| `urgent` | Déménagement Urgent | demenagementurgent.ch | Rapid moving | — | fr |
| `transport` | Transport Meubles | transportmeubles.ch | Furniture transport | — | fr |
| `debarras` | Débarras Lausanne | debarraslausanne.ch | Clearance | — | fr |
| `videmaison` | Vide Maison | videmaison.ch | Home emptying | — | fr |
| `videsuccession` | Vide Succession | videsuccession.ch | Estate clearance | — | fr |
| `nettoyagesuccession` | Nettoyage Succession | nettoyagesuccession.ch | Post-succession clean | — | fr |
| `lausannenettoyage` | Nettoyage Lausanne | lausannenettoyage.ch | Residential cleaning | — | fr |
| `etatdeslieux` | État des lieux Lausanne | etatdeslieuxlausanne.ch | Property inspection | — | fr/en/de/it |
| `laclemanexperience` | Lac Léman Experience | laclemanexperience.ch | Luxury experiences | — | fr/en/de/it/ar/zh |
| `tonsiteweb` | TonSiteWeb | tonsiteweb.ch, tonwebsite.ch | SaaS / site builder | — | fr/en/de/it |
| `maison-cortes` | Maison Cortes | maisoncortes.ch | E-commerce | `/maison-cortes` | fr |
| `ateliermemoire` | Atelier Mémoire | ateliermemoire.ch | Photo restoration | `/atelier-memoire` | fr/de/it |
| `tolo-coiffure` | Tolo Coiffure | tolocoiffure.ch | Hair salon | `/tolo-coiffure` (internal only) | fr |

---
---

# VERSION FRANÇAISE

---

## 1. Résumé Exécutif

Cette plateforme est une application web multi-tenant de niveau production, construite sur Astro 5 et Supabase, servant **15 sites web brandés actifs** depuis une seule base de code déployée sur l'infrastructure serverless Vercel. Le système combine un cluster de marques de services suisses (déménagement, nettoyage, débarras, inspection, expériences de luxe) avec une offre SaaS productisée — **TonSiteWeb** — qui permet aux PME de lancer leurs propres sites web en marque blanche. Chaque tenant partage le même moteur de rendu, la même pipeline de paiement Stripe, l'automatisation des emails, le système de réservation et le backend Supabase, tout en étant entièrement isolé par identité de marque, palette de couleurs, typographie, domaine et données.

---

## 2. Vue d'Ensemble de la Plateforme

**Ce que c'est :** Une « usine à sites web » pour les PME et les prestataires de services suisses, construite comme une application Astro SSR unique où chaque marque visible par les clients est un tenant entièrement indépendant, résolu au moment de la requête à partir de l'en-tête HTTP host entrant.

**Proposition de valeur principale :**
- Une base de code → 15 sites web brandés actifs avec une parité de fonctionnalités complète
- L'intégration d'un nouveau tenant ne nécessite aucune provision d'infrastructure — ajouter un domaine et une entrée de configuration de marque
- Toute l'infrastructure partagée (base de données, paiements, emails, moteur de réservation) est éprouvée sur 15 tenants en production
- TonSiteWeb transforme la plateforme en produit : les PME achètent un site web, et la plateforme le provisionne, le rend et le gère sur leur domaine personnalisé

**Domaines actifs :**
`pedrodemenagement.ch` · `lausannedemenagement.ch` · `demenagementurgent.ch` · `transportmeubles.ch` · `debarraslausanne.ch` · `videmaison.ch` · `videsuccession.ch` · `nettoyagesuccession.ch` · `lausannenettoyage.ch` · `etatdeslieuxlausanne.ch` · `laclemanexperience.ch` · `maisoncortes.ch` · `ateliermemoire.ch` · `tolocoiffure.ch` · `tonsiteweb.ch` / `tonwebsite.ch`

---

## 3. Architecture Multi-Tenant

C'est le cœur technique de la plateforme. Chaque requête HTTP entrante est résolue vers exactement un tenant avant l'exécution de toute logique de page. Le rendu, le thème, l'accès aux données, les emails et les flux de paiement sont tous scopés par tenant à partir de ce moment.

### 3.1 Registre des Tenants

Les tenants sont définis dans deux fichiers sources :

**`src/lib/brands.config.ts`** — 15 profils de marque, chacun portant :
- Identité : `key`, `name`, `shortName`, `domain`, `phone`, `whatsapp`, `email`, `legalOperator`
- SEO : `seoTitle`, `seoDescription`
- Thème visuel : `primaryColor`, `secondaryColor`, `fonts` (sans / heading / serif), `theme` (bg, gradient, accent, surface, card, shadow, pattern)

**`src/lib/tenants.ts`** — 15 entrées `TenantConfig` construites depuis les marques et les extras :

```
brandTenants (14) = toutes les entrées BRANDS sauf maisoncortes, auto-mappées avec :
  - slug  = brand.key
  - domains = [brand.domain, www.brand.domain]
  - basePath = '/atelier-memoire' | '/tolo-coiffure' | undefined
  - preserveBasePath = true (pour ateliermemoire + tolo-coiffure)

extraTenants (2) = définis manuellement :
  - maison-cortes  →  brandKey='maisoncortes', basePath='/maison-cortes', preserveBasePath=true
  - tonsiteweb     →  domains=[tonsiteweb.ch, tonwebsite.ch, …], pas de basePath
```

### 3.2 Algorithme de Résolution des Tenants

Exécuté sur **chaque requête** dans `src/middleware.ts` via `resolveTenantFromRequest()` :

```
┌─────────────────────────────────────────────────────────────────┐
│                    Requête HTTP entrante                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  1. Correspondance Host │  x-forwarded-host / host / url.host
              │  (priorité maximale)    │  → TENANTS.find(t => matchesHost(host, t))
              └────────────┬───────────┘
                           │ pas de correspondance
                           ▼
              ┌────────────────────────┐
              │  2. Paramètre Query    │  ?tenant=<slug>
              └────────────┬───────────┘
                           │ pas de correspondance
                           ▼
              ┌────────────────────────┐
              │  3. Préfixe de chemin  │  /atelier-memoire/*, /maison-cortes/*
              └────────────┬───────────┘
                           │ pas de correspondance
                           ▼
              ┌────────────────────────┐
              │  4. Fallback            │  défaut vers tenant slug='pedro'
              └────────────┬───────────┘
                           │
                           ▼
              context.locals.tenant = TenantContext {
                slug, brandKey, domains, basePath,
                source: 'host'|'query'|'path'|'fallback',
                host
              }
```

### 3.3 Propagation du Contexte

Une fois résolu, le contexte tenant circule dans tout le cycle de vie de la requête :

```
middleware.ts
  └─ context.locals.tenant = TenantContext

Pages (.astro)
  └─ const tenant = Astro.locals.tenant
  └─ const brand = BRANDS[tenant.brandKey]

Layouts (PageLayout.astro)
  └─ Applique des propriétés CSS personnalisées depuis brand.theme :
     --aw-color-primary, --aw-color-secondary, --brand-accent,
     --brand-bg, --brand-gradient, --aw-font-sans, --aw-font-heading

Routes API
  └─ const tenant = getTenantFromContext({ request, locals })
  └─ Toutes les écritures Supabase incluent : { tenant_id: tenant.slug }
  └─ Toutes les lectures Supabase filtrent sur : .eq('tenant_id', tenant.slug)
```

### 3.4 Isolation des Données

Chaque enregistrement écrit dans Supabase porte une colonne `tenant_id` égale au slug du tenant. Chaque lecture filtre sur cette colonne. Il n'existe aucun état mutable partagé entre les tenants au niveau de la base de données.

Les politiques **Row-Level Security (RLS)** sont activées sur toutes les tables sensibles, appliquées au niveau PostgreSQL via les claims JWT Supabase Auth.

### 3.5 Système de Thèmes par Marque

Chacune des 15 marques possède une identité visuelle complète stockée dans `brands.config.ts`. Les propriétés CSS personnalisées sont injectées au niveau du layout, de sorte que chaque page — hero, pricing, contact, footer — s'affiche avec la bonne identité de marque sans aucun code de composant spécifique au tenant.

### 3.6 Tenants à BasePath

Trois tenants utilisent des préfixes de chemin internes tout en servant des URLs propres en externe :

| Tenant | Chemin interne | URL externe | Mécanisme |
|---|---|---|---|
| Atelier Mémoire | `/atelier-memoire/*` | `ateliermemoire.ch/*` | Redirection 308 sur correspondance host |
| Tolo Coiffure | `/tolo-coiffure/*` | `tolocoiffure.ch/*` | Réécriture interne transparente |
| Maison Cortes | `/maison-cortes/*` | `maisoncortes.ch/*` | preserveBasePath = true |

### 3.7 Fallback Site Client (TonSiteWeb)

Quand un host inconnu (le domaine personnalisé d'un client TonSiteWeb) atteint la plateforme, le middleware effectue une recherche Supabase via `getWebsiteByHost()` :

```
Host inconnu → getWebsiteByHost(host) → tables Supabase websites + website_domains
  → si trouvé : réécriture vers /__site/<chemin-original>
                injection d'en-têtes : x-website-id, x-original-path
  → /__site/[...path].astro rend depuis la table website_sections
```

Les clients TonSiteWeb peuvent pointer n'importe quel domaine vers la plateforme et avoir leur contenu rendu dynamiquement, sans redéploiement.

---

## 4. Stack Technique

### Frontend
| Technologie | Version | Rôle |
|---|---|---|
| Astro | 5.0 | Framework SSR, routage, modèle de composants |
| TypeScript | 5.8.3 | Typage fort sur toutes les couches |
| Tailwind CSS | 3.4.17 | Styles utilitaires |
| astro-icon | 1.1.5 | Système d'icônes SVG |
| @astrolib/seo | 1.0.0-beta.8 | Balises meta, Open Graph, données structurées |

### Backend & Données
| Technologie | Version | Rôle |
|---|---|---|
| Supabase | 2.78.0 | PostgreSQL, Auth (JWT), RLS, temps réel |
| Stripe | 19.2.0 | Paiements (ponctuel + abonnements), webhooks |
| Resend | — | Email transactionnel (22 templates HTML, 4 locales) |
| googleapis | 164.1.0 | Synchronisation de contenu Google Docs/Drive |

### Infrastructure
| Technologie | Rôle |
|---|---|
| Vercel (serverless) | Déploiement principal — Node.js 20.x, auto-scaling, zéro ops |
| Netlify | Cible de déploiement de secours |
| Docker + Nginx | Option d'hébergement conteneurisé |

---

## 5. Profils des Tenants

### 5.1 Cluster Services de Déménagement (10 marques)

Les 10 marques partagent la même pipeline de capture de leads, les mêmes formulaires de contact, les pages de prix et le catalogue de services — différenciés uniquement par la configuration de marque. Le moteur de réservation (avec paiement Stripe) est actif sur Lausanne Déménagement et extensible à toutes les marques.

| Slug | Marque | Domaine | Spécialité |
|---|---|---|---|
| `pedro` | Pedro Déménagement | pedrodemenagement.ch | Service complet, Suisse romande |
| `lausanne` | Déménagement Lausanne | lausannedemenagement.ch | Local Lausanne & Vaud, réservation + paiement actifs |
| `urgent` | Déménagement Urgent | demenagementurgent.ch | Interventions rapides, identité urgence rouge/orange |
| `transport` | Transport Meubles | transportmeubles.ch | Transport de meubles uniquement |
| `debarras` | Débarras Lausanne | debarraslausanne.ch | Débarras et évacuation |
| `videmaison` | Vide Maison | videmaison.ch | Vidage complet de maison |
| `videsuccession` | Vide Succession | videsuccession.ch | Gestion de succession |
| `nettoyagesuccession` | Nettoyage Succession | nettoyagesuccession.ch | Nettoyage après succession |
| `lausannenettoyage` | Nettoyage Lausanne | lausannenettoyage.ch | Nettoyage résidentiel et commercial |
| `etatdeslieux` | État des lieux Lausanne | etatdeslieuxlausanne.ch | Rapports de constat immobilier |

### 5.2 Luxe & Conciergerie

| Slug | Marque | Domaine | Spécialité |
|---|---|---|---|
| `laclemanexperience` | Lac Léman Experience | laclemanexperience.ch | Expériences premium : croisières au coucher du soleil, vignobles UNESCO, tables d'hôtes. **6 langues** (FR/EN/DE/IT/AR/ZH). |

### 5.3 Produit SaaS

| Slug | Marque | Domaines | Spécialité |
|---|---|---|---|
| `tonsiteweb` | TonSiteWeb | tonsiteweb.ch / tonwebsite.ch | SaaS de création de sites web pour PME suisses. Abonnements Stripe multi-plans. Tableau de bord clients, projets, tâches, sites, factures, commandes, support. Contenu provisionné via Google Docs. Sites clients rendus sur domaines personnalisés via fallback Supabase. |

### 5.4 Verticales Spécialisées

| Slug | Marque | Domaine | Spécialité |
|---|---|---|---|
| `maison-cortes` | Maison Cortes | maisoncortes.ch | Objets architecturaux en laiton plaqué or. E-commerce complet : 500+ SKUs, panier, réservations TTL, paiement Stripe. |
| `ateliermemoire` | Atelier Mémoire | ateliermemoire.ch | Restauration et colorisation de photos anciennes. Workflow d'envoi en ligne/courrier. FR/DE/IT. |
| `tolo-coiffure` | Tolo Coiffure | tolocoiffure.ch | Salon de coiffure haut de gamme à Lausanne. Catalogue de prestations, galerie, prêt pour la réservation. |

---

## 6. Sources de Revenus

### 6.1 Capture de Leads → Conversion de Services
**Applicable à :** Les 10 marques déménagement/services + État des lieux + Lac Léman Experience

Chaque formulaire de contact sur chaque marque poste vers `/api/contact`, qui :
1. Sauvegarde le lead dans la table Supabase `leads` avec `tenant_id`
2. Envoie un email de confirmation au client (Resend)
3. Envoie un email de notification à l'opérateur de la marque
4. Déclenche optionnellement un webhook Zapier pour le routage CRM

### 6.2 Réservation + Paiement en Ligne
**Applicable à :** Lausanne Déménagement (actif), extensible à toutes les marques de services

```
Client sélectionne date/heure → POST /api/booking → session Stripe checkout
→ Paiement confirmé → webhook Stripe → booking.status = 'confirmed'
→ Email de confirmation client + notification admin
```

Le moteur gère : disponibilité temps réel (détection de conflits), paiement Stripe ponctuel, planification par fuseau horaire, emails de confirmation localisés.

### 6.3 E-Commerce
**Applicable à :** Maison Cortes

Catalogue depuis JSON (500+ SKUs), réservations TTL anti-survente, paiement Stripe ponctuel, webhook de confirmation de commande, suivi dans Supabase.

### 6.4 Abonnements SaaS
**Applicable à :** TonSiteWeb

Quatre niveaux de plans en CHF, gérés dans Stripe : Essential, Advanced, Care (79/149/249 CHF), Premium (999–1500 CHF). Le webhook Stripe provisionne automatiquement le site, déploie le template et envoie l'email de bienvenue.

---

## 7. Surface API

**44+ endpoints serverless** déployés comme fonctions Vercel.

- **Endpoints publics :** `/api/contact`, `/api/booking`, `/api/demo`, `/api/feedback`, `/api/health`
- **Auth (TonSiteWeb) :** register, signin, forgot-password, reset-password, session, verify
- **Paiement :** checkout, session, redirect, portal (customer Stripe)
- **Webhook :** `/api/stripe-webhook` (booking, commande, abonnement)
- **CRUD Backend :** clients, projets, tâches, factures, abonnements, sites, commandes, équipe, documents, support, dashboard
- **Tenants spéciaux :** Maison Cortes (panier, commande, webhook), Atelier Mémoire (checkout), domaines (recherche)

**Limitation de débit :** 6–10 requêtes par fenêtre de 60 secondes par IP sur tous les endpoints publics.

---

## 8. Internationalisation (i18n)

**6 langues supportées :** Français (défaut), Anglais, Allemand, Italien, Arabe, Chinois

**Priorité de résolution :**
1. Cookie `aw_lang` (persisté en localStorage côté client)
2. Préfixe de chemin `/(fr|en|de|it|ar|zh)/...`
3. Paramètre query `?lang=en`
4. En-tête HTTP `Accept-Language`
5. Locale par défaut de la marque

**Templates email localisés :** 22 templates HTML × 4 locales = 88 fichiers email sous `/emails/`

**Formatage monétaire :** `Intl.NumberFormat` avec formatage CHF spécifique à la locale

---

## 9. Sécurité et Conformité

### Authentification & Autorisation
- **Supabase Auth** (tokens JWT Bearer) pour l'accès au tableau de bord TonSiteWeb
- Wrapper `withAuth()` valide les tokens sur toutes les routes `/api/backend/*`
- Clé de rôle service (accès DB illimité) côté serveur uniquement, jamais exposée aux clients

### Sécurité de la Base de Données
- **Row-Level Security (RLS)** activé sur toutes les tables Supabase sensibles
- Politiques : « Les propriétaires gèrent les agences » (`owner_id = auth.uid()`), « Les membres gèrent les ressources d'agence »
- Migrations versionnées appliquées : hardening RLS, domaines multi-tenant, pipeline de réservations

### Contrôle d'Accès Géographique
- **Mode IP suisse uniquement** (`SWISS_IP_ONLY=1`) : seul le trafic originaire de Suisse (via en-têtes `x-vercel-ip-country`, `cf-ipcountry`) peut accéder aux pages tenant en production
- Token de contournement configurable pour les tests autorisés depuis l'étranger
- Retourne une réponse HTML 403 brandée pour le trafic bloqué

### Sécurité des Entrées
- Vérification de signature webhook Stripe (HMAC-SHA256)
- Échappement HTML (`escapeHtml()`) sur toutes les données utilisateur dans les emails
- Validation côté serveur sur toutes les routes API
- Secrets gérés exclusivement via variables d'environnement Vercel — jamais committés dans le dépôt

---

## 10. Déploiement et Scalabilité

### Principal : Vercel Serverless
- **Runtime :** Node.js 20.x sur fonctions serverless Vercel
- **Scaling :** Automatique — chaque requête est une invocation de fonction indépendante
- **30+ domaines** routés vers un seul projet Vercel via le système de résolution de tenants
- **Cache d'assets :** `/_astro/*` servi avec `Cache-Control: public, max-age=31536000, immutable` (cache CDN 1 an)
- **Démarrage à froid :** ~200ms typique ; <50ms en chaud

### Secours : Netlify
`netlify.toml` configuré avec une commande de build et des en-têtes de cache d'assets identiques. Aucune configuration supplémentaire requise.

### Auto-hébergement : Docker + Nginx
Dockerfile multi-étapes : Node.js LTS → `npm install` → `astro build` → Nginx Alpine stable serveur `dist/` sur le port 8080.

---

## 11. Feuille de Route

| Priorité | Élément | Statut | Effort |
|---|---|---|---|
| P0 | Tableau de bord TonSiteWeb : connecter les routes app au CRUD Supabase + guards d'auth | En cours (couche API complète, shells UI existants) | 3–5 jours |
| P0 | Intégrité des leads sur toutes les marques : vérifier que tous les formulaires postent vers `/api/contact` | Quasi complet, test de régression requis | 1 jour |
| P1 | Provision de domaines : compléter l'intégration API GoDaddy (squelette dans `/api/domains/`) | Squelette existant | 3 jours |
| P1 | Monitoring d'erreurs : intégration Sentry ou Datadog | Non démarré | 1 jour |
| P1 | CI/CD : suite de tests E2E Playwright à chaque commit | Scripts de smoke existants | 3 jours |
| P2 | Moteur de réservation : étendre aux 10 marques de services | Actif sur Lausanne, piloté par config | 2 jours/marque |
| P2 | Maison Cortes : migrer JSON inventaire → Supabase pour gestion stock temps réel | Fichier JSON existant | 2 jours |
| P2 | Atelier Mémoire : finaliser le workflow d'upload et traitement photo | Routes existantes | 2–4 jours |

---

## 12. Annexe Technique

### A. Chemins de Fichiers Clés

| Fichier | Rôle |
|---|---|
| `src/lib/brands.config.ts` | 15 profils de marque |
| `src/lib/tenants.ts` | Registre TenantConfig, `resolveTenantFromRequest()` |
| `src/middleware.ts` | Interception de requête : résolution tenant, geo-lock, réécriture basePath |
| `src/lib/env.ts` | 47 variables d'environnement typées |
| `src/lib/booking.ts` | Pipeline de réservation |
| `src/lib/email-templates.ts` | Rendu d'emails localisés, formatage CHF |
| `src/pages/api/contact.ts` | Capture de leads (toutes les marques) |
| `src/pages/api/booking.ts` | Création de réservation + session Stripe |
| `src/pages/api/stripe-webhook.ts` | Gestionnaire d'événements Stripe |
| `src/pages/__site/[...path].astro` | Renderer de fallback pour sites clients TonSiteWeb |
| `supabase/migrations/` | Migrations de schéma et RLS versionnées |
| `emails/` | 22 × 4 locales de templates email HTML |

### B. Registre Complet des Tenants

| Slug | Marque | Domaine(s) | Type | BasePath | Locales |
|---|---|---|---|---|---|
| `pedro` | Pedro Déménagement | pedrodemenagement.ch | Déménagement (défaut) | — | fr |
| `lausanne` | Déménagement Lausanne | lausannedemenagement.ch | Déménagement + réservation | — | fr/en/de/it |
| `urgent` | Déménagement Urgent | demenagementurgent.ch | Déménagement rapide | — | fr |
| `transport` | Transport Meubles | transportmeubles.ch | Transport de meubles | — | fr |
| `debarras` | Débarras Lausanne | debarraslausanne.ch | Débarras | — | fr |
| `videmaison` | Vide Maison | videmaison.ch | Vidage de maison | — | fr |
| `videsuccession` | Vide Succession | videsuccession.ch | Succession | — | fr |
| `nettoyagesuccession` | Nettoyage Succession | nettoyagesuccession.ch | Nettoyage succession | — | fr |
| `lausannenettoyage` | Nettoyage Lausanne | lausannenettoyage.ch | Nettoyage résidentiel | — | fr |
| `etatdeslieux` | État des lieux Lausanne | etatdeslieuxlausanne.ch | Inspection immobilière | — | fr/en/de/it |
| `laclemanexperience` | Lac Léman Experience | laclemanexperience.ch | Expériences de luxe | — | fr/en/de/it/ar/zh |
| `tonsiteweb` | TonSiteWeb | tonsiteweb.ch, tonwebsite.ch | SaaS / site builder | — | fr/en/de/it |
| `maison-cortes` | Maison Cortes | maisoncortes.ch | E-commerce | `/maison-cortes` | fr |
| `ateliermemoire` | Atelier Mémoire | ateliermemoire.ch | Restauration photo | `/atelier-memoire` | fr/de/it |
| `tolo-coiffure` | Tolo Coiffure | tolocoiffure.ch | Salon de coiffure | `/tolo-coiffure` (interne seulement) | fr |

---

*Report generated from source code analysis — March 2026*
