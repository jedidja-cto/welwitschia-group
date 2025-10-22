import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  service_interest: z.enum(['data_services', 'advisory', 'capital', 'other'], {
    errorMap: () => ({ message: 'Please select a service' }),
  }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const referralFormSchema = z.object({
  referrer_type: z.enum(['client', 'partner', 'employee'], {
    errorMap: () => ({ message: 'Please select your relationship' }),
  }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  referred_company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  referred_contact: z.string().min(2, { message: 'Contact name must be at least 2 characters' }),
  service_type: z.enum(['data_services', 'advisory', 'capital'], {
    errorMap: () => ({ message: 'Please select a service' }),
  }),
});

export type ReferralFormValues = z.infer<typeof referralFormSchema>;

export const applicationFormSchema = z.object({
  full_name: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role_interest: z.string().min(2, { message: 'Please specify your role interest' }),
  cv_url: z.string().url({ message: 'Please provide a valid URL to your CV' }),
  cover_note: z.string().min(10, { message: 'Cover note must be at least 10 characters' }),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;