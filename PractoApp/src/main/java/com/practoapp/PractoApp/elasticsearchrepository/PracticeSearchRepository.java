package com.practoapp.PractoApp.repository;

import com.practoapp.PractoApp.elsaticseachindex.PracticeIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface PracticeSearchRepository extends ElasticsearchRepository<PracticeIndex, String> {

    // Example: search where either the practiceName or any specialty matches the query
    List<PracticeIndex> findByPracticeNameContainingIgnoreCaseOrSpecialtiesContainingIgnoreCase(String practiceName, String specialty);
}
