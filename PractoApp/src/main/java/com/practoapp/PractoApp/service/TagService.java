package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.entity.Tag;
import com.practoapp.PractoApp.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    @Transactional
    public Tag addTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    @Transactional
    public Tag updateTag(Long id, Tag updatedTag) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        tag.setTagName(updatedTag.getTagName());
        return tagRepository.save(tag);
    }

    @Transactional
    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}
