// UserService.java
package com.internlink.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.internlink.backend.dto.SignupRequest;
import com.internlink.backend.entity.User;
import com.internlink.backend.repository.UserRepository;


/*
 * modifying the Login method for following react snippet in Login.tsx:
 *     try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // include the UI-selected userType so backend can return role-specific user data
        body: JSON.stringify({ email, password, userType }),
      });
      /////////
      public User login(String email, String password, String userType) {
        User user = userRepository.findByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPasswordHash()) || !user.getRole().equalsIgnoreCase(userType)) {
            throw new IllegalArgumentException("Invalid email, password, or user type");
        }
        return user;
 */

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
            throw new IllegalArgumentException("Email already registered");//Exceptions Defined in GlobalExceptionHandler.java
        }
        if(userRepository.findByPhone(request.getPhone()) != null) {
            throw new IllegalArgumentException("Phone number already registered");
        }

        User user = new User();// creating a new user object to store the data from request
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));// hashing the password before saving it to the database
        user.setOrganization(request.getOrganization());
        user.setPhone(request.getPhone());

        // Map frontend userType to role
        user.setRole(request.getUserType().toLowerCase());

        return userRepository.save(user);// saving the user object to the database and returning the saved user
    }

    public User login(String email, String password, String userType) {
        User user = userRepository.findByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        if (!user.getRole().equalsIgnoreCase(userType)) {
            throw new IllegalArgumentException("User type does not match");//need to implement a Frontend Alert for this
        }
        return user;
    }

}
