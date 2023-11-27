package com.example.EmailNotification.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class Otp {
    private String email;
    private String otp;
    private LocalDateTime timeStamp;

}
