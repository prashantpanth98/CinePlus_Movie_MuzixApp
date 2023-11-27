package com.example.UserAuthService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "User doest Not exist")
public class UserNotFound extends Exception {
}
