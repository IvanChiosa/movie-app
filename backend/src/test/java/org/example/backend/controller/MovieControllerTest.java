package org.example.backend.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.Movie;
import org.example.backend.repository.MovieRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MovieControllerTest {
    public final String BASE_URL = "/api/v1/movies";

    @Autowired // Been verkabelt container
    private MockMvc mockMvc; // das ist eine Instance von MockMvc

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MovieRepository movieRepository;

    @BeforeEach
    public void setup() throws Exception {
        movieRepository.deleteAll();
    }

    @Test
    void getAllMovies_shouldReturnEmptyList_WhenCalledInitially() throws Exception {
        mockMvc.perform(get(BASE_URL)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    private void addTestMovies() throws Exception {
        Movie movie1 = new Movie();
        movie1.setImdbId("tt1234567");
        movie1.setTitle("Test Movie");
        movie1.setReleaseDate("2021-01-01");
        movie1.setTrailerLink("https://www.youtube.com/watch?v=1234567");
        movie1.setPoster("https://www.imdb.com/title/tt1234567/");
        movie1.setGenres(List.of("Action", "Adventure"));
        movie1.setBackdrops(List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567"));

        Movie movie2 = new Movie();
        movie2.setImdbId("tt7654321");
        movie2.setTitle("Test Movie 2");
        movie2.setReleaseDate("2021-01-01");
        movie2.setTrailerLink("https://www.youtube.com/watch?v=1234567");
        movie2.setPoster("https://www.imdb.com/title/tt1234567/");
        movie2.setGenres(List.of("Action", "Adventure"));
        movie2.setBackdrops(List.of("https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567"));

        mockMvc.perform(post(BASE_URL + "/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(movie1)))
                .andExpect(status().isOk());

        mockMvc.perform(post(BASE_URL + "/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(movie2)))
                .andExpect(status().isOk());
    }

    @Test
    void getAllMovies_ShouldReturnAllMovieList_WhenMoviesAreAdded() throws Exception {
        addTestMovies();

        mockMvc.perform(get(BASE_URL)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void getSingleMovie_ShouldReturnMovie_WhenCalledWithValidImdbId() throws Exception {

        mockMvc.perform(post(BASE_URL + "/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "imdbId": "tt1234567",
                                    "title": "Test Movie",
                                    "releaseDate": "2021-01-01",
                                    "trailerLink": "https://www.youtube.com/watch?v=1234567",
                                    "poster": "https://www.imdb.com/title/tt1234567/",
                                    "genres": [
                                        "Action",
                                        "Adventure"
                                    ],
                                    "backdrops": [
                                        "https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567"
                                    ]
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "imdbId": "tt1234567",
                            "title": "Test Movie",
                            "releaseDate": "2021-01-01",
                            "trailerLink": "https://www.youtube.com/watch?v=1234567",
                            "poster": "https://www.imdb.com/title/tt1234567/",
                            "genres": [
                                "Action",
                                "Adventure"
                            ],
                            "backdrops": [
                                "https://www.imdb.com/title/tt1234567/mediaviewer/rm1234567"
                            ]
                        }
                        """));
    }

    @Test
    void getSingleMovie_ShouldReturnNotFound_WhenCalledWithInvalidImdbId() throws Exception {
        String invalidImdbId = "/tt999067912322"; // Eine ungültige IMDb-ID

        mockMvc.perform(get(BASE_URL + invalidImdbId)
                        .contentType("application/json"))
                .andExpect(status().isNotFound()); // Erwartet, hier das die Server mit 404 Nicht gefunden antwortet
    }

    @Test
    void updateMovie_ShouldReturnUpdatedMovie_WhenMovieExists() throws Exception {
        Movie movie = new Movie();
        movie.setImdbId("NinaIvanovna");
        movie.setTitle("Ivan Bello");
        movie.setReleaseDate("2010-07-16");
        movie.setTrailerLink("https://www.youtube.com");
        movie.setPoster("img");
        movie.setGenres(List.of("Natalia", "Ecaterina", "Ivan", "Nina"));
        movie.setBackdrops(List.of("https://image.tmdb.org/t/p/original/7zQJYV02yehWrQN6NjKsBorqUUS.jpg"));

        String movieJson = objectMapper.writeValueAsString(movie);
        Movie movie1 = objectMapper.readValue(mockMvc.perform(post(BASE_URL + "/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(movieJson))
                .andReturn().getResponse().getContentAsString(), Movie.class);

        mockMvc.perform(put("/api/v1/movies/" + movie1.getId())

                        .contentType(MediaType.APPLICATION_JSON)
                        .content(movieJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Ivan Bello"))
                .andExpect(jsonPath("$.releaseDate").value("2010-07-16"))
                .andExpect(jsonPath("$.trailerLink").value("https://www.youtube.com"))
                .andExpect(jsonPath("$.poster").value("img"))
                .andExpect(jsonPath("$.genres").isArray())
                .andExpect(jsonPath("$.genres[0]").value("Natalia"))
                .andExpect(jsonPath("$.backdrops").isArray())
                .andExpect(jsonPath("$.backdrops[0]").value("https://image.tmdb.org/t/p/original/7zQJYV02yehWrQN6NjKsBorqUUS.jpg"));
    }

    @Test
    void updateMovie_ShouldReturnNotFound_WhenMovieDoesNotExist() throws Exception {
        Movie movie = new Movie();
        movie.setImdbId("NichtVorhandeneImdbId");
        movie.setTitle("NichtVorhandenerTitel");
        movie.setReleaseDate("2024-01-01");
        movie.setTrailerLink("https://example.com");
        movie.setPoster("examplePoster");
        movie.setGenres(List.of("Genre1", "Genre2"));
        movie.setBackdrops(List.of("https://example.com/backdrop.jpg"));

        String movieJson = objectMapper.writeValueAsString(movie);
        String nichtExistierendeMovieId = "123456789"; // Eine sicher nicht existierende ID

        mockMvc.perform(put("/api/v1/movies/" + nichtExistierendeMovieId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(movieJson))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteMovie_ShouldDeleteMovie_WhenMovieExists() throws Exception {
        String movieId = "65a7e099c247a05f15709900"; // Ersetzen Sie dies mit einer gültigen Movie-ID

        mockMvc.perform(delete("/api/v1/movies/" + movieId))
                .andExpect(status().isOk());
    }

    @Test
    void deleteMovie_ShouldReturnNotFound_WhenMovieDoesNotExist() throws Exception {
        String movieId = "nichtVorhandeneId"; // Eine ID, die sicher nicht existiert

        mockMvc.perform(delete("/api/v1/movies/" + movieId))
                .andExpect(status().isNotFound());
    }
}