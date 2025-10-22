import { supabase } from './supabaseClient';
import { Database } from './database.types';

export type Client = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  company: string | null;
  role: string;
  created_at: string | null;
};

export type Project = {
  id: string;
  client_id: string | null;
  title: string;
  description: string | null;
  status: string | null;
  progress: number | null;
  due_date: string | null;
  budget: number | null;
  created_at: string | null;
};

export type Asset = {
  id: string;
  project_id: string | null;
  file_url: string;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  uploaded_by: string | null;
  uploaded_at: string | null;
};

export type Invoice = {
  id: string;
  project_id: string | null;
  amount: number;
  status: string | null;
  issued_at: string | null;
  paid_at: string | null;
  due_at: string | null;
};

export type Metric = {
  id: string;
  project_id: string | null;
  metric_name: string;
  value: number;
  uploaded_at: string | null;
};

export type Task = {
  id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  due_date: string | null;
  completed: boolean | null;
  created_at: string | null;
};

export type ClientStats = {
  totalProjects: number;
  activeProjects: number;
  totalInvoices: number;
  pendingInvoices: number;
  totalAssets: number;
  completedTasks: number;
  pendingTasks: number;
};

/**
 * Get the current client profile based on the authenticated user
 */
export async function getClientProfile(): Promise<Client | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;
  
  if (!session) return null;

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (error) {
    console.error('Error fetching client profile:', error);
    return null;
  }

  return data as Client;
}

/**
 * Get all projects for the current client
 */
export async function getClientProjects(): Promise<Project[]> {
  const client = await getClientProfile();
  if (!client) return [];

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', client.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching client projects:', error);
    return [];
  }

  return data as Project[];
}

/**
 * Get details for a specific project
 */
export async function getProjectDetails(projectId: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error) {
    console.error('Error fetching project details:', error);
    return null;
  }

  return data as Project;
}

/**
 * Get invoices for a specific project
 */
export async function getProjectInvoices(projectId: string): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('project_id', projectId)
    .order('issued_at', { ascending: false });

  if (error) {
    console.error('Error fetching project invoices:', error);
    return [];
  }

  return data as Invoice[];
}

/**
 * Get all invoices for the current client
 */
export async function getClientInvoices(): Promise<Invoice[]> {
  const client = await getClientProfile();
  if (!client) return [];

  const { data, error } = await supabase
    .from('invoices')
    .select('*, projects!inner(*)')
    .eq('projects.client_id', client.id)
    .order('issued_at', { ascending: false });

  if (error) {
    console.error('Error fetching client invoices:', error);
    return [];
  }

  return data as Invoice[];
}

/**
 * Get metrics for a specific project
 */
export async function getProjectMetrics(projectId: string): Promise<Metric[]> {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('project_id', projectId)
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching project metrics:', error);
    return [];
  }

  return data as Metric[];
}

/**
 * Get all metrics for the current client
 */
export async function getClientMetrics(): Promise<Metric[]> {
  const client = await getClientProfile();
  if (!client) return [];

  const { data, error } = await supabase
    .from('metrics')
    .select('*, projects!inner(*)')
    .eq('projects.client_id', client.id)
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching client metrics:', error);
    return [];
  }

  return data as Metric[];
}

/**
 * Get tasks for a specific project
 */
export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('due_date', { ascending: true });

  if (error) {
    console.error('Error fetching project tasks:', error);
    return [];
  }

  return data as Task[];
}

/**
 * Get all tasks for the current client
 */
export async function getClientTasks(): Promise<Task[]> {
  const client = await getClientProfile();
  if (!client) return [];

  const { data, error } = await supabase
    .from('tasks')
    .select('*, projects!inner(*)')
    .eq('projects.client_id', client.id)
    .order('due_date', { ascending: true });

  if (error) {
    console.error('Error fetching client tasks:', error);
    return [];
  }

  return data as Task[];
}

/**
 * Upload an asset for a specific project
 */
export async function uploadAsset(projectId: string, file: File): Promise<Asset | null> {
  const client = await getClientProfile();
  if (!client) return null;

  // First upload the file to storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${client.id}/${projectId}/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('assets')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    return null;
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('assets')
    .getPublicUrl(uploadData.path);

  // Create an asset record
  const { data: userData } = await supabase.auth.getUser();
  const { data: assetData, error: assetError } = await supabase
    .from('assets')
    .insert([{
      project_id: projectId,
      file_url: publicUrl,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      uploaded_by: userData.user?.id
    }])
    .select()
    .single();

  if (assetError) {
    console.error('Error creating asset record:', assetError);
    return null;
  }

  return assetData as Asset;
}

/**
 * Get all assets for the current client
 */
export async function getClientAssets(): Promise<Asset[]> {
  const client = await getClientProfile();
  if (!client) return [];

  const { data, error } = await supabase
    .from('assets')
    .select('*, projects!inner(*)')
    .eq('projects.client_id', client.id)
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching client assets:', error);
    return [];
  }

  return data as Asset[];
}

/**
 * Get assets for a specific project
 */
export async function getProjectAssets(projectId: string): Promise<Asset[]> {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('project_id', projectId)
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching project assets:', error);
    return [];
  }

  return data as Asset[];
}

/**
 * Update task completion status
 */
export async function updateTaskStatus(taskId: string, completed: boolean): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', taskId)
    .select()
    .single();

  if (error) {
    console.error('Error updating task status:', error);
    return null;
  }

  return data as Task;
}

/**
 * Get client dashboard statistics
 */
export async function getClientStats(): Promise<ClientStats | null> {
  const client = await getClientProfile();
  if (!client) return null;

  // Get projects count
  const { count: totalProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('client_id', client.id);

  // Get active projects count
  const { count: activeProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('client_id', client.id)
    .eq('status', 'active');

  // Get invoices count
  const { count: totalInvoices } = await supabase
    .from('invoices')
    .select('*, projects!inner(*)', { count: 'exact', head: true })
    .eq('projects.client_id', client.id);

  // Get pending invoices count
  const { count: pendingInvoices } = await supabase
    .from('invoices')
    .select('*, projects!inner(*)', { count: 'exact', head: true })
    .eq('projects.client_id', client.id)
    .eq('status', 'pending');

  // Get assets count
  const { count: totalAssets } = await supabase
    .from('assets')
    .select('*, projects!inner(*)', { count: 'exact', head: true })
    .eq('projects.client_id', client.id);

  // Get completed tasks count
  const { count: completedTasks } = await supabase
    .from('tasks')
    .select('*, projects!inner(*)', { count: 'exact', head: true })
    .eq('projects.client_id', client.id)
    .eq('completed', true);

  // Get pending tasks count
  const { count: pendingTasks } = await supabase
    .from('tasks')
    .select('*, projects!inner(*)', { count: 'exact', head: true })
    .eq('projects.client_id', client.id)
    .eq('completed', false);

  return {
    totalProjects: totalProjects || 0,
    activeProjects: activeProjects || 0,
    totalInvoices: totalInvoices || 0,
    pendingInvoices: pendingInvoices || 0,
    totalAssets: totalAssets || 0,
    completedTasks: completedTasks || 0,
    pendingTasks: pendingTasks || 0
  };
}