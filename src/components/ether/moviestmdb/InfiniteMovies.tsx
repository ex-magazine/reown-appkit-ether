'use client';
import { getMovies } from '@/action/movies';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieCard from './MovieCard';
import { TMovie } from '@/lib/ether/moviestmdb/schemas/movie-schemas';

const InfiniteMovies = () => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;

    getMovies(page).then((newMovies) => {
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    });
  }, [page]);

  useEffect(() => {
    if (!inView) return;

    setPage((prevPage) => prevPage + 1);
  }, [inView]);

  return (
    <>
      <div className="mt-3 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div ref={ref} className="h-10" />
    </>
  );
};

export default InfiniteMovies;
