package com.example.UserAuthService.service;

import com.example.UserAuthService.domain.User;
import com.example.UserAuthService.exception.UserAlreadyExist;
import com.example.UserAuthService.exception.UserNotFound;


import com.example.UserAuthService.rabbitmq.EmailDTO;
import com.example.UserAuthService.rabbitmq.EmailProducer;
import com.example.UserAuthService.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService implements IuserService {


    HttpServletRequest request;
    UserRepository userRepo;
    EmailProducer movieEmailProducer;
    @Autowired
    public UserService(UserRepository userRepo, EmailProducer movieEmailProducer,
                       HttpServletRequest request) {
        this.userRepo = userRepo;
        this.movieEmailProducer = movieEmailProducer;
        this.request=request;

    }

    @Override
    public User loginUser(String email, String password) throws UserNotFound {
        User user = userRepo.findByEmailAndPassword(email, password);
        if (user != null && user.getEmail().equals(email) && user.getPassword().equals(password)) {
            EmailDTO eDt=new EmailDTO(user.getEmail(),"Congratulations!!!!\n Welcome"+
                    "  Dear [ "+user.getEmail()+" ],\n" +"Enjoy with Cine_Plus Movies where you can Find All kinds of movies"
                     , "Login  Successfully!");

            movieEmailProducer.sendMailToQueue(eDt);
            return user;
        } else
            throw new UserNotFound();
    }

    @Override
    public User addNewUser(User u) throws UserAlreadyExist {
        Optional<User> getUser=userRepo.findById(u.getEmail());
        if (getUser.isEmpty()) {
            String password=GenratePassword(u.getEmail());
            u.setPassword(password);
            EmailDTO emailMovieDTO = new EmailDTO(u.getEmail(), "Welcome  " + "Dear [ "+u.getEmail()+" ],\n" +
                    "We are thrilled to inform you that your SignUp attempt was successful! On behalf of Cine_Plus team,\n" +
                      "With Cine_Plus, you have unlocked a world of unlimited entertainment at your fingertips. " +
                    "\nGet ready to embark on a cinematic journey filled with excitement, adventure," +
                      " and the best selection of movies from around the globe"+"!\n"+
                    "your generated password is \n"+u.getPassword()+
                    " \nDo not share it with anyone!Enjoy CinePlus Movies!", "Sign Up is Successfully");
            movieEmailProducer.sendMailToQueue(emailMovieDTO);
            return userRepo.save(u);
        }
        else{
            throw new UserAlreadyExist();
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    @Override
    public boolean updatePassword(String email,String newPassword) throws UserNotFound {
        System.out.println(email);
        if(userRepo.findById(email).isEmpty()){
            throw new UserNotFound();
        }


            User existUser=userRepo.findById(email).get();
            String oldPassword= existUser.getPassword();
            existUser.setPassword(newPassword);
            EmailDTO eDt=new EmailDTO(email,"Congratullations!!! \n"+"  Dear [ "+email+" ],\n"+",\nYour password(confidential)"+
                    " is changed from  \n"+ oldPassword+" to "+newPassword, "Password updated Successfully!");

            movieEmailProducer.sendMailToQueue(eDt);
            userRepo.save(existUser);
            return true;

    }
Map<String ,Integer>map1=new HashMap<>();
    @Override
    public boolean forgotPassword(String email) throws UserNotFound {
        if(userRepo.findById(email).isPresent()){
            int sentOTP = (int) (Math.random()*9000)+1000;
            map1.put(email,sentOTP);
            EmailDTO e=new EmailDTO(email,"Hello,"+"Dear [ "+email+" ], Your OTP is \n"+sentOTP+"\n " +
                    "Verify with us So that we can  get back your password to you!!","\nOTP for Forgot Password!");
            movieEmailProducer.sendMailToQueue(e);

            return true;

        }
        else{
            throw new UserNotFound();
        }
    }

    @Override
    public boolean ViefiedOtpAndSendPassword(String email,int recievieOtp) throws UserNotFound {
        User existUser=userRepo.findById(email).get();
       int sentOtp= map1.get(email);
        System.out.println(sentOtp);
        if(sentOtp==recievieOtp){
            EmailDTO e = new EmailDTO(email, "Congrats  " + email + ", Your  password is " + existUser.getPassword(),
                    "Old Password Received!");
            movieEmailProducer.sendMailToQueue(e);
            userRepo.save(existUser);
            map1.clear();
            return true;
        }
        throw new UserNotFound();

    }


    @Override
    public String GenratePassword(String email) {
        String emailPrefix = email.substring(0, 4).toUpperCase();
        char specialChar = generateRandomSpecialChar();
        String digits = generateRandomDigits();
        String password = emailPrefix + specialChar + digits;
        return password;
    }
    private String generateRandomDigits() {
        Random random = new Random();
        StringBuilder digits = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            int digit = random.nextInt(10);
            digits.append(digit);
        }
        return digits.toString();
    }
    private char generateRandomSpecialChar() {
        String specialChars = "!@#$%^&*=+-><?/|";
        Random random = new Random();
        int index = random.nextInt(specialChars.length());
        return specialChars.charAt(index);
    }

}