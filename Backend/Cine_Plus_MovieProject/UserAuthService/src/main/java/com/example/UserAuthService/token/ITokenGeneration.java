package com.example.UserAuthService.token;

import com.example.UserAuthService.domain.User;


import java.util.Map;

public interface ITokenGeneration {
    public Map<String, String> tokengenerator(User userAuth);
}
