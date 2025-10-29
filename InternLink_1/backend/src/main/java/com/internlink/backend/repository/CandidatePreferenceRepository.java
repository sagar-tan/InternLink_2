package com.internlink.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidatePreference;

@Repository
public interface CandidatePreferenceRepository extends JpaRepository<CandidatePreference, Long>{
    
}
