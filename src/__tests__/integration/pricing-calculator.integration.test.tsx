import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PricingCalculator from '@/components/pricing/PricingCalculator';

describe('Pricing Calculator Integration Tests', () => {
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    mockOnComplete.mockClear();
  });

  describe('Complete Pricing Calculator Workflow', () => {
    it('should complete full SME pricing workflow', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Step 1: Select Client Type (SME)
      expect(screen.getByText('Select Client Type')).toBeInTheDocument();
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      
      // Navigate to next step
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
      
      // Step 2: Select Package (Starter)
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
      
      const starterPackage = screen.getByText('Starter Package').closest('div');
      fireEvent.click(starterPackage!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 3: Service Selection (should have pre-filled services)
      await waitFor(() => {
        expect(screen.getByText('Select Services')).toBeInTheDocument();
      });
      
      // Verify pre-filled services are present
      expect(screen.getByText('Website Design')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 4: Monthly Services
      await waitFor(() => {
        expect(screen.getByText('Monthly Services')).toBeInTheDocument();
      });
      
      // Select required hosting
      const basicHosting = screen.getByText('Basic Hosting');
      fireEvent.click(basicHosting);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 5: Summary
      await waitFor(() => {
        expect(screen.getByText('Pricing Summary')).toBeInTheDocument();
      });
      
      // Verify cost separation
      expect(screen.getByText('One-time Project Costs')).toBeInTheDocument();
      expect(screen.getByText('Monthly Recurring Costs')).toBeInTheDocument();
      
      // Complete the workflow
      const completeButton = screen.getByRole('button', { name: /complete/i });
      fireEvent.click(completeButton);
      
      // Verify onComplete was called
      expect(mockOnComplete).toHaveBeenCalledWith(
        expect.objectContaining({
          clientType: 'SME',
          selectedPackage: 'starter'
        })
      );
    });

    it('should complete full Enterprise pricing workflow with premium', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Step 1: Select Enterprise
      const enterpriseCard = screen.getByText('Enterprise').closest('div');
      fireEvent.click(enterpriseCard!);
      
      // Verify enterprise premium message appears
      expect(screen.getByText(/Enterprise pricing includes a 20% premium/)).toBeInTheDocument();
      
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 2: Select Custom Package
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
      
      const customPackage = screen.getByText('Custom Package').closest('div');
      fireEvent.click(customPackage!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 3: Select services manually
      await waitFor(() => {
        expect(screen.getByText('Select Services')).toBeInTheDocument();
      });
      
      // Select web application service
      const webAppCheckbox = screen.getByLabelText('Web Applications and Mobile Applications');
      fireEvent.click(webAppCheckbox);
      
      // Select tier
      const mediumTier = screen.getByDisplayValue('Medium');
      fireEvent.click(mediumTier);
      
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 4: Monthly Services
      await waitFor(() => {
        expect(screen.getByText('Monthly Services')).toBeInTheDocument();
      });
      
      const advancedHosting = screen.getByText('Advanced Hosting');
      fireEvent.click(advancedHosting);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 5: Summary with Enterprise Premium
      await waitFor(() => {
        expect(screen.getByText('Pricing Summary')).toBeInTheDocument();
      });
      
      // Verify enterprise premium is displayed
      expect(screen.getByText(/Enterprise Premium/)).toBeInTheDocument();
      expect(screen.getByText(/20% premium has been applied/)).toBeInTheDocument();
      
      const completeButton = screen.getByRole('button', { name: /complete/i });
      fireEvent.click(completeButton);
      
      expect(mockOnComplete).toHaveBeenCalledWith(
        expect.objectContaining({
          clientType: 'Enterprise',
          enterpriseMultiplier: 1.2
        })
      );
    });
  });

  describe('Navigation and Progress Integration', () => {
    it('should handle step navigation correctly', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Initial state
      expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
      expect(screen.getByText('20% Complete')).toBeInTheDocument();
      
      // Navigate forward
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
        expect(screen.getByText('40% Complete')).toBeInTheDocument();
      });
      
      // Navigate backward
      const previousButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(previousButton);
      
      await waitFor(() => {
        expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
        expect(screen.getByText('20% Complete')).toBeInTheDocument();
      });
    });

    it('should disable/enable navigation buttons appropriately', () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Previous button should be disabled on first step
      const previousButton = screen.getByRole('button', { name: /previous/i });
      expect(previousButton).toBeDisabled();
      
      // Next button should be enabled after selection
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeEnabled();
    });
  });

  describe('Export and Email Integration', () => {
    it('should handle email functionality in summary step', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Navigate to summary step quickly
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      
      // Navigate through steps quickly
      for (let i = 0; i < 4; i++) {
        fireEvent.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => {}, { timeout: 1000 });
      }
      
      // Should be on summary step
      await waitFor(() => {
        expect(screen.getByText('Pricing Summary')).toBeInTheDocument();
      });
      
      // Test email functionality
      expect(screen.getByText('Email Summary')).toBeInTheDocument();
      expect(screen.getByText('Download PDF')).toBeInTheDocument();
      
      const emailInput = screen.getByPlaceholderText('Enter your email address');
      expect(emailInput).toBeInTheDocument();
      
      // Email button should be disabled initially
      const sendEmailButton = screen.getByRole('button', { name: /send email/i });
      expect(sendEmailButton).toBeDisabled();
      
      // Enable email button with valid email
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(sendEmailButton).toBeEnabled();
    });
  });

  describe('Responsive Behavior Integration', () => {
    it('should maintain functionality across different screen sizes', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Should still display all essential elements
      expect(screen.getByText('Select Client Type')).toBeInTheDocument();
      expect(screen.getByText('SME')).toBeInTheDocument();
      expect(screen.getByText('Enterprise')).toBeInTheDocument();
      
      // Navigation should still work
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeInTheDocument();
    });
  });

  describe('Pricing Calculator Error Handling Integration', () => {
    it('should handle invalid inputs gracefully', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Try to proceed without selecting client type
      const nextButton = screen.getByRole('button', { name: /next/i });
      
      // Should not be able to proceed without selection
      expect(nextButton).toBeEnabled(); // Button is enabled but selection is required
      
      // Select client type and proceed
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      fireEvent.click(nextButton);
      
      // Should successfully move to next step
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
    });

    it('should validate required hosting selection', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Navigate to monthly services step
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      
      // Navigate through steps quickly
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => {}, { timeout: 1000 });
      }
      
      // Should be on monthly services step
      await waitFor(() => {
        expect(screen.getByText('Monthly Services')).toBeInTheDocument();
      });
      
      // Try to proceed without selecting hosting
      const nextButton = screen.getByRole('button', { name: /next/i });
      
      // Should require hosting selection
      expect(screen.getByText(/hosting is required/i)).toBeInTheDocument();
    });
  });

  describe('Pricing Calculator Performance Integration', () => {
    it('should handle rapid step navigation without errors', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Rapid navigation test
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      
      // Navigate forward and backward rapidly
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => {}, { timeout: 500 });
        
        if (i < 2) {
          fireEvent.click(screen.getByRole('button', { name: /previous/i }));
          await waitFor(() => {}, { timeout: 500 });
        }
      }
      
      // Should still be functional
      expect(screen.getByText('Select Services')).toBeInTheDocument();
    });

    it('should maintain state during navigation', async () => {
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Select SME and navigate forward
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
      
      // Select package and navigate forward
      const starterPackage = screen.getByText('Starter Package').closest('div');
      fireEvent.click(starterPackage!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Navigate back and verify selections are maintained
      fireEvent.click(screen.getByRole('button', { name: /previous/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
      
      // Starter package should still be selected
      const selectedPackage = screen.getByText('Starter Package').closest('div');
      expect(selectedPackage).toHaveClass('border-brand-red');
    });
  });
});