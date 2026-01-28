'use client';

import React from 'react';
import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import RecentWorkSection from '@/components/sections/RecentWorkSection';

export default function CaseStudiesPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Proven Technical Leverage"
          subtitle="A selection of client engagements and internal experiments designed to solve complex business problems."
          variant="green"
        />

        <div className="container-wide py-24">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-wg-green font-mono text-sm tracking-widest uppercase mb-4">Portfolio</h2>
            <p className="text-2xl text-brand-black/70">
              We distinguish between official client implementations and internal R&D projects built for pitching and exploration.
            </p>
          </div>
          <RecentWorkSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
