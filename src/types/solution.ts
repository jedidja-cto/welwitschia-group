export interface Solution {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'coming-soon' | 'beta';
  features: string[];
  href?: string;
  category: 'product' | 'platform' | 'service';
  launchDate?: Date;
  pricing?: {
    model: 'free' | 'subscription' | 'one-time' | 'custom';
    price?: number;
    currency?: string;
    period?: 'monthly' | 'yearly' | 'one-time';
  };
}

export interface SolutionsConfig {
  solutions: Solution[];
  heroMessage: string;
  ctaText: string;
  subtitle: string;
}