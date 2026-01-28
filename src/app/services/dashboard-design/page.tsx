import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { heroConfigs } from '@/config/heroConfigs';

export default function DashboardDesignPage() {
  return (
    <MainLayout>
      <HeroSection {...heroConfigs.dashboardDesign} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Dashboard Features" subtitle="Analytics dashboards with clear visuals and interaction" align="center" withAccent={true} />
        <div className="max-w-3xl mx-auto text-gray-700">
          <div className="aspect-video w-full bg-gray-100 rounded-lg mb-6" aria-label="Dashboard preview placeholder" />
          <p className="text-lg mb-4">
            We design dashboards for decision‑making — simple or advanced with filters and drilldowns.
            Connect data sources, add visuals, and configure automated refresh and reporting.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/pricing"><Button variant="primary" size="lg">Estimate pricing</Button></Link>
            <Link href="/templates"><Button variant="outline" size="lg">Explore templates</Button></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
