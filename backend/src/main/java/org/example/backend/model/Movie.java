package org.example.backend.model;

import lombok.*;
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
    private List<String> backdrops; //private List<String> reviewIds;


    @DocumentReference
    private List<Review> reviewIds;

    // Comment diese Method is Empty weil ich benutze in meinem MovieService die Builder Pattern
    public <E> Movie(String tt1234567, String testMovie, String date, String url, String url1, List<E> action, List<E> es) {
    }

    private Movie(Builder builder) {
        this.id = builder.id;
        this.imdbId = builder.imdbId;
        this.title = builder.title;
        this.releaseDate = builder.releaseDate;
        this.trailerLink = builder.trailerLink;
        this.poster = builder.poster;
        this.genres = builder.genres;
        this.backdrops = builder.backdrops;
    }

    public static class Builder {
        private String id;
        private String imdbId;
        private String title;
        private String releaseDate;
        private String trailerLink;
        private String poster;
        private List<String> genres;
        private List<String> backdrops;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder imdbId(String imdbId) {
            this.imdbId = imdbId;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder releaseDate(String releaseDate) {
            this.releaseDate = releaseDate;
            return this;
        }

        public Builder trailerLink(String trailerLink) {
            this.trailerLink = trailerLink;
            return this;
        }

        public Builder poster(String poster) {
            this.poster = poster;
            return this;
        }

        public Builder genres(List<String> genres) {
            this.genres = genres;
            return this;
        }

        public Builder backdrops(List<String> backdrops) {
            this.backdrops = backdrops;
            return this;
        }

        public Movie build() {
            return new Movie(this);
        }
    }
}
