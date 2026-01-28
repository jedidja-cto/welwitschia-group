// PricingEngine class with exact pricing values as specified in requirements
export interface ServicePricing {
  base: number;
  tiers?: { [key: string]: number };
  enterpriseMultiplier?: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  pricing: ServicePricing;
  category: string;
  isMonthly: boolean;
}

export interface ServiceSelections {
  clientType: 'SME' | 'Enterprise';
  services: Array<{
    serviceId: string;
    tier: string;
  }>;
  monthlyServices: Array<{
    serviceId: string;
  }>;
}

export interface PricingSummary {
  clientType: 'SME' | 'Enterprise';
  selectedPackage?: string;
  services: Array<{
    id: string;
    name: string;
    tier: string;
    price: number;
    category: string;
  }>;
  monthlyServices: Array<{
    id: string;
    name: string;
    price: number;
    required?: boolean;
  }>;
  oneTimeCost: number;
  monthlyCost: number;
  enterpriseMultiplier: number;
}

export class PricingEngine {
  // Exact pricing values as specified in requirements 6.1, 6.2, 6.3, 6.5
  private static readonly SERVICE_PRICES = {
    webDesign: { 
      basic: 10000,    // Basic Website (N$10,000)
      standard: 20000, // Standard (N$20,000) 
      advanced: 35000  // Advanced (N$35,000)
    },
    webApp: { 
      simple: 50000,   // Simple (N$50,000)
      medium: 85000,   // Medium (N$85,000)
      complex: 150000  // Complex (N$150,000)
    },
    dashboard: {
      basic: 15000,    // Basic Dashboard
      advanced: 35000, // Advanced Dashboard
      executive: 60000 // Executive Dashboard
    },
    dataAnalytics: {
      basic: 8000,     // Basic Analytics
      standard: 15000, // Standard Analytics
      advanced: 25000  // Advanced Analytics
    },
    dataScience: {
      basic: 12000,    // Basic Data Science
      standard: 20000, // Standard Data Science
      advanced: 35000  // Advanced Data Science
    },
    dataEngineering: {
      basic: 10000,    // Basic Data Engineering
      standard: 18000, // Standard Data Engineering
      advanced: 30000  // Advanced Data Engineering
    },
    socialMediaManagement: {
      basic: 5000,     // Basic Social Media Management
      standard: 8000,  // Standard Social Media Management
      advanced: 12000  // Advanced Social Media Management
    },
    training: {
      basic: 8000,     // Basic Training
      standard: 15000, // Standard Training
      advanced: 25000  // Advanced Training
    }
  };

  // Monthly pricing as specified in requirements 6.3
  private static readonly MONTHLY_PRICES = {
    hosting: { 
      basic: 450,      // Basic Hosting (N$450)
      advanced: 1000   // Advanced Hosting (N$1,000)
    },
    maintenance: { 
      basic: 1200,     // Basic Maintenance (N$1,200)
      full: 2500       // Full Maintenance (N$2,500)
    },
    retainers: {
      analytics: 5000,        // Analytics Retainer
      dataScience: 10000,     // Data Science Retainer
      dataEngineering: 8000,  // Data Engineering Retainer
      virtualAssistant: 8000, // Virtual Assistant Retainer
      socialMedia: 6000       // Social Media Retainer
    }
  };

  // Enterprise multiplier as specified in requirement 6.4
  private static readonly ENTERPRISE_MULTIPLIER = 1.2; // +20% for one-time costs

  /**
   * Calculate total pricing based on service selections
   */
  public static calculateTotal(selections: ServiceSelections): PricingSummary {
    const services: PricingSummary['services'] = [];
    const monthlyServices: PricingSummary['monthlyServices'] = [];
    
    let oneTimeCost = 0;
    let monthlyCost = 0;

    // Calculate one-time service costs
    for (const selection of selections.services) {
      const serviceInfo = this.getServiceInfo(selection.serviceId);
      if (serviceInfo) {
        const basePrice = this.getServicePrice(selection.serviceId, selection.tier);
        // Apply enterprise multiplier to individual service prices for consistency
        const enterpriseMultiplier = selections.clientType === 'Enterprise' ? this.ENTERPRISE_MULTIPLIER : 1.0;
        const finalPrice = basePrice * enterpriseMultiplier;
        
        services.push({
          id: selection.serviceId,
          name: serviceInfo.name,
          tier: selection.tier,
          price: finalPrice,
          category: serviceInfo.category
        });
        oneTimeCost += finalPrice;
      }
    }

    // Calculate monthly service costs
    for (const selection of selections.monthlyServices) {
      const serviceInfo = this.getMonthlyServiceInfo(selection.serviceId);
      if (serviceInfo) {
        monthlyServices.push({
          id: selection.serviceId,
          name: serviceInfo.name,
          price: serviceInfo.price,
          required: serviceInfo.required
        });
        monthlyCost += serviceInfo.price;
      }
    }

    // Apply enterprise multiplier to one-time costs only (requirement 6.4)
    // Note: Individual service prices already include the multiplier, so oneTimeCost should already be correct
    const enterpriseMultiplier = selections.clientType === 'Enterprise' ? this.ENTERPRISE_MULTIPLIER : 1.0;

    return {
      clientType: selections.clientType,
      services,
      monthlyServices,
      oneTimeCost, // Already includes enterprise multiplier from individual service calculations
      monthlyCost, // Monthly costs are not affected by enterprise multiplier
      enterpriseMultiplier
    };
  }

  /**
   * Apply enterprise multiplier to one-time costs
   */
  public static applyEnterpriseMultiplier(cost: number): number {
    return cost * this.ENTERPRISE_MULTIPLIER;
  }

  /**
   * Get service price for a specific tier
   */
  private static getServicePrice(serviceId: string, tier: string): number {
    const lowerTier = tier.toLowerCase();
    
    switch (serviceId) {
      case 'web-design':
        return this.SERVICE_PRICES.webDesign[lowerTier as keyof typeof this.SERVICE_PRICES.webDesign] || 0;
      case 'web-app':
        return this.SERVICE_PRICES.webApp[lowerTier as keyof typeof this.SERVICE_PRICES.webApp] || 0;
      case 'dashboard':
        return this.SERVICE_PRICES.dashboard[lowerTier as keyof typeof this.SERVICE_PRICES.dashboard] || 0;
      case 'data-analytics':
        return this.SERVICE_PRICES.dataAnalytics[lowerTier as keyof typeof this.SERVICE_PRICES.dataAnalytics] || 0;
      case 'data-science':
        return this.SERVICE_PRICES.dataScience[lowerTier as keyof typeof this.SERVICE_PRICES.dataScience] || 0;
      case 'data-engineering':
        return this.SERVICE_PRICES.dataEngineering[lowerTier as keyof typeof this.SERVICE_PRICES.dataEngineering] || 0;
      case 'social-media':
        return this.SERVICE_PRICES.socialMediaManagement[lowerTier as keyof typeof this.SERVICE_PRICES.socialMediaManagement] || 0;
      case 'training':
        return this.SERVICE_PRICES.training[lowerTier as keyof typeof this.SERVICE_PRICES.training] || 0;
      default:
        return 0;
    }
  }

  /**
   * Get service information
   */
  private static getServiceInfo(serviceId: string): { name: string; category: string } | null {
    const serviceMap: { [key: string]: { name: string; category: string } } = {
      'web-design': { name: 'Website Design', category: 'Web Services' },
      'web-app': { name: 'Web Applications and Mobile Applications', category: 'Web Services' },
      'dashboard': { name: 'Dashboard Design', category: 'Web Services' },
      'data-analytics': { name: 'Data Analytics', category: 'Data Services' },
      'data-science': { name: 'Data Science', category: 'Data Services' },
      'data-engineering': { name: 'Data Engineering', category: 'Data Services' },
      'social-media': { name: 'Social Media Management', category: 'Creative Services' },
      'training': { name: 'Training', category: 'Training Services' }
    };
    
    return serviceMap[serviceId] || null;
  }

  /**
   * Get monthly service information
   */
  private static getMonthlyServiceInfo(serviceId: string): { name: string; price: number; required?: boolean } | null {
    switch (serviceId) {
      case 'hosting-basic':
        return { name: 'Basic Hosting', price: this.MONTHLY_PRICES.hosting.basic, required: true };
      case 'hosting-advanced':
        return { name: 'Advanced Hosting', price: this.MONTHLY_PRICES.hosting.advanced };
      case 'maintenance-basic':
        return { name: 'Basic Maintenance', price: this.MONTHLY_PRICES.maintenance.basic };
      case 'maintenance-full':
        return { name: 'Full Maintenance', price: this.MONTHLY_PRICES.maintenance.full };
      case 'retainer-analytics':
        return { name: 'Analytics Retainer', price: this.MONTHLY_PRICES.retainers.analytics };
      case 'retainer-data-science':
        return { name: 'Data Science Retainer', price: this.MONTHLY_PRICES.retainers.dataScience };
      case 'retainer-data-engineering':
        return { name: 'Data Engineering Retainer', price: this.MONTHLY_PRICES.retainers.dataEngineering };
      case 'retainer-virtual-assistant':
        return { name: 'Virtual Assistant Retainer', price: this.MONTHLY_PRICES.retainers.virtualAssistant };
      case 'retainer-social-media':
        return { name: 'Social Media Retainer', price: this.MONTHLY_PRICES.retainers.socialMedia };
      default:
        return null;
    }
  }

  /**
   * Get all available services
   */
  public static getAllServices(): ServiceCategory[] {
    return [
      {
        id: 'web-services',
        name: 'Web Services',
        services: [
          {
            id: 'web-design',
            name: 'Website Design',
            description: 'Professional website design and development',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.webDesign
            },
            category: 'web-services',
            isMonthly: false
          },
          {
            id: 'web-app',
            name: 'Web Applications and Mobile Applications',
            description: 'Custom web and mobile application development',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.webApp
            },
            category: 'web-services',
            isMonthly: false
          },
          {
            id: 'dashboard',
            name: 'Dashboard Design',
            description: 'Interactive dashboard and data visualization',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.dashboard
            },
            category: 'web-services',
            isMonthly: false
          }
        ]
      },
      {
        id: 'data-services',
        name: 'Data Services',
        services: [
          {
            id: 'data-analytics',
            name: 'Data Analytics',
            description: 'Data analysis and business intelligence',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.dataAnalytics
            },
            category: 'data-services',
            isMonthly: false
          },
          {
            id: 'data-science',
            name: 'Data Science',
            description: 'Machine learning and predictive analytics',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.dataScience
            },
            category: 'data-services',
            isMonthly: false
          },
          {
            id: 'data-engineering',
            name: 'Data Engineering',
            description: 'Data pipeline and infrastructure development',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.dataEngineering
            },
            category: 'data-services',
            isMonthly: false
          }
        ]
      },
      {
        id: 'creative-services',
        name: 'Creative Services',
        services: [
          {
            id: 'social-media',
            name: 'Social Media Management',
            description: 'Social media strategy and content management',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.socialMediaManagement
            },
            category: 'creative-services',
            isMonthly: false
          }
        ]
      },
      {
        id: 'training-services',
        name: 'Training Services',
        services: [
          {
            id: 'training',
            name: 'Training',
            description: 'Professional training and workshops',
            pricing: {
              base: 0,
              tiers: this.SERVICE_PRICES.training
            },
            category: 'training-services',
            isMonthly: false
          }
        ]
      }
    ];
  }

  /**
   * Get all available monthly services
   */
  public static getAllMonthlyServices(): Service[] {
    return [
      {
        id: 'hosting-basic',
        name: 'Basic Hosting',
        description: 'Standard web hosting with basic features',
        pricing: { base: this.MONTHLY_PRICES.hosting.basic },
        category: 'hosting',
        isMonthly: true
      },
      {
        id: 'hosting-advanced',
        name: 'Advanced Hosting',
        description: 'Premium hosting with advanced features and performance',
        pricing: { base: this.MONTHLY_PRICES.hosting.advanced },
        category: 'hosting',
        isMonthly: true
      },
      {
        id: 'maintenance-basic',
        name: 'Basic Maintenance',
        description: 'Basic website maintenance and updates',
        pricing: { base: this.MONTHLY_PRICES.maintenance.basic },
        category: 'maintenance',
        isMonthly: true
      },
      {
        id: 'maintenance-full',
        name: 'Full Maintenance',
        description: 'Comprehensive maintenance and support',
        pricing: { base: this.MONTHLY_PRICES.maintenance.full },
        category: 'maintenance',
        isMonthly: true
      },
      {
        id: 'retainer-analytics',
        name: 'Analytics Retainer',
        description: 'Ongoing analytics and reporting services',
        pricing: { base: this.MONTHLY_PRICES.retainers.analytics },
        category: 'retainers',
        isMonthly: true
      },
      {
        id: 'retainer-data-science',
        name: 'Data Science Retainer',
        description: 'Ongoing data science and ML services',
        pricing: { base: this.MONTHLY_PRICES.retainers.dataScience },
        category: 'retainers',
        isMonthly: true
      },
      {
        id: 'retainer-data-engineering',
        name: 'Data Engineering Retainer',
        description: 'Ongoing data engineering and pipeline maintenance',
        pricing: { base: this.MONTHLY_PRICES.retainers.dataEngineering },
        category: 'retainers',
        isMonthly: true
      },
      {
        id: 'retainer-virtual-assistant',
        name: 'Virtual Assistant Retainer',
        description: 'Virtual assistant and administrative support',
        pricing: { base: this.MONTHLY_PRICES.retainers.virtualAssistant },
        category: 'retainers',
        isMonthly: true
      },
      {
        id: 'retainer-social-media',
        name: 'Social Media Retainer',
        description: 'Ongoing social media management and content',
        pricing: { base: this.MONTHLY_PRICES.retainers.socialMedia },
        category: 'retainers',
        isMonthly: true
      }
    ];
  }
}