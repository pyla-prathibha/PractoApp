package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.entity.Practice;
import com.practoapp.PractoApp.elsaticseachindex.PracticeIndex;
import com.practoapp.PractoApp.repository.PracticeRepository;
import com.practoapp.PractoApp.repository.PracticeSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PracticeService {

    private final PracticeRepository practiceRepository;
    private final PracticeSearchRepository practiceSearchRepository; // Elasticsearch repository

    @Transactional
    public Practice savePractice(Practice practice) {
        // Save to MySQL
        Practice savedPractice = practiceRepository.save(practice);
        // Sync to Elasticsearch
        syncPracticeToElasticsearch(savedPractice);
        return savedPractice;
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
        Practice updatedPractice = practiceRepository.save(practice);
        // Sync update to Elasticsearch
        syncPracticeToElasticsearch(updatedPractice);
        return updatedPractice;
    }

    @Transactional
    public void deletePractice(Long id) {
        practiceRepository.deleteById(id);
        // Optionally, remove from Elasticsearch as well (if needed)
        // practiceSearchRepository.deleteById(String.valueOf(id));
    }

    /**
     * Helper method to convert a Practice entity into a PracticeIndex document and save it to Elasticsearch.
     *
     * @param practice the Practice entity from MySQL
     */
    private void syncPracticeToElasticsearch(Practice practice) {
        PracticeIndex practiceIndex = new PracticeIndex();

        // Use getPracticeId() instead of getId()
        practiceIndex.setId(String.valueOf(practice.getPracticeId()));
        practiceIndex.setPracticeName(practice.getPracticeName());
        practiceIndex.setContactNo(practice.getContactNo());
        practiceIndex.setEmail(practice.getEmail());
        practiceIndex.setAddress(practice.getAddress());
        practiceIndex.setCity(practice.getCity());
        practiceIndex.setState(practice.getState());
        practiceIndex.setOpenTime(practice.getOpenTime());
        practiceIndex.setCloseTime(practice.getCloseTime());
        practiceIndex.setWebsite(practice.getWebsite());

        // Convert specialties using getSpecName() from Speciality
        if (practice.getSpecialties() != null) {
            practiceIndex.setSpecialties(
                    practice.getSpecialties().stream()
                            .map(speciality -> speciality.getSpecName())
                            .collect(Collectors.toList())
            );
        }

        // Convert tag using getTagName() from Tag
        if (practice.getTag() != null) {
            practiceIndex.setTag(practice.getTag().getTagName());
        }

        // Optionally, if you have doctors, convert them as well:
        // if (practice.getDoctors() != null) {
        //     practiceIndex.setDoctors(practice.getDoctors().stream()
        //         .map(doctor -> doctor.getName())
        //         .collect(Collectors.toList()));
        // }

        practiceSearchRepository.save(practiceIndex);
    }

}
