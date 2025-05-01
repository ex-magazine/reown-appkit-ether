'use client';

import { useUserProfile } from '@/hooks/useUserProfile';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Play, X, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useWatchlistStore } from '@/store/useWatchListStore';
import { AddToWatchListButton } from '@/components/movieapps/AddWatchListButton';
import { Metadata } from '@/app/movieapps/Metadata';

export default function Page() {
  const {
    data: watchlist,
    isLoading,
    error,
  } = useUserProfile({
    queryType: 'watchlist',
  });
  const { removeFromWatchlist } = useWatchlistStore();

  if (error)
    return <div className="px-4 text-red-500">Error loading watchlist</div>;

  return (
    <>
      <Metadata
        seoTitle="Watchlist - Dashboard"
        seoDescription="Watchlist Histori Tontonan"
        seoKeywords="Watchlist, histori, tontonan"
      />

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <h1 className="mb-6 px-2 text-2xl font-bold sm:mb-8 sm:text-3xl md:text-4xl">
          My Watchlist
        </h1>

        {isLoading ? (
          <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-[2/3] w-full rounded-lg sm:rounded-xl"
              />
            ))}
          </div>
        ) : watchlist?.length > 0 ? (
          <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5">
            {watchlist?.map((movie: any) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onClickRemove={() => removeFromWatchlist(movie._id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center sm:py-20">
            <div className="mb-4 rounded-full bg-gray-800 p-4">
              <Calendar className="h-12 w-12 text-gray-400 sm:h-16 sm:w-16" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-300 sm:text-2xl">
              Your Watchlist is Empty
            </h2>
            <p className="max-w-md text-sm text-gray-400 sm:text-base">
              Start adding movies to watch later by clicking the "+ Watchlist"
              button on any movie page.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

const MovieCard = ({
  movie,
  onClickRemove,
}: {
  movie: any;
  onClickRemove: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative aspect-[2/3] w-full rounded-lg bg-gray-900 shadow-lg transition-shadow hover:shadow-xl sm:rounded-xl"
    >
      {/* Image Container */}
      <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl">
        <Image
          src={`https://image.tmdb.org/t/p/w780${movie.poster}`}
          alt={movie.title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Top Bar */}
        <div className="absolute left-0 right-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent p-2 sm:p-3">
          {/* Rating Badge */}
          <div className="flex items-center rounded-full bg-black/80 px-2 py-1 backdrop-blur-sm sm:px-3 sm:py-1">
            <Star className="mr-1 h-3 w-3 text-amber-400 sm:h-4 sm:w-4" />
            <span className="text-xs font-medium text-white sm:text-sm">
              {Number(movie.vote_average).toFixed(1)}
            </span>
          </div>

          {/* Remove Button */}
          <AddToWatchListButton item={movie} />
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 via-gray-900/20 via-50% to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 space-y-2 p-3 sm:space-y-3 sm:p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-white sm:text-base md:text-lg">
            {movie.title}
          </h3>

          <div className="flex items-center text-xs text-gray-300 sm:text-sm">
            <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            {new Date(movie.release_date).getFullYear()}
            <span className="mx-1 sm:mx-2">•</span>
            <span className="truncate">
              {movie.genres?.map((g: any) => g.name).join(', ')}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-2">
            <Link
              href={`/${movie.type}/${movie.movieId}`}
              className="rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-4 sm:py-2 sm:text-sm"
            >
              View Details
            </Link>
            <Link
              href={`/${movie.type}/${movie.movieId}/watch`}
              className="flex items-center justify-center rounded-lg bg-blue-500/85 p-2 transition-colors hover:bg-blue-600 sm:p-2.5"
            >
              <Play className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
