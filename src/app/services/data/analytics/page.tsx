import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Analytics" subtitle="Tracking, reporting, and decision dashboards" align="center" withAccent />
        <div className="max-w-3xl mx-auto text-gray-700">
          <div className="aspect-video w-full bg-gray-100 rounded-lg mb-6" aria-label="Analytics preview placeholder" />
          <p className="text-lg mb-4">
            We set up reliable analytics across web and apps, define KPIs that matter,
            and build dashboards for weekly operating reviews. Get clear visibility
            into acquisition, conversion, retention, and revenue.
          </p>
          <ul className="list-disc pl-5 text-brand-black/80 mb-6">
            <li>Event tracking, funnels, and cohorts</li>
            <li>Marketing attribution and campaign reporting</li>
            <li>Executive and team dashboards</li>
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
