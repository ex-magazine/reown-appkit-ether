'use client';

import { useQuery } from '@tanstack/react-query';
import { getTrending } from '../../../service/fetchMovie';
import { Movie } from '@/types/movie.';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import MovieCard from '@/components/ether/movieapps/movieCard';
import { Skeleton } from '@/components/ether/movieapps/ui/skeleton';
import { Metadata } from '../Metadata';

const TrendingPage = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');

  const { data, isLoading } = useQuery({
    queryKey: ['trending', timeWindow],
    queryFn: () => getTrending('movie', timeWindow),
  });

  return (
    <>
      <Metadata
        seoTitle="Trending"
        seoDescription="Discover the most popular movies and TV shows right now."
        seoKeywords="trending, movies, tv shows"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 mt-16 flex flex-col items-start justify-between gap-6 md:flex-row">
            <div className="space-y-2">
              <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                Trending Now
              </h1>
              <p className="font-light text-slate-300">
                What's popular {timeWindow === 'day' ? 'today' : 'this week'}
              </p>
            </div>

            <div className="flex gap-2 rounded-full bg-slate-800 p-1">
              <button
                onClick={() => setTimeWindow('day')}
                className={cn(
                  'rounded-full px-6 py-2 transition-colors',
                  timeWindow === 'day'
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700',
                )}
              >
                Today
              </button>
              <button
                onClick={() => setTimeWindow('week')}
                className={cn(
                  'rounded-full px-6 py-2 transition-colors',
                  timeWindow === 'week'
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700',
                )}
              >
                This Week
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {[...Array(10)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-[2/3] rounded-xl bg-slate-800"
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {data?.results?.map((movie: Movie, index: number) => (
                <motion.div
                  key={movie.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrendingPage;
