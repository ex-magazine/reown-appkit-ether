'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getCastsDetailMovie,
  getDetailMovie,
  getSimilarMovies,
  getRecommendedMovies,
} from '@/Service/fetchMovie';
import { Genre, Movie, Video } from '@/types/movie.';
import { memo, Suspense, use, useMemo, useRef, useState } from 'react';
import { Loader } from '@/components/movieapps/common/Loader';
import Head from 'next/head';
import Image from 'next/image';
import { Rating } from '@/components/movieapps/common/Rating';
import TrailerModal from '@/components/movieapps/TrailerModal';
import { AddToWatchListButton } from '@/components/movieapps/AddWatchListButton';
import {
  CalendarIcon,
  ForwardIcon,
  Heart,
  ChevronLeftIcon,
  ChevronRightIcon,
  Play,
} from 'lucide-react';
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';
import GoWatchButton from '@/components/movieapps/ui/GoWatchButton';
import useIsMobile from '@/hooks/useIsMobile';
import Link from 'next/link';
import { MovieCardSecond } from '@/components/movieapps/MovieCardSecond';
import Recommendation from '@/Fragments/Recommendation';
import dynamic from 'next/dynamic';
// import { useAuth } from "@/context/AuthContext";
import { AddFavoriteButton } from '@/components/movieapps/AddFavoriteButton';
import { Metadata } from '@/app/movieapps/Metadata';

const DynamicRecommendation = dynamic(
  () => import('@/Fragments/Recommendation'),
  {
    ssr: false,
  },
);

// const DetailMovie = async (props: Props) => {
// const id = (await props.params).id;
// export default async function DetailMovie({ params: { id } }: PageProps) {
// function DetailMovie({ params }: { params: Promise<{ id: string }> }) {

function DetailMovie({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState('financials');
  const [visibleCasts, setVisibleCasts] = useState(12);
  const isMobile = useIsMobile();
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<Movie>({
    queryKey: ['movie', id],
    queryFn: () =>
      getDetailMovie(id as unknown as number, {
        append_to_response: 'videos',
      }),

    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });

  const {
    data: casts,
    isLoading: isCastLoading,
    isError: isCastError,
  } = useQuery({
    queryKey: ['casts', id],
    queryFn: () => getCastsDetailMovie(id as unknown as string),
    enabled: activeTab === 'cast', // Only fetch when cast tab is active
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });

  const trailer = movie?.videos?.results.find(
    (video: Video) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  if (isLoading) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
          <Loader />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
          <div className="text-xl text-white">Failed to load movie data</div>
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
          <div className="text-xl text-white">Movie not found</div>
        </div>
      </>
    );
  }

  const TabButton = memo(
    ({
      tab,
      activeTab,
      onClick,
    }: {
      tab: string;
      activeTab: string;
      onClick: (tab: string) => void;
    }) => {
      const isActive = activeTab === tab.toLowerCase();

      return (
        <button
          onClick={() => onClick(tab.toLowerCase())}
          className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
            isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {tab}
          {isActive && (
            <span className="animate-underline absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400" />
          )}
        </button>
      );
    },
  );

  function Tabs() {
    // Gunakan useMemo agar daftar tab tidak dihitung ulang di setiap render
    const tabs = useMemo(
      () => ['Financials', 'Production', 'Languages', 'Status', 'Cast'],
      [],
    );

    return (
      <div className="scrollbar-hide flex space-x-4 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            tab={tab}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <Metadata
        seoTitle={movie.title}
        seoDescription={movie.overview}
        seoKeywords={movie.genres?.map((genre) => genre.name).join(', ')}
      />

      <div className="min-h-screen bg-slate-900 pb-[5rem]">
        <main>
          {/* Backdrop Image */}
          <div className="relative h-[100vh] pb-8">
            {movie.backdrop_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  isMobile ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title ?? movie.name ?? ''}
                fill
                priority
                className="object-fill opacity-30"
              />
            )}
          </div>

          {/* Movie Content */}
          <div className="container relative z-10 mx-auto px-4 sm:-mt-[22rem] md:-mt-[24rem] lg:-mt-[34rem]">
            <div className="sm:-mt-unset -mt-[34rem] flex flex-col gap-8 md:flex-row">
              {/* Poster */}
              <div className="w-auto self-center sm:self-auto">
                <div className="md:[22rem] relative h-[18rem] w-[12rem] overflow-hidden rounded-xl shadow-xl sm:h-[18rem] sm:w-[12rem] md:w-[16rem] lg:h-[30rem] lg:w-[20rem]">
                  {movie.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title ?? movie.name ?? ''}
                      fill
                      priority
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="w-full text-white md:w-2/3">
                <h1 className="mb-4 inline-flex items-center gap-2 text-4xl font-bold">
                  {movie.title}
                  {isAuthenticated && (
                    <AddFavoriteButton
                      item={{
                        ...movie,
                        title: movie.title ?? '',
                        media_type: 'movie',
                        itemId: movie.id,
                        type: 'movie',
                      }}
                    />
                  )}
                </h1>

                <div className="mb-6 flex items-center gap-4">
                  <Rating value={movie.vote_average} />
                  <span className="text-slate-400">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </span>
                  {movie.runtime && (
                    <span className="text-slate-400">{movie.runtime} mins</span>
                  )}
                  {/* add if statement for adult and add the logo */}
                  {movie.adult && <span className="text-red-500">18+</span>}
                </div>

                {movie.genres && (
                  <div className="mb-6 flex flex-wrap gap-4">
                    {movie.genres.map((genre: Genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full bg-cyan-500 px-3 py-1 text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mb-8 text-lg text-slate-300">{movie.overview}</p>
                <div className="flex gap-5">
                  {trailer && <TrailerModal videoKey={trailer.key} />}
                  <div className="flex gap-3">
                    {/* <button className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition">
                      <Heart className="text-white w-7 h-7" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition">
                      <ForwardIcon className="text-white w-7 h-7" />
                    </button> */}
                    <AddToWatchListButton
                      item={{
                        ...movie,
                        title: movie.title ?? '',
                        media_type: 'movie',
                      }}
                    />
                    <GoWatchButton params={id} typeData={'movie'}>
                      <Play /> Play
                    </GoWatchButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800/10 p-6 shadow-lg backdrop-blur-lg">
              {/* Tab Headers with Animated Underline */}
              <div className="relative mb-8">
                <Tabs />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
              </div>

              {/* Tab Content Container */}
              <div className="transition-all duration-300">
                {/* Financials Tab */}
                {activeTab === 'financials' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="gradient-card group">
                      <div className="flex items-center justify-between">
                        <BanknotesIcon className="h-8 w-8 text-cyan-400" />
                        <div className="text-right">
                          <p className="mb-1 text-sm text-cyan-300">Budget</p>
                          <p className="text-2xl font-bold text-white">
                            {movie.budget
                              ? `$${movie.budget.toLocaleString()}`
                              : '-'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-1000"
                          style={{
                            width: `${Math.min(
                              ((movie?.budget ?? 0) /
                                (movie?.revenue ?? (movie?.budget ?? 0) * 2)) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="gradient-card group">
                      <div className="flex items-center justify-between">
                        <CurrencyDollarIcon className="h-8 w-8 text-emerald-400" />
                        <div className="text-right">
                          <p className="mb-1 text-sm text-emerald-300">
                            Revenue
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {movie.revenue
                              ? `$${movie.revenue.toLocaleString()}`
                              : '-'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-1000"
                          style={{
                            width: `${Math.min(
                              ((movie?.revenue ?? 0) /
                                ((movie?.budget ?? 0) * 4 ||
                                  (movie?.revenue ?? 0) * 2)) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Production Tab */}
                {activeTab === 'production' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {movie.production_companies?.map((company: any) => (
                      <div
                        key={company.id}
                        className="gradient-card transition-all duration-300 hover:-translate-y-1 hover:transform"
                      >
                        <div className="flex flex-col items-center p-4 text-center">
                          {company.logo_path ? (
                            <div className="relative mb-4 h-16 w-full">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                alt={company.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <BuildingOfficeIcon className="mb-4 h-12 w-12 text-slate-400" />
                          )}
                          <span className="text-sm font-medium text-white">
                            {company.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages Tab */}
                {activeTab === 'languages' && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {movie.spoken_languages?.map((lang) => (
                      <div
                        key={lang.iso_639_1}
                        className="gradient-card group p-4 text-center hover:bg-white/5"
                      >
                        <div className="mb-2 text-4xl">
                          {String.fromCodePoint(
                            0x1f1e6 +
                              (lang.iso_639_1.toUpperCase().charCodeAt(0) -
                                'A'.charCodeAt(0)),
                            0x1f1e6 +
                              (lang.iso_639_1.toUpperCase().charCodeAt(1) -
                                'A'.charCodeAt(0)),
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-cyan-400">{lang.name}</p>
                          <p className="font-mono text-xs text-slate-300">
                            {lang.iso_639_1.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Status Tab */}
                {activeTab === 'status' && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="gradient-card p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                            <CalendarIcon className="h-6 w-6 text-cyan-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-1 text-sm text-cyan-300">
                            Release Status
                          </h3>
                          <p className="text-xl font-semibold text-white">
                            {movie.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="gradient-card p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                            <GlobeAltIcon className="h-6 w-6 text-purple-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-1 text-sm text-purple-300">
                            Original Language
                          </h3>
                          <p className="text-xl font-semibold text-white">
                            {new Intl.DisplayNames(['en'], {
                              type: 'language',
                            }).of(movie.original_language)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Cast Tab */}
                {activeTab === 'cast' && (
                  <div className="space-y-6">
                    {isCastLoading ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="group relative aspect-[2/3] animate-pulse"
                          >
                            <div className="absolute inset-0 rounded-2xl bg-slate-800" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/80 via-transparent" />
                          </div>
                        ))}
                      </div>
                    ) : isCastError ? (
                      <div className="gradient-card p-6 text-center text-red-400">
                        Failed to load cast information
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {casts?.cast
                          ?.slice(0, visibleCasts)
                          .map((member: any) => (
                            <div
                              key={member.id}
                              className="group relative aspect-[2/3] transition-transform duration-300 hover:-translate-y-2"
                            >
                              {/* Image Container */}
                              <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl">
                                {member.profile_path ? (
                                  <Image
                                    src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-purple-600">
                                    <span className="text-2xl font-bold uppercase text-white">
                                      {member.name
                                        .split(' ')
                                        .map((n: string) => n[0])
                                        .join('')}
                                    </span>
                                  </div>
                                )}
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                              </div>

                              {/* Text Content */}
                              <div className="absolute inset-0 flex flex-col justify-end space-y-1 p-4">
                                <h3 className="truncate font-semibold text-white drop-shadow-lg">
                                  {member.name}
                                </h3>
                                <p className="truncate text-sm font-medium text-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  {member.character}
                                </p>
                                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                  {member.order + 1}
                                </div>
                              </div>

                              {/* View Detail Button */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <Link
                                  href={`/person/${member.id}`}
                                  className="transform rounded-lg bg-cyan-500/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm transition-colors duration-300 hover:scale-105 hover:bg-cyan-600"
                                >
                                  View Details
                                </Link>
                              </div>

                              {/* Hover Border Effect */}
                              <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-cyan-400/30" />
                            </div>
                          ))}
                        {casts?.cast?.length > visibleCasts && (
                          <div className="mt-8 flex justify-center">
                            <button
                              onClick={() =>
                                setVisibleCasts((prev) => prev + 6)
                              }
                              className="group flex w-full transform items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 sm:w-auto sm:px-8 sm:py-3 sm:text-base"
                            >
                              <span>Load More</span>
                              <svg
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Recommendation id={id} type={'movie'} />
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default DetailMovie;
