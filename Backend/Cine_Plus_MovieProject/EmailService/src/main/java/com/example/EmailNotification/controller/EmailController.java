package com.example.EmailNotification.controller;

import com.example.EmailNotification.domain.EmailData;
import com.example.EmailNotification.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/mailapp")
public class EmailController {

    @Autowired
    private EmailService emailService;

    //http://localhost:5674/mailapp/sendEmail
    @PostMapping("/sendEmail")
    public ResponseEntity<?> sendEmail(@RequestBody EmailData emailData) throws MessagingException {
        return new ResponseEntity<>(emailService.sendEmail(emailData), HttpStatus.OK);
    }

     // http://localhost:5674/mailapp/sendOtp?receiverEmail=user@example.com
    @GetMapping("/sendOtp")
    public ResponseEntity<?> sendOtp(@RequestParam String receiverEmail) {
        return new ResponseEntity<>(emailService.generateOtpAndSendEmailToUser(receiverEmail), HttpStatus.OK);
    }

     //http://localhost:5674/mailapp/checkOtp/{otp}
    @GetMapping("/checkOtp/{otp}")
    public ResponseEntity<?> checkOtp(@PathVariable int otp) {
        return new ResponseEntity<>(emailService.verifyOtp(otp), HttpStatus.OK);
    }
}