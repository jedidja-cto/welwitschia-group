'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { HeroSectionProps, ImagePlaceholder, CTAButton } from '../../types/hero';

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  imagePlaceholder,
  ctaButton,
  secondaryButton,
  variant = 'primary',
  videoSrc
}) => {
  // Determine container classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'min-h-[60vh] flex items-center bg-gray-50';
      case 'minimal':
        return 'min-h-[40vh] flex items-center bg-white';
      default:
        return 'min-h-[90vh] md:min-h-screen flex items-center';
    }
  };

  // Render background media (video or image)
  const renderBackgroundMedia = () => {
    if (variant === 'secondary' || variant === 'minimal') {
      return null;
    }

    if (videoSrc) {
      return (
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
      );
    }

    if (backgroundImage) {
      return (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
      );
    }

    // Default premium tech background with animated elements
    return (
      <div className="absolute inset-0 z-0 bg-wg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wg-dark via-[#0a1a10] to-black"></div>
        <div className="absolute inset-0 opacity-20 animate-gradient-x bg-[length:200%_200%] bg-gradient-to-tr from-wg-green via-transparent to-wg-orange"></div>

        {/* Abstract grid/tech elements */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        {/* Large slow blurs */}
        <div className="absolute -top-1/4 -right-1/4 w-[80%] h-[80%] bg-wg-green/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[60%] h-[60%] bg-wg-orange/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    );
  };

  return (
    <section
      role="region"
      aria-label="Hero section"
      className={`relative w-full overflow-hidden ${getVariantClasses()}`}
    >
      {renderBackgroundMedia()}

      <div className="relative z-10 container-wide py-24">
        <div className="max-w-4xl">
          <h1 className={`${variant === 'primary' ? 'text-white' : 'text-brand-black'} animate-fade-in-up`}>
            {title}
          </h1>
          <p
            className={`mt-8 text-xl md:text-2xl max-w-2xl ${variant === 'primary' ? 'text-white/80' : 'text-brand-black/60'} animate-fade-in-up`}
            style={{ animationDelay: '0.2s' }}
          >
            {subtitle}
          </p>

          {(ctaButton || secondaryButton) && (
            <div
              className="mt-12 flex flex-wrap items-center gap-6 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              {ctaButton && (
                <Button
                  variant={ctaButton.variant || 'primary'}
                  href={ctaButton.href}
                  onClick={ctaButton.onClick}
                  size="lg"
                >
                  {ctaButton.text}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  variant={secondaryButton.variant || 'outline'}
                  href={secondaryButton.href}
                  onClick={secondaryButton.onClick}
                  size="lg"
                  className={variant === 'primary' ? 'border-white text-white hover:bg-white hover:text-wg-dark' : ''}
                >
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Subtle indicator for primary variant */}
      {variant === 'primary' && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;