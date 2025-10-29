package com.internlink.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internlink.backend.entity.CandidateProfile;
import com.internlink.backend.entity.User;
import com.internlink.backend.repository.CandidateEducationRepository;
import com.internlink.backend.repository.CandidateExperienceRepository;
import com.internlink.backend.repository.CandidateParticipationRepository;
import com.internlink.backend.repository.CandidatePreferenceRepository;
import com.internlink.backend.repository.CandidateProfileRepository;
import com.internlink.backend.repository.CandidateSkillRepository;
import com.internlink.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CandidateService {
    

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateEducationRepository candidateEducationRepository;

    @Autowired
    private CandidateExperienceRepository candidateExperienceRepository;

    @Autowired
    private CandidatePreferenceRepository candidatePreferenceRepository;
    
    @Autowired
    private CandidateSkillRepository candidateSkillRepository;


    @Autowired
    private CandidateParticipationRepository candidateParticipationRepository;


    public CandidateProfile getCandidateProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return candidateProfileRepository.findByUserUserId(user.getUserId())
            .orElseGet(() -> {
                CandidateProfile newProfile = new CandidateProfile();
                newProfile.setUser(user);
                return candidateProfileRepository.save(newProfile);
            });
    }

    @Transactional
    public CandidateProfile saveOrUpdateProfile(String email, CandidateProfile req) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        CandidateProfile profile = candidateProfileRepository.findByUserUserId(user.getUserId())
            .orElse(new CandidateProfile());
        profile.setUser(user);
        profile.setCity(req.getCity());


        req.setUser(user);
        req.setCandidateId(profile.getCandidateId());
        return candidateProfileRepository.save(req);
    }
}
