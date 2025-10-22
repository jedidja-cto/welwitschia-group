'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export default function HospitalityPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle
          title="Hospitality"
          subtitle="Systems for lodges, tour operators, and hotels"
          align="center"
          withAccent={true}
        />
        <div className="max-w-3xl mx-auto text-gray-700">
          <p className="text-lg mb-4 text-gray-700">
            Namibia’s tourism is a global story — and data should be part of it. We help lodges, tour operators,
            and hotels modernize through performance websites, data dashboards, and revenue intelligence.
          </p>
          <p className="text-lg mb-6 text-gray-700">
            Our goal is to make every booking, every guest experience, and every insight measurable.
          </p>
          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Build your hospitality system
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}