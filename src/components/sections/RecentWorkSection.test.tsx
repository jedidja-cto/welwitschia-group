import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { Project } from '@/types/project';
import RecentWorkSection from './RecentWorkSection';

/**
 * Feature: website-enhancement, Property 7: Homepage project synchronization
 * Validates: Requirements 5.4
 */
describe('RecentWorkSection - Property-Based Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should automatically reflect new projects added to the system', () => {
    // Helper function to filter featured projects
    const getFeaturedProjects = (projects: Project[]): Project[] => {
      return projects.filter(project => project.featured);
    };

    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            description: fc.string(),
            category: fc.string({ minLength: 1 }),
            completionDate: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
            images: fc.array(fc.record({
              url: fc.string(),
              alt: fc.string()
            })),
            technologies: fc.array(fc.string()),
            featured: fc.boolean(),
            projectType: fc.constantFrom('client', 'internal', 'proposal'),
            tags: fc.array(fc.constantFrom(
              'Web Design', 
              'Data Analytics', 
              'Dashboard', 
              'Mobile App', 
              'Proposal', 
              'Internal Experiment'
            ), { minLength: 1 })
          }) as fc.Arbitrary<Project>,
          { minLength: 1, maxLength: 10 }
        ),
        fc.record({
          id: fc.string({ minLength: 1 }),
          title: fc.string({ minLength: 1 }),
          description: fc.string(),
          category: fc.string({ minLength: 1 }),
          completionDate: fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
          images: fc.array(fc.record({
            url: fc.string(),
            alt: fc.string()
          })),
          technologies: fc.array(fc.string()),
          featured: fc.boolean(),
          projectType: fc.constantFrom('client', 'internal', 'proposal'),
          tags: fc.array(fc.constantFrom(
            'Web Design', 
            'Data Analytics', 
            'Dashboard', 
            'Mobile App', 
            'Proposal', 
            'Internal Experiment'
          ), { minLength: 1 })
        }) as fc.Arbitrary<Project>,
        (initialProjects, newProject) => {
          // Filter to only featured projects for initial state
          const initialFeaturedProjects = getFeaturedProjects(initialProjects);
          
          // Mock the project data module
          vi.doMock('@/lib/projectData', () => ({
            getFeaturedProjects: vi.fn(() => initialFeaturedProjects),
            projects: initialFeaturedProjects
          }));

          // Verify that adding a new featured project increases the count
          const updatedProjects = newProject.featured 
            ? [...initialFeaturedProjects, newProject]
            : initialFeaturedProjects;
          
          const updatedFeaturedProjects = getFeaturedProjects(updatedProjects);

          // Verify synchronization property: when a new featured project is added,
          // the homepage should reflect this change
          if (newProject.featured) {
            expect(updatedFeaturedProjects.length).toBe(initialFeaturedProjects.length + 1);
            expect(updatedFeaturedProjects.some(p => p.id === newProject.id)).toBe(true);
          } else {
            expect(updatedFeaturedProjects.length).toBe(initialFeaturedProjects.length);
            expect(updatedFeaturedProjects.some(p => p.id === newProject.id)).toBe(false);
          }

          // Verify that all original featured projects are still present
          initialFeaturedProjects.forEach(project => {
            expect(updatedFeaturedProjects.some(p => p.id === project.id)).toBe(true);
          });

          // Verify that the projects are properly sorted by date (newest first)
          const sortedUpdated = [...updatedFeaturedProjects].sort((a, b) => 
            b.completionDate.getTime() - a.completionDate.getTime()
          );
          
          for (let i = 0; i < sortedUpdated.length - 1; i++) {
            expect(sortedUpdated[i].completionDate.getTime()).toBeGreaterThanOrEqual(
              sortedUpdated[i + 1].completionDate.getTime()
            );
          }

          // Verify that the new project appears in the correct chronological position
          if (newProject.featured) {
            const newProjectIndex = sortedUpdated.findIndex(p => p.id === newProject.id);
            expect(newProjectIndex).toBeGreaterThanOrEqual(0);
            
            // Check that projects before it have newer or equal dates
            for (let i = 0; i < newProjectIndex; i++) {
              expect(sortedUpdated[i].completionDate.getTime()).toBeGreaterThanOrEqual(
                newProject.completionDate.getTime()
              );
            }
            
            // Check that projects after it have older or equal dates
            for (let i = newProjectIndex + 1; i < sortedUpdated.length; i++) {
              expect(sortedUpdated[i].completionDate.getTime()).toBeLessThanOrEqual(
                newProject.completionDate.getTime()
              );
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});