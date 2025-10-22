'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function DataServicesPage() {
  return (
    <div className="container py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Data Services</h1>

        <p className="text-lg mb-4 text-gray-700">
          We design and build digital systems that turn operations into intelligence. From websites
          to web applications, data dashboards, and social media analytics, our work equips
          organizations to see, decide, and grow with precision.
        </p>

        <p className="text-lg mb-6 text-gray-700">
          At Welwitschia Data, we don’t just deliver code — we build the systems that sustain
          confidence.
        </p>

        <div className="mt-8">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Start your project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}