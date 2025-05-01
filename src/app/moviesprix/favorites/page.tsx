const dynamic = 'force-dynamic';
import React from 'react';
import FavoriteMovies from './favorite-movies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorite',
};

const page = () => {
  return (
    <div className="px-2">
      <h2 className="mb-10 mt-6 text-center text-2xl font-semibold text-primary">
        Favorite Movies
      </h2>

      <FavoriteMovies />
    </div>
  );
};

export default page;
