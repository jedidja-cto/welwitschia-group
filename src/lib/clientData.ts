import { supabase } from './supabaseClient';

export type Client = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  role: string;
  user_id: string | null;
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  progress: number | null;
  due_date: string | null;
  client_id: string | null;
  created_at: string | null;
};

export type Invoice = {
  id: string;
  project_id: string | null;
  amount: number;
  status: string | null;
  issued_at: string | null;
  paid_at: string | null;
};

export async function getCurrentClient(): Promise<Client | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;
  if (!session) return null;

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', session.user.id)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Failed to load client', error);
    return null;
  }
  return (data as Client) ?? null;
}

export async function getClientProjects(clientId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to load projects', error);
    return [];
  }
  return (data as Project[]) ?? [];
}

export async function getClientInvoices(clientId: string): Promise<Invoice[]> {
  // First get all projects for this client
  const { data: projects } = await supabase
    .from('projects')
    .select('id')
    .eq('client_id', clientId);
  
  if (!projects || projects.length === 0) {
    return [];
  }
  
  // Then get invoices for these projects
  const projectIds = projects.map(p => p.id);
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .in('project_id', projectIds)
    .order('issued_at', { ascending: false });
    
  if (error) {
    console.error('Failed to load invoices', error);
    return [];
  }
  return (data as Invoice[]) ?? [];
}

export async function getCounts(clientId: string): Promise<{ projects: number; assets: number; tasks: number; metrics: number }>{
  try {
    const projectsResult = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('client_id', clientId);
    const assetsResult = await supabase.from('assets').select('*', { count: 'exact', head: true }).eq('client_id', clientId);
    const tasksResult = await supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('client_id', clientId);
    
    // For metrics, first get all projects for this client
    const { data: projects } = await supabase.from('projects').select('id').eq('client_id', clientId);
    const projectIds = projects?.map(p => p.id) || [];
    const metricsResult = projectIds.length > 0 
      ? await supabase.from('metrics').select('*', { count: 'exact', head: true }).in('project_id', projectIds)
      : { count: 0 };

    return {
      projects: projectsResult.count ?? 0,
      assets: assetsResult.count ?? 0,
      tasks: tasksResult.count ?? 0,
      metrics: metricsResult.count ?? 0,
    };
  } catch (error) {
    console.error('Error fetching counts:', error);
    return { projects: 0, assets: 0, tasks: 0, metrics: 0 };
  }
}