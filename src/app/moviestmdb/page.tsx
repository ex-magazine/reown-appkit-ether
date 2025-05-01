import { getMovies } from '@/action/movies';
import InfiniteMovies from '@/components/moviestmdb/InfiniteMovies';
import MovieCard from '@/components/moviestmdb/MovieCard';

export const revalidate = 60;

const Home = async () => {
  const movies = await getMovies(1);

  return (
    <div className="container">
      <h1 className="mb-6 text-xl font-bold">Popular Movies</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <InfiniteMovies />
    </div>
  );
};

export default Home;
