package com.internlink.auth.service;

import com.internlink.auth.model.AuthRequest;
import com.internlink.auth.model.AuthResponse;
import com.internlink.users.model.User;
import com.internlink.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.internlink.auth.service.JWTService;

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
        return new AuthResponse(token, user.getRole().name());

    }

    
}
