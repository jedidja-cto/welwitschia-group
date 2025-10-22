'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export default function CapitalPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle
          title="Capital"
          subtitle="Preparing businesses for investment with data-driven clarity"
          align="center"
          withAccent={true}
        />
        <div className="max-w-3xl mx-auto text-gray-700">
          <p className="text-lg mb-4 text-gray-700">
            Welwitschia Capital helps businesses move from insight to investment. We prepare investor-ready reports,
            build financial scorecards, and manage the data that helps institutions assess opportunity with clarity.
          </p>
          <p className="text-lg mb-6 text-gray-700">
            Our aim is simple — to make Namibian and African businesses easier to understand, fund, and grow.
          </p>
          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Explore capital services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}