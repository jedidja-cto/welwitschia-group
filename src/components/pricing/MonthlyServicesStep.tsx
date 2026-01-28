'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { MonthlyService } from './PricingCalculator';
import { PricingEngine } from './PricingEngine';

interface MonthlyServicesStepProps {
  monthlyServices: MonthlyService[];
  onMonthlyServicesChange: (services: MonthlyService[]) => void;
}

interface MonthlyServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  required?: boolean;
}

export default function MonthlyServicesStep({ 
  monthlyServices, 
  onMonthlyServicesChange 
}: MonthlyServicesStepProps) {
  const [availableServices, setAvailableServices] = useState<MonthlyServiceOption[]>([]);

  useEffect(() => {
    // Get all monthly services from PricingEngine
    const allMonthlyServices = PricingEngine.getAllMonthlyServices();
    const formattedServices: MonthlyServiceOption[] = allMonthlyServices.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.pricing.base,
      category: service.category,
      required: service.id === 'hosting-basic' // Basic hosting is required
    }));

    setAvailableServices(formattedServices);

    // Auto-select required services if not already selected
    const requiredServices = formattedServices.filter(s => s.required);
    const currentServiceIds = monthlyServices.map(s => s.id);
    const missingRequired = requiredServices.filter(s => !currentServiceIds.includes(s.id));
    
    if (missingRequired.length > 0) {
      const newServices = missingRequired.map(service => ({
        id: service.id,
        name: service.name,
        price: service.price,
        required: service.required
      }));
      onMonthlyServicesChange([...monthlyServices, ...newServices]);
    }
  }, [monthlyServices, onMonthlyServicesChange]);

  const formatCurrency = (amount: number) => {
    return `N${amount.toLocaleString()}`;
  };

  const isServiceSelected = (serviceId: string): boolean => {
    return monthlyServices.some(s => s.id === serviceId);
  };

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    const service = availableServices.find(s => s.id === serviceId);
    if (!service) return;

    if (checked) {
      const newService: MonthlyService = {
        id: serviceId,
        name: service.name,
        price: service.price,
        required: service.required
      };
      onMonthlyServicesChange([...monthlyServices, newService]);
    } else {
      // Don't allow removing required services
      if (service.required) return;
      onMonthlyServicesChange(monthlyServices.filter(s => s.id !== serviceId));
    }
  };

  const groupedServices = availableServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as { [category: string]: MonthlyServiceOption[] });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-brand-black mb-2">Monthly Services</h3>
        <p className="text-sm text-brand-black/70 mb-4">
          Select hosting and maintenance options. Some services are required for all projects.
        </p>
      </div>

      {/* Hosting Section */}
      {groupedServices.hosting && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-brand-black">Hosting Services</h4>
            <span className="text-xs text-brand-red font-medium">Required</span>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h5 className="text-sm font-medium text-amber-900 mb-1">Hosting Ownership Disclaimer</h5>
                <p className="text-xs text-amber-800">
                  <strong>Important:</strong> All hosting services are owned and managed by Welwitschia Data. 
                  You will receive access credentials and management capabilities, but the hosting infrastructure 
                  remains under our ownership and control. This ensures optimal performance, security, and support.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {groupedServices.hosting.map((service) => {
              const isSelected = isServiceSelected(service.id);
              const isBasicHosting = service.id === 'hosting-basic';
              
              return (
                <Card
                  key={service.id}
                  variant="outline"
                  className={`transition-all ${
                    isSelected ? 'ring-1 ring-brand-red bg-brand-red/5' : ''
                  } ${isBasicHosting ? 'ring-2 ring-amber-300 bg-amber-50' : ''}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="hosting"
                          id={service.id}
                          checked={isSelected}
                          onChange={(e) => {
                            // For hosting, we need to handle radio button behavior
                            if (e.target.checked) {
                              // Remove other hosting services first
                              const nonHostingServices = monthlyServices.filter(s => 
                                !availableServices.find(as => as.id === s.id && as.category === 'hosting')
                              );
                              // Add the selected hosting service
                              const newService: MonthlyService = {
                                id: service.id,
                                name: service.name,
                                price: service.price,
                                required: service.required
                              };
                              onMonthlyServicesChange([...nonHostingServices, newService]);
                            }
                          }}
                          className="mt-1 h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <label
                              htmlFor={service.id}
                              className="text-sm font-medium text-brand-black cursor-pointer"
                            >
                              {service.name}
                            </label>
                            {service.required && (
                              <span className="text-xs bg-brand-red text-white px-2 py-0.5 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-brand-black/70 mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-brand-red">
                          {formatCurrency(service.price)}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Maintenance Section */}
      {groupedServices.maintenance && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-brand-black border-b border-gray-200 pb-2">
            Maintenance Services
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            {groupedServices.maintenance.map((service) => {
              const isSelected = isServiceSelected(service.id);
              
              return (
                <Card
                  key={service.id}
                  variant="outline"
                  className={`transition-all ${isSelected ? 'ring-1 ring-brand-red bg-brand-red/5' : ''}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
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
                      <div className="text-right">
                        <span className="text-sm font-semibold text-brand-red">
                          {formatCurrency(service.price)}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Retainers Section */}
      {groupedServices.retainers && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-brand-black border-b border-gray-200 pb-2">
            Retainer Services
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            {groupedServices.retainers.map((service) => {
              const isSelected = isServiceSelected(service.id);
              
              return (
                <Card
                  key={service.id}
                  variant="outline"
                  className={`transition-all ${isSelected ? 'ring-1 ring-brand-red bg-brand-red/5' : ''}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
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
                      <div className="text-right">
                        <span className="text-sm font-semibold text-brand-red">
                          {formatCurrency(service.price)}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {monthlyServices.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="text-sm font-medium text-blue-900 mb-2">Selected Monthly Services Summary</h5>
          <div className="space-y-1">
            {monthlyServices.map((service) => (
              <div key={service.id} className="flex justify-between items-center text-xs">
                <span className="text-blue-800 flex items-center">
                  {service.name}
                  {service.required && (
                    <span className="ml-2 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </span>
                <span className="font-medium text-blue-900">
                  {formatCurrency(service.price)}/month
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-200 mt-2 pt-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-blue-900">Total Monthly Cost:</span>
              <span className="text-blue-900">
                {formatCurrency(monthlyServices.reduce((total, service) => total + service.price, 0))}/month
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-1">Monthly Service Information</h5>
            <p className="text-xs text-gray-700">
              Monthly services are billed on a recurring basis. Hosting is required for all web-based projects. 
              Maintenance services help keep your systems updated and secure. Retainer services provide ongoing 
              support and development capacity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}