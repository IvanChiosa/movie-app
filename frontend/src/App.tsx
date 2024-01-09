import './App.css'
//import api from './api/axiosConfig';
import {useEffect, useState} from 'react';
import axios from "axios";
import {Movies} from "./Movies.ts";
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./components/home/Home.tsx";

function App() {
    const [movies, setMovies] = useState<Movies[]>([]);

    const getMovies = () => {

        axios.get("/api/v1/movies")
            .then(response => {
                setMovies(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error.message));
        console.log(movies)

        // try {
        //     const response = await api.get('/api/v1/movies');
        //     console.log(response.data);
        //     setMovies(response.data);
        // } catch (err) {
        //     console.log(err);
        // }
        // console.log(movies)
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/" element={<Home movies={movies}/>}/>
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App
