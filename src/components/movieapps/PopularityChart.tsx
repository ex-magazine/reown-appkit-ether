'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Person } from '@/app/person/page';
import useIsMobile from '@/hooks/useIsMobile';

export const PopularityChart = ({ people }: { people: Person[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const maxPopularity = Math.max(...people.map((p) => p.popularity));

  // Responsive dimensions
  const chartHeight = isMobile ? 260 : 340;
  const barWidth = isMobile ? 28 : 36;
  const spacing = isMobile ? 12 : 20;
  const maxBarsVisible = isMobile ? 8 : 12;

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-100">
        Popularity Distribution
      </h3>

      <div className="relative h-[300px] overflow-x-auto pb-3 sm:h-[360px]">
        <svg
          width={Math.max(800, people.length * (barWidth + spacing))}
          height={chartHeight}
          className="h-full w-full"
        >
          {/* Grid lines */}
          <g>
            {[0, 25, 50, 75, 100].map((percent, i) => {
              const y = chartHeight - 40 - (percent / 100) * (chartHeight - 60);
              return (
                <g key={i}>
                  <line
                    x1="60"
                    x2="100%"
                    y1={y}
                    y2={y}
                    className="stroke-gray-700"
                    strokeWidth="0.5"
                  />
                  <text x="50" y={y + 4} className="fill-gray-400 text-xs">
                    {Math.round((percent / 100) * maxPopularity)}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Bars */}
          {people.slice(0, maxBarsVisible).map((person, index) => {
            const barHeight =
              (person.popularity / maxPopularity) * (chartHeight - 60);
            const x = 80 + index * (barWidth + spacing);
            const y = chartHeight - 40 - barHeight;

            return (
              <g
                key={person.id}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={() => setActiveIndex(index)}
                className="cursor-pointer"
              >
                <motion.rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  className="fill-purple-500"
                  rx="4"
                  initial={{ height: 0 }}
                  animate={{ height: barHeight }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                />

                {/* Name label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 20}
                  className="fill-gray-300 text-[10px]"
                  textAnchor="middle"
                  transform={`rotate(45 ${x + barWidth / 2} ${chartHeight - 20})`}
                >
                  {person.name.split(' ')[0]}
                </text>
              </g>
            );
          })}

          {/* Active indicator */}
          {activeIndex !== null && (
            <g
              transform={`translate(${80 + activeIndex * (barWidth + spacing)},0)`}
            >
              <rect
                x={barWidth / 2 - 1}
                y={0}
                width="2"
                height={chartHeight - 40}
                className="fill-purple-400"
              />
              <circle
                cx={barWidth / 2}
                cy={
                  chartHeight -
                  40 -
                  (people[activeIndex].popularity / maxPopularity) *
                    (chartHeight - 60)
                }
                r="4"
                className="fill-purple-400"
              />
            </g>
          )}
        </svg>

        {/* Axis labels */}
        <div className="absolute bottom-14 left-0 origin-left -rotate-90 text-xs text-gray-400">
          Popularity Score
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">
          Celebrities
        </div>
      </div>

      {/* Simplified Legend */}
      <div className="mt-4 flex justify-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-purple-500" />
          <span className="text-xs text-gray-300">Popularity Score</span>
        </div>
      </div>

      {isMobile && (
        <div className="pt-2 text-center text-xs text-gray-400">
          ← Scroll to explore →
        </div>
      )}
    </div>
  );
};
