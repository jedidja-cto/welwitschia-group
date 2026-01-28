# Implementation Plan: Website Enhancement

## Overview

This implementation plan breaks down the website enhancement project into discrete, manageable coding tasks. Each task builds incrementally on previous work, ensuring the website remains functional throughout development while adding new features systematically.

## Tasks

- [x] 1. Update navigation system components
  - Update MainNavbar and SecondaryNav components with new menu items
  - Remove deprecated service categories (Cybersecurity, Virtual Assistants, UI Screen Design, Content Creation)
  - Update service names (Web App Design → Web Applications and Mobile Applications, Social Media → Social Media Management, Engineering → Data Engineering)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.1 Write unit tests for navigation updates
  - Test that updated menu items display correct text
  - Test that deprecated items are not present
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Create pricing calculator foundation
  - [x] 2.1 Create PricingCalculator main component with step-based flow
    - Implement step navigation with progress indicator
    - Create base component structure with TypeScript interfaces
    - _Requirements: 2.1_

  - [x] 2.2 Implement PricingEngine class with exact pricing values
    - Define all service pricing constants (web design, web apps, dashboards, etc.)
    - Implement monthly pricing for hosting, maintenance, and retainers
    - Create enterprise multiplier logic (+20% for one-time costs)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 2.3 Write property test for enterprise pricing multiplier
    - **Property 1: Enterprise pricing multiplier consistency**
    - **Validates: Requirements 2.2, 6.4**

  - [x] 2.4 Write property test for pricing accuracy
    - **Property 8: Pricing accuracy across all services**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.5**

- [x] 3. Implement pricing calculator steps
  - [x] 3.1 Create ClientTypeStep component
    - SME vs Enterprise selection with clear descriptions
    - _Requirements: 2.2_

  - [x] 3.2 Create PackageSelectionStep component
    - Implement Starter, Growth, Enterprise, and Custom package options
    - Define package price ranges and included services
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 3.3 Create ServiceSelectionStep component
    - Implement checkboxes for all service categories
    - Create dropdowns for service tiers (Basic/Standard/Advanced)
    - _Requirements: 2.3_

  - [x] 3.4 Write property test for package pre-filling
    - **Property 2: Package pre-filling with customization**
    - **Validates: Requirements 2.3, 8.5**

- [x] 4. Complete pricing calculator functionality
  - [x] 4.1 Create MonthlyServicesStep component
    - Implement required hosting selection with disclaimers
    - Add maintenance and retainer options
    - _Requirements: 2.5_

  - [x] 4.2 Create SummaryStep component
    - Implement clear separation of one-time vs monthly costs
    - Add export/email functionality with CTAs
    - _Requirements: 2.4, 2.6_

  - [x] 4.3 Write property test for cost separation
    - **Property 3: Cost separation consistency**
    - **Validates: Requirements 2.4**

  - [x] 4.4 Write unit tests for pricing calculator UI
    - Test step navigation and progress indicator
    - Test hosting selection requirements
    - Test export functionality
    - _Requirements: 2.1, 2.5, 2.6_

- [x] 5. Checkpoint - Ensure pricing calculator tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create hero section system
  - [x] 6.1 Create HeroSection component with image placeholders
    - Implement responsive hero component with TypeScript interfaces
    - Add image placeholder system with descriptive suggestions
    - Create variants for different page types
    - _Requirements: 3.1, 3.2, 7.1, 7.3_

  - [x] 6.2 Add hero sections to all pages
    - Update homepage with company overview hero
    - Add pricing page hero with calculator preview
    - Add service page heroes with relevant imagery suggestions
    - _Requirements: 3.1, 3.2_

  - [x] 6.3 Write property test for hero section universality
    - **Property 4: Hero section universality**
    - **Validates: Requirements 3.1, 3.2**

  - [x] 6.4 Write property test for image placeholder consistency
    - **Property 9: Image placeholder consistency**
    - **Validates: Requirements 7.2, 7.4**

- [x] 7. Implement visual enhancement system
  - [x] 7.1 Create micro-interaction CSS classes and animations
    - Implement fade-in, slide-up, scale, bounce, and glow animations
    - Create hover effects for interactive elements
    - Add smooth transitions for pricing calculator steps
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 7.2 Apply visual enhancements throughout website
    - Add micro-interactions to buttons and navigation
    - Implement smooth transitions in pricing calculator
    - Add subtle animations to content sections
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 7.3 Write property test for performance preservation
    - **Property 5: Performance preservation**
    - **Validates: Requirements 4.4**

- [x] 8. Update content management system
  - [x] 8.1 Create project display system for homepage
    - Extract project data from website design page
    - Implement date-based sorting (newest to oldest)
    - Create automatic homepage updates when projects are added
    - _Requirements: 5.1, 5.2, 5.4_

  - [x] 8.2 Update trusted partners section
    - Remove placeholder logos
    - Implement system for displaying actual partner logos only
    - _Requirements: 5.3_

  - [x] 8.3 Create review system foundation
    - Implement basic review display component
    - Prepare structure for client testimonials
    - _Requirements: 5.5_

  - [x] 8.4 Write property test for project sorting
    - **Property 6: Project sorting consistency**
    - **Validates: Requirements 5.2**

  - [x] 8.5 Write property test for homepage synchronization
    - **Property 7: Homepage project synchronization**
    - **Validates: Requirements 5.4**

  - [x] 8.6 Write unit tests for content management
    - Test project display functionality
    - Test partner logo display
    - Test review system components
    - _Requirements: 5.1, 5.3, 5.5_

- [-] 9. Create new pricing page with calculator integration
  - [x] 9.1 Create pricing page layout with hero section
    - Implement page structure with hero section and compelling copy
    - Add image placeholders for pricing-related imagery
    - _Requirements: 3.1, 3.2_

  - [x] 9.2 Integrate pricing calculator into pricing page
    - Embed PricingCalculator component
    - Add supporting content and explanations
    - Implement responsive design for mobile devices
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 10. Final integration and testing
  - [x] 10.1 Wire all components together
    - Ensure navigation links to new pricing page
    - Verify all hero sections display correctly
    - Test responsive behavior across all devices
    - _Requirements: All requirements_

  - [x] 10.2 Write integration tests
    - Test complete pricing calculator workflow
    - Test navigation integration across all pages
    - Test content management integration
    - _Requirements: All requirements_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The pricing calculator uses exact NAD pricing values as specified
- All visual enhancements maintain professional appearance while being engaging
- Image placeholders include specific suggestions for appropriate imagery