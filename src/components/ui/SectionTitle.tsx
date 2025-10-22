import React from 'react';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  withAccent?: boolean;
};

export const SectionTitle = ({
  title,
  subtitle,
  align = 'left',
  className = '',
  withAccent = false,
}: SectionTitleProps) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 ${alignments[align]} ${className}`}>
      {withAccent && (
        <div className={`h-1 w-16 bg-wg-green rounded mb-4 ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}></div>
      )}
      <h2 className="text-3xl md:text-4xl font-medium text-wg-dark mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;