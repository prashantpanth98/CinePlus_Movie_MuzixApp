package com.example.EmailNotification.rabitmq;

import com.example.EmailNotification.domain.EmailData;
import com.example.EmailNotification.service.EmailService;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmailConsumer {
@Autowired
private EmailService emailService;

    @RabbitListener(queues = "userMovieQueue")
    public void getEmailDtoFromQueue(EmailDTO emailDTO) throws Exception {
     EmailData emailData =new EmailData(emailDTO.getReceiver(), emailDTO.getMessageBody() , emailDTO.getSubject(),emailDTO.getAttachment());

     System.out.println(emailService.sendEmail(emailData));
 }
}
