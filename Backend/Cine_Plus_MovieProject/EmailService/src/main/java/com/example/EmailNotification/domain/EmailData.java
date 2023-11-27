package com.example.EmailNotification.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EmailData {
    private String receiver,messageBody,subject,attachment;
}
