package com.practoapp.PractoApp.repository;

import com.practoapp.PractoApp.entity.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Long> {
}
