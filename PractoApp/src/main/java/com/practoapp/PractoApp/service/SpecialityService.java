package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.entity.Speciality;
import com.practoapp.PractoApp.repository.SpecialityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpecialityService {

    private final SpecialityRepository specialityRepository;

    @Transactional
    public Speciality addSpeciality(Speciality speciality) {
        return specialityRepository.save(speciality);
    }

    public List<Speciality> getAllSpecialities() {
        return specialityRepository.findAll();
    }

    public Optional<Speciality> getSpecialityById(Long id) {
        return specialityRepository.findById(id);
    }

    @Transactional
    public Speciality updateSpeciality(Long id, Speciality updatedSpeciality) {
        Speciality speciality = specialityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Speciality not found with id: " + id));
        speciality.setSpecName(updatedSpeciality.getSpecName());
        return specialityRepository.save(speciality);
    }

    @Transactional
    public void deleteSpeciality(Long id) {
        specialityRepository.deleteById(id);
    }
}
