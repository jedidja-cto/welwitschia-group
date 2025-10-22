'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase, getUser } from '@/lib/supabaseClient';
import Button from '@/components/ui/Button';

const navItems = [
  { href: '/client/dashboard', label: 'Dashboard' },
  { href: '/client/projects', label: 'Projects' },
  { href: '/client/assets', label: 'Assets' },
  { href: '/client/analytics', label: 'Analytics' },
  { href: '/client/settings', label: 'Settings' },
  { href: '/client/support', label: 'Support' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await supabase.auth.signOut();
    router.push('/client/login');
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr] bg-white">
      {/* Sidebar */}
      <aside className="hidden md:block bg-wg-dark text-white">
        <div className="px-4 py-4 border-b border-white/10">
          <Link href="/client/dashboard" className="text-xl font-semibold">Client Portal</Link>
        </div>
        <nav className="px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                  active ? 'bg-wg-green text-white' : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b">
          <div className="font-medium text-wg-dark">Welwitschia Group</div>
          <div className="flex items-center gap-3">
            <Button onClick={logout} variant="secondary">Logout</Button>
          </div>
        </header>

        <main className="p-4 md:p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}