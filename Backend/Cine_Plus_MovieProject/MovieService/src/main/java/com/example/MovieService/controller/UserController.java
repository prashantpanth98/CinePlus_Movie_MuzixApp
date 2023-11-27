package com.example.MovieService.controller;
import org.springframework.core.io.ByteArrayResource;

import com.example.MovieService.domain.Movie;
import com.example.MovieService.domain.User;
import com.example.MovieService.domain.UserDetails;

import com.example.MovieService.exception.MovieNotFound;
import com.example.MovieService.exception.UserAlreadyExist;
import com.example.MovieService.exception.UserNotExist;


import com.example.MovieService.repository.IUserRepository;
import com.example.MovieService.service.IPhotoService;
import com.example.MovieService.service.IUserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/user/v1")
public class UserController {
    private IUserService iUserService;
    private IUserRepository iUserRepository;
    private HttpServletRequest request;
    private CommonsMultipartResolver multipartResolver;
    private ResponseEntity responseEntity;
    private IPhotoService photoService;


    @Autowired
    public UserController(IUserService iUserService, IUserRepository iUserRepository, HttpServletRequest request, CommonsMultipartResolver multipartResolver, IPhotoService photoService) {
        this.iUserService = iUserService;
        this.iUserRepository = iUserRepository;
        this.request = request;
        this.multipartResolver = multipartResolver;
        this.photoService = photoService;
    }





    String email;

    //http://localhost:9000/user/v1/addUserDetails/{email}
    @PostMapping("/addUserDetails")
    public ResponseEntity<?> AddUserDetailsToemail(@RequestBody UserDetails user) {
        email = (String) request.getAttribute("useremail");
        try {
            return new ResponseEntity<>(iUserService.AddUserDetaisls(user, email), HttpStatus.CREATED);
        } catch (UserAlreadyExist e) {
            throw new RuntimeException(e);
        }
    }

    //http://localhost:9000/user/v1/registerUser
    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExist {
        return responseEntity = new ResponseEntity<>(iUserService.registerUser(user), HttpStatus.OK);
    }

    //http://localhost:9000/user/v1/updateUserInfo/{email}
    @PutMapping("/updateUserInfo")
    public ResponseEntity<?> UpdateUser(@RequestBody UserDetails user) {
        email = (String) request.getAttribute("useremail");
        System.out.println(email + "  :   email");


        try {
            return new ResponseEntity<>(iUserService.UserUpdate(user, email), HttpStatus.OK);
        } catch (UserNotExist e) {
            throw new RuntimeException(e);
        }
    }

    //http://localhost:9000/user/v1/deleteUserInfo/{email}
    @DeleteMapping("/deleteUserInfo")
    public ResponseEntity<?> deleteUser() {
        email = (String) request.getAttribute("useremail");
        try {
            return new ResponseEntity<>(iUserService.deleteUserDetails(email), HttpStatus.OK);
        } catch (UserNotExist e) {
            throw new RuntimeException(e);
        }
    }

    //http://localhost:9000/user/v1/getUserInfo/{email}
    @GetMapping("/getUserInfo")
    public ResponseEntity<?> getUserInfo() {
        email = (String) request.getAttribute("useremail");
        try {
            return new ResponseEntity<>(iUserService.getUser(email), HttpStatus.OK);
        } catch (UserNotExist e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/getName/{email}")
    public ResponseEntity<?> getName(@PathVariable("email") String email) {
//        email = (String) request.getAttribute("useremail");
//        System.out.println("EMaiL:    "+email);
        try {
            return new ResponseEntity<>(iUserService.getusername(email), HttpStatus.OK);
        } catch (UserNotExist e) {
            throw new RuntimeException(e);
        }
    }



    @GetMapping("/getdob/{email}")
    public ResponseEntity<?> getdob(@PathVariable("email") String email) {
        User user = iUserRepository.findById(email).orElse(null);
        System.out.println("EMAIL:  "+email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        String dob = user.getDob();
        System.out.println(dob);
        return new ResponseEntity<>(dob , HttpStatus.OK);
    }

    //http://localhost:9000/user/v1/saveMovieToFavList/raghavendrasingh05061998@gmail.com
    //http://localhost:9000/user/v1/saveMovieToFavList/{email}"
    @PostMapping("/saveMovieToFavList")
    public ResponseEntity<?> saveMovieToList(@RequestBody Movie movie) throws Exception {
        String email1 = (String) request.getAttribute("useremail");
        System.out.println("email:   " + email1);
        return new ResponseEntity<>(iUserService.saveMovieToFavList(movie, email1), HttpStatus.OK);
    }

    //http://localhost:8021/user/v1/getALlUsersFavMovies/{email}"
    @GetMapping("/getALlUsersFavMovies")
    public ResponseEntity<?> getAllUsersFavMovies() throws UserNotExist, MovieNotFound {
        email = (String) request.getAttribute("useremail");
       return new ResponseEntity<>(iUserService.getALlUsersFavoriteMovies(email), HttpStatus.OK);
    }

    //http://localhost:8021/user/v1/deleteFromFavoriteList/{email}/{id}"
    @DeleteMapping("/deleteFromFavoriteList/{id}")
    public ResponseEntity<?> deleteFromFavoriteList(@PathVariable("id") int id) throws UserNotExist, MovieNotFound {
        email = (String) request.getAttribute("useremail");
       return new ResponseEntity<>(iUserService.deleteFromFavoriteList(email, id), HttpStatus.ACCEPTED);
    }

    //http://localhost:9000/user/v1/add/pic
    @PostMapping("/add/pic")
    public ResponseEntity<?> addPhoto(@RequestParam("image") MultipartFile image) {
        try {
            String email = (String) request.getAttribute("useremail");
            photoService.saveProfilePicture(email, image);
            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }



    //http://localhost:9000/user/v1/getprofile/picture
    @GetMapping("/getprofile/picture")
    public ResponseEntity<?> getProfilePicture() {
        try {
            String email = (String) request.getAttribute("useremail");
            byte[] profilePicture = photoService.getProfilePicture(email);
            ByteArrayResource resource = new ByteArrayResource(profilePicture);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf(MediaType.IMAGE_JPEG_VALUE));

            return ResponseEntity.ok().headers(headers).body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    //http://localhost:9000/user/v1/update/pic
    @PostMapping("/update/pic")
    public ResponseEntity<?> updatePhoto(@RequestParam("image") MultipartFile image) {
        try {
            String email = (String) request.getAttribute("useremail");
            photoService.deleteProfilePicture(email);
            photoService.saveProfilePicture(email, image);
            return ResponseEntity.ok(" your New Profile picture updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile picture");
        } catch (UserNotExist e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    //http://localhost:9000/user/v1/delete/profilepicture
    @DeleteMapping("/delete/profilepicture")
    public ResponseEntity<String> deleteProfilePicture() {
        try {
            String email = (String) request.getAttribute("useremail");
            photoService.deleteProfilePicture(email);
            return ResponseEntity.ok("Profile picture deleted successfully.");
        } catch (UserNotExist e) {
            return ResponseEntity.notFound().build();
        }
    }
}
