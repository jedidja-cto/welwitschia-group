import React from 'react';
import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import PricingCalculator from '@/components/pricing/PricingCalculator';

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Value-Based Architecture"
          subtitle="Transparent, predictable pricing for engineering your market advantage."
          variant="glass"
        />

        <div className="container-wide py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            {/* Starter Package */}
            <div className="premium-card flex flex-col">
              <span className="text-xs font-mono text-wg-green uppercase tracking-widest font-bold mb-4">Foundation</span>
              <h3 className="text-3xl font-space mb-2">Starter</h3>
              <p className="text-brand-black/60 mb-8">For SMEs building their first production-grade digital assets.</p>
              <div className="mt-auto">
                <div className="text-4xl font-space mb-1">N$12,000+</div>
                <p className="text-xs text-brand-black/40 font-mono mb-8">ONE-TIME DEPLOYMENT</p>
                <Button href="#calculator" variant="outline" className="w-full">Initialize</Button>
              </div>
            </div>

            {/* Growth Package */}
            <div className="premium-card flex flex-col border-wg-green/30 bg-wg-green/5">
              <span className="text-xs font-mono text-wg-orange uppercase tracking-widest font-bold mb-4">Momentum</span>
              <h3 className="text-3xl font-space mb-2">Growth</h3>
              <p className="text-brand-black/60 mb-8">Advanced systems for businesses scaling their technical operations.</p>
              <div className="mt-auto">
                <div className="text-4xl font-space mb-1">N$30,000+</div>
                <p className="text-xs text-brand-black/40 font-mono mb-8">ONE-TIME DEPLOYMENT</p>
                <Button href="#calculator" variant="primary" className="w-full">Scale Now</Button>
              </div>
            </div>

            {/* Enterprise Package */}
            <div className="premium-card flex flex-col bg-wg-dark text-white border-none">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold mb-4">Authority</span>
              <h3 className="text-3xl font-space mb-2">Enterprise</h3>
              <p className="text-white/60 mb-8">Bespoke technical architecture and dedicated site reliability engineering.</p>
              <div className="mt-auto">
                <div className="text-4xl font-space mb-1 text-wg-orange">Custom</div>
                <p className="text-xs text-white/30 font-mono mb-8">ANNUAL AGREEMENT</p>
                <Button href="/contact" variant="primary" className="w-full bg-white text-wg-dark hover:bg-gray-100">Consult</Button>
              </div>
            </div>
          </div>

          <div id="calculator" className="py-24 border-t border-gray-100">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-space mb-4">Precision Estimator</h2>
              <p className="text-xl text-brand-black/60">Select your required technical modules for an instant scope estimate.</p>
            </div>
            <div className="premium-card p-0 overflow-hidden bg-gray-50/50">
              <PricingCalculator />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}