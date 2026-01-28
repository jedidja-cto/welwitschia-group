import React from 'react';
import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Resilience by Design"
          subtitle="Inspired by the Welwitschia Mirabilis, we build technical systems that thrive in the most challenging business environments."
          variant="green"
        />

        <div className="container-wide py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-space mb-8">Our Narrative</h2>
              <div className="space-y-6 text-xl text-brand-black/70 leading-relaxed">
                <p>
                  Welwitschia Group was founded to close the technical gap for African SMEs. We saw businesses with immense potential being held back by fragmented data and generic digital tools.
                </p>
                <p>
                  Like the Welwitschia plant of the Namib Desert—which lives for over 1,500 years in one of the harshest climates on Earth—our solutions are engineered for longevity and resilience. We don't build for the next trend; we build for the long-term success of the African enterprise.
                </p>
                <p>
                  Today, we operate as a multidisciplinary hub, merging data science, strategic design, and capital advisory to empower the next generation of industry leaders.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="premium-card bg-wg-dark text-white aspect-square flex flex-col justify-end">
                <div className="text-4xl font-space mb-2">1.5k+</div>
                <div className="text-xs font-mono uppercase tracking-widest text-wg-green">Years of Inspiration</div>
              </div>
              <div className="premium-card bg-wg-green text-white aspect-square flex flex-col justify-end">
                <div className="text-4xl font-space mb-2">SME</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/70">Core Focus</div>
              </div>
              <div className="premium-card bg-gray-50 border-none aspect-square flex flex-col justify-end">
                <div className="text-4xl font-space mb-2 text-wg-dark">100%</div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-black/30">African Owned</div>
              </div>
              <div className="premium-card bg-wg-orange text-white aspect-square flex flex-col justify-end">
                <div className="text-4xl font-space mb-2">Data</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/70">Driven Execution</div>
              </div>
            </div>
          </div>

          {/* Mission/Vision in premium layout */}
          <div className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-16 rounded-[3rem] bg-gray-50">
              <h3 className="text-2xl font-mono text-wg-green uppercase tracking-widest mb-8">The Mission</h3>
              <p className="text-2xl font-space leading-tight text-brand-black/80">
                To accelerate the growth of African SMEs through technical systems that convert raw data into market dominance.
              </p>
            </div>
            <div className="p-16 rounded-[3rem] bg-wg-dark text-white">
              <h3 className="text-2xl font-mono text-wg-orange uppercase tracking-widest mb-8">The Vision</h3>
              <p className="text-2xl font-space leading-tight text-white/80">
                To be the primary technical architecture powering the next generation of African business success stories.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}