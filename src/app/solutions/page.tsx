import { PageHero } from '@/components/sections/PageHero';
import SolutionsContent from '@/components/solutions/SolutionsContent';
import { solutionsConfig } from '@/config/solutionsConfig';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Solutions | Welwitschia Data',
  description: 'Discover our owned products and platforms designed specifically for African SMEs. From analytics platforms to business templates, we build solutions that understand your market.',
};

export default function SolutionsPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Bespoke Solutions for Growing Businesses"
          subtitle={solutionsConfig.subtitle}
          variant="dark"
        />

        <div className="container-wide py-24">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-wg-green font-mono text-sm tracking-widest uppercase mb-4">Our Products</h2>
            <p className="text-2xl text-brand-black/70 italic">
              "We build technical leverage for African SMEs."
            </p>
          </div>
          <SolutionsContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}