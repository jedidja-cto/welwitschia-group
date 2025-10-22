import { createClient } from '@supabase/supabase-js';

// These would typically come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Lead = {
  id?: string;
  name: string;
  email: string;
  company: string;
  service_interest: string;
  message: string;
  created_at?: string;
};

export type Referral = {
  id?: string;
  referrer_type: string;
  name: string;
  email: string;
  referred_company: string;
  referred_contact: string;
  service_type: string;
  status: 'pending' | 'approved' | 'rejected';
  eligible: boolean;
  discount_code?: string;
  payout_amount_nad?: number;
  linked_project_id?: string;
  created_at?: string;
};

export type Application = {
  id?: string;
  full_name: string;
  email: string;
  role_interest: string;
  cv_url: string;
  cover_note: string;
  status?: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
  created_at?: string;
};

// Database operations
export const dbOperations = {
  // Leads
  async createLead(lead: Omit<Lead, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select();
    
    if (error) throw error;
    return data?.[0];
  },
  
  // Referrals
  async createReferral(referral: Omit<Referral, 'id' | 'created_at' | 'status' | 'eligible'>) {
    const { data, error } = await supabase
      .from('referrals')
      .insert([{
        ...referral,
        status: 'pending',
        eligible: false
      }])
      .select();
    
    if (error) throw error;
    return data?.[0];
  },
  
  // Applications
  async createApplication(application: Omit<Application, 'id' | 'created_at' | 'status'>) {
    const { data, error } = await supabase
      .from('applications')
      .insert([{
        ...application,
        status: 'pending'
      }])
      .select();
    
    if (error) throw error;
    return data?.[0];
  }
};