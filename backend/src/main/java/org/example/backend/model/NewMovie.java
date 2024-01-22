package org.example.backend.model;

import lombok.With;

import java.util.List;

@With
public record NewMovie(String imdbId, String title, String releaseDate, String trailerLink, String poster,
                       List<String> genres, List<String> backdrops) {
}
