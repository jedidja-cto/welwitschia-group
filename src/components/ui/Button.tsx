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
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-wg-green text-white hover:bg-wg-dark hover:shadow-md focus-visible:ring-wg-green',
    secondary: 'bg-wg-orange text-white hover:bg-wg-orange/80 hover:shadow-md focus-visible:ring-wg-orange',
    outline: 'border-2 border-wg-green text-wg-green hover:bg-wg-green/10 hover:shadow-sm focus-visible:ring-wg-green',
  };
  
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 py-2.5',
    lg: 'h-12 px-8 py-3 text-lg',
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