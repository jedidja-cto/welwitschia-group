import React from 'react';
import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function CareersPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Build the Future of African Tech"
          subtitle="We are looking for elite student collaborators to help us engineer leverage for the continent's growing businesses."
          variant="dark"
        />

        <div className="container-wide py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl font-space mb-8">Execution-First Culture</h2>
              <p className="text-xl text-brand-black/70 leading-relaxed mb-6">
                We don't do internships. We do collaborations. We're assembling a small, high-agency group of students who can deliver production-grade work for real-world impact.
              </p>
              <p className="text-xl text-brand-black/70 leading-relaxed">
                If you're disciplined, technically curious, and care about shipping value rather than just clocking hours, you'll find a home here.
              </p>
            </div>

            <div className="space-y-12">
              <div className="premium-card">
                <h3 className="text-2xl font-space mb-4 text-wg-green">Visual Systems Designer</h3>
                <p className="text-brand-black/60 mb-6 font-mono text-sm uppercase">Creative Division • Remote • Project-based</p>
                <p className="text-lg mb-6">Mastery of brand assets, visual hierarchy, and technical layout implementation.</p>
                <Button href="/contact" variant="outline" size="sm">View Specs</Button>
              </div>

              <div className="premium-card">
                <h3 className="text-2xl font-space mb-4 text-wg-orange">Operational Architect</h3>
                <p className="text-brand-black/60 mb-6 font-mono text-sm uppercase">Strategy Division • Remote • Project-based</p>
                <p className="text-lg mb-6">Research, operations optimization, and client implementation coordination.</p>
                <Button href="/contact" variant="outline" size="sm">View Specs</Button>
              </div>
            </div>
          </div>

          <div className="mt-32 text-center p-12 bg-gray-50 rounded-[3rem]">
            <h2 className="text-3xl font-space mb-6">Second or Final Year student?</h2>
            <p className="text-xl text-brand-black/60 mb-12 max-w-2xl mx-auto">
              We focus on high-potential talent currently in their academic journey. We ship usable outcomes, and you'll learn through direct technical pressure.
            </p>
            <Button href="/contact" variant="primary" size="lg">Apply to Join the Ranks</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
