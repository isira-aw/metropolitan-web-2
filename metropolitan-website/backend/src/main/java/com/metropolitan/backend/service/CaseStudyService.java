package com.metropolitan.backend.service;

import com.metropolitan.backend.dto.PageResponse;
import com.metropolitan.backend.model.CaseStudy;
import com.metropolitan.backend.repository.CaseStudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;

    public PageResponse<CaseStudy> getCaseStudies(String division, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<CaseStudy> caseStudyPage;
        long total;

        if (division != null && !division.isEmpty()) {
            caseStudyPage = caseStudyRepository.findByDivision(division, pageable);
            total = caseStudyRepository.countByDivision(division);
        } else {
            caseStudyPage = caseStudyRepository.findAll(pageable);
            total = caseStudyRepository.count();
        }

        return PageResponse.of(caseStudyPage.getContent(), total, page, limit);
    }

    public Optional<CaseStudy> getCaseStudy(Long id) {
        return caseStudyRepository.findById(id);
    }

    public CaseStudy createCaseStudy(CaseStudy caseStudy) {
        return caseStudyRepository.save(caseStudy);
    }
}
