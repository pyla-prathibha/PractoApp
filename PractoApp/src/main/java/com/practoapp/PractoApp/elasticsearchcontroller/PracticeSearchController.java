package com.practoapp.PractoApp.elasticsearchcontroller;

import com.practoapp.PractoApp.elasticsearchservice.PracticeSearchService;
import com.practoapp.PractoApp.elsaticseachindex.PracticeIndex;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/search")
public class PracticeSearchController {

    private final PracticeSearchService practiceSearchService;

    public PracticeSearchController(PracticeSearchService practiceSearchService) {
        this.practiceSearchService = practiceSearchService;
    }

    /**
     * Endpoint to search for practices using a single query string.
     * Example: GET /search/practices?query=Sun
     *
     * @param query the search string that will be matched against both the practice name and specialties
     * @return a list of matching practices
     */
    @GetMapping("/practices")
    public List<PracticeIndex> searchPractices(@RequestParam String query) {
        return practiceSearchService.searchPractices(query);
    }
}
