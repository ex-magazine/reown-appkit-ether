'use client';
import 'swiper/css';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyImage from './LazyImage';
import SwiperRef from 'swiper';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Button } from './ui/button';
import { TCredits } from '@/lib/moviestmdb/schemas/movie-schemas';
import { generateTmdbImagePath } from '@/lib/moviestmdb/tmdb-image-path';

interface Props {
  cast: TCredits['cast'];
}

const MovieActorsSection = ({ cast }: Props) => {
  const swiperEl = useRef<SwiperRef | null>(null);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Cast</h2>
      <div className="group relative pb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => swiperEl.current?.slidePrev()}
          className="absolute left-2 top-1/3 z-[2] -translate-y-1/3 transform rounded-full opacity-0 transition-all group-hover:opacity-100"
        >
          <FaAngleLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => swiperEl.current?.slideNext()}
          className="absolute right-2 top-1/3 z-[2] -translate-y-1/3 transform rounded-full opacity-0 transition-all group-hover:opacity-100"
        >
          <FaAngleRight />
        </Button>

        <Swiper
          spaceBetween={16}
          slidesPerView={'auto'}
          onSwiper={(swiper) => (swiperEl.current = swiper)}
        >
          {cast.slice(0, 10).map((actor) => (
            <SwiperSlide key={actor.id} className="!w-auto">
              <div className="w-32 flex-shrink-0">
                <LazyImage
                  src={generateTmdbImagePath(actor.profile_path, 200)}
                  alt={actor.name}
                  width={200}
                  height={300}
                  className="aspect-[2/3] rounded-lg"
                />
                <p className="mt-2 text-sm font-semibold">{actor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {actor.character}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieActorsSection;
