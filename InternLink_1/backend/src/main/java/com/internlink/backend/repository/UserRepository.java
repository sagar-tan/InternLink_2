package com.internlink.backend.repository;

import com.internlink.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This is used in UserService to check if a user exists
    User findByEmail(String email);
}
