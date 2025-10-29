package com.internlink.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "candidate_participation")
@Getter @Setter
public class CandidateParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participation_id")
    private Long participationId;

    @OneToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private CandidateProfile candidate;

    private String hackathons;    // JSON or comma-separated list
    private String certifications;
    private String volunteering;
    private String achievements;
}
