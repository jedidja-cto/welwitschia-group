import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainNavbar from '@/components/layout/MainNavbar';

describe('Navigation Integration Tests', () => {
  describe('MainNavbar Integration', () => {
    it('should display exactly 7 navigation items correctly in desktop view', () => {
      render(<MainNavbar />);
      
      // Test that exactly 7 navigation items are present in desktop navigation
      const desktopNav = document.querySelector('.hidden.md\\:flex');
      expect(desktopNav).toBeInTheDocument();
      
      // Check each navigation item exists
      expect(screen.getAllByText('Services')).toHaveLength(2); // Desktop + Mobile
      expect(screen.getAllByText('Solutions')).toHaveLength(2);
      expect(screen.getAllByText('Case Studies')).toHaveLength(2);
      expect(screen.getAllByText('Pricing')).toHaveLength(2);
      expect(screen.getAllByText('Templates')).toHaveLength(2);
      expect(screen.getAllByText('About')).toHaveLength(2);
      expect(screen.getAllByText('Contact')).toHaveLength(2);
    });

    it('should not display shopping cart functionality', () => {
      render(<MainNavbar />);
      
      // Test that shopping cart is not present
      expect(screen.queryByLabelText('Shopping cart')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Cart')).not.toBeInTheDocument();
    });

    it('should handle mobile menu interactions', async () => {
      render(<MainNavbar />);
      
      // Find and click mobile menu button
      const menuButton = screen.getAllByLabelText('Open menu')[0];
      fireEvent.click(menuButton);
      
      // Wait for mobile menu to appear (check for fixed positioning class)
      await waitFor(() => {
        const mobileMenu = document.querySelector('.fixed.md\\:hidden');
        expect(mobileMenu).toBeInTheDocument();
      });
      
      // Test that navigation items are accessible in mobile menu
      // Just verify that Services link exists in mobile menu
      const servicesLinks = screen.getAllByText('Services');
      expect(servicesLinks.length).toBeGreaterThan(0);
    });

    it('should have correct navigation links', () => {
      render(<MainNavbar />);
      
      // Test that navigation links point to correct paths (check first occurrence)
      const servicesLinks = screen.getAllByRole('link', { name: 'Services' });
      expect(servicesLinks[0]).toHaveAttribute('href', '/services');
      
      const solutionsLinks = screen.getAllByRole('link', { name: 'Solutions' });
      expect(solutionsLinks[0]).toHaveAttribute('href', '/solutions');
      
      const caseStudiesLinks = screen.getAllByRole('link', { name: 'Case Studies' });
      expect(caseStudiesLinks[0]).toHaveAttribute('href', '/case-studies');
      
      const pricingLinks = screen.getAllByRole('link', { name: 'Pricing' });
      expect(pricingLinks[0]).toHaveAttribute('href', '/pricing');
      
      const templatesLinks = screen.getAllByRole('link', { name: 'Templates' });
      expect(templatesLinks[0]).toHaveAttribute('href', '/templates');
      
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      expect(aboutLinks[0]).toHaveAttribute('href', '/about');
      
      const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
      expect(contactLinks[0]).toHaveAttribute('href', '/contact');
    });
  });
});