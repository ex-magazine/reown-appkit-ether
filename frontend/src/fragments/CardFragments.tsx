'use client';

import { DropdownGenre } from '@/components/ether/movieapps/DropdownGenre';
import MovieCardSkeleton from '@/components/ether/movieapps/MovieCardSkeleton';
// import MovieCard from "@/components/movieCard";
import { Button } from '@/components/ui/button';
import { getNowPlaying, getPopularMovie } from '@/service/fetchMovie';
import { Movie } from '@/types/movie.';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

const MovieCard = dynamic(
  () => import('@/components/ether/movieapps/movieCard'),
  {
    ssr: false,
  },
);

function CardFragments() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ['movie Popular'],

    queryFn: () => getPopularMovie(1, {}),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });
  const data = movies;

  return (
    <div>
      <h2 className="mb-8 mt-5 text-3xl font-bold text-black">
        Popular Movies
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading ? (
          <MovieCardSkeleton />
        ) : (
          data?.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          type="button"
          // onClick={() => setPage((prev) => prev + 1)}
          className="rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-cyan-600"
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

export default CardFragments;
