package com.internlink.backend.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internlink.backend.auth.model.AuthRequest;
import com.internlink.backend.auth.model.AuthResponse;
import com.internlink.backend.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println("Login request received: " + request);
        String token = authService.authenticateUser(
            request.getEmail(),
            request.getPassword(), 
            request.getUserType()
        );
        System.out.println("Token generated: " + token);
        return ResponseEntity.ok(new AuthResponse(token, request.getUserType()));
    }
}
