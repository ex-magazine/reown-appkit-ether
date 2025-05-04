import { cn } from '@/lib/moviesprix/utils';
import { ICast } from '@/types/api-response';
import React from 'react';
import Image from './client/image';

type Props = {
  cast: ICast;
  className?: string;
};

const CastCard = ({ cast, className }: Props) => {
  return (
    <div>
      <div
        className={cn(
          'relative aspect-[3/4] h-40 overflow-hidden rounded-lg border shadow-md md:h-52',
          className,
        )}
      >
        <div className="absolute inset-0 h-full w-full object-cover">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
            placeholderSrc={`https://image.tmdb.org/t/p/w45/${cast.profile_path}`}
            alt={cast.name}
          />
        </div>

        {/* <p className="absolute px-1.5 py-0.5 top-1 left-1 bg-card/90 border rounded text-xs flex items-center gap-1 text-primary">
                    <IconStarFilled className="size-3 md:size-3.5" /> <span>{movie.vote_average.toFixed(1)}</span>
                </p> */}

        <div className="relative z-10 flex h-full items-end">
          <div className="w-full bg-gradient-to-b from-black/0 via-black/80 to-black p-2 pt-12">
            <h3 className="line-clamp-1 overflow-hidden text-ellipsis text-xs font-semibold md:text-sm">
              {cast.name}
            </h3>
            <p className="text-[10px] text-muted-foreground md:text-xs">
              {cast.character}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastCard;
