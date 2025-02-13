package com.practoapp.PractoApp.controller;

import com.practoapp.PractoApp.entity.Tag;
import com.practoapp.PractoApp.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tags")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @PostMapping
    public ResponseEntity<Tag> addTag(@RequestBody Tag tag) {
        Tag createdTag = tagService.addTag(tag);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTag);
    }

    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        Tag tag = tagService.getTagById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        return ResponseEntity.ok(tag);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tag> updateTag(@PathVariable Long id, @RequestBody Tag updatedTag) {
        Tag tag = tagService.updateTag(id, updatedTag);
        return ResponseEntity.ok(tag);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }
}
