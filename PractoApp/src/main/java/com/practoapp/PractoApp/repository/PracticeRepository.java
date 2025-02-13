package com.practoapp.PractoApp.repository;

import com.practoapp.PractoApp.entity.Practice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PracticeRepository extends JpaRepository<Practice, Long> {
}
