// components/Upcoming.tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
import { getUpcomingShow } from '../../../service/fetchMovie';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/types/movie.';
import MovieCard from '@/components/ether/movieapps/movieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from '../Metadata';

const Upcoming = () => {
  const [type, setType] = useState<'movie' | 'tv'>('movie');
  const [page, setPage] = useState(1);
  const [releaseFilter, setReleaseFilter] = useState<'all' | 'month'>('all');

  // Fungsi untuk menghitung rentang tanggal
  const getDateRange = () => {
    const today = new Date(); // Tanggal hari ini
    const startDate = new Date(today); // Salin objek agar tidak terpengaruh
    const endDate = new Date(today); // Buat salinan baru untuk endDate

    endDate.setDate(today.getDate() + 30); // Tambahkan 30 hari dari hari ini

    return {
      start: startDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      end: endDate.toISOString().split('T')[0], // Format YYYY-MM-DD
    };
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['upcoming', type, page, releaseFilter],
    queryFn: () => {
      const params =
        releaseFilter === 'month' && type === 'movie' ? getDateRange() : {};
      return getUpcomingShow(type, page.toString(), params);
    },
    staleTime: 5000,
  });

  const handleTypeChange = (newType: 'movie' | 'tv') => {
    setPage(1);
    setType(newType);
  };

  const handleFilterChange = (filter: 'all' | 'month') => {
    setPage(1);
    setReleaseFilter(filter);
  };

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
        <div className="text-xl text-red-500">
          Error: {(error as Error).message}
        </div>
      </div>
    );
  }

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
        seoTitle="Upcoming"
        seoDescription="Upcoming movies and TV shows"
        seoKeywords="upcoming, movies, tv shows"
      />

      <section className="min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-10 mt-12 flex flex-col items-center justify-between gap-4 px-4 pt-11 md:flex-col">
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-center text-4xl font-bold text-transparent">
              Upcoming {type === 'movie' ? 'Movies' : 'TV Shows'}
            </h1>
            <div className="flex flex-row items-end gap-4">
              <div className="flex gap-2 rounded-full bg-slate-800 p-1">
                <Button
                  onClick={() => handleTypeChange('movie')}
                  className={cn(
                    'rounded-full px-6 py-2 transition-colors',
                    type === 'movie'
                      ? 'bg-cyan-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700',
                  )}
                >
                  Movie
                </Button>
                <Button
                  onClick={() => handleTypeChange('tv')}
                  className={cn(
                    'rounded-full px-6 py-2 transition-colors',
                    type === 'tv'
                      ? 'bg-cyan-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700',
                  )}
                >
                  TV/Show
                </Button>
              </div>
              {type === 'movie' && (
                <div className="flex gap-2 rounded-full bg-slate-800 p-1">
                  <Button
                    onClick={() => handleFilterChange('all')}
                    className={cn(
                      'rounded-full px-6 py-2 transition-colors',
                      releaseFilter === 'all'
                        ? 'bg-cyan-500 text-white'
                        : 'text-slate-300 hover:bg-slate-700',
                    )}
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => handleFilterChange('month')}
                    className={cn(
                      'rounded-full px-6 py-2 transition-colors',
                      releaseFilter === 'month'
                        ? 'bg-cyan-500 text-white'
                        : 'text-slate-300 hover:bg-slate-700',
                    )}
                  >
                    Month
                  </Button>
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {[...Array(8)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-[2/3] rounded-xl bg-slate-800"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {data?.results?.map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <div className="mt-12 flex justify-center gap-4 text-black">
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
                    className={`h-10 min-w-[2.5rem] rounded-lg transition-colors ${pageNum === currentPage
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
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Upcoming;
