import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const lastModified = new Date()
  const routes = [
    '/',
    '/services',
    '/solutions',
    '/case-studies',
    '/pricing',
    '/about',
    '/contact',
    '/careers',
    '/services/web-app-design',
    '/services/dashboard-design',
    '/services/website-design',
    '/services/creative/social-media',
    '/services/creative/content-creation',
    '/services/creative/ui-screen-design',
    '/services/creative/branding',
    '/services/data/analytics',
    '/services/data/data-science',
    '/services/data/engineering',
    '/services/data/cybersecurity',
    '/services/data/virtual-assistance',
    '/services/training',
    '/services/training/corporate-workshop',
    '/legal/privacy',
    '/legal/terms',
    '/referral',
  ]
  return routes.map((path) => ({
    url: `${site}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }))
}
