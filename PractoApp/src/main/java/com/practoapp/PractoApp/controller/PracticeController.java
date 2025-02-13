package com.practoapp.PractoApp.controller;

import com.practoapp.PractoApp.entity.Practice;
import com.practoapp.PractoApp.service.PracticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practices")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class PracticeController {

    private final PracticeService practiceService;

    // Create a new practice
    @PostMapping
    public ResponseEntity<Practice> createPractice(@RequestBody Practice practice) {
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

    // Update an existing practice
    @PutMapping("/{id}")
    public ResponseEntity<Practice> updatePractice(@PathVariable Long id, @RequestBody Practice practiceDetails) {
        Practice updatedPractice = practiceService.updatePractice(id, practiceDetails);
        return ResponseEntity.ok(updatedPractice);
    }

    // Delete a practice
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePractice(@PathVariable Long id) {
        practiceService.deletePractice(id);
        return ResponseEntity.noContent().build();
    }
}
