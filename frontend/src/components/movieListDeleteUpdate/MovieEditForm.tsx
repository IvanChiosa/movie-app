import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
    id: string;
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    genres: string;
    backdrops: string;
}

interface MovieEditFormProps {
    movieId: string;
    onUpdateSuccess: () => void;
    onUpdateFailure: (message: string) => void;
}

const MovieEditForm: React.FC<MovieEditFormProps> = ({ movieId, onUpdateSuccess, onUpdateFailure }) => {
    const [movie, setMovie] = useState<Movie>({
        id: '',
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        poster: '',
        genres: '',
        backdrops: ''
    });

    useEffect(() => {
        // Lade die Filmdaten vom Server
        axios.get(`/api/v1/movies/${movieId}`)
            .then(response => setMovie(response.data))
            .catch(error => console.error('Fehler beim Laden der Filmdaten', error));
    }, [movieId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMovie({ ...movie, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.put(`/api/v1/movies/${movieId}`, movie);
            onUpdateSuccess();
        } catch (error) {
            onUpdateFailure('Fehler beim Aktualisieren des Films');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Formularfelder für die Filmdaten */}
            {/* Beispiel: */}
            <input
                name="title"
                value={movie.title}
                onChange={handleInputChange}
            />
            {/* Weitere Eingabefelder entsprechend hinzufügen */}
            <button type="submit">Änderungen speichern</button>
        </form>
    );
};

export default MovieEditForm;