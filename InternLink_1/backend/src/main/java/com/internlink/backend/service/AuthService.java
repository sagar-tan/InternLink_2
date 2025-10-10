package com.internlink.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.internlink.backend.entity.User;
import com.internlink.backend.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService; // Inject JWTService
    

    public String authenticateUser(String email, String password, String userType) {
        System.out.println("Login attempt: email=" + email + ", userType=" + userType);

    // 1️⃣ Authenticate user normally
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));// this or elseThrow is supposed to be included if findByEmail is declared as optional in UserRepo
        
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        // 2️⃣ Validate userType matches the stored one (candidate/recruiter)

        if (!user.getRole().equalsIgnoreCase(userType)) {
            throw new IllegalArgumentException(
                "You are registered as " + user.getRole() + 
                ". Please login with that profile or register as a new " + userType + "."//modifying this to prompt user to change UserType
            );
        }

        System.out.println("User found: " + user.getEmail() + ", role: " + user.getRole());


        // 3️⃣ Generate JWT token
        return jwtService.generateToken(user);
    }
    
}
