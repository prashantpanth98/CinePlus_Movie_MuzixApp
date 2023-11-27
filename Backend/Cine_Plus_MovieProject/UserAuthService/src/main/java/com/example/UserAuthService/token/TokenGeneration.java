package com.example.UserAuthService.token;

import com.example.UserAuthService.domain.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenGeneration implements ITokenGeneration {

    @Override
    public Map<String, String> tokengenerator(User user) {
        String jwttoken;
        jwttoken = Jwts.builder().setSubject(user.getEmail()).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "Security Key").compact();
        Map<String, String> map = new HashMap<>();
        map.put("Token", jwttoken);
        map.put("Status", "User Login Successful");
        return map;
    }
}