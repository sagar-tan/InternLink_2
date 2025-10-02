package com.internlink.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.internlink.backend.dto.SignupRequest;
import com.internlink.backend.entity.User;
import com.internlink.backend.service.UserService;

public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody SignupRequest request) {
        return userService.signup(request);
    }

    
}
