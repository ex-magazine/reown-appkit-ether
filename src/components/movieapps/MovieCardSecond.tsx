'use client';

import Link from 'next/link';
import { Rating } from './common/Rating';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const MovieCardSecond = ({
  movie,
  type,
}: {
  movie: any;
  type: string;
}) => {
  return (
    // <-- Parenthesis moved to same line as return
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-shadow hover:shadow-2xl"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link href={`/${type}/${movie.id}`}>
        <div className="relative aspect-[2/3]">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name || 'Movie poster'}
              width={200}
              height={300}
              className="object-cover transition-opacity group-hover:opacity-75"
            />
          ) : (
            <div className="flex h-[15.63vw] w-[10.42vw] items-center justify-center bg-slate-800">
              <span className="text-sm text-white/60">No poster available</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="truncate text-lg font-semibold text-white">
              {movie.title ?? movie.name ?? ''}
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-cyan-400">
                {new Date(
                  movie.release_date ?? movie.first_air_date
                ).getFullYear()}
              </span>
              <Rating value={movie.vote_average} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
