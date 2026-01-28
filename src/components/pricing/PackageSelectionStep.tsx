'use client';

import Card from '@/components/ui/Card';
import { PackageType, ClientType } from './PricingCalculator';

interface Package {
  id: PackageType;
  name: string;
  description: string;
  targetAudience: string;
  includedServices: string[];
  priceRange: {
    oneTime: { min: number; max: number };
    monthly: { min: number; max: number };
  };
  popular?: boolean;
}

interface PackageSelectionStepProps {
  selectedPackage?: PackageType;
  clientType: ClientType;
  onPackageChange: (packageType: PackageType | undefined) => void;
}

const packages: Package[] = [
  {
    id: 'Starter',
    name: 'Starter Package',
    description: 'Perfect for small businesses getting started online',
    targetAudience: 'SMEs looking to establish their digital presence',
    includedServices: [
      'Basic Website Design',
      'Basic Hosting',
      'Basic Maintenance',
      'Social Media Management (Basic)'
    ],
    priceRange: {
      oneTime: { min: 12000, max: 18000 },
      monthly: { min: 1200, max: 2000 }
    }
  },
  {
    id: 'Growth',
    name: 'Growth Package',
    description: 'Comprehensive solution for growing businesses',
    targetAudience: 'Growing businesses ready to scale their operations',
    includedServices: [
      'Standard Website Design',
      'Simple Web Application',
      'Basic Dashboard',
      'Data Analytics (Basic)',
      'Advanced Hosting',
      'Basic Maintenance',
      'Social Media Management (Standard)'
    ],
    priceRange: {
      oneTime: { min: 30000, max: 55000 },
      monthly: { min: 3500, max: 6500 }
    },
    popular: true
  },
  {
    id: 'Enterprise',
    name: 'Enterprise Package',
    description: 'Full-scale solution for large organizations',
    targetAudience: 'Large enterprises requiring comprehensive digital solutions',
    includedServices: [
      'Advanced Website Design',
      'Complex Web Application',
      'Executive Dashboard',
      'Data Science (Advanced)',
      'Data Engineering (Standard)',
      'Advanced Hosting',
      'Full Maintenance',
      'Analytics Retainer',
      'Data Engineering Retainer'
    ],
    priceRange: {
      oneTime: { min: 80000, max: 180000 },
      monthly: { min: 8000, max: 15000 }
    }
  },
  {
    id: 'Custom',
    name: 'Custom Package',
    description: 'Tailored solution built specifically for your needs',
    targetAudience: 'Organizations with unique requirements',
    includedServices: [
      'Customized service selection',
      'Flexible pricing based on requirements',
      'Dedicated consultation',
      'Scalable solutions'
    ],
    priceRange: {
      oneTime: { min: 15000, max: 200000 },
      monthly: { min: 1000, max: 20000 }
    }
  }
];

export default function PackageSelectionStep({ 
  selectedPackage, 
  clientType, 
  onPackageChange 
}: PackageSelectionStepProps) {
  const formatCurrency = (amount: number) => {
    return `N$${amount.toLocaleString()}`;
  };

  const getAdjustedPriceRange = (pkg: Package) => {
    if (clientType === 'Enterprise' && pkg.id !== 'Custom') {
      // Apply 20% enterprise multiplier to one-time costs
      return {
        oneTime: {
          min: Math.round(pkg.priceRange.oneTime.min * 1.2),
          max: Math.round(pkg.priceRange.oneTime.max * 1.2)
        },
        monthly: pkg.priceRange.monthly // Monthly costs unchanged
      };
    }
    return pkg.priceRange;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-brand-black mb-2">Select Package</h3>
        <p className="text-sm text-brand-black/70 mb-4">
          Choose a pre-configured package or select Custom to build your own solution. 
          {clientType === 'Enterprise' && ' Enterprise pricing includes a 20% premium on one-time costs.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => {
          const adjustedPrices = getAdjustedPriceRange(pkg);
          const isSelected = selectedPackage === pkg.id;
          
          return (
            <Card
              key={pkg.id}
              variant={isSelected ? 'elevated' : 'outline'}
              className={`cursor-pointer transition-all hover:shadow-lg relative ${
                isSelected ? 'ring-2 ring-brand-red shadow-lg' : 'hover:ring-1 hover:ring-brand-red/30'
              }`}
              onClick={() => onPackageChange(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-red text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-brand-black mb-1">{pkg.name}</h4>
                    <p className="text-sm text-brand-black/70">{pkg.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-brand-black/60 mb-2">{pkg.targetAudience}</p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-brand-black">One-time Cost</span>
                    <span className="text-sm font-semibold text-brand-red">
                      {formatCurrency(adjustedPrices.oneTime.min)} - {formatCurrency(adjustedPrices.oneTime.max)}
                      {clientType === 'Enterprise' && pkg.id !== 'Custom' && (
                        <span className="text-xs text-brand-black/60 ml-1">(+20%)</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-brand-black">Monthly Cost</span>
                    <span className="text-sm font-semibold text-brand-red">
                      {formatCurrency(adjustedPrices.monthly.min)} - {formatCurrency(adjustedPrices.monthly.max)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h5 className="text-sm font-medium text-brand-black mb-2">Included Services:</h5>
                  <ul className="space-y-1">
                    {pkg.includedServices.map((service, index) => (
                      <li key={index} className="flex items-center text-xs text-brand-black/70">
                        <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.id === 'Custom' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      Custom packages allow you to select exactly the services you need. 
                      Pricing will be calculated based on your specific selections in the next steps.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-1">Package Customization</h5>
            <p className="text-xs text-gray-700">
              All packages can be customized in the next steps. Pre-configured packages provide a starting point 
              with commonly requested services, but you can add or remove services to match your exact needs.
            </p>
          </div>
        </div>
      </div>

      {selectedPackage && selectedPackage !== 'Custom' && (
        <div className="text-center">
          <button
            onClick={() => onPackageChange(undefined)}
            className="text-sm text-brand-red hover:text-brand-red/80 underline"
          >
            Clear selection and browse all services
          </button>
        </div>
      )}
    </div>
  );
}