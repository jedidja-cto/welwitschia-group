'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ClientTypeStep from './ClientTypeStep';
import PackageSelectionStep from './PackageSelectionStep';
import ServiceSelectionStep from './ServiceSelectionStep';
import MonthlyServicesStep from './MonthlyServicesStep';
import SummaryStep from './SummaryStep';

// Types for the pricing calculator
export type ClientType = 'SME' | 'Enterprise';
export type PackageType = 'Starter' | 'Growth' | 'Enterprise' | 'Custom';

export interface SelectedService {
  id: string;
  name: string;
  tier: 'Basic' | 'Standard' | 'Advanced' | 'Simple' | 'Medium' | 'Complex' | 'Executive';
  price: number;
  category: string;
}

export interface MonthlyService {
  id: string;
  name: string;
  price: number;
  required?: boolean;
}

export interface PricingSummary {
  clientType: ClientType;
  selectedPackage?: PackageType;
  services: SelectedService[];
  monthlyServices: MonthlyService[];
  oneTimeCost: number;
  monthlyCost: number;
  enterpriseMultiplier: number;
}

interface PricingCalculatorProps {
  onComplete?: (summary: PricingSummary) => void;
}

// Step components will be implemented in separate files

const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-brand-black">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-brand-black/70">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-wg-green h-1 rounded-full progress-fill transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full progress-step transition-colors duration-300 ${i + 1 <= currentStep ? 'bg-wg-green active' : 'bg-gray-200'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function PricingCalculator({ onComplete }: PricingCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientType, setClientType] = useState<ClientType>('SME');
  const [selectedPackage, setSelectedPackage] = useState<PackageType | undefined>();
  const [services, setServices] = useState<SelectedService[]>([]);
  const [monthlyServices, setMonthlyServices] = useState<MonthlyService[]>([]);

  const totalSteps = 5; // ClientType, Package, Services, Monthly, Summary

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateSummary = (): PricingSummary => {
    const oneTimeCost = services.reduce((total, service) => total + service.price, 0);
    const monthlyCost = monthlyServices.reduce((total, service) => total + service.price, 0);
    const enterpriseMultiplier = clientType === 'Enterprise' ? 1.2 : 1.0;

    return {
      clientType,
      selectedPackage,
      services,
      monthlyServices,
      oneTimeCost: oneTimeCost * enterpriseMultiplier,
      monthlyCost, // Monthly costs are not affected by enterprise multiplier
      enterpriseMultiplier,
    };
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ClientTypeStep
            clientType={clientType}
            onClientTypeChange={setClientType}
          />
        );
      case 2:
        return (
          <PackageSelectionStep
            selectedPackage={selectedPackage}
            clientType={clientType}
            onPackageChange={setSelectedPackage}
          />
        );
      case 3:
        return (
          <ServiceSelectionStep
            services={services}
            selectedPackage={selectedPackage}
            clientType={clientType}
            onServicesChange={setServices}
          />
        );
      case 4:
        return (
          <MonthlyServicesStep
            monthlyServices={monthlyServices}
            onMonthlyServicesChange={setMonthlyServices}
          />
        );
      case 5:
        return (
          <SummaryStep
            summary={calculateSummary()}
            onExport={(format) => {
              console.log(`Exporting as ${format}`);
              // Handle export logic here
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card variant="outline" className="p-8">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="min-h-[400px] step-transition">
          <div className="step-enter-active">
            {renderCurrentStep()}
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex gap-3">
            {currentStep === totalSteps ? (
              <Button
                onClick={() => {
                  const summary = calculateSummary();
                  onComplete?.(summary);
                }}
              >
                Complete
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}