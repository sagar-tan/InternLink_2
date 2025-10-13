package com.internlink.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internlink.backend.entity.CandidateProfile;
import com.internlink.backend.service.CandidateService;
import com.internlink.backend.service.JWTService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private JWTService jwtService;

    // ✅ Get Candidate Profile
    @GetMapping("/profile")
    public ResponseEntity<?> getCandidateProfile(HttpServletRequest request) {
        try {
            System.out.println("Incoming Authorization Header: " + request.getHeader("Authorization"));
            // Extract the Authorization header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                System.out.println("Authorization header is missing or invalid");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Missing or invalid Authorization header");
            }

            // Extract token and email
            String token = authHeader.substring(7);
            System.out.println("Extracted Token: " + token);
            String email = jwtService.extractEmail(token);
            System.out.println("Extracted Email: " + email);

            if (email == null) {
                System.out.println("Email could not be extracted from token or token invalid");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Invalid token or email not found");
            }

            // Get candidate profile using email
            CandidateProfile profile = candidateService.getCandidateProfileByEmail(email);
            System.out.println("Fetched Candidate Profile: " + profile);
            return ResponseEntity.ok(profile);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching candidate profile");
        }
    }

    // ✅ Save or Update Candidate Profile
    @PostMapping("/profile")
    public ResponseEntity<?> saveOrUpdateProfile(
            @RequestHeader("Authorization") String token,
            @RequestBody CandidateProfile profile) {

        try {
            String jwt = token.replace("Bearer ", "");
            System.out.println("Incoming JWT: " + jwt);
            String email = jwtService.extractEmail(jwt);
            System.out.println("Extracted Email: " + email);

            CandidateProfile savedProfile = candidateService.saveOrUpdateProfile(email, profile);
            System.out.println("Saved/Updated Candidate Profile: " + savedProfile);
            return ResponseEntity.ok(savedProfile);

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error saving/updating candidate profile: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving/updating candidate profile");
        }
    }
}
