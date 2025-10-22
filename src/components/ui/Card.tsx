import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'elevated';
  withHover?: boolean;
  icon?: React.ReactNode;
};

export const Card = ({
  children,
  className = '',
  variant = 'default',
  withHover = false,
  icon,
}: CardProps) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-200 ease-out';
  
  const variants = {
    default: 'bg-white',
    outline: 'border border-gray-200',
    elevated: 'bg-white shadow-sm',
  };
  
  const hoverStyles = withHover ? 'hover:shadow-md hover:scale-[1.02]' : '';
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {icon && <div className="mb-4 text-wg-green">{icon}</div>}
      {children}
    </div>
  );
};

export default Card;