package org.example.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.fasterxml.jackson.databind.ObjectMapper;
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

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MovieControllerTest {
    public final String BASE_URL = "/api/v1/movies";

    @Autowired // Been verkabelt container
    private MockMvc mockMvc; // das ist eine Instance von MockMvc

    private MovieService movieService;

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
    void addMovie() {
    }

    @Test
    void updateMovie() {
    }

    @Test
    void deleteMovie() {
    }
}