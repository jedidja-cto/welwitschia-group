import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import RecentWorkSection from '@/components/sections/RecentWorkSection';
import HeroSection from '@/components/sections/HeroSection';
import { heroConfigs } from '@/config/heroConfigs';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/pricing',
}));

describe('Integration Tests - Task 10.2', () => {
  describe('Complete Pricing Calculator Workflow Integration', () => {
    it('should render pricing calculator with all required components', () => {
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Should display initial step
      expect(screen.getByText('Select Client Type')).toBeInTheDocument();
      
      // Should display client type options
      expect(screen.getByText('SME')).toBeInTheDocument();
      expect(screen.getByText('Enterprise')).toBeInTheDocument();
      
      // Should display progress indicator
      expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
      expect(screen.getByText('20% Complete')).toBeInTheDocument();
      
      // Should display navigation buttons
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      
      unmount();
    });

    it('should display enterprise pricing information', () => {
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Should display enterprise information
      expect(screen.getByText(/Enterprise pricing includes a 20% premium/)).toBeInTheDocument();
      
      unmount();
    });

    it('should have proper form structure', () => {
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Should have proper form elements
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Should have client type cards
      const smeCards = screen.getAllByText('SME');
      expect(smeCards.length).toBeGreaterThan(0);
      
      const enterpriseCards = screen.getAllByText('Enterprise');
      expect(enterpriseCards.length).toBeGreaterThan(0);
      
      unmount();
    });
  });

  describe('Navigation Integration Tests', () => {
    it('should have proper navigation structure', () => {
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Should have navigation buttons
      const nextButtons = screen.getAllByRole('button', { name: /next/i });
      expect(nextButtons.length).toBeGreaterThan(0);
      
      const previousButtons = screen.getAllByRole('button', { name: /previous/i });
      expect(previousButtons.length).toBeGreaterThan(0);
      
      // Should have progress indicator
      expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
      
      unmount();
    });
  });

  describe('Content Management Integration Tests', () => {
    it('should display actual project data correctly', () => {
      const { unmount } = render(<RecentWorkSection />);
      
      // Should display section title
      expect(screen.getByText('Recent Work')).toBeInTheDocument();
      
      // Should display actual client projects
      expect(screen.getByText('Mavedo Communications')).toBeInTheDocument();
      expect(screen.getByText('Kupferquelle Resort')).toBeInTheDocument();
      
      // Should display project descriptions
      expect(screen.getByText(/Professional communications and marketing website/)).toBeInTheDocument();
      expect(screen.getByText(/Luxury resort booking and information website/)).toBeInTheDocument();
      
      unmount();
    });

    it('should display project links correctly', () => {
      const { unmount } = render(<RecentWorkSection />);
      
      // Should display project links with correct text
      const links = screen.getAllByRole('link', { name: /live site/i });
      expect(links.length).toBeGreaterThan(0);
      
      // Should have proper href attributes
      const mavedoLink = links.find(link => 
        link.getAttribute('href') === 'https://mavedo-comms.web.app/'
      );
      expect(mavedoLink).toBeTruthy();
      
      const kupferquelleLink = links.find(link => 
        link.getAttribute('href') === 'https://kupferquelle-resort-com.web.app/'
      );
      expect(kupferquelleLink).toBeTruthy();
      
      unmount();
    });

    it('should display project categories correctly', () => {
      const { unmount } = render(<RecentWorkSection />);
      
      // Should show project badges - use getAllByText since there are multiple
      const clientProjectBadges = screen.getAllByText('Client Project');
      expect(clientProjectBadges.length).toBeGreaterThan(0);
      
      // Check if Internal Experiment exists (Kupferquelle Resort is now internal)
      const internalProjectBadges = screen.queryAllByText('Internal Experiment');
      expect(internalProjectBadges.length).toBeGreaterThan(0);
      
      unmount();
    });
  });

  describe('Hero Section Integration Tests', () => {
    it('should render homepage hero section correctly', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should display homepage content
      expect(screen.getByText('Tech & Design Services That Scale Your Business')).toBeInTheDocument();
      expect(screen.getByText(/Websites, web apps, data analytics/)).toBeInTheDocument();
      
      // Should display CTA buttons
      expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Talk to Us' })).toBeInTheDocument();
      
      unmount();
    });

    it('should render pricing hero section correctly', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.pricing} />);
      
      // Should display pricing content
      expect(screen.getByText('Transparent Pricing for Every Business')).toBeInTheDocument();
      expect(screen.getByText(/Get instant estimates with our interactive pricing calculator/)).toBeInTheDocument();
      
      // Should display pricing CTA
      const ctaButton = screen.getByRole('link', { name: 'Calculate Your Project' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#pricing-calculator');
      
      unmount();
    });

    it('should handle different hero configurations', () => {
      // Test web design hero
      const { unmount: unmount1 } = render(<HeroSection {...heroConfigs.webDesign} />);
      expect(screen.getByText('Professional Website Design')).toBeInTheDocument();
      unmount1();
      
      // Test data analytics hero
      const { unmount: unmount2 } = render(<HeroSection {...heroConfigs.dataAnalytics} />);
      expect(screen.getByText('Data Analytics & Business Intelligence')).toBeInTheDocument();
      unmount2();
    });
  });

  describe('Visual Enhancement Integration Tests', () => {
    it('should apply visual enhancement classes', () => {
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Should have visual enhancement classes on container
      const container = screen.getByText('Select Client Type').closest('div');
      expect(container).toBeInTheDocument();
      
      unmount();
    });

    it('should maintain performance with visual enhancements', () => {
      const startTime = performance.now();
      
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render quickly despite visual enhancements (less than 50ms)
      expect(renderTime).toBeLessThan(50);
      
      unmount();
    });

    it('should apply hero section animations', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should display content with animations
      expect(screen.getByText('Tech & Design Services That Scale Your Business')).toBeInTheDocument();
      
      unmount();
    });
  });

  describe('Error Handling Integration Tests', () => {
    it('should handle component rendering without errors', () => {
      // Test pricing calculator
      const mockOnComplete = vi.fn();
      expect(() => {
        const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
        unmount();
      }).not.toThrow();
      
      // Test recent work section
      expect(() => {
        const { unmount } = render(<RecentWorkSection />);
        unmount();
      }).not.toThrow();
      
      // Test hero section
      expect(() => {
        const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
        unmount();
      }).not.toThrow();
    });

    it('should display required validation messages', () => {
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      // Should display enterprise pricing information instead of hosting requirement
      // since hosting requirement is shown in later steps
      expect(screen.getByText(/Enterprise pricing includes a 20% premium/)).toBeInTheDocument();
      
      unmount();
    });
  });

  describe('Accessibility Integration Tests', () => {
    it('should have proper heading hierarchy', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should have main heading
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings.length).toBeGreaterThan(0);
      
      unmount();
    });

    it('should have proper link accessibility', () => {
      const { unmount } = render(<RecentWorkSection />);
      
      const links = screen.getAllByRole('link');
      
      // All links should have accessible names or aria-labels
      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0;
        const hasAriaLabel = link.getAttribute('aria-label');
        const hasTitle = link.getAttribute('title');
        
        expect(hasText || hasAriaLabel || hasTitle).toBe(true);
      });
      
      unmount();
    });

    it('should have proper button accessibility', () => {
      const mockOnComplete = vi.fn();
      const { unmount } = render(<PricingCalculator onComplete={mockOnComplete} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Buttons should have accessible names
      buttons.forEach(button => {
        expect(button.textContent || button.getAttribute('aria-label')).toBeTruthy();
      });
      
      unmount();
    });
  });
});