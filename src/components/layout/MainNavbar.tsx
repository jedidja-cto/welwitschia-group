'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigationConfig } from '@/config/navigationConfig';

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex md:hidden">
          <button
            aria-label="Open menu"
            className="inline-flex items-center justify-center p-2 rounded-md text-brand-black hover:text-brand-red hover:bg-gray-50 transition-colors hover-scale-sm"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 justify-center md:justify-center">
          <Link href="/" aria-label="Welwitschia Data" className="inline-flex hover-scale-sm">
            <Image src="/logo.svg" alt="Welwitschia Data" width={140} height={36} className="h-9 w-auto" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {navigationConfig.topNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-brand-black hover:text-brand-red transition-colors hover-scale-sm text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center">
          <div className="hidden md:flex justify-start items-center gap-8">
            {navigationConfig.primaryItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-black hover:text-brand-red transition-all duration-300 hover-scale-sm text-lg font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          {navigationConfig.searchEnabled && (
            <div className="ml-8 relative group">
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-5 pr-10 py-2.5 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all w-56 focus:w-72 text-base shadow-sm hover:shadow-md"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/services?q=${encodeURIComponent(e.currentTarget.value)}`;
                  }
                }}
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-red transition-colors transform group-hover:scale-110 duration-200"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    window.location.href = `/services?q=${encodeURIComponent(input.value)}`;
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'fixed' : 'hidden'} md:hidden inset-0 z-50 bg-white`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="text-lg font-medium text-brand-black">Menu</div>
          <button
            aria-label="Close menu"
            className="text-sm px-3 py-2 border border-gray-200 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="px-6 py-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
          {navigationConfig.searchEnabled && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const q = String(fd.get('q') || '');
                if (q.trim()) window.location.href = `/services?q=${encodeURIComponent(q)}`;
              }}
              className="flex items-center mb-4"
            >
              <input
                name="q"
                placeholder="Search services"
                className="flex-1 text-sm border border-gray-200 rounded-md px-3 py-2"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-2 text-sm rounded-md bg-brand-red text-white hover:bg-brand-black transition-colors"
              >
                Search
              </button>
            </form>
          )}

          {/* Mobile Navigation Items - Display 7 top-level items */}
          {navigationConfig.mobileMenuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="block py-3 text-base font-medium text-brand-black hover:text-brand-red border-b border-gray-50 last:border-b-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
