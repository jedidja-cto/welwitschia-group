import { HeroSectionProps } from '../types/hero';

// Predefined hero configurations for different pages
export const heroConfigs: Record<string, HeroSectionProps> = {
  homepage: {
    title: "We design digital products and data systems for growing African businesses",
    subtitle: "Websites, web apps, data analytics, and creative assets delivered by a remote‑first team.",
    videoSrc: "/14946693_1080_1920_60fps.mp4",
    variant: "primary",
    ctaButton: {
      text: "Get Started",
      href: "/contact#contact",
      variant: "primary"
    },
    secondaryButton: {
      text: "Talk to Us",
      href: "/contact#contact",
      variant: "outline"
    }
  },

  pricing: {
    title: "Transparent Pricing for Every Business",
    subtitle: "Get instant estimates with our interactive pricing calculator. No hidden fees, no surprises.",
    variant: "secondary",
    backgroundImage: "/begin_your_project.jpg",
    ctaButton: {
      text: "Calculate Your Project",
      href: "#pricing-calculator",
      variant: "primary"
    }
  },

  about: {
    title: "Remote-First Team, Global Impact",
    subtitle: "Meet the passionate professionals behind Welwitschia Data, dedicated to scaling your business through innovative technology solutions.",
    variant: "primary",
    backgroundImage: "/begin_your_project.jpg",
    ctaButton: {
      text: "Work With Us",
      href: "/contact",
      variant: "primary"
    },
    secondaryButton: {
      text: "View Careers",
      href: "/careers",
      variant: "outline"
    }
  },

  // Service page configurations
  webDesign: {
    title: "Professional Website Design",
    subtitle: "Custom websites that convert visitors into customers, built with modern technology and optimized for performance.",
    variant: "secondary",
    backgroundImage: "/services.jpg",
    ctaButton: {
      text: "Start Your Project",
      href: "/contact",
      variant: "primary"
    }
  },

  webApplications: {
    title: "Web Applications & Mobile Solutions",
    subtitle: "Scalable web applications and mobile solutions that streamline your business operations and enhance user experience.",
    variant: "secondary",
    backgroundImage: "/services.jpg",
    ctaButton: {
      text: "Discuss Your App",
      href: "/contact",
      variant: "primary"
    }
  },

  dashboardDesign: {
    title: "Executive Dashboard Design",
    subtitle: "Data-driven dashboards that provide actionable insights and help you make informed business decisions.",
    variant: "secondary",
    backgroundImage: "/case_studies.jpg",
    ctaButton: {
      text: "View Dashboard Examples",
      href: "/contact",
      variant: "primary"
    }
  },

  dataAnalytics: {
    title: "Data Analytics & Business Intelligence",
    subtitle: "Transform your data into actionable insights with advanced analytics and custom reporting solutions.",
    variant: "secondary",
    backgroundImage: "/case_studies.jpg",
    ctaButton: {
      text: "Explore Analytics",
      href: "/contact",
      variant: "primary"
    }
  },

  dataScience: {
    title: "Data Science & Machine Learning",
    subtitle: "Leverage the power of machine learning and predictive analytics to gain competitive advantages.",
    variant: "secondary",
    backgroundImage: "/case_studies.jpg",
    ctaButton: {
      text: "Discuss ML Solutions",
      href: "/contact",
      variant: "primary"
    }
  },

  dataEngineering: {
    title: "Data Engineering Solutions",
    subtitle: "Build robust data pipelines and infrastructure that scale with your business needs.",
    variant: "secondary",
    backgroundImage: "/case_studies.jpg",
    ctaButton: {
      text: "Plan Your Infrastructure",
      href: "/contact",
      variant: "primary"
    }
  },

  socialMediaManagement: {
    title: "Social Media Management",
    subtitle: "Strategic social media management that builds your brand presence and engages your target audience.",
    variant: "secondary",
    backgroundImage: "/mavedo_communications.png",
    ctaButton: {
      text: "Boost Your Presence",
      href: "/contact",
      variant: "primary"
    }
  },

  training: {
    title: "Corporate Training & Workshops",
    subtitle: "Empower your team with cutting-edge skills in technology, data analysis, and digital transformation.",
    variant: "secondary",
    backgroundImage: "/services.jpg",
    ctaButton: {
      text: "Schedule Training",
      href: "/contact",
      variant: "primary"
    }
  }
};