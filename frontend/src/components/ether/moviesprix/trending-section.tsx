import React from 'react';

import RatingCompComponent from './client/rating';
import ISO6391 from 'iso-639-1';
import { getTrendingMovies } from '@/utils/movies';
import { Button } from './ui/button';
import CarouselComponent from './client/carousel';
import Link from 'next/link';

const TrendingSection = async () => {
  const movies = await getTrendingMovies();

  return (
    <CarouselComponent>
      {movies.map((movie) => (
        <Link
          href={`/moviesprix/movies/${movie.id}`}
          key={movie.id}
          className="w-full"
        >
          {/* for desktop */}
          <div className="relative hidden h-[26rem] w-full grid-cols-[4fr_6fr] items-center justify-between gap-2 overflow-hidden rounded-2xl border bg-card md:grid 2xl:h-[29rem] 2xl:grid-cols-[3fr_6fr]">
            <div className="relative z-10 flex h-full w-full flex-col gap-2 p-8">
              <h2 className="text-4xl font-bold">{movie.title}</h2>

              <div className="flex items-center gap-2">
                <RatingCompComponent
                  starDimension={20}
                  rating={movie.vote_average}
                />{' '}
                ({movie.vote_average})
              </div>
              <p className="mt-4 font-semibold text-foreground/90 md:text-lg">
                {movie.release_date} |{' '}
                {ISO6391.getName(movie.original_language)}
              </p>

              <p className="mt-2 line-clamp-5 text-muted-foreground">
                {movie.overview}
              </p>

              <Button className="mt-auto w-fit px-10">Watch Now</Button>
            </div>

            <div className="relative h-full">
              <img
                className="h-full w-full"
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-card to-transparent"></div>
            </div>
          </div>

          {/* for mobile */}
          <div className="2 relative h-[30rem] w-full items-center justify-between overflow-hidden rounded-2xl border bg-card md:hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full"
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              />
            </div>

            <div className="relative z-10 flex h-full items-end">
              <div className="w-full bg-gradient-to-b from-transparent via-black/75 via-[25%] to-black/90 p-4 pt-12">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="font-medium text-foreground/90 md:text-lg">
                  {movie.release_date} |{' '}
                  {ISO6391.getName(movie.original_language)}
                </p>
                <div className="flex items-center gap-2">
                  <RatingCompComponent
                    starDimension={20}
                    rating={movie.vote_average}
                  />{' '}
                  ({movie.vote_average})
                </div>
                <p className="mt-2 line-clamp-6 text-xs text-muted-foreground">
                  {movie.overview}
                </p>

                {/* <Button className="mt-4">
                           <PlayCircleIcon /> Watch Trailer
                       </Button> */}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </CarouselComponent>
  );
};

export default TrendingSection;
