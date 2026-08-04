import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper to check if current user is admin
export async function isAdmin() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return false;
  
  const adminEmail = process.env.ADMIN_EMAIL || 'the4therfirm@gmail.com';
  return user.email === adminEmail;
}

// Helper to get current session
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) return null;
  return session;
}