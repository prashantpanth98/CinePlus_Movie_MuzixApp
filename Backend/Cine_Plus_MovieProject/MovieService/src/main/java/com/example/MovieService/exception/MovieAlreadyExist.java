package com.example.MovieService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.ALREADY_REPORTED, reason = "Movie Already present")
public class MovieAlreadyExist extends Exception {
}
