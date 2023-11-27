package com.example.MovieService.service;

import com.example.MovieService.domain.Movie;
import com.example.MovieService.domain.User;
import com.example.MovieService.domain.UserDetails;
import com.example.MovieService.exception.MovieAlreadyExist;
import com.example.MovieService.exception.MovieNotFound;
import com.example.MovieService.exception.UserAlreadyExist;
import com.example.MovieService.exception.UserNotExist;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IUserService {


    public User registerUser(User user) throws UserAlreadyExist;

    // public User saveMovieToFavList(Movie movie, String email) throws Exception;
  public String getusername(String email)throws UserNotExist;
    public User AddUserDetaisls(UserDetails details, String email) throws UserAlreadyExist;

    public UserDetails UserUpdate(UserDetails details, String email) throws UserNotExist;

    public boolean deleteUserDetails(String email) throws UserNotExist;

    public UserDetails getUser(String email) throws UserNotExist;

    public boolean saveMovieToFavList(Movie movie, String email) throws Exception;

    public List<Movie> getALlUsersFavoriteMovies(String email) throws MovieNotFound, UserNotExist;

    public Boolean deleteFromFavoriteList(String email, int id) throws UserNotExist, MovieNotFound;


}
