package org.example.backend.service;

import org.bson.types.ObjectId;
import org.example.backend.model.Movie;
import org.example.backend.repository.MovieRepository;
import org.example.backend.model.Review;
import org.example.backend.repository.ReviewRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final ReviewRepository reviewRepository;
    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId) {
        return movieRepository.findMovieByImdbId(imdbId);
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.insert(movie);
    }


    public boolean deleteMovie(String movieId) {
        try {
            ObjectId objectId = new ObjectId(movieId);
            movieRepository.deleteById(objectId);
            return true;
        } catch (IllegalArgumentException | EmptyResultDataAccessException e) {
            // Ungültige ObjectId
            return false;
        }
    }



    public MovieService(MovieRepository movieRepository, ReviewRepository reviewRepository) {
        this.movieRepository = movieRepository;
        this.reviewRepository = reviewRepository;
    }
    public List<Review> getReviewsForMovie(String imdbId) {
        Movie movie = movieRepository.findMovieByImdbId(imdbId)
                .orElseThrow(() -> new RuntimeException("Film nicht gefunden"));
        List<Review> reviewIds = movie.getReviewIds(); // Dies sollte eine List<String> sein
        return reviewRepository.findAllById(reviewIds); // Hier geben Sie die List<String> weiter
    }



//    @Autowired
//    public MovieService(MovieRepository movieRepository, ReviewRepository reviewRepository) {
//        this.movieRepository = movieRepository;
//        this.reviewRepository = reviewRepository;
//    }
//
//    public Optional<Movie> findMovieByImdbId(String imdbId) {
//        return movieRepository.findMovieByImdbId(imdbId);
//    }
//
//    public List<Review> getReviewsForMovie(String imdbId) {
//        Optional<Movie> movie = findMovieByImdbId(imdbId);
//        if (movie.isPresent()) {
//            // Annahme: Review hat ein Feld `imdbId`
//            return reviewRepository.findByImdbId(imdbId);
//        }
//        return new ArrayList<>();
//    }



}
