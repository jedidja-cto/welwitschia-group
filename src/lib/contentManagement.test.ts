import { describe, it, expect } from 'vitest';
import { getProjectsSortedByDate, getFeaturedProjects, addProject } from './projectData';
import { getFeaturedPartners, addPartner } from './partnerData';
import { getFeaturedReviews, getVerifiedReviews, addReview } from './reviewData';
import { Project } from '@/types/project';
import { Partner } from '@/types/partner';
import { Review } from '@/types/review';

describe('Content Management - Unit Tests', () => {
  describe('Project Display Functionality', () => {
    it('should return projects sorted by completion date (newest first)', () => {
      const projects = getProjectsSortedByDate();
      
      // Verify sorting order
      for (let i = 0; i < projects.length - 1; i++) {
        expect(projects[i].completionDate.getTime()).toBeGreaterThanOrEqual(
          projects[i + 1].completionDate.getTime()
        );
      }
    });

    it('should return only featured projects', () => {
      const featuredProjects = getFeaturedProjects();
      
      // Verify all returned projects are featured
      featuredProjects.forEach(project => {
        expect(project.featured).toBe(true);
      });
    });

    it('should handle project addition correctly', () => {
      const initialCount = getFeaturedProjects().length;
      
      const newProject: Project = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project for unit testing',
        category: 'Test Category',
        completionDate: new Date('2024-12-15'),
        images: [{
          url: '/test-image.jpg',
          alt: 'Test image'
        }],
        technologies: ['React', 'TypeScript'],
        featured: true,
        projectType: 'client'
      };

      addProject(newProject);
      
      const updatedProjects = getFeaturedProjects();
      expect(updatedProjects.length).toBe(initialCount + 1);
      
      const addedProject = updatedProjects.find(p => p.id === 'test-project');
      expect(addedProject).toBeDefined();
      expect(addedProject?.title).toBe('Test Project');
    });

    it('should include required project properties', () => {
      const projects = getFeaturedProjects();
      
      projects.forEach(project => {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('category');
        expect(project).toHaveProperty('completionDate');
        expect(project).toHaveProperty('images');
        expect(project).toHaveProperty('technologies');
        expect(project).toHaveProperty('featured');
        expect(project).toHaveProperty('projectType');
        
        expect(typeof project.id).toBe('string');
        expect(typeof project.title).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(typeof project.category).toBe('string');
        expect(project.completionDate).toBeInstanceOf(Date);
        expect(Array.isArray(project.images)).toBe(true);
        expect(Array.isArray(project.technologies)).toBe(true);
        expect(typeof project.featured).toBe('boolean');
        expect(['client', 'internal', 'proposal']).toContain(project.projectType);
      });
    });
  });

  describe('Partner Logo Display', () => {
    it('should return only featured partners', () => {
      const featuredPartners = getFeaturedPartners();
      
      // Verify all returned partners are featured
      featuredPartners.forEach(partner => {
        expect(partner.featured).toBe(true);
      });
    });

    it('should handle empty partner list gracefully', () => {
      const partners = getFeaturedPartners();
      
      // Currently no partners are configured, so should return empty array
      expect(Array.isArray(partners)).toBe(true);
      expect(partners.length).toBe(0);
    });

    it('should handle partner addition correctly', () => {
      const initialCount = getFeaturedPartners().length;
      
      const newPartner: Partner = {
        id: 'test-partner',
        name: 'Test Partner',
        logoUrl: '/test-logo.png',
        websiteUrl: 'https://testpartner.com',
        description: 'A test partner for unit testing',
        featured: true
      };

      addPartner(newPartner);
      
      const updatedPartners = getFeaturedPartners();
      expect(updatedPartners.length).toBe(initialCount + 1);
      
      const addedPartner = updatedPartners.find(p => p.id === 'test-partner');
      expect(addedPartner).toBeDefined();
      expect(addedPartner?.name).toBe('Test Partner');
      expect(addedPartner?.logoUrl).toBe('/test-logo.png');
    });

    it('should include required partner properties when partners exist', () => {
      // Add a test partner first
      const testPartner: Partner = {
        id: 'test-partner-props',
        name: 'Test Partner Props',
        logoUrl: '/test-logo-props.png',
        featured: true
      };

      addPartner(testPartner);
      const partners = getFeaturedPartners();
      
      const testPartnerResult = partners.find(p => p.id === 'test-partner-props');
      if (testPartnerResult) {
        expect(testPartnerResult).toHaveProperty('id');
        expect(testPartnerResult).toHaveProperty('name');
        expect(testPartnerResult).toHaveProperty('logoUrl');
        expect(testPartnerResult).toHaveProperty('featured');
        
        expect(typeof testPartnerResult.id).toBe('string');
        expect(typeof testPartnerResult.name).toBe('string');
        expect(typeof testPartnerResult.logoUrl).toBe('string');
        expect(typeof testPartnerResult.featured).toBe('boolean');
      }
    });
  });

  describe('Review System Components', () => {
    it('should return only featured reviews', () => {
      const featuredReviews = getFeaturedReviews();
      
      // Verify all returned reviews are featured
      featuredReviews.forEach(review => {
        expect(review.featured).toBe(true);
      });
    });

    it('should return only verified reviews', () => {
      const verifiedReviews = getVerifiedReviews();
      
      // Verify all returned reviews are verified
      verifiedReviews.forEach(review => {
        expect(review.verified).toBe(true);
      });
    });

    it('should handle review addition correctly', () => {
      const initialCount = getFeaturedReviews().length;
      
      const newReview: Review = {
        id: 'test-review',
        clientName: 'Test Client',
        clientTitle: 'Test Title',
        companyName: 'Test Company',
        quote: 'This is a test review for unit testing purposes.',
        rating: 5,
        date: new Date('2024-12-15'),
        projectType: 'Website Design',
        featured: true,
        verified: true
      };

      addReview(newReview);
      
      const updatedReviews = getFeaturedReviews();
      expect(updatedReviews.length).toBe(initialCount + 1);
      
      const addedReview = updatedReviews.find(r => r.id === 'test-review');
      expect(addedReview).toBeDefined();
      expect(addedReview?.clientName).toBe('Test Client');
      expect(addedReview?.quote).toBe('This is a test review for unit testing purposes.');
    });

    it('should include required review properties', () => {
      const reviews = getFeaturedReviews();
      
      reviews.forEach(review => {
        expect(review).toHaveProperty('id');
        expect(review).toHaveProperty('clientName');
        expect(review).toHaveProperty('companyName');
        expect(review).toHaveProperty('quote');
        expect(review).toHaveProperty('date');
        expect(review).toHaveProperty('featured');
        expect(review).toHaveProperty('verified');
        
        expect(typeof review.id).toBe('string');
        expect(typeof review.clientName).toBe('string');
        expect(typeof review.companyName).toBe('string');
        expect(typeof review.quote).toBe('string');
        expect(review.date).toBeInstanceOf(Date);
        expect(typeof review.featured).toBe('boolean');
        expect(typeof review.verified).toBe('boolean');
      });
    });

    it('should handle reviews with optional properties', () => {
      const reviews = getFeaturedReviews();
      
      reviews.forEach(review => {
        // Optional properties should be either string or undefined
        if (review.clientTitle !== undefined) {
          expect(typeof review.clientTitle).toBe('string');
        }
        
        if (review.rating !== undefined) {
          expect(typeof review.rating).toBe('number');
          expect(review.rating).toBeGreaterThanOrEqual(1);
          expect(review.rating).toBeLessThanOrEqual(5);
        }
        
        if (review.projectType !== undefined) {
          expect(typeof review.projectType).toBe('string');
        }
      });
    });

    it('should maintain review data integrity', () => {
      const reviews = getFeaturedReviews();
      
      reviews.forEach(review => {
        // Quote should not be empty
        expect(review.quote.trim().length).toBeGreaterThan(0);
        
        // Client name should not be empty
        expect(review.clientName.trim().length).toBeGreaterThan(0);
        
        // Company name should not be empty
        expect(review.companyName.trim().length).toBeGreaterThan(0);
        
        // Date should be valid
        expect(review.date.getTime()).not.toBeNaN();
        
        // Featured reviews should be verified
        if (review.featured) {
          expect(review.verified).toBe(true);
        }
      });
    });
  });
});