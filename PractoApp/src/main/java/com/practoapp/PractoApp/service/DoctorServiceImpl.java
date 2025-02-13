package com.practoapp.PractoApp.service;

import com.practoapp.PractoApp.dto.DoctorDto;
import com.practoapp.PractoApp.entity.*;
import com.practoapp.PractoApp.repository.DoctorRepository;
import com.practoapp.PractoApp.repository.PracticeRepository;
import com.practoapp.PractoApp.repository.QualificationRepository;
import com.practoapp.PractoApp.repository.SpecialityRepository;
import com.practoapp.PractoApp.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PracticeRepository practiceRepository;

    @Autowired
    private SpecialityRepository specialityRepository;

    @Autowired
    private QualificationRepository qualificationRepository;

    @Autowired
    private TagRepository tagRepository;

    @Override
    @Transactional
    public Doctor createDoctor(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setDocName(doctorDto.getDocName());
        doctor.setDocEmail(doctorDto.getDocEmail());
        doctor.setDocPhoneNo(doctorDto.getDocPhoneNo());
        doctor.setExperience(doctorDto.getExperience());
        doctor.setBio(doctorDto.getBio());
        doctor.setConsultationFee(doctorDto.getConsultationFee());

        if (doctorDto.getTagId() != null) {
            Tag tag = tagRepository.findById(doctorDto.getTagId())
                    .orElseThrow(() -> new RuntimeException("Tag not found with id: " + doctorDto.getTagId()));
            doctor.setTag(tag);
        }

        if (doctorDto.getSpecialtyIds() != null && !doctorDto.getSpecialtyIds().isEmpty()) {
            List<Speciality> specialties = new ArrayList<>();
            for (Long specId : doctorDto.getSpecialtyIds()) {
                Speciality speciality = specialityRepository.findById(specId)
                        .orElseThrow(() -> new RuntimeException("Speciality not found with id: " + specId));
                specialties.add(speciality);
            }
            doctor.setSpecialties(specialties);
        }

        if (doctorDto.getQualificationIds() != null && !doctorDto.getQualificationIds().isEmpty()) {
            List<Qualification> qualifications = new ArrayList<>();
            for (Long qualId : doctorDto.getQualificationIds()) {
                Qualification qualification = qualificationRepository.findById(qualId)
                        .orElseThrow(() -> new RuntimeException("Qualification not found with id: " + qualId));
                qualifications.add(qualification);
            }
            doctor.setQualifications(qualifications);
        }

        if (doctorDto.getPracticeIds() != null && !doctorDto.getPracticeIds().isEmpty()) {
            List<DocPractice> docPractices = new ArrayList<>();
            for (Long practiceId : doctorDto.getPracticeIds()) {
                Practice practice = practiceRepository.findById(practiceId)
                        .orElseThrow(() -> new RuntimeException("Practice not found with id: " + practiceId));
                DocPractice dp = new DocPractice();
                dp.setDoctor(doctor);
                dp.setPractice(practice);
                docPractices.add(dp);
            }
            doctor.setDocPractices(docPractices);
        }

        return doctorRepository.save(doctor);
    }

    @Override
    @Transactional
    public Doctor updateDoctor(Long id, DoctorDto doctorDto) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));

        doctor.setDocName(doctorDto.getDocName());
        doctor.setDocEmail(doctorDto.getDocEmail());
        doctor.setDocPhoneNo(doctorDto.getDocPhoneNo());
        doctor.setExperience(doctorDto.getExperience());
        doctor.setBio(doctorDto.getBio());
        doctor.setConsultationFee(doctorDto.getConsultationFee());

        if (doctorDto.getTagId() != null) {
            Tag tag = tagRepository.findById(doctorDto.getTagId())
                    .orElseThrow(() -> new RuntimeException("Tag not found with id: " + doctorDto.getTagId()));
            doctor.setTag(tag);
        } else {
            doctor.setTag(null);
        }

        if (doctorDto.getSpecialtyIds() != null) {
            List<Speciality> specialties = new ArrayList<>();
            for (Long specId : doctorDto.getSpecialtyIds()) {
                Speciality speciality = specialityRepository.findById(specId)
                        .orElseThrow(() -> new RuntimeException("Speciality not found with id: " + specId));
                specialties.add(speciality);
            }
            doctor.setSpecialties(specialties);
        }

        if (doctorDto.getQualificationIds() != null) {
            List<Qualification> qualifications = new ArrayList<>();
            for (Long qualId : doctorDto.getQualificationIds()) {
                Qualification qualification = qualificationRepository.findById(qualId)
                        .orElseThrow(() -> new RuntimeException("Qualification not found with id: " + qualId));
                qualifications.add(qualification);
            }
            doctor.setQualifications(qualifications);
        }

        if (doctorDto.getPracticeIds() != null) {
            List<DocPractice> docPractices = new ArrayList<>();
            for (Long practiceId : doctorDto.getPracticeIds()) {
                Practice practice = practiceRepository.findById(practiceId)
                        .orElseThrow(() -> new RuntimeException("Practice not found with id: " + practiceId));
                DocPractice dp = new DocPractice();
                dp.setDoctor(doctor);
                dp.setPractice(practice);
                docPractices.add(dp);
            }
            doctor.setDocPractices(docPractices);
        }

        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
}
