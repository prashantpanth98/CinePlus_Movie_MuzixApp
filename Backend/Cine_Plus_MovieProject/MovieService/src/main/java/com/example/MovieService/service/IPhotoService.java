package com.example.MovieService.service;




import com.example.MovieService.exception.UserNotExist;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IPhotoService {
        public void saveProfilePicture(String email, MultipartFile file) throws IOException;
        public byte[] getProfilePicture(String email) throws UserNotExist;
        public void deleteProfilePicture(String email) throws UserNotExist;


}