'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

export default function EntertainmentPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="Entertainment" subtitle="Systems for artists, agencies, and events" align="center" withAccent={true} />
        <div className="max-w-3xl mx-auto text-gray-700">

        <p className="text-lg mb-4 text-gray-700">
          The creative economy thrives when art meets systems. We build platforms for artists, agencies, and event
          companies to manage audiences, bookings, and brand performance.
        </p>

        <p className="text-lg mb-6 text-gray-700">
          From websites to analytics, we give creators the infrastructure to scale their craft.
        </p>

        <div className="mt-8">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Build your creative platform
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}