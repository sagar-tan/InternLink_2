package com.internlink.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.internlink.backend.users.model.User;
import com.internlink.backend.users.repository.UserRepository;

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
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 2️⃣ Validate userType matches the stored one (candidate/recruiter)
        if (!user.getRole().equalsIgnoreCase(userType)) {
            throw new RuntimeException("Invalid user type for this account");
        }
        System.out.println("User found: " + user.getEmail() + ", role: " + user.getRole());


        // 3️⃣ Generate JWT token
        return jwtService.generateToken(user);
    }
    
}
