'use client';

import { useUserProfile } from '@/hooks/useUserProfile';
import {
  Clock,
  Play,
  Tv,
  Film,
  History,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import {
  formatIndonesianDate,
  getTimeAgo,
} from '@/lib/movieapps/function/dateFormatter';
import { useState } from 'react';
import {
  removeRecentlyWatched,
  clearAllRecentlyWatched,
} from '@/Service/actionUser';
import { toast } from 'sonner';
import { Modal } from '@/components/movieapps/common/Modal';
import { Metadata } from '@/app/movieapps/Metadata';

const MovieHistoryCard = ({
  item,
  onDelete,
}: {
  item: any;
  onDelete: () => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const progressColor =
    item.progressPercentage >= 90
      ? 'bg-green-500'
      : item.progressPercentage >= 50
        ? 'bg-yellow-500'
        : 'bg-red-500';

  const handleDelete = async () => {
    // if (!confirm(`Hapus ${item.title} dari riwayat?`)) return;
    try {
      await removeRecentlyWatched(item._id);
      toast('Berhasil dihapus dari riwayat');
      onDelete();
    } catch (error) {
      if (error instanceof Error) {
        //check if error is an instance of Error
        toast(error.message);
      } else {
        toast('Terjadi kesalahan yang tidak diketahui'); //handle other cases
      }
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hover:bg-gray-750 group relative flex flex-col items-start gap-4 rounded-xl bg-gray-800 p-4 transition-colors sm:flex-row"
    >
      {/* Delete Button */}
      <button
        onClick={() => setShowDeleteModal(true)}
        className="absolute right-2 top-2 rounded-full p-1.5 text-red-500 opacity-0 transition-opacity hover:bg-gray-700 disabled:opacity-50 group-hover:opacity-100"
        aria-label="Hapus riwayat"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      {/* Poster */}
      <div className="relative w-full flex-shrink-0 sm:w-32 lg:w-24">
        <img
          src={`https://image.tmdb.org/t/p/w200${item.poster}`}
          alt={item.title}
          className="h-48 w-full rounded-lg object-cover sm:h-36"
        />
        <div className="absolute bottom-1 left-1 rounded bg-black/80 px-2 py-1 text-xs">
          {Math.floor(item.durationWatched / 3600).toFixed(0)}h{' '}
          {Math.floor((item.durationWatched % 3600) / 60)}m
        </div>
        {item.type === 'tv' && (
          <div className="absolute right-1 top-1 rounded bg-black/80 px-2 py-1 text-xs">
            S{item.season} E{item.episode}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-lg font-semibold">{item.title}</h3>
          <span className="hidden text-xs text-gray-400 sm:inline-block">
            {formatIndonesianDate(new Date(item.watchedDate))}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-2 rounded-full bg-gray-700">
            <motion.div
              className={`h-full rounded-full ${progressColor} transition-all duration-300`}
              // style={{ width: `${item.progressPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${item.progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span>{item.progressPercentage}% Selesai</span>
            <span>
              {Math.floor(item.totalDuration / 3600).toFixed(0)}h{' '}
              {(item.totalDuration % 60).toFixed(0)}m total
            </span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {item.genres?.map((genre: string) => (
            <span
              key={genre}
              className="rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Mobile Date and Time Ago */}
        <div className="flex flex-col gap-1 text-sm text-gray-400 sm:hidden">
          <span>{formatIndonesianDate(new Date(item.watchedDate))}</span>
          <div className="flex items-center gap-1">
            <History className="h-4 w-4" />
            <span>Ditonton {getTimeAgo(new Date(item.watchedDate))}</span>
          </div>
        </div>

        {/* Desktop Time Ago */}
        <div className="hidden items-center gap-1 text-sm text-gray-400 sm:flex">
          <History className="h-4 w-4" />
          <span>Ditonton {getTimeAgo(new Date(item.watchedDate))}</span>
        </div>
      </div>
      {/* Modal konfirmasi */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Hapus dari Riwayat"
        message={`Apakah Anda yakin ingin menghapus "${item.title}" dari riwayat tontonan?`}
      />
    </motion.div>
  );
};

export default function Page() {
  const {
    data: historyData,
    isLoading,
    error,
    refetch,
  } = useUserProfile({
    queryType: 'history',
  });
  const [showClearAllModal, setShowClearAllModal] = useState(false);

  const handleClearAllConfirm = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) return;
    try {
      await clearAllRecentlyWatched();
      toast('Semua riwayat berhasil dihapus');
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        //check if error is an instance of Error
        toast(error.message);
      } else {
        toast('Terjadi kesalahan yang tidak diketahui'); //handle other cases
      }
    } finally {
      setShowClearAllModal(false);
    }
  };

  return (
    <>
      <Metadata
        seoTitle="Histori Tontonan - Dashboard"
        seoDescription="Histori tontonan yang pernah kamu tonton"
        seoKeywords="History, histori, tontonan"
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/85 p-3">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Riwayat Nonton</h1>
              <p className="text-gray-400">
                Film dan series yang pernah kamu tonton
              </p>
            </div>
          </div>

          {historyData?.history?.length > 0 && (
            <button
              onClick={() => setShowClearAllModal(true)}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center text-red-500">
            <AlertTriangle className="h-12 w-12" />
            <p>Gagal memuat riwayat nonton</p>
            <button
              onClick={() => refetch()}
              className="rounded-lg bg-gray-700 px-4 py-2 transition-colors hover:bg-gray-600"
            >
              Coba Lagi
            </button>
          </div>
        ) : historyData?.history?.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {historyData.history.map((item: any) => (
              <MovieHistoryCard key={item._id} item={item} onDelete={refetch} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Film className="mb-4 h-16 w-16 text-gray-600" />
            <h2 className="mb-2 text-2xl font-semibold text-gray-400">
              Belum ada riwayat
            </h2>
            <p className="max-w-md text-gray-600">
              Mulai tonton film atau series favoritmu dan akan muncul di sini
            </p>
          </div>
        )}
        <Modal
          isOpen={showClearAllModal}
          onClose={() => setShowClearAllModal(false)}
          onConfirm={handleClearAllConfirm}
          title="Hapus Semua Riwayat"
          message="Apakah Anda yakin ingin menghapus semua riwayat tontonan? Tindakan ini tidak dapat dibatalkan."
        />
      </div>
    </>
  );
}
