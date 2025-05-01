'use client';

import MovieCard from '@/components/moviesprix/movie-card';
import SearchBar from '@/components/moviesprix/search-bar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/moviesprix/ui/card';
import { cn } from '@/lib/moviesprix/utils';
import { IMovie } from '@/types/api-response';
import { getTrendingMovies } from '@/utils/movies';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      setLoading(true);
      const { data } = await axios.get('/search/api', {
        signal,
        params: { query },
      });
      setResults(data);
      setLoading(false);
    })();

    return () => controller.abort();
  }, [query]);

  return (
    <div>
      <SearchBar onChange={setQuery} />

      {query.length > 0 && (
        <Card className="mx-auto mt-8 max-w-screen-md">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {loading ? (
                'Searching...'
              ) : (
                <p>
                  {results.length} {results.length === 1 ? 'result' : 'results'}{' '}
                  found for &quot;{query}&quot;
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1 md:grid-cols-2">
            {!loading &&
              results.map((movie) => (
                <Link
                  prefetch={false}
                  href={`/movies/${movie.id}`}
                  key={movie.id}
                  className="group flex cursor-pointer gap-3 rounded-md px-2 py-1.5 transition-all hover:bg-muted"
                >
                  <img
                    className="size-10 overflow-hidden rounded-md border"
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                  />

                  <div className="flex-1">
                    <h3 className={'line-clamp-1 text-ellipsis'}>
                      {movie.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {movie.original_language} -
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </Link>
              ))}

            {loading && (
              <p className="col-span-2 place-items-center items-center py-10 text-center text-muted-foreground">
                <Loader2Icon className="size-8 animate-spin text-primary" />
              </p>
            )}

            {!loading && results.length === 0 && (
              <p className="col-span-2 py-10 text-center text-muted-foreground">
                No results found for &quot;{query}&quot;
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchResults;
