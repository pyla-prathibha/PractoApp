package com.practoapp.PractoApp.elasticsearchservice;

import com.practoapp.PractoApp.dto.PracticeWithDoctorsDto;
import com.practoapp.PractoApp.elsaticseachindex.PracticeIndex;
import com.practoapp.PractoApp.entity.Doctor;
import com.practoapp.PractoApp.repository.DoctorRepository;
import com.practoapp.PractoApp.repository.PracticeSearchRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PracticeSearchService {

    private final PracticeSearchRepository practiceSearchRepository;
    private final DoctorRepository doctorRepository;

    public PracticeSearchService(PracticeSearchRepository practiceSearchRepository,
                                 DoctorRepository doctorRepository) {
        this.practiceSearchRepository = practiceSearchRepository;
        this.doctorRepository = doctorRepository;
    }

//    /**
//     * Searches practices by a single query that is matched against both practice name and specialties.
//     *
//     * @param query the search string
//     * @return a list of matching PracticeIndex objects
//     */
//    public List<PracticeIndex> searchPractices(String query) {
//        // Here we search both in the practiceName and specialties fields.
//        return practiceSearchRepository.findByPracticeNameContainingIgnoreCaseOrSpecialtiesContainingIgnoreCase(query, query);
//    }

    /**
     * Searches for practices using a single query string that is matched against both the practice name and specialties.
     * For each matching practice, also fetch the associated doctors from the database.
     *
     * @param query the search query
     * @return a list of PracticeWithDoctorsDto objects
     */
    public List<PracticeWithDoctorsDto> searchPractices(String query) {
        // Example: search both in practiceName and specialties using a combined repository method.
        List<PracticeIndex> practiceIndexes = practiceSearchRepository
                .findByPracticeNameContainingIgnoreCaseOrSpecialtiesContainingIgnoreCase(query, query);

        return practiceIndexes.stream().map(practiceIndex -> {
            // Convert the practice index id (String) back to Long.
            Long practiceId = Long.valueOf(practiceIndex.getId());
            // Retrieve doctors for this practice.
            List<Doctor> doctors = doctorRepository.findDoctorsByPracticeId(practiceId);
            // Build the DTO.
            PracticeWithDoctorsDto dto = new PracticeWithDoctorsDto();
            dto.setPractice(practiceIndex);
            dto.setDoctors(doctors);
            return dto;
        }).collect(Collectors.toList());
    }
}
