package com.example.MovieService.service;

import com.example.MovieService.domain.Photo;
import com.example.MovieService.domain.User;
import com.example.MovieService.exception.UserNotExist;
import com.example.MovieService.rabbitMQ.EmailDTO;
import com.example.MovieService.rabbitMQ.EmailProducer;
import com.example.MovieService.repository.IUserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Service
public class PhotoService  implements IPhotoService {

    IUserRepository iUserRepository;

    private EmailProducer movieEmailProducer;
    @Autowired
    public PhotoService(IUserRepository iUserRepository, EmailProducer movieEmailProducer) {
        this.iUserRepository = iUserRepository;
        this.movieEmailProducer = movieEmailProducer;
    }





    @Override
    public void saveProfilePicture(String email, MultipartFile file) throws IOException {
        Optional<User> userOptional = iUserRepository.findById(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            byte[] profilePictureBytes = file.getBytes();
            String profilePictureString = Base64.getEncoder().encodeToString(profilePictureBytes);
            Photo photo = new Photo();
            photo.setName(file.getOriginalFilename());
            photo.setProfilePicture(profilePictureString);

            user.setPhoto(photo);
            EmailDTO emailMovieDTO = new EmailDTO(user.getEmail(), "Congratulations!!!!\n" +"Dear [ " +user.getEmail()+" ]\n" + "you have Uploaded Your Profile Pic SuccessFully", "Photo Uploaded");
            movieEmailProducer.sendMailToQueue(emailMovieDTO);

            iUserRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    @Override
    public byte[] getProfilePicture(String email) throws UserNotExist{

        Optional<User> userOptional = iUserRepository.findById(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Photo photo = user.getPhoto();
            if (photo != null && photo.getProfilePicture() != null) {
                byte[] profilePictureBytes = Base64.getDecoder().decode(photo.getProfilePicture());
//                String decodedePicString=profilePictureBytes.toString();
                return profilePictureBytes;
            }
        }
            throw new UserNotExist();

    }

    @Override
    public void deleteProfilePicture(String email) throws UserNotExist {
        Optional<User> userOptional = iUserRepository.findById(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Photo photo = user.getPhoto();
            if (photo != null) {
                user.setPhoto(null);
                iUserRepository.save(user);
                EmailDTO emailMovieDTO = new EmailDTO(user.getEmail(), "Congratulations!!!!\n" +"Dear [ " +user.getEmail()+" ]\n" + "you have Deleted  Your Profile Pic ", " Photo Deleted");
                movieEmailProducer.sendMailToQueue(emailMovieDTO);
            } else {
                throw new UserNotExist();
            }
        } else {
            throw new UserNotExist();
        }
    }



}