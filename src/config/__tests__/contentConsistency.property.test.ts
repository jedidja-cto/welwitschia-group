/**
 * Property-Based Tests for Content Consistency
 * Feature: navigation-restructure, Property 17: Content Consistency
 * Validates: Requirements 10.1, 10.2, 10.5
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  navigationConfig, 
  serviceCategories, 
  homepageConfig,
  type NavigationConfig, 
  type ServiceCategory 
} from '../navigationConfig';

describe('Content Consistency Property Tests', () => {
  
  /**
   * Property 17: Content Consistency
   * For any page rendering, all internal links should point to correct restructured sections 
   * and service references should match the new categorization with consistent terminology.
   * Validates: Requirements 10.1, 10.2, 10.5
   */
  it('should maintain consistent internal links pointing to correct restructured sections', () => {
    // Feature: navigation-restructure, Property 17: Content Consistency
    fc.assert(fc.property(
      fc.record({
        // Generate various link configurations to test consistency
        linkType: fc.constantFrom('navigation', 'service', 'category', 'homepage'),
        sectionType: fc.constantFrom('services', 'solutions', 'case-studies', 'pricing', 'templates', 'about', 'contact'),
        randomIndex: fc.integer({ min: 0, max: 10 })
      }),
      (generatedData) => {
        // Test navigation links consistency
        const navigation = navigationConfig;
        
        // Requirement 10.1: All internal links should point to correct restructured sections
        const expectedNavigationPaths = [
          '/services',
          '/solutions', 
          '/case-studies',
          '/pricing',
          '/templates',
          '/about',
          '/contact'
        ];
        
        navigation.primaryItems.forEach((item, index) => {
          expect(item.href).toBe(expectedNavigationPaths[index]);
          // Links should be properly formatted
          expect(item.href).toMatch(/^\/[a-z-]*$/);
          // No old structure links should remain
          expect(item.href).not.toMatch(/divisions|advisory|capital/);
        });
        
        // Mobile navigation should match primary navigation
        navigation.mobileMenuItems.forEach((item, index) => {
          expect(item.href).toBe(expectedNavigationPaths[index]);
        });
        
        // Test service category links consistency
        const categories = serviceCategories;
        
        // Requirement 10.2: Service references should match new categorization
        categories.forEach(category => {
          category.services.forEach(service => {
            // Service links should point to valid restructured paths
            expect(service.href).toBeTruthy();
            expect(service.href).toMatch(/^\/[a-z-\/]*$/);
            
            // Service category should match one of the three allowed categories
            expect(['digital-products', 'data-analytics', 'creative']).toContain(service.category);
            
            // No old service structure links should remain
            expect(service.href).not.toMatch(/divisions|advisory|capital|bundles/);
          });
        });
        
        // Test homepage configuration consistency
        const homepage = homepageConfig;
        
        // Featured services should link to correct service sections
        homepage.featuredServices.categories.forEach(category => {
          expect(category.href).toMatch(/^\/services#[a-z-]*$/);
          // Should match one of the three service categories
          const validServiceHrefs = [
            '/services#digital-products',
            '/services#data-analytics', 
            '/services#creative'
          ];
          expect(validServiceHrefs).toContain(category.href);
        });
        
        // Requirement 10.5: Consistent terminology across all configurations
        // Service category names should be consistent
        const categoryNames = categories.map(cat => cat.name);
        const expectedCategoryNames = ['Digital Products', 'Data & Analytics', 'Creative'];
        expect(categoryNames).toEqual(expectedCategoryNames);
        
        // Homepage featured services should match service category names
        const homepageCategoryNames = homepage.featuredServices.categories.map(cat => cat.name);
        expect(homepageCategoryNames).toEqual(expectedCategoryNames);
        
        // Navigation item names should be consistent
        const navigationNames = navigation.primaryItems.map(item => item.name);
        const expectedNavigationNames = ['Services', 'Solutions', 'Case Studies', 'Pricing', 'Templates', 'About', 'Contact'];
        expect(navigationNames).toEqual(expectedNavigationNames);
      }
    ), { numRuns: 100 });
  });

  it('should ensure service terminology consistency across all configurations', () => {
    // Feature: navigation-restructure, Property 17: Content Consistency (Service Terminology)
    fc.assert(fc.property(
      fc.record({
        categoryIndex: fc.integer({ min: 0, max: 2 }),
        serviceIndex: fc.integer({ min: 0, max: 5 }),
        testVariation: fc.boolean()
      }),
      (generatedData) => {
        const categories = serviceCategories;
        const homepage = homepageConfig;
        
        // Requirement 10.2, 10.5: Service references should match new categorization with consistent terminology
        
        // Digital Products category consistency
        const digitalProductsCategory = categories.find(cat => cat.id === 'digital-products');
        expect(digitalProductsCategory).toBeDefined();
        expect(digitalProductsCategory!.name).toBe('Digital Products');
        
        const expectedDigitalServices = ['Web Design', 'Web Applications', 'Mobile Applications', 'Dashboard Design'];
        const actualDigitalServices = digitalProductsCategory!.services.map(s => s.name);
        expect(actualDigitalServices).toEqual(expectedDigitalServices);
        
        // Data & Analytics category consistency
        const dataAnalyticsCategory = categories.find(cat => cat.id === 'data-analytics');
        expect(dataAnalyticsCategory).toBeDefined();
        expect(dataAnalyticsCategory!.name).toBe('Data & Analytics');
        
        const expectedDataServices = ['Data Analysis', 'Data Science', 'Data Engineering'];
        const actualDataServices = dataAnalyticsCategory!.services.map(s => s.name);
        expect(actualDataServices).toEqual(expectedDataServices);
        
        // Creative category consistency
        const creativeCategory = categories.find(cat => cat.id === 'creative');
        expect(creativeCategory).toBeDefined();
        expect(creativeCategory!.name).toBe('Creative');
        
        const expectedCreativeServices = ['Branding/Logo Design', 'Brand Kits', 'Social Media Management'];
        const actualCreativeServices = creativeCategory!.services.map(s => s.name);
        expect(actualCreativeServices).toEqual(expectedCreativeServices);
        
        // Homepage featured services should use same terminology
        const homepageCategoryNames = homepage.featuredServices.categories.map(cat => cat.name);
        const serviceCategoryNames = categories.map(cat => cat.name);
        expect(homepageCategoryNames).toEqual(serviceCategoryNames);
        
        // All service descriptions should be consistent and professional
        categories.forEach(category => {
          expect(category.description).toBeTruthy();
          expect(typeof category.description).toBe('string');
          expect(category.description.length).toBeGreaterThan(10);
          
          category.services.forEach(service => {
            expect(service.description).toBeTruthy();
            expect(typeof service.description).toBe('string');
            expect(service.description.length).toBeGreaterThan(10);
            
            // Service descriptions should not contain old terminology
            expect(service.description.toLowerCase()).not.toMatch(/bundle|package|advisory|capital/);
          });
        });
        
        // Category IDs should match expected format
        const expectedCategoryIds = ['digital-products', 'data-analytics', 'creative'];
        const actualCategoryIds = categories.map(cat => cat.id);
        expect(actualCategoryIds).toEqual(expectedCategoryIds);
        
        // Service category assignments should be consistent
        categories.forEach(category => {
          category.services.forEach(service => {
            expect(service.category).toBe(category.id);
          });
        });
      }
    ), { numRuns: 100 });
  });

  it('should validate that no old structure references remain in configurations', () => {
    // Feature: navigation-restructure, Property 17: Content Consistency (Legacy Cleanup)
    fc.assert(fc.property(
      fc.record({
        configType: fc.constantFrom('navigation', 'services', 'homepage'),
        checkType: fc.constantFrom('links', 'names', 'descriptions'),
        randomSeed: fc.integer({ min: 1, max: 1000 })
      }),
      (generatedData) => {
        const navigation = navigationConfig;
        const categories = serviceCategories;
        const homepage = homepageConfig;
        
        // Requirement 10.1, 10.2: No old structure references should remain
        
        // Check navigation for old structure references
        navigation.primaryItems.forEach(item => {
          // No old division/advisory/capital references
          expect(item.name.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
          expect(item.href.toLowerCase()).not.toMatch(/division|advisory|capital|bundle/);
          
          if (item.description) {
            expect(item.description.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
          }
        });
        
        navigation.mobileMenuItems.forEach(item => {
          expect(item.name.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
          expect(item.href.toLowerCase()).not.toMatch(/division|advisory|capital|bundle/);
        });
        
        // Check service categories for old structure references
        categories.forEach(category => {
          expect(category.name.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
          expect(category.description.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
          
          category.services.forEach(service => {
            expect(service.name.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
            expect(service.description.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
            expect(service.href.toLowerCase()).not.toMatch(/division|advisory|capital|bundle/);
          });
        });
        
        // Check homepage configuration for old structure references
        expect(homepage.hero.tagline.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
        
        homepage.featuredServices.categories.forEach(category => {
          expect(category.name.toLowerCase()).not.toMatch(/division|advisory|capital|bundle|group/);
          expect(category.href.toLowerCase()).not.toMatch(/division|advisory|capital|bundle/);
        });
        
        // Verify new structure terminology is present
        expect(homepage.hero.tagline).toContain('digital products');
        expect(homepage.hero.tagline).toContain('data systems');
        expect(homepage.hero.tagline).toContain('African businesses');
        
        // Verify case studies section uses new terminology
        expect(homepage.caseStudies.title).toBe('Selected Case Studies');
        expect(homepage.caseStudies.count).toBe(4);
        
        // Verify featured services uses correct structure
        expect(homepage.featuredServices.title).toBe('Featured Services');
        expect(homepage.featuredServices.categories).toHaveLength(3);
        
        // All links should use new structure paths
        const allLinks = [
          ...navigation.primaryItems.map(item => item.href),
          ...navigation.mobileMenuItems.map(item => item.href),
          ...categories.flatMap(cat => cat.services.map(service => service.href)),
          ...homepage.featuredServices.categories.map(cat => cat.href)
        ];
        
        allLinks.forEach(link => {
          // Should not contain old structure paths
          expect(link.toLowerCase()).not.toMatch(/division|advisory|capital|bundle/);
          // Should be properly formatted (allow forward slashes in paths)
          expect(link).toMatch(/^\/[a-z-\/#]*$/);
        });
      }
    ), { numRuns: 100 });
  });

  it('should ensure consistent link formatting and structure across all configurations', () => {
    // Feature: navigation-restructure, Property 17: Content Consistency (Link Structure)
    fc.assert(fc.property(
      fc.record({
        linkCategory: fc.constantFrom('navigation', 'services', 'homepage'),
        validationLevel: fc.constantFrom('basic', 'detailed'),
        testIndex: fc.integer({ min: 0, max: 20 })
      }),
      (generatedData) => {
        const navigation = navigationConfig;
        const categories = serviceCategories;
        const homepage = homepageConfig;
        
        // Requirement 10.1: All internal links should point to correct restructured sections
        
        // Navigation links should follow consistent format
        navigation.primaryItems.forEach(item => {
          expect(item.href).toMatch(/^\/[a-z-]*$/);
          expect(item.href).not.toContain(' ');
          expect(item.href).not.toContain('_');
          expect(item.href.toLowerCase()).toBe(item.href); // Should be lowercase
        });
        
        navigation.mobileMenuItems.forEach(item => {
          expect(item.href).toMatch(/^\/[a-z-]*$/);
          expect(item.href).not.toContain(' ');
          expect(item.href).not.toContain('_');
          expect(item.href.toLowerCase()).toBe(item.href);
        });
        
        // Service links should follow consistent format
        categories.forEach(category => {
          category.services.forEach(service => {
            expect(service.href).toMatch(/^\/[a-z-\/]*$/);
            expect(service.href).not.toContain(' ');
            expect(service.href).not.toContain('_');
            expect(service.href.toLowerCase()).toBe(service.href);
            
            // Service links should start with /services or /pricing
            expect(service.href.startsWith('/services') || service.href.startsWith('/pricing')).toBe(true);
          });
        });
        
        // Homepage featured service links should follow anchor format
        homepage.featuredServices.categories.forEach(category => {
          expect(category.href).toMatch(/^\/services#[a-z-]*$/);
          expect(category.href).not.toContain(' ');
          expect(category.href).not.toContain('_');
          expect(category.href.toLowerCase()).toBe(category.href);
        });
        
        // All names should be properly capitalized and formatted
        navigation.primaryItems.forEach(item => {
          expect(item.name).toBeTruthy();
          expect(item.name.trim()).toBe(item.name); // No leading/trailing spaces
          expect(item.name.length).toBeGreaterThan(0);
        });
        
        categories.forEach(category => {
          expect(category.name).toBeTruthy();
          expect(category.name.trim()).toBe(category.name);
          expect(category.name.length).toBeGreaterThan(0);
          
          category.services.forEach(service => {
            expect(service.name).toBeTruthy();
            expect(service.name.trim()).toBe(service.name);
            expect(service.name.length).toBeGreaterThan(0);
          });
        });
        
        homepage.featuredServices.categories.forEach(category => {
          expect(category.name).toBeTruthy();
          expect(category.name.trim()).toBe(category.name);
          expect(category.name.length).toBeGreaterThan(0);
        });
        
        // Verify no duplicate links exist
        const allNavigationLinks = navigation.primaryItems.map(item => item.href);
        const uniqueNavigationLinks = [...new Set(allNavigationLinks)];
        expect(allNavigationLinks).toHaveLength(uniqueNavigationLinks.length);
        
        const allServiceLinks = categories.flatMap(cat => cat.services.map(service => service.href));
        // Note: Service links may have duplicates (e.g., multiple services pointing to /pricing)
        // but they should all be valid
        allServiceLinks.forEach(link => {
          expect(link).toBeTruthy();
          expect(typeof link).toBe('string');
        });
        
        const allHomepageLinks = homepage.featuredServices.categories.map(cat => cat.href);
        const uniqueHomepageLinks = [...new Set(allHomepageLinks)];
        expect(allHomepageLinks).toHaveLength(uniqueHomepageLinks.length);
      }
    ), { numRuns: 100 });
  });
});