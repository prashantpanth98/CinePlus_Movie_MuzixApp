package com.example.MovieService.rabbitMQ;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfiguration {

    @Bean
    public DirectExchange getDirectExchange()
    {
        return new DirectExchange("exchangeName");
    }

    @Bean
    public Queue registerQueue()
    {
        return new Queue("userMovieQueue");
    }
    @Bean
    public Jackson2JsonMessageConverter  producerJackson2JsonMessageConverter()
    {
        return new Jackson2JsonMessageConverter();
    }


    @Bean
    public Binding bindUser(DirectExchange exchange , Queue registerQueue)
    {
        return BindingBuilder.bind(registerQueue).to(exchange).with("movie_routing");
    }

    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory)
    {
        RabbitTemplate rabbitTemplate =new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerJackson2JsonMessageConverter());
        return rabbitTemplate;
    }

}
