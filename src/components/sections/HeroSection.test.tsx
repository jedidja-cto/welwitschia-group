import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import HeroSection from './HeroSection';
import { HeroSectionProps } from '../../types/hero';

describe('HeroSection', () => {
  /**
   * **Feature: website-enhancement, Property 4: Hero section universality**
   * **Validates: Requirements 3.1, 3.2**
   * 
   * Property 4: Hero section universality
   * For any page on the website, a hero section should be present with appropriate 
   * content placeholders and image containers that maintain proper aspect ratios and sizing
   */
  it('should render hero section with proper structure for any valid props', () => {
    // Generator for image placeholders
    const imagePlaceholderGen = fc.record({
      description: fc.string({ minLength: 10, maxLength: 50 }).filter(s => /^[a-zA-Z0-9\s\-.,!]+$/.test(s)),
      suggestedType: fc.string({ minLength: 10, maxLength: 40 }).filter(s => /^[a-zA-Z0-9\s\-.,!]+$/.test(s)),
      aspectRatio: fc.constantFrom('16:9', '4:3', '1:1', '21:9'),
      size: fc.constantFrom('small', 'medium', 'large')
    });

    // Generator for CTA buttons with safe strings
    const ctaButtonGen = fc.record({
      text: fc.string({ minLength: 3, maxLength: 20 }).filter(s => /^[a-zA-Z0-9\s\-.,!]+$/.test(s)),
      href: fc.option(fc.constantFrom('/contact', '/pricing', '/about', '/services'), { nil: undefined }),
      variant: fc.option(fc.constantFrom('primary', 'secondary', 'outline'), { nil: undefined })
    });

    // Generator for hero section props with safe strings
    const heroPropsGen = fc.record({
      title: fc.string({ minLength: 10, maxLength: 50 }).filter(s => /^[a-zA-Z0-9][a-zA-Z0-9\s\-.,!]*[a-zA-Z0-9]$/.test(s) && s.trim().length >= 10),
      subtitle: fc.string({ minLength: 20, maxLength: 100 }).filter(s => /^[a-zA-Z0-9][a-zA-Z0-9\s\-.,!]*[a-zA-Z0-9]$/.test(s) && s.trim().length >= 20),
      backgroundImage: fc.option(fc.constantFrom('/test-bg.jpg', '/hero-bg.png'), { nil: undefined }),
      imagePlaceholder: fc.option(imagePlaceholderGen, { nil: undefined }),
      ctaButton: fc.option(ctaButtonGen, { nil: undefined }),
      secondaryButton: fc.option(ctaButtonGen, { nil: undefined }),
      variant: fc.option(fc.constantFrom('primary', 'secondary', 'minimal'), { nil: undefined }),
      videoSrc: fc.option(fc.constantFrom('/test-video.mp4', '/hero-video.webm'), { nil: undefined })
    });

    fc.assert(
      fc.property(heroPropsGen, (props) => {
        const { container } = render(<HeroSection {...props} />);

        // Verify hero section is present
        const heroSection = container.querySelector('section');
        expect(heroSection).toBeInTheDocument();
        expect(heroSection?.tagName).toBe('SECTION');

        // Verify title is present and rendered as h1
        const title = container.querySelector('h1');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(props.title);

        // Verify subtitle is present
        const subtitle = container.querySelector('p');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveTextContent(props.subtitle);

        // Verify proper CSS classes for responsive behavior
        expect(heroSection).toHaveClass('relative', 'w-full', 'overflow-hidden');

        // Verify variant-specific classes
        const variant = props.variant || 'primary';
        if (variant === 'primary') {
          expect(heroSection).toHaveClass('min-h-[85vh]', 'md:min-h-screen');
        } else if (variant === 'secondary') {
          expect(heroSection).toHaveClass('min-h-[60vh]', 'bg-gray-50');
        } else if (variant === 'minimal') {
          expect(heroSection).toHaveClass('min-h-[40vh]', 'bg-white');
        }

        // Verify content container structure
        const contentContainer = heroSection?.querySelector('.max-w-7xl');
        expect(contentContainer).toBeInTheDocument();
        expect(contentContainer).toHaveClass('mx-auto', 'px-6', 'py-24', 'md:py-32');

        // Verify title container
        const titleContainer = contentContainer?.querySelector('.max-w-3xl');
        expect(titleContainer).toBeInTheDocument();

        // Verify CTA buttons if present
        if (props.ctaButton) {
          const buttons = container.querySelectorAll('a, button');
          const primaryButton = Array.from(buttons).find(btn => btn.textContent?.includes(props.ctaButton!.text));
          expect(primaryButton).toBeInTheDocument();
        }

        if (props.secondaryButton) {
          const buttons = container.querySelectorAll('a, button');
          const secondaryButton = Array.from(buttons).find(btn => btn.textContent?.includes(props.secondaryButton!.text));
          expect(secondaryButton).toBeInTheDocument();
        }

        // Verify image placeholder structure if present
        if (props.imagePlaceholder && (variant === 'primary' || !props.videoSrc && !props.backgroundImage)) {
          const placeholderElements = container.querySelectorAll('*');
          const placeholderText = Array.from(placeholderElements).find(el => el.textContent?.includes('Image Placeholder'));
          if (placeholderText) {
            expect(placeholderText).toBeInTheDocument();
            expect(container.textContent).toContain(props.imagePlaceholder.description);
            expect(container.textContent).toContain(`Suggested: ${props.imagePlaceholder.suggestedType}`);
            expect(container.textContent).toContain(`Ratio: ${props.imagePlaceholder.aspectRatio}`);
          }
        }

        // Verify responsive text classes
        expect(title).toHaveClass('text-4xl', 'md:text-6xl', 'font-sans');

        // Verify subtitle classes
        expect(subtitle).toHaveClass('mt-4', 'text-lg', 'md:text-xl');

        // Clean up after each test
        cleanup();
      }),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });

  /**
   * **Feature: website-enhancement, Property 9: Image placeholder consistency**
   * **Validates: Requirements 7.2, 7.4**
   * 
   * Property 9: Image placeholder consistency
   * For any image placeholder implemented across the website, it should maintain 
   * proper aspect ratios, include descriptive suggestions, and allow seamless 
   * replacement without layout disruption
   */
  it('should maintain consistent image placeholder structure and properties', () => {
    // Generator for image placeholders with valid properties
    const imagePlaceholderGen = fc.record({
      description: fc.string({ minLength: 5, maxLength: 50 }).filter(s => /^[a-zA-Z0-9\s\-.,!]+$/.test(s)),
      suggestedType: fc.string({ minLength: 5, maxLength: 40 }).filter(s => /^[a-zA-Z0-9\s\-.,!]+$/.test(s)),
      aspectRatio: fc.constantFrom('16:9', '4:3', '1:1', '21:9', '3:2'),
      size: fc.constantFrom('small', 'medium', 'large')
    });

    // Generator for hero props with image placeholders
    const heroWithPlaceholderGen = fc.record({
      title: fc.string({ minLength: 5, maxLength: 30 }).filter(s => /^[a-zA-Z0-9\s\-.,!]+$/.test(s)),
      subtitle: fc.string({ minLength: 10, maxLength: 50 }).filter(s => /^[a-zA-Z0-9\s\-.,!]+$/.test(s)),
      imagePlaceholder: imagePlaceholderGen,
      variant: fc.constantFrom('primary', 'secondary', 'minimal')
    });

    fc.assert(
      fc.property(heroWithPlaceholderGen, (props) => {
        const { container } = render(<HeroSection {...props} />);

        // Verify image placeholder structure is present
        const placeholderElements = container.querySelectorAll('*');
        const placeholderText = Array.from(placeholderElements).find(el => el.textContent?.includes('Image Placeholder'));
        
        if (placeholderText) {
          // Verify placeholder contains required information
          expect(container.textContent).toContain(props.imagePlaceholder.description);
          expect(container.textContent).toContain(`Suggested: ${props.imagePlaceholder.suggestedType}`);
          expect(container.textContent).toContain(`Ratio: ${props.imagePlaceholder.aspectRatio}`);

          // Verify placeholder has proper CSS classes for sizing
          const placeholderContainer = container.querySelector('.absolute.inset-0.bg-gray-200');
          expect(placeholderContainer).toBeInTheDocument();
          expect(placeholderContainer).toHaveClass('flex', 'items-center', 'justify-center');

          // Verify size-specific classes are applied
          const sizeClasses = {
            small: ['h-32', 'w-48'],
            medium: ['h-48', 'w-72'],
            large: ['h-64', 'w-96']
          };

          const expectedClasses = sizeClasses[props.imagePlaceholder.size];
          expectedClasses.forEach(className => {
            expect(placeholderContainer).toHaveClass(className);
          });

          // Verify aspect ratio is properly formatted
          const aspectRatioRegex = /^\d+:\d+$/;
          expect(aspectRatioRegex.test(props.imagePlaceholder.aspectRatio)).toBe(true);

          // Verify text content structure
          const textContainer = placeholderContainer?.querySelector('.text-center');
          expect(textContainer).toBeInTheDocument();
          expect(textContainer).toHaveClass('p-4');

          // Verify descriptive text styling
          const allElements = container.querySelectorAll('*');
          const descriptionElement = Array.from(allElements).find(el => 
            el.textContent === props.imagePlaceholder.description && 
            el.classList.contains('text-gray-700')
          );
          expect(descriptionElement).toBeInTheDocument();

          const suggestionElement = Array.from(allElements).find(el => 
            el.textContent === `Suggested: ${props.imagePlaceholder.suggestedType}` &&
            el.classList.contains('text-gray-500')
          );
          expect(suggestionElement).toBeInTheDocument();

          const ratioElement = Array.from(allElements).find(el => 
            el.textContent === `Ratio: ${props.imagePlaceholder.aspectRatio}` &&
            el.classList.contains('text-gray-500')
          );
          expect(ratioElement).toBeInTheDocument();
        }

        // Clean up after each test
        cleanup();
      }),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });

  // Unit tests for specific examples and edge cases
  describe('Unit Tests', () => {
    it('should render primary variant with video background correctly', () => {
      const props: HeroSectionProps = {
        title: 'Test Hero Title',
        subtitle: 'Test hero subtitle with some content',
        videoSrc: '/test-video.mp4',
        variant: 'primary',
        ctaButton: {
          text: 'Get Started',
          href: '/contact',
          variant: 'primary'
        }
      };

      const { container } = render(<HeroSection {...props} />);

      const heroSection = container.querySelector('section');
      expect(heroSection).toHaveClass('min-h-[85vh]', 'md:min-h-screen');

      const video = heroSection?.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', '/test-video.mp4');
      expect(video).toHaveProperty('autoplay', true);
      expect(video).toHaveProperty('muted', true);
      expect(video).toHaveProperty('loop', true);

      // Should have dark overlay for video
      const overlay = heroSection?.querySelector('.bg-black\\/40');
      expect(overlay).toBeInTheDocument();
    });

    it('should render secondary variant without background media', () => {
      const props: HeroSectionProps = {
        title: 'Secondary Hero',
        subtitle: 'This is a secondary hero section',
        variant: 'secondary'
      };

      const { container } = render(<HeroSection {...props} />);

      const heroSection = container.querySelector('section');
      expect(heroSection).toHaveClass('min-h-[60vh]', 'bg-gray-50');

      // Should not have video or background image
      expect(heroSection?.querySelector('video')).not.toBeInTheDocument();
      expect(heroSection?.querySelector('.bg-black\\/40')).not.toBeInTheDocument();

      // Text should be dark for secondary variant
      const title = container.querySelector('h1');
      expect(title).toHaveClass('text-brand-black');
    });

    it('should render minimal variant correctly', () => {
      const props: HeroSectionProps = {
        title: 'Minimal Hero',
        subtitle: 'This is a minimal hero section',
        variant: 'minimal'
      };

      const { container } = render(<HeroSection {...props} />);

      const heroSection = container.querySelector('section');
      expect(heroSection).toHaveClass('min-h-[40vh]', 'bg-white');

      const title = container.querySelector('h1');
      expect(title).toHaveClass('text-brand-black');
    });

    it('should render image placeholder with all details', () => {
      const props: HeroSectionProps = {
        title: 'Hero with Placeholder',
        subtitle: 'Testing image placeholder functionality',
        variant: 'primary',
        imagePlaceholder: {
          description: 'Professional team photo',
          suggestedType: 'High-quality team photography',
          aspectRatio: '16:9',
          size: 'large'
        }
      };

      const { container } = render(<HeroSection {...props} />);

      expect(container.textContent).toContain('Image Placeholder');
      expect(container.textContent).toContain('Professional team photo');
      expect(container.textContent).toContain('Suggested: High-quality team photography');
      expect(container.textContent).toContain('Ratio: 16:9');
    });

    it('should render both primary and secondary buttons', () => {
      const props: HeroSectionProps = {
        title: 'Hero with Buttons',
        subtitle: 'Testing button functionality',
        ctaButton: {
          text: 'Primary Action',
          href: '/primary',
          variant: 'primary'
        },
        secondaryButton: {
          text: 'Secondary Action',
          href: '/secondary',
          variant: 'outline'
        }
      };

      const { container } = render(<HeroSection {...props} />);

      expect(container.textContent).toContain('Primary Action');
      expect(container.textContent).toContain('Secondary Action');

      const links = container.querySelectorAll('a');
      const primaryLink = Array.from(links).find(link => link.textContent?.includes('Primary Action'));
      const secondaryLink = Array.from(links).find(link => link.textContent?.includes('Secondary Action'));

      expect(primaryLink).toHaveAttribute('href', '/primary');
      expect(secondaryLink).toHaveAttribute('href', '/secondary');
    });

    it('should handle background image correctly', () => {
      const props: HeroSectionProps = {
        title: 'Hero with Background',
        subtitle: 'Testing background image functionality',
        variant: 'primary',
        backgroundImage: '/test-background.jpg'
      };

      const { container } = render(<HeroSection {...props} />);

      const heroSection = container.querySelector('section');
      const backgroundDiv = heroSection?.querySelector('[style*="background-image"]');
      expect(backgroundDiv).toBeInTheDocument();
      expect(backgroundDiv).toHaveStyle('background-image: url(/test-background.jpg)');

      // Should have dark overlay for background image
      const overlay = heroSection?.querySelector('.bg-black\\/40');
      expect(overlay).toBeInTheDocument();
    });
  });
});