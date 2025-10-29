/* 
package com.internlink.backend.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "candidate_profiles")
@Getter @Setter
public class CandidateProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "candidate_id")
    private Long candidateId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String gender;
    private String city;
    private String state;
    private String category;

    @Transient
    private CandidateEducation education;

    @Transient
    private CandidatePreference preferences;

    @Transient
    private List<CandidateSkill> skills;
}



 */


package com.internlink.backend.entity;

import java.util.List;

import com.internlink.backend.dto.EducationDTO;
import com.internlink.backend.dto.ExperienceDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "candidate_profiles")
@Getter @Setter
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "candidate_id")
    private Long candidateId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

    // ✅ Relationships
    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EducationDTO> education; // we were using Entities instead of DTOs

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExperienceDTO> experience;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<String> skills; //Also using Entities instead of DTO

    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    private CandidatePreference preferences;

    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    private CandidateParticipation participation;
}
