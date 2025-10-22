import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function DivisionsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle 
          title="Our Divisions" 
          subtitle="Comprehensive solutions for your business needs"
        />
        
        {/* Data Services */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-wg-dark mb-4">Data Services</h2>
            <p className="text-gray-700 mb-4">
              Our Data Services division provides comprehensive data collection, analysis, and visualization 
              solutions to help businesses make informed decisions based on accurate insights.
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Data collection and integration</li>
              <li>Advanced analytics and reporting</li>
              <li>Business intelligence dashboards</li>
              <li>Predictive modeling and forecasting</li>
              <li>Data governance and management</li>
            </ul>
            <Button href="/divisions/data-services">Learn More</Button>
          </div>
          <div className="bg-wg-green/10 p-8 rounded-lg">
            <div className="aspect-video bg-wg-green/20 rounded-lg flex items-center justify-center">
              <span className="text-lg font-medium text-wg-dark">Data Services Image</span>
            </div>
          </div>
        </div>
        
        {/* Advisory */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-wg-orange/10 p-8 rounded-lg">
            <div className="aspect-video bg-wg-orange/20 rounded-lg flex items-center justify-center">
              <span className="text-lg font-medium text-wg-dark">Advisory Image</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-wg-dark mb-4">Advisory</h2>
            <p className="text-gray-700 mb-4">
              Our Advisory division provides strategic consulting services to help businesses navigate 
              challenges, identify opportunities, and achieve sustainable growth.
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Strategic planning and business modeling</li>
              <li>Market entry and expansion strategies</li>
              <li>Operational efficiency and process optimization</li>
              <li>Digital transformation and technology adoption</li>
              <li>Risk management and compliance</li>
            </ul>
            <Button href="/divisions/advisory">Learn More</Button>
          </div>
        </div>
        
        {/* Capital */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-wg-dark mb-4">Capital</h2>
            <p className="text-gray-700 mb-4">
              Our Capital division connects businesses with the financial resources they need to fuel 
              growth, expansion, and innovation through our network of investors and funding partners.
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Funding strategy development</li>
              <li>Investor matching and introductions</li>
              <li>Deal structuring and negotiation</li>
              <li>Due diligence support</li>
              <li>Post-investment growth planning</li>
            </ul>
            <Button href="/divisions/capital">Learn More</Button>
          </div>
          <div className="bg-wg-dark/10 p-8 rounded-lg">
            <div className="aspect-video bg-wg-dark/20 rounded-lg flex items-center justify-center">
              <span className="text-lg font-medium text-wg-dark">Capital Image</span>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 bg-wg-green text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how our divisions can help your business achieve its goals.
          </p>
          <Button href="/contact" variant="secondary">Contact Us</Button>
        </div>
      </div>
    </MainLayout>
  );
}