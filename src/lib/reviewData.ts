import { Review } from '@/types/review';

// Review data - client testimonials
export const reviews: Review[] = [
  {
    id: 'r1',
    clientName: 'Lodge Director',
    companyName: 'Namibia Lodge',
    quote: 'Clear dashboards and monthly reporting changed how we operate.',
    date: new Date('2024-10-15'),
    projectType: 'Dashboard Design',
    featured: true,
    verified: true
  },
  {
    id: 'r2',
    clientName: 'Agency Lead',
    companyName: 'Windhoek Agency',
    quote: 'Fast web builds with analytics baked in — great value.',
    date: new Date('2024-09-28'),
    projectType: 'Website Design',
    featured: true,
    verified: true
  },
  {
    id: 'r3',
    clientName: 'Founder',
    companyName: 'SME Startup',
    quote: 'From brand kit to site launch in weeks. Smooth process.',
    date: new Date('2024-11-05'),
    projectType: 'Website Design',
    featured: true,
    verified: true
  }
];

// Function to get featured reviews only
export function getFeaturedReviews(): Review[] {
  return reviews.filter(review => review.featured);
}

// Function to get verified reviews only
export function getVerifiedReviews(): Review[] {
  return reviews.filter(review => review.verified);
}

// Function to get reviews by project type
export function getReviewsByProjectType(projectType: string): Review[] {
  return reviews.filter(review => review.projectType === projectType);
}

// Function to get reviews sorted by date (newest first)
export function getReviewsSortedByDate(): Review[] {
  return [...reviews].sort((a, b) => b.date.getTime() - a.date.getTime());
}

// Function to add a new review (for future use)
export function addReview(review: Review): void {
  reviews.push(review);
  // In a real application, this would also update the database/CMS
}