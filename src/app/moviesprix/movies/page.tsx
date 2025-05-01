import MovieCard from '@/components/moviesprix/movie-card';
import PaginationComponent from '@/components/moviesprix/pagination';

import { discoverMovies } from '@/utils/movies';
import { Metadata } from 'next';
import React from 'react';

const TOTAL_PAGES = 100;

interface Props {
  searchParams: Promise<{ page: string }>;
}

export const metadata: Metadata = {
  title: 'Explore',
};

const page = async ({ searchParams }: Props) => {
  const currentPage = parseInt((await searchParams).page) || 1;
  const movies = await discoverMovies({ page: currentPage });

  return (
    <div className="px-2">
      <h2 className="mb-10 mt-6 text-center text-2xl font-semibold text-primary">
        Movies
      </h2>

      <div className="grid grid-cols-2 flex-wrap items-center justify-evenly gap-4 md:flex md:justify-center md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} className="h-full w-full" />
        ))}
      </div>

      <div className="mt-14">
        <PaginationComponent
          path="/moviesprix/movies"
          current={currentPage}
          total={TOTAL_PAGES}
        />
      </div>
    </div>
  );
};

export default page;
