package com.internlink.backend.auth.model;
import lombok.Data;
@Data

public class AuthRequest {
    private String email;
    private String password;
    private String userType; // Add userType field
}
