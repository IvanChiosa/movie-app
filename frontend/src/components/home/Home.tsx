import Hero from "../hero/Hero.tsx";
import { HeroProps } from "../../Interfaces.tsx";
import React from "react";
const Home: React.FC<HeroProps> = ({ movies }) => {
    return (
        <Hero movies={movies}/>
    );
};
export default Home;