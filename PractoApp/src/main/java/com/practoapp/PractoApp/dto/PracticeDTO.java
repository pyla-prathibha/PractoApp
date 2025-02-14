package com.practoapp.PractoApp.dto;

import lombok.Data;
import java.util.List;

@Data
public class PracticeDTO {
    private String practiceName;
    private String contactNo;
    private String email;
    private String address;
    private String city;
    private String state;
    private String openTime;
    private String closeTime;
    private String website;
    private List<Long> specialties; // IDs of the specialties
    private Long tagId;             // ID of the tag
}
