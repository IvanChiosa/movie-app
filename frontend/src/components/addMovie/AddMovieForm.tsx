import React, { useState } from 'react';
import axios from 'axios'; // Stellen Sie sicher, dass axios importiert ist

// Definition des MovieFormData Interfaces
interface MovieFormData {
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    genres: string;
    poster: string;
}

const AddMovieForm: React.FC = ( ) => {
    // Initialisierung des Formulars mit leeren Werten
    const initialFormData: MovieFormData = {
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        genres: '',
        poster: '',
    };

    // State für die Verwaltung der Formulardaten
    const [formData, setFormData] = useState<MovieFormData>(initialFormData);

    // Behandlung der Änderungen in den Formularfeldern
    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Funktion zum Senden des Formulars
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response=  axios.post('/api/v1/movies', formData);
            // Optional: Aktualisieren der Filmliste, falls erforderlich
            setFormData(initialFormData); // Zurücksetzen des Formulars nach dem Senden
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    // Das Formular-Rendering
    return (
        <div>
            <h2>Add a New Movie</h2>
            <form >
                {/* IMDb ID Eingabefeld */}
                <div>
                    <label>IMDb ID:</label>
                    <input
                        type="text"
                        name="imdbId"
                        value={formData.imdbId}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Titel Eingabefeld */}
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Release Date Eingabefeld */}
                <div>
                    <label>Release Date:</label>
                    <input
                        type="text"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Trailer Link Eingabefeld */}
                <div>
                    <label>Trailer Link:</label>
                    <input
                        type="text"
                        name="trailerLink"
                        value={formData.trailerLink}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Genres Eingabefeld */}
                <div>
                    <label>Genres:</label>
                    <input
                        type="text"
                        name="genres"
                        value={formData.genres}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Poster URL Eingabefeld */}
                <div>
                    <label>Poster URL:</label>
                    <input
                        type="text"
                        name="poster"
                        value={formData.poster}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Submit Button */}
                <button type="button" onClick={handleSubmit} >Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovieForm;
