package com.internlink.backend.dto;
import lombok.Data;
@Data

public class AuthRequest {
    private String email;
    private String password;
    private String userType; // Add userType field
}
