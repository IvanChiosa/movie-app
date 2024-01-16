package org.example.backend.service;

import org.bson.types.ObjectId;
import org.example.backend.model.Movie;
import org.example.backend.model.Review;
import org.example.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

//    public Review createReview(String reviewBody, String imdbId) {
//        Review review = reviewRepository.insert(new Review(reviewBody));
//
//        mongoTemplate.update(Movie.class)
//                .matching(Criteria.where("imdbId").is(imdbId))
//                .apply(new Update().push("reviewIds").value(review))
//                .first();
//
//        return review;
//    }
 // Erstellen einer neuen Review
    public Review createReview(String reviewBody, String imdbId) {
        Review review = reviewRepository.insert(new Review(reviewBody));

        mongoTemplate.updateFirst(Query.query(Criteria.where("imdbId").is(imdbId)),
                new Update().push("reviewIds", review.getId()),
                Movie.class);

        return review;
    }

    // Abrufen aller Reviews
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }



    // Abrufen einer einzelnen Review nach ihrer ID
    public Optional<Review> findById(String id) {
        return reviewRepository.findById(new ObjectId(id));
    }

    // Aktualisieren einer bestehenden Review
    public Optional<Review> updateReview(String id, String reviewBody) {
        Optional<Review> reviewOptional = reviewRepository.findById(new ObjectId(id));
        if (reviewOptional.isPresent()) {
            Review review = reviewOptional.get();
            review.setBody(reviewBody);
            reviewRepository.save(review);
            return Optional.of(review);
        }
        return Optional.empty();
    }

    // Löschen einer Review
    public boolean deleteReview(String id) {
        ObjectId objectId = new ObjectId(id);
        if (reviewRepository.existsById(objectId)) {
            reviewRepository.deleteById(objectId);
            // Zusätzliche Logik, um die Referenz aus dem Movie-Objekt zu entfernen
            return true;
        }
        return false;
    }

}
