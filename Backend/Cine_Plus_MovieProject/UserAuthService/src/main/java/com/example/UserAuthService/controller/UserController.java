package com.example.UserAuthService.controller;

import com.example.UserAuthService.domain.User;
import com.example.UserAuthService.exception.UserAlreadyExist;
import com.example.UserAuthService.exception.UserNotFound;
import com.example.UserAuthService.service.IuserService;
import com.example.UserAuthService.token.ITokenGeneration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/user/v")
public class UserController {

    private HttpServletRequest request;
    private IuserService iuserService;
    private ResponseEntity responseEntity;
    private ITokenGeneration iTokenGeneration;

    @Autowired
    public UserController(IuserService iuserService, ITokenGeneration iTokenGeneration,HttpServletRequest request) {
        this.iuserService = iuserService;
        this.iTokenGeneration = iTokenGeneration;
        this.request = request;
    }

    //http://localhost:8001/User/v/addUser
    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody User User) throws UserAlreadyExist {

        return responseEntity = new ResponseEntity<>(iuserService.addNewUser(User), HttpStatus.OK);
    }

    //http://localhost:8001/User/v/login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User User) throws UserNotFound {
        User LoginCheck = iuserService.loginUser(User.getEmail(), User.getPassword());
        System.out.println(User);
        if (LoginCheck != null) {
            Map<String, String> map = iTokenGeneration.tokengenerator(LoginCheck);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else
            return new ResponseEntity<>("User Not Found ", HttpStatus.NOT_FOUND);
    }
/////////////////////////////////////////


//    http://localhost:8001/User/v/update/
    @PutMapping("/update")
    public ResponseEntity<?> updateUserPassword(@RequestBody String newPassword) throws UserNotFound{
       try{
           String email=(String)request.getAttribute("useremail");
           return new ResponseEntity<>(iuserService.updatePassword(email,newPassword),HttpStatus.OK);
       } catch (UserNotFound e) {
           throw new UserNotFound();
       }
    }
    @GetMapping("/forgot/{email}")
    public ResponseEntity<?> forgotUserPassword(@PathVariable String email) throws UserNotFound{
        try{

            return new ResponseEntity<>(iuserService.forgotPassword(email),HttpStatus.OK);
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }
    @GetMapping("/VerifyOtp/{email}/{Otp}")
    public ResponseEntity<?> VerifyOtP(@PathVariable String email,@PathVariable int Otp) throws UserNotFound{
        try{
            return new ResponseEntity<>(iuserService.ViefiedOtpAndSendPassword(email,Otp),HttpStatus.OK);
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }

////////////////////////////////////////////////

//    //http://localhost:8001/User/v/update/{email}
//    @PutMapping("/update/{email}")
//    public ResponseEntity<?> updateUser(@RequestBody User User, @PathVariable("email") String email) throws UserNotFound {
//        return responseEntity = new ResponseEntity<>(iuserService.updateUserDetails(email, User), HttpStatus.OK);
//    }
//
//    //http://localhost:8001/User/v/getAllUsers
//    @GetMapping("/getAllUsers")
//    public ResponseEntity<?> getAllUsers() throws UserNotFound {
//        return responseEntity = new ResponseEntity<>(iuserService.getALlUsers(), HttpStatus.OK);
//    }
//
//    //http://localhost:8001/User/v/deleteUser/{email}
//    @DeleteMapping("/deleteUser/{email}")
//    public ResponseEntity<?> deleteUser(@PathVariable("email") String email) throws UserNotFound {
//        return responseEntity = new ResponseEntity<>(iuserService.deleteUser(email), HttpStatus.OK);
//    }
}

