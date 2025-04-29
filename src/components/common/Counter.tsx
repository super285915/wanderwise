import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  label,
  className = '',
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={`flex items-center justify-center w-8 h-8 rounded-full border ${
            value <= min
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Minus size={16} />
        </button>
        <span className="mx-3 min-w-8 text-center">{value}</span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={`flex items-center justify-center w-8 h-8 rounded-full border ${
            value >= max
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Counter;