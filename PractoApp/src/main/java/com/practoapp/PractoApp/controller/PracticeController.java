package com.practoapp.PractoApp.controller;

import com.practoapp.PractoApp.dto.PracticeDTO;
import com.practoapp.PractoApp.entity.Practice;
import com.practoapp.PractoApp.entity.Speciality;
import com.practoapp.PractoApp.entity.Tag;
import com.practoapp.PractoApp.service.PracticeService;
import com.practoapp.PractoApp.service.SpecialityService;
import com.practoapp.PractoApp.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/practices")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class PracticeController {

    private final PracticeService practiceService;
    private final SpecialityService specialityService;
    private final TagService tagService;

    // Create a new practice using the DTO
    @PostMapping
    public ResponseEntity<Practice> createPractice(@RequestBody PracticeDTO practiceDTO) {
        Practice practice = new Practice();
        practice.setPracticeName(practiceDTO.getPracticeName());
        practice.setContactNo(practiceDTO.getContactNo());
        practice.setEmail(practiceDTO.getEmail());
        practice.setAddress(practiceDTO.getAddress());
        practice.setCity(practiceDTO.getCity());
        practice.setState(practiceDTO.getState());
        practice.setOpenTime(practiceDTO.getOpenTime());
        practice.setCloseTime(practiceDTO.getCloseTime());
        practice.setWebsite(practiceDTO.getWebsite());

        // Convert list of specialty IDs to Speciality objects
        List<Speciality> specialityObjects = practiceDTO.getSpecialties().stream()
                .map(id -> specialityService.getSpecialityById(id)
                        .orElseThrow(() -> new RuntimeException("Speciality not found with id: " + id)))
                .collect(Collectors.toList());
        practice.setSpecialties(specialityObjects);

        // Convert tagId to a Tag object
        Tag tag = tagService.getTagById(practiceDTO.getTagId())
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + practiceDTO.getTagId()));
        practice.setTag(tag);

        Practice createdPractice = practiceService.savePractice(practice);
        return ResponseEntity.ok(createdPractice);
    }

    // Retrieve all practices
    @GetMapping
    public ResponseEntity<List<Practice>> getAllPractices() {
        List<Practice> practices = practiceService.getAllPractices();
        return ResponseEntity.ok(practices);
    }

    // Retrieve a practice by ID
    @GetMapping("/{id}")
    public ResponseEntity<Practice> getPracticeById(@PathVariable Long id) {
        Practice practice = practiceService.getPracticeById(id)
                .orElseThrow(() -> new RuntimeException("Practice not found with id: " + id));
        return ResponseEntity.ok(practice);
    }

    // Update an existing practice using the DTO
    @PutMapping("/{id}")
    public ResponseEntity<Practice> updatePractice(@PathVariable Long id, @RequestBody PracticeDTO practiceDTO) {
        Practice practice = new Practice();
        practice.setPracticeName(practiceDTO.getPracticeName());
        practice.setContactNo(practiceDTO.getContactNo());
        practice.setEmail(practiceDTO.getEmail());
        practice.setAddress(practiceDTO.getAddress());
        practice.setCity(practiceDTO.getCity());
        practice.setState(practiceDTO.getState());
        practice.setOpenTime(practiceDTO.getOpenTime());
        practice.setCloseTime(practiceDTO.getCloseTime());
        practice.setWebsite(practiceDTO.getWebsite());

        List<Speciality> specialityObjects = practiceDTO.getSpecialties().stream()
                .map(specId -> specialityService.getSpecialityById(specId)
                        .orElseThrow(() -> new RuntimeException("Speciality not found with id: " + specId)))
                .collect(Collectors.toList());
        practice.setSpecialties(specialityObjects);

        Tag tag = tagService.getTagById(practiceDTO.getTagId())
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + practiceDTO.getTagId()));
        practice.setTag(tag);

        Practice updatedPractice = practiceService.updatePractice(id, practice);
        return ResponseEntity.ok(updatedPractice);
    }

    // Delete a practice
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePractice(@PathVariable Long id) {
        practiceService.deletePractice(id);
        return ResponseEntity.noContent().build();
    }
}
