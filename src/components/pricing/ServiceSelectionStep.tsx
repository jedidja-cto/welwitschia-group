'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { SelectedService, PackageType, ClientType } from './PricingCalculator';
import { PricingEngine } from './PricingEngine';

interface ServiceSelectionStepProps {
  services: SelectedService[];
  selectedPackage?: PackageType;
  clientType: ClientType;
  onServicesChange: (services: SelectedService[]) => void;
}

interface ServiceWithTiers {
  id: string;
  name: string;
  description: string;
  category: string;
  tiers: Array<{
    name: string;
    price: number;
    description: string;
  }>;
}

export default function ServiceSelectionStep({ 
  services, 
  selectedPackage, 
  clientType,
  onServicesChange 
}: ServiceSelectionStepProps) {
  const [availableServices, setAvailableServices] = useState<ServiceWithTiers[]>([]);

  useEffect(() => {
    // Get all services from PricingEngine and format them with tiers
    const allServices = PricingEngine.getAllServices();
    const formattedServices: ServiceWithTiers[] = [];

    allServices.forEach(category => {
      category.services.forEach(service => {
        if (service.pricing.tiers) {
          const tiers = Object.entries(service.pricing.tiers).map(([tierName, price]) => ({
            name: tierName.charAt(0).toUpperCase() + tierName.slice(1),
            price: price as number,
            description: getTierDescription(service.id, tierName)
          }));

          formattedServices.push({
            id: service.id,
            name: service.name,
            description: service.description,
            category: category.name,
            tiers
          });
        }
      });
    });

    setAvailableServices(formattedServices);

    // Pre-fill services based on selected package
    if (selectedPackage && selectedPackage !== 'Custom') {
      const preFilledServices = getPackageServices(selectedPackage);
      onServicesChange(preFilledServices);
    }
  }, [selectedPackage, onServicesChange]);

  const getTierDescription = (serviceId: string, tierName: string): string => {
    const descriptions: { [key: string]: { [key: string]: string } } = {
      'web-design': {
        basic: 'Simple website with essential features',
        standard: 'Professional website with advanced features',
        advanced: 'Premium website with custom functionality'
      },
      'web-app': {
        simple: 'Basic web application with core features',
        medium: 'Feature-rich application with integrations',
        complex: 'Enterprise-grade application with advanced features'
      },
      'dashboard': {
        basic: 'Standard dashboard with key metrics',
        advanced: 'Interactive dashboard with detailed analytics',
        executive: 'Executive-level dashboard with comprehensive insights'
      },
      'data-analytics': {
        basic: 'Basic reporting and analytics',
        standard: 'Advanced analytics with visualizations',
        advanced: 'Comprehensive analytics with predictive insights'
      },
      'data-science': {
        basic: 'Basic data science and modeling',
        standard: 'Advanced machine learning solutions',
        advanced: 'Enterprise AI and ML implementations'
      },
      'data-engineering': {
        basic: 'Basic data pipeline setup',
        standard: 'Scalable data infrastructure',
        advanced: 'Enterprise data architecture'
      },
      'social-media': {
        basic: 'Basic social media management',
        standard: 'Comprehensive social media strategy',
        advanced: 'Full-service social media marketing'
      },
      'training': {
        basic: 'Basic training sessions',
        standard: 'Comprehensive training programs',
        advanced: 'Custom enterprise training solutions'
      }
    };

    return descriptions[serviceId]?.[tierName] || 'Professional service tier';
  };

  const getPackageServices = (packageType: PackageType): SelectedService[] => {
    const packageServices: { [key: string]: SelectedService[] } = {
      'Starter': [
        {
          id: 'web-design',
          name: 'Website Design',
          tier: 'Basic',
          price: getAdjustedPrice('web-design', 'Basic'),
          category: 'Web Services'
        },
        {
          id: 'social-media',
          name: 'Social Media Management',
          tier: 'Basic',
          price: getAdjustedPrice('social-media', 'Basic'),
          category: 'Creative Services'
        }
      ],
      'Growth': [
        {
          id: 'web-design',
          name: 'Website Design',
          tier: 'Standard',
          price: getAdjustedPrice('web-design', 'Standard'),
          category: 'Web Services'
        },
        {
          id: 'web-app',
          name: 'Web Applications and Mobile Applications',
          tier: 'Simple',
          price: getAdjustedPrice('web-app', 'Simple'),
          category: 'Web Services'
        },
        {
          id: 'dashboard',
          name: 'Dashboard Design',
          tier: 'Basic',
          price: getAdjustedPrice('dashboard', 'Basic'),
          category: 'Web Services'
        },
        {
          id: 'data-analytics',
          name: 'Data Analytics',
          tier: 'Basic',
          price: getAdjustedPrice('data-analytics', 'Basic'),
          category: 'Data Services'
        },
        {
          id: 'social-media',
          name: 'Social Media Management',
          tier: 'Standard',
          price: getAdjustedPrice('social-media', 'Standard'),
          category: 'Creative Services'
        }
      ],
      'Enterprise': [
        {
          id: 'web-design',
          name: 'Website Design',
          tier: 'Advanced',
          price: getAdjustedPrice('web-design', 'Advanced'),
          category: 'Web Services'
        },
        {
          id: 'web-app',
          name: 'Web Applications and Mobile Applications',
          tier: 'Complex',
          price: getAdjustedPrice('web-app', 'Complex'),
          category: 'Web Services'
        },
        {
          id: 'dashboard',
          name: 'Dashboard Design',
          tier: 'Executive',
          price: getAdjustedPrice('dashboard', 'Executive'),
          category: 'Web Services'
        },
        {
          id: 'data-science',
          name: 'Data Science',
          tier: 'Advanced',
          price: getAdjustedPrice('data-science', 'Advanced'),
          category: 'Data Services'
        },
        {
          id: 'data-engineering',
          name: 'Data Engineering',
          tier: 'Standard',
          price: getAdjustedPrice('data-engineering', 'Standard'),
          category: 'Data Services'
        }
      ]
    };

    return packageServices[packageType] || [];
  };

  const getAdjustedPrice = (serviceId: string, tier: string): number => {
    const basePrice = getServicePrice(serviceId, tier);
    return clientType === 'Enterprise' ? Math.round(basePrice * 1.2) : basePrice;
  };

  const getServicePrice = (serviceId: string, tier: string): number => {
    const service = availableServices.find(s => s.id === serviceId);
    const tierInfo = service?.tiers.find(t => t.name.toLowerCase() === tier.toLowerCase());
    return tierInfo?.price || 0;
  };

  const formatCurrency = (amount: number) => {
    return `N$${amount.toLocaleString()}`;
  };

  const isServiceSelected = (serviceId: string): boolean => {
    return services.some(s => s.id === serviceId);
  };

  const getSelectedTier = (serviceId: string): string => {
    const selectedService = services.find(s => s.id === serviceId);
    return selectedService?.tier || '';
  };

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    if (checked) {
      // Add service with basic tier by default
      const service = availableServices.find(s => s.id === serviceId);
      if (service && service.tiers.length > 0) {
        const basicTier = service.tiers[0];
        const tierName = basicTier.name as SelectedService['tier'];
        const newService: SelectedService = {
          id: serviceId,
          name: service.name,
          tier: tierName,
          price: getAdjustedPrice(serviceId, basicTier.name),
          category: service.category
        };
        onServicesChange([...services, newService]);
      }
    } else {
      // Remove service
      onServicesChange(services.filter(s => s.id !== serviceId));
    }
  };

  const handleTierChange = (serviceId: string, newTier: string) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          tier: newTier as SelectedService['tier'],
          price: getAdjustedPrice(serviceId, newTier)
        };
      }
      return service;
    });
    onServicesChange(updatedServices);
  };

  const groupedServices = availableServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as { [category: string]: ServiceWithTiers[] });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-brand-black mb-2">Select Services</h3>
        <p className="text-sm text-brand-black/70 mb-4">
          Choose individual services and their tiers. 
          {selectedPackage && selectedPackage !== 'Custom' && 
            ` Services have been pre-filled based on your ${selectedPackage} package selection, but you can customize them below.`
          }
          {clientType === 'Enterprise' && ' Enterprise pricing includes a 20% premium on all one-time costs.'}
        </p>
      </div>

      {Object.entries(groupedServices).map(([categoryName, categoryServices]) => (
        <div key={categoryName} className="space-y-4">
          <h4 className="text-md font-medium text-brand-black border-b border-gray-200 pb-2">
            {categoryName}
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            {categoryServices.map((service) => {
              const isSelected = isServiceSelected(service.id);
              const selectedTier = getSelectedTier(service.id);
              
              return (
                <Card
                  key={service.id}
                  variant="outline"
                  className={`transition-all ${isSelected ? 'ring-1 ring-brand-red bg-brand-red/5' : ''}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={service.id}
                          checked={isSelected}
                          onChange={(e) => handleServiceToggle(service.id, e.target.checked)}
                          className="mt-1 h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded"
                        />
                        <div>
                          <label
                            htmlFor={service.id}
                            className="text-sm font-medium text-brand-black cursor-pointer"
                          >
                            {service.name}
                          </label>
                          <p className="text-xs text-brand-black/70 mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="ml-7 space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-brand-black mb-2">
                            Select Tier:
                          </label>
                          <select
                            value={selectedTier}
                            onChange={(e) => handleTierChange(service.id, e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                          >
                            {service.tiers.map((tier) => (
                              <option key={tier.name} value={tier.name}>
                                {tier.name} - {formatCurrency(getAdjustedPrice(service.id, tier.name))}
                                {clientType === 'Enterprise' && ' (+20%)'}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {selectedTier && (
                          <div className="bg-gray-50 rounded-md p-3">
                            <p className="text-xs text-gray-700">
                              {getTierDescription(service.id, selectedTier.toLowerCase())}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {services.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="text-sm font-medium text-blue-900 mb-2">Selected Services Summary</h5>
          <div className="space-y-1">
            {services.map((service) => (
              <div key={service.id} className="flex justify-between items-center text-xs">
                <span className="text-blue-800">
                  {service.name} ({service.tier})
                </span>
                <span className="font-medium text-blue-900">
                  {formatCurrency(service.price)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-200 mt-2 pt-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-blue-900">Total One-time Cost:</span>
              <span className="text-blue-900">
                {formatCurrency(services.reduce((total, service) => total + service.price, 0))}
              </span>
            </div>
          </div>
        </div>
      )}

      {selectedPackage && selectedPackage !== 'Custom' && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-1">Package Customization</h5>
              <p className="text-xs text-gray-700">
                Services have been pre-selected based on your {selectedPackage} package. 
                You can add or remove services and change tiers to customize your solution.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}