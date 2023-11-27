package com.example.MovieService.domain;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class Movie {


    private Boolean adult;
    private String backdrop_path;
    private int[] genre_ids;
    @Id
    private int id;
    private String original_language;
    private String original_title;
    private String overview;
    private double popularity;
    private String poster_path;
    private String release_date;
    private String title;
    private Boolean video;
    private double vote_average;
    private double vote_count;


}
