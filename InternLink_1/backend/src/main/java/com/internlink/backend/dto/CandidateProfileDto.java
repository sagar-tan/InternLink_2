package com.internlink.backend.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CandidateProfileDto {
    // Personal Information
    private String fullName;
    private String gender;
    private String dateOfBirth;
    private String citizenship;
    private String email;
    private String phone;
    private Boolean currentlyEmployed;
    private String currentAddress;
    private String city;
    private String state;
    private String pincode;

    // Reservation Details
    private String category;

    @JsonProperty("PwD")
    @JsonAlias({ "isPwD", "pwd", "pwD" })
    private Boolean pwd;

    @JsonProperty("PwdType")
    @JsonAlias({ "disabilityType", "pwdType" })
    private String pwdType;

    @JsonProperty("FGG")
    @JsonAlias({ "firstGenerationGraduate", "fgg" })
    private Boolean fgg;

    // Family Background
    private String familyIncome;
    private Boolean govtEmployee;
    private String fatherOccupation;
    private String motherOccupation;
    private String govtEmployeeDetails;

    // Educational Background
    private String highestDegree;
    private String institution;
    @JsonAlias({ "fieldOfStudy" })
    private String studyField;
    private String specialization;
    private String cgpa;
    private String currYear;
    @JsonAlias({ "yearOfGraduation" })
    private String graduationYear;

    // Previous Education
    private String class12Board;
    private String class12Year;
    private String class12Marks;
    private String class12Stream;

    // Past Participation
    private Boolean pmInternshipPrevious;
    private Boolean pmSkillingPrevious;
    private Boolean otherGovtScheme;
    private Boolean natsNapsTraining;

    @JsonProperty("pmleveldetails")
    private String pmLevelDetails;

    // Work Experience
    @JsonAlias({ "lastCompany" })
    private String companyName;
    @JsonAlias({ "lastPosition" })
    private String position;
    private String startDate;
    private String endDate;
    private String responsibilities;
    private String keyAchievements;
    private Boolean workHereNow;

    // Skills
    private List<String> skills;

    // Preferences
    private String preferredDomain;
    private String preferredLocation;
    @JsonAlias({ "internshipDuration" })
    private String preferredDuration;
    @JsonAlias({ "expectedStipend" })
    private String monthlyStipend;
}
