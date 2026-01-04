package com.metropolitan.backend.repository;

import com.metropolitan.backend.model.Testimonial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    Page<Testimonial> findByDivision(String division, Pageable pageable);
    List<Testimonial> findByDivision(String division);
    long countByDivision(String division);
}
