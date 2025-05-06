'use client';

import { useFavorites } from '@/contexts/favorites-context';
import { cn } from '@/lib/ether/moviesprix/utils';
import { IMovie } from '@/types/api-response';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useLocalStorage } from 'react-use';
import Image from './client/image';

type Props = {
  movie: IMovie;
  className?: string;
};

const MovieCardsprix = ({ movie, className }: Props) => {
  const { isFavorited, toggleFavorite } = useFavorites();

  return (
    <Link
      href={`/moviesprix/movies/${movie.id}`}
      className="inline-block whitespace-normal"
      prefetch={false}
    >
      <div
        className={cn(
          'group relative aspect-[3/4] h-44 overflow-hidden rounded-lg border shadow-md transition-all duration-300 hover:border-primary md:aspect-[3/4] md:h-52 2xl:h-56',
          className,
        )}
      >
        <div className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:brightness-50">
          <Image
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            placeholderSrc={`https://image.tmdb.org/t/p/w45/${movie.poster_path}`}
            // placeholderSrc={`https://placehold.co/300x450/020202/a3a3a3?font=raleway&text=${encodeURI(movie.title)}`}
            // placeholder={<div />}
            alt={movie.title}
          />
        </div>

        <p className="absolute left-1 top-1 flex items-center gap-1 rounded border bg-card/90 px-1.5 py-0.5 text-xs text-primary">
          <IconStarFilled className="size-3 md:size-3.5" />{' '}
          <span>{movie.vote_average.toFixed(1)}</span>
        </p>

        {/* <div className="absolute top-1.5 right-1.5 text-primary p-1 rounded bg-card/90 ">
                    <Heart
                        onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            toggleFavorite(movie);
                        }}
                        className={cn(' transition-all duration-300 z-30 size-5', isFavorited(movie) && 'fill-primary text-primary')}
                    />
                </div> */}

        <div className="relative z-10 flex h-full items-end">
          <div className="w-full bg-gradient-to-b from-black/0 via-black/80 to-black p-2 pt-12">
            <h3 className="line-clamp-1 overflow-hidden text-ellipsis text-xs font-semibold transition-all group-hover:text-primary md:text-sm">
              {movie.title}
            </h3>
            <p className="line-clamp-[8] h-0 overflow-hidden text-[10px] text-foreground/80 transition-all group-hover:h-[8lh] md:text-xs">
              {movie.overview}
            </p>
            <p className="overflow-hidden text-[10px] text-muted-foreground transition-all group-hover:h-0 md:text-xs">
              {movie.release_date} | {movie.original_language}{' '}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCardsprix;
