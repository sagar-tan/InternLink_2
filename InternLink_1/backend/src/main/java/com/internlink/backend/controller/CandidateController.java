package com.internlink.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internlink.backend.entity.CandidateProfile;
import com.internlink.backend.service.CandidateService;
import com.internlink.backend.service.JWTService;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private JWTService jwtService;

    @GetMapping("/profile")
    public ResponseEntity<?> getCandidateProfile(@RequestHeader("Authorization") String token) {
        String jwt = token.replace("Bearer ", "");
        String email = jwtService.extractEmail(jwt);
        return ResponseEntity.ok(candidateService.getCandidateProfileByEmail(email));
    }

    @PostMapping("/profile")
    public ResponseEntity<?> saveOrUpdateProfile(
        @RequestHeader("Authorization") String token,
        @RequestBody CandidateProfile profile) {

        String jwt = token.replace("Bearer ", "");
        String email = jwtService.extractEmail(jwt);
        return ResponseEntity.ok(candidateService.saveOrUpdateProfile(email, profile));
    }
}
