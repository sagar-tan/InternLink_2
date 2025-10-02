package com.internlink.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internlink.backend.dto.SignupRequest;
import com.internlink.backend.entity.User;
import com.internlink.backend.service.UserService;

//using @ with spring boot to define a controller class
@RestController 
@RequestMapping("/api/auth") // we declare this by @ because we want to define a base URL for all authentication-related endpoints
//up until not the frontend was hitting wrong endpoint url, so spring boot thinks its a static file request instead of api request
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody SignupRequest request){// Method for handling the response from server to frontend
        User user = userService.signup(request);// calling the signup method from UserService class to handle the signup logic

        Map<String, Object> response = new HashMap<>();//DataStructure for Sending Request
        response.put("user", user);//Response 1
        response.put("message", "Signup Successful");//Affirmation of Success
        return response;// returning the response map to the frontend, the @postMapping annotation ensures that this method handles POST requests to /api/auth/signup
    }

    //@PostMapping("/login")//Login Endpoint 




/*     public User signup(@RequestBody SignupRequest request) {
        return userService.signup(request);
    }
 */
    
}
