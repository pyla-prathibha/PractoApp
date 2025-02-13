package com.practoapp.PractoApp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "practices")
public class Practice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "practice_id")
    private Long practiceId;

    @Column(name = "practice_name", nullable = false)
    private String practiceName;

    // Many-to-Many relationship with Speciality (from spec_table)
    @ManyToMany
    @JoinTable(
            name = "practice_speciality",
            joinColumns = @JoinColumn(name = "practice_id"),
            inverseJoinColumns = @JoinColumn(name = "speciality_id")
    )
    private List<Speciality> specialties;

    @Column(name = "contact_no", nullable = false)
    private String contactNo;

    @Column(nullable = false)
    private String email;

    @Column(length = 2000)
    private String address;

    private String city;
    private String state;
    private String openTime;
    private String closeTime;
    private String website;

    // Each practice can have only one tag (dropdown selection)
    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
