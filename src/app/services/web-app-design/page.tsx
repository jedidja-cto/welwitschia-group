import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { heroConfigs } from '@/config/heroConfigs';

export default function WebAppDesignPage() {
  return (
    <MainLayout>
      <HeroSection {...heroConfigs.webApplications} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Web Application Features" subtitle="Interactive apps, authentication, dashboards, and integrations" align="center" withAccent={true} />
        <div className="max-w-3xl mx-auto text-gray-700">
          <div className="aspect-video w-full bg-gray-100 rounded-lg mb-6" aria-label="Feature image placeholder" />
          <p className="text-lg mb-4">
            We design and build interactive web applications including login, admin dashboards, notifications, payments,
            and 3rd‑party API integrations. Configure screens and features; estimate your build in NAD.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/pricing"><Button variant="primary" size="lg">Estimate pricing</Button></Link>
            <Link href="/case-studies"><Button variant="outline" size="lg">Explore dashboards</Button></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
