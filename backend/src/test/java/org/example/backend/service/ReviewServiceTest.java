package org.example.backend.service;

import static org.mockito.Mockito.*;

import org.example.backend.model.Movie;
import org.example.backend.model.Review;
import org.example.backend.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import static org.junit.jupiter.api.Assertions.*;
class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;
    private MongoTemplate mongoTemplate;
    @InjectMocks
    private ReviewService reviewService;


//    @BeforeEach
//    public void setUp() {
//        // Mock-Objekte erstellen
//        reviewRepository = mock(ReviewRepository.class);
//        mongoTemplate = mock(MongoTemplate.class);
//
//        // ReviewService mit Mock-Objekten initialisieren
//        reviewService = new ReviewService(reviewRepository, mongoTemplate);
//    }
//
//    @Test
//    void createReview_ShouldCreateAndReturnReview() {
//        // Testdaten und -bedingungen vorbereiten
//        String reviewBody = "Great movie!";
//        String imdbId = "65a7e099c247a05f15709901";
//        Review mockReview = new Review(reviewBody);
//        mockReview.setId("reviewId"); // Angenommen, die ID wird irgendwo in der Methode gesetzt
//
//        // Stubbing der Methoden
//        when(reviewRepository.insert(any(Review.class))).thenReturn(mockReview);
//
//        // Methode testen
//        Review createdReview = reviewService.createReview(reviewBody, imdbId);
//
//        // Überprüfen der Ergebnisse
//        assertNotNull(createdReview);
//        assertEquals("Great movie!", createdReview.getBody());
//
//        // Verifizieren der Interaktionen
//        verify(reviewRepository).insert(any(Review.class));
//        verify(mongoTemplate).updateFirst(
//                eq(Query.query(Criteria.where("imdbId").is(imdbId))),
//                eq(new Update().push("reviewIds", "reviewId")),
//                eq(Movie.class));
//    }
}