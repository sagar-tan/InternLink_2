package com.internlink.backend.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class SignupRequest {
    private String fullName;
    private String email;
    private String password;
    private String confirmPassword;
    private String organization;
    private String phone;
    private String role;
    private String userType; // "student" or "employer"
    //we will have to add a Captcha field here later
}
