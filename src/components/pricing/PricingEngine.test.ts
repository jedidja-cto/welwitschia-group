import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { PricingEngine, ServiceSelections } from './PricingEngine';

describe('PricingEngine', () => {
  /**
   * **Feature: website-enhancement, Property 1: Enterprise pricing multiplier consistency**
   * **Validates: Requirements 2.2, 6.4**
   * 
   * Property 1: Enterprise pricing multiplier consistency
   * For any combination of one-time services selected in the pricing calculator, 
   * when Enterprise client type is chosen, all one-time costs should be increased 
   * by exactly 20% while monthly costs remain unchanged
   */
  it('should apply enterprise multiplier consistently to one-time costs only', () => {
    // Generator for service selections
    const serviceSelectionGen = fc.record({
      serviceId: fc.constantFrom(
        'web-design', 'web-app', 'dashboard', 'data-analytics', 
        'data-science', 'data-engineering', 'social-media', 'training'
      ),
      tier: fc.constantFrom('basic', 'standard', 'advanced', 'simple', 'medium', 'complex')
    });

    // Generator for monthly service selections
    const monthlyServiceSelectionGen = fc.record({
      serviceId: fc.constantFrom(
        'hosting-basic', 'hosting-advanced', 'maintenance-basic', 'maintenance-full',
        'retainer-analytics', 'retainer-data-science', 'retainer-data-engineering',
        'retainer-virtual-assistant', 'retainer-social-media'
      )
    });

    // Generator for complete service selections
    const serviceSelectionsGen = fc.record({
      clientType: fc.constant('SME' as const),
      services: fc.array(serviceSelectionGen, { minLength: 1, maxLength: 5 }),
      monthlyServices: fc.array(monthlyServiceSelectionGen, { minLength: 0, maxLength: 3 })
    });

    fc.assert(
      fc.property(serviceSelectionsGen, (smeSelections) => {
        // Calculate pricing for SME
        const smeSummary = PricingEngine.calculateTotal(smeSelections);
        
        // Calculate pricing for Enterprise with same services
        const enterpriseSelections: ServiceSelections = {
          ...smeSelections,
          clientType: 'Enterprise'
        };
        const enterpriseSummary = PricingEngine.calculateTotal(enterpriseSelections);

        // Verify enterprise multiplier is applied correctly
        const expectedEnterpriseOneTimeCost = smeSummary.oneTimeCost * 1.2;
        
        // One-time costs should be exactly 20% higher for Enterprise
        expect(enterpriseSummary.oneTimeCost).toBeCloseTo(expectedEnterpriseOneTimeCost, 2);
        
        // Monthly costs should remain unchanged
        expect(enterpriseSummary.monthlyCost).toBe(smeSummary.monthlyCost);
        
        // Enterprise multiplier should be 1.2
        expect(enterpriseSummary.enterpriseMultiplier).toBe(1.2);
        
        // SME multiplier should be 1.0
        expect(smeSummary.enterpriseMultiplier).toBe(1.0);
      }),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });

  /**
   * **Feature: website-enhancement, Property 8: Pricing accuracy across all services**
   * **Validates: Requirements 6.1, 6.2, 6.3, 6.5**
   * 
   * Property 8: Pricing accuracy across all services
   * For any service selection in the pricing calculator, the calculated costs 
   * should match the exact predefined pricing values for each service type and tier
   */
  it('should calculate accurate pricing for all service combinations', () => {
    // Expected pricing values from requirements - these should match PricingEngine exactly
    const expectedPrices = {
      'web-design': { basic: 10000, standard: 20000, advanced: 35000 },
      'web-app': { simple: 50000, medium: 85000, complex: 150000 },
      'dashboard': { basic: 15000, advanced: 35000, executive: 60000 },
      'data-analytics': { basic: 8000, standard: 15000, advanced: 25000 },
      'data-science': { basic: 12000, standard: 20000, advanced: 35000 },
      'data-engineering': { basic: 10000, standard: 18000, advanced: 30000 },
      'social-media': { basic: 5000, standard: 8000, advanced: 12000 },
      'training': { basic: 8000, standard: 15000, advanced: 25000 }
    };

    const monthlyPrices = {
      'hosting-basic': 450,
      'hosting-advanced': 1000,
      'maintenance-basic': 1200,
      'maintenance-full': 2500,
      'retainer-analytics': 5000,
      'retainer-data-science': 10000,
      'retainer-data-engineering': 8000,
      'retainer-virtual-assistant': 8000,
      'retainer-social-media': 6000
    };

    // Generator for valid service and tier combinations
    const validServiceTierGen = fc.oneof(
      fc.record({ serviceId: fc.constant('web-design'), tier: fc.constantFrom('basic', 'standard', 'advanced') }),
      fc.record({ serviceId: fc.constant('web-app'), tier: fc.constantFrom('simple', 'medium', 'complex') }),
      fc.record({ serviceId: fc.constant('dashboard'), tier: fc.constantFrom('basic', 'advanced', 'executive') }),
      fc.record({ serviceId: fc.constant('data-analytics'), tier: fc.constantFrom('basic', 'standard', 'advanced') }),
      fc.record({ serviceId: fc.constant('data-science'), tier: fc.constantFrom('basic', 'standard', 'advanced') }),
      fc.record({ serviceId: fc.constant('data-engineering'), tier: fc.constantFrom('basic', 'standard', 'advanced') }),
      fc.record({ serviceId: fc.constant('social-media'), tier: fc.constantFrom('basic', 'standard', 'advanced') }),
      fc.record({ serviceId: fc.constant('training'), tier: fc.constantFrom('basic', 'standard', 'advanced') })
    );

    const monthlyServiceGen = fc.record({
      serviceId: fc.constantFrom(...Object.keys(monthlyPrices) as Array<keyof typeof monthlyPrices>)
    });

    const serviceSelectionsGen = fc.record({
      clientType: fc.constantFrom('SME', 'Enterprise') as fc.Arbitrary<'SME' | 'Enterprise'>,
      services: fc.array(validServiceTierGen, { minLength: 1, maxLength: 3 }),
      monthlyServices: fc.array(monthlyServiceGen, { minLength: 0, maxLength: 2 })
    });

    fc.assert(
      fc.property(serviceSelectionsGen, (selections) => {
        const summary = PricingEngine.calculateTotal(selections);

        // Verify each service price matches expected values
        for (const service of summary.services) {
          const expectedServicePrices = expectedPrices[service.id as keyof typeof expectedPrices];
          if (expectedServicePrices) {
            const basePrice = expectedServicePrices[service.tier.toLowerCase() as keyof typeof expectedServicePrices];
            if (basePrice) {
              // The service.price in summary already includes enterprise multiplier if applicable
              // So we need to compare against the base price * multiplier
              const multiplier = selections.clientType === 'Enterprise' ? 1.2 : 1.0;
              const expectedPrice = basePrice * multiplier;
              expect(service.price).toBeCloseTo(expectedPrice, 2);
            }
          }
        }

        // Verify each monthly service price matches expected values
        for (const monthlyService of summary.monthlyServices) {
          const expectedPrice = monthlyPrices[monthlyService.id as keyof typeof monthlyPrices];
          if (expectedPrice) {
            expect(monthlyService.price).toBe(expectedPrice);
          }
        }

        // Verify total calculations
        const expectedOneTimeTotal = summary.services.reduce((total, service) => total + service.price, 0);
        const expectedMonthlyTotal = summary.monthlyServices.reduce((total, service) => total + service.price, 0);

        expect(summary.oneTimeCost).toBeCloseTo(expectedOneTimeTotal, 2);
        expect(summary.monthlyCost).toBe(expectedMonthlyTotal);
      }),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });

  // Unit tests for specific examples and edge cases
  describe('Unit Tests', () => {
    it('should calculate correct pricing for basic web design SME', () => {
      const selections: ServiceSelections = {
        clientType: 'SME',
        services: [{ serviceId: 'web-design', tier: 'basic' }],
        monthlyServices: []
      };

      const summary = PricingEngine.calculateTotal(selections);

      expect(summary.oneTimeCost).toBe(10000); // Basic Website (N$10,000)
      expect(summary.monthlyCost).toBe(0);
      expect(summary.enterpriseMultiplier).toBe(1.0);
    });

    it('should calculate correct pricing for complex web app Enterprise', () => {
      const selections: ServiceSelections = {
        clientType: 'Enterprise',
        services: [{ serviceId: 'web-app', tier: 'complex' }],
        monthlyServices: []
      };

      const summary = PricingEngine.calculateTotal(selections);

      expect(summary.oneTimeCost).toBe(180000); // Complex (N$150,000) * 1.2 = N$180,000
      expect(summary.monthlyCost).toBe(0);
      expect(summary.enterpriseMultiplier).toBe(1.2);
    });

    it('should calculate correct monthly pricing without enterprise multiplier', () => {
      const selections: ServiceSelections = {
        clientType: 'Enterprise',
        services: [],
        monthlyServices: [
          { serviceId: 'hosting-basic' },
          { serviceId: 'maintenance-full' }
        ]
      };

      const summary = PricingEngine.calculateTotal(selections);

      expect(summary.oneTimeCost).toBe(0);
      expect(summary.monthlyCost).toBe(2950); // Basic Hosting (N$450) + Full Maintenance (N$2,500) = N$2,950
      expect(summary.enterpriseMultiplier).toBe(1.2);
    });

    it('should handle mixed one-time and monthly services correctly', () => {
      const selections: ServiceSelections = {
        clientType: 'Enterprise',
        services: [
          { serviceId: 'web-design', tier: 'standard' },
          { serviceId: 'data-analytics', tier: 'basic' }
        ],
        monthlyServices: [
          { serviceId: 'hosting-advanced' },
          { serviceId: 'retainer-analytics' }
        ]
      };

      const summary = PricingEngine.calculateTotal(selections);

      // One-time: (20000 + 8000) * 1.2 = 33600
      expect(summary.oneTimeCost).toBe(33600);
      // Monthly: 1000 + 5000 = 6000 (no multiplier)
      expect(summary.monthlyCost).toBe(6000);
      expect(summary.enterpriseMultiplier).toBe(1.2);
    });
  });
});