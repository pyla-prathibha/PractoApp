package com.practoapp.PractoApp.elasticsearchservice;
import com.practoapp.PractoApp.elasticsearchrepository.DoctorSearchRepository;
import com.practoapp.PractoApp.elsaticseachindex.DoctorIndex;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorSearchService {

    private final DoctorSearchRepository doctorSearchRepository;

    public DoctorSearchService(DoctorSearchRepository doctorSearchRepository) {
        this.doctorSearchRepository = doctorSearchRepository;
    }

    public List<DoctorIndex> searchDoctors(String keyword) {
        return doctorSearchRepository.findByDocNameContainingIgnoreCaseOrSpecialtiesContainingIgnoreCase(keyword, keyword);
    }
}

