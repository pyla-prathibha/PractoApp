package com.practoapp.PractoApp.dto;

import lombok.Data;
import java.util.List;

@Data
public class DoctorDto {
    private String docName;
    private String docEmail;
    private String docPhoneNo;
    private int experience;
    private String bio;
    private double consultationFee;

    // IDs for associated entities
    private Long tagId;
    private List<Long> specialtyIds;
    private List<Long> qualificationIds;
    private List<Long> practiceIds;
}
