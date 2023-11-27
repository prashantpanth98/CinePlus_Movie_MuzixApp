package com.example.MovieService.proxy;

import com.example.MovieService.domain.User;
import com.example.MovieService.exception.UserAlreadyExist;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "UserAuth-service",url = "localhost:8001")
public interface UserProxy {
     @PostMapping("/user/v/addUser")
        public ResponseEntity<?> addUser(@RequestBody User User) throws UserAlreadyExist;
}
