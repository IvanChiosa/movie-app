import React, { useState } from 'react';
import axios from 'axios'; // Stellen Sie sicher, dass axios importiert ist
import "./AddMovieForm.css";

// Definition des MovieFormData Interfaces
interface MovieFormData {
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    genres: string[];
    poster: string;
    backdrops: string[];
}

const AddMovieForm: React.FC = ( ) => {
    // Initialisierung des Formulars mit leeren Werten
    const initialFormData: MovieFormData = {
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        genres: [],
        poster: '',
        backdrops: []
    };

    // State für die Verwaltung der Formulardaten
    const [formData, setFormData] = useState<MovieFormData>(initialFormData);

    // Behandlung der Änderungen in den Formularfeldern
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'genres') {
            const genresArray = value.split(',').map(genre => genre.trim());
            setFormData({ ...formData, genres: genresArray });
        } else if (name === 'backdrops') {
            const backdropsArray = value.split(',').map(backdrop => backdrop.trim());
            setFormData({ ...formData, backdrops: backdropsArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Funktion zum Senden des Formulars
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response= await axios.post('/api/v1/movies/add', formData);
            // Optional: Aktualisieren der Filmliste, falls erforderlich
            setFormData(initialFormData); // Zurücksetzen des Formulars nach dem Senden
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, genres: [e.target.value] });
    };

    // const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value, checked } = e.target;
    //
    //     // Aktualisieren des Genres basierend auf der Auswahl
    //     if (checked) {
    //         setFormData({ ...formData, genres: [...formData.genres, value] });
    //     } else {
    //         setFormData({ ...formData, genres: formData.genres.filter(genre => genre !== value) });
    //     }
    // };

    // Das Formular-Rendering
    return (
        <div className="add-new-movie">

            <form>
                <h2>Add a New Movie</h2>
                {/* IMDb ID Eingabefeld */}
                <div>
                    <label>IMDB ID:</label>
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
                    <div className="gen">
                        <input
                            type="radio"
                            name="genres"
                            value="Action"
                            checked={formData.genres.includes('Action')}
                            onChange={handleGenreChange}
                        /> Action
                    </div>
                    <div className="gen">
                        <input
                            type="radio"
                            name="genres"
                            value="Adventure"
                            checked={formData.genres.includes('Adventure')}
                            onChange={handleGenreChange}
                        /> Adventure
                    </div>
                    <div className="gen">
                        <input
                            type="radio"
                            name="genres"
                            value="Comedy"
                            checked={formData.genres.includes('Comedy')}
                            onChange={handleGenreChange}
                        /> Comedy
                    </div>
                </div>

                <br/>

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
                <div>
                    <label>Backdrop URLs:</label>
                    <input
                        type="text"
                        name="backdrops"
                        value={formData.backdrops.join(", ")}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit Button */}
                <button className="button-add" onClick={handleSubmit}>Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovieForm;
