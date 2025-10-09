package com.internlink.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.internlink.auth.model.AuthRequest;
import com.internlink.auth.model.AuthResponse;
import com.internlink.users.model.User;
import com.internlink.users.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService; // Inject JWTService

    public AuthResponse login(AuthRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not Found"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getRole());
    }

    
    public String authenticateUser(String email, String password, String userType) {
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

        // 3️⃣ Generate JWT token
        return jwtService.generateToken(user);
    }
    
}
