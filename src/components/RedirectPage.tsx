'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

interface RedirectPageProps {
  destination: string;
  title: string;
  message?: string;
}

export default function RedirectPage({ destination, title, message }: RedirectPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Redirect after a short delay to allow the page to load
    const timer = setTimeout(() => {
      router.replace(destination);
    }, 1000);

    return () => clearTimeout(timer);
  }, [destination, router]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {message || 'This page has moved. You will be redirected automatically.'}
        </p>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wg-green"></div>
          <span className="ml-3 text-brand-black/60">Redirecting...</span>
        </div>
        <p className="mt-4 text-sm text-brand-black/40">
          If you are not redirected automatically, <a href={destination} className="text-wg-green hover:text-wg-dark underline">click here</a>.
        </p>
      </div>
    </MainLayout>
  );
}