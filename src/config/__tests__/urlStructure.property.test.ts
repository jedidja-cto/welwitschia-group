/**
 * Property-Based Tests for URL Structure Maintenance
 * Feature: navigation-restructure, Property 18: URL Structure Maintenance
 * Validates: Requirements 10.3, 10.4
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  navigationConfig, 
  serviceCategories, 
  type NavigationConfig, 
  type ServiceCategory 
} from '../navigationConfig';

describe('URL Structure Maintenance Properties', () => {
  
  /**
   * Property 18: URL Structure Maintenance
   * For any changed URL path, it should either redirect properly to the new structure 
   * or return appropriate responses while maintaining SEO-friendly URLs.
   * Validates: Requirements 10.3, 10.4
   */
  it('should maintain SEO-friendly URL structure for all navigation items', () => {
    // Feature: navigation-restructure, Property 18: URL Structure Maintenance
    fc.assert(fc.property(
      fc.boolean(),
      (testFlag) => {
        const config = navigationConfig;
        const seoPattern = /^\/[a-z0-9\-\/]*$/;
        
        // Requirement 10.4: All navigation URLs should be SEO-friendly
        config.primaryItems.forEach(navItem => {
          expect(navItem.href).toMatch(seoPattern);
          expect(navItem.href).toBe(navItem.href.toLowerCase());
          
          if (navItem.href !== '/') {
            expect(navItem.href).not.toMatch(/\/$/);
          }
          
          expect(navItem.href).not.toMatch(/\/\//);
          expect(navItem.href).toMatch(/^\//);
        });
      }
    ), { numRuns: 20 });
  });

  it('should validate that old URL patterns are not present in current navigation', () => {
    // Feature: navigation-restructure, Property 18: URL Structure Maintenance (Old URL Removal)
    const oldPatterns = [
      '/categories/creative',
      '/categories/training', 
      '/categories/website-app',
      '/services/creative/content-creation',
      '/services/data/cybersecurity'
    ];
    
    fc.assert(fc.property(
      fc.boolean(),
      (testVariation) => {
        oldPatterns.forEach(oldUrl => {
          // Requirement 10.3: Old URLs should not appear in primary navigation
          const foundInPrimary = navigationConfig.primaryItems.some(
            item => item.href === oldUrl
          );
          expect(foundInPrimary).toBe(false);
          
          // Requirement 10.3: Old URLs should not appear in service categories
          const foundInServices = serviceCategories.flatMap(cat => cat.services)
            .some(service => service.href === oldUrl);
          expect(foundInServices).toBe(false);
        });
      }
    ), { numRuns: 20 });
  });

  it('should ensure all navigation links point to valid URL structures', () => {
    // Feature: navigation-restructure, Property 18: URL Structure Maintenance (Navigation Validation)
    fc.assert(fc.property(
      fc.boolean(),
      (testFlag) => {
        const config = navigationConfig;
        const expectedRoutes = [
          '/services', '/solutions', '/case-studies', 
          '/pricing', '/templates', '/about', '/contact'
        ];
        
        config.primaryItems.forEach(navItem => {
          expect(expectedRoutes).toContain(navItem.href);
          expect(navItem.href).toMatch(/^\//);
          expect(navItem.href).not.toMatch(/[?#]/);
        });
      }
    ), { numRuns: 20 });
  });
});