'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getTrending } from '@/service/fetchMovie';
import { Movie } from '@/types/movie.';
import { ChevronLeft, ChevronRight, Info, Play, Star } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import useIsMobile from '@/hooks/useIsMobile';

export const genres = {
  movie: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ],
  tv: [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
  ],
} as const;

function Banner({ type }: { type: 'movie' | 'tv' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pauseAutoSlide, setPauseAutoSlide] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const isMobile = useIsMobile();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['trendingMovies', type],

    queryFn: () => getTrending(type, 'week'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Auto-slide functionality
  useEffect(() => {
    if (isLoading || isError || pauseAutoSlide || !data?.results) return;

    const totalMovies = data.results.length;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalMovies);
      setProgress(0); // Reset progress bar
    }, 8000);

    return () => clearInterval(interval);
  }, [isLoading, isError, pauseAutoSlide, data?.results]);

  // Progress bar animation
  useEffect(() => {
    if (pauseAutoSlide) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 100 / (8000 / 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [pauseAutoSlide]);

  // if (isLoading) {
  //   return (
  //     <div className="relative h-[60vh] md:h-[100vh]">
  //       <div className="h-full w-full rounded-none" />
  //       <div className="absolute bottom-[15rem] left-0 right-0 p-4 md:p-8 space-y-4">
  //         <div className="h-8 w-3/4 bg-gray-500" />
  //         <div className="h-4 w-1/2 bg-gray-500" />
  //         <div className="flex gap-4">
  //           <div className="h-10 w-32 rounded-lg bg-gray-500" />
  //           <div className="h-10 w-32 rounded-lg bg-gray-500" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // Ganti loading state dengan animasi skeleton yang lebih menarik
  if (isLoading) {
    return (
      <div className="relative h-[60vh] overflow-hidden md:h-[100vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-shimmer h-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"
        />
      </div>
    );
  }

  if (isError || !data?.results?.length) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 bg-slate-900 text-red-400 md:h-[80vh]">
        <span className="text-4xl">⚠️</span>
        <p className="text-xl font-medium">Failed to load banner</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-red-500/20 px-6 py-2 transition-colors hover:bg-red-500/30"
        >
          Try Again
        </button>
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? data.results.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === data.results.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const currentMovie = data.results[activeIndex];

  const movieGenres = currentMovie.genre_ids
    ?.map((id: any) => genres[type].find((g) => g.id === id)?.name)
    .filter(Boolean);

  const handleSlideClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX) return;

    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <div
      className="relative h-[100vh] overflow-hidden"
      onMouseEnter={() => setPauseAutoSlide(true)}
      onMouseLeave={() => setPauseAutoSlide(false)}
    >
      {/* Progress Bar */}
      <div className="absolute left-0 right-0 top-0 z-50 h-1 bg-slate-700/50">
        <motion.div
          className="h-full bg-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Carousel Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with Gradient Overlay */}
          {currentMovie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/${isMobile ? 'w780' : 'original'}${
                isMobile ? currentMovie.poster_path : currentMovie.backdrop_path
              }`}
              alt={
                currentMovie.title
                  ? currentMovie.title
                  : currentMovie.original_name
              }
              blurDataURL={`https://image.tmdb.org/t/p/w120${currentMovie.backdrop_path}`}
              placeholder="blur"
              fill
              loading="lazy"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative flex h-[80vh] flex-col justify-end p-6 md:p-8 lg:p-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-4 text-white"
        >
          <h1 className="text-xl font-bold [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.5)] md:text-5xl">
            {currentMovie.title || currentMovie.name}
          </h1>

          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="rounded-full bg-gradient-to-r from-cyan-600 to-blue-500 px-3 py-1 text-xs font-bold">
              Trending #{activeIndex + 1}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span>{currentMovie.vote_average.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>
              {new Date(
                currentMovie.release_date
                  ? currentMovie.release_date
                  : currentMovie.first_air_date,
              ).getFullYear()}
            </span>
            <span>•</span>
            <span>{currentMovie.original_language.toUpperCase()}</span>
          </div>

          {movieGenres && movieGenres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movieGenres.slice(0, 3).map((genre: any) => (
                <span
                  key={genre}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <p className="line-clamp-3 text-sm text-slate-200 md:text-base">
            {currentMovie.overview}
          </p>

          <div className="flex gap-4">
            <Link href={`/movieapps/${type}/${currentMovie.id}/`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg bg-white/90 px-6 py-2 font-semibold text-slate-900 transition-colors hover:cursor-pointer hover:bg-white"
              >
                <Play className="h-5 w-5 fill-current" />
                Watch Now
              </motion.button>
            </Link>
            <Link href={`/${type}/${currentMovie.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg bg-slate-500/50 px-6 py-2 font-semibold text-white transition-colors hover:cursor-pointer hover:bg-slate-500/70"
              >
                <Info className="h-5 w-5" />
                More Info
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex h-[26rem] items-center justify-between p-4 sm:h-[28rem] md:h-[32rem] lg:h-[38rem]">
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          className="rounded-full bg-slate-800/50 p-2 transition-colors hover:bg-slate-700/50"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          className="rounded-full bg-slate-800/50 p-2 transition-colors hover:bg-slate-700/50"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div
        className={`absolute bottom-8 ${
          isMobile ? 'right-[12rem]' : 'right-[18rem]'
        } z-50 h-32`}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative mx-auto max-w-4xl">
          {/* Center highlight zone */}
          <div className="absolute left-1/2 z-10 h-32 w-24 -translate-x-1/2 rounded-lg bg-black/20 backdrop-blur-sm" />

          {/* Thumbnails container */}
          <motion.div
            style={{ touchAction: 'pan-y' }} // Memastikan swipe vertikal tetap bekerja
            className="flex h-32 items-center justify-center gap-4"
          >
            {data.results.map((movie: Movie, index: number) => {
              const position = index - activeIndex;
              const isActive = index === activeIndex;
              const isAfter = index > activeIndex;
              const isBefore = index < activeIndex;

              return (
                <motion.div
                  key={movie.id}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    x: `calc(-50% + ${position * 185}px)`, // Adjust spacing
                    paddingLeft: isAfter
                      ? isMobile
                        ? '14vw'
                        : '4vw'
                      : isActive
                        ? '0'
                        : undefined,
                    paddingRight: isBefore
                      ? isMobile
                        ? '14vw'
                        : '4vw'
                      : isActive
                        ? '0'
                        : undefined,
                  }}
                  animate={{
                    scale: index === activeIndex ? 1.5 : 1,
                    opacity: Math.abs(position) > 3 ? 0 : 1,
                    zIndex: index === activeIndex ? 20 : 10,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={() => handleSlideClick(index)}
                  className={`cursor-pointer`}
                >
                  <div className={`relative h-24 w-40 overflow-hidden`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                      alt={movie.title ?? movie.name ?? ''}
                      fill
                      className="object-cover"
                      loading="lazy"

                      // sizes="80px"
                    />
                    {index === activeIndex && (
                      <div className="absolute inset-0 bg-red-500/10" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export const BannerSkeleton = () => {
  return (
    <div className="relative h-[60vh] md:h-[100vh]">
      <div className="h-full w-full rounded-none" />
      <div className="absolute bottom-[15rem] left-0 right-0 space-y-4 p-4 md:p-8">
        <div className="h-8 w-3/4 bg-gray-500" />
        <div className="h-4 w-1/2 bg-gray-500" />
        <div className="flex gap-4">
          <div className="h-10 w-32 rounded-lg bg-gray-500" />
          <div className="h-10 w-32 rounded-lg bg-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default memo(Banner);
