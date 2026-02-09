package com.internlink.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JsonIgnore
    private CandidateProfile candidate;

    @Column(name = "pm_internship_previous")
    private Boolean pmInternshipPrevious;

    @Column(name = "pm_skilling_previous")
    private Boolean pmSkillingPrevious;

    @Column (name = "other_govt_scheme")
    private Boolean otherGovtScheme;

    @Column(name = "nats_naps_training")
    private Boolean natsNapsTraining;

    @Column(name = "pm_level_details")
    private String pmLevelDetails;
}
