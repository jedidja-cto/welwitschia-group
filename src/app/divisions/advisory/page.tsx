'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export default function AdvisoryPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Advisory" subtitle="Translating data into operational and financial insight" align="center" withAccent={true} />
        <div className="max-w-3xl mx-auto text-gray-700">

        <p className="text-lg mb-4 text-gray-700">
          Our advisory practice connects data to action. We translate raw numbers into clear operational and
          financial insight — helping businesses plan smarter, optimize performance, and prepare for growth capital.
        </p>

        <p className="text-lg mb-6 text-gray-700">
          From analytics to funding readiness, we help you see the story your data tells — and how to move on it.
        </p>

        <div className="mt-8">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Talk to our team
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}