import React, {useState} from 'react';
import axios from 'axios';
import "./AddMovieForm.css";

interface MovieFormData {
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    genres: string[];
    backdrops: string[];
}

const AddMovieForm: React.FC = () => {
    // Initialisierung des Formulars mit leeren Werten
    const initialFormData: MovieFormData = {
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        poster: '',
        genres: [],
        backdrops: []
    };

    // State für die Verwaltung der Formulardaten
    const [formData, setFormData] = useState<MovieFormData>(initialFormData);

    // Behandlung der Änderungen in den Formularfeldern
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (name === 'genres') {
            const genresArray = value.split(',').map(genre => genre.trim());
            setFormData({...formData, genres: genresArray});
        } else if (name === 'backdrops') {
            const backdropsArray = value.split(',').map(backdrop => backdrop.trim());
            setFormData({...formData, backdrops: backdropsArray});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    // Funktion zum Senden des Formulars
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/movies/add', formData);
            // Optional: Aktualisieren der Filmliste, falls erforderlich
            setFormData(initialFormData); // Zurücksetzen des Formulars nach dem Senden
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, genres: [e.target.value]});
    };

    // Das Formular-Rendering
    return (
        <div className="add-new-movie">
            <form className="form">
                <h2>Add a New Movie</h2>
                {/* IMDb ID Eingabefeld */}
                <div>
                    <label>IMDB ID:</label>
                    <input
                        type="text"
                        name="imdbId"
                        value={formData.imdbId}
                        onChange={handleInputChange}
                        placeholder={"Letter oder number..."}
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
                        placeholder={"Title of the movie..."}
                    />
                </div>
                {/* Release Date Eingabefeld */}
                <div>
                    <label>Release Date:</label>
                    <input
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleInputChange}
                        placeholder={"YYYY-MM-DD"}
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
                        placeholder={"Trailer Link..."}
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
                        placeholder={"Poster URL..."}
                    />
                </div>
                <div>
                    <label>Backdrop URLs:</label>
                    <input
                        type="text"
                        name="backdrops"
                        value={formData.backdrops.join(", ")}
                        onChange={handleInputChange}
                        placeholder={"Backdrop URLs..."}
                    />
                </div>

                {/* Submit Button */}
                <button className="button-add" onClick={handleSubmit}>Add Movie</button>
            </form>
        </div>
    );
};
export default AddMovieForm;
