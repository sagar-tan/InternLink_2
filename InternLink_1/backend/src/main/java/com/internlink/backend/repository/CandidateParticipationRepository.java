package com.internlink.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateParticipation;
import com.internlink.backend.entity.CandidateProfile;

@Repository
public interface  CandidateParticipationRepository extends JpaRepository<CandidateParticipation, Long>{
    Optional<CandidateParticipation> findByCandidate(CandidateProfile candidate);
    void deleteByCandidate(CandidateProfile candidate);
}
