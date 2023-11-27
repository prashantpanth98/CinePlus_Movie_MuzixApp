package com.example.UserAuthService.service;

import com.example.UserAuthService.domain.User;

import com.example.UserAuthService.exception.UserAlreadyExist;
import com.example.UserAuthService.exception.UserNotFound;

import java.util.List;

public interface IuserService {
    public User loginUser(String email, String password) throws UserNotFound;
    public User addNewUser(User user) throws UserAlreadyExist;
    public String GenratePassword(String email);
    public boolean updatePassword(String email,String newPassword) throws UserNotFound;
    public boolean forgotPassword(String email) throws UserNotFound;
    public boolean ViefiedOtpAndSendPassword(String email,int recievieOtp) throws UserNotFound;
}
