'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import MovieCard from '@/components/ether/moviestmdb/MovieCard';
import { searchMovies } from '@/action/movies';
import { TMovie } from '@/lib/ether/moviestmdb/schemas/movie-schemas';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!inView) return;

    searchMovies(query, page).then((newMovies) => {
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    });
  }, [page, query]);

  useEffect(() => {
    if (!inView) return;

    setPage((prevPage) => prevPage + 1);
  }, [inView]);

  return (
    <div className="mx-auto max-w-7xl space-y-12">
      <h1 className="mb-6 text-xl font-bold">
        Search Results for &quot;{query}&quot;
      </h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div ref={ref} className="h-10" />
    </div>
  );
}
