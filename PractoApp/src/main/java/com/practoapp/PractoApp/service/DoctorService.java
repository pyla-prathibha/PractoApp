package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.dto.DoctorDto;
import com.practoapp.PractoApp.entity.Doctor;

import java.util.List;

public interface DoctorService {
    Doctor createDoctor(DoctorDto doctorDto);
    Doctor updateDoctor(Long id, DoctorDto doctorDto);
    // New methods for viewing doctor data
    Doctor getDoctorById(Long id);
    List<Doctor> getAllDoctors();
}