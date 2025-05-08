import { getWatchlistProducts } from '@/action/watchlist';
import MovieCard from '@/components/ether/moviestmdb/MovieCard';
import MovieCardWatchlistWrapper from '@/components/ether/moviestmdb/MovieCardWatchlistWrapper';

const WatchlistPage = async () => {
  const watchlist = await getWatchlistProducts();

  return (
    <div className="container">
      <h1 className="mb-6 text-xl font-bold">Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {watchlist.map((movie) => (
            <MovieCardWatchlistWrapper movieId={movie.id} key={movie.id}>
              <MovieCard movie={movie} />
            </MovieCardWatchlistWrapper>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
