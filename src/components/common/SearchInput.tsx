import React, { useState, useEffect, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import VoiceSearch from './VoiceSearch';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  suggestions?: string[];
  label?: string;
  isLoading?: boolean;
  debounceTime?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search destinations',
  onSearch,
  className = '',
  suggestions = [],
  label,
  isLoading = false,
  debounceTime = 300,
}) => {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedValue = useDebounce(value, debounceTime);

  useEffect(() => {
    if (debouncedValue && onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.length > 0 && suggestions.length > 0) {
      const filtered = suggestions.filter(
        suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    }
    setShowSuggestions(false);
  };

  const handleVoiceResult = (text: string) => {
    setValue(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          className={`w-full px-4 py-3 pl-10 pr-12 bg-white border rounded-lg transition-all duration-200
            ${isFocused 
              ? 'border-primary-500 ring-2 ring-primary-500/20' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${value ? 'bg-white' : 'bg-gray-50'}
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            if (value.length > 0 && filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          aria-label={placeholder}
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
        />
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isFocused ? 'text-primary-500' : 'text-gray-400'
          }`}
          size={18}
          aria-hidden="true"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isLoading && (
            <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
          )}
          <VoiceSearch onResult={handleVoiceResult} />
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          id="search-suggestions"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-primary-50 hover:text-primary-600 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={value === suggestion}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;