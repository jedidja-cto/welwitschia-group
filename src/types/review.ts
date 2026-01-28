export interface Review {
  id: string;
  clientName: string;
  clientTitle?: string;
  companyName: string;
  quote: string;
  rating?: number;
  date: Date;
  projectType?: string;
  featured: boolean;
  verified: boolean;
}