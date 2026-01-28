import MainNavbar from '@/components/layout/MainNavbar';
import HeroSection from '@/components/sections/HeroSection';
import TrustRow from '@/components/sections/TrustRow';
import ContactCTASection from '@/components/sections/ContactCTASection';
import Footer from '@/components/layout/Footer';
import { heroConfigs } from '@/config/heroConfigs';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="bg-white text-brand-black min-h-screen flex flex-col font-sans">
      <MainNavbar />
      <main id="main-content" className="flex-1">
        <HeroSection {...heroConfigs.homepage} />

        {/* Main Content Sections */}
        <div className="container-wide py-32 space-y-48">

          {/* Services Section */}
          <section className="animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-block text-wg-green font-mono text-xs tracking-widest uppercase mb-4 font-bold">Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-space mb-8">Engineering Leverage for African SMEs</h2>
                <p className="text-xl text-brand-black/60 mb-12 leading-relaxed">
                  We solve technical invisibility and operational friction. From bespoke web design to complex data pipelines, our services are designed to scale your business profile and performance.
                </p>
                <Link href="/services" className="btn-primary btn">
                  Explore Services <ArrowRightIcon className="ml-3 h-5 w-5" />
                </Link>
              </div>
              <div className="order-1 lg:order-2 premium-card p-0 overflow-hidden aspect-[4/3] group shadow-2xl">
                <img
                  src="/services.jpg"
                  alt="Our Services"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-wg-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
          </section>

          {/* Solutions Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="premium-card p-0 overflow-hidden aspect-[4/3] group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-wg-dark to-black flex items-center justify-center">
                  <div className="text-center font-space text-white/20 p-12">
                    <div className="text-8xl mb-4 font-bold opacity-10">DATA</div>
                    <div className="text-lg font-mono tracking-widest">PROPRIETARY SYSTEMS</div>
                  </div>
                </div>
              </div>
              <div>
                <span className="inline-block text-wg-orange font-mono text-xs tracking-widest uppercase mb-4 font-bold">Products</span>
                <h2 className="text-4xl md:text-5xl font-space mb-8">Proprietary Technical Infrastructure</h2>
                <p className="text-xl text-brand-black/60 mb-12 leading-relaxed">
                  We don't just build for others; we build for the ecosystem. Our data pipeline builders and analytics platforms are engineered to solve fragmented data challenges unique to the African market.
                </p>
                <Link href="/solutions" className="btn-secondary btn">
                  View Our Products <ArrowRightIcon className="ml-3 h-5 w-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-wg-green font-mono text-xs tracking-widest uppercase mb-4 font-bold">Technical Proof</span>
              <h2 className="text-4xl md:text-6xl font-space mb-8">Case Studies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/case-studies/mavedo-communications" className="premium-card group aspect-square lg:aspect-[16/9] p-12 flex flex-col justify-end overflow-hidden">
                <img src="/mavedo_communications.png" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40" alt="Mavedo" />
                <div className="absolute inset-0 bg-gradient-to-t from-wg-dark via-wg-dark/40 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="text-white text-3xl font-space mb-2">Mavedo Communications</h3>
                  <p className="text-white/70">Solving Digital Invisibility</p>
                </div>
              </Link>
              <Link href="/case-studies/kupferquelle-resort" className="premium-card group aspect-square lg:aspect-[16/9] p-12 flex flex-col justify-end overflow-hidden">
                <img src="/kupferquelle_resort.png" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40" alt="Kupferquelle" />
                <div className="absolute inset-0 bg-gradient-to-t from-wg-dark via-wg-dark/40 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="text-white text-3xl font-space mb-2">Kupferquelle Resort</h3>
                  <p className="text-white/70">Operational Scaling</p>
                </div>
              </Link>
            </div>
            <div className="mt-16 text-center">
              <Link href="/case-studies" className="inline-flex items-center text-wg-green font-bold hover:translate-x-2 transition-transform uppercase tracking-widest text-sm font-mono">
                View Full Portfolio <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </section>

        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <TrustRow />
        </div>
        <ContactCTASection />
      </main>
      <Footer />
    </div>
  );
}
