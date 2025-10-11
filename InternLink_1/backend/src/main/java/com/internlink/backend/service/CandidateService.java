package com.internlink.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internlink.backend.entity.CandidateProfile;
import com.internlink.backend.entity.User;
import com.internlink.backend.repository.CandidateProfileRepository;
import com.internlink.backend.repository.UserRepository;

@Service
public class CandidateService {

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public CandidateProfile getCandidateProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return candidateProfileRepository.findByUserId(user.getUserId())
            .orElseGet(() -> {
                CandidateProfile newProfile = new CandidateProfile();
                newProfile.setUser(user);
                return candidateProfileRepository.save(newProfile);
            });
    }

    public CandidateProfile saveOrUpdateProfile(String email, CandidateProfile updatedProfile) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        CandidateProfile existing = candidateProfileRepository.findByUserId(user.getUserId())
            .orElse(new CandidateProfile());

        updatedProfile.setUser(user);
        updatedProfile.setCandidateId(existing.getCandidateId());
        return candidateProfileRepository.save(updatedProfile);
    }
}
