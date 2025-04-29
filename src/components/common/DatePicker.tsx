import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import dayjs from 'dayjs';

interface DatePickerProps {
  label?: string;
  selectedDate?: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  className?: string;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate = '',
  onChange,
  minDate = dayjs().format('YYYY-MM-DD'), // Default to today
  maxDate,
  className = '',
  placeholder = 'Select date',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? dayjs(selectedDate) : dayjs()
  );
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format the selected date for display
  const formattedDate = selectedDate
    ? dayjs(selectedDate).format('MMM DD, YYYY')
    : '';

  // Close the calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf('month').day(); // 0 is Sunday
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentMonth.date(day);
      const dateString = date.format('YYYY-MM-DD');
      const isSelected = dateString === selectedDate;
      const isToday = dateString === dayjs().format('YYYY-MM-DD');
      const isDisabled =
        (minDate && dateString < minDate) ||
        (maxDate && dateString > maxDate);

      days.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => {
            onChange(dateString);
            setIsOpen(false);
          }}
          className={`
            h-9 w-9 rounded-full flex items-center justify-center text-sm transition-colors
            ${isSelected
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : isToday
                ? 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                : 'hover:bg-gray-100'
            }
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  // Clear the selected date
  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          ref={inputRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full py-2.5 px-4 pl-10 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            bg-white cursor-pointer transition-all flex items-center justify-between
            ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}
          `}
        >
          <input
            type="text"
            readOnly
            value={formattedDate}
            placeholder={placeholder}
            className="bg-transparent border-none outline-none w-full cursor-pointer placeholder-gray-400"
          />
          {selectedDate && (
            <button
              type="button"
              onClick={clearDate}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Calendar
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />

        {/* Calendar Dropdown */}
        {isOpen && (
          <div
            ref={calendarRef}
            className="absolute z-10 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3 animate-fade-in"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <h3 className="text-sm font-medium text-gray-700">
                {currentMonth.format('MMMM YYYY')}
              </h3>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Calendar Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div
                  key={day}
                  className="h-9 w-9 flex items-center justify-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays()}
            </div>

            {/* Today Button */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  const today = dayjs().format('YYYY-MM-DD');
                  if (!minDate || today >= minDate) {
                    onChange(today);
                    setIsOpen(false);
                  }
                }}
                className="w-full py-1.5 text-sm text-primary-600 hover:text-primary-800 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;