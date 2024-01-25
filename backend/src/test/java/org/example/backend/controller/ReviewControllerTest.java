package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    public final String ENDPOINT_URL = "/api/v1/reviews";

    @Test
    void testCreateReview_WhenReviewIsCreating_ReturnReview() throws Exception {
        // Testdaten direkt in der Methode initialisieren
        Map<String, String> reviewPayload = new HashMap<>();
        reviewPayload.put("reviewBody", "Great movie!"); // Ändern Sie "body" zu "reviewBody"
        reviewPayload.put("imdbId", "tt1234567");

        String jsonPayload = objectMapper.writeValueAsString(reviewPayload);

        mockMvc.perform(post(ENDPOINT_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isCreated());
    }

    @Test
    void testCreateReview_WhenReviewIsNotCreating_ReturnError() throws Exception {
        Map<String, String> reviewPayload = new HashMap<>();
        reviewPayload.put("body", ""); // ungültiger Inhalt
        reviewPayload.put("imdbId", "tt1234567");

        String jsonPayload = objectMapper.writeValueAsString(reviewPayload);

        mockMvc.perform(post(ENDPOINT_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isBadRequest()); // Erwartet 'Bad Request', wenn die Daten ungültig sind
    }


//    @Test
//    void testCreateReview_WhenReviewIsCreating_ReturnReview() throws Exception {
//
//        // Testdaten direkt in der Methode initialisieren
//        Map<String, String> reviewPayload = new HashMap<>();
//        reviewPayload.put("body", "Great movie!");
//        reviewPayload.put("imdbId", "tt1234567");
//
//        String jsonPayload = objectMapper.writeValueAsString(reviewPayload);
//
//        mockMvc.perform(post(ENDPOINT_URL)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonPayload))
//                .andExpect(status().isCreated());
//    }


//    @Test
//    void testCreateReview_WhenReviewIsNotCreating_ReturnError() throws Exception {
//
//        // Testdaten direkt in der Methode initialisieren, diesmal mit unvollständigen oder ungültigen Daten
//        Map<String, String> reviewPayload = new HashMap<>();
//        reviewPayload.put("body", ""); // Beispiel für ungültigen Inhalt
//        reviewPayload.put("imdbId", "tt1234567");
//
//        String jsonPayload = objectMapper.writeValueAsString(reviewPayload);
//
//        mockMvc.perform(post(ENDPOINT_URL)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonPayload))
//                .andExpect(status().isBadRequest()); // Erwarten eines 'Bad Request' Status, wenn die Daten ungültig sind
//    }
}