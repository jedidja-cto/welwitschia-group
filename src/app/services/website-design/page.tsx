import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { heroConfigs } from '@/config/heroConfigs';

export default function WebsiteDesignPage() {
  return (
    <MainLayout>
      <HeroSection {...heroConfigs.webDesign} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Our Website Design Process" subtitle="Clean, responsive sites with clear content structure" align="center" withAccent={true} />
        <div className="max-w-3xl mx-auto text-gray-700">
          {/* Client Work Examples */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-6 text-center">Recent Client Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Mavedo Communications - Client Project */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video w-full bg-gray-100 relative">
                  <img 
                    src="/mavedo_communications.png" 
                    alt="Mavedo Communications website screenshot"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Client Project
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-lg mb-2">Mavedo Communications</h4>
                  <p className="text-sm text-gray-600 mb-3">Professional communications and marketing website</p>
                  <a 
                    href="https://mavedo-comms.web.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Live Site →
                  </a>
                </div>
              </div>

              {/* Kupferquelle Resort - Portfolio Project */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video w-full bg-gray-100 relative">
                  <img 
                    src="/kupferquelle_resort.png" 
                    alt="Kupferquelle Resort website screenshot"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Portfolio Project
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-lg mb-2">Kupferquelle Resort</h4>
                  <p className="text-sm text-gray-600 mb-3">Luxury resort booking and information website</p>
                  <a 
                    href="https://kupferquelle-resort-com.web.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Live Site →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg mb-4">
            We design modern websites with fast load times, clear content hierarchy, and built-in basic SEO.
            Choose starter layouts or custom builds; add static and content-heavy pages; include features like forms, CMS, or payments.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/pricing"><Button variant="primary" size="lg">Estimate pricing</Button></Link>
            <Link href="/case-studies"><Button variant="outline" size="lg">View examples</Button></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
