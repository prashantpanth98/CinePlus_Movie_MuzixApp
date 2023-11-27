package com.example.MovieService.repository;

import com.example.MovieService.domain.User;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends MongoRepository<User, String> {



}
