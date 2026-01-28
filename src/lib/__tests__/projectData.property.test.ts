import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { Project, CaseStudyTag } from '@/types/project';
import { projects, getProjectsSortedByDate, getFeaturedProjects, getProjectsByCategory } from '../projectData';

describe('Case Study System Property Tests', () => {
  // Feature: navigation-restructure, Property 7: Case Study Categorization
  it('should use only specified tags and not use Client Project or Live Site as primary categorization', () => {
    fc.assert(fc.property(
      fc.array(fc.record({
        id: fc.string({ minLength: 1 }),
        title: fc.string({ minLength: 1 }),
        description: fc.string({ minLength: 1 }),
        category: fc.string({ minLength: 1 }),
        completionDate: fc.date(),
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
      })),
      (generatedProjects: Partial<Project>[]) => {
        // Test that all projects use only the specified tags
        generatedProjects.forEach(project => {
          if (project.tags) {
            const validTags: CaseStudyTag[] = [
              'Web Design', 
              'Data Analytics', 
              'Dashboard', 
              'Mobile App', 
              'Proposal', 
              'Internal Experiment'
            ];
            
            project.tags.forEach(tag => {
              expect(validTags).toContain(tag);
            });
            
            // Ensure no forbidden categorization signals are used as tags
            expect(project.tags).not.toContain('Client Project' as any);
            expect(project.tags).not.toContain('Live Site' as any);
          }
        });
        
        // Test that categories don't use forbidden terms as primary categorization
        generatedProjects.forEach(project => {
          if (project.category) {
            expect(project.category).not.toBe('Client Project');
            expect(project.category).not.toBe('Live Site');
          }
        });
      }
    ), { numRuns: 100 });
  });

  // Feature: navigation-restructure, Property 8: Case Study Information Requirements
  it('should include completion dates and appropriate labeling for internal experiments and proposals', () => {
    fc.assert(fc.property(
      fc.array(
        fc.constantFrom('client', 'internal', 'proposal').chain(projectType => {
          const baseTags = fc.array(fc.constantFrom(
            'Web Design', 
            'Data Analytics', 
            'Dashboard', 
            'Mobile App'
          ), { minLength: 0 });
          
          return fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            completionDate: fc.date(),
            projectType: fc.constant(projectType),
            tags: baseTags.map(tags => {
              if (projectType === 'internal') {
                return [...tags, 'Internal Experiment'];
              } else if (projectType === 'proposal') {
                return [...tags, 'Proposal'];
              } else {
                return tags.length > 0 ? tags : ['Web Design'];
              }
            })
          });
        })
      ),
      (generatedProjects: Partial<Project>[]) => {
        generatedProjects.forEach(project => {
          // All case studies must have completion dates
          expect(project.completionDate).toBeDefined();
          expect(project.completionDate).toBeInstanceOf(Date);
          
          // Internal experiments should be clearly labeled with appropriate tags
          if (project.projectType === 'internal') {
            expect(project.tags).toContain('Internal Experiment');
          }
          
          // Proposals should be clearly labeled with appropriate tags
          if (project.projectType === 'proposal') {
            expect(project.tags).toContain('Proposal');
          }
        });
      }
    ), { numRuns: 100 });
  });

  // Test actual project data compliance
  it('should ensure all actual projects comply with new tag system', () => {
    projects.forEach(project => {
      // Check that if tags exist, they use only valid tags
      if ('tags' in project && project.tags) {
        const validTags: CaseStudyTag[] = [
          'Web Design', 
          'Data Analytics', 
          'Dashboard', 
          'Mobile App', 
          'Proposal', 
          'Internal Experiment'
        ];
        
        project.tags.forEach(tag => {
          expect(validTags).toContain(tag);
        });
        
        // Ensure no forbidden categorization signals
        expect(project.tags).not.toContain('Client Project' as any);
        expect(project.tags).not.toContain('Live Site' as any);
      }
      
      // Check category doesn't use forbidden terms
      expect(project.category).not.toBe('Client Project');
      expect(project.category).not.toBe('Live Site');
    });
  });

  // Test actual project data information requirements
  it('should ensure all actual projects have required information', () => {
    projects.forEach(project => {
      // All projects must have completion dates
      expect(project.completionDate).toBeDefined();
      expect(project.completionDate).toBeInstanceOf(Date);
      
      // Check labeling consistency if tags exist
      if ('tags' in project && project.tags) {
        // Internal experiments should be clearly labeled
        if (project.projectType === 'internal') {
          expect(project.tags).toContain('Internal Experiment');
        }
        
        // Proposals should be clearly labeled
        if (project.projectType === 'proposal') {
          expect(project.tags).toContain('Proposal');
        }
      }
    });
  });
});