package com.practoapp.PractoApp.entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctors")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "docId")

public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_id")
    private Long docId;

    @Column(name = "doc_name", nullable = false)
    private String docName;

    @Column(name = "doc_email", nullable = false)
    private String docEmail;

    @Column(name = "doc_phoneNo", nullable = false)
    private String docPhoneNo;

    @ManyToMany
    @JoinTable(
            name = "doctor_speciality",
            joinColumns = @JoinColumn(name = "doc_id"),
            inverseJoinColumns = @JoinColumn(name = "speciality_id")
    )
    private List<Speciality> specialties;

    @ManyToMany
    @JoinTable(
            name = "doctor_qualification",
            joinColumns = @JoinColumn(name = "doc_id"),
            inverseJoinColumns = @JoinColumn(name = "qualification_id")
    )
    private List<Qualification> qualifications;

    @Column(nullable = false)
    private int experience;

    @Column(length = 2000)
    private String bio;

    @Column(name = "consultation_fee", nullable = false)
    private double consultationFee;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    // ADD THIS: List of associated practices
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<DocPractice> docPractices;
}
