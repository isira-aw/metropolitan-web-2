package com.metropolitan.backend.repository;

import com.metropolitan.backend.model.CaseStudy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
    Page<CaseStudy> findByDivision(String division, Pageable pageable);
    long countByDivision(String division);
}
