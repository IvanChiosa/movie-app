import React, {useState} from 'react';
import axios from 'axios';

export interface Movie {
    id: string;
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    genres: string[];
    backdrops: string[];
    // reviewIds: string;
}

interface UpdateMovieFormProps {
    movie: Movie;
    onUpdateSuccess: () => void;
    onUpdateFailure: () => void;
    onFormClose: () => void;
}

const UpdateMovieForm: React.FC<UpdateMovieFormProps> = ({movie, onUpdateSuccess, onUpdateFailure, onFormClose}) => {
    const [imdbId, setImdbId] = useState(movie.imdbId);
    const [title, setTitle] = useState(movie.title);
    const [releaseDate, setReleaseDate] = useState(movie.releaseDate);
    const [trailerLink, setTrailerLink] = useState(movie.trailerLink);
    const [poster, setPoster] = useState(movie.poster);
    const [genres, setGenres] = useState(movie.genres);
    const [backdrops, setBackdrops] = useState(movie.backdrops);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const updatedData = {imdbId, title, releaseDate, trailerLink, poster, genres, backdrops};
            await axios.put(`/api/v1/movies/${movie.id}`, updatedData);
            onUpdateSuccess();
            onFormClose();
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Films', error);
            onUpdateFailure();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={imdbId}
                onChange={(e) => setImdbId(e.target.value)}
                placeholder="IMDb ID"
            />
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel"
            />
            <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                placeholder="Veröffentlichungsdatum"
            />
            <input
                type="text"
                value={trailerLink}
                onChange={(e) => setTrailerLink(e.target.value)}
                placeholder="Trailer Link"
            />
            <input
                type="text"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                placeholder="Poster URL"
            />
            <input
                type="text"
                value={genres.join(", ")}
                onChange={(e) => setGenres(e.target.value.split(", "))}
                placeholder="Genres"
            />
            <input
                type="text"
                value={backdrops.join(", ")}
                onChange={(e) => setBackdrops(e.target.value.split(", "))}
                placeholder="Backdrops"
            />
            <button type="submit">Aktualisieren</button>
            <button onClick={onFormClose}>Abbrechen</button>
        </form>
    );
};
export default UpdateMovieForm;