package com.example.MovieService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//@ResponseStatus(code = HttpStatus.NOT_FOUND , reason = "Movie Not found")
//public class MovieNotFound extends Exception {
//}
@ResponseStatus(code = HttpStatus.CONFLICT)
public class MovieNotFound extends Exception {
    public MovieNotFound(String message) {
        super(message);
    }
}