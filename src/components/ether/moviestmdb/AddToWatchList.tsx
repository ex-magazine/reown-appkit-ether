'use client';

import { Button } from '@/components/ether/moviestmdb/ui/button';
import { useWatchlist } from '@/hooks/use-watchlist';
import toast from 'react-hot-toast';

export default function AddToWatchlistButton({ movieId }: { movieId: number }) {
  const {
    isInWatchlist,
    setIsInWatchlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  } = useWatchlist({
    movieId,
  });

  const handleClick = async () => {
    const previousWatchlistState = isInWatchlist;

    try {
      if (isInWatchlist) {
        setIsInWatchlist(false);
        await handleRemoveFromWishlist();
        toast('Removed from watchlist');
      } else {
        setIsInWatchlist(true);
        await handleAddToWishlist();
        toast('Added to watchlist');
      }
    } catch (error) {
      setIsInWatchlist(previousWatchlistState);
      toast.error('Error updating watchlist');
    }
  };

  return (
    <Button
      className="bg-primary text-primary-foreground"
      onClick={handleClick}
    >
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </Button>
  );
}
