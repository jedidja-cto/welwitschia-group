import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Server-side Supabase client with admin privileges
// This should ONLY be used in server contexts (API routes, Server Components)
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);