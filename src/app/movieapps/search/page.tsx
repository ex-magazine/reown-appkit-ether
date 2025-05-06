'use client';

import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Loader2,
  Filter,
  Film,
  Tv,
  Users,
  Layout,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getSearch, getSearchFilter } from '@/service/fetchMovie';
import MovieCardSkeleton from '@/components/ether/movieapps/MovieCardSkeleton';
import { Movie } from '@/types/movie.';
import MovieCard from '@/components/ether/movieapps/movieCard';
import { useStore } from '@/store/useStore';
import { useShallow } from 'zustand/react/shallow';
import CastsCard from '@/components/ether/movieapps/CastsCard';
import Link from 'next/link';
import { ScrollToTopButton } from '@/components/ether/movieapps/ScrollToTopButton';
import { Metadata } from '../Metadata';

const contentTypes = [
  { value: 'movie', label: 'Movies', icon: Film },
  { value: 'tv', label: 'TV Shows', icon: Tv },
  { value: 'person', label: 'People', icon: Users },
  { value: 'multi', label: 'All', icon: Layout },
];

const MemoizedSearchIcon = memo(Search);
const MemoizedClearIcon = memo(X);

const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { selectedType, setSelectedType } = useStore(
    useShallow((state) => ({
      selectedType: state.selectedType,
      setSelectedType: state.setSelectedType,
    })),
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ['searchMovies', debouncedQuery, selectedType, page],
    queryFn: () =>
      getSearchFilter(debouncedQuery, selectedType, page.toString()),
    enabled: debouncedQuery.length > 3,
    staleTime: 5 * 60 * 1000,
  });

  // Debounce search input
  useEffect(() => {
    if (searchQuery.length <= 3) {
      setDebouncedQuery('');
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset page when search query changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const allMovies = useMemo(() => {
    if (!data?.results) return [];

    const movieSet = new Set();
    return data.results.filter((movie: Movie) => {
      if (movieSet.has(movie.id)) return false;
      movieSet.add(movie.id);
      return true;
    });
  }, [data?.results]);

  // let typeSearch; // Declare typeSearch outside the conditional

  const typeSearch = useMemo(() => {
    switch (selectedType) {
      case 'movie':
        return '🎬';
      case 'tv':
        return '📺';
      case 'person':
        return '👤';
      default:
        return '🔍';
    }
  }, [selectedType]);

  // Gunakan useCallback agar fungsi tidak dibuat ulang di setiap render
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const totalPages = data?.total_pages || 0;
  const currentPage = page;

  const paginationRange = useMemo(() => {
    const range = [];
    const maxPages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  }, [currentPage, totalPages]);

  return (
    <>
      <Metadata
        seoTitle="Search"
        seoDescription={`Discover ${typeSearch} results for "${searchQuery}"`}
        seoKeywords={`search, ${searchQuery}, ${selectedType}`}
      />
      <div className="min-h-screen bg-slate-900">
        {/* Search Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 bg-slate-800 shadow-xl"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="relative mx-auto max-w-2xl">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {searchQuery ? (
                  <MemoizedClearIcon
                    onClick={handleClear}
                    className="h-5 w-5 cursor-pointer stroke-slate-400 text-slate-400 transition-all duration-200"
                  />
                ) : (
                  <MemoizedSearchIcon className="h-5 w-5 text-slate-400" />
                )}
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder={`Search ${selectedType}...`}
                className="w-full rounded-lg bg-slate-700 py-3 pl-10 pr-4 text-white placeholder-slate-400 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                autoFocus
              />
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="grid grid-cols-4 gap-2 rounded-lg bg-slate-700/50 p-1">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => {
                  setSelectedType(type.value);
                  setPage(1);
                }}
                className={`flex flex-col items-center justify-center gap-2 rounded-lg p-3 transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-lg'
                    : 'text-slate-400 hover:bg-slate-600/50 hover:text-slate-200'
                } `}
              >
                <Icon
                  className={`h-5 w-5 ${isSelected ? 'text-cyan-400' : ''}`}
                />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {!debouncedQuery ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-slate-400"
              >
                <div className="mb-4 text-4xl">{typeSearch}</div>
                <p className="text-xl">{`Start typing to search ${selectedType} `}</p>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {[...Array(10)].map((_, index) => (
                  <MovieCardSkeleton key={index} />
                ))}
              </motion.div>
            ) : isError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-red-400"
              >
                <div className="mb-4 text-4xl">⚠️</div>
                <p className="mb-4 text-xl">Failed to load search results</p>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-lg bg-red-500/20 px-6 py-2 transition-colors hover:bg-red-500/30"
                >
                  Try Again
                </button>
              </motion.div>
            ) : data?.results?.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-slate-400"
              >
                <div className="mb-4 text-4xl">🔍</div>
                <p className="text-xl">
                  No results found for "{debouncedQuery}"
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {allMovies.map((movie: Movie, index: number) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {(selectedType === 'multi' &&
                      movie.media_type === 'person') ||
                    selectedType === 'person' ? (
                      <CastsCard numberOrder={false} member={movie} />
                    ) : (
                      <MovieCard movie={movie} />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {data?.total_pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {paginationRange.map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={isLoading}
                  className={`h-10 min-w-[2.5rem] rounded-lg transition-colors ${
                    pageNum === currentPage
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-slate-800 text-slate-400 hover:text-cyan-400'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default SearchResultsPage;
