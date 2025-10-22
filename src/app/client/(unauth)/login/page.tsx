'use client';

import React, { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Initialize client record on the server
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        if (user) {
          await fetch('/api/client/init', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id, email: user.email }),
          });
        }
      }
      router.push('/client/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <SectionTitle title="Client Portal" subtitle="Sign in to your workspace" align="center" withAccent />

      <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8 space-y-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="submit" 
            className={`px-4 py-2 rounded-lg ${mode === 'signin' ? 'bg-[#006837] text-white' : 'bg-[#E87722] text-white'}`}
            disabled={loading}
          >
            {loading ? 'Loading…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
          <button 
            type="button" 
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          >
            {mode === 'signin' ? 'Need an account?' : 'Have an account?'}
          </button>
        </div>
      </form>
    </div>
  );
}