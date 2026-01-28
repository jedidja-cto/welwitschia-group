import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DataSciencePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Data Science" subtitle="Forecasting, optimization, and practical ML" align="center" withAccent />
        <div className="max-w-3xl mx-auto text-gray-700">
          <div className="aspect-video w-full bg-gray-100 rounded-lg mb-6" aria-label="Data science preview placeholder" />
          <p className="text-lg mb-4">
            We prototype and ship models that solve real operational problems:
            demand forecasting, risk scoring, pricing, and workflow automation.
            Simple where it should be, advanced where it adds value.
          </p>
          <ul className="list-disc pl-5 text-brand-black/80 mb-6">
            <li>Structured pipelines and versioned experiments</li>
            <li>Clear evaluation and monitoring</li>
            <li>Deployment to dashboards and apps</li>
          </ul>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/pricing"><Button variant="primary" size="lg">Estimate pricing</Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Talk to us</Button></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
