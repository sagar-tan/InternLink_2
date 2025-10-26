package com.internlink.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class CandidateProfileRequest {
    private Long userId; // Linked user
    private String gender;
    private String dateOfBirth;
    private String citizenship;
    private Boolean currentlyEmployed;
    private String currentAddress;
    private String city;
    private String state;
    private String pincode;
    private String category;
    private Boolean pwd;
    private String pwdType;
    private Boolean fgg;
    private Boolean govtEmployee;
    private String govtEmployeeDetails;
    private String familyIncome;
    private String fatherOccupation;
    private String motherOccupation;
//to be added
    private List<EducationDTO> education;
    private List<ExperienceDTO> experience;
    private List<String> skills;
    private PreferencesDTO preferences;
    private ParticipationDTO participation;
}
