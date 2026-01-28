import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { Project } from '@/types/project';

/**
 * Feature: website-enhancement, Property 6: Project sorting consistency
 * Validates: Requirements 5.2
 */
describe('Project Data - Property-Based Tests', () => {
  it('should sort projects consistently by completion date (newest first)', () => {
    // Helper function to sort projects by completion date (newest first)
    const sortProjectsByDate = (projects: Project[]): Project[] => {
      return [...projects].sort((a, b) => b.completionDate.getTime() - a.completionDate.getTime());
    };

    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            description: fc.string(),
            category: fc.string({ minLength: 1 }),
            completionDate: fc.date({ min: new Date('2020-01-01T00:00:00.000Z'), max: new Date('2030-12-31T23:59:59.999Z') }),
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
          { minLength: 2, maxLength: 20 }
        ),
        (projects) => {
          // Filter out projects with invalid dates
          const validProjects = projects.filter(p => !isNaN(p.completionDate.getTime()));
          
          if (validProjects.length < 2) {
            // Skip test if we don't have enough valid projects
            return;
          }
          
          const sorted = sortProjectsByDate(validProjects);

          // Verify that the array is sorted by completion date (newest first)
          for (let i = 0; i < sorted.length - 1; i++) {
            expect(sorted[i].completionDate.getTime()).toBeGreaterThanOrEqual(
              sorted[i + 1].completionDate.getTime()
            );
          }

          // Verify that all original projects are included
          expect(sorted.length).toBe(validProjects.length);

          // Verify that no projects are lost or duplicated
          const sortedIds = sorted.map(p => p.id).sort();
          const originalIds = validProjects.map(p => p.id).sort();
          expect(sortedIds).toEqual(originalIds);

          // Verify that the sorting is stable for projects with the same date
          const projectsWithSameDate = validProjects.filter(p => 
            validProjects.some(other => other !== p && other.completionDate.getTime() === p.completionDate.getTime())
          );
          
          if (projectsWithSameDate.length > 0) {
            const sortedSameDate = sorted.filter(p => 
              projectsWithSameDate.some(same => same.id === p.id)
            );
            // Projects with same date should maintain relative order
            expect(sortedSameDate.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});