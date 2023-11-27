package com.example.UserAuthService.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Entity
public class User {
    @Id
    private String email;
    private String password;


}

