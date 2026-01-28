export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  completionDate: Date;
  images: ProjectImage[];
  technologies: string[];
  clientName?: string;
  featured: boolean;
  liveUrl?: string;
  projectType: 'client' | 'internal' | 'proposal' | 'portfolio';
  tags: string[];
  slug: string;
}

export type CaseStudyTag = 
  | 'Web Design' 
  | 'Data Analytics' 
  | 'Dashboard' 
  | 'Mobile App' 
  | 'Proposal' 
  | 'Internal Experiment';

export interface ProjectImage {
  url: string;
  alt: string;
  placeholder?: ImagePlaceholder;
}

export interface ImagePlaceholder {
  description: string;
  suggestedType: string;
  aspectRatio: string;
  size: 'small' | 'medium' | 'large';
}