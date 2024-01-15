import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import {Movies} from "./Movies.ts";
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./components/home/Home.tsx";
import Header from "./components/header/Header.tsx";
import Trailer from "./components/trailer/Trailer.tsx";
import Reviews from "./components/reviews/Reviews.tsx";
import {Review} from "./Interfaces.tsx";
import NotFound from "./components/notFound/NotFound.tsx";
import AddMovieForm from "./components/addMovie/AddMovieForm.tsx";
// import Footer from "./components/footer/Footer.tsx";

function App() {
    const [movies, setMovies] = useState<Movies[]>([]);
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState<Review[]>([]);

    const getMovies = () => {
        axios.get("/api/v1/movies")
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => console.log(error.message));
        console.log(movies)
    }

    const getMovieData = async (movieId: string | undefined) => {
        try {
            const response = await axios.get(`/api/v1/movies/${movieId}`);
            console.log('Movie data:', response.data);
            const singleMovie = response.data;
            setMovie(singleMovie);

            if (singleMovie && Array.isArray(singleMovie.reviews)) {
                setReviews(singleMovie.reviews);
            } else {
                setReviews([]);
            }
        } catch{
            console.error("Error");
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/" element={<Home movies={movies}/>}/>
                        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}/>
                        <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}/>
                        <Route path="*" element={<NotFound />}/>
                        <Route path="/add" element={<AddMovieForm/>}/>
                    </Route>
                </Routes>

                {/*<Footer/>*/}
            </div>
        </>
    )
}

export default App

