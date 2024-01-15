package org.example.backend;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
