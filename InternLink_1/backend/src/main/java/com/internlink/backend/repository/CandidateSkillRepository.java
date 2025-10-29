package com.internlink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateSkill;

@Repository
public interface CandidateSkillRepository extends JpaRepository<CandidateSkill, Long> {
    
}
