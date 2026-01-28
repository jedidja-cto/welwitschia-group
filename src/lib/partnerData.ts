import { Partner } from '@/types/partner';

// Partner data - only actual partners with real logos
export const partners: Partner[] = [
  // Currently no actual partner logos available
  // This array will be populated when real partner logos are provided
];

// Function to get featured partners only
export function getFeaturedPartners(): Partner[] {
  return partners.filter(partner => partner.featured);
}

// Function to get all partners
export function getAllPartners(): Partner[] {
  return partners;
}

// Function to add a new partner (for future use)
export function addPartner(partner: Partner): void {
  partners.push(partner);
  // In a real application, this would also update the database/CMS
}