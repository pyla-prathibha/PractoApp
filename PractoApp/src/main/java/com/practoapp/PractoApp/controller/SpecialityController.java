package com.practoapp.PractoApp.controller;

import com.practoapp.PractoApp.entity.Speciality;
import com.practoapp.PractoApp.service.SpecialityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/specialities")
//@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SpecialityController {

    private final SpecialityService specialityService;

    @PostMapping
    public ResponseEntity<Speciality> addSpeciality(@RequestBody Speciality speciality) {
        Speciality createdSpeciality = specialityService.addSpeciality(speciality);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSpeciality);
    }

    @GetMapping
    public ResponseEntity<List<Speciality>> getAllSpecialities() {
        List<Speciality> specialities = specialityService.getAllSpecialities();
        return ResponseEntity.ok(specialities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Speciality> getSpecialityById(@PathVariable Long id) {
        Speciality speciality = specialityService.getSpecialityById(id)
                .orElseThrow(() -> new RuntimeException("Speciality not found with id: " + id));
        return ResponseEntity.ok(speciality);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Speciality> updateSpeciality(@PathVariable Long id, @RequestBody Speciality updatedSpeciality) {
        Speciality speciality = specialityService.updateSpeciality(id, updatedSpeciality);
        return ResponseEntity.ok(speciality);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpeciality(@PathVariable Long id) {
        specialityService.deleteSpeciality(id);
        return ResponseEntity.noContent().build();
    }
}
