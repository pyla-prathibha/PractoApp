package com.practoapp.PractoApp.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doc_practice")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "pid")

public class DocPractice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid")
    private Long pid;

    // Reference to the Doctor
    @ManyToOne
    @JoinColumn(name = "doc_id", nullable = false)
    private Doctor doctor;

    // Reference to the Practice
    @ManyToOne
    @JoinColumn(name = "practice_id", nullable = false)
    private Practice practice;

    public DocPractice(Doctor doctor, Practice practice) {
        this.doctor = doctor;
        this.practice = practice;
    }
}
