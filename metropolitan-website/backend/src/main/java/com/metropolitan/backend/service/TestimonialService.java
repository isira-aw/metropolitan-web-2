package com.metropolitan.backend.service;

import com.metropolitan.backend.dto.PageResponse;
import com.metropolitan.backend.model.Testimonial;
import com.metropolitan.backend.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public PageResponse<Testimonial> getTestimonials(String division, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Testimonial> testimonialPage;
        long total;

        if (division != null && !division.isEmpty()) {
            testimonialPage = testimonialRepository.findByDivision(division, pageable);
            total = testimonialRepository.countByDivision(division);
        } else {
            testimonialPage = testimonialRepository.findAll(pageable);
            total = testimonialRepository.count();
        }

        return PageResponse.of(testimonialPage.getContent(), total, page, limit);
    }

    public List<Testimonial> getTestimonialsNonPaginated(String division) {
        if (division != null && !division.isEmpty()) {
            return testimonialRepository.findByDivision(division);
        }
        return testimonialRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Testimonial createTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }
}
