import Link from 'next/link';
import { GlobeAltIcon, PresentationChartLineIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function FeaturedServicesSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-serif text-center animate-fade-in">Featured Services</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/services#digital-products" className="card hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <GlobeAltIcon className="h-8 w-8 text-brand-black/60 animate-bounce-gentle" />
            <h3 className="mt-4 font-medium">Digital Products</h3>
            <p className="mt-1 text-brand-black/60">Web design, web applications, mobile apps, and dashboard design.</p>
            <span className="mt-3 inline-block text-sm text-brand-red">Learn More →</span>
          </Link>
          <Link href="/services#data-analytics" className="card hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <PresentationChartLineIcon className="h-8 w-8 text-brand-black/60 animate-bounce-gentle" />
            <h3 className="mt-4 font-medium">Data & Analytics</h3>
            <p className="mt-1 text-brand-black/60">Data analysis, data science, data engineering, and cybersecurity.</p>
            <span className="mt-3 inline-block text-sm text-brand-red">Learn More →</span>
          </Link>
          <Link href="/services#creative" className="card hover-lift animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <SparklesIcon className="h-8 w-8 text-brand-black/60 animate-bounce-gentle" />
            <h3 className="mt-4 font-medium">Creative</h3>
            <p className="mt-1 text-brand-black/60">Branding, logos, social media, UI screens, and content creation.</p>
            <span className="mt-3 inline-block text-sm text-brand-red">Learn More →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
