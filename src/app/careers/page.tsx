import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle
          title="Careers"
          subtitle="Join a small, practical team building systems for SME growth"
          align="center"
        />

        <div className="max-w-3xl mx-auto text-gray-700">
          <p className="text-lg mb-4">
            Welwitschia Group is growing an agile network of interns, collaborators, and independent
            specialists. If you’re curious, hands-on, and care about creating value for African SMEs,
            we’d love to hear from you.
          </p>
          <p className="text-lg mb-6">
            We welcome engineers, designers, analysts, and operators. Tell us what you’re great at and
            how you’d like to contribute — we’ll reach out when there’s a strong match with upcoming work.
          </p>
          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">Express interest</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}