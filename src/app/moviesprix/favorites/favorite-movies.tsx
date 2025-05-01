'use client';

import MovieCard from '@/components/moviesprix/movie-card';
import { useFavorites } from '@/context/favorites-context';

const FavoriteMovies = () => {
  const { favorites } = useFavorites();

  return (
    <div className="grid grid-cols-2 flex-wrap items-center justify-evenly gap-4 md:flex md:justify-start md:gap-6">
      {favorites.map((movie) => (
        <MovieCard key={movie.id} movie={movie} className="h-full w-full" />
      ))}

      {favorites.length === 0 && (
        <div className="col-span-2 flex h-full w-full flex-col items-center justify-center gap-4">
          <h2 className="py-10 text-muted-foreground">
            No favorite movies found
          </h2>
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies;
