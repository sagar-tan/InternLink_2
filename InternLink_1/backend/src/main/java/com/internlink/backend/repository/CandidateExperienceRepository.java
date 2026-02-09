package com.internlink.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateExperience;
import com.internlink.backend.entity.CandidateProfile;

@Repository
public interface CandidateExperienceRepository extends JpaRepository<CandidateExperience, Long>{
    void deleteAllByCandidate(CandidateProfile candidate);
    List<CandidateExperience> findAllByCandidate(CandidateProfile candidate);
}
