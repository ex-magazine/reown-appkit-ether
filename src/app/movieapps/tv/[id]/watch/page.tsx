'use client';

import { useCallback, useMemo } from 'react';
import { getDetailShow, getSeasonDetails } from '@/Service/fetchMovie';
import { useStore } from '@/store/useStore';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Clock,
  Monitor,
  ChevronDown,
  Tv,
  Expand,
  Shrink,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  // addRecentlyWatched,
  WatchHistory,
  fetchVideoProgress,
} from '@/Service/actionUser';
import { getShowProgressUser, addRecentlyWatched } from '@/Service/fetchUser';
import { Metadata } from '@/app/Metadata';
import Image from 'next/image';
import useIsMobile from '@/hook/useIsMobile';

function page() {
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [season, setSeason] = useState('1');
  const [episode, setEpisode] = useState('1');
  const [selectedServer, setSelectedServer] = useState('Media 1');
  const [videoProgress, setVideoProgress] = useState({
    watched: 0,
    duration: 0,
    percentage: 0,
  });
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);

  const videoProgressRef = useRef(videoProgress);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  const [lastSavedProgress, setLastSavedProgress] = useState({
    watched: 0,
    duration: 0,
  });
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const {
    data: show,
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ['showDetail', id],
    queryFn: () => getDetailShow(id as unknown as number, {}),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // get progress tv
  const { data: progress } = useQuery<any>({
    queryKey: ['progress', id],
    queryFn: () => getShowProgressUser(id as unknown as string),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const { data: seasonData, isLoading: isLoadingSeason } = useQuery<any>({
    queryKey: ['seasonDetails', id, season],
    queryFn: () => getSeasonDetails(id, season),
    enabled: !!show?.id,
  });

  console.log('progress: ', progress);

  useEffect(() => {
    videoProgressRef.current = videoProgress;
  }, [videoProgress]);
  // Update useEffect untuk mengambil data progress dari API

  // Efek untuk interval penyimpanan
  useEffect(() => {
    if (!show) return;

    const saveProgressPeriodically = async () => {
      if (
        videoProgress.watched !== lastSavedProgress.watched ||
        videoProgress.duration !== lastSavedProgress.duration
      ) {
        try {
          await saveProgress(videoProgress);
          setLastSavedProgress(videoProgress);
        } catch (error) {
          console.error('Gagal menyimpan progress:', error);
        }
      }
    };

    const interval = setInterval(saveProgressPeriodically, 30000);
    return () => clearInterval(interval);
  }, [show, videoProgress, lastSavedProgress]);

  useEffect(() => {
    const getProgress = async () => {
      const progress = await fetchVideoProgress({ id, season, episode });
      if (progress) {
        setVideoProgress(progress);
      }
    };

    getProgress();
  }, [id, season, episode]);

  useEffect(() => {
    const savedServer = localStorage.getItem('selectedVideoServer');
    if (savedServer) setSelectedServer(savedServer);

    const history = JSON.parse(localStorage.getItem('watchHistory') || '{}');
    const tvHistory = history[`${id}`] as TVHistory;

    if (tvHistory?.seasons?.[season]?.episodes?.[episode]) {
      setVideoProgress(tvHistory.seasons[season].episodes[episode].progress);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://vidlink.pro') return;

      if (event.data?.type === 'MEDIA_DATA') {
        const mediaData = event.data.data;

        if (mediaData && mediaData[id]?.progress) {
          const lastSeason = mediaData[id].last_season_watched;
          const lastEpisode = mediaData[id].last_episode_watched;
          const key = `s${lastSeason}e${lastEpisode}`;

          const watched =
            mediaData[id].show_progress[key]?.progress.watched ?? 0;
          const duration =
            mediaData[id].show_progress[key]?.progress.duration ?? 1;

          const progress = {
            watched,
            duration,
            percentage: (watched / duration) * 100,
          };

          setVideoProgress(progress);
          saveProgress(progress);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      saveProgress(videoProgressRef.current);
    };
  }, [id, season, episode, show]);

  // Efek untuk inisialisasi progress
  useEffect(() => {
    const initializeProgress = async () => {
      if (progress?.episodes?.length > 0) {
        // Cari episode terakhir yang ditonton
        const lastWatched = progress.episodes.reduce(
          (latest: any, current: any) =>
            new Date(current.watchedDate) > new Date(latest.watchedDate)
              ? current
              : latest
        );

        if (lastWatched) {
          setSeason(lastWatched.season.toString());
          setEpisode(lastWatched.episode.toString());
          setVideoProgress({
            watched: lastWatched.durationWatched,
            duration: lastWatched.totalDuration,
            percentage: lastWatched.progressPercentage,
          });
        }
      } else {
        const localProgress = localStorage.getItem('watchHistory');
        if (localProgress) {
          const parsed = JSON.parse(localProgress)[id];
          if (parsed?.last_watched) {
            setSeason(parsed.last_watched.season.toString());
            setEpisode(parsed.last_watched.episode.toString());
          }
        }
      }
    };

    initializeProgress();
  }, [progress, id]);

  // Fungsi penyimpanan progress yang disederhanakan
  const saveProgress = useCallback(
    async (progress: typeof videoProgress) => {
      if (!show) return;

      const historyItem = {
        type: 'tv' as const,
        contentId: show.id,
        season: parseInt(season),
        episode: parseInt(episode),
        title: show.name,
        poster: show.poster_path,
        backdrop_path: show.backdrop_path,
        duration: progress.duration,
        durationWatched: progress.watched,
        totalDuration: progress.duration,
        genres: show.genres?.map((g: any) => g.name) || [],
        progressPercentage: progress.percentage,
      };

      await addRecentlyWatched(historyItem);
    },
    [show, season, episode]
  );

  const getVideoUrl = () => {
    switch (selectedServer) {
      case 'Media 1':
        return `https://vidlink.pro/tv/${id}/${season}/${episode}`;
      case 'Media 2':
        return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=false`;
      case 'Media 3':
        return `https://vidsrc.cc/v3/embed/tv/${id}/${season}/${episode}?autoPlay=false`;
      case 'Media 4':
        return `https://player.videasy.net/tv/${id}/${season}/${episode}`;
      default:
        return `https://vidlink.pro/tv/${id}/${season}/${episode}`; // Default to server 1
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 text-white">
        Error loading data
      </div>
    );
  }

  const selectedSeasonData = show?.seasons?.find(
    (s: any) => s.season_number === parseInt(season)
  );

  // const totalEpisodes = selectedSeasonData?.episode_count || 0;
  const episodes = seasonData?.episodes || [];

  const currentEpisodeData =
    selectedSeasonData?.episodes?.[parseInt(episode) - 1];

  // next and previous episode handle
  const currentEpisodeIndex = useMemo(() => {
    return episodes.findIndex(
      (ep: any) => ep.episode_number === parseInt(episode)
    );
  }, [episode, episodes]);

  const hasPreviousEpisode = useMemo(
    () => currentEpisodeIndex > 0,
    [currentEpisodeIndex]
  );
  const hasNextEpisode = useMemo(
    () => currentEpisodeIndex < episodes.length - 1,
    [currentEpisodeIndex, episodes.length]
  );

  const { previousEpisode, nextEpisode } = useMemo(() => {
    const prevEp = hasPreviousEpisode
      ? episodes[currentEpisodeIndex - 1]
      : null;
    const nextEp = hasNextEpisode ? episodes[currentEpisodeIndex + 1] : null;
    return { previousEpisode: prevEp, nextEpisode: nextEp };
  }, [currentEpisodeIndex, episodes, hasPreviousEpisode, hasNextEpisode]);

  const handleEpisodeNavigation = useCallback(
    (type: 'prev' | 'next') => {
      if (type === 'prev' && hasPreviousEpisode) {
        setEpisode(previousEpisode.episode_number.toString());
      }
      if (type === 'next' && hasNextEpisode) {
        setEpisode(nextEpisode.episode_number.toString());
      }
    },
    [hasPreviousEpisode, hasNextEpisode, previousEpisode, nextEpisode]
  );

  const handleEpisodeChange = useCallback(
    (episodeNumber: string) => {
      // Update episode state
      setEpisode(episodeNumber);

      // Scroll to video player section smoothly
      // Use setTimeout to ensure DOM has updated before scrolling
      setTimeout(() => {
        if (videoPlayerRef.current) {
          videoPlayerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 0);
    },
    [] // Empty dependency array since it doesn't depend on any changing values
  );

  return (
    <>
      <Metadata
        seoTitle={`${show?.name} - CrowdFunding`}
        seoDescription={show?.overview}
        seoKeywords={show?.genres?.map((genre: any) => genre.name).join(', ')}
      />

      <div className="min-h-screen bg-gray-900 pb-20 text-white">
        <main
          className={`mx-auto transition-all duration-300 ${
            isFullScreen ? 'max-w-full' : 'max-w-7xl px-4'
          }`}
        >
          {/* Header Section */}
          {!isFullScreen && (
            <div className="mx-auto max-w-7xl px-4 pt-8">
              <div className="mb-8 flex flex-col gap-8 lg:flex-row">
                {/* Show Poster */}
                {/*<div className="w-full lg:w-72 flex-shrink-0">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${show?.poster_path}`} 
                  alt={show?.name}
                  className="rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </div>*/}

                {/* Show Info */}
                <div className="flex-1 space-y-4">
                  <h1 className="text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
                    {show?.name}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="badge badge-info">
                      ⭐ {show?.vote_average?.toFixed(1)} / 10
                    </div>
                    {show?.genres?.map((genre: any) => (
                      <div key={genre.id} className="badge badge-outline">
                        {genre.name}
                      </div>
                    ))}
                    <div className="badge badge-ghost">
                      🕒{' '}
                      {currentEpisodeData?.runtime ||
                        show?.episode_run_time?.[0]}
                      m
                    </div>
                  </div>

                  <p className="leading-relaxed text-gray-300">
                    {currentEpisodeData?.overview || show?.overview}
                  </p>

                  {/* Air Date & Director */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                    <div>
                      <Calendar className="mr-2 inline-block h-4 w-4" />
                      {new Date(
                        currentEpisodeData?.air_date || show?.first_air_date
                      ).toLocaleDateString()}
                    </div>
                    {currentEpisodeData?.director && (
                      <div>🎬 Directed by {currentEpisodeData.director}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Player Section */}
          <div
            ref={videoPlayerRef}
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
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setSelectedServer(`Media ${num}`);
                          localStorage.setItem(
                            'selectedVideoServer',
                            `Media ${num}`
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

          {!isFullScreen && (
            <div className="mx-auto mt-4 max-w-7xl px-4">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => handleEpisodeNavigation('prev')}
                  disabled={!hasPreviousEpisode}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
                    hasPreviousEpisode
                      ? 'bg-blue-600/30 text-blue-400 hover:bg-blue-600/50'
                      : 'cursor-not-allowed bg-gray-800/30 text-gray-500'
                  } `}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="hidden sm:block">Previous Episode</span>
                  {hasPreviousEpisode && (
                    <span className="ml-2 text-sm text-gray-300">
                      Ep {previousEpisode.episode_number}:{' '}
                      {previousEpisode.name}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleEpisodeNavigation('next')}
                  disabled={!hasNextEpisode}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
                    hasNextEpisode
                      ? 'bg-blue-600/30 text-blue-400 hover:bg-blue-600/50'
                      : 'cursor-not-allowed bg-gray-800/30 text-gray-500'
                  } `}
                >
                  <span className="hidden sm:block">Next Episode</span>
                  {hasNextEpisode && (
                    <span className="mr-2 text-sm text-gray-300">
                      Ep {nextEpisode.episode_number}: {nextEpisode.name}
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Season & Episode Selector */}
          {!isFullScreen && (
            <div className="mx-auto max-w-7xl px-4 pt-8">
              <div className="rounded-xl bg-gray-800/50 p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Season Selector */}
                  <div className="w-full md:w-64">
                    <h3 className="mb-4 text-lg font-semibold">Seasons</h3>
                    <div className="space-y-2">
                      {show?.seasons?.map((s: any) => (
                        <button
                          key={s.season_number}
                          onClick={() => {
                            setSeason(s.season_number.toString());
                            setEpisode('1');
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-4 py-3 ${
                            season === s.season_number.toString()
                              ? 'bg-blue-600/30 text-blue-400'
                              : 'hover:bg-gray-700/30'
                          }`}
                        >
                          <span>Season {s.season_number}</span>
                          <span className="text-sm text-gray-400">
                            {s.episode_count} episodes
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Episode Grid */}
                  <div className="flex-1">
                    <h3 className="mb-4 text-lg font-semibold">
                      Episodes - Season {season}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {episodes.map((ep: any) => {
                        const epProgress =
                          progress?.episodes?.find(
                            (e: any) =>
                              e.season === parseInt(season) &&
                              e.episode === ep.episode_number
                          )?.progressPercentage || 0;

                        const isCurrentEpisode =
                          episode === ep.episode_number.toString();
                        const hasProgress = epProgress > 0;

                        return (
                          <div
                            key={ep.id}
                            className={`group relative cursor-pointer transition-all duration-300 ${
                              isCurrentEpisode
                                ? 'scale-[1.02] ring-2 ring-blue-400'
                                : 'ring-1 ring-gray-700'
                            } overflow-hidden rounded-xl bg-gray-800 shadow-xl hover:scale-[1.02] hover:ring-blue-300`}
                            onClick={() =>
                              handleEpisodeChange(ep.episode_number.toString())
                            }
                          >
                            {/* Image Container */}
                            <div className="relative aspect-video">
                              {ep.still_path ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/${
                                    isMobile ? 'w500' : 'w780'
                                  }${ep.still_path}`}
                                  alt={ep.name}
                                  fill
                                  loading="lazy"
                                  className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                                  placeholder="blur"
                                  blurDataURL={`https://image.tmdb.org/t/p/${
                                    isMobile ? 'w92' : 'w185'
                                  }${ep.still_path}`}
                                  sizes={
                                    isMobile
                                      ? '100vw'
                                      : '(max-width: 1024px) 50vw, 33vw'
                                  }
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                                  <Tv className="h-8 w-8 text-gray-500" />
                                </div>
                              )}

                              {/* Top Badges */}
                              <div className="absolute left-2 top-2 flex gap-2">
                                <div className="rounded-md bg-black/80 px-2 py-1 text-xs font-semibold">
                                  Ep. {ep.episode_number}
                                </div>
                                {ep.air_date && (
                                  <div className="rounded-md bg-black/80 px-2 py-1 text-xs">
                                    {new Date(ep.air_date).getFullYear()}
                                  </div>
                                )}
                              </div>

                              {/* Progress Bar */}
                              {hasProgress && (
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-700">
                                  <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${epProgress}%` }}
                                  />
                                </div>
                              )}
                            </div>

                            {/* Card Body */}
                            <div className="space-y-2 p-3">
                              {/* Title Section */}
                              <h3 className="line-clamp-2 text-sm font-semibold leading-tight">
                                {ep.name || `Episode ${ep.episode_number}`}
                              </h3>

                              {/* Metadata */}
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>
                                    {ep.runtime ||
                                      show?.episode_run_time?.[0] ||
                                      'N/A'}
                                    m
                                  </span>
                                </div>

                                {hasProgress && (
                                  <div className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-1">
                                    <span className="text-blue-400">
                                      {Math.round(epProgress)}%
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Overview */}
                              {ep.overview && (
                                <p className="line-clamp-3 text-xs leading-relaxed text-gray-300">
                                  {ep.overview}
                                </p>
                              )}
                            </div>

                            {/* Hover Overlay */}
                            {!isCurrentEpisode && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <Play className="h-8 w-8 text-white/90" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default page;

interface TVHistory {
  contentId: number; // Ganti id menjadi contentId
  title: string;
  type: 'tv';
  backdrop_path: string;
  poster_path?: string;
  seasons: {
    [season: string]: {
      episodes: {
        [episode: string]: {
          progress: {
            watched: number;
            duration: number;
            percentage: number;
          };
          last_updated: string;
          episode_title?: string;
        };
      };
    };
  };
  last_watched: {
    season: number;
    episode: number;
    progress: number;
    timestamp: string;
  };
  last_updated: string;
}
