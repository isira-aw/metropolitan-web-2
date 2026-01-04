package com.metropolitan.backend.controller;

import com.metropolitan.backend.dto.PageResponse;
import com.metropolitan.backend.model.News;
import com.metropolitan.backend.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public ResponseEntity<PageResponse<News>> getNews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        PageResponse<News> response = newsService.getNews(page, limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNewsItem(@PathVariable Long id) {
        return newsService.getNewsItem(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404)
                        .body(Map.of("message", "News item not found")));
    }
}
