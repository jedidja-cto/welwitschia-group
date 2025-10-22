import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ReferralPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle
          title="Referral Program"
          subtitle="Refer a business and earn rewards when they get started"
          align="center"
        />

        <div className="max-w-3xl mx-auto text-gray-700">
          <p className="text-lg mb-4">
            Introduce us to a business that could benefit from our data, advisory, or capital services.
            When they place their initial deposit, you’ll earn <span className="font-semibold">N$500–N$700</span>
            or receive a <span className="font-semibold">50% discount</span> on your next project. Terms apply.
          </p>
          <p className="text-lg mb-6">
            It’s a simple way to support SME growth while being rewarded for your network and insight.
          </p>
          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">Refer a business</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}