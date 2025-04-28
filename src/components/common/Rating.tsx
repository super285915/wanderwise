import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  size = 'md',
  showValue = true,
  className = '',
}) => {
  const roundedValue = Math.round(value * 10) / 10;
  const fullStars = Math.floor(roundedValue);
  const hasHalfStar = roundedValue - fullStars >= 0.5;
  
  const sizeClasses = {
    sm: {
      container: 'text-xs',
      star: 'w-3 h-3',
    },
    md: {
      container: 'text-sm',
      star: 'w-4 h-4',
    },
    lg: {
      container: 'text-base',
      star: 'w-5 h-5',
    },
  };

  return (
    <div className={`flex items-center ${sizeClasses[size].container} ${className}`}>
      <div className="flex">
        {Array.from({ length: maxValue }).map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size].star} ${
              i < fullStars
                ? 'text-accent-500 fill-accent-500'
                : i === fullStars && hasHalfStar
                ? 'text-accent-500 fill-accent-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-1 font-medium text-gray-700">{roundedValue}</span>
      )}
    </div>
  );
};

export default Rating;