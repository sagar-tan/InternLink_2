package com.internlink.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidatePreference;
import com.internlink.backend.entity.CandidateProfile;

@Repository
public interface CandidatePreferenceRepository extends JpaRepository<CandidatePreference, Long>{
    Optional<CandidatePreference> findByCandidate(CandidateProfile candidate);
    void deleteByCandidate(CandidateProfile candidate);
}
