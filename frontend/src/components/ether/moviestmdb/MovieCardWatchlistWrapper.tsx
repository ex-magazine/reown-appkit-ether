'use client';
import { useWatchlist } from '@/hooks/use-watchlist';
import React, { ReactNode } from 'react';
import { Button } from './ui/button';
import { FaHeart } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const MovieCardWatchlistWrapper = ({
  movieId,
  children,
}: {
  movieId: number;
  children: ReactNode;
}) => {
  const { isInWatchlist, setIsInWatchlist, handleRemoveFromWishlist } =
    useWatchlist({
      movieId,
      isInWishlist: true,
      watch: false,
    });

  const handleClick = async () => {
    try {
      setIsInWatchlist(false);
      await handleRemoveFromWishlist();
    } catch (error) {
      setIsInWatchlist(true);
      toast('Error updating watchlist');
    }
  };

  if (!isInWatchlist) {
    return null;
  }

  return (
    <div className="group/wrapper relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute right-3 top-3 z-[1] transition-all group-hover/wrapper:opacity-100 md:opacity-0"
        onClick={handleClick}
      >
        <FaHeart color="red" />
      </Button>
      {children}
    </div>
  );
};

export default MovieCardWatchlistWrapper;
