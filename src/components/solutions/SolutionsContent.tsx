'use client';

import React from 'react';
import { solutions } from '@/config/solutionsConfig';
import { Solution } from '@/types/solution';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@heroicons/react/24/outline';

const SolutionCard: React.FC<{ solution: Solution }> = ({ solution }) => {
  const isBeta = solution.status === 'beta';
  const isComingSoon = solution.status === 'coming-soon';

  return (
    <div className="premium-card group h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          {isBeta && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-blue-700 mb-4 uppercase tracking-wider">
              Beta Access
            </span>
          )}
          {isComingSoon && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-orange-50 text-orange-700 mb-4 uppercase tracking-wider">
              En Route
            </span>
          )}
          <h3 className="text-3xl font-space font-medium text-brand-black">{solution.name}</h3>
        </div>
      </div>

      <p className="text-lg text-brand-black/60 mb-8 flex-grow">
        {solution.description}
      </p>

      <div className="mb-8">
        <h4 className="text-sm font-mono font-semibold text-wg-green uppercase tracking-widest mb-4">Core Capabilities</h4>
        <ul className="grid grid-cols-1 gap-3">
          {solution.features.slice(0, 6).map((feature, index) => (
            <li key={index} className="flex items-start text-brand-black/70">
              <CheckIcon className="h-5 w-5 text-wg-green mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
        <div className="font-mono text-sm text-brand-black/40">
          {solution.pricing?.model === 'subscription' ? 'Usage-based Pricing' : 'Enterprise Access'}
        </div>

        <Button
          href="/contact"
          variant={isComingSoon ? 'outline' : 'primary'}
          size="sm"
        >
          {isComingSoon ? 'Get Notified' : 'Request Access'}
        </Button>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-wg-green/5 blur-3xl rounded-full group-hover:bg-wg-green/10 transition-colors duration-500"></div>
    </div>
  );
};

const SolutionsContent: React.FC = () => {
  return (
    <div className="mt-12 space-y-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>

      {/* Bespoke Request Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-wg-dark p-12 md:p-24 text-white">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-space mb-8">
            Looking for something tailored to your architecture?
          </h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed">
            Beyond our proprietary products, we build bespoke data systems and digital infrastructure for enterprise partners. Let's engineer your advantage.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="bg-white text-wg-dark hover:bg-gray-100">
            Schedule a Technical Audit
          </Button>
        </div>

        {/* Abstract shapes for premium feel */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.6C85.1,-29.8,89.3,-14.1,87.8,1.1C86.3,16.3,79,31,69.5,43.4C60,55.8,48.3,65.9,35.1,72.4C21.8,78.9,7,81.7,-8.4,79.8C-23.8,77.9,-39.8,71.3,-53.4,61.4C-67,51.5,-78.2,38.2,-83.4,22.8C-88.6,7.4,-87.8,-10.1,-81.4,-25.6C-75,-41.1,-63.1,-54.6,-49,-62C-34.9,-69.4,-18.5,-70.7,-1,-68.9C16.4,-67.1,31.3,-83.7,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SolutionsContent;