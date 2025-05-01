'use client';

import { useUserProfile } from '@/hooks/useUserProfile';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Play, Star, X, Calendar, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { AddFavoriteButton } from '@/components/movieapps/AddFavoriteButton';
import { Metadata } from '@/app/Metadata';

const FavoriteCard = ({
  movie,
  onClickRemove,
}: {
  movie: any;
  onClickRemove: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-xl transition-all duration-300 ease-out hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={`https://image.tmdb.org/t/p/w780${movie.imagePath}`}
          alt={movie.title}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent via-20% to-transparent" />

        {/* Top Right Actions - Adjusted for mobile */}
        <div className="absolute right-2 top-2 flex items-center gap-1.5">
          <div className="flex items-center rounded-full bg-gray-800/90 px-2 py-1 text-xs backdrop-blur-sm sm:text-sm">
            <Star className="mr-1 h-3 w-3 text-amber-400 sm:h-4 sm:w-4" />
            <span className="font-medium text-white">
              {Number(movie.vote_average).toFixed(1)}
            </span>
          </div>

          <AddFavoriteButton item={movie} />
        </div>
      </div>

      {/* Content Section - Adjusted padding for mobile */}
      <div className="absolute bottom-0 left-0 right-0 space-y-2 p-3 sm:space-y-3 sm:p-4">
        <div>
          <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-tight text-white sm:text-xl">
            {movie.title}
          </h3>
          <div className="flex items-center text-xs text-gray-300 sm:text-sm">
            <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            {new Date(movie.release_date).getFullYear()}
            <span className="mx-1 sm:mx-2">•</span>
            <span className="truncate font-medium">
              {movie.genres[0]?.name}
            </span>
          </div>
        </div>

        {/* Action Buttons - Stack vertically on mobile */}
        <div className="flex flex-row gap-2">
          <Link
            href={`/${movie.type}/${movie.itemId}`}
            className="rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-4 sm:py-2 sm:text-sm"
          >
            View Details
          </Link>
          <Link
            href={`/${movie.type}/${movie.itemId}/watch`}
            className="flex items-center justify-center rounded-lg bg-blue-500/85 p-2 transition-colors hover:bg-blue-600 sm:p-2.5"
          >
            <Play className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function Page() {
  const {
    data: favorites,
    isLoading,
    error,
  } = useUserProfile({
    queryType: 'favorites',
  });
  const { removeFromFavorites } = useFavoriteStore();

  if (error) return <div className="text-red-500">Error loading favorites</div>;

  return (
    <>
      <Metadata
        seoTitle="Favorit - Dashboard"
        seoDescription="Favorit tontonan yang disimpan"
        seoKeywords="Favorite, histori, tontonan"
      />

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:px-6 lg:px-8">
        {/* Header - Stack vertically on mobile */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
            Favorite Movies
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="flex items-center text-xs text-gray-400 transition-colors hover:text-white sm:text-sm">
              <span>Sort by</span>
              <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-[2/3] w-full rounded-xl sm:rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
              {favorites?.map((movie: any) => (
                <FavoriteCard
                  key={movie._id}
                  movie={movie}
                  onClickRemove={() =>
                    removeFromFavorites(movie._id, movie.type)
                  }
                />
              ))}
            </div>

            {favorites?.length === 0 && (
              <div className="flex flex-col items-center justify-center px-4 py-12 text-center sm:py-20">
                <Heart className="mb-3 h-12 w-12 text-gray-600 sm:mb-4 sm:h-16 sm:w-16" />
                <h2 className="mb-1.5 text-xl font-semibold text-gray-400 sm:mb-2 sm:text-2xl">
                  No favorites yet
                </h2>
                <p className="max-w-md text-sm text-gray-600 sm:text-base">
                  Start adding movies to your favorites by clicking the heart
                  icon on any movie page.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
