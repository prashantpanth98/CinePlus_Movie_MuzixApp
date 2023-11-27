package com.example.MovieService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDetails {
    private String firstName;
    private String lastName;
    private String gender;
    private String address;
    private long mobileNo;
}
