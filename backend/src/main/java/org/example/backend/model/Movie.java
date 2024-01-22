package org.example.backend.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.example.backend.model.Review;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "movies")
@With
public class Movie {
    @Id
    private String id; // ObjectId
    private String imdbId;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private List<String> backdrops;
//    private List<String> reviewIds;

    @DocumentReference
    private List<Review> reviewIds;

    public <E> Movie(String tt1234567, String testMovie, String date, String url, String url1, List<E> action, List<E> es) {
    }

//    public Movie(String movie1) {
//    }
}
