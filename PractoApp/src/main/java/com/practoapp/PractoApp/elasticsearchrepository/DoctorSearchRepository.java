package com.practoapp.PractoApp.elasticsearchrepository;
import com.practoapp.PractoApp.elsaticseachindex.DoctorIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface DoctorSearchRepository extends ElasticsearchRepository<DoctorIndex, String> {

    List<DoctorIndex> findByDocNameContainingIgnoreCaseOrSpecialtiesContainingIgnoreCase(String docName, String specialties);
}
