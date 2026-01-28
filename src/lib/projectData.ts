import { Project } from '@/types/project';

// Project data with slugs and updated project types
export const projects: Project[] = [
  {
    id: 'mavedo-communications',
    slug: 'mavedo-communications',
    title: 'Mavedo Communications',
    description: 'Bespoke marketing architecture for a results-driven agency.',
    category: 'Website Design',
    completionDate: new Date('2024-11-15'),
    images: [
      {
        url: '/mavedo_communications.png',
        alt: 'Mavedo Communications website screenshot'
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    clientName: 'Mavedo Communications',
    featured: true,
    liveUrl: 'https://mavedo-comms.web.app/',
    projectType: 'client',
    tags: ['Web Design', 'Marketing Tech']
  },
  {
    id: 'kupferquelle-resort',
    slug: 'kupferquelle-resort',
    title: 'Kupferquelle Resort',
    description: 'High-conversion booking engine and resort experience portal.',
    category: 'Website Design',
    completionDate: new Date('2024-10-20'),
    images: [
      {
        url: '/kupferquelle_resort.png',
        alt: 'Kupferquelle Resort website screenshot'
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    featured: true,
    liveUrl: 'https://kupferquelle-resort-com.web.app/',
    projectType: 'client',
    tags: ['E-commerce', 'Hospitality']
  },
  {
    id: 'resort-analytics-dashboard',
    slug: 'resort-analytics-dashboard',
    title: 'Resort Analytics Dashboard',
    description: 'Operational intelligence for a large-scale hospitality business.',
    category: 'Dashboard Design',
    completionDate: new Date('2024-11-12'),
    images: [
      {
        url: '',
        alt: 'Resort Analytics Dashboard screenshot',
        placeholder: {
          description: 'Analytics dashboard with charts and metrics',
          suggestedType: 'Dashboard interface with data visualizations',
          aspectRatio: '16:9',
          size: 'large'
        }
      }
    ],
    technologies: ['React', 'D3.js', 'TypeScript', 'Node.js'],
    featured: true,
    projectType: 'client',
    tags: ['Dashboard', 'Data Analytics']
  },
  {
    id: 'revenue-model-revamp',
    slug: 'revenue-model-revamp',
    title: 'Revenue Model Revamp',
    description: 'Experimental financial modeling for subscription-based startups.',
    category: 'Data Science',
    completionDate: new Date('2024-12-01'),
    images: [
      {
        url: '',
        alt: 'Revenue Model Revamp dashboard screenshot',
        placeholder: {
          description: 'Revenue analysis dashboard with financial metrics',
          suggestedType: 'Financial dashboard with revenue charts and KPIs',
          aspectRatio: '16:9',
          size: 'large'
        }
      }
    ],
    technologies: ['Python', 'Pandas', 'React', 'FastAPI'],
    featured: true,
    projectType: 'portfolio',
    tags: ['FinTech', 'Data Analytics']
  },
  {
    id: 'ticketing-insights',
    slug: 'ticketing-insights',
    title: 'Ticketing Insights',
    description: 'Visualizing event performance and audience demographics.',
    category: 'Data Analytics',
    completionDate: new Date('2024-10-08'),
    images: [
      {
        url: '',
        alt: 'Ticketing Insights platform screenshot',
        placeholder: {
          description: 'Ticketing analytics platform interface',
          suggestedType: 'Analytics platform with ticket sales data',
          aspectRatio: '16:9',
          size: 'large'
        }
      }
    ],
    technologies: ['Python', 'React', 'PostgreSQL', 'Chart.js'],
    featured: true,
    projectType: 'portfolio',
    tags: ['Events', 'Big Data']
  }
];

export function getProjectsSortedByDate(): Project[] {
  return [...projects].sort((a, b) => b.completionDate.getTime() - a.completionDate.getTime());
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}