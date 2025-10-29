package com.internlink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internlink.backend.entity.CandidatePreference;

public interface  CandidateParticipationRepository extends JpaRepository<CandidatePreference, Long>{
    
}
