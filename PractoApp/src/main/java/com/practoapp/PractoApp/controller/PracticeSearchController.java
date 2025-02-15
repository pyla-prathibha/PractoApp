//package com.practoapp.PractoApp.controller;
//
//import com.practoapp.PractoApp.elasticsearch_document.PracticeDocument;
//import com.practoapp.PractoApp.elasticsearch_service.PracticeSearchService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/search/practices")
//@RequiredArgsConstructor
//public class PracticeSearchController {
//
//    private final PracticeSearchService practiceSearchService;
//
//    @GetMapping("/name")
//    public List<PracticeDocument> searchByName(@RequestParam String name) {
//        return practiceSearchService.searchPracticesByName(name);
//    }
//
//    @GetMapping("/specialty")
//    public List<PracticeDocument> searchBySpecialty(@RequestParam String specialty) {
//        return practiceSearchService.searchPracticesBySpecialty(specialty);
//    }
//}
