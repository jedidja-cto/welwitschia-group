// Hero Section Types
export interface ImagePlaceholder {
  description: string;
  suggestedType: string;
  aspectRatio: string;
  size: 'small' | 'medium' | 'large';
}

export interface CTAButton {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  imagePlaceholder?: ImagePlaceholder;
  ctaButton?: CTAButton;
  secondaryButton?: CTAButton;
  variant?: 'primary' | 'secondary' | 'minimal';
  videoSrc?: string;
}

// Page-specific hero configurations
export interface HeroConfig {
  homepage: HeroSectionProps;
  pricing: HeroSectionProps;
  services: Record<string, HeroSectionProps>;
  about: HeroSectionProps;
}