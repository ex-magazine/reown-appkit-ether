'use client';

import { Movie } from '@/types/movie.';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Rating } from './common/Rating';
import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { State, useStore } from '@/store/useStore';
import useIsMobile from '@/hooks/useIsMobile';

const parseReleaseDate = (dateStr: string): Date | null => {
  const [year, month, day] = dateStr.split('-').map(Number);
  if (year && month && day) {
    return new Date(year, month - 1, day);
  }
  return null;
};

const getBadgeStyle = (label: string | null) => {
  switch (label) {
    case 'Baru':
      return {
        background: 'bg-green-500',
        shadow: 'shadow-green-500/20',
        after: 'after:border-green-700',
      };
    case 'Upcoming':
      return {
        background: 'bg-purple-500',
        shadow: 'shadow-purple-500/20',
        after: 'after:border-purple-700',
      };
    case 'Rilis Bulan Ini':
      return {
        background: 'bg-blue-500',
        shadow: 'shadow-blue-500/20',
        after: 'after:border-blue-700',
      };
    case 'Belum Rilis':
      return {
        background: 'bg-gray-500',
        shadow: 'shadow-gray-500/20',
        after: 'after:border-gray-700',
      };
    case 'TBA':
      return {
        background: 'bg-red-500',
        shadow: 'shadow-red-500/20',
        after: 'after:border-red-700',
      };
    default:
      return {
        background: '',
        shadow: '',
        after: '',
      };
  }
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  const isMobile = useIsMobile();
  const { selectedType } = useStore(
    useShallow((state) => ({
      selectedType: state.selectedType,
    })),
  );

  const releaseDateStr = movie.release_date || movie.first_air_date;
  let releaseDate: Date | null = null;
  let label: string | null = null;

  if (releaseDateStr) {
    releaseDate = parseReleaseDate(releaseDateStr);
  }

  if (releaseDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(releaseDate.getTime())) {
      label = 'TBA';
    } else {
      releaseDate.setHours(0, 0, 0, 0);
      const getDateRange = () => {
        const today = new Date();
        const startDate = new Date(today);
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 30);

        return {
          start: startDate,
          end: endDate,
        };
      };

      const today = new Date();
      const dateRange = getDateRange();

      if (releaseDate > today) {
        const isCurrentMonth =
          releaseDate >= dateRange.start && releaseDate <= dateRange.end;

        if (isCurrentMonth) {
          label = 'Rilis Bulan Ini';
        } else {
          const timeDiff = releaseDate.getTime() - today.getTime();
          const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          if (dayDiff <= 30) {
            label = 'Upcoming';
          } else {
            label = 'Belum Rilis';
          }
        }
      } else {
        const timeDiff = today.getTime() - releaseDate.getTime();
        const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (dayDiff <= 90) {
          label = 'Baru';
        }
      }
    }
  } else {
    label = 'TBA';
  }

  const badgeStyle = getBadgeStyle(label);
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-shadow hover:shadow-2xl"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link href={`/${selectedType}/${movie.id}`}>
        <div className="relative aspect-[2/3]">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/${isMobile ? 'w300' : 'w500'}${
                movie.poster_path
              }`}
              alt={movie.title ?? movie.name ?? ''}
              fill
              className="object-cover transition-opacity group-hover:opacity-75"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-auto items-center justify-center bg-slate-800">
              <span className="text-sm text-white/60">No poster available</span>
            </div>
          )}
          {label && (
            <div className="absolute -right-2 top-4">
              <div
                className={`relative flex items-center py-1 pl-3 pr-4 text-xs font-bold text-white ${badgeStyle.background} ${badgeStyle.shadow} before:clip-path-triangle shadow-lg before:absolute before:right-0 before:top-full before:h-2 before:w-2 before:bg-inherit before:brightness-75 after:absolute after:bottom-0 after:left-0 after:top-0 after:w-3 after:-translate-x-1/2 after:rounded-l-full after:bg-inherit`}
              >
                <span className="relative z-10">{label}</span>
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="truncate text-lg font-semibold text-white">
            {movie.title ?? movie.name ?? ''}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-cyan-400">
              {releaseDateStr ? new Date(releaseDateStr).getFullYear() : 'TBA'}
            </span>
            <Rating value={movie.vote_average} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default memo(MovieCard);

const styles = `
  @layer utilities {
    .clip-path-triangle {
      clip-path: polygon(100% 0, 0 0, 100% 100%);
    }
  }
`;
