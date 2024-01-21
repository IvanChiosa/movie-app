package org.example.backend;

import org.example.backend.model.Movie;
import org.example.backend.repository.MovieRepository;
import org.example.backend.service.MovieService;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MovieServiceTest {

    MovieRepository movieRepository = mock(MovieRepository.class);
    MovieService movieService = new MovieService(movieRepository);

    @Test
    void testAllMovies_whenCalled_thenReturnAllMovies() {

        // Given
        List<Movie> movie = List.of(new Movie
                ( "tt1234567", "Test Movie", "2021-01-01", "https://www.youtube.com/watch?v=1234567",
                        "https://www.imdb.com/title/tt1234567/",
                        List.of("Action", "Adventure"),
                        List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567")
                ));
        when(movieRepository.findAll()).thenReturn(movie);

        // When
        List<Movie> actual = movieService.allMovies();

        // Then
        List<Movie> expected  = List.of(new Movie
                ( "tt1234567", "Test Movie", "2021-01-01", "https://www.youtube.com/watch?v=1234567",
                        "https://www.imdb.com/title/tt1234567/",
                        List.of("Action", "Adventure"),
                        List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567")
                ));
        verify(movieRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void testSaveMovie_whenNewMovie_thenReturnSavedMovie() {


    }
}
