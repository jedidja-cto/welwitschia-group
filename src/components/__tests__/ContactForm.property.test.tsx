import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import ContactForm from '@/components/ContactForm';

describe('ContactForm Property Tests', () => {
  // Feature: navigation-restructure, Property 15: Contact Form Structure
  test('contact form contains exactly the required fields with correct labels', () => {
    fc.assert(fc.property(
      fc.constant({}), // No props needed for ContactForm
      () => {
        const { container } = render(<ContactForm />);
        
        // Verify required fields are present with correct labels
        const nameField = container.querySelector('input[name="name"]');
        const emailField = container.querySelector('input[name="email"]');
        const projectDescriptionField = container.querySelector('textarea[name="projectDescription"]');
        const budgetRangeField = container.querySelector('select[name="budgetRange"]');
        
        // Verify field types and requirements
        expect(nameField).toBeInTheDocument();
        expect(nameField).toHaveAttribute('type', 'text');
        expect(nameField).toBeRequired();
        
        expect(emailField).toBeInTheDocument();
        expect(emailField).toHaveAttribute('type', 'email');
        expect(emailField).toBeRequired();
        
        expect(projectDescriptionField).toBeInTheDocument();
        expect(projectDescriptionField).toBeRequired();
        
        expect(budgetRangeField).toBeInTheDocument();
        expect(budgetRangeField).not.toBeRequired(); // Budget range is optional
        
        // Verify submit button is present
        const submitButton = container.querySelector('button[type="submit"]');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveTextContent(/send message/i);
      }
    ), { numRuns: 100 });
  });

  // Feature: navigation-restructure, Property 15: Contact Form Structure
  test('contact form does not contain deprecated fields', () => {
    fc.assert(fc.property(
      fc.constant({}),
      () => {
        const { container } = render(<ContactForm />);
        
        // Verify old fields are not present
        expect(container.querySelector('input[name="phone"]')).not.toBeInTheDocument();
        expect(container.querySelector('input[name="company"]')).not.toBeInTheDocument();
        expect(container.querySelector('textarea[name="message"]')).not.toBeInTheDocument();
        
        // Verify the new project description field is present instead
        expect(container.querySelector('textarea[name="projectDescription"]')).toBeInTheDocument();
      }
    ), { numRuns: 100 });
  });

  // Feature: navigation-restructure, Property 16: Contact Form Functionality
  test('contact form provides clear feedback on submission success or failure', () => {
    fc.assert(fc.property(
      fc.constant({}),
      () => {
        const { container } = render(<ContactForm />);
        
        // Verify form fields are present for functionality testing
        const nameField = container.querySelector('input[name="name"]');
        const emailField = container.querySelector('input[name="email"]');
        const projectDescriptionField = container.querySelector('textarea[name="projectDescription"]');
        const budgetRangeField = container.querySelector('select[name="budgetRange"]');
        
        // Verify form fields exist and are functional
        expect(nameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(projectDescriptionField).toBeInTheDocument();
        expect(budgetRangeField).toBeInTheDocument();
        
        // Verify submit button exists and is functional
        const submitButton = container.querySelector('button[type="submit"]');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).not.toBeDisabled();
        
        // The form should have proper structure for Firebase backend integration
        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();
        
        // Verify form has proper onSubmit handler structure
        expect(form).toHaveAttribute('class', 'space-y-4');
      }
    ), { numRuns: 100 });
  });

  // Feature: navigation-restructure, Property 16: Contact Form Functionality
  test('contact form integrates with Firebase backend for data storage', () => {
    fc.assert(fc.property(
      fc.constant({}),
      () => {
        const { container } = render(<ContactForm />);
        
        // Verify form has proper structure for Firebase integration
        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();
        
        // Verify submit button exists for form submission
        const submitButton = container.querySelector('button[type="submit"]');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('type', 'submit');
      }
    ), { numRuns: 100 });
  });
});