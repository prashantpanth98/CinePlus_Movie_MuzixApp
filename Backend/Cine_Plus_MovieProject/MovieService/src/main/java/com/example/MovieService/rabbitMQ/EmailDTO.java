package com.example.MovieService.rabbitMQ;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailDTO {
    private String receiver,messageBody,subject;
}
