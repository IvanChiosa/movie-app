package org.example.backend.controller;

import org.example.backend.model.Movie;
import org.example.backend.service.MovieService;
import org.example.backend.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId) {
        return new ResponseEntity<Optional<Movie>>(movieService.singleMovie(imdbId), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieService.saveMovie(movie);
        return ResponseEntity.ok(savedMovie);
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<Movie> updateMovie(@PathVariable String movieId, @RequestBody Movie movieDetails) {
        return movieService.updateMovie(movieId, movieDetails)
                .map(ResponseEntity::ok) // Bei Erfolg, sende den aktualisierten Film mit Status 200 OK zurück
                .orElse(ResponseEntity.notFound().build()); // Wenn nicht gefunden, sende 404 Not Found
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> deleteMovie(@PathVariable String movieId) {
        boolean isDeleted = movieService.deleteMovie(movieId);

        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{imdbId}/reviewIds")
    public List<Review> getReviewsForMovie(@PathVariable String imdbId) {
        return movieService.getReviewsForMovie(imdbId);
    }
}
