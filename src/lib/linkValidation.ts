/**
 * Link validation utilities for ensuring internal links point to correct restructured sections
 */

export interface LinkValidationResult {
  isValid: boolean;
  suggestedUrl?: string;
  reason?: string;
}

/**
 * Valid internal routes in the new structure
 */
const validRoutes = new Set([
  '/',
  '/about',
  '/services',
  '/solutions',
  '/case-studies',
  '/pricing',
  '/contact',
  '/careers',
  '/referral',
  '/legal/privacy',
  '/legal/terms',
  // Service routes
  '/services/website-design',
  '/services/web-app-design',
  '/services/dashboard-design',
  '/services/creative/social-media',
  '/services/creative/content-creation',
  '/services/creative/ui-screen-design',
  '/services/data/analytics',
  '/services/data/data-science',
  '/services/data/engineering',
  '/services/data/cybersecurity',
  '/services/data/virtual-assistance',
  '/services/training',
  '/services/training/corporate-workshop',
]);

/**
 * Valid hash fragments for service categories
 */
const validServiceHashes = new Set([
  'digital-products',
  'data-analytics',
  'creative',
]);

/**
 * Validate an internal link and suggest corrections if needed
 */
export function validateInternalLink(url: string): LinkValidationResult {
  // Handle hash-only links (anchors)
  if (url.startsWith('#')) {
    return { isValid: true };
  }
  
  // Handle external links
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return { isValid: true };
  }
  
  // Handle mailto and tel links
  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    return { isValid: true };
  }
  
  // Parse the URL to separate path and hash
  const [path, hash] = url.split('#');
  
  // Check if the path is valid
  if (!validRoutes.has(path)) {
    // Try to suggest a corrected URL
    const suggestion = suggestCorrectUrl(path);
    return {
      isValid: false,
      suggestedUrl: suggestion || undefined,
      reason: `Invalid route: ${path}. ${suggestion ? `Consider using: ${suggestion}` : 'No suggestion available.'}`
    };
  }
  
  // If there's a hash, validate it for service pages
  if (hash && path === '/services') {
    if (!validServiceHashes.has(hash)) {
      return {
        isValid: false,
        reason: `Invalid service category hash: #${hash}. Valid options: ${Array.from(validServiceHashes).join(', ')}`
      };
    }
  }
  
  return { isValid: true };
}

/**
 * Suggest a correct URL for common incorrect paths
 */
function suggestCorrectUrl(path: string): string | null {
  const suggestions: Record<string, string> = {
    // Old division routes
    '/divisions': '/services',
    '/divisions/advisory': '/services',
    '/divisions/capital': '/services',
    '/divisions/data-services': '/services',
    
    // Old industry routes
    '/industries': '/case-studies',
    '/industries/education': '/case-studies',
    '/industries/entertainment': '/case-studies',
    '/industries/hospitality': '/case-studies',
    
    // Old category routes
    '/categories/creative': '/services#creative',
    '/categories/training': '/services#data-analytics',
    '/categories/website-app': '/services#digital-products',
    
    // Common service shortcuts
    '/web-design': '/services/website-design',
    '/web-development': '/services/web-app-design',
    '/dashboard': '/services/dashboard-design',
    '/data-analysis': '/services/data/analytics',
    '/data-science': '/services/data/data-science',
    '/branding': '/services/creative/ui-screen-design',
    
    // Business bundle routes
    '/bundles': '/pricing',
    '/packages': '/pricing',
    '/business-bundles': '/pricing',
  };
  
  return suggestions[path] || null;
}

/**
 * Validate all links in a given text content
 */
export function validateLinksInContent(content: string): { 
  totalLinks: number; 
  invalidLinks: Array<{ url: string; result: LinkValidationResult }>;
} {
  // Simple regex to find href attributes and markdown links
  const linkRegex = /(?:href=["']([^"']+)["']|(?<!\!)\[([^\]]*)\]\(([^)]+)\))/g;
  const links: string[] = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1] || match[3]; // href or markdown link
    if (url) {
      links.push(url);
    }
  }
  
  const invalidLinks: Array<{ url: string; result: LinkValidationResult }> = [];
  
  links.forEach(url => {
    const result = validateInternalLink(url);
    if (!result.isValid) {
      invalidLinks.push({ url, result });
    }
  });
  
  return {
    totalLinks: links.length,
    invalidLinks
  };
}

/**
 * Get all valid routes for reference
 */
export function getValidRoutes(): string[] {
  return Array.from(validRoutes).sort();
}

/**
 * Get all valid service category hashes
 */
export function getValidServiceHashes(): string[] {
  return Array.from(validServiceHashes).sort();
}
