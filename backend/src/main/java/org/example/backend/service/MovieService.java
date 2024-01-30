package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.example.backend.model.Movie;
import org.example.backend.repository.MovieRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId) {
        return movieRepository.findMovieByImdbId(imdbId);
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.insert(movie);
    }

    public Optional<Movie> updateMovie(String id, Movie movieDetails) {
        try {
            ObjectId objectId = new ObjectId(id); // Konvertiere den String in ObjectId
            return movieRepository.findById(objectId)
                    .map(movie -> {
                        movie.setImdbId(movieDetails.getImdbId());
                        movie.setTitle(movieDetails.getTitle());
                        movie.setReleaseDate(movieDetails.getReleaseDate());
                        movie.setTrailerLink(movieDetails.getTrailerLink());
                        movie.setPoster(movieDetails.getPoster());
                        movie.setGenres(movieDetails.getGenres());
                        movie.setBackdrops(movieDetails.getBackdrops());

                        return movieRepository.save(movie);
                    });
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    public boolean deleteMovie(String movieId) {
        try {
            ObjectId objectId = new ObjectId(movieId);
            movieRepository.deleteById(objectId);
            return true;
        } catch (IllegalArgumentException | EmptyResultDataAccessException e) {
            return false;
        }
    }
}
