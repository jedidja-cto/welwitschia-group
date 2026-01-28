'use client';

import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-wg-green text-white hover:bg-wg-dark hover:shadow-lg hover:shadow-wg-green/20 focus-visible:ring-wg-green',
    secondary: 'bg-white border border-gray-200 text-brand-black hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400',
    outline: 'border-2 border-wg-green text-wg-green hover:bg-wg-green hover:text-white focus-visible:ring-wg-green',
  };

  const sizes = {
    sm: 'h-10 px-6 text-sm',
    md: 'h-12 px-8 py-3',
    lg: 'h-14 px-10 py-4 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
