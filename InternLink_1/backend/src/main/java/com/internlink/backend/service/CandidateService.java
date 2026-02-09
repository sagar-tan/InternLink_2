package com.internlink.backend.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internlink.backend.dto.CandidateProfileDto;
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

    @Transactional
    public CandidateProfileDto getCandidateProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        CandidateProfile profile = candidateProfileRepository.findByUserUserId(user.getUserId())
            .orElseGet(() -> {
                CandidateProfile newProfile = new CandidateProfile();
                newProfile.setUser(user);
                return candidateProfileRepository.save(newProfile);
            });

        return toDto(user, profile);
    }

    @Transactional
    public CandidateProfileDto saveOrUpdateProfile(String email, CandidateProfileDto req) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (hasText(req.getFullName())) {
            user.setFullName(req.getFullName());
        }
        if (req.getPhone() != null) {
            user.setPhone(req.getPhone());
        }
        userRepository.save(user);

        CandidateProfile profile = candidateProfileRepository.findByUserUserId(user.getUserId())
            .orElse(new CandidateProfile());

        profile.setUser(user);
        profile.setGender(req.getGender());
        profile.setDateOfBirth(req.getDateOfBirth());
        profile.setCitizenship(req.getCitizenship());
        profile.setCurrentlyEmployed(req.getCurrentlyEmployed());
        profile.setCurrentAddress(req.getCurrentAddress());
        profile.setCity(req.getCity());
        profile.setState(req.getState());
        profile.setPincode(req.getPincode());
        profile.setCategory(req.getCategory());
        profile.setPwd(req.getPwd());
        profile.setPwdType(req.getPwdType());
        profile.setFgg(req.getFgg());
        profile.setFamilyIncome(req.getFamilyIncome());
        profile.setGovtEmployee(req.getGovtEmployee());
        profile.setFatherOccupation(req.getFatherOccupation());
        profile.setMotherOccupation(req.getMotherOccupation());
        profile.setGovtEmployeeDetails(req.getGovtEmployeeDetails());

        candidateProfileRepository.save(profile);

        // Education
        candidateEducationRepository.deleteAllByCandidate(profile);
        if (hasEducationData(req)) {
            CandidateEducation edu = new CandidateEducation();
            edu.setCandidate(profile);
            edu.setLevel(req.getHighestDegree());
            edu.setInstitution(req.getInstitution());
            edu.setStudyField(req.getStudyField());
            edu.setSpecialization(req.getSpecialization());
            edu.setCgpa(req.getCgpa());
            edu.setCurrYear(req.getCurrYear());
            edu.setGraduationYear(req.getGraduationYear());
            edu.setClass12Board(req.getClass12Board());
            edu.setClass12Year(req.getClass12Year());
            edu.setClass12Marks(req.getClass12Marks());
            edu.setClass12Stream(req.getClass12Stream());
            candidateEducationRepository.save(edu);
        }

        // Experience
        candidateExperienceRepository.deleteAllByCandidate(profile);
        if (hasExperienceData(req)) {
            CandidateExperience exp = new CandidateExperience();
            exp.setCandidate(profile);
            exp.setCompanyName(req.getCompanyName());
            exp.setPosition(req.getPosition());
            exp.setStartDate(req.getStartDate());
            exp.setEndDate(req.getEndDate());
            exp.setResponsibilities(req.getResponsibilities());
            exp.setKeyAchievements(req.getKeyAchievements());
            exp.setWorkHereNow(req.getWorkHereNow());
            candidateExperienceRepository.save(exp);
        }

        // Preferences
        if (hasPreferenceData(req)) {
            CandidatePreference pref = candidatePreferenceRepository.findByCandidate(profile)
                .orElseGet(CandidatePreference::new);
            pref.setCandidate(profile);
            pref.setPreferredDomain(req.getPreferredDomain());
            pref.setPreferredLocation(req.getPreferredLocation());
            pref.setPreferredDuration(req.getPreferredDuration());
            pref.setMonthlyStipend(req.getMonthlyStipend());
            candidatePreferenceRepository.save(pref);
        } else {
            candidatePreferenceRepository.deleteByCandidate(profile);
        }

        // Skills
        if (req.getSkills() != null) {
            candidateSkillRepository.deleteAllByCandidate(profile);
            for (String skill : req.getSkills()) {
                if (hasText(skill)) {
                    CandidateSkill cs = new CandidateSkill();
                    cs.setCandidate(profile);
                    cs.setSkillName(skill);
                    candidateSkillRepository.save(cs);
                }
            }
        }

        // Participation
        if (hasParticipationData(req)) {
            CandidateParticipation part = candidateParticipationRepository.findByCandidate(profile)
                .orElseGet(CandidateParticipation::new);
            part.setCandidate(profile);
            part.setPmInternshipPrevious(req.getPmInternshipPrevious());
            part.setPmSkillingPrevious(req.getPmSkillingPrevious());
            part.setOtherGovtScheme(req.getOtherGovtScheme());
            part.setNatsNapsTraining(req.getNatsNapsTraining());
            part.setPmLevelDetails(req.getPmLevelDetails());
            candidateParticipationRepository.save(part);
        } else {
            candidateParticipationRepository.deleteByCandidate(profile);
        }

        return toDto(user, profile);
    }

    private CandidateProfileDto toDto(User user, CandidateProfile profile) {
        CandidateProfileDto dto = new CandidateProfileDto();
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        dto.setGender(profile.getGender());
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setCitizenship(profile.getCitizenship());
        dto.setCurrentlyEmployed(profile.getCurrentlyEmployed());
        dto.setCurrentAddress(profile.getCurrentAddress());
        dto.setCity(profile.getCity());
        dto.setState(profile.getState());
        dto.setPincode(profile.getPincode());
        dto.setCategory(profile.getCategory());
        dto.setPwd(profile.getPwd());
        dto.setPwdType(profile.getPwdType());
        dto.setFgg(profile.getFgg());
        dto.setFamilyIncome(profile.getFamilyIncome());
        dto.setGovtEmployee(profile.getGovtEmployee());
        dto.setFatherOccupation(profile.getFatherOccupation());
        dto.setMotherOccupation(profile.getMotherOccupation());
        dto.setGovtEmployeeDetails(profile.getGovtEmployeeDetails());

        List<CandidateEducation> educationList = candidateEducationRepository.findAllByCandidate(profile);
        if (!educationList.isEmpty()) {
            CandidateEducation edu = educationList.get(0);
            dto.setHighestDegree(edu.getLevel());
            dto.setInstitution(edu.getInstitution());
            dto.setStudyField(edu.getStudyField());
            dto.setSpecialization(edu.getSpecialization());
            dto.setCgpa(edu.getCgpa());
            dto.setCurrYear(edu.getCurrYear());
            dto.setGraduationYear(edu.getGraduationYear());
            dto.setClass12Board(edu.getClass12Board());
            dto.setClass12Year(edu.getClass12Year());
            dto.setClass12Marks(edu.getClass12Marks());
            dto.setClass12Stream(edu.getClass12Stream());
        }

        List<CandidateExperience> experienceList = candidateExperienceRepository.findAllByCandidate(profile);
        if (!experienceList.isEmpty()) {
            CandidateExperience exp = experienceList.get(0);
            dto.setCompanyName(exp.getCompanyName());
            dto.setPosition(exp.getPosition());
            dto.setStartDate(exp.getStartDate());
            dto.setEndDate(exp.getEndDate());
            dto.setResponsibilities(exp.getResponsibilities());
            dto.setKeyAchievements(exp.getKeyAchievements());
            dto.setWorkHereNow(exp.getWorkHereNow());
        }

        List<CandidateSkill> skills = candidateSkillRepository.findAllByCandidate(profile);
        if (!skills.isEmpty()) {
            dto.setSkills(skills.stream()
                .map(CandidateSkill::getSkillName)
                .filter(Objects::nonNull)
                .collect(Collectors.toList()));
        }

        candidatePreferenceRepository.findByCandidate(profile).ifPresent(pref -> {
            dto.setPreferredDomain(pref.getPreferredDomain());
            dto.setPreferredLocation(pref.getPreferredLocation());
            dto.setPreferredDuration(pref.getPreferredDuration());
            dto.setMonthlyStipend(pref.getMonthlyStipend());
        });

        candidateParticipationRepository.findByCandidate(profile).ifPresent(part -> {
            dto.setPmInternshipPrevious(part.getPmInternshipPrevious());
            dto.setPmSkillingPrevious(part.getPmSkillingPrevious());
            dto.setOtherGovtScheme(part.getOtherGovtScheme());
            dto.setNatsNapsTraining(part.getNatsNapsTraining());
            dto.setPmLevelDetails(part.getPmLevelDetails());
        });

        return dto;
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    private boolean hasEducationData(CandidateProfileDto req) {
        return hasText(req.getHighestDegree())
            || hasText(req.getInstitution())
            || hasText(req.getStudyField())
            || hasText(req.getSpecialization())
            || hasText(req.getCgpa())
            || hasText(req.getCurrYear())
            || hasText(req.getGraduationYear())
            || hasText(req.getClass12Board())
            || hasText(req.getClass12Year())
            || hasText(req.getClass12Marks())
            || hasText(req.getClass12Stream());
    }

    private boolean hasExperienceData(CandidateProfileDto req) {
        return hasText(req.getCompanyName())
            || hasText(req.getPosition())
            || hasText(req.getStartDate())
            || hasText(req.getEndDate())
            || hasText(req.getResponsibilities())
            || hasText(req.getKeyAchievements())
            || req.getWorkHereNow() != null;
    }

    private boolean hasPreferenceData(CandidateProfileDto req) {
        return hasText(req.getPreferredDomain())
            || hasText(req.getPreferredLocation())
            || hasText(req.getPreferredDuration())
            || hasText(req.getMonthlyStipend());
    }

    private boolean hasParticipationData(CandidateProfileDto req) {
        return req.getPmInternshipPrevious() != null
            || req.getPmSkillingPrevious() != null
            || req.getOtherGovtScheme() != null
            || req.getNatsNapsTraining() != null
            || hasText(req.getPmLevelDetails());
    }
}
