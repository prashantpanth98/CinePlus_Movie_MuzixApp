package com.example.MovieService.profileConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class PicConfig {



        @Bean
        public CommonsMultipartResolver multipartResolver() {
            CommonsMultipartResolver resolver = new CommonsMultipartResolver();
            resolver.setMaxUploadSize(100000000);

            return resolver;
        }

}
