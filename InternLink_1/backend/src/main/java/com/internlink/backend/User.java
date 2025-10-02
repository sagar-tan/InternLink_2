package com.internlink.backend;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    
    private String organization;
    
    @Column(length = 20)
    private String phone;

    @Column(nullable=false)
    private String role;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
}
