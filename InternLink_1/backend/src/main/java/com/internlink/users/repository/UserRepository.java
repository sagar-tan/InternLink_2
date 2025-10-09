package com.internlink.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internlink.users.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
}

//this file is used to interact with the database for User entity
