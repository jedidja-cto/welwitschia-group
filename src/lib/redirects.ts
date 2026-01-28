/**
 * URL redirect mappings and utilities for the navigation restructure
 * This file centralizes all redirect logic to maintain consistency
 */

export interface RedirectMapping {
  from: string;
  to: string;
  permanent: boolean;
  reason: string;
}

/**
 * Comprehensive list of URL redirects for the navigation restructure
 */
export const redirectMappings: RedirectMapping[] = [
  // Division pages (old structure)
  {
    from: '/divisions',
    to: '/services',
    permanent: true,
    reason: 'Divisions restructured into services'
  },
  {
    from: '/divisions/advisory',
    to: '/services',
    permanent: true,
    reason: 'Advisory services removed from offering'
  },
  {
    from: '/divisions/advisory/finance',
    to: '/services',
    permanent: true,
    reason: 'Advisory services removed from offering'
  },
  {
    from: '/divisions/advisory/operations',
    to: '/services',
    permanent: true,
    reason: 'Advisory services removed from offering'
  },
  {
    from: '/divisions/advisory/strategy',
    to: '/services',
    permanent: true,
    reason: 'Advisory services removed from offering'
  },
  {
    from: '/divisions/capital',
    to: '/services',
    permanent: true,
    reason: 'Capital services removed from offering'
  },
  {
    from: '/divisions/capital/fundraising',
    to: '/services',
    permanent: true,
    reason: 'Capital services removed from offering'
  },
  {
    from: '/divisions/capital/modeling',
    to: '/services',
    permanent: true,
    reason: 'Capital services removed from offering'
  },
  {
    from: '/divisions/capital/readiness',
    to: '/services',
    permanent: true,
    reason: 'Capital services removed from offering'
  },
  {
    from: '/divisions/data-services',
    to: '/services',
    permanent: true,
    reason: 'Data services consolidated under main services'
  },
  
  // Industry pages (old structure)
  {
    from: '/industries',
    to: '/case-studies',
    permanent: true,
    reason: 'Industry content moved to case studies'
  },
  {
    from: '/industries/education',
    to: '/case-studies',
    permanent: true,
    reason: 'Industry-specific content moved to case studies'
  },
  {
    from: '/industries/entertainment',
    to: '/case-studies',
    permanent: true,
    reason: 'Industry-specific content moved to case studies'
  },
  {
    from: '/industries/hospitality',
    to: '/case-studies',
    permanent: true,
    reason: 'Industry-specific content moved to case studies'
  },
  
  // Category pages (old structure)
  {
    from: '/categories/creative',
    to: '/services#creative',
    permanent: true,
    reason: 'Categories consolidated under services'
  },
  {
    from: '/categories/training',
    to: '/services#data-analytics',
    permanent: true,
    reason: 'Training moved to data analytics category'
  },
  {
    from: '/categories/website-app',
    to: '/services#digital-products',
    permanent: true,
    reason: 'Website/app category moved to digital products'
  },
  
  // Old top-level service routes
  {
    from: '/web-design',
    to: '/services/website-design',
    permanent: true,
    reason: 'Service moved under services section'
  },
  {
    from: '/web-development',
    to: '/services/web-app-design',
    permanent: true,
    reason: 'Service moved under services section'
  },
  {
    from: '/dashboard',
    to: '/services/dashboard-design',
    permanent: true,
    reason: 'Service moved under services section'
  },
  {
    from: '/data-analysis',
    to: '/services/data/analytics',
    permanent: true,
    reason: 'Service moved under services section'
  },
  {
    from: '/data-science',
    to: '/services/data/data-science',
    permanent: true,
    reason: 'Service moved under services section'
  },
  {
    from: '/branding',
    to: '/services/creative/ui-screen-design',
    permanent: true,
    reason: 'Service moved under services section'
  },
  
  // Business bundle routes (removed feature)
  {
    from: '/bundles',
    to: '/pricing',
    permanent: true,
    reason: 'Business bundles removed, redirected to pricing calculator'
  },
  {
    from: '/packages',
    to: '/pricing',
    permanent: true,
    reason: 'Business packages removed, redirected to pricing calculator'
  },
  {
    from: '/business-bundles',
    to: '/pricing',
    permanent: true,
    reason: 'Business bundles removed, redirected to pricing calculator'
  },
];

/**
 * Get redirect destination for a given path
 */
export function getRedirectDestination(path: string): string | null {
  const mapping = redirectMappings.find(redirect => redirect.from === path);
  return mapping ? mapping.to : null;
}

/**
 * Check if a path should be redirected
 */
export function shouldRedirect(path: string): boolean {
  return redirectMappings.some(redirect => redirect.from === path);
}

/**
 * Get all redirect mappings as a simple object for middleware
 */
export function getRedirectMap(): Record<string, string> {
  return redirectMappings.reduce((map, redirect) => {
    map[redirect.from] = redirect.to;
    return map;
  }, {} as Record<string, string>);
}

/**
 * Validate that all redirect destinations are valid routes
 */
export function validateRedirects(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const validRoutes = [
    '/',
    '/about',
    '/services',
    '/solutions',
    '/case-studies',
    '/pricing',
    '/contact',
    '/careers',
  ];
  
  redirectMappings.forEach(redirect => {
    const destination = redirect.to.split('#')[0]; // Remove hash fragments
    if (!validRoutes.includes(destination) && !destination.startsWith('/services/')) {
      errors.push(`Invalid redirect destination: ${redirect.to} for ${redirect.from}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}