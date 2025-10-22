import { supabaseClient } from './supabaseClient';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status?: 'new' | 'in_progress' | 'completed';
  created_at?: string;
}

/**
 * Submit a contact form to Supabase
 * This can be used by unauthenticated users
 */
export async function submitContactForm(formData: Omit<ContactSubmission, 'id' | 'status' | 'created_at'>) {
  const { data, error } = await supabaseClient
    .from('contact_submissions')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form');
  }

  return data?.[0];
}

/**
 * Get all contact form submissions
 * Only accessible by admin users due to RLS policies
 */
export async function getContactSubmissions() {
  const { data, error } = await supabaseClient
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact submissions:', error);
    throw new Error('Failed to fetch contact submissions');
  }

  return data as ContactSubmission[];
}

/**
 * Update a contact submission status
 * Only accessible by admin users due to RLS policies
 */
export async function updateContactStatus(id: string, status: 'new' | 'in_progress' | 'completed') {
  const { data, error } = await supabaseClient
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating contact status:', error);
    throw new Error('Failed to update contact status');
  }

  return data?.[0] as ContactSubmission;
}