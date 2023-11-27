package com.example.EmailNotification.service;

import com.example.EmailNotification.domain.EmailData;

import javax.mail.MessagingException;

public interface EmailService {
    String sendEmail(EmailData emailData) throws MessagingException;
    String generateOtpAndSendEmailToUser(String receiverEmail);
    int verifyOtp(int otp);
}
