'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export default function InsightsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Insights" subtitle="Turning data into public knowledge" align="center" withAccent={true} />
        <div className="max-w-3xl mx-auto text-gray-700">

        <p className="text-lg mb-4 text-gray-700">
          Data only matters when it’s shared. Through our monthly reports and sector indexes, we uncover patterns
          shaping Namibia’s economy — from housing to SMEs and digital adoption.
        </p>

        <p className="text-lg mb-6 text-gray-700">
          The Insights page is where we turn data into public knowledge, helping businesses and policymakers make
          better decisions.
        </p>

        <div className="mt-8">
          <Link href="/insights">
            <Button variant="primary" size="lg">
              Read our latest insight
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}