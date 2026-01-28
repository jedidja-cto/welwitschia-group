import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Data Protocol & Privacy"
          subtitle="Transparency regarding our data collection methods and commitment to the business ecosystem."
          variant="green"
        />

        <div className="container-wide py-24">
          <div className="max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="text-3xl font-space mb-6">1. Strategic Data Collection</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                Beyond standard contact information, we collect specific structural data about the businesses that interact with our ecosystem. This includes:
              </p>
              <ul className="list-disc pl-8 space-y-4 text-lg text-brand-black/60">
                <li>Detailed business operational profiles</li>
                <li>Duration of operations and historical context</li>
                <li>Sector-specific challenges and technical requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-space mb-6">2. Purpose of Information</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                We believe in building a collective intelligence for the African SME landscape. The data we collect is utilized to:
              </p>
              <ul className="list-disc pl-8 space-y-4 text-lg text-brand-black/60">
                <li>Train automated diagnostic tools for future clients</li>
                <li>Optimize our proprietary algorithms for local market conditions</li>
                <li>Provide benchmarked insights that allow businesses to compare their technical performance against industry standards</li>
              </ul>
              <p className="mt-8 text-lg font-bold text-wg-green">
                By contributing your data, you are actively participating in the growth and maturation of our technical ecosystem.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-space mb-6">3. Security Protocals</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                While we utilize business data for ecosystem growth, all sensitive personal and financial identifiers are heavily encrypted and siloed. We deploy enterprise-grade security layers to ensure your competitive data remains protected from unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-space mb-6">4. Transparency & Access</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                You maintain the right to request a summary of the data we hold regarding your business entity. Requests for data exports or deletions can be processed via our secure technical support channels.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
