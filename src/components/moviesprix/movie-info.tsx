'use client';
import { IMovie, IMovieInfo } from '@/types/api-response';
import React from 'react';
import RatingCompComponent from './client/rating';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/favorites-context';
import { cn } from '@/lib/moviesprix/utils';
import ISO6391 from 'iso-639-1';

type Props = {
  info: IMovieInfo;
};

const MovieInfo = ({ info }: Props) => {
  const { isFavorited, toggleFavorite } = useFavorites();

  const otherDetails = [
    { label: 'Budget', value: `$${info?.budget}` },
    { label: 'Revenue', value: `$${info?.revenue}` },
    { label: 'Runtime', value: `${info?.runtime} min` },
    { label: 'Release Date', value: `${info?.release_date}` },
    { label: 'Status', value: `${info?.status}` },
    {
      label: 'Original Language',
      value: `${ISO6391.getName(info?.original_language)}`,
    },
    // { label: 'Original Title', value: `${info?.original_title}` },
    // { label: 'Popularity', value: `${info?.popularity}` },
    { label: 'Vote Count', value: `${info?.vote_count}` },
    { label: 'Vote Average', value: `${info?.vote_average}` },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card">
      <div className="absolute inset-0 max-md:hidden">
        <img
          className="size-full"
          src={`https://image.tmdb.org/t/p/w780${info?.backdrop_path}`}
          alt=""
        />
      </div>

      <div className="relative z-10 grid size-full gap-8 bg-card/90 p-5 backdrop-blur-[0px] md:grid-cols-[3fr_6fr] 2xl:gap-10 2xl:p-6">
        <div className="relative">
          <img
            className="h-full w-full rounded-lg border"
            src={`https://image.tmdb.org/t/p/w780${info?.poster_path}`}
          />
          <div
            onClick={(e) => {
              toggleFavorite(info! as unknown as IMovie);
            }}
            className="absolute right-2 top-2 z-30 cursor-pointer rounded-md bg-card/50 p-2 text-primary"
          >
            <Heart
              className={cn(
                'z-30 size-6 transition-all duration-300',
                isFavorited(info as unknown as IMovie) &&
                  'fill-primary text-primary',
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-bold md:text-4xl">{info?.title}</h2>
            <h4 className="mt-1 text-foreground/95 md:text-lg">
              {info?.tagline}
            </h4>
            <RatingCompComponent
              className="mt-1"
              rating={info?.vote_average}
              starDimension={24}
            />
          </div>
          <div>
            <h4 className="font-bold">Genres</h4>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {info?.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded bg-primary px-2 py-1 text-xs font-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold">Overview</h4>
            <p className="mt-1 text-sm text-foreground/80 md:text-base">
              {info?.overview}
            </p>
          </div>

          <div className="mt-auto">
            <h4 className="mb-2 font-bold">Details</h4>

            <div className="grid grid-cols-2 gap-3">
              {otherDetails.map((item, index) => (
                <div className="flex flex-col items-center justify-between rounded-md border bg-black/60 px-4 py-2 md:flex-row">
                  <h4 className="text-xs capitalize md:text-base">
                    {item.label}
                  </h4>

                  <p className="font-semibold text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
