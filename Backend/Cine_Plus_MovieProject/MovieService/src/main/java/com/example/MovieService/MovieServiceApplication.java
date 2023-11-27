package com.example.MovieService;

import com.example.MovieService.jwtfilter.JWTFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@EnableFeignClients
@EnableEurekaClient
@SpringBootApplication
public class MovieServiceApplication {

    public static void main(String[] args) {


        SpringApplication.run(MovieServiceApplication.class, args);}
    @Bean
    public FilterRegistrationBean jwtFilter()
    {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new JWTFilter());
        filterRegistrationBean.addUrlPatterns("/user/v1/addUserDetails","/user/v1/updateUserInfo","/user/v1/deleteUserInfo",
                "/user/v1/getUserInfo","/user/v1/saveMovieToFavList","/user/v1/getALlUsersFavMovies","/user/v1/deleteFromFavoriteList/*","/user/v1/add/*","/user/v1/getprofile/*","/user/v1/delete/*","/user/v1/update/*");
        return filterRegistrationBean;
    }

}
