'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/types/movie.';
import { getDetailMovie } from '@/service/fetchMovie';
import {
  Monitor,
  ChevronDown,
  Tv,
  Expand,
  Shrink,
  Clock,
  Calendar,
} from 'lucide-react';

import { Metadata } from '@/app/movieapps/Metadata';
import Image from 'next/image';

function Watch() {
  const pathname = usePathname();
  const id = pathname.split('/')[3];
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedServer, setSelectedServer] = useState('Media 1');
  const [videoProgress, setVideoProgress] = useState({
    watched: 0,
    duration: 0,
    percentage: 0,
  });
  const videoProgressRef = useRef(videoProgress);

  const [showServerDropdown, setShowServerDropdown] = useState(false);
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
    enabled: !!id,
  });

  useEffect(() => {
    videoProgressRef.current = videoProgress;
  }, [videoProgress]);

  // Get video URL based on selected server
  const getVideoUrl = () => {
    switch (selectedServer) {
      case 'Media 1':
        return `https://vidlink.pro/movie/${id}`;
      case 'Media 2':
        return `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`;
      case 'Media 3':
        return `https://vidsrc.cc/v3/embed/movie/${id}?autoPlay=false`;
      case 'Media 4':
        return `https://vidsrc.to/embed/movie/${id}`;
      case 'Media 5':
        return `https://vidsrc.icu/embed/movie/${id}`;
      case 'Media 6':
        return `https://player.videasy.net/movie/${id}`;
      default:
        return `https://vidlink.pro/movie/${id}`;
    }
  };

  return (
    <>
      <Metadata
        seoTitle={`${movie?.title} - CrowdFunding`}
        seoDescription={movie?.overview}
        seoKeywords={movie?.genres?.map((genre) => genre.name).join(', ')}
      />

      <div className="min-h-screen bg-gray-900 pb-20 text-white">
        <main
          className={`mx-auto transition-all duration-300 ${
            isFullScreen ? 'max-w-full' : 'max-w-7xl px-4'
          }`}
        >
          {/* Header Section */}
          {!isFullScreen && movie && (
            <div className="mx-auto max-w-7xl px-4 pt-8">
              <div className="mb-8 flex flex-col gap-8 lg:flex-row">
                {/* Movie Poster */}
                <div className="w-full flex-shrink-0 lg:w-72">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title ?? 'Movie Poster'}
                    width={500}
                    height={750}
                    className="rounded-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl"
                  />
                </div>

                {/* Movie Info */}
                <div className="flex-1 space-y-4">
                  <h1 className="text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="badge badge-info">
                      ⭐ {movie.vote_average?.toFixed(1)} / 10
                    </div>
                    {movie.genres?.map((genre) => (
                      <div key={genre.id} className="badge badge-outline">
                        {genre.name}
                      </div>
                    ))}
                    {movie.runtime !== undefined && movie.runtime !== null && (
                      <div className="badge badge-ghost">
                        🕒 {Math.floor(movie.runtime / 60)}h{' '}
                        {movie.runtime % 60}m
                      </div>
                    )}
                  </div>

                  <p className="leading-relaxed text-gray-300">
                    {movie.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                    <div>
                      <Calendar className="mr-2 inline-block h-4 w-4" />
                      {new Date(movie.release_date).toLocaleDateString()}
                    </div>
                    {/*{videoProgress.percentage > 0 && (
                      <div className="bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full">
                        {Math.round(videoProgress.percentage)}% watched
                      </div>
                    )}*/}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Player Section */}
          <div
            className={`group relative ${
              isFullScreen ? 'h-screen' : 'aspect-video'
            } bg-black`}
          >
            <iframe
              src={getVideoUrl()}
              className="h-full w-full"
              allowFullScreen
            />

            {/* Floating Controls */}
            <div className="absolute right-4 top-4 flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="rounded-lg bg-gray-800/50 p-2 transition-colors hover:bg-gray-700/70"
              >
                {isFullScreen ? (
                  <Shrink className="h-5 w-5 text-white" />
                ) : (
                  <Expand className="h-5 w-5 text-white" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowServerDropdown(!showServerDropdown)}
                  className="flex items-center gap-2 rounded-lg bg-gray-800/50 p-2 transition-colors hover:bg-gray-700/70"
                >
                  <Monitor className="h-5 w-5" />
                  <span className="text-sm">{selectedServer}</span>
                </button>

                {showServerDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-700 bg-gray-800/95 shadow-lg backdrop-blur-xl">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setSelectedServer(`Media ${num}`);
                          localStorage.setItem(
                            'selectedVideoServer',
                            `Media ${num}`,
                          );
                          setShowServerDropdown(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-700/30"
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            selectedServer === `Media ${num}`
                              ? 'bg-blue-500'
                              : 'bg-gray-500'
                          }`}
                        />
                        <span>Media {num}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Watch;
