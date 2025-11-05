-- Supabase schema for TonSiteWeb backend
create table if not exists public.leads (
  id bigint primary key generated always as identity,
  created_at timestamptz not null default now(),
  source text,
  name text,
  email text,
  company text,
  message text
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text unique,
  name text,
  company text
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_id uuid references public.clients(id) on delete set null,
  plan text,
  status text,
  metadata jsonb,
  preview_url text,
  public_url text
);

create table if not exists public.orders (
  id bigint primary key generated always as identity,
  created_at timestamptz not null default now(),
  stripe_session_id text unique,
  subscription_id text,
  customer_email text,
  amount_total bigint,
  currency text,
  mode text,
  status text
);

create table if not exists public.webhooks (
  id bigint primary key generated always as identity,
  created_at timestamptz not null default now(),
  provider text,
  type text,
  payload jsonb
);

create table if not exists public.project_feedback (
  id bigint primary key generated always as identity,
  created_at timestamptz not null default now(),
  project_id text,
  order_id text,
  author_name text,
  author_email text,
  message text not null
);

