export interface Movie {
    _id: string,
    imdbId: string,
    title: string,
    releaseDate: string,
    trailerLink: string,
    poster: string,
    genres: string,
    backdrops: string,
    reviewIds: string
}

export interface HeroProps {
    movies: Movie[];
}

export interface Review {
    reviewIds: string;
    id: string;
    body: string;
}

export interface ReviewsProps {
    getMovieData: (movieId: string | undefined) => void;
    // getMovieData: () => void;
    movie: Movie | undefined;
    reviews: Review[];
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}