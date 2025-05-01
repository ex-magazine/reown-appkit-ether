'use client';
import { cn } from '@/lib/moviestmdb/utils';
import Image, { ImageProps } from 'next/image';
import React, { memo, useState } from 'react';

interface Props extends ImageProps {}

const errorImage = '/placeholder.png';

const LazyImage = memo(
  ({ className, alt, ...props }: Props) => {
    const [error, setError] = useState(false);

    return (
      <Image
        alt={alt}
        className={cn('object-cover', className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
        onError={function (e) {
          if (error) return;

          e.currentTarget.src = errorImage;
          e.currentTarget.srcset = '';
          setError(true);
        }}
        {...props}
      />
    );
  },
  (prevProps, nextProps) => {
    const isSame =
      prevProps.src === nextProps.src &&
      prevProps.width === nextProps.width &&
      prevProps.height === nextProps.height;

    return isSame;
  },
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
