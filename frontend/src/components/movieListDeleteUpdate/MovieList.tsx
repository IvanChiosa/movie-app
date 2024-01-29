import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Col, Row} from "react-bootstrap";
import "./MovieList.css";
import DeleteMovieButton from "./DeleteMovieButton.tsx";
import UpdateMovieButton from "./UpdateMovieButton.tsx";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import "../header/Header.css";

interface Movie {
    id: string;
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    genres: string[];
    backdrops: string[];
}

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/v1/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Fehler beim Laden der Filme', error);
            }
        };
        fetchMovies().then(r => console.log(r));
    }, []);

    const handleUpdateSuccess = () => {
        console.log("Der Film wurde erfolgreich aktualisiert.");
        // Führen Sie hier weitere Aktionen aus, z.B. das Aktualisieren der Film-Liste
    };

    const handleUpdateFailure = () => {
        console.error("Fehler beim Aktualisieren des Films:", error);
        // Fehlerbehandlung hier
    };

    return (
        <div className="card-style">
            <Row xs={1} md={2} lg={3} className="movie-row">
                {movies.map((movie) => (
                    <Col key={movie.id} className="mb-3">
                        <Card className="card-movie">
                            <Card.Img variant="top" src={movie.poster}/>
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    <p>IMDb ID: {movie.imdbId}</p>
                                    <p>Veröffentlichungsdatum: {movie.releaseDate}</p>
                                    <p>Trailer Link: {movie.trailerLink}</p>
                                    <p>Genres: {movie.genres}</p>
                                    {expanded ? (
                                        <div>
                                            <p>Backdrops: {movie.backdrops}</p>
                                            <button
                                                className="btn btn-link"
                                                onClick={() => setExpanded(false)}
                                            >
                                                Weniger anzeigen
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="btn btn-link"
                                            onClick={() => setExpanded(true)}
                                        >
                                            Mehr anzeigen...
                                        </button>
                                    )}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="card-footer">
                                <UpdateMovieButton
                                    movie={movie}
                                    // onUpdateSuccess={handleUpdateSuccess}
                                    onUpdateFailure={handleUpdateFailure}
                                    onUpdateSuccess={() => {
                                        handleUpdateSuccess
                                        const fetchMovies = async () => {
                                            try {
                                                const response = await axios.get('/api/v1/movies');
                                                setMovies(response.data);
                                            } catch (error) {
                                                console.error('Fehler beim Laden der Filme', error);
                                            }
                                        };
                                        fetchMovies().then(r => console.log(r));
                                    }}
                                />
                                <DeleteMovieButton
                                    movieId={movie.id}
                                    onDeletionSuccess={() => {
                                        const fetchMovies = async () => {
                                            try {
                                                const response = await axios.get('/api/v1/movies');
                                                setMovies(response.data);
                                            } catch (error) {
                                                console.error('Fehler beim Laden der Filme', error);
                                            }
                                        };
                                        fetchMovies().then(r => console.log(r));
                                    }}
                                    onDeletionFailure={() => {
                                    }}
                                />
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MovieList;