package com.internlink.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateProfile;
import com.internlink.backend.entity.CandidateSkill;

@Repository
public interface CandidateSkillRepository extends JpaRepository<CandidateSkill, Long> {
    void deleteAllByCandidate(CandidateProfile candidate);
    List<CandidateSkill> findAllByCandidate(CandidateProfile candidate);
    
}
