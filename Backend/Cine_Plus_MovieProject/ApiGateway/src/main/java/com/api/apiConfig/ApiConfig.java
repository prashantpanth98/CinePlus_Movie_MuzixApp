package com.api.apiConfig;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration

public class ApiConfig {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/user/v1/**")
                        .uri("lb://Movie-service"))

                .route(p->p
                        .path("/user/v/**")
                        .uri("lb://UserAuth-service"))
                .build();
    }
}


