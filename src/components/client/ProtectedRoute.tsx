'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'authorized' | 'unauthorized'>('checking');

  useEffect(() => {
    let unsub: (() => void) | undefined;

    async function check() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        setStatus('unauthorized');
        router.replace('/client/login');
        return;
      }

      if (!roles || roles.length === 0) {
        setStatus('authorized');
      } else {
        const { data: clientRows, error } = await supabase
          .from('clients')
          .select('role, user_id')
          .eq('user_id', session.user.id)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Role check failed', error);
          setStatus('unauthorized');
          router.replace('/client/login');
          return;
        }

        const ok = clientRows && roles.includes(clientRows.role);
        setStatus(ok ? 'authorized' : 'unauthorized');
        if (!ok) router.replace('/client/login');
      }
    }

    // Initial check
    check();

    // Subscribe to auth state changes to handle login/logout and token refresh
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setStatus('unauthorized');
        router.replace('/client/login');
        return;
      }
      // On sign in or token refresh, re-check roles and authorize
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        check();
      }
      if (event === 'SIGNED_OUT') {
        setStatus('unauthorized');
        router.replace('/client/login');
      }
    });

    unsub = () => subscription.subscription.unsubscribe();

    return () => {
      if (unsub) unsub();
    };
  }, [router, roles]);

  if (status === 'checking') {
    return <div className="text-center py-10 text-gray-600">Checking access…</div>;
  }

  if (status === 'unauthorized') {
    return <div className="text-center py-10 text-gray-600">Redirecting to login…</div>;
  }

  return <>{children}</>;
}