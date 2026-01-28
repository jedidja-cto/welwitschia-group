import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import Footer from '../Footer';

describe('Footer Property Tests', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should display correct company name, tagline, and service categories without advisory or capital services', () => {
    // Feature: navigation-restructure, Property 13: Footer Structure Compliance
    fc.assert(fc.property(
      fc.record({
        // Generate various configurations that might affect footer rendering
        randomFlag: fc.boolean(),
        testYear: fc.integer({ min: 2020, max: 2030 })
      }),
      (config) => {
        // Clean up before each render
        cleanup();
        
        // Render the Footer component
        const { container } = render(<Footer />);
        
        // Verify company name is "Welwitschia Data" not "Welwitschia Group"
        const companyNameElements = screen.getAllByText('Welwitschia Data');
        expect(companyNameElements.length).toBeGreaterThanOrEqual(1);
        expect(screen.queryByText('Welwitschia Group')).not.toBeInTheDocument();
        
        // Verify the correct tagline appears at least once
        const taglineElements = screen.getAllByText('Data, digital products, and analytics for African SMEs');
        expect(taglineElements.length).toBeGreaterThanOrEqual(1);
        
        // Verify the footer contains the correct service categories
        expect(screen.getByText('Web & Mobile Development')).toBeInTheDocument();
        expect(screen.getByText('Data & Analytics')).toBeInTheDocument();
        expect(screen.getByText('Dashboards')).toBeInTheDocument();
        expect(screen.getByText('Creative & Branding')).toBeInTheDocument();
        
        // Verify advisory and capital services are NOT present
        expect(screen.queryByText('Advisory')).not.toBeInTheDocument();
        expect(screen.queryByText('Capital')).not.toBeInTheDocument();
        
        // Verify consistency with main navigation structure
        const servicesElements = screen.getAllByText('Services');
        expect(servicesElements.length).toBeGreaterThanOrEqual(1);
        const contactElements = screen.getAllByText('Contact');
        expect(contactElements.length).toBeGreaterThanOrEqual(1);
        
        // Verify copyright shows "Welwitschia Data" not "Welwitschia Group"
        const copyrightText = screen.getByText(/© \d{4} Welwitschia Data\. All rights reserved\./);
        expect(copyrightText).toBeInTheDocument();
        expect(screen.queryByText(/Welwitschia Group\. All rights reserved/)).not.toBeInTheDocument();
        
        // Clean up after each test
        cleanup();
      }
    ), { numRuns: 100 });
  });
});