package com.example.MovieService.rabbitMQ;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmailProducer {

    private DirectExchange directExchange;
    private RabbitTemplate rabbitTemplate;

    @Autowired
    public EmailProducer(DirectExchange directExchange, RabbitTemplate rabbitTemplate) {
        this.directExchange = directExchange;
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendMailToQueue(EmailDTO emailDTO)
    {
        rabbitTemplate.convertAndSend(directExchange.getName(), "movie_routing" , emailDTO );
    }
}
