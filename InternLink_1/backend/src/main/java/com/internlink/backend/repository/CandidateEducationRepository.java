package com.internlink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateEducation;
import com.internlink.backend.entity.CandidateProfile;
@Repository
public interface  CandidateEducationRepository extends JpaRepository<CandidateEducation, Long> {
    void deleteAllByCandidate(CandidateProfile candidate);
}
