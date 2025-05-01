import React from 'react';
import MovieCard from './MovieCard';
import { TRecommendations } from '@/lib/moviestmdb/schemas/movie-schemas';

interface Props {
  recommendations: TRecommendations['results'];
}

const RecommendationSection = ({ recommendations }: Props) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Recommendations</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {recommendations.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
