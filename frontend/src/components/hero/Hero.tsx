import './Hero.css';
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { HeroProps } from "../../Interfaces.tsx";

// interface Movie {
//     title: string;
//     description: string;
//     poster: string;
// }
//
// interface HeroProps {
//     moviess: Movie[];
// }

const Hero: React.FC<HeroProps> = ({ movies }) => {
    return (
        <div className="movie-carousel-container">
            <Carousel>
                {movies.map((movie) => (
                    <Paper>
                        <div className="movie-card-container">
                            <div className="movie-card">
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="movie poster"/>
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                </div>
                                <p>{movie.description}</p>
                            </div>
                        </div>
                    </Paper>
                ))}
            </Carousel>
        </div>
    );
};
export default Hero;

