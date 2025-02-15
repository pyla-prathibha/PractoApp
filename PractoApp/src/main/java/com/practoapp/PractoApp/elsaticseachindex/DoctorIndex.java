package com.practoapp.PractoApp.elsaticseachindex;
import org.springframework.data.elasticsearch.annotations.Document;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Document(indexName = "doctors")
@Getter
@Setter
public class DoctorIndex {

    private String id;
    private String docName;
    private String docEmail;
    private String docPhoneNo;
    private List<String> specialties;  // Store only names of specialties
    private List<String> qualifications; // Store only qualification names
    private int experience;
    private String bio;
    private double consultationFee;
}

