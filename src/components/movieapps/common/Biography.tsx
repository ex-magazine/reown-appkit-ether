'use client';

import React, { useState, useRef, useEffect } from 'react';

const BiographySection = ({ biography }: { biography: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState('auto');
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const maxLength = 300;

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isExpanded ? `${scrollHeight}px` : '120px');
    }
  }, [isExpanded, biography]);

  if (!biography || biography === 'Biography not available') {
    return (
      <p className="text-lg leading-relaxed text-gray-300 dark:text-gray-300">
        Biography not available
      </p>
    );
  }

  const shouldShowButton = biography.length > maxLength;

  return (
    <div className="space-y-2">
      <div
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{ height }}
      >
        <p
          ref={contentRef}
          className="text-lg leading-relaxed text-gray-300 dark:text-gray-300"
        >
          {biography}
        </p>
      </div>

      {shouldShowButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm font-medium text-purple-400 transition-colors duration-200 hover:text-purple-300"
        >
          {isExpanded ? (
            <>
              Show Less
              <svg
                className="h-4 w-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          ) : (
            <>
              View Full Biography
              <svg
                className="h-4 w-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default BiographySection;
