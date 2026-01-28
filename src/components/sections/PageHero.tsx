'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
    variant?: 'green' | 'dark' | 'glass';
}

export const PageHero: React.FC<PageHeroProps> = ({
    title,
    subtitle,
    ctaText,
    ctaHref,
    variant = 'green'
}) => {
    const bgStyles = {
        green: 'bg-wg-green text-white',
        dark: 'bg-wg-dark text-white',
        glass: 'bg-white text-brand-black'
    };

    return (
        <section className={`relative overflow-hidden py-32 md:py-48 ${bgStyles[variant]}`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent"></div>
                <div className="grid grid-cols-6 h-full border-l border-white/20">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border-r border-white/10 h-full"></div>
                    ))}
                </div>
            </div>

            <div className="container-wide relative z-10">
                <div className="max-w-4xl">
                    <h1 className="animate-fade-in-up">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-8 text-xl md:text-2xl max-w-2xl opacity-80 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {subtitle}
                        </p>
                    )}
                    {ctaText && ctaHref && (
                        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <Button href={ctaHref} variant={variant === 'glass' ? 'primary' : 'outline'} className={variant !== 'glass' ? 'border-white text-white hover:bg-white hover:text-wg-dark' : ''}>
                                {ctaText}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PageHero;
