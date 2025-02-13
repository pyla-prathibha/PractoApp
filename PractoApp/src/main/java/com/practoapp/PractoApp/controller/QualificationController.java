package com.practoapp.PractoApp.controller;

import com.practoapp.PractoApp.entity.Qualification;
import com.practoapp.PractoApp.service.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/qualifications")
//@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class QualificationController {

    private final QualificationService qualificationService;

    @PostMapping
    public ResponseEntity<Qualification> addQualification(@RequestBody Qualification qualification) {
        Qualification createdQualification = qualificationService.addQualification(qualification);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQualification);
    }

    @GetMapping
    public ResponseEntity<List<Qualification>> getAllQualifications() {
        List<Qualification> qualifications = qualificationService.getAllQualifications();
        return ResponseEntity.ok(qualifications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Qualification> getQualificationById(@PathVariable Long id) {
        Qualification qualification = qualificationService.getQualificationById(id)
                .orElseThrow(() -> new RuntimeException("Qualification not found with id: " + id));
        return ResponseEntity.ok(qualification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Qualification> updateQualification(@PathVariable Long id, @RequestBody Qualification updatedQualification) {
        Qualification qualification = qualificationService.updateQualification(id, updatedQualification);
        return ResponseEntity.ok(qualification);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQualification(@PathVariable Long id) {
        qualificationService.deleteQualification(id);
        return ResponseEntity.noContent().build();
    }
}
