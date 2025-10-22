'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function EducationPage() {
  return (
    <div className="container py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Education</h1>

        <p className="text-lg mb-4 text-gray-700">
          We partner with schools, academies, and training institutions to build digital foundations for learning.
          Our education systems integrate LMS tools, data dashboards, and analytics that track student progress and
          institutional performance.
        </p>

        <p className="text-lg mb-6 text-gray-700">
          Because education should run on data — not paperwork.
        </p>

        <div className="mt-8">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Modernize your institution
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}