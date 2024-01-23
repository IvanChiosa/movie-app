package org.example.backend.service;

import org.bson.types.ObjectId;
import org.example.backend.model.Movie;
import org.example.backend.repository.MovieRepository;
import org.junit.jupiter.api.Test;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MovieServiceTest {

    MovieRepository movieRepository = mock(MovieRepository.class);
    MovieService movieService = new MovieService(movieRepository);

    @Test
    void testAllMovies_WhenCalled_ThenReturnAllMovies() {

        // Given
        List<Movie> movie = List.of(new Movie
                ("tt1234567", "Test Movie", "2021-01-01", "https://www.youtube.com/watch?v=1234567",
                        "https://www.imdb.com/title/tt1234567/",
                        List.of("Action", "Adventure"),
                        List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567")
                ));
        when(movieRepository.findAll()).thenReturn(movie);

        // When
        List<Movie> actual = movieService.allMovies();

        // Then
        List<Movie> expected = List.of(new Movie
                ("tt1234567", "Test Movie", "2021-01-01", "https://www.youtube.com/watch?v=1234567",
                        "https://www.imdb.com/title/tt1234567/",
                        List.of("Action", "Adventure"),
                        List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567")
                ));
        verify(movieRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void testAllMovies_WhenCalled_ThenReturnEmptyList() {
        // Given
        when(movieRepository.findAll()).thenReturn(Collections.emptyList());

        // When
        List<Movie> actual = movieService.allMovies();

        // Then
        assertTrue(actual.isEmpty(), "Die zurückgegebene Liste sollte leer sein.");
        verify(movieRepository).findAll();
    }

    @Test
    void testSingleMovie_WhenMovieExists_ThenReturnMovie() {
        // Given
        String imdbId = "tt10298840";
        Movie movie = new Movie(imdbId,
                "Test Movie",
                "2021-01-01",
                "https://www.youtube.com/watch?v=1234567",
                "https://www.imdb.com/title/tt1234567/",
                List.of("Action", "Adventure"),
                List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567"));
        when(movieRepository.findMovieByImdbId(imdbId)).thenReturn(Optional.of(movie));

        // When
        Optional<Movie> result = movieService.singleMovie(imdbId);

        // Then
        assertTrue(result.isPresent(), "Film sollte vorhanden sein");
        assertEquals(movie, result.get(), "Die zurückgegebenen Filme sollten übereinstimmen");
        verify(movieRepository).findMovieByImdbId(imdbId);
    }

    @Test
    void singleMovie_WhenMovieDoesNotExist_ThenReturnEmpty() {
        // Given
        String imdbId = "tt9999999";
        when(movieRepository.findMovieByImdbId(imdbId)).thenReturn(Optional.empty());

        // When
        Optional<Movie> result = movieService.singleMovie(imdbId);

        // Then
        assertFalse(result.isPresent(), "Film sollte nicht vorhanden sein");
        verify(movieRepository).findMovieByImdbId(imdbId);
    }

    @Test
    void saveMovie_WhenCalled_ThenSaveAndReturnMovie() {
        // Given
        Movie movieToSave = new Movie(
                "tt1234567",
                "Test Movie",
                "2021-01-01",
                "https://www.youtube.com/watch?v=1234567",
                "https://www.imdb.com/title/tt1234567/",
                List.of("Action", "Adventure"),
                List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567"));
        when(movieRepository.insert(movieToSave)).thenReturn(movieToSave);

        // When
        Movie savedMovie = movieService.saveMovie(movieToSave);

        // Then
        assertEquals(movieToSave, savedMovie, "Das gespeicherte Film-Objekt sollte dem zurückgegebenen Film-Objekt entsprechen");
        verify(movieRepository).insert(movieToSave);
    }

    @Test
    void saveMovie_WhenSavingFails_ThenThrowException() {
        // Given
        Movie movieToSave = new Movie(
                "tt1234567",
                "Test Movie",
                "2021-01-01",
                "https://www.youtube.com/watch?v=1234567",
                "https://www.imdb.com/title/tt1234567/",
                List.of("Action", "Adventure"),
                List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567"));

        when(movieRepository.insert(movieToSave)).thenThrow(new RuntimeException("Speichern fehlgeschlagen"));

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            movieService.saveMovie(movieToSave);
        }, "Beim Speichern des Films sollte eine Exception geworfen werden");

        verify(movieRepository).insert(movieToSave);
    }

    @Test
    void updateMovie_WhenMovieExists_ThenUpdateMovie() {
        // Given
        String movieId = "65ae87c6803e05280e1bcf3e";
        Movie existingMovie = new Movie(); // Konfigurieren Sie das bestehende Movie-Objekt
        Movie updatedDetails = new Movie(); // Konfigurieren Sie das Movie-Objekt mit aktualisierten Details
        when(movieRepository.findById(new ObjectId(movieId))).thenReturn(Optional.of(existingMovie));
        when(movieRepository.save(any(Movie.class))).thenAnswer(i -> i.getArguments()[0]);

        // When
        Optional<Movie> updatedMovie = movieService.updateMovie(movieId, updatedDetails);

        // Then
        assertTrue(updatedMovie.isPresent(), "Hallo Ivan");
        Movie resultMovie = updatedMovie.get();
        assertEquals(updatedDetails.getTitle(), resultMovie.getTitle(), "Ivan Ivan Ivan");

        // Überprüfe ich hier die weitere Felder entsprechend
        verify(movieRepository).findById(new ObjectId(movieId));
        verify(movieRepository).save(any(Movie.class));
    }

    @Test
    void updateMovie_WhenMovieDoesNotExist_ThenReturnEmpty() {
        // Given
        String movieId = "65ae87c6803e05280e1bcde3";
        Movie movieDetails = new Movie(); // Konfigurieren Sie das Movie-Objekt mit Details
        when(movieRepository.findById(new ObjectId(movieId))).thenReturn(Optional.empty());

        // When
        Optional<Movie> result = movieService.updateMovie(movieId, movieDetails);

        // Then
        assertFalse(result.isPresent(), "Es sollte kein Film zurückgegeben werden, da keiner existiert");
        verify(movieRepository).findById(new ObjectId(movieId));
        verify(movieRepository, never()).save(any(Movie.class));
    }

    @Test
    void deleteMovie_WhenMovieExists_ThenReturnTrue() {
        // Given
        String movieId = "65afc7b214b73f63df4d2dc5";
        doNothing().when(movieRepository).deleteById(new ObjectId(movieId));

        // When
        boolean result = movieService.deleteMovie(movieId);

        // Then
        assertTrue(result, "Das Löschen des Films sollte erfolgreich sein");
        verify(movieRepository).deleteById(new ObjectId(movieId));
    }

    @Test
    void deleteMovie_WhenMovieDoesNotExist_ThenReturnFalse() {
        // Given
        String movieId = "65afc7b214b73f63df4d1bc3"; // Eine sicher nicht existierende ID
        doThrow(new EmptyResultDataAccessException(1)).when(movieRepository).deleteById(new ObjectId(movieId));

        // When
        boolean result = movieService.deleteMovie(movieId);

        // Then
        assertFalse(result, "Das Löschen des Films sollte fehlschlagen");
        verify(movieRepository).deleteById(new ObjectId(movieId));
    }
}
