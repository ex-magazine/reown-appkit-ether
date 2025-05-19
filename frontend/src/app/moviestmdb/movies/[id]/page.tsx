import AddToWatchlistButton from '@/components/ether/moviestmdb/AddToWatchList';
import LazyImage from '@/components/ether/moviestmdb/LazyImage';
import MovieActorsSection from '@/components/ether/moviestmdb/MovieActorsSection';
import { dateFormatter } from '@/lib/ether/moviestmdb/date-formatter';
import { FaStar } from 'react-icons/fa6';
import {
  getMovies,
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
} from '@/action/movies';
import { generateTmdbImagePath } from '@/lib/ether/moviestmdb/tmdb-image-path';
import RecommendationSection from '@/components/ether/moviestmdb/RecommendationSection';
import { getImageProps } from 'next/image';


interface Params {
    params: Promise<{ id: string }>;
}


export default async function MoviePage({ params }: Params) {
    const movieId = (await params).id;

    const [movie, credits, recommendations] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getMovieRecommendations(movieId),
    ]);

    const optimizedBackdrop = getImageProps({
        src: generateTmdbImagePath(movie.backdrop_path, 780),
        alt: movie.title,
        width: 1280,
        height: 700,
        quality: 10,
        priority: true,
    }).props.src;

    return (
        <>
            <section
                className="bg-cover bg-center bg-no-repeat py-8 text-white mb-8 -mt-4 relative"
                style={{
                    backgroundImage: `linear-gradient(#000000bb, #000000bb), url(${optimizedBackdrop})`,
                }}
            >
                sssssssssssssssssss
            </section>
            
        </>
    );
}
