/**
 * Property-Based Tests for Solutions Configuration
 * Feature: navigation-restructure, Property 5: Solutions Content Type Validation
 * Feature: navigation-restructure, Property 6: Solutions Information Completeness
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { solutions, solutionsConfig } from '../solutionsConfig';
import { Solution, SolutionsConfig } from '@/types/solution';

describe('Solutions Configuration Property Tests', () => {
  
  /**
   * Property 5: Solutions Content Type Validation
   * For any solutions section rendering, all displayed items should be marked as owned products 
   * and not include client services or one-off work.
   * Validates: Requirements 3.1, 3.2
   */
  it('should display only owned products and not include client services or one-off work', () => {
    // Feature: navigation-restructure, Property 5: Solutions Content Type Validation
    fc.assert(fc.property(
      fc.record({
        // Generate various solution configurations to test the property
        solutionCount: fc.integer({ min: 1, max: 10 }),
        randomSolutionIndex: fc.integer({ min: 0, max: solutions.length - 1 }),
        testCategory: fc.constantFrom('product', 'platform', 'service')
      }),
      (generatedData) => {
        const actualSolutions = solutions;
        const config = solutionsConfig;
        
        // Requirement 3.1: Solutions section should display only products the company builds and owns in-house
        actualSolutions.forEach(solution => {
          // Each solution should be categorized as an owned product/platform/service
          expect(['product', 'platform', 'service']).toContain(solution.category);
          
          // Solutions should have clear ownership indicators
          expect(solution.id).toBeTruthy();
          expect(solution.name).toBeTruthy();
          expect(solution.description).toBeTruthy();
          
          // Solutions should not be client services (indicated by specific naming patterns)
          const clientServiceIndicators = [
            'consulting', 'custom development', 'one-off', 'client project',
            'bespoke', 'tailored service', 'custom service'
          ];
          
          const solutionText = `${solution.name} ${solution.description}`.toLowerCase();
          clientServiceIndicators.forEach(indicator => {
            expect(solutionText).not.toContain(indicator);
          });
          
          // Solutions should indicate they are owned products
          const ownedProductIndicators = [
            'platform', 'toolkit', 'builder', 'templates', 'analytics',
            'solution', 'product', 'system'
          ];
          
          const hasOwnedIndicator = ownedProductIndicators.some(indicator => 
            solutionText.includes(indicator)
          );
          expect(hasOwnedIndicator).toBe(true);
        });
        
        // Requirement 3.2: Should not include any custom client services or one-off work
        actualSolutions.forEach(solution => {
          // Check that solutions are not one-off services
          expect(solution.description.toLowerCase()).not.toContain('one-off');
          expect(solution.description.toLowerCase()).not.toContain('custom client');
          expect(solution.description.toLowerCase()).not.toContain('bespoke client');
          
          // Solutions should have features that indicate they are products, not services
          expect(solution.features).toBeDefined();
          expect(solution.features.length).toBeGreaterThan(0);
          
          // Features should not indicate custom/client-specific work
          solution.features.forEach(feature => {
            const featureText = feature.toLowerCase();
            expect(featureText).not.toContain('custom client');
            expect(featureText).not.toContain('one-off');
            expect(featureText).not.toContain('bespoke for');
          });
        });
        
        // Verify that all solutions are categorized as owned products
        const validCategories = ['product', 'platform', 'service'];
        actualSolutions.forEach(solution => {
          expect(validCategories).toContain(solution.category);
        });
        
        // Ensure solutions config properly represents owned products
        expect(config.solutions).toEqual(actualSolutions);
        expect(config.heroMessage).toBeTruthy();
        expect(config.subtitle).toBeTruthy();
        
        // Hero message should emphasize owned solutions, not client services
        const heroText = config.heroMessage.toLowerCase();
        expect(heroText).not.toContain('client service');
        expect(heroText).not.toContain('custom development');
        expect(heroText).not.toContain('consulting');
      }
    ), { numRuns: 100 });
  });

  /**
   * Property 6: Solutions Information Completeness
   * For any solution item displayed, it should include product name, description, and availability status 
   * with clear differentiation from client services.
   * Validates: Requirements 3.3, 3.4
   */
  it('should include complete information with clear differentiation from client services', () => {
    // Feature: navigation-restructure, Property 6: Solutions Information Completeness
    fc.assert(fc.property(
      fc.record({
        // Generate various solution data to test completeness
        randomIndex: fc.integer({ min: 0, max: solutions.length - 1 }),
        testStatus: fc.constantFrom('available', 'coming-soon', 'beta'),
        testCategory: fc.constantFrom('product', 'platform', 'service')
      }),
      (generatedData) => {
        const actualSolutions = solutions;
        const config = solutionsConfig;
        
        // Requirement 3.3: Should clearly differentiate owned products from client services
        actualSolutions.forEach(solution => {
          // Each solution should have complete required information
          expect(solution.id).toBeTruthy();
          expect(typeof solution.id).toBe('string');
          expect(solution.id.length).toBeGreaterThan(0);
          
          // Requirement 3.4: Should include product names, descriptions, and availability status
          expect(solution.name).toBeTruthy();
          expect(typeof solution.name).toBe('string');
          expect(solution.name.length).toBeGreaterThan(0);
          
          expect(solution.description).toBeTruthy();
          expect(typeof solution.description).toBe('string');
          expect(solution.description.length).toBeGreaterThan(0);
          
          expect(solution.status).toBeTruthy();
          expect(['available', 'coming-soon', 'beta']).toContain(solution.status);
          
          // Features should be present and informative
          expect(solution.features).toBeDefined();
          expect(Array.isArray(solution.features)).toBe(true);
          expect(solution.features.length).toBeGreaterThan(0);
          
          solution.features.forEach(feature => {
            expect(feature).toBeTruthy();
            expect(typeof feature).toBe('string');
            expect(feature.length).toBeGreaterThan(0);
          });
          
          // Category should clearly indicate it's an owned product/platform/service
          expect(['product', 'platform', 'service']).toContain(solution.category);
          
          // Clear differentiation from client services through naming and description
          const solutionContent = `${solution.name} ${solution.description}`.toLowerCase();
          
          // Should not contain client service language
          const clientServiceTerms = [
            'we will build for you', 'custom for your business', 'tailored to your needs',
            'one-off project', 'consulting engagement', 'bespoke development'
          ];
          
          clientServiceTerms.forEach(term => {
            expect(solutionContent).not.toContain(term);
          });
          
          // Should contain owned product language
          const ownedProductTerms = [
            'platform', 'toolkit', 'solution', 'product', 'system',
            'ready-to-use', 'pre-built', 'no-code', 'automated'
          ];
          
          const hasOwnedProductLanguage = ownedProductTerms.some(term => 
            solutionContent.includes(term)
          );
          expect(hasOwnedProductLanguage).toBe(true);
          
          // If solution has pricing, it should be structured for products, not services
          if (solution.pricing) {
            expect(['free', 'subscription', 'one-time', 'custom']).toContain(solution.pricing.model);
            
            // Product pricing should not indicate hourly/consulting rates
            if (solution.pricing.period) {
              expect(['monthly', 'yearly', 'one-time']).toContain(solution.pricing.period);
              expect(solution.pricing.period).not.toBe('hourly');
              expect(solution.pricing.period).not.toBe('per-project');
            }
          }
          
          // If solution has href, it should point to product pages, not service pages
          if (solution.href) {
            expect(solution.href).toMatch(/^\/solutions\//);
            expect(solution.href).not.toMatch(/^\/services\//);
          }
        });
        
        // Configuration should emphasize product nature
        expect(config.heroMessage).toBeTruthy();
        expect(config.subtitle).toBeTruthy();
        expect(config.ctaText).toBeTruthy();
        
        // Configuration language should differentiate from services
        const configText = `${config.heroMessage} ${config.subtitle} ${config.ctaText}`.toLowerCase();
        expect(configText).not.toContain('hire us');
        expect(configText).not.toContain('custom development');
        expect(configText).not.toContain('consulting');
        
        // Should contain product-focused language
        const productLanguage = ['solutions', 'products', 'platforms', 'tools'];
        const hasProductLanguage = productLanguage.some(term => 
          configText.includes(term)
        );
        expect(hasProductLanguage).toBe(true);
        
        // All solutions should have complete information
        expect(actualSolutions.length).toBeGreaterThan(0);
        actualSolutions.forEach(solution => {
          // Required fields should all be present and valid
          expect(solution.id).toBeTruthy();
          expect(solution.name).toBeTruthy();
          expect(solution.description).toBeTruthy();
          expect(solution.status).toBeTruthy();
          expect(solution.features).toBeTruthy();
          expect(solution.category).toBeTruthy();
          
          // Status should be one of the valid options
          expect(['available', 'coming-soon', 'beta']).toContain(solution.status);
          
          // Category should be one of the valid options
          expect(['product', 'platform', 'service']).toContain(solution.category);
          
          // Features should be a non-empty array
          expect(Array.isArray(solution.features)).toBe(true);
          expect(solution.features.length).toBeGreaterThan(0);
        });
      }
    ), { numRuns: 100 });
  });

  it('should maintain consistent solution data structure across all solutions', () => {
    // Feature: navigation-restructure, Property 5 & 6: Solutions Structure Consistency
    fc.assert(fc.property(
      fc.integer({ min: 0, max: solutions.length - 1 }),
      (solutionIndex) => {
        const solution = solutions[solutionIndex];
        
        // Every solution should have the same required structure
        expect(solution).toHaveProperty('id');
        expect(solution).toHaveProperty('name');
        expect(solution).toHaveProperty('description');
        expect(solution).toHaveProperty('status');
        expect(solution).toHaveProperty('features');
        expect(solution).toHaveProperty('category');
        
        // Type validation
        expect(typeof solution.id).toBe('string');
        expect(typeof solution.name).toBe('string');
        expect(typeof solution.description).toBe('string');
        expect(typeof solution.status).toBe('string');
        expect(Array.isArray(solution.features)).toBe(true);
        expect(typeof solution.category).toBe('string');
        
        // Value validation
        expect(solution.id.length).toBeGreaterThan(0);
        expect(solution.name.length).toBeGreaterThan(0);
        expect(solution.description.length).toBeGreaterThan(0);
        expect(solution.features.length).toBeGreaterThan(0);
        
        // Enum validation
        expect(['available', 'coming-soon', 'beta']).toContain(solution.status);
        expect(['product', 'platform', 'service']).toContain(solution.category);
        
        // Optional fields validation
        if (solution.href) {
          expect(typeof solution.href).toBe('string');
          expect(solution.href.length).toBeGreaterThan(0);
        }
        
        if (solution.launchDate) {
          expect(solution.launchDate).toBeInstanceOf(Date);
        }
        
        if (solution.pricing) {
          expect(['free', 'subscription', 'one-time', 'custom']).toContain(solution.pricing.model);
          
          if (solution.pricing.price) {
            expect(typeof solution.pricing.price).toBe('number');
            expect(solution.pricing.price).toBeGreaterThan(0);
          }
          
          if (solution.pricing.currency) {
            expect(typeof solution.pricing.currency).toBe('string');
            expect(solution.pricing.currency.length).toBeGreaterThan(0);
          }
          
          if (solution.pricing.period) {
            expect(['monthly', 'yearly', 'one-time']).toContain(solution.pricing.period);
          }
        }
      }
    ), { numRuns: 100 });
  });

  it('should ensure solutions configuration is complete and valid', () => {
    // Feature: navigation-restructure, Property 5 & 6: Solutions Configuration Validation
    fc.assert(fc.property(
      fc.boolean(), // Random boolean to vary test conditions
      (randomFlag) => {
        const config = solutionsConfig;
        
        // Configuration should have all required fields
        expect(config).toHaveProperty('solutions');
        expect(config).toHaveProperty('heroMessage');
        expect(config).toHaveProperty('subtitle');
        expect(config).toHaveProperty('ctaText');
        
        // Type validation
        expect(Array.isArray(config.solutions)).toBe(true);
        expect(typeof config.heroMessage).toBe('string');
        expect(typeof config.subtitle).toBe('string');
        expect(typeof config.ctaText).toBe('string');
        
        // Value validation
        expect(config.solutions.length).toBeGreaterThan(0);
        expect(config.heroMessage.length).toBeGreaterThan(0);
        expect(config.subtitle.length).toBeGreaterThan(0);
        expect(config.ctaText.length).toBeGreaterThan(0);
        
        // Solutions array should match the imported solutions
        expect(config.solutions).toEqual(solutions);
        
        // Configuration should emphasize owned products
        const configText = `${config.heroMessage} ${config.subtitle}`.toLowerCase();
        expect(configText).toContain('solution');
        
        // Should not contain service-oriented language
        expect(configText).not.toContain('hire');
        expect(configText).not.toContain('consulting');
        expect(configText).not.toContain('custom development');
      }
    ), { numRuns: 100 });
  });
});