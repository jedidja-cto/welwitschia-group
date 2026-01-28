# Requirements Document

## Introduction

This document outlines the requirements for restructuring the Welwitschia Data website's navigation and content organization to clearly separate services, solutions, and case studies. The goal is to eliminate user confusion by providing clear, purposeful navigation that guides visitors to appropriate actions based on their intent.

## Glossary

- **Navigation_System**: The website's primary navigation menu and structure
- **Services_Section**: What clients hire the company for (custom work)
- **Solutions_Section**: Products the company builds and owns in-house
- **Case_Studies**: Portfolio work including client projects and internal experiments
- **Content_Hierarchy**: The organizational structure of website content
- **Hero_Section**: Primary messaging area on each page
- **Footer_System**: Website footer navigation and information

## Requirements

### Requirement 1: Primary Navigation Restructure

**User Story:** As a website visitor, I want a clear, simplified navigation menu with no more than 7 items, so that I can quickly understand what the company offers and find what I need.

#### Acceptance Criteria

1. THE Navigation_System SHALL display exactly these top-level items: Services, Solutions, Case Studies, Pricing, Templates, About, Contact
2. THE Navigation_System SHALL NOT display granular service categories as top-level navigation items
3. WHEN viewing the navigation, THE Navigation_System SHALL present each item with a single, clear purpose that can be described in one sentence
4. THE Navigation_System SHALL maintain responsive behavior across all device sizes
5. THE Navigation_System SHALL remove the shopping cart icon from the main navigation

### Requirement 2: Services Section Organization

**User Story:** As a potential client, I want all services organized under one clear section with logical categories, so that I can understand what work the company does for clients.

#### Acceptance Criteria

1. WHEN accessing the Services section, THE Services_Section SHALL organize all client services under three high-level categories: Digital Products, Data & Analytics, and Creative
2. THE Services_Section SHALL include these services under Digital Products: Web Design, Web Applications, Mobile Applications, Dashboard Design
3. THE Services_Section SHALL include these services under Data & Analytics: Data Analysis, Data Science, Data Engineering
4. THE Services_Section SHALL include these services under Creative: Branding/Logo Design, Brand Kits, Social Media Management
5. THE Services_Section SHALL NOT duplicate any services as separate top-level navigation items

### Requirement 3: Solutions Section Implementation

**User Story:** As a website visitor, I want to clearly distinguish between custom services and owned products, so that I understand what I can buy versus what I can hire the company to build.

#### Acceptance Criteria

1. WHEN viewing the Solutions section, THE Solutions_Section SHALL display only products the company builds and owns in-house
2. THE Solutions_Section SHALL NOT include any custom client services or one-off work
3. THE Solutions_Section SHALL clearly differentiate owned products from client services
4. WHEN displaying solutions, THE Solutions_Section SHALL include product names, descriptions, and availability status
5. THE Solutions_Section SHALL be positioned to demonstrate company ambition and product development capabilities

### Requirement 4: Case Studies Section Structure

**User Story:** As a potential client, I want to see proof of work and thinking process through well-organized case studies, so that I can evaluate the company's capabilities and approach.

#### Acceptance Criteria

1. WHEN viewing Case Studies, THE Case_Studies SHALL include real client projects, redesign proposals, data dashboards, and internal experiments
2. THE Case_Studies SHALL use these tags for organization: Web Design, Data Analytics, Dashboard, Mobile App, Proposal, Internal Experiment
3. THE Case_Studies SHALL NOT use "Client Project" or "Live Site" as primary categorization signals
4. WHEN displaying case studies, THE Case_Studies SHALL include completion dates for chronological organization
5. THE Case_Studies SHALL clearly label internal experiments and proposals as such

### Requirement 5: Homepage Content Restructure

**User Story:** As a first-time visitor, I want to understand what the company does within 10 seconds, so that I can quickly determine if their services match my needs.

#### Acceptance Criteria

1. WHEN viewing the homepage hero section, THE Hero_Section SHALL display the clear tagline: "We design digital products and data systems for growing African businesses"
2. THE Hero_Section SHALL maintain the existing video background while adding clear messaging
3. WHEN viewing featured services, THE Content_Hierarchy SHALL display exactly three categories: Digital Products, Data & Analytics, Creative
4. THE Content_Hierarchy SHALL link each featured service category to the Services section, not separate pages
5. THE Content_Hierarchy SHALL rename "Recent Work" to "Selected Case Studies" and display 3-4 clickable examples

### Requirement 6: Business Bundles Removal

**User Story:** As a website visitor, I want clear pricing information without confusing bundle options, so that I can understand costs through the existing pricing calculator.

#### Acceptance Criteria

1. THE Content_Hierarchy SHALL remove the Business Bundles section from the homepage
2. THE Navigation_System SHALL direct pricing inquiries to the existing Pricing Calculator
3. WHEN removing bundles, THE Content_Hierarchy SHALL maintain focus on individual services and clear pricing
4. THE Content_Hierarchy SHALL not replace bundles with similar confusing package presentations

### Requirement 7: Footer Consistency Updates

**User Story:** As a website visitor, I want footer information that matches the main navigation structure, so that I have consistent wayfinding throughout the site.

#### Acceptance Criteria

1. WHEN viewing the footer, THE Footer_System SHALL change company name from "Welwitschia Group" to "Welwitschia Data"
2. THE Footer_System SHALL display the tagline: "Data, digital products, and analytics for African SMEs"
3. THE Footer_System SHALL mirror the Services page structure with these categories: Web & Mobile Development, Data & Analytics, Dashboards, Creative & Branding
4. THE Footer_System SHALL NOT include advisory or capital services
5. THE Footer_System SHALL maintain consistency with the main navigation structure

### Requirement 8: Templates Section Positioning

**User Story:** As a website visitor, I want to understand whether templates are products for sale or resources for reference, so that I have appropriate expectations.

#### Acceptance Criteria

1. THE Navigation_System SHALL maintain Templates as a navigation item without shopping cart functionality
2. THE Templates_Section SHALL be positioned as a resource/library rather than an e-commerce store
3. THE Templates_Section SHALL NOT display shopping cart icons or purchase interfaces
4. WHEN viewing templates, THE Templates_Section SHALL focus on showcasing design capabilities rather than selling products

### Requirement 9: Contact Form Enhancement

**User Story:** As a potential client, I want a simple contact form that helps filter serious inquiries, so that I can efficiently communicate my project needs.

#### Acceptance Criteria

1. WHEN submitting the contact form, THE Contact_System SHALL collect these fields: Name, Email, Project Description ("What are you trying to build?"), Budget Range (optional)
2. THE Contact_System SHALL use Firebase Functions with Firestore for data storage
3. THE Contact_System SHALL implement email notifications using SendGrid, Resend, or similar service
4. THE Contact_System SHALL require Firebase Blaze plan for cloud functions
5. THE Contact_System SHALL provide clear feedback on form submission success or failure

### Requirement 10: Content Consistency Validation

**User Story:** As a website administrator, I want all content to reflect the new navigation structure, so that visitors have a coherent experience throughout the site.

#### Acceptance Criteria

1. WHEN implementing changes, THE Content_Hierarchy SHALL ensure all internal links point to correct restructured sections
2. THE Content_Hierarchy SHALL update all service references to match new categorization
3. THE Content_Hierarchy SHALL remove or redirect any orphaned pages from old structure
4. THE Content_Hierarchy SHALL maintain SEO-friendly URLs while implementing redirects for changed paths
5. THE Content_Hierarchy SHALL ensure consistent terminology across all pages and sections