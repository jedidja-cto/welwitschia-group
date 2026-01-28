'use client';

import Card from '@/components/ui/Card';
import { ClientType } from './PricingCalculator';

interface ClientTypeStepProps {
  clientType: ClientType;
  onClientTypeChange: (type: ClientType) => void;
}

export default function ClientTypeStep({ clientType, onClientTypeChange }: ClientTypeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-brand-black mb-2">Select Client Type</h3>
        <p className="text-sm text-brand-black/70 mb-4">
          Choose your business type to get accurate pricing. Enterprise clients receive premium service with a 20% premium on one-time costs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          variant={clientType === 'SME' ? 'elevated' : 'outline'}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            clientType === 'SME' ? 'ring-2 ring-brand-red shadow-lg' : 'hover:ring-1 hover:ring-brand-red/30'
          }`}
          onClick={() => onClientTypeChange('SME')}
        >
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-brand-black mb-2">SME</h4>
            <p className="text-sm text-brand-black/70 mb-3">
              Small to Medium Enterprise
            </p>
            <p className="text-xs text-brand-black/60 leading-relaxed">
              Standard pricing for growing businesses. Perfect for companies looking to establish or enhance their digital presence with professional services.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs font-medium text-brand-red">Standard Rates</span>
            </div>
          </div>
        </Card>
        
        <Card 
          variant={clientType === 'Enterprise' ? 'elevated' : 'outline'}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            clientType === 'Enterprise' ? 'ring-2 ring-brand-red shadow-lg' : 'hover:ring-1 hover:ring-brand-red/30'
          }`}
          onClick={() => onClientTypeChange('Enterprise')}
        >
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-brand-black mb-2">Enterprise</h4>
            <p className="text-sm text-brand-black/70 mb-3">
              Large Enterprise
            </p>
            <p className="text-xs text-brand-black/60 leading-relaxed">
              Premium pricing with enhanced service levels. Includes priority support, dedicated account management, and enterprise-grade solutions.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs font-medium text-brand-red">+20% Premium on One-time Costs</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h5 className="text-sm font-medium text-blue-900 mb-1">Pricing Information</h5>
            <p className="text-xs text-blue-800">
              Enterprise pricing includes a 20% premium on one-time project costs to reflect the enhanced service level, priority support, and additional resources required for large-scale implementations. Monthly recurring costs remain the same for both client types.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}