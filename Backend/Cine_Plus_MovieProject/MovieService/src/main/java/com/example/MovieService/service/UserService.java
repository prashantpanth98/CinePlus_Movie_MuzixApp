package com.example.MovieService.service;

import com.example.MovieService.domain.Movie;
import com.example.MovieService.domain.User;
import com.example.MovieService.domain.UserDetails;
import com.example.MovieService.exception.MovieAlreadyExist;
import com.example.MovieService.exception.MovieNotFound;
import com.example.MovieService.exception.UserAlreadyExist;
import com.example.MovieService.exception.UserNotExist;
import com.example.MovieService.proxy.UserProxy;
import com.example.MovieService.rabbitMQ.EmailDTO;
import com.example.MovieService.rabbitMQ.EmailProducer;

import com.example.MovieService.repository.IUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;

import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
public class UserService implements IUserService {


    private IUserRepository iUserRepository;
    private EmailProducer movieEmailProducer;
    private UserProxy  userProxy;
    @Autowired
    public UserService(IUserRepository iUserRepository, EmailProducer movieEmailProducer,UserProxy userProxy) {
        this.iUserRepository = iUserRepository;
        this.movieEmailProducer = movieEmailProducer;
        this.userProxy=userProxy;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExist {
        if (iUserRepository.findById(user.getEmail()).isPresent()) {
            throw new UserAlreadyExist();
        } userProxy.addUser(user);
       User result = iUserRepository.save(user);

        return result;
    }

    @Override
    public String getusername(String email) throws UserNotExist {
        if(iUserRepository.findById(email).isPresent()){
            User user=iUserRepository.findById(email).get();
            return user.getName();
        }
       throw new UserNotExist();
    }

//    @Override
//    public String getDob(String email) throws UserNotExist {
//        if(iUserRepository.findById(email).isPresent()){
//            User user=iUserRepository.findById(email).get();
//            return user.getDob();
//        }
//       throw new UserNotExist();
//    }


    @Override
    public User AddUserDetaisls(UserDetails details, String email) throws UserAlreadyExist {
        User user = iUserRepository.findById(email).get();
        if (iUserRepository.findById(email).isPresent()) {
            UserDetails getUser = user.getUsers();
            if (getUser == null) {
                user.setUsers(details);
                User result = iUserRepository.save(user);
                EmailDTO emailMovieDTO = new EmailDTO(result.getEmail(), "Hey \n" +"Dear [ "+ user.getEmail()+" ]" + " your Details Has been Added  successfully", "Added UserDetails Successfully");
                movieEmailProducer.sendMailToQueue(emailMovieDTO);
                return result;
            }

        }

        throw new UserAlreadyExist();
    }

    @Override
    public UserDetails UserUpdate(UserDetails details, String email) throws UserNotExist {
        User user = iUserRepository.findById(email).get();
        if (iUserRepository.findById(email).isPresent()) {
            UserDetails updatedUser = user.getUsers();
            if (updatedUser != null) {
                if (details.getFirstName() != null) {
                    updatedUser.setFirstName(details.getFirstName());
                    user.setUsers(updatedUser);
                }else{
                    updatedUser.getFirstName();
                    user.setUsers(updatedUser);
                }
                if (details.getLastName() != null) {
                    updatedUser.setLastName(details.getLastName());
                }
                if (details.getGender() != null) {
                    updatedUser.setGender(details.getGender());
                }

                if (details.getAddress() != null) {
                    updatedUser.setAddress(details.getAddress());
                }

                if (details.getMobileNo() != 0) {
                    updatedUser.setMobileNo(details.getMobileNo());
                }


                iUserRepository.save(user);
                EmailDTO emailMovieDTO = new EmailDTO(user.getEmail(), "Hey \n" + "Dear [ "+user.getEmail()+" ]\n" + "your Details Has been Updeted successfully", "Updated UserDetails Successfully");
                movieEmailProducer.sendMailToQueue(emailMovieDTO);

                return updatedUser;
            } else if (updatedUser == null) {
                user.setUsers(details);
                User result = iUserRepository.save(user);
                EmailDTO emailMovieDTO = new EmailDTO(result.getEmail(), "Hey \n" +"Dear [ "+user.getEmail()+" ]\n"+ "your Details Has been Added  successfully", "Added UserDetails Successfully");
                movieEmailProducer.sendMailToQueue(emailMovieDTO);
                return updatedUser;
            } else {
                throw new UserNotExist();
            }
        }
        throw new UserNotExist();
    }

    @Override
    public boolean deleteUserDetails(String email) throws UserNotExist {
        if (iUserRepository.findById(email).isPresent()) {
            User user = iUserRepository.findById(email).get();
            UserDetails getDetails = user.getUsers();
            boolean isexist = false;
            if (getDetails.getAddress() != null) {
                getDetails.setAddress(null);
            }
            if (getDetails.getFirstName() != null) {
                getDetails.setFirstName(null);
            }
            if (getDetails.getMobileNo() != 0) {
                getDetails.setMobileNo(0);
            }

            if (getDetails.getGender() != null) {
                getDetails.setGender(null);
            }
            if (getDetails.getLastName() != null) {
                getDetails.setLastName(null);
            }


            user.setUsers(getDetails);
            iUserRepository.save(user);
            isexist = true;
            EmailDTO emailMovieDTO = new EmailDTO(user.getEmail(), "Hey \n" + "Dear [ "+user.getEmail()+" ]\n"+ "your Details Has been Deleted successfully", "Deleted UserDetails Successfully");
            movieEmailProducer.sendMailToQueue(emailMovieDTO);
            return isexist;

        }
        throw new UserNotExist();
    }

    @Override
    public UserDetails getUser(String email) throws UserNotExist {
        if (iUserRepository.findById(email).isEmpty()) {
            throw new UserNotExist();
        }
        User user = iUserRepository.findById(email).get();
        UserDetails result = user.getUsers();
        if (result != null) {
            return result;
        }
        throw new UserNotExist();
    }





    @Override
    public boolean saveMovieToFavList(Movie movie, String email) throws MovieAlreadyExist, UserNotExist {
        Optional<User> userOptional = iUserRepository.findById(email);
        System.out.println(email);
        System.out.println(movie);
        boolean check;
        if (userOptional.isEmpty()) {
            throw new UserNotExist();
        } else {
            User userExist = userOptional.get();
            List<Movie> movieList = userExist.getMovieList();
            check = false;
            if (movieList != null) {
                for (Movie m : movieList) {
                    if (m.getId() == movie.getId()) {
                        throw new MovieAlreadyExist();
                    }
                }
            } else {
                movieList = new ArrayList<>();
                check = true;

            }

            movieList.add(movie);
            userExist.setMovieList(movieList);
            User result = iUserRepository.save(userExist);

            check = true;

            return check;
        }
    }


    @Override
    public List<Movie> getALlUsersFavoriteMovies(String email) throws MovieNotFound, UserNotExist {
        User userExist = iUserRepository.findById(email).get();
        if (userExist != null) {
            if (userExist.getMovieList() != null) {
                return userExist.getMovieList();
            } else {
                throw new MovieNotFound("Movie favorite list not found");

            }
        } else
            throw new UserNotExist();

    }


    @Override
    public Boolean deleteFromFavoriteList(String email, int id) throws UserNotExist, MovieNotFound {


        if (iUserRepository.findById(email).isEmpty()) {
            throw new UserNotExist();
        }
        boolean check = false;
        User user = iUserRepository.findById(email).get();
        List<Movie> movielist = user.getMovieList();
        if (movielist != null) {
            check = false;
            for (Movie u : movielist) {
                if (u.getId() == id) {
                    movielist.removeIf(x -> x.getId() == id);
                    user.setMovieList(movielist);
                    User result = iUserRepository.save(user);

                    check = true;
                    return check;

                }
            }
            throw new MovieNotFound("Movie Not Present in Your Fav List");
        }
        return check;

    }



}




