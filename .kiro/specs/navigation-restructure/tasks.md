# Implementation Plan: Navigation Restructure

## Overview

This implementation plan converts the navigation restructure design into discrete coding tasks. The approach focuses on incremental changes that build upon each other, starting with core navigation updates, then content reorganization, and finally integration and testing. Each task includes specific requirements references and builds toward a simplified, user-friendly navigation structure.

## Tasks

- [x] 1. Update navigation configuration and interfaces
  - Create TypeScript interfaces for NavigationConfig, ServiceCategory, and related types
  - Define navigation configuration with exactly 7 items: Services, Solutions, Case Studies, Pricing, Templates, About, Contact
  - Remove shopping cart functionality from navigation configuration
  - _Requirements: 1.1, 1.2, 1.5, 8.1_

- [x] 1.1 Write property test for navigation structure compliance
  - **Property 1: Navigation Structure Compliance**
  - **Validates: Requirements 1.1, 1.2, 1.5, 8.1**

- [x] 2. Refactor MainNavbar component
  - Remove shopping cart icon from MainNavbar component
  - Update navigation items to display exactly 7 top-level items
  - Remove granular service category dropdowns
  - Maintain responsive behavior across device sizes
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [x] 2.1 Write property test for navigation responsiveness
  - **Property 2: Navigation Responsiveness**
  - **Validates: Requirements 1.4**

- [x] 3. Remove SecondaryNav component
  - Delete SecondaryNav component and related files
  - Remove SecondaryNav imports and usage from page layouts
  - Update layout components to use only MainNavbar
  - _Requirements: 1.1, 1.2_

- [x] 4. Create service organization system
  - Create service categories configuration with three high-level categories: Digital Products, Data & Analytics, Creative
  - Implement service categorization with correct services under each category
  - Ensure no individual services appear as top-level navigation items
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4.1 Write property test for service category organization
  - **Property 3: Service Category Organization**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

- [x] 4.2 Write property test for service navigation separation
  - **Property 4: Service Navigation Separation**
  - **Validates: Requirements 2.5**

- [x] 5. Implement Solutions section
  - Create Solutions page and component structure
  - Implement solutions data model with owned products only
  - Ensure clear differentiation from client services
  - Include product names, descriptions, and availability status for each solution
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 5.1 Write property test for solutions content type validation
  - **Property 5: Solutions Content Type Validation**
  - **Validates: Requirements 3.1, 3.2**

- [x] 5.2 Write property test for solutions information completeness
  - **Property 6: Solutions Information Completeness**
  - **Validates: Requirements 3.3, 3.4**

- [x] 6. Restructure Case Studies system
  - Update case study data model with new tag system: Web Design, Data Analytics, Dashboard, Mobile App, Proposal, Internal Experiment
  - Remove "Client Project" and "Live Site" as primary categorization signals
  - Ensure completion dates are included for chronological organization
  - Add clear labeling for internal experiments and proposals
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6.1 Write property test for case study categorization
  - **Property 7: Case Study Categorization**
  - **Validates: Requirements 4.1, 4.2, 4.3**

- [x] 6.2 Write property test for case study information requirements
  - **Property 8: Case Study Information Requirements**
  - **Validates: Requirements 4.4, 4.5**

- [x] 7. Update homepage content structure
  - Update hero section with new tagline: "We design digital products and data systems for growing African businesses"
  - Maintain existing video background while adding clear messaging
  - Update FeaturedServicesSection to display exactly three categories linking to Services section
  - Rename "Recent Work" to "Selected Case Studies" and display 3-4 clickable examples
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 7.1 Write property test for homepage content structure
  - **Property 9: Homepage Content Structure**
  - **Validates: Requirements 5.3, 5.4, 5.5**

- [x] 7.2 Write property test for homepage hero content
  - **Property 10: Homepage Hero Content**
  - **Validates: Requirements 5.2**

- [x] 8. Remove Business Bundles section
  - Remove BusinessBundlesSection component from homepage
  - Update homepage layout to exclude Business Bundles
  - Ensure pricing navigation directs to existing Pricing Calculator
  - _Requirements: 6.1, 6.2_

- [x] 8.1 Write property test for business bundles removal
  - **Property 11: Business Bundles Removal**
  - **Validates: Requirements 6.1**

- [x] 8.2 Write property test for pricing navigation
  - **Property 12: Pricing Navigation**
  - **Validates: Requirements 6.2**

- [x] 9. Update Footer component
  - Change company name from "Welwitschia Group" to "Welwitschia Data"
  - Update tagline to "Data, digital products, and analytics for African SMEs"
  - Mirror Services page structure with categories: Web & Mobile Development, Data & Analytics, Dashboards, Creative & Branding
  - Remove advisory and capital services from footer
  - Maintain consistency with main navigation structure
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 9.1 Write property test for footer structure compliance
  - **Property 13: Footer Structure Compliance**
  - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

- [x] 10. Update Templates section positioning
  - Remove shopping cart icons and purchase interfaces from Templates section
  - Position Templates as resource/library rather than e-commerce store
  - Focus on showcasing design capabilities
  - _Requirements: 8.2, 8.3_

- [x] 10.1 Write property test for templates positioning
  - **Property 14: Templates Positioning**
  - **Validates: Requirements 8.2, 8.3**

- [x] 11. Enhance contact form system
  - Update contact form fields: Name, Email, Project Description ("What are you trying to build?"), Budget Range (optional)
  - Implement Firebase Functions with Firestore for data storage
  - Add email notifications using SendGrid, Resend, or similar service
  - Provide clear feedback on form submission success or failure
  - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [x] 11.1 Write property test for contact form structure
  - **Property 15: Contact Form Structure**
  - **Validates: Requirements 9.1, 9.2**

- [x] 11.2 Write property test for contact form functionality
  - **Property 16: Contact Form Functionality**
  - **Validates: Requirements 9.3, 9.5**

- [x] 12. Checkpoint - Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Update content consistency and links
  - Update all internal links to point to correct restructured sections
  - Update all service references to match new categorization
  - Ensure consistent terminology across all pages and sections
  - _Requirements: 10.1, 10.2, 10.5_

- [x] 13.1 Write property test for content consistency
  - **Property 17: Content Consistency**
  - **Validates: Requirements 10.1, 10.2, 10.5**

-jb