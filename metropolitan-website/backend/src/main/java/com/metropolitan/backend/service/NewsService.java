package com.metropolitan.backend.service;

import com.metropolitan.backend.dto.PageResponse;
import com.metropolitan.backend.model.News;
import com.metropolitan.backend.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;

    public PageResponse<News> getNews(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "date"));

        Page<News> newsPage = newsRepository.findAll(pageable);
        long total = newsRepository.count();

        return PageResponse.of(newsPage.getContent(), total, page, limit);
    }

    public Optional<News> getNewsItem(Long id) {
        return newsRepository.findById(id);
    }

    public News createNews(News news) {
        return newsRepository.save(news);
    }
}
