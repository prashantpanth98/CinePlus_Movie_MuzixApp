package com.example.EmailNotification.service;

import com.example.EmailNotification.domain.EmailData;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService{

    private int otp;
    private long otpTimeStamp=0;
    static final long expirationTime = 2*60*1000; //2mins

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")

    private String sender;

    private final Map<String,Integer> generatedOtp =new HashMap<>(); //otp save

    @Override
    public String sendEmail(EmailData emailData) throws MessagingException {
        try
        {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
            helper.setFrom(sender);
            helper.setTo(emailData.getReceiver());
            helper.setSubject(emailData.getSubject());
            helper.setText(emailData.getMessageBody());

            if(emailData.getAttachment() != null)
            {
                FileSystemResource fileSystemResource = new FileSystemResource(new File(emailData.getAttachment()));
                helper.addAttachment(fileSystemResource.getFilename(), fileSystemResource);

            }
            javaMailSender.send(mimeMessage);
            return "Mail Sent to " + emailData.getReceiver();

        }
        catch(Exception e)
        {
            e.printStackTrace();
            return "Mail failed to send";
        }
    }
    public static Long getOtpGenerateTime(Long otpTimeStamp)
    {
        return otpTimeStamp;
    }

    @Override
    public String generateOtpAndSendEmailToUser(String receiverEmail) {
        try
        {
            otp = (int) (Math.random()*9000)+1000;

            otpTimeStamp =System.currentTimeMillis();
            EmailServiceImpl.getOtpGenerateTime(otpTimeStamp);
            EmailData emailData = new EmailData();
            emailData.setReceiver(receiverEmail);
            emailData.setSubject("your otp");
            emailData.setMessageBody("your otp is" + otp);
            sendEmail(emailData);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            return "Otp failed to send";
        }
        return "otp sent " + receiverEmail;
    }

    @Override
    public int verifyOtp(int otp) {
        if(isOtpExpired())
        {
            otp=0;
        }
        return otp;
    }
    private boolean isOtpExpired(){
        long currentTIme=System.currentTimeMillis();
        EmailServiceImpl.getOtpGenerateTime(otpTimeStamp);
        return (currentTIme-otpTimeStamp)>expirationTime;
    }
}

