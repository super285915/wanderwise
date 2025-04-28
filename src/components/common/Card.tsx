import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevation = 'medium',
  hover = false,
  onClick,
}) => {
  const elevationStyles = {
    none: '',
    low: 'shadow-sm',
    medium: 'shadow',
    high: 'shadow-md',
  };

  const hoverStyles = hover
    ? 'transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1'
    : '';

  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden ${elevationStyles[elevation]} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;