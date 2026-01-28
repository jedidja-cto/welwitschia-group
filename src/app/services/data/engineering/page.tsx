import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DataEngineeringPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Data Engineering" subtitle="Pipelines, integrations, and reliable data ops" align="center" withAccent />
        <div className="max-w-3xl mx-auto text-gray-700">
          <div className="aspect-video w-full bg-gray-100 rounded-lg mb-6" aria-label="Data engineering preview placeholder" />
          <p className="text-lg mb-4">
            We design pipelines and integrations that move clean data into dashboards and apps.
            Structured schemas, versioned jobs, and observability keep systems dependable.
          </p>
          <ul className="list-disc pl-5 text-brand-black/80 mb-6">
            <li>Connectors and ETL/ELT workflows</li>
            <li>Storage design and transformations</li>
            <li>Scheduling, monitoring, and alerts</li>
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
