import Link from 'next/link';
import LazyImage from './LazyImage';
import { FaStar } from 'react-icons/fa6';
import { TMovie } from '@/lib/schemas/movie-schemas';
import { generateTmdbImagePath } from '@/lib/tmdb-image-path';

const MovieCard = ({ movie }: { movie: TMovie }) => {
    return (
        <div className="group">
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
                <Link href={`/movies/${movie.id}`}>
                    <LazyImage
                        src={generateTmdbImagePath(movie.poster_path, 200)}
                        alt={movie.title}
                        width={210}
                        height={315}
                        quality={50}
                        className="object-cover w-full aspect-[2/3] transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <Link href={`/movies/${movie.id}`}>
                <h2 className="mt-2 text-sm leading-snug font-semibold">
                    {movie.title}
                </h2>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                        <FaStar size={16} className="text-orange-500" />
                        <p className="text-sm text-muted-foreground">
                            {movie.vote_average.toFixed(1)}
                        </p>
                    </div>

                    <span className="size-1 bg-gray-500 rounded-full"></span>

                    <p className="text-sm text-muted-foreground">
                        {movie.release_date.split('-')[0]}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
