package com.internlink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateExperience;
import com.internlink.backend.entity.CandidateProfile;

@Repository
public interface CandidateExperienceRepository extends JpaRepository<CandidateExperience, Long>{
    void deleteAllByCandidate(CandidateProfile candidate);
}
