package org.example.backend.controller;

import org.example.backend.model.Review;
import org.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload) {
        String IMDB_ID = "imdbId";
        String REVIEW_BODY = "reviewBody";
        if (payload.get(REVIEW_BODY) == null || payload.get(REVIEW_BODY).isEmpty() ||
                payload.get(IMDB_ID) == null || payload.get(IMDB_ID).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.CREATED);
    }
}
