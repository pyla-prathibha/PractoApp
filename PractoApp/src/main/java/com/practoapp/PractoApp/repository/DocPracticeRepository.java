package com.practoapp.PractoApp.repository;

import com.practoapp.PractoApp.entity.DocPractice;
import com.practoapp.PractoApp.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface DocPracticeRepository extends JpaRepository<DocPractice, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM DocPractice dp WHERE dp.doctor = :doctor")
    void deleteByDoctor(@Param("doctor") Doctor doctor);
}
