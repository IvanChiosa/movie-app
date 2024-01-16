import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Col, Row} from "react-bootstrap";
import "./MovieList.css";
import DeleteMovieButton from "./DeleteMovieButton.tsx";
import UpdateMovieButton from "./UpdateMovieButton.tsx";

interface Movie {
    id: string;
    imdbId: string;
    title: string;
    releaseDate: string;
    trailerLink: string;
    poster: string;
    genres: string;
    backdrops: string;
    reviewIds: string;
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

        fetchMovies();
    }, []);
    console.log(movies)
    return (
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
                                {/* Überprüfen Sie, ob der Inhalt erweitert werden soll */}
                                {expanded ? (
                                    <div>
                                        <p>Backdrops: {movie.backdrops}</p>
                                        {/* Weitere Informationen */}
                                        <button
                                            className="btn btn-link"
                                            onClick={() => setExpanded(false)}
                                        >
                                            Weniger anzeigen
                                        </button>
                                    </div>
                                ) : (
                                    // "Mehr anzeigen"-Link oder Button
                                    <button
                                        className="btn btn-link"
                                        onClick={() => setExpanded(true)}
                                    >
                                        Mehr anzeigen...
                                    </button>
                                )}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
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
                                    fetchMovies();
                                }}
                                onDeletionFailure={() => {
                                }}
                            />
                            <UpdateMovieButton
                                movieId={movie.id}
                                onUpdateSuccess={() => {
                                    // Fügen Sie hier die Logik für Erfolg hinzu
                                }}
                                onUpdateFailure={() => {
                                    // Fügen Sie hier die Logik für Misserfolg hinzu
                                }}
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>

    );
};

export default MovieList;