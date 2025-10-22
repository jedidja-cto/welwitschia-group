'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { getClientProfile } from '@/lib/clientApi';
import type { Client } from '@/lib/clientApi';

// Icons
import { 
  HomeIcon, 
  FolderIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  DocumentDuplicateIcon, 
  CheckCircleIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let unsub: (() => void) | undefined;

    async function loadClient() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setClient(null);
        setLoading(false);
        router.push('/client/login');
        return;
      }
      const clientData = await getClientProfile();
      setClient(clientData);
      setLoading(false);
    }

    // Initial load
    loadClient();

    // React to auth changes (sign-in, refresh, sign-out)
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setClient(null);
        setLoading(false);
        router.replace('/client/login');
        return;
      }
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setLoading(true);
        loadClient();
      }
      if (event === 'SIGNED_OUT') {
        setClient(null);
        setLoading(false);
        router.replace('/client/login');
      }
    });

    unsub = () => subscription.subscription.unsubscribe();

    return () => {
      if (unsub) unsub();
    };
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/client/login');
  }

  const navigation = [
    { name: 'Dashboard', href: '/client/dashboard', icon: HomeIcon },
    { name: 'Projects', href: '/client/dashboard/projects', icon: FolderIcon },
    { name: 'Invoices', href: '/client/dashboard/invoices', icon: DocumentTextIcon },
    { name: 'Metrics', href: '/client/dashboard/metrics', icon: ChartBarIcon },
    { name: 'Assets', href: '/client/dashboard/assets', icon: DocumentDuplicateIcon },
    { name: 'Tasks', href: '/client/dashboard/tasks', icon: CheckCircleIcon },
    { name: 'Settings', href: '/client/dashboard/settings', icon: CogIcon },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link href="/">
                    <Image
                      src="/logo.svg"
                      alt="Welwitschia Group"
                      width={150}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        pathname === item.href
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    >
                      <item.icon
                        className={`${
                          pathname === item.href ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                        } mr-4 flex-shrink-0 h-6 w-6`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md w-full"
                  >
                    <ArrowRightOnRectangleIcon
                      className="text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Welwitschia Group"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    pathname === item.href ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-5 w-5`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full"
            >
              <ArrowRightOnRectangleIcon
                className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-5 w-5"
                aria-hidden="true"
              />
              Sign Out
            </button>
          </nav>
        </div>
      </div>

      {/* Content area */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:w-96">
                <div className="w-full text-sm text-gray-500 flex items-center">Welcome{client?.name ? `, ${client.name}` : ''}</div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}