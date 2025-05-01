'use client';

import { BannerSkeleton } from '@/components/movieapps/Banner';
import { DropdownGenre } from '@/components/movieapps/DropdownGenre';
import MovieCard from '@/components/movieapps/movieCard';
import MovieCardSkeleton from '@/components/movieapps/MovieCardSkeleton';
import { Button } from '@/components/movieapps/ui/button';
// import HistoryTontonan from "@/Fragments/HistoryWatch";
import { getPopularMovie, getSearchByGenre } from '@/Service/fetchMovie';
import { useStore } from '@/store/useStore';
import { Movie } from '@/types/movie.';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ScrollToTopButton } from '@/components/movieapps/ScrollToTopButton';
import axios from 'axios';

import { Github, Rocket } from 'lucide-react';
// import { AnimatedGridPattern } from '../components/moviesprix/ui/animated-grid-pattern';
// import { AnimatedGradientText } from '../components/moviesprix/ui/animated-gradient-text';
import { cn } from '../../lib/moviesprix/utils';
import Link from 'next/link';
import { AnimatedGridPattern } from '@/components/moviesprix/ui/animated-grid-pattern';
import { AnimatedGradientText } from '@/components/moviesprix/ui/animated-gradient-text';

const Banner = dynamic(() => import('@/components/movieapps/Banner'), {
  ssr: true,
});
// export default async function Home() {
export default function Home() {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const pathname = usePathname();
  const { genresId, setSelectedGenresId, historyData } = useStore(
    useShallow((state) => ({
      genresId: state.genresId,
      historyData: state.historyData,
      setSelectedGenresId: state.setSelectedGenresId,
    })),
  );

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ['movie Popular', page],
    enabled: !genresId,
    queryFn: () => getPopularMovie(page, {}),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });

  const {
    data: moviesGenre,
    isLoading: isLoadingGenre,
    isError: isErrorGenre,
  } = useQuery<{ results: Movie[] }>({
    queryKey: ['movie Genre', genresId, page],
    enabled: !!genresId,
    queryFn: () => getSearchByGenre(genresId as string, page),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });

  useEffect(() => {
    const trackAccess = async () => {
      try {
        await axios.post(
          'https://backend-movie-apps-api-one.vercel.app/api/logs',
          {},
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
      } catch (error) {
        console.error('Tracking error:', error);
      }
    };

    trackAccess();
  }, []);

  useEffect(() => {
    if (genresId && moviesGenre) {
      setAllMovies(moviesGenre?.results);
    } else if (movies && !genresId) {
      setAllMovies((prevMovies) => {
        const movieSet = new Set(prevMovies.map((m) => m.id));
        const uniqueMovies = movies?.filter((m) => !movieSet.has(m.id));
        return [...prevMovies, ...uniqueMovies];
      });
    }
  }, [movies, moviesGenre, genresId]);

  const data = movies;
  return (
    <>
      <main className="min-h-screen">
        <Suspense fallback={<BannerSkeleton />}>
          <Banner type={pathname === '/' ? 'movie' : 'tv'} />
        </Suspense>
        <div className="container mx-auto px-4 py-8">
          {/* <HistoryTontonan /> */}
          <div className="mb-4 flex items-center gap-4">
            <DropdownGenre />
            {genresId && (
              <button
                onClick={() => {
                  setSelectedGenresId(null), setAllMovies([]);
                }}
                className="text-slate-400"
              >
                Cancel
              </button>
            )}
          </div>
          <div>
            <h2 className="mb-8 mt-5 text-3xl font-bold text-slate-300">
              {genresId ? '' : 'Popular Movies'}
            </h2>
            {isLoading && allMovies.length === 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <MovieCardSkeleton />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {allMovies?.map((movie: Movie, index: number) => (
                    <MovieCard
                      key={movie.id || `movie-${index}`}
                      movie={movie}
                    />
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <Button
                    type="button"
                    onClick={() => {
                      setPage((prev) => prev + 1);
                    }}
                    className="rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-cyan-600"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> loading
                      </>
                    ) : (
                      'Load More'
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <ScrollToTopButton />
      </main>
      <main className="min-h-screen">
        <div className="relative flex min-h-dvh items-center justify-center p-4 text-center">
          <AnimatedGridPattern
            width={35}
            height={35}
            maxOpacity={0.2}
            className={'[mask-image:linear-gradient(to_top,#fff9,transparent)]'}
          />
          <div className="z-20 max-w-5xl md:-translate-y-6">
            {/* <div className="flex items-center justify-center p-3 mx-auto rounded-md gradient w-fit mb-6">
                <Music4 className="size-10" />
            </div> */}

            <div className="z-10 mb-8 flex items-center justify-center">
              <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{' '}
                <span
                  className={cn(
                    `animate-gradient gradient inline bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                  )}
                >
                  Your Ultimate Movie Destination!
                </span>
              </AnimatedGradientText>
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-7xl">
              <span className="text-gradient">CrowdFunding</span>
            </h2>

            <p className="max-w-2xl text-base text-muted-foreground md:text-2xl">
              Explore the world of cinema like never before! Find the latest
              blockbusters and all-time favorites in one place.
            </p>

            <div className="mx-auto mt-20 flex max-w-lg flex-col gap-x-6 gap-y-4 md:flex-row">
              <Link
                href={'/moviesprix/home'}
                className="inline-block w-full rounded-full border border-muted-foreground/25 bg-muted bg-primary px-10 py-2.5 text-sm font-semibold text-foreground/75 text-primary-foreground text-white transition-all hover:scale-105 hover:brightness-125 md:text-base"
              >
                <Rocket className="mr-2 inline size-5" /> TMDB V01!
              </Link>
              <Link
                href={'/moviestmdb'}
                className="inline-block w-full rounded-full border border-muted-foreground/25 bg-muted bg-primary px-10 py-2.5 text-sm font-semibold text-foreground/75 text-primary-foreground text-white transition-all hover:scale-105 hover:brightness-125 md:text-base"
              >
                <Rocket className="mr-2 inline size-5" /> TMDB V02!
              </Link>
            </div>
            <div className="mx-auto mt-20 flex max-w-lg flex-col gap-x-6 gap-y-4 md:flex-row">
              <a
                target="_blank"
                href={'http://github.com/ex-magazine/reown-appkit-ether/'}
                className="inline-block w-full rounded-full border border-muted-foreground/25 bg-muted bg-primary px-10 py-2.5 text-sm font-semibold text-foreground/75 text-primary-foreground text-white transition-all hover:scale-105 hover:brightness-125 md:text-base"
              >
                <Github className="mr-2 inline size-5" /> View On Github
              </a>
            </div>
          </div>

          <p className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 text-center text-xs font-semibold text-muted-foreground md:text-sm">
            Made by{' '}
            <a
              href="https://github.com/ex-magazine/"
              target="_blank"
              className="underline"
            >
              @ex-magazine
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
// export default Home;
