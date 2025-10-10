package com.internlink.backend.users.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internlink.backend.users.model.User;
import com.internlink.backend.users.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User Save(User user){
        return userRepository.save(user);
    }

    public boolean emailExists(String email){
        return userRepository.existsByEmail(email); //Checks if the Certain Email is there in the Table or not!
    }


    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    
}
