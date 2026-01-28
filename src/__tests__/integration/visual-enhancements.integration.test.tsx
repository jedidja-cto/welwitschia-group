import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import HeroSection from '@/components/sections/HeroSection';
import Button from '@/components/ui/Button';
import { heroConfigs } from '@/config/heroConfigs';

describe('Visual Enhancements Integration Tests', () => {
  describe('Micro-interactions Integration', () => {
    it('should apply hover effects to interactive elements', () => {
      render(<Button>Test Button</Button>);
      
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeInTheDocument();
      
      // Should have hover classes
      expect(button).toHaveClass('hover:bg-brand-black');
      expect(button).toHaveClass('transition-colors');
    });

    it('should apply scale effects to buttons', () => {
      render(<Button>Hover Me</Button>);
      
      const button = screen.getByRole('button', { name: 'Hover Me' });
      
      // Should have scale hover effect
      expect(button).toHaveClass('hover-scale-sm');
    });

    it('should apply smooth transitions to pricing calculator steps', async () => {
      const mockOnComplete = vi.fn();
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Select client type
      const smeCard = screen.getByText('SME').closest('div');
      expect(smeCard).toHaveClass('transition-all');
      
      fireEvent.click(smeCard!);
      
      // Navigate to next step
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
      
      // Should transition smoothly
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
      
      // Step content should have transition classes
      const stepContent = screen.getByTestId('step-content');
      expect(stepContent).toHaveClass('animate-fade-in');
    });
  });

  describe('CSS Animation Integration', () => {
    it('should apply fade-in animations to content sections', () => {
      render(<HeroSection {...heroConfigs.homepage} />);
      
      // Hero content should have fade-in animation
      const heroContent = screen.getByTestId('hero-content');
      expect(heroContent).toHaveClass('animate-fade-in');
    });

    it('should apply slide-up animations to cards', () => {
      const mockOnComplete = vi.fn();
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Client type cards should have slide-up animation
      const smeCard = screen.getByText('SME').closest('div');
      expect(smeCard).toHaveClass('animate-slide-up');
      
      const enterpriseCard = screen.getByText('Enterprise').closest('div');
      expect(enterpriseCard).toHaveClass('animate-slide-up');
    });

    it('should apply glow effects to selected elements', async () => {
      const mockOnComplete = vi.fn();
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      
      // Selected card should have glow effect
      await waitFor(() => {
        expect(smeCard).toHaveClass('animate-glow');
      });
    });

    it('should apply bounce animations to interactive elements', () => {
      render(<Button>Click Me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      fireEvent.click(button);
      
      // Should have bounce animation on click
      expect(button).toHaveClass('animate-bounce-gentle');
    });
  });

  describe('Performance Preservation Integration', () => {
    it('should maintain fast loading times with visual enhancements', () => {
      const startTime = performance.now();
      
      render(<HeroSection {...heroConfigs.homepage} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render quickly despite animations (less than 20ms)
      expect(renderTime).toBeLessThan(20);
    });

    it('should not impact pricing calculator performance', async () => {
      const mockOnComplete = vi.fn();
      const startTime = performance.now();
      
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Perform rapid interactions
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => {}, { timeout: 100 });
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      // Should complete interactions quickly (less than 200ms)
      expect(totalTime).toBeLessThan(200);
    });

    it('should handle multiple animations without performance degradation', () => {
      const startTime = performance.now();
      
      // Render multiple components with animations
      const { rerender } = render(<HeroSection {...heroConfigs.homepage} />);
      
      // Switch between different hero sections rapidly
      Object.values(heroConfigs).forEach(config => {
        rerender(<HeroSection {...config} />);
      });
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      // Should handle multiple re-renders efficiently (less than 100ms)
      expect(totalTime).toBeLessThan(100);
    });
  });

  describe('Animation Accessibility Integration', () => {
    it('should respect reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should still render content without animations
      expect(screen.getByText('Tech & Design Services That Scale Your Business')).toBeInTheDocument();
      
      // Animation classes should be conditionally applied
      const heroContent = screen.getByTestId('hero-content');
      expect(heroContent).toBeInTheDocument();
    });

    it('should provide fallback static states', () => {
      render(<Button>Static Button</Button>);
      
      const button = screen.getByRole('button', { name: 'Static Button' });
      
      // Should be functional without animations
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      
      // Should be clickable
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
    });
  });

  describe('Cross-Component Animation Integration', () => {
    it('should coordinate animations between pricing calculator steps', async () => {
      const mockOnComplete = vi.fn();
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Step 1 animations
      expect(screen.getByTestId('step-content')).toHaveClass('animate-fade-in');
      
      // Navigate to step 2
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Step 2 should animate in
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
        expect(screen.getByTestId('step-content')).toHaveClass('animate-fade-in');
      });
    });

    it('should maintain animation consistency across components', () => {
      const { rerender } = render(<Button>Button 1</Button>);
      
      const button1 = screen.getByRole('button', { name: 'Button 1' });
      expect(button1).toHaveClass('transition-colors');
      
      // Switch to different button
      rerender(<Button variant="outline">Button 2</Button>);
      
      const button2 = screen.getByRole('button', { name: 'Button 2' });
      expect(button2).toHaveClass('transition-colors');
      
      // Both should have consistent animation classes
      expect(button1).toHaveClass('hover-scale-sm');
      expect(button2).toHaveClass('hover-scale-sm');
    });
  });

  describe('Visual Enhancement Error Handling', () => {
    it('should gracefully handle animation failures', () => {
      // Mock CSS animation failure
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = vi.fn().mockReturnValue({
        animationName: 'none',
        transitionProperty: 'none',
      });

      render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should still render content
      expect(screen.getByText('Tech & Design Services That Scale Your Business')).toBeInTheDocument();
      
      // Restore original function
      window.getComputedStyle = originalGetComputedStyle;
    });

    it('should maintain functionality without JavaScript enhancements', () => {
      render(<Button>No JS Button</Button>);
      
      const button = screen.getByRole('button', { name: 'No JS Button' });
      
      // Should be functional as a basic button
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      
      // Should have basic styling
      expect(button).toHaveClass('bg-brand-red');
    });
  });

  describe('Mobile Visual Enhancement Integration', () => {
    it('should adapt animations for mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should still have animations on mobile
      const heroContent = screen.getByTestId('hero-content');
      expect(heroContent).toHaveClass('animate-fade-in');
      
      // Should be optimized for touch
      const ctaButton = screen.getByRole('link', { name: 'Get Started' });
      expect(ctaButton).toHaveClass('hover-scale-sm');
    });

    it('should handle touch interactions properly', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const mockOnComplete = vi.fn();
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Touch interactions should work
      const smeCard = screen.getByText('SME').closest('div');
      
      // Simulate touch events
      fireEvent.touchStart(smeCard!);
      fireEvent.touchEnd(smeCard!);
      fireEvent.click(smeCard!);
      
      // Should respond to touch
      expect(smeCard).toHaveClass('border-brand-red');
    });
  });

  describe('Animation Timing Integration', () => {
    it('should coordinate animation timing across components', async () => {
      const mockOnComplete = vi.fn();
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      const startTime = performance.now();
      
      // Trigger step transition
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      // Wait for animation to complete
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
      
      const endTime = performance.now();
      const animationTime = endTime - startTime;
      
      // Animation should complete within reasonable time (less than 500ms)
      expect(animationTime).toBeLessThan(500);
    });

    it('should handle overlapping animations gracefully', async () => {
      const mockOnComplete = vi.fn();
      render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Trigger rapid interactions
      const smeCard = screen.getByText('SME').closest('div');
      fireEvent.click(smeCard!);
      
      const nextButton = screen.getByRole('button', { name: /next/i });
      
      // Rapid clicks
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      
      // Should handle gracefully without errors
      await waitFor(() => {
        expect(screen.getByText('Select Package')).toBeInTheDocument();
      });
    });
  });
});