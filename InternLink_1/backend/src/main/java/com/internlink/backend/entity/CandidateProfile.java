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
