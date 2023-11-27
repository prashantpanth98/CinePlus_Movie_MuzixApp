package com.example.UserAuthService.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.OK, reason = "User ALready exist")
public class UserAlreadyExist extends Exception {
}
