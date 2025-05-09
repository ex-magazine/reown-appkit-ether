import { getMovies } from '@/action/movies';
import InfiniteMovies from '@/components/ether/moviestmdb/InfiniteMovies';
import MovieCard from '@/components/ether/moviestmdb/MovieCard';

// export const revalidate = 60;

const Home = async () => {
  const movies = await getMovies(1);

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 pt-20">
      <div className="mx-auto max-w-7xl space-y-12 text-center">
        <h1 className="mb-6 text-xl font-bold">Popular Movies</h1>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <InfiniteMovies />
      </div>
    </section>
  );
};

export default Home;
