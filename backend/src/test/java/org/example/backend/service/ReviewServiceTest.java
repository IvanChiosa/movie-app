package org.example.backend.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.bson.types.ObjectId;
import org.example.backend.model.Movie;
import org.example.backend.model.Review;
import org.example.backend.repository.ReviewRepository;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
class ReviewServiceTest {
    private final ReviewRepository reviewRepository;
    private final MongoTemplate mongoTemplate;
    private final ReviewService reviewService;

    public ReviewServiceTest() {
        reviewRepository = mock(ReviewRepository.class);
        mongoTemplate = mock(MongoTemplate.class);
        reviewService = new ReviewService(reviewRepository, mongoTemplate);
    }
    @Test
    void testCreateReview_WhenIsCreating_ReturnReview() {
        // Given
        String reviewBody = "Great movie!";
        String imdbId = "tt1234567";
        ObjectId mockReviewId = new ObjectId();
        Review mockReview = new Review(reviewBody);
        mockReview.setId(mockReviewId);

        // When
        when(reviewRepository.insert(any(Review.class))).thenReturn(mockReview);
        Review result = reviewService.createReview(reviewBody, imdbId);

        // Then
        assertEquals(reviewBody, result.getBody());
        assertEquals(mockReviewId, result.getId());
        verify(reviewRepository).insert(any(Review.class));
        verify(mongoTemplate).updateFirst(any(Query.class), any(Update.class), eq(Movie.class));
    }

    @Test
    void testCreateReview_WhenIsNotCreating_ReturnNull() {
        // Given
        String reviewBody = "Bad movie!";
        String imdbId = "tt9876543";
        when(reviewRepository.insert(any(Review.class))).thenReturn(null);

        // When
        Review result = reviewService.createReview(reviewBody, imdbId);

        // Then
        assertNull(result);
        verify(reviewRepository).insert(any(Review.class));
    }
}