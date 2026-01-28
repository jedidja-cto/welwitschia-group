/**
 * Navigation Configuration and Types
 * 
 * This file defines the TypeScript interfaces and configuration for the restructured
 * navigation system with exactly 7 top-level items and no shopping cart functionality.
 */

export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

export interface NavigationConfig {
  topNavItems: NavigationItem[];
  primaryItems: NavigationItem[];
  mobileMenuItems: NavigationItem[];
  searchEnabled: boolean;
  cartEnabled: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  href: string;
  category: 'digital-products' | 'data-analytics' | 'creative';
}

export interface Solution {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'coming-soon' | 'beta';
  features: string[];
  href?: string;
}

export interface SolutionsConfig {
  solutions: Solution[];
  heroMessage: string;
  ctaText: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  completionDate: Date;
  tags: CaseStudyTag[];
  projectType: 'client' | 'internal' | 'proposal';
  images: ProjectImage[];
  liveUrl?: string;
  featured: boolean;
}

export type CaseStudyTag = 
  | 'Web Design' 
  | 'Data Analytics' 
  | 'Dashboard' 
  | 'Mobile App' 
  | 'Proposal' 
  | 'Internal Experiment';

export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Main navigation configuration with exactly 7 items as per requirements
 * Requirements: 1.1, 1.2, 1.5, 8.1
 */
export const navigationConfig: NavigationConfig = {
  topNavItems: [],
  primaryItems: [
    { name: 'Services', href: '/services', description: 'Custom development and consulting services' },
    { name: 'Solutions', href: '/solutions', description: 'Our owned products and platforms' },
    { name: 'Case Studies', href: '/case-studies', description: 'Portfolio of our work and experiments' },
    { name: 'Pricing', href: '/pricing', description: 'Calculate project costs' },
    { name: 'Careers', href: '/careers', description: 'Join our team' }
  ],
  mobileMenuItems: [
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Careers', href: '/careers' }
  ],
  searchEnabled: true,
  cartEnabled: false // Removed shopping cart functionality as per requirements 1.5, 8.1
};

/**
 * Service categories configuration with three high-level categories
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'digital-products',
    name: 'Digital Products',
    description: 'Web and mobile solutions for your business',
    services: [
      { 
        id: 'web-design', 
        name: 'Web Design', 
        description: 'Custom website design and development',
        href: '/services/website-design', 
        category: 'digital-products' 
      },
      { 
        id: 'web-applications', 
        name: 'Web Applications', 
        description: 'Custom web application development',
        href: '/services/web-app-design', 
        category: 'digital-products' 
      },
      { 
        id: 'mobile-applications', 
        name: 'Mobile Applications', 
        description: 'iOS and Android app development',
        href: '/services/web-app-design', 
        category: 'digital-products' 
      },
      { 
        id: 'dashboard-design', 
        name: 'Dashboard Design', 
        description: 'Data visualization and dashboard interfaces',
        href: '/services/dashboard-design', 
        category: 'digital-products' 
      }
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    description: 'Data processing, analysis, and insights',
    services: [
      { 
        id: 'data-analysis', 
        name: 'Data Analysis', 
        description: 'Statistical analysis and business insights',
        href: '/services/data/analytics', 
        category: 'data-analytics' 
      },
      { 
        id: 'data-science', 
        name: 'Data Science', 
        description: 'Machine learning and predictive modeling',
        href: '/services/data/data-science', 
        category: 'data-analytics' 
      },
      { 
        id: 'data-engineering', 
        name: 'Data Engineering', 
        description: 'Data pipeline and infrastructure development',
        href: '/services/data/engineering', 
        category: 'data-analytics' 
      }
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Branding, design, and marketing services',
    services: [
      { 
        id: 'branding-logo-design', 
        name: 'Branding/Logo Design', 
        description: 'Brand identity and logo creation',
        href: '/services/creative/branding', 
        category: 'creative' 
      },
      { 
        id: 'brand-kits', 
        name: 'Brand Kits', 
        description: 'Complete brand identity solutions',
        href: '/services/creative/branding', 
        category: 'creative' 
      },
      { 
        id: 'social-media-management', 
        name: 'Social Media Management', 
        description: 'Social media strategy and content management',
        href: '/services/creative/social-media', 
        category: 'creative' 
      }
    ]
  }
];

/**
 * Homepage content configuration
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */
export const homepageConfig = {
  hero: {
    tagline: "We design digital products and data systems for growing African businesses",
    videoBackground: "/14946693_1080_1920_60fps.mp4"
  },
  featuredServices: {
    title: "Featured Services",
    categories: [
      { name: 'Digital Products', href: '/services#digital-products' },
      { name: 'Data & Analytics', href: '/services#data-analytics' },
      { name: 'Creative', href: '/services#creative' }
    ]
  },
  caseStudies: {
    title: "Selected Case Studies",
    count: 4
  }
};
