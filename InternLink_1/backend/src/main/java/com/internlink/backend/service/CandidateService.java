package com.internlink.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internlink.backend.dto.EducationDTO;
import com.internlink.backend.dto.ExperienceDTO;
import com.internlink.backend.entity.CandidateEducation;
import com.internlink.backend.entity.CandidateExperience;
import com.internlink.backend.entity.CandidateParticipation;
import com.internlink.backend.entity.CandidatePreference;
import com.internlink.backend.entity.CandidateProfile;
import com.internlink.backend.entity.CandidateSkill;
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
        
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        CandidateProfile profile = candidateProfileRepository.findByUserUserId(user.getUserId()).orElse(new CandidateProfile());

        profile.setUser(user);
        profile.setCity(req.getCity());
        profile.setState(req.getState());
        profile.setCategory(req.getCategory());
        profile.setCurrentlyEmployed(req.getCurrentlyEmployed());
        profile.setCurrentAddress(req.getCurrentAddress());
        profile.setPincode(req.getPincode());
        profile.setFamilyIncome(req.getFamilyIncome());
        profile.setFatherOccupation(req.getFatherOccupation());
        profile.setMotherOccupation(req.getMotherOccupation());
        profile.setGovtEmployee(req.getGovtEmployee());
        profile.setGovtEmployeeDetails(req.getGovtEmployeeDetails());
        profile.setPwd(req.getPwd());
        profile.setPwdType(req.getPwdType());
        profile.setFgg(req.getFgg());
        profile.setCitizenship(req.getCitizenship());
        profile.setDateOfBirth(req.getDateOfBirth());
        candidateProfileRepository.save(profile);




        // 🧠 Save Education
        if (req.getEducation() != null) {
            candidateEducationRepository.deleteAllByCandidate(profile);
            for (EducationDTO eduDto : req.getEducation()) {
                CandidateEducation edu = new CandidateEducation();
                edu.setCandidate(profile);
                edu.setLevel(eduDto.getLevel());
                edu.setInstitution(eduDto.getInstitution());
                edu.setGraduationYear(eduDto.getGraduationYear());
                candidateEducationRepository.save(edu);
            }
        }

        // 💼 Experience
        if (req.getExperience() != null) {
            candidateExperienceRepository.deleteAllByCandidate(profile);
            for (ExperienceDTO expDto : req.getExperience()) {
                CandidateExperience exp = new CandidateExperience();
                exp.setCandidate(profile);
                exp.setCompanyName(expDto.getCompanyName());
                exp.setPosition(expDto.getPosition());
                exp.setStartDate(expDto.getStartDate());
                exp.setEndDate(expDto.getEndDate());
                candidateExperienceRepository.save(exp);
            }
        }

        // 💬 Preferences
        if (req.getPreferences() != null) {
            CandidatePreference pref = new CandidatePreference();
            pref.setCandidate(profile);
            pref.setPreferredDomain(req.getPreferences().getPreferredDomain());
            pref.setPreferredLocation(req.getPreferences().getPreferredLocation());
            candidatePreferenceRepository.save(pref);
        }

        // 🧠 Skills
        if (req.getSkills() != null) {
            candidateSkillRepository.deleteAllByCandidate(profile);
            for (String skill : req.getSkills()) {
                CandidateSkill cs = new CandidateSkill();
                cs.setCandidate(profile);
                cs.setSkillName(skill);
                candidateSkillRepository.save(cs);
            }
        }

        // 🪪 Participation
        if (req.getParticipation() != null) {
            CandidateParticipation part = new CandidateParticipation();
            part.setCandidate(profile);
            part.setPmInternshipPrevious(req.getParticipation().getPmInternshipPrevious());
            part.setPmSkillingPrevious(req.getParticipation().getPmSkillingPrevious());
            part.setOtherGovtScheme(req.getParticipation().getOtherGovtScheme());
            part.setNatsNapsTraining(req.getParticipation().getNatsNapsTraining());
            candidateParticipationRepository.save(part);
        }

        return profile;
    }
}
