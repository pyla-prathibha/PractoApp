package com.practoapp.PractoApp.elasticsearchservice;

import com.practoapp.PractoApp.elsaticseachindex.PracticeIndex;
import com.practoapp.PractoApp.repository.PracticeSearchRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PracticeSearchService {

    private final PracticeSearchRepository practiceSearchRepository;

    public PracticeSearchService(PracticeSearchRepository practiceSearchRepository) {
        this.practiceSearchRepository = practiceSearchRepository;
    }

    /**
     * Searches practices by a single query that is matched against both practice name and specialties.
     *
     * @param query the search string
     * @return a list of matching PracticeIndex objects
     */
    public List<PracticeIndex> searchPractices(String query) {
        // Here we search both in the practiceName and specialties fields.
        return practiceSearchRepository.findByPracticeNameContainingIgnoreCaseOrSpecialtiesContainingIgnoreCase(query, query);
    }
}
