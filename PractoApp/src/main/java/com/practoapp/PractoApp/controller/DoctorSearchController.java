//package com.practoapp.PractoApp.controller;
//
//import com.practoapp.PractoApp.elasticsearch_document.DoctorDocument;
//import com.practoapp.PractoApp.elasticsearch_service.DoctorSearchService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/search/doctors")
//public class DoctorSearchController {
//
//    private final DoctorSearchService doctorSearchService;
//
//    @Autowired
//    public DoctorSearchController(DoctorSearchService doctorSearchService) {
//        this.doctorSearchService = doctorSearchService;
//    }
//
//    // Search doctors by name
//    @GetMapping("/name")
//    public List<DoctorDocument> searchByName(@RequestParam String name) {
//        return doctorSearchService.searchDoctorsByName(name);
//    }
//
//    // Search doctors by specialty
//    @GetMapping("/specialty")
//    public List<DoctorDocument> searchBySpecialty(@RequestParam String specialty) {
//        return doctorSearchService.searchDoctorsBySpecialty(specialty);
//    }
//}
