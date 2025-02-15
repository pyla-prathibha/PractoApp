package com.practoapp.PractoApp.elasticsearchcontroller;

import com.practoapp.PractoApp.elasticsearchservice.DoctorSearchService;
import com.practoapp.PractoApp.elsaticseachindex.DoctorIndex;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/search")
public class DoctorSearchController {

    private final DoctorSearchService doctorSearchService;

    public DoctorSearchController(DoctorSearchService doctorSearchService) {
        this.doctorSearchService = doctorSearchService;
    }

    @GetMapping("/doctors")
    public List<DoctorIndex> searchDoctors(@RequestParam String query) {
        return doctorSearchService.searchDoctors(query);
    }
}

