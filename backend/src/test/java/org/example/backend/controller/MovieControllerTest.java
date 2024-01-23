package org.example.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.Movie;
import org.example.backend.repository.MovieRepository;
import org.example.backend.service.MovieService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

    @Test
    void getAllMovies_shouldReturnEmptyList_WhenCalledInitially() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void getSingleMovie_ShouldReturnMovie_WhenCalledWithValidImdbId() throws Exception {

        mockMvc.perform(post("/api/v1/movies/add")
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
        Movie movie1 = objectMapper.readValue (mockMvc.perform(post("/api/v1/movies/add")
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



//    @Test
//    void updateMovie_ShouldReturnUpdatedMovie_WhenMovieExists() {
//        Movie movie = new Movie();
////        movie.setImdbId("tt8760708");
//        movie.setTitle("M3GAN");
//        movie.setReleaseDate("2023-01-06");
//        movie.setTrailerLink("https://www.youtube.com/watch?v=BRb4U99OU80");
//        movie.setPoster("https://image.tmdb.org/t/p/w500/xBl5AGw7HXZcv1nNXPlzGgO4Cfo.jpg");
//        movie.setGenres(List.of("Science Fiction", "Horror", "Comedy"));
//        movie.setBackdrops(List.of("https://image.tmdb.org/t/p/original/5kAGbi9MFAobQTVfK4kWPnIfnP0.jpg"));
//
//        HttpEntity<Movie> request = new HttpEntity<>(movie);
//
//        ResponseEntity<Movie> response = restTemplate.exchange(
//                "/api/v1/movies/tt8760708",
//                HttpMethod.PUT,
//                request,
//                Movie.class);
//
//        assert response.getStatusCode().is2xxSuccessful();
////        assert "tt8760708".equals(Objects.requireNonNull(response.getBody()).getImdbId());
//        assert "M3GAN".equals(response.getBody().getTitle());
//        assert "2023-01-06".equals(response.getBody().getReleaseDate());
//        assert "https://www.youtube.com/watch?v=BRb4U99OU80".equals(response.getBody().getTrailerLink());
//        assert "https://image.tmdb.org/t/p/w500/xBl5AGw7HXZcv1nNXPlzGgO4Cfo.jpg".equals(response.getBody().getPoster());
//        assert response.getBody().getGenres().containsAll(List.of("Science Fiction", "Horror", "Comedy"));
//        assert response.getBody().getBackdrops().contains("https://image.tmdb.org/t/p/original/5kAGbi9MFAobQTVfK4kWPnIfnP0.jpg");
//    }

    @Test
    void deleteMovie() {
    }
}