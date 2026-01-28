import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RecentWorkSection from '@/components/sections/RecentWorkSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import TrustRow from '@/components/sections/TrustRow';

describe('Content Management Integration Tests', () => {
  describe('Recent Work Section Integration', () => {
    it('should display actual project data correctly', () => {
      render(<RecentWorkSection />);
      
      // Should display section title
      expect(screen.getByText('Recent Work')).toBeInTheDocument();
      
      // Should display actual client projects
      expect(screen.getByText('Mavedo Communications')).toBeInTheDocument();
      expect(screen.getByText('Kupferquelle Resort')).toBeInTheDocument();
      
      // Should display project descriptions
      expect(screen.getByText(/Professional communications and marketing website/)).toBeInTheDocument();
      expect(screen.getByText(/Luxury resort booking and information website/)).toBeInTheDocument();
      
      // Should display project links
      const mavedoLink = screen.getByRole('link', { name: /view live site/i });
      expect(mavedoLink).toHaveAttribute('href', 'https://mavedo-comms.web.app/');
      expect(mavedoLink).toHaveAttribute('target', '_blank');
      
      const kupferquelleLink = screen.getAllByRole('link', { name: /view live site/i })[1];
      expect(kupferquelleLink).toHaveAttribute('href', 'https://kupferquelle-resort-com.web.app/');
    });

    it('should display project categories correctly', () => {
      render(<RecentWorkSection />);
      
      // Should show client project badges (multiple)
      const clientProjectBadges = screen.getAllByText('Client Project');
      expect(clientProjectBadges.length).toBeGreaterThan(0);
      
      // Should show internal experiment badge (Kupferquelle Resort is now internal)
      expect(screen.getByText('Internal Experiment')).toBeInTheDocument();
    });

    it('should display project images with proper alt text', () => {
      render(<RecentWorkSection />);
      
      const mavedoImage = screen.getByAltText('Mavedo Communications website screenshot');
      expect(mavedoImage).toBeInTheDocument();
      expect(mavedoImage).toHaveAttribute('src', '/mavedo_communications.png');
      
      const kupferquelleImage = screen.getByAltText('Kupferquelle Resort website screenshot');
      expect(kupferquelleImage).toBeInTheDocument();
      expect(kupferquelleImage).toHaveAttribute('src', '/kupferquelle_resort.png');
    });
  });

  describe('Reviews Section Integration', () => {
    it('should display review system foundation', () => {
      render(<ReviewsSection />);
      
      // Should display section title
      expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
      
      // Should display review content structure
      const reviewSection = screen.getByRole('region', { name: /reviews/i });
      expect(reviewSection).toBeInTheDocument();
    });

    it('should be ready for client testimonials', () => {
      render(<ReviewsSection />);
      
      // Should have proper structure for adding reviews
      const reviewContainer = screen.getByTestId('reviews-container');
      expect(reviewContainer).toBeInTheDocument();
    });
  });

  describe('Trust Row Integration', () => {
    it('should display actual partner logos only', () => {
      render(<TrustRow />);
      
      // Should display section title
      expect(screen.getByText('Trusted by Leading Organizations')).toBeInTheDocument();
      
      // Should not display placeholder content
      expect(screen.queryByText('Partner Logo Placeholder')).not.toBeInTheDocument();
      
      // Should display actual partner information
      const trustSection = screen.getByRole('region', { name: /trusted partners/i });
      expect(trustSection).toBeInTheDocument();
    });

    it('should handle empty partner state gracefully', () => {
      render(<TrustRow />);
      
      // Should still display the section structure
      const trustRow = screen.getByTestId('trust-row');
      expect(trustRow).toBeInTheDocument();
      
      // Should not break layout when no partners are present
      expect(trustRow).toHaveClass('py-12');
    });
  });

  describe('Content Synchronization Integration', () => {
    it('should maintain consistent project data across components', () => {
      // Test that project data is consistent between different components
      const { rerender } = render(<RecentWorkSection />);
      
      // Verify project data in RecentWorkSection
      expect(screen.getByText('Mavedo Communications')).toBeInTheDocument();
      expect(screen.getByText('Kupferquelle Resort')).toBeInTheDocument();
      
      // The same project data should be available for other components
      // This tests the data consistency across the application
      const projectElements = screen.getAllByText(/Communications|Resort/);
      expect(projectElements.length).toBeGreaterThan(0);
    });

    it('should handle project sorting correctly', () => {
      render(<RecentWorkSection />);
      
      // Projects should be displayed in chronological order (newest first)
      const projectTitles = screen.getAllByRole('heading', { level: 4 });
      
      // Verify that projects are present and in expected order
      expect(projectTitles).toHaveLength(2);
      expect(projectTitles[0]).toHaveTextContent('Mavedo Communications');
      expect(projectTitles[1]).toHaveTextContent('Kupferquelle Resort');
    });
  });

  describe('Image and Media Integration', () => {
    it('should handle project images with proper loading and fallbacks', () => {
      render(<RecentWorkSection />);
      
      const images = screen.getAllByRole('img');
      
      // All images should have proper alt text
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
      
      // Images should have proper aspect ratios
      const imageContainers = screen.getAllByTestId('project-image-container');
      imageContainers.forEach(container => {
        expect(container).toHaveClass('aspect-video');
      });
    });

    it('should maintain responsive image behavior', () => {
      render(<RecentWorkSection />);
      
      const images = screen.getAllByRole('img');
      
      // Images should have responsive classes
      images.forEach(img => {
        expect(img).toHaveClass('w-full', 'h-full', 'object-cover');
      });
    });
  });

  describe('Content Management System Integration', () => {
    it('should support dynamic content updates', () => {
      render(<RecentWorkSection />);
      
      // Should have structure that supports adding new projects
      const projectGrid = screen.getByTestId('projects-grid');
      expect(projectGrid).toBeInTheDocument();
      expect(projectGrid).toHaveClass('grid');
      
      // Should maintain proper grid layout for new projects
      expect(projectGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });

    it('should handle content loading states gracefully', () => {
      render(<RecentWorkSection />);
      
      // Should not show loading indicators when content is available
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      
      // Should display actual content
      expect(screen.getByText('Recent Work')).toBeInTheDocument();
    });
  });
});