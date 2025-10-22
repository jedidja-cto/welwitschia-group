-- Create clients table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  progress INTEGER DEFAULT 0,
  due_date TIMESTAMP WITH TIME ZONE,
  budget DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT,
  file_size INTEGER,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE,
  due_at TIMESTAMP WITH TIME ZONE
);

-- Create metrics table
CREATE TABLE IF NOT EXISTS public.metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for clients
CREATE POLICY "Clients can view own profile" ON public.clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all clients" ON public.clients
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create RLS Policies for projects
CREATE POLICY "Clients can view own projects" ON public.projects
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM public.clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all projects" ON public.projects
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create RLS Policies for assets
CREATE POLICY "Clients can view own project assets" ON public.assets
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id IN (
        SELECT id FROM public.clients WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Clients can upload assets to own projects" ON public.assets
  FOR INSERT WITH CHECK (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id IN (
        SELECT id FROM public.clients WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can manage all assets" ON public.assets
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create RLS Policies for invoices
CREATE POLICY "Clients can view own invoices" ON public.invoices
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id IN (
        SELECT id FROM public.clients WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can manage all invoices" ON public.invoices
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create RLS Policies for metrics
CREATE POLICY "Clients can view own project metrics" ON public.metrics
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id IN (
        SELECT id FROM public.clients WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can manage all metrics" ON public.metrics
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create RLS Policies for tasks
CREATE POLICY "Clients can view own project tasks" ON public.tasks
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id IN (
        SELECT id FROM public.clients WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Clients can update own project tasks" ON public.tasks
  FOR UPDATE USING (
    project_id IN (
      SELECT id FROM public.projects WHERE client_id IN (
        SELECT id FROM public.clients WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can manage all tasks" ON public.tasks
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS clients_user_id_idx ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS projects_client_id_idx ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS assets_project_id_idx ON public.assets(project_id);
CREATE INDEX IF NOT EXISTS invoices_project_id_idx ON public.invoices(project_id);
CREATE INDEX IF NOT EXISTS metrics_project_id_idx ON public.metrics(project_id);
CREATE INDEX IF NOT EXISTS tasks_project_id_idx ON public.tasks(project_id);