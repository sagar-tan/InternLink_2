package com.internlink.backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.internlink.backend.entity.CandidateProfile;

@Repository
public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Integer> {
    Optional<CandidateProfile> findByUserUserId(Long userId);
}
