package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.entity.Practice;
import com.practoapp.PractoApp.repository.PracticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PracticeService {

    private final PracticeRepository practiceRepository;

    @Transactional
    public Practice savePractice(Practice practice) {
        return practiceRepository.save(practice);
    }

    public Optional<Practice> getPracticeById(Long id) {
        return practiceRepository.findById(id);
    }

    public List<Practice> getAllPractices() {
        return practiceRepository.findAll();
    }

    @Transactional
    public Practice updatePractice(Long id, Practice practiceDetails) {
        Practice practice = practiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Practice not found with id: " + id));
        // Update fields
        practice.setPracticeName(practiceDetails.getPracticeName());
        practice.setSpecialties(practiceDetails.getSpecialties());
        practice.setContactNo(practiceDetails.getContactNo());
        practice.setEmail(practiceDetails.getEmail());
        practice.setAddress(practiceDetails.getAddress());
        practice.setCity(practiceDetails.getCity());
        practice.setState(practiceDetails.getState());
        practice.setOpenTime(practiceDetails.getOpenTime());
        practice.setCloseTime(practiceDetails.getCloseTime());
        practice.setWebsite(practiceDetails.getWebsite());
        practice.setTag(practiceDetails.getTag());
        return practiceRepository.save(practice);
    }

    @Transactional
    public void deletePractice(Long id) {
        practiceRepository.deleteById(id);
    }
}
