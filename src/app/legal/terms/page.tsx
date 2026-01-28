import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';

export default function TermsOfUsePage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Terms of Service"
          subtitle="Governing the technical and professional engagement with Welwitschia Data systems."
          variant="dark"
        />

        <div className="container-wide py-24">
          <div className="max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="text-3xl font-space mb-6">1. Scope of Agreement</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                This document constitutes a binding legal agreement between the User and Welwitschia Data. By accessing our infrastructure, proprietary tools, or digital presence, you acknowledge and agree to be bound by these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-space mb-6">2. Proprietary Intellectual Infrastructure</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                Current and future technical architectures, codebases, design systems, and proprietary data models showcased or utilized on this platform remain the exclusive intellectual property of Welwitschia Data. Unauthorized reverse-engineering, duplication, or redistribution of these assets is strictly prohibited and will be met with legal enforcement.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-space mb-6">3. Technical Liability & Indemnification</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                Welwitschia Data provides high-performance digital tools "as-is" without warranty of continuous uptime or absolute data integrity beyond the scopes defined in specific Master Service Agreements (MSAs). Users agree to indemnify Welwitschia Data against any system failures or data discrepancies resulting from misuse or third-party service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-space mb-6">4. Governance & Jurisdiction</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                These terms are governed by the commercial statutes of the Republic of Namibia. Any disputes arising from the interpretation or breach of these terms shall be subject to the exclusive jurisdiction of the High Court of Namibia.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-space mb-6">5. Modification of Terms</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed mb-4">
                Welwitschia Data reserves the right to modify these technical protocols and legal stances at its sole discretion to reflect the evolving nature of our ecosystem.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
