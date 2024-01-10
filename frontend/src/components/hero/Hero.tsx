import './Hero.css';
import Carousel from "react-material-ui-carousel";
import {Paper} from "@mui/material";
import {HeroProps} from "../../Interfaces.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

// interface Movie {
//     title: string;
//     description: string;
//     poster: string;
// }
//
// interface HeroProps {
//     moviess: Movie[];
// }

const Hero: React.FC<HeroProps> = ({movies}) => {

    const navigate = useNavigate();

    function reviews(movieId: string) {
        navigate(`/Reviews/${movieId}`);
    }
    return (
        <div className="movie-carousel-container">
            <Carousel>
                {movies.map((movie) => (
                    <Paper key={movie.imdbId}>
                        <div className="movie-card-container">
                            <div className="movie-card movie-card-img" style={{"--img": `url(${movie.backdrops[0]})`} as React.CSSProperties}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="movie poster"/>
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link
                                            to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon"
                                                                 icon={faCirclePlay}
                                                />
                                            </div>
                                        </Link>
                                        <div className="movie-review-button-container">
                                            <Button variant="info"
                                                    onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                ))}
            </Carousel>
        </div>
    );
};
export default Hero;

