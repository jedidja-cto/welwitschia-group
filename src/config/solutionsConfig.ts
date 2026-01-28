import { Solution, SolutionsConfig } from '@/types/solution';

export const solutions: Solution[] = [
  {
    id: 'data-pipeline-builder',
    name: 'Data Pipeline Builder',
    description: 'A no-code solution for building automated data pipelines that connect various business systems and generate actionable insights for growing businesses.',
    status: 'coming-soon',
    category: 'platform',
    features: [
      'No-code pipeline creation',
      'Multiple data source connectors',
      'Automated data transformation',
      'Real-time data synchronization',
      'Custom alert system',
      'API integration capabilities'
    ],
    launchDate: new Date('2024-09-01'),
    pricing: {
      model: 'subscription',
      price: 499,
      currency: 'NAD',
      period: 'monthly'
    }
  },
  {
    id: 'welwitschia-analytics',
    name: 'Welwitschia Analytics',
    description: 'A comprehensive business intelligence platform designed specifically for African SMEs, providing real-time insights into sales, operations, and customer behavior.',
    status: 'beta',
    category: 'platform',
    features: [
      'Real-time dashboard analytics',
      'Sales performance tracking',
      'Customer behavior insights',
      'Inventory management analytics',
      'Financial reporting automation',
      'Multi-currency support'
    ],
    launchDate: new Date('2024-06-01'),
    pricing: {
      model: 'subscription',
      price: 299,
      currency: 'NAD',
      period: 'monthly'
    }
  }
];

export const solutionsConfig: SolutionsConfig = {
  solutions,
  heroMessage: 'Empowering African businesses with purpose-built digital solutions',
  subtitle: 'Our owned products and platforms designed specifically for the unique needs of growing African SMEs',
  ctaText: 'Explore Our Solutions'
};