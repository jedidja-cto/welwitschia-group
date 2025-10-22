import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle
          title="Pricing"
          subtitle="Transparent plans designed for SME growth"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Starter Plan */}
          <Card variant="elevated" className="text-center">
            <h3 className="text-xl font-semibold mb-2">Starter</h3>
            <p className="text-gray-600 mb-4">
              For early-stage businesses building digital foundations.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Website or landing page</li>
              <li>Basic analytics setup</li>
              <li>1 month support</li>
            </ul>
            <div className="text-2xl font-bold">N$4,500+</div>
            <div className="mt-6">
              <Button href="/contact">Get Started</Button>
            </div>
          </Card>

          {/* Growth Plan */}
          <Card variant="elevated" className="text-center">
            <h3 className="text-xl font-semibold mb-2">Growth</h3>
            <p className="text-gray-600 mb-4">
              For SMEs needing data workflows and automation.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Custom web app or dashboard</li>
              <li>Data integrations & reporting</li>
              <li>3 months support</li>
            </ul>
            <div className="text-2xl font-bold">N$14,000+</div>
            <div className="mt-6">
              <Button href="/contact">Talk to sales</Button>
            </div>
          </Card>

          {/* Enterprise Plan */}
          <Card variant="elevated" className="text-center">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <p className="text-gray-600 mb-4">
              For established teams scaling operations with capital readiness.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Advanced analytics & AI</li>
              <li>Multi-system integrations</li>
              <li>Dedicated support</li>
            </ul>
            <div className="text-2xl font-bold">Custom</div>
            <div className="mt-6">
              <Button href="/contact" variant="outline">Book a consult</Button>
            </div>
          </Card>
        </div>

        {/* Notes */}
        <div className="mt-12 max-w-3xl mx-auto text-center text-gray-600">
          <p>
            Final pricing depends on scope and timeline. We’ll provide a clear proposal
            after a short discovery call.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}