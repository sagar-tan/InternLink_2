package com.internlink.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internlink.backend.dto.AuthRequest;
import com.internlink.backend.dto.SignupRequest;
import com.internlink.backend.entity.User;
import com.internlink.backend.service.AuthService;
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        System.out.println("Login Request Recieved: " + request);
        String token = authService.authenticateUser(
            request.getEmail(),
            request.getPassword(),
            request.getUserType()
        );
        System.err.println("Token Generated: "+token);
        return ResponseEntity.ok(new AuthResponse(token, request.getUserType()));
    }




/*     public User signup(@RequestBody SignupRequest request) {
        return userService.signup(request);
    }
 */
    
}


/*
 * This whole Backend workflow works as follows:
 * 1. The frontend sends a POST request to the /api/auth/signup endpoint with the user's signup details in the request body.
 * 2. The AuthController receives the request and calls the UserService.signup() method to handle the signup logic.
 * 3. The UserService checks if the email or phone number is already registered.
 * 4. If the email or phone number is not registered, a new User object is created and saved to the database.
 * 5. The UserService returns the newly created User object to the AuthController.
 * 6. The AuthController prepares a response map containing the user information and a success message.
 * 7. The response map is returned to the frontend.
 */