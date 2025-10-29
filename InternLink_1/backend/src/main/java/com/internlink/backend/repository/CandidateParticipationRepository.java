package com.internlink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateParticipation;

@Repository
public interface  CandidateParticipationRepository extends JpaRepository<CandidateParticipation, Long>{
    
}
