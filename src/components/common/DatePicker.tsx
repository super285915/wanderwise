import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  label?: string;
  selectedDate?: string;
  onChange: (date: string) => void;
  minDate?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate = '',
  onChange,
  minDate = new Date().toISOString().split('T')[0], // Default to today
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          min={minDate}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full py-2 px-4 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white appearance-none transition-all ${
            isFocused ? 'ring-2 ring-primary-500 border-primary-500' : ''
          }`}
        />
        <Calendar
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
};

export default DatePicker;