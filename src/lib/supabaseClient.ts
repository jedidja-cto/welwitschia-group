import { createClient } from '@supabase/supabase-js';

// Browser Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Alias to satisfy existing imports expecting `supabaseClient`
export const supabaseClient = supabase;

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}