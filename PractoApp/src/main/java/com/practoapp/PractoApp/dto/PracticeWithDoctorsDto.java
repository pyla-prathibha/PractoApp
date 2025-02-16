package com.practoapp.PractoApp.dto;

import com.practoapp.PractoApp.elsaticseachindex.PracticeIndex;
import com.practoapp.PractoApp.entity.Doctor;
import lombok.Data;
import java.util.List;

@Data
public class PracticeWithDoctorsDto {
    private PracticeIndex practice;  // Practice details from Elasticsearch
    private List<Doctor> doctors;      // List of associated doctors from DB
}
