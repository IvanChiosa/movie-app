package org.example.backend.repository;

import org.bson.types.ObjectId;
import org.example.backend.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {

}
