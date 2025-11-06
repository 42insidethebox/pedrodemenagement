-- Enable pgcrypto for gen_random_uuid
create extension if not exists "pgcrypto";

-- Agencies own the workspace data. The owner_id links back to auth.users.
create table if not exists public.agencies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  owner_id uuid references auth.users(id) on delete set null,
  timezone text,
  domain text
);

-- Each Supabase auth user who joins an agency is mirrored here for quick lookup.
create table if not exists public.agency_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid not null references public.agencies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text default 'member',
  timezone text,
  unique (agency_id, user_id)
);

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
  agency_id uuid references public.agencies(id) on delete cascade,
  company_name text not null,
  primary_contact text,
  email text,
  phone text,
  status text default 'lead',
  services text[] default '{}',
  notes text,
  metadata jsonb default '{}'::jsonb
);

alter table public.clients
  add column if not exists agency_id uuid references public.agencies(id) on delete cascade,
  add column if not exists company_name text,
  add column if not exists primary_contact text,
  add column if not exists phone text,
  add column if not exists status text default 'lead',
  add column if not exists services text[] default '{}',
  add column if not exists notes text,
  add column if not exists metadata jsonb default '{}'::jsonb;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  name text not null,
  status text default 'discovery',
  start_date date,
  due_date date,
  budget numeric(12,2),
  currency text,
  notes text,
  metadata jsonb default '{}'::jsonb,
  preview_url text,
  public_url text
);

alter table public.projects
  add column if not exists agency_id uuid references public.agencies(id) on delete cascade,
  add column if not exists name text,
  add column if not exists start_date date,
  add column if not exists due_date date,
  add column if not exists budget numeric(12,2),
  add column if not exists currency text,
  add column if not exists notes text,
  alter column status set default 'discovery',
  alter column metadata set default '{}'::jsonb;

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  assignee_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  status text default 'todo',
  priority text default 'medium',
  due_date date
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  title text not null,
  document_type text default 'proposal',
  status text default 'draft',
  storage_path text not null,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  invoice_number text not null,
  status text default 'draft',
  issue_date date,
  due_date date,
  currency text,
  amount numeric(12,2),
  line_items jsonb default '[]'::jsonb,
  notes text
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.orders (
  id bigint primary key generated always as identity,
  created_at timestamptz not null default now(),
  order_number text unique not null,
  stripe_session_id text unique,
  subscription_id text,
  customer_email text,
  customer_name text,
  company text,
  phone text,
  plan text,
  template_key text,
  amount_total bigint,
  currency text,
  mode text,
  status text,
  metadata jsonb default '{}'::jsonb
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

create table if not exists public.websites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  name text not null,
  status text default 'draft',
  domain text,
  preview_url text,
  production_url text,
  google_doc_id text,
  google_folder_id text,
  template_key text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.website_sections (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  website_id uuid references public.websites(id) on delete cascade,
  section_key text not null,
  heading text,
  content text,
  media jsonb default '[]'::jsonb,
  google_doc_id text,
  google_doc_heading text
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  website_id uuid references public.websites(id) on delete set null,
  customer_email text,
  customer_name text,
  request_type text not null,
  description text,
  status text default 'open',
  priority text default 'normal',
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.subscription_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agency_id uuid references public.agencies(id) on delete cascade,
  subscription_id text not null,
  customer_email text,
  event_type text not null,
  payload jsonb default '{}'::jsonb
);


