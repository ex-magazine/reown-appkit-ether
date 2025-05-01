// src/components/AddToWatchlistButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useWatchlistStore, WatchlistItem } from '@/store/useWatchListStore';
import { Bookmark, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/useIsMobile';

import { toast } from 'sonner';

export const AddToWatchListButton = ({ item }: { item: WatchlistItem }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist, syncWithServer } =
    useWatchlistStore();

  const pathname = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center"
    >
      <Bookmark className="h-10 w-10 fill-yellow-500 text-yellow-500" />
    </motion.button>
  );
};
