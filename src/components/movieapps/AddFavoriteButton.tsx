// src/components/AddToWatchlistButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useFavoriteStore, FavoriteItem } from '@/store/useFavoriteStore';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/useIsMobile';

import { toast } from 'sonner';

export const AddFavoriteButton = ({ item }: { item: FavoriteItem }) => {
  const { favorites, addToFavorites, removeFromFavorites, syncWithServer } =
    useFavoriteStore();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // Improved isFavorite logic
  const isFavorite =
    favorites?.some(
      (i: FavoriteItem) =>
        i.itemId === (item.itemId ?? item.id) &&
        i.type === (item.type ?? item.media_type)
    ) ?? false;

  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center"
    >
      <Heart
        className={`h-8 w-8 ${
          isFavorite
            ? 'fill-red-500 text-red-500'
            : 'fill-none text-gray-200 dark:text-white'
        }`}
      />
    </motion.button>
  );
};
