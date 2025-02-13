package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.entity.Qualification;
import com.practoapp.PractoApp.repository.QualificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QualificationService {

    private final QualificationRepository qualificationRepository;

    @Transactional
    public Qualification addQualification(Qualification qualification) {
        return qualificationRepository.save(qualification);
    }

    public List<Qualification> getAllQualifications() {
        return qualificationRepository.findAll();
    }

    public Optional<Qualification> getQualificationById(Long id) {
        return qualificationRepository.findById(id);
    }

    @Transactional
    public Qualification updateQualification(Long id, Qualification updatedQualification) {
        Qualification qualification = qualificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Qualification not found with id: " + id));
        qualification.setQualName(updatedQualification.getQualName());
        return qualificationRepository.save(qualification);
    }

    @Transactional
    public void deleteQualification(Long id) {
        qualificationRepository.deleteById(id);
    }
}
