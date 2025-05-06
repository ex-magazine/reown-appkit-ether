'use client';

import { memo, useMemo, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getPopularCasts } from '../../../service/fetchMovie';
import { ChevronRight, Film, Filter, Loader, Tv } from 'lucide-react';
import { PopularityChart } from '@/components/ether/movieapps/PopularityChart';
import { NetworkGraph } from '@/components/ether/movieapps/NetworkGraph';
import Link from 'next/link';
import { Metadata } from '../Metadata';

export type Person = {
  id: number;
  name: string;
  profile_path: string;
  popularity: any;
  known_for_department: string;
  known_for: Array<{
    title?: string;
    name?: string;
    media_type: string;
    poster_path?: string;
  }>;
};

type ViewMode = 'simple' | 'detailed';

const StatBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) => (
  <div
    className={`rounded-lg border bg-gray-700 p-2 md:p-3 border-${color}-500/20`}
  >
    <div className="text-xs text-gray-400 md:text-sm">{label}</div>
    <div className={`text-base font-semibold md:text-lg text-${color}-400`}>
      {value}
    </div>
  </div>
);

const WorkThumbnail = ({ work }: { work: any }) => (
  <div className="relative h-28 w-20 overflow-hidden rounded-md border border-gray-600 md:h-32 md:w-24">
    <Image
      src={`https://image.tmdb.org/t/p/w200${work?.poster_path}`}
      alt={work.title || work.name || ''}
      fill
      className="object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-2">
      <span className="line-clamp-1 text-xs font-medium text-white">
        {work.title || work.name}
      </span>
    </div>
  </div>
);

const HighlightPerson = ({ person }: { person: Person }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900"
    >
      <div className="flex flex-col items-center gap-4 p-4 md:flex-row md:gap-6 md:p-6">
        <Link
          href={`/person/${person.id}`}
          className="relative h-24 w-24 overflow-hidden rounded-lg transition-transform hover:scale-105 md:h-32 md:w-32"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            fill
            className="object-cover"
            loading="eager"
          />
        </Link>

        <div className="flex-1 space-y-3 md:space-y-4">
          <h1 className="text-xl font-bold text-gray-100 md:text-2xl">
            {person.name}
          </h1>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <StatBox
              label="Popularity"
              value={person.popularity.toFixed(0)}
              color="purple"
            />
            <StatBox
              label="Department"
              value={person.known_for_department}
              color="blue"
            />
            <StatBox
              label="Works"
              value={person.known_for.length}
              color="pink"
            />
          </div>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
            {person.known_for.slice(0, 4).map((work, index) => (
              <WorkThumbnail key={index} work={work} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PersonCard = memo(
  ({ person, viewMode }: { person: Person; viewMode: ViewMode }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg border border-gray-700 bg-gray-800 transition-all hover:border-purple-500/40"
      >
        <div className="space-y-3 p-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/person/${person.id}`}
              className="relative h-12 w-12 overflow-hidden rounded-md"
            >
              <Image
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : '/placeholder-dark.png'
                }
                alt={person.name}
                fill
                className="object-cover"
                loading="lazy"
              />
            </Link>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-100">{person.name}</h3>
              <div className="mt-1 h-1 w-full rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${Math.min(person.popularity, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {viewMode === 'detailed' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-purple-400">
                <span>Top {Math.ceil(person.popularity / 10)}%</span>
              </div>

              <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                {person.known_for.slice(0, 2).map((work, index) => (
                  <WorkThumbnail key={index} work={work} />
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/person/${person.id}`}
            className="group flex items-center justify-center gap-1 text-sm text-purple-400 transition-colors hover:text-purple-300"
          >
            View Profile
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    );
  },
);

const MemoizedFilterIcon = memo(Filter);

const DepartmentButton = memo(
  ({
    dept,
    isSelected,
    onClick,
  }: {
    dept: string;
    isSelected: boolean;
    onClick: (dept: string) => void;
  }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(dept)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all ${isSelected
          ? 'border-transparent bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
          : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
      >
        <MemoizedFilterIcon className="shrink-0" />
        {dept}
      </motion.button>
    );
  },
);

const DepartmentFilter = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (s: string) => void;
}) => {
  const departments = ['Acting', 'Directing', 'Production', 'Writing', 'Sound'];

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <motion.button
            key={dept}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(dept === selected ? '' : dept)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${selected === dept
              ? 'bg-purple-600/90 text-white'
              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
          >
            {dept}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const ViewToggle = memo(
  ({
    viewMode,
    setViewMode,
  }: {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
  }) => (
    <div className="flex gap-1 rounded-full border border-gray-700 bg-gray-800 p-1">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setViewMode('simple')}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${viewMode === 'simple'
          ? 'bg-gray-700 text-purple-400'
          : 'text-gray-400 hover:bg-gray-700/50'
          }`}
      >
        <Film className="h-4 w-4" />
        Simple
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setViewMode('detailed')}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${viewMode === 'detailed'
          ? 'bg-gray-700 text-blue-400'
          : 'text-gray-400 hover:bg-gray-700/50'
          }`}
      >
        <Tv className="h-4 w-4" />
        Detailed
      </motion.button>
    </div>
  ),
);

// Add page parameter to the query function
const fetchPopularPeople = async ({ pageParam = 1 }) => {
  const data = await getPopularCasts(String(pageParam));
  return {
    results: data.results,
    total_pages: data.total_pages,
    page: pageParam,
  };
};
export default function PopularPeoplePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('simple');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['popularPeople'],
    queryFn: fetchPopularPeople,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into single array
  const allPeople = data?.pages.flatMap((page) => page.results) || [];
  const filteredPeople = selectedDepartment
    ? allPeople.filter((p) => p.known_for_department === selectedDepartment)
    : allPeople;

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState />;

  return (
    <>
      <Metadata
        seoTitle="Popular Actors"
        seoDescription="Discover the most popular and trending actors in the movie industry, from Hollywood legends to rising stars."
        seoKeywords="popular actors, famous movie stars, best Hollywood actors, trending film stars, award-winning actors, top movie stars, rising actors in film"
      />

      <div className="min-h-screen bg-gray-900 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6 pt-[5rem] md:space-y-8">
          {allPeople.length > 0 && <HighlightPerson person={allPeople[0]} />}

          <DepartmentFilter
            selected={selectedDepartment}
            setSelected={setSelectedDepartment}
          />

          <div className="grid gap-6 rounded-xl bg-gray-800 p-4 lg:grid-cols-2">
            <PopularityChart people={filteredPeople} />
            <NetworkGraph people={filteredPeople} />
          </div>

          <div className="space-y-5">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
              <h2 className="text-lg font-bold text-gray-100 md:text-xl">
                {selectedDepartment || 'All'} Stars
                <span className="ml-2 text-purple-400">
                  ({filteredPeople.length})
                </span>
              </h2>
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {filteredPeople.slice(1).map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    viewMode={viewMode}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2 text-gray-100 transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : hasNextPage ? (
                  'Load More'
                ) : (
                  'End of List'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Add loading skeleton component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="h-96 animate-pulse rounded-2xl border border-dashed border-gray-300 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:border-gray-700" />
      <div className="h-12 w-1/3 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    </div>
  </div>
);

// Add error state component
const ErrorState = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="max-w-2xl p-8 text-center">
      <div className="mb-4 text-6xl text-red-500">⚠️</div>
      <h2 className="mb-4 text-2xl font-bold dark:text-white">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        We're having trouble loading the data. Please check your internet
        connection or try refreshing the page.
      </p>
    </div>
  </div>
);
