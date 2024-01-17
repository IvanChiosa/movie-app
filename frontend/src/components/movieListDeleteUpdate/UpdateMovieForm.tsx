import React, {useState} from 'react';
import axios from 'axios';

export interface Movie {
    id: string;
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    genres: string;
    backdrops: string;
    // reviewIds: string;
}


interface UpdateMovieFormProps {
    movie: Movie;
    onUpdateSuccess: () => void;
    onUpdateFailure: () => void;
    onFormClose: () => void;
}

const UpdateMovieForm: React.FC<UpdateMovieFormProps> = ({ movie, onUpdateSuccess, onUpdateFailure, onFormClose }) => {
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
            const updatedData = { imdbId, title, releaseDate, trailerLink, poster, genres, backdrops };
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
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                placeholder="Genres"
            />
            <input
                type="text"
                value={backdrops}
                onChange={(e) => setBackdrops(e.target.value)}
                placeholder="Backdrops"
            />
            <button type="submit">Aktualisieren</button>
            <button onClick={onFormClose}>Abbrechen</button>
        </form>
    );
};


// interface UpdateMovieProps {
//     movieId: string;
//     onUpdateSuccess: () => void;
//     onUpdateFailure: () => void;
// }
//
// const UpdateMovieButton: React.FC<UpdateMovieProps> = ({ movieId, onUpdateSuccess, onUpdateFailure }) => {
//     const handleUpdate = async () => {
//         try {
//             // Hier können Sie den Update-Endpunkt anpassen und die gewünschten Daten senden
//             const updatedData = {
//                 // Fügen Sie hier die zu aktualisierenden Daten hinzu
//             };
//
//             await axios.put(`/api/v1/movies/${movieId}`, updatedData);
//             onUpdateSuccess();
//         } catch (error) {
//             console.error('Fehler beim Aktualisieren des Films', error);
//             onUpdateFailure();
//         }
//     };
//
//     return (
//         <button onClick={handleUpdate}>Film aktualisieren</button>
//     );
// };


// interface MovieUpdateFormProps {
//     movieId: string;
//     onUpdateSuccess: () => void;
//     onUpdateFailure: (message: string) => void;
// }

// const UpdateMovieButton: React.FC<MovieUpdateFormProps> = ({ movieId, onUpdateSuccess, onUpdateFailure }) => {
//     const [movie, setMovie] = useState<Movie | null>(null);
//
//     useEffect(() => {
//         axios.get(`/api/v1/movies/${movieId}`)
//             .then(response => setMovie(response.data))
//             .catch(error => console.error('Fehler beim Abrufen der Filmdaten', error));
//     }, [movieId]);
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setMovie({ ...movie, [e.target.name]: e.target.value } as Movie);
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (movie) {
//             try {
//                 await axios.put(`/api/v1/movies/${movieId}`, movie);
//                 onUpdateSuccess();
//             } catch (error) {
//                 const axiosError = error as AxiosError;
//                 const errorMessage = (axiosError.response?.data as { message?: string } | undefined)?.message || 'Fehler beim Aktualisieren des Films';
//                 onUpdateFailure(errorMessage);
//             }
//         }
//     };
//
//     if (!movie) return <div>Loading...</div>;
//
//     return (
//         <form onClick={handleSubmit}>
//             <div>
//                 <label htmlFor="title">Titel:</label>
//                 <input
//                     name="title"
//                     value={movie.title}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             {/* Hier fügen wir zusätzliche Eingabefelder für andere Eigenschaften des Films hinzu */}
//             <div>
//                 <label htmlFor="imdbId">IMDB ID:</label>
//                 <input
//                     name="imdbId"
//                     value={movie.imdbId}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="releaseDate">Veröffentlichungsdatum:</label>
//                 <input
//                     name="releaseDate"
//                     value={movie.releaseDate}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="trailerLink">Trailer-Link:</label>
//                 <input
//                     name="trailerLink"
//                     value={movie.trailerLink}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="poster">Poster-URL:</label>
//                 <input
//                     name="poster"
//                     value={movie.poster}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="genres">Genres:</label>
//                 <input
//                     name="genres"
//                     value={movie.genres}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="backdrops">Hintergrundbilder:</label>
//                 <input
//                     name="backdrops"
//                     value={movie.backdrops}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             {/*<div>*/}
//             {/*    <label htmlFor="reviewIds">Review IDs:</label>*/}
//             {/*    <input*/}
//             {/*        name="reviewIds"*/}
//             {/*        value={movie.reviewIds}*/}
//             {/*        onChange={handleInputChange}*/}
//             {/*    />*/}
//             {/*</div>*/}
//             {/*<button type="submit">Film aktualisieren</button>*/}
//             <button onClick={handleSubmit}>Film aktualisieren</button>
//         </form>
//     );
// };





export default UpdateMovieForm;