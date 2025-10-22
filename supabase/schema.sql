-- Supabase schema for Welwitschia Group Client Portal
-- Create core tables

-- Contact form submissions table
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  status text check (status in ('new','in_progress','completed')) default 'new',
  created_at timestamptz default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  company text,
  role text check (role in ('admin','client','intern','analyst')) not null default 'client',
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  title text not null,
  status text check (status in ('active','pending','paused','completed')) default 'pending',
  progress int check (progress between 0 and 100) default 0,
  due_date date,
  budget numeric,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  file_url text not null,
  uploaded_by uuid references public.clients(id) on delete set null,
  uploaded_at timestamptz default now()
);

create table if not exists public.metrics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  metric_name text not null,
  value numeric not null,
  updated_at timestamptz default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  assignee_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  due_date date,
  status text check (status in ('open','in_progress','done')) default 'open'
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  amount numeric not null,
  status text check (status in ('issued','paid','overdue')) default 'issued',
  issued_at timestamptz default now(),
  paid_at timestamptz
);

-- Storage bucket for assets
-- Run in Storage: create a bucket named 'assets' (public=false)

-- Enable Row Level Security
alter table public.contact_submissions enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.assets enable row level security;
alter table public.metrics enable row level security;
alter table public.tasks enable row level security;
alter table public.invoices enable row level security;

-- Policies
-- Contact form submissions: anyone can insert, only admins can view
create policy if not exists "contact_submissions_insert_public" on public.contact_submissions
for insert with check (true);

create policy if not exists "contact_submissions_read_admin" on public.contact_submissions
for select using (exists(select 1 from public.clients c where c.user_id = auth.uid() and c.role = 'admin'));

-- Clients can read/update their own profile
create policy if not exists "clients_read_own" on public.clients
for select using (auth.uid() = user_id);

create policy if not exists "clients_update_own" on public.clients
for update using (auth.uid() = user_id);

-- Admins can read everything
create policy if not exists "clients_admin_all" on public.clients
for all using (exists(select 1 from public.clients c where c.user_id = auth.uid() and c.role = 'admin'));

-- Projects: clients see own projects; admins see all; interns see projects they are assigned tasks for
create policy if not exists "projects_read_own_or_admin" on public.projects
for select using (
  exists(select 1 from public.clients c where c.user_id = auth.uid() and (c.role = 'admin' or c.id = client_id))
  or exists(select 1 from public.tasks t join public.clients ci on ci.id = t.assignee_id where ci.user_id = auth.uid() and t.project_id = projects.id)
);

-- Assets: clients see assets linked to their projects; admins see all
create policy if not exists "assets_read_policy" on public.assets
for select using (
  exists(select 1 from public.clients c join public.projects p on p.client_id = c.id where c.user_id = auth.uid() and p.id = assets.project_id)
  or exists(select 1 from public.clients c where c.user_id = auth.uid() and c.role = 'admin')
);

-- Metrics: clients and analysts can read; admins read/write
create policy if not exists "metrics_read_policy" on public.metrics
for select using (
  exists(select 1 from public.clients c join public.projects p on p.client_id = c.id where c.user_id = auth.uid() and p.id = metrics.project_id)
  or exists(select 1 from public.clients c where c.user_id = auth.uid() and c.role in ('admin','analyst'))
);

-- Interns: read metrics via tasks assignment
create policy if not exists "metrics_intern_read" on public.metrics
for select using (
  exists(select 1 from public.tasks t join public.clients ci on ci.id = t.assignee_id where ci.user_id = auth.uid() and t.project_id = metrics.project_id)
);

-- Invoices: block interns; clients read own; admins all
create policy if not exists "invoices_read_policy" on public.invoices
for select using (
  exists(select 1 from public.clients c join public.projects p on p.client_id = c.id where c.user_id = auth.uid() and p.id = invoices.project_id and c.role in ('client','admin'))
  or exists(select 1 from public.clients c where c.user_id = auth.uid() and c.role = 'admin')
);