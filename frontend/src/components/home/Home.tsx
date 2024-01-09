import Hero from "../hero/Hero.tsx";
import { HeroProps } from "../../Interfaces.tsx";

// interface Movie {
//     title: string;
//     description: string;
// }
//
// interface HomeProps {
//     movies: Movie[];
// }
const Home: React.FC<HeroProps> = ({ movies }) => {
    return (
        <Hero movies={movies}/>
    );
};

export default Home;