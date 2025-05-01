'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/movieapps/utils';

interface FilterSectionProps {
  title: string;
  options: Array<{ value: string; label: string }>;
  selected: string | string[];
  onChange: (value: string) => void;
  resetValue?: string;
}

export const FilterSection = ({
  title,
  options,
  selected,
  onChange,
  resetValue = '',
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic display text calculation
  const displayText = useCallback(() => {
    if (selected) {
      return options.find((opt) => opt.value === selected)?.label || title;
    }
    return title;
  }, [selected, title, options]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleSelect = (value: string) => {
    onChange(value === '__RESET__' ? resetValue : value);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(resetValue);
  };

  return (
    <div className="relative w-full max-w-[170px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between px-4 py-2 text-sm',
          'rounded-xl bg-gray-700/80 dark:bg-gray-800',
          'transition-all',
          'focus:ring-primary-500/30 focus:outline-none focus:ring-2',
          'group relative duration-200 ease-out',
          isOpen && 'ring-primary-500/30 ring-2'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'truncate text-left transition-colors',
            selected
              ? 'font-medium text-gray-100 dark:text-white'
              : 'text-gray-300 dark:text-gray-400'
          )}
        >
          {displayText()}
        </span>

        <div className="ml-2 flex items-center gap-2">
          {selected && selected !== resetValue && (
            <button
              onClick={handleClear}
              className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
            </button>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''} text-gray-400`}
          />
        </div>
      </button>

      <div
        className={cn(
          'absolute z-50 mt-2 w-full rounded-xl bg-gray-700/80 shadow-lg dark:bg-gray-800',
          'origin-top transform transition-all duration-200 ease-out',
          isOpen
            ? 'scale-y-100 opacity-100'
            : 'pointer-events-none scale-y-95 opacity-0',
          'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent max-h-60 overflow-y-auto'
        )}
        role="listbox"
      >
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full px-4 py-3 text-left text-sm text-gray-400',
                'flex items-center justify-between',
                'hover:bg-primary-50/50 transition-colors dark:hover:bg-gray-700/50',
                'text-gray-100 dark:text-gray-200',
                selected === option.value &&
                  'bg-primary-50/30 font-medium dark:bg-gray-700/30'
              )}
              role="option"
              aria-selected={selected === option.value}
            >
              <span>{option.label}</span>
              {selected === option.value && (
                <Check className="text-primary-500 h-4 w-4 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const genres = [
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '27', label: 'Horror' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

export const years = [
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
];

export const lang = [
  { value: 'en', label: 'English' },
  { value: 'id', label: 'Indonesia' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Mandarin' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'ru', label: 'Russian' },
];

export const ratings = [
  { value: '0', label: 'Semua' },
  { value: '1', label: '⭐' },
  { value: '2', label: '⭐⭐' },
  { value: '3', label: '⭐⭐⭐' },
  { value: '4', label: '⭐⭐⭐⭐' },
  { value: '5', label: '⭐⭐⭐⭐⭐' },
];

export const types = [
  { value: 'all', label: 'Semua' },
  { value: 'movie', label: 'Film' },
  { value: 'tv', label: 'TV Show' },
];
