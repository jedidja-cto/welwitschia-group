import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '@/components/sections/HeroSection';
import { heroConfigs } from '@/config/heroConfigs';

describe('Hero Section Integration Tests', () => {
  describe('Hero Section Configuration Integration', () => {
    it('should render homepage hero section correctly', () => {
      render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should display homepage content
      expect(screen.getByText('Tech & Design Services That Scale Your Business')).toBeInTheDocument();
      expect(screen.getByText(/Websites, web apps, data analytics/)).toBeInTheDocument();
      
      // Should display CTA buttons
      expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Talk to Us' })).toBeInTheDocument();
      
      // Should display video element
      const video = screen.getByRole('presentation');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', '/14946693_1080_1920_60fps.mp4');
    });

    it('should render pricing hero section correctly', () => {
      render(<HeroSection {...heroConfigs.pricing} />);
      
      // Should display pricing content
      expect(screen.getByText('Transparent Pricing for Every Business')).toBeInTheDocument();
      expect(screen.getByText(/Get instant estimates with our interactive pricing calculator/)).toBeInTheDocument();
      
      // Should display pricing CTA
      const ctaButton = screen.getByRole('link', { name: 'Calculate Your Project' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#pricing-calculator');
      
      // Should display image placeholder
      const imagePlaceholder = screen.getByTestId('image-placeholder');
      expect(imagePlaceholder).toBeInTheDocument();
    });

    it('should render service page hero sections correctly', () => {
      // Test web design hero
      const { rerender } = render(<HeroSection {...heroConfigs.webDesign} />);
      
      expect(screen.getByText('Professional Website Design')).toBeInTheDocument();
      expect(screen.getByText(/Custom websites that convert visitors into customers/)).toBeInTheDocument();
      
      // Test web applications hero
      rerender(<HeroSection {...heroConfigs.webApplications} />);
      
      expect(screen.getByText('Web Applications & Mobile Solutions')).toBeInTheDocument();
      expect(screen.getByText(/Scalable web applications and mobile solutions/)).toBeInTheDocument();
      
      // Test data analytics hero
      rerender(<HeroSection {...heroConfigs.dataAnalytics} />);
      
      expect(screen.getByText('Data Analytics & Business Intelligence')).toBeInTheDocument();
      expect(screen.getByText(/Transform your data into actionable insights/)).toBeInTheDocument();
    });
  });

  describe('Hero Section Image Placeholder Integration', () => {
    it('should display image placeholders with proper attributes', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.pricing} />);
      
      // Should display placeholder content
      expect(screen.getByText(/Calculator interface preview/)).toBeInTheDocument();
      
      unmount();
    });

    it('should handle different image placeholder configurations', () => {
      // Test web design placeholder
      const { unmount: unmount1 } = render(<HeroSection {...heroConfigs.webDesign} />);
      expect(screen.getByText(/Website design showcase/)).toBeInTheDocument();
      unmount1();
      
      // Test dashboard design placeholder
      const { unmount: unmount2 } = render(<HeroSection {...heroConfigs.dashboardDesign} />);
      expect(screen.getByText(/Executive dashboard interface/)).toBeInTheDocument();
      unmount2();
      
      // Test data science placeholder
      const { unmount: unmount3 } = render(<HeroSection {...heroConfigs.dataScience} />);
      expect(screen.getByText(/Machine learning visualization/)).toBeInTheDocument();
      unmount3();
    });

    it('should maintain consistent placeholder structure across all configurations', () => {
      const configsWithPlaceholders = [
        heroConfigs.pricing,
        heroConfigs.webDesign,
        heroConfigs.webApplications,
        heroConfigs.dashboardDesign,
        heroConfigs.dataAnalytics,
        heroConfigs.dataScience,
        heroConfigs.dataEngineering,
        heroConfigs.socialMediaManagement,
        heroConfigs.training
      ];

      configsWithPlaceholders.forEach((config) => {
        const { unmount } = render(<HeroSection {...config} />);
        
        // Should have image placeholder content
        expect(config.imagePlaceholder?.description).toBeTruthy();
        
        unmount();
      });
    });
  });

  describe('Hero Section Responsive Integration', () => {
    it('should maintain proper layout on mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should display content properly on mobile
      expect(screen.getByText('Tech & Design Services That Scale Your Business')).toBeInTheDocument();
      
      // Buttons should be accessible
      expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Talk to Us' })).toBeInTheDocument();
      
      // Video should still be present
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should handle different screen sizes gracefully', () => {
      const screenSizes = [375, 768, 1024, 1440];
      
      screenSizes.forEach(width => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { rerender } = render(<HeroSection {...heroConfigs.pricing} />);
        
        if (width > 375) {
          rerender(<HeroSection {...heroConfigs.pricing} />);
        }
        
        // Core content should always be visible
        expect(screen.getByText('Transparent Pricing for Every Business')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Calculate Your Project' })).toBeInTheDocument();
      });
    });
  });

  describe('Hero Section CTA Integration', () => {
    it('should render CTA buttons with correct attributes', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
      
      const ctaLinks = screen.getAllByRole('link');
      const getStartedLink = ctaLinks.find(link => link.textContent === 'Get Started');
      const talkToUsLink = ctaLinks.find(link => link.textContent === 'Talk to Us');
      
      expect(getStartedLink).toHaveAttribute('href', '/contact#contact');
      expect(talkToUsLink).toHaveAttribute('href', '/contact#contact');
      
      unmount();
    });

    it('should handle single CTA button configurations', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.pricing} />);
      
      // Should have primary CTA
      const ctaLinks = screen.getAllByRole('link');
      const calculateLink = ctaLinks.find(link => link.textContent === 'Calculate Your Project');
      expect(calculateLink).toBeInTheDocument();
      expect(calculateLink).toHaveAttribute('href', '#pricing-calculator');
      
      // Should not have secondary CTA
      const talkToUsLink = ctaLinks.find(link => link.textContent === 'Talk to Us');
      expect(talkToUsLink).toBeUndefined();
      
      unmount();
    });

    it('should apply correct CTA button variants', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
      
      const ctaLinks = screen.getAllByRole('link');
      const primaryCTA = ctaLinks.find(link => link.textContent === 'Get Started');
      const secondaryCTA = ctaLinks.find(link => link.textContent === 'Talk to Us');
      
      // Primary should have primary styling
      expect(primaryCTA).toHaveClass('bg-brand-red');
      
      // Secondary should have outline styling
      expect(secondaryCTA).toHaveClass('border-white');
      
      unmount();
    });
  });

  describe('Hero Section Accessibility Integration', () => {
    it('should have proper heading hierarchy', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
      
      // Should have main heading
      const headings = screen.getAllByRole('heading', { level: 1 });
      const mainHeading = headings.find(h => h.textContent === 'Tech & Design Services That Scale Your Business');
      expect(mainHeading).toBeInTheDocument();
      
      unmount();
    });

    it('should have proper alt text for media elements', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.pricing} />);
      
      // Should contain descriptive content for image placeholder
      expect(screen.getByText(/Calculator interface preview/)).toBeInTheDocument();
      
      unmount();
    });

    it('should have proper link accessibility', () => {
      const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
      
      const ctaLinks = screen.getAllByRole('link');
      
      // All links should have accessible names
      ctaLinks.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.textContent).toBeTruthy();
      });
      
      unmount();
    });
  });

  describe('Hero Section Performance Integration', () => {
    it('should handle rapid re-renders without errors', () => {
      const configs = Object.values(heroConfigs);
      
      const { rerender } = render(<HeroSection {...configs[0]} />);
      
      // Rapidly switch between different hero configurations
      configs.forEach(config => {
        expect(() => {
          rerender(<HeroSection {...config} />);
        }).not.toThrow();
      });
    });

    it('should maintain consistent rendering performance', () => {
      const startTime = performance.now();
      
      // Render multiple hero sections
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<HeroSection {...heroConfigs.homepage} />);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render quickly (less than 100ms for 10 renders)
      expect(renderTime).toBeLessThan(100);
    });
  });
});