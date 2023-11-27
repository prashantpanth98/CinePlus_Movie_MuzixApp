package com.example.MovieService.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Document
public class User {
    @Id
    private String email;
    private UserDetails users;
    List<Movie> movieList;
    private Photo photo;
    private String Name;
    private String dob;



}