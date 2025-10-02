// UserService.java
package com.internlink.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.internlink.backend.dto.SignupRequest;
import com.internlink.backend.entity.User;
import com.internlink.backend.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
// the below method is having User like a DataType?
    public User signup(SignupRequest request) {// this is called in AuthController

        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();// creating a new user object to store the data from request
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setOrganization(request.getOrganization());
        user.setPhone(request.getPhone());

        // Map frontend userType to role
        user.setRole(request.getUserType().toLowerCase());

        return userRepository.save(user);// saving the user object to the database and returning the saved user
    }

}
