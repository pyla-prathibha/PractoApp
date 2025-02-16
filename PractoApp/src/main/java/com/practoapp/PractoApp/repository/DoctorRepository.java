package com.practoapp.PractoApp.repository;

import com.practoapp.PractoApp.entity.Doctor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("SELECT d FROM Doctor d JOIN DocPractice dp ON d.docId = dp.doctor.docId WHERE dp.practice.practiceId = :practiceId")
    List<Doctor> findDoctorsByPracticeId(@Param("practiceId") Long practiceId);
}
//    // Method to find doctors by name (partial search)
//    List<Doctor> findByDocNameContainingIgnoreCase(String name);
//
//    // Custom query to find doctors by specialty
//    List<Doctor> findBySpecialties_SpecNameContainingIgnoreCase(String specialty);
//
//    // Combining both name and specialty search
//    List<Doctor> findByDocNameContainingIgnoreCaseAndSpecialties_SpecNameContainingIgnoreCase(String name, String specialty);

