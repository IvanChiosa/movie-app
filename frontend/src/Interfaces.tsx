export interface Movie {
    title: string;
    description: string;
    poster: string;
    // Fügen Sie hier weitere Eigenschaften hinzu, falls erforderlich
}

export interface HeroProps {
    movies: Movie[];
}