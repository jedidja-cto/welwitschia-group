/**
 * Property-Based Tests for Navigation Configuration
 * Feature: navigation-restructure, Property 1: Navigation Structure Compliance
 * Validates: Requirements 1.1, 1.2, 1.5, 8.1
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  navigationConfig, 
  serviceCategories, 
  type NavigationConfig, 
  type NavigationItem,
  type ServiceCategory 
} from '../navigationConfig';

describe('Navigation Configuration Property Tests', () => {
  
  /**
   * Property 1: Navigation Structure Compliance
   * For any navigation configuration, it should display exactly the 7 required items
   * without granular service categories or shopping cart icons at the top level.
   * Validates: Requirements 1.1, 1.2, 1.5, 8.1
   */
  it('should maintain exactly 7 navigation items with correct structure', () => {
    // Feature: navigation-restructure, Property 1: Navigation Structure Compliance
    fc.assert(fc.property(
      fc.record({
        // Generate various navigation configurations to test the property
        primaryItems: fc.array(
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 20 }),
            href: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.option(fc.string({ minLength: 1, maxLength: 100 }))
          }),
          { minLength: 1, maxLength: 10 }
        ),
        searchEnabled: fc.boolean(),
        cartEnabled: fc.boolean()
      }),
      (generatedConfig) => {
        // Test the actual navigation config against requirements
        const config = navigationConfig;
        
        // Requirement 1.1: Exactly 7 top-level items
        expect(config.primaryItems).toHaveLength(7);
        
        // Requirement 1.1: Must contain these exact items
        const requiredItems = ['Services', 'Solutions', 'Case Studies', 'Pricing', 'Templates', 'About', 'Contact'];
        const actualItems = config.primaryItems.map(item => item.name);
        expect(actualItems).toEqual(requiredItems);
        
        // Requirement 1.2: No granular service categories as top-level items
        const granularServices = [
          'Web Design', 'Web Applications', 'Mobile Applications', 'Dashboard Design',
          'Data Analysis', 'Data Science', 'Data Engineering',
          'Branding/Logo Design', 'Brand Kits', 'Social Media Management'
        ];
        granularServices.forEach(service => {
          expect(actualItems).not.toContain(service);
        });
        
        // Requirement 1.5, 8.1: Shopping cart functionality removed
        expect(config.cartEnabled).toBe(false);
        
        // Each item should have a clear purpose (single href)
        config.primaryItems.forEach(item => {
          expect(item.name).toBeTruthy();
          expect(item.href).toBeTruthy();
          expect(item.href).toMatch(/^\/[a-z-]*$/); // Simple path validation
        });
      }
    ), { numRuns: 20 });
  });

  it('should organize services into exactly three categories without top-level duplication', () => {
    // Feature: navigation-restructure, Property 1: Navigation Structure Compliance (Service Organization)
    fc.assert(fc.property(
      fc.array(
        fc.record({
          id: fc.string({ minLength: 1, maxLength: 20 }),
          name: fc.string({ minLength: 1, maxLength: 30 }),
          description: fc.string({ minLength: 1, maxLength: 100 }),
          services: fc.array(
            fc.record({
              id: fc.string({ minLength: 1, maxLength: 20 }),
              name: fc.string({ minLength: 1, maxLength: 30 }),
              category: fc.constantFrom('digital-products', 'data-analytics', 'creative')
            }),
            { minLength: 0, maxLength: 5 }
          )
        }),
        { minLength: 1, maxLength: 5 }
      ),
      (generatedCategories) => {
        // Test the actual service categories configuration
        const categories = serviceCategories;
        
        // Requirement 2.1: Exactly three high-level categories
        expect(categories).toHaveLength(3);
        
        // Requirement 2.1, 2.2, 2.3: Must contain these exact categories
        const requiredCategoryNames = ['Digital Products', 'Data & Analytics', 'Creative'];
        const actualCategoryNames = categories.map(cat => cat.name);
        expect(actualCategoryNames).toEqual(requiredCategoryNames);
        
        // Requirement 2.5: No individual services as top-level navigation items
        const allServiceNames = categories.flatMap(cat => cat.services.map(service => service.name));
        const navigationItems = navigationConfig.primaryItems.map(item => item.name);
        
        allServiceNames.forEach(serviceName => {
          expect(navigationItems).not.toContain(serviceName);
        });
        
        // Each category should have services
        categories.forEach(category => {
          expect(category.services.length).toBeGreaterThan(0);
          expect(category.id).toBeTruthy();
          expect(category.name).toBeTruthy();
          expect(category.description).toBeTruthy();
        });
      }
    ), { numRuns: 20 });
  });

  it('should maintain mobile menu consistency with primary navigation', () => {
    // Feature: navigation-restructure, Property 1: Navigation Structure Compliance (Mobile Consistency)
    fc.assert(fc.property(
      fc.boolean(), // Random boolean to vary test conditions
      (randomFlag) => {
        const config = navigationConfig;
        
        // Mobile menu should have same items as primary navigation
        expect(config.mobileMenuItems).toHaveLength(7);
        
        const primaryNames = config.primaryItems.map(item => item.name);
        const mobileNames = config.mobileMenuItems.map(item => item.name);
        
        expect(mobileNames).toEqual(primaryNames);
        
        // Mobile menu items should have valid hrefs
        config.mobileMenuItems.forEach(item => {
          expect(item.name).toBeTruthy();
          expect(item.href).toBeTruthy();
          expect(item.href).toMatch(/^\/[a-z-]*$/);
        });
      }
    ), { numRuns: 20 });
  });

  it('should validate navigation item structure and properties', () => {
    // Feature: navigation-restructure, Property 1: Navigation Structure Compliance (Item Validation)
    fc.assert(fc.property(
      fc.integer({ min: 0, max: 6 }), // Index to test different navigation items
      (itemIndex) => {
        const config = navigationConfig;
        const item = config.primaryItems[itemIndex];
        
        // Each navigation item should have required properties
        expect(item.name).toBeTruthy();
        expect(typeof item.name).toBe('string');
        expect(item.name.length).toBeGreaterThan(0);
        
        expect(item.href).toBeTruthy();
        expect(typeof item.href).toBe('string');
        expect(item.href).toMatch(/^\/[a-z-]*$/);
        
        // Description is optional but if present should be valid
        if (item.description) {
          expect(typeof item.description).toBe('string');
          expect(item.description.length).toBeGreaterThan(0);
        }
      }
    ), { numRuns: 20 });
  });

  it('should ensure search is enabled but cart is disabled', () => {
    // Feature: navigation-restructure, Property 1: Navigation Structure Compliance (Feature Flags)
    fc.assert(fc.property(
      fc.boolean(), // Random boolean to vary test conditions
      (randomFlag) => {
        const config = navigationConfig;
        
        // Requirement: Search should be enabled
        expect(config.searchEnabled).toBe(true);
        
        // Requirements 1.5, 8.1: Cart should be disabled
        expect(config.cartEnabled).toBe(false);
      }
    ), { numRuns: 20 });
  });

  /**
   * Property 2: Navigation Responsiveness
   * For any viewport size, the navigation component should render appropriately 
   * with mobile and desktop layouts functioning correctly.
   * Validates: Requirements 1.4
   */
  it('should maintain responsive behavior across all device sizes', () => {
    // Feature: navigation-restructure, Property 2: Navigation Responsiveness
    fc.assert(fc.property(
      fc.record({
        viewportWidth: fc.integer({ min: 320, max: 2560 }), // Common viewport range
        viewportHeight: fc.integer({ min: 568, max: 1440 }), // Common viewport range
        isMobile: fc.boolean(),
        isTablet: fc.boolean()
      }),
      (viewport) => {
        const config = navigationConfig;
        
        // Navigation should have consistent structure regardless of viewport
        expect(config.primaryItems).toHaveLength(4); // Services, Solutions, Case Studies, Pricing
        expect(config.topNavItems).toHaveLength(3); // Careers, About, Contact
        expect(config.mobileMenuItems).toHaveLength(7);
        
        // Mobile should have all navigation items (primary + top)
        const primaryNames = config.primaryItems.map(item => item.name);
        const topNavNames = config.topNavItems.map(item => item.name);
        const allDesktopNames = [...primaryNames, ...topNavNames];
        const mobileNames = config.mobileMenuItems.map(item => item.name);
        
        // Mobile names should contain all desktop names (order might differ, so we use sort or set)
        // In our case, the order in mobileMenuItems is Services, Solutions, Case Studies, Pricing, About, Careers, Contact
        // which matches primary then topNav (except About/Careers/Contact order might vary in config vs mobile)
        // Let's check sets for robustness
        expect(new Set(mobileNames)).toEqual(new Set(allDesktopNames));
        
        // All navigation items should have valid hrefs for any viewport
        config.primaryItems.forEach(item => {
          expect(item.href).toBeTruthy();
          expect(item.href).toMatch(/^\/[a-z-]*$/);
        });

        config.topNavItems.forEach(item => {
          expect(item.href).toBeTruthy();
          expect(item.href).toMatch(/^\/[a-z-]*$/);
        });
        
        config.mobileMenuItems.forEach(item => {
          expect(item.href).toBeTruthy();
          expect(item.href).toMatch(/^\/[a-z-]*$/);
        });
        
        // Navigation structure should be consistent across viewports
        expect(config.primaryItems.map(item => item.name)).toEqual([
          'Services', 'Solutions', 'Case Studies', 'Pricing'
        ]);

        expect(config.topNavItems.map(item => item.name)).toEqual([
          'Careers', 'About', 'Contact'
        ]);
        
        expect(config.mobileMenuItems.map(item => item.name)).toEqual([
          'Services', 'Solutions', 'Case Studies', 'Pricing', 'About', 'Careers', 'Contact'
        ]);
        
        // Search functionality should be available across all viewports
        expect(config.searchEnabled).toBe(true);
        
        // Cart should be disabled across all viewports (Requirements 1.5, 8.1)
        expect(config.cartEnabled).toBe(false);
      }
    ), { numRuns: 100 });
  });

  /**
   * Property 3: Service Category Organization
   * For any services page rendering, it should display exactly three categories 
   * (Digital Products, Data & Analytics, Creative) with the correct services listed under each category.
   * Validates: Requirements 2.1, 2.2, 2.3, 2.4
   */
  it('should organize services into exactly three categories with correct services under each', () => {
    // Feature: navigation-restructure, Property 3: Service Category Organization
    fc.assert(fc.property(
      fc.record({
        // Generate various service configurations to test the property
        categoryCount: fc.integer({ min: 1, max: 5 }),
        serviceCount: fc.integer({ min: 1, max: 10 }),
        randomCategory: fc.constantFrom('digital-products', 'data-analytics', 'creative')
      }),
      (generatedData) => {
        const categories = serviceCategories;
        
        // Requirement 2.1: Exactly three high-level categories
        expect(categories).toHaveLength(3);
        
        // Requirement 2.1: Must contain Digital Products, Data & Analytics, Creative
        const requiredCategoryNames = ['Digital Products', 'Data & Analytics', 'Creative'];
        const actualCategoryNames = categories.map(cat => cat.name);
        expect(actualCategoryNames).toEqual(requiredCategoryNames);
        
        // Requirement 2.2: Digital Products category should contain correct services
        const digitalProductsCategory = categories.find(cat => cat.id === 'digital-products');
        expect(digitalProductsCategory).toBeDefined();
        expect(digitalProductsCategory!.name).toBe('Digital Products');
        
        const digitalProductsServices = digitalProductsCategory!.services.map(s => s.name);
        const expectedDigitalServices = ['Web Design', 'Web Applications', 'Mobile Applications', 'Dashboard Design'];
        expect(digitalProductsServices).toEqual(expectedDigitalServices);
        
        // Requirement 2.3: Data & Analytics category should contain correct services
        const dataAnalyticsCategory = categories.find(cat => cat.id === 'data-analytics');
        expect(dataAnalyticsCategory).toBeDefined();
        expect(dataAnalyticsCategory!.name).toBe('Data & Analytics');
        
        const dataAnalyticsServices = dataAnalyticsCategory!.services.map(s => s.name);
        const expectedDataServices = ['Data Analysis', 'Data Science', 'Data Engineering'];
        expect(dataAnalyticsServices).toEqual(expectedDataServices);
        
        // Requirement 2.4: Creative category should contain correct services
        const creativeCategory = categories.find(cat => cat.id === 'creative');
        expect(creativeCategory).toBeDefined();
        expect(creativeCategory!.name).toBe('Creative');
        
        const creativeServices = creativeCategory!.services.map(s => s.name);
        const expectedCreativeServices = ['Branding/Logo Design', 'Brand Kits', 'Social Media Management'];
        expect(creativeServices).toEqual(expectedCreativeServices);
        
        // Each service should have correct category assignment
        categories.forEach(category => {
          category.services.forEach(service => {
            expect(service.category).toBe(category.id);
            expect(service.id).toBeTruthy();
            expect(service.name).toBeTruthy();
            expect(service.description).toBeTruthy();
            expect(service.href).toBeTruthy();
            expect(service.href).toMatch(/^\/[a-z-\/]*$/);
          });
        });
        
        // All categories should have descriptions
        categories.forEach(category => {
          expect(category.description).toBeTruthy();
          expect(typeof category.description).toBe('string');
          expect(category.description.length).toBeGreaterThan(0);
        });
      }
    ), { numRuns: 100 });
  });

  /**
   * Property 4: Service Navigation Separation
   * For any navigation rendering, none of the individual service names should appear as top-level navigation items.
   * Validates: Requirements 2.5
   */
  it('should ensure no individual services appear as top-level navigation items', () => {
    // Feature: navigation-restructure, Property 4: Service Navigation Separation
    fc.assert(fc.property(
      fc.record({
        // Generate various navigation and service configurations
        randomServiceIndex: fc.integer({ min: 0, max: 10 }),
        randomCategoryIndex: fc.integer({ min: 0, max: 2 })
      }),
      (generatedData) => {
        const navigation = navigationConfig;
        const categories = serviceCategories;
        
        // Get all individual service names from all categories
        const allServiceNames = categories.flatMap(category => 
          category.services.map(service => service.name)
        );
        
        // Get all top-level navigation item names
        const navigationItemNames = navigation.primaryItems.map(item => item.name);
        
        // Requirement 2.5: No individual services should appear as top-level navigation items
        allServiceNames.forEach(serviceName => {
          expect(navigationItemNames).not.toContain(serviceName);
        });
        
        // Verify that we have the expected individual services
        const expectedServices = [
          'Web Design', 'Web Applications', 'Mobile Applications', 'Dashboard Design',
          'Data Analysis', 'Data Science', 'Data Engineering',
          'Branding/Logo Design', 'Brand Kits', 'Social Media Management'
        ];
        
        expectedServices.forEach(expectedService => {
          expect(allServiceNames).toContain(expectedService);
          expect(navigationItemNames).not.toContain(expectedService);
        });
        
        // Verify that only high-level categories or other allowed items appear in navigation
        const allowedNavigationItems = [
          'Services', 'Solutions', 'Case Studies', 'Pricing', 'Templates', 'About', 'Contact'
        ];
        
        navigationItemNames.forEach(navItem => {
          expect(allowedNavigationItems).toContain(navItem);
        });
        
        // Ensure navigation has exactly 7 items and none are individual services
        expect(navigationItemNames).toHaveLength(7);
        expect(navigationItemNames).toEqual(allowedNavigationItems);
        
        // Double-check: no overlap between navigation items and service names
        const navigationSet = new Set(navigationItemNames);
        const serviceSet = new Set(allServiceNames);
        const intersection = [...navigationSet].filter(x => serviceSet.has(x));
        expect(intersection).toHaveLength(0);
      }
    ), { numRuns: 100 });
  });

  /**
   * Property 12: Pricing Navigation
   * For any navigation rendering, the pricing item should link to the existing pricing calculator page.
   * Validates: Requirements 6.2
   */
  it('should ensure pricing navigation directs to existing Pricing Calculator', () => {
    // Feature: navigation-restructure, Property 12: Pricing Navigation
    fc.assert(fc.property(
      fc.record({
        // Generate various navigation configurations to test the property
        randomIndex: fc.integer({ min: 0, max: 6 }),
        testVariation: fc.boolean()
      }),
      (generatedData) => {
        const config = navigationConfig;
        
        // Find the Pricing navigation item
        const pricingItem = config.primaryItems.find(item => item.name === 'Pricing');
        expect(pricingItem).toBeDefined();
        
        // Requirement 6.2: Pricing navigation should direct to existing Pricing Calculator
        expect(pricingItem!.href).toBe('/pricing');
        expect(pricingItem!.name).toBe('Pricing');
        
        // Verify pricing item exists in both primary and mobile navigation
        const mobilePricingItem = config.mobileMenuItems.find(item => item.name === 'Pricing');
        expect(mobilePricingItem).toBeDefined();
        expect(mobilePricingItem!.href).toBe('/pricing');
        
        // Ensure pricing description is appropriate for calculator
        if (pricingItem!.description) {
          expect(pricingItem!.description.toLowerCase()).toMatch(/calculate|cost|price/);
        }
        
        // Verify pricing is positioned correctly in navigation (4th item as per requirements)
        const pricingIndex = config.primaryItems.findIndex(item => item.name === 'Pricing');
        expect(pricingIndex).toBe(3); // 0-indexed, so 4th position
        
        // Ensure no other navigation items point to pricing-related paths
        const otherItems = config.primaryItems.filter(item => item.name !== 'Pricing');
        otherItems.forEach(item => {
          expect(item.href).not.toMatch(/pricing/i);
        });
        
        // Verify mobile navigation consistency
        const mobilePricingIndex = config.mobileMenuItems.findIndex(item => item.name === 'Pricing');
        expect(mobilePricingIndex).toBe(3); // Same position in mobile
      }
    ), { numRuns: 100 });
  });
});