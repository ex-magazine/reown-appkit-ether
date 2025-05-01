// components/WatchStatistics.tsx
'use client';

import { motion } from 'framer-motion';
import { Film, Tv, Clock, Star, Zap, Calendar, Activity } from 'lucide-react';
import capitalize from '@/lib/movieapps/function/capitalize';

interface WatchStatisticsProps {
  statsData: any;
  statsType: 'month' | 'week';
  setStatsType: (type: 'month' | 'week') => void;
}

const WatchStatistics = ({
  statsData,
  statsType,
  setStatsType,
}: WatchStatisticsProps) => {
  // Format data period
  const periodData = statsData?.data?.period?.data || [];
  const summaryData = statsData?.data?.period?.summary || {};
  const overallData = statsData?.data?.overall || {};
  const recentActivity = statsData?.data?.recentActivity || [];

  // Format durasi dalam jam
  const formatHours = (seconds: number) => {
    if (!seconds) return '0j 0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}j ${minutes}m`;
  };

  // Hitung max duration untuk scaling grafik
  const maxDuration = Math.max(
    ...periodData.map((e: any) => e.totalDuration || 0),
    1 // Minimal 1 untuk menghindari pembagian 0
  );

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Statistik Menonton</h2>
          <p className="text-sm text-gray-400">
            {statsType === 'month'
              ? statsData?.data?.period?.label
              : '7 Hari Terakhir'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatsType('month')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
              statsType === 'month'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Calendar size={18} />
            Bulanan
          </button>
          <button
            onClick={() => setStatsType('week')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
              statsType === 'week'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Zap size={18} />
            Mingguan
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-gray-800 p-6">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <StatBox
            icon={<Clock size={20} />}
            title="Durasi"
            value={overallData.formattedWatchTime}
            color="text-blue-400"
          />

          <StatBox
            icon={<Film size={20} />}
            title="Film / Series"
            value={
              overallData.contentTypeDistribution?.[0]?.count +
              overallData.contentTypeDistribution?.[1]?.count
            }
            color="text-purple-400"
          />

          <StatBox
            icon={<Star size={20} />}
            title="Rate Penyelesaian"
            value={`${summaryData.completionRate || 0}%`}
            color="text-yellow-400"
          />

          <StatBox
            icon={<Tv size={20} />}
            title={`Rasio ${capitalize(
              overallData.contentTypeDistribution?.[0].type
            )} : ${capitalize(overallData.contentTypeDistribution?.[1].type)}`}
            value={`${overallData.contentTypeDistribution?.[0].count || 0} : ${
              overallData.contentTypeDistribution?.[1].count || 0
            }`}
            color="text-green-400"
          />

          <StatBox
            icon={<Activity size={20} />}
            title="Dalam Progres"
            value={overallData.totalInProgress || 0}
            color="text-orange-400"
          />

          <StatBox
            icon={<Star size={20} />}
            title="Konten Favorit"
            value={overallData.totalFavorites || 0}
            color="text-pink-400"
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm text-gray-400">
            <span>Aktivitas Menonton</span>
            <span>{statsType === 'month' ? 'Bulan Ini' : 'Minggu Ini'}</span>
          </div>

          {/* Container grafik */}
          <div className="h-64 rounded-lg bg-gray-700/30 p-4">
            {periodData?.length > 0 ? (
              <div className="flex h-full items-end justify-between gap-1">
                {periodData.map((entry: any, index: number) => {
                  const maxDuration = Math.max(
                    ...periodData.map((e: any) => e.totalDuration),
                    1 // Pastikan tidak division by zero
                  );

                  const heightPercentage =
                    (entry.totalDuration / maxDuration) * 100;
                  const barHeight = `${heightPercentage}%`;

                  return (
                    <motion.div
                      key={index}
                      className="relative flex-1 rounded-t bg-blue-500 transition-all"
                      style={{ height: barHeight }}
                      initial={{ height: 0 }}
                      animate={{ height: barHeight }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Label durasi */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-blue-300">
                        {formatHours(entry.totalDuration)}
                      </div>

                      {/* Tooltip hover */}
                      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs group-hover:block">
                        {statsType === 'month' ? entry.label : entry.dayOfWeek}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                Tidak ada aktivitas menonton
              </div>
            )}
          </div>

          {/* Label sumbu X */}
          <div className="mt-2 flex justify-between px-2 text-xs text-gray-500">
            {periodData?.map((entry: any) => (
              <span
                key={entry.label || entry.date}
                className="flex-1 truncate text-center"
              >
                {statsType === 'month'
                  ? entry.label?.replace('Minggu ', 'W')
                  : entry.dayOfWeek}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 gap-6 border-t border-gray-700 pt-6 md:grid-cols-2">
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-blue-400" />
              <span className="font-medium">Waktu Nonton Favorit:</span>
              <span className="text-blue-400">
                {summaryData.favoriteWatchTimes?.[0]?.timeOfDay || '-'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Film size={16} className="text-purple-400" />
              <span className="font-medium">Genre Dominan:</span>
              <div className="flex gap-2">
                {overallData.mostWatchedGenres
                  ?.slice(0, 3)
                  .map((genre: any, i: number) => (
                    <span
                      key={i}
                      className="rounded-full bg-gray-700 px-2 py-1 text-xs"
                    >
                      {genre.genre}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Star size={16} className="text-yellow-400" />
              <span className="font-medium">Rata-rata Progress:</span>
              <span className="text-yellow-400">
                {summaryData.avgProgressPercentage?.toFixed(1) || 0}%
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Zap size={16} className="text-green-400" />
              <span className="font-medium">Durasi Harian:</span>
              <span className="text-green-400">
                {summaryData.averageWatchTimePerDay || '-'}
              </span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl bg-gray-800/50 pt-2 backdrop-blur-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-200">
              <Activity className="h-5 w-5 text-purple-400" />
              Aktivitas Terakhir
            </h3>
            <div className="space-y-3">
              {recentActivity
                .slice(0, 3)
                .map((activity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg bg-gray-700/30 p-3"
                  >
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${activity.poster}`}
                        alt={activity.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-medium text-gray-200">
                        {activity.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {activity.type === 'tv'
                            ? `S${activity.season} E${activity.episode}`
                            : 'Film'}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gray-600" />
                        <span className="text-xs text-gray-400">
                          {activity.formattedWatchedDate}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-700">
                        <div
                          className={`h-full rounded-full ${
                            activity.progressPercentage >= 90
                              ? 'bg-green-500'
                              : activity.progressPercentage >= 50
                                ? 'bg-blue-500'
                                : 'bg-purple-500'
                          }`}
                          style={{ width: `${activity.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                    {/* Modifikasi bagian progress percentage */}
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        activity.progressPercentage >= 100
                          ? 'bg-green-500/20 text-green-400'
                          : activity.progressPercentage >= 90
                            ? 'bg-blue-500/20 text-blue-400'
                            : activity.progressPercentage >= 50
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {activity.progressPercentage}%
                      {activity.progressPercentage >= 100 ? ' ✓' : ''}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-xl bg-gray-800/50 pt-2">
            <div className="mb-4 flex items-center gap-3">
              <Activity size={20} className="text-cyan-400" />
              <h4 className="font-semibold">Konsistensi Nonton</h4>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm text-gray-400">
                  Hari / Waktu Aktif
                </span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-md font-bold text-cyan-400">
                      {periodData.filter((d: any) => d.hasActivity).length}
                    </span>
                    <span className="text-md text-gray-400">hari</span>
                  </div>
                  <div className="h-6 w-px bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <span className="text-md font-bold text-cyan-400">
                      {summaryData.favoriteWatchTimes?.[0]?.timeOfDay || '-'}
                    </span>
                    <span className="text-md text-gray-400">Waktu favorit</span>
                  </div>
                </div>
              </div>
              <div className="relative h-24 w-24">
                <CircularProgress
                  value={
                    (periodData.filter((d: any) => d.hasActivity).length /
                      (statsType === 'week' ? 7 : 28)) *
                    100
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Skor Penyelesaian</span>
                <span className="text-xl font-bold text-yellow-400">
                  {Math.round(
                    summaryData.avgProgressPercentage *
                      (summaryData.completionRate / 100)
                  ) || 0}
                  /100
                </span>
              </div>
              <div className="relative">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-md font-semibold text-green-400">
                      {summaryData.completionRate || 0}% Tuntas
                    </span>
                    <span className="text-md font-semibold text-blue-400">
                      {100 - (summaryData.completionRate || 0)}% Progress
                    </span>
                  </div>
                </div>
                <div className="mb-4 flex h-2 overflow-hidden rounded-full bg-gray-700 text-xs">
                  <div
                    style={{ width: `${summaryData.completionRate || 0}%` }}
                    className="flex flex-col justify-center bg-green-500 shadow-none"
                  />
                  <div
                    style={{
                      width: `${100 - (summaryData.completionRate || 0)}%`,
                    }}
                    className="flex flex-col justify-center bg-blue-500 shadow-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Efisiensi Penyelesaian */}
          {/*<div className="bg-gray-800/50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={20} className="text-yellow-400" />
              <h4 className="font-semibold">Efisiensi Nonton</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Skor Penyelesaian</span>
                <span className="text-xl font-bold text-yellow-400">
                  {Math.round(summaryData.avgProgressPercentage * (summaryData.completionRate/100)) || 0}/100
                </span>
              </div>
              <div className="relative pt-2">
                <div className="flex mb-2 items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold text-green-400">
                      {summaryData.completionRate || 0}% Tuntas
                    </span>
                    <span className="text-xs font-semibold text-blue-400">
                      {100 - (summaryData.completionRate || 0)}% Progress
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-700">
                  <div
                    style={{ width: `${summaryData.completionRate || 0}%` }}
                    className="bg-green-500 shadow-none flex flex-col justify-center"
                  />
                  <div
                    style={{ width: `${100 - (summaryData.completionRate || 0)}%` }}
                    className="bg-blue-500 shadow-none flex flex-col justify-center"
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/* Konten Paling Aktif */}
          {/*<div className="bg-gray-800/50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Tv size={20} className="text-green-400" />
              <h4 className="font-semibold">Konten Paling Aktif</h4>
            </div>
            <div className="space-y-3">
              {recentActivity
                .reduce((acc: any[], curr: any) => {
                  const existing = acc.find(i => i.title === curr.title)
                  existing ? existing.count++ : acc.push({...curr, count: 1})
                  return acc
                }, [])
                .sort((a, b) => b.count - a.count)
                .slice(0, 2)
                .map((content: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-gray-700/20 rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w92${content.poster}`}
                      className="w-10 h-10 rounded-md"
                      alt={content.title}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{content.title}</div>
                      <div className="text-xs text-gray-400">
                        {content.count}x ditonton • {content.type.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// Komponen StatBox dengan error handling
const StatBox = ({ icon, title, value, color }: any) => (
  <motion.div
    className="rounded-xl bg-gray-800/50 p-4"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-3">
      <div
        className={`rounded-lg bg-opacity-20 p-2 ${color.replace('text', 'bg')}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div className={`text-xl font-semibold ${color}`}>{value ?? '-'}</div>
      </div>
    </div>
  </motion.div>
);

// Tambahkan komponen ini di bawah komponen StatBox atau di file terpisah
const CircularProgress = ({
  value,
  className = '',
}: {
  value: number;
  className?: string;
}) => {
  // Calculate dimensions and values
  const size = 72; // 24 * 4 = 96px (matching w-24 h-24)
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const center = size / 2;

  return (
    <div className={`relative inline-flex ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#374151" // text-gray-700 equivalent
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#06b6d4" // text-cyan-500 equivalent
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-cyan-400">
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
};

export default WatchStatistics;
