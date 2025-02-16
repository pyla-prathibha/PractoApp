package com.practoapp.PractoApp.elsaticseachindex;

import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;
import java.util.List;

@Data
@Document(indexName = "practices")
public class PracticeIndex {
    private String id; // Typically the practice's primary key as a String
    private String practiceName;
    private String contactNo;
    private String email;
    private String address;
    private String city;
    private String state;
    private String openTime;
    private String closeTime;
    private String website;

    // List of specialties (e.g., Cardiology, Dermatology, etc.)
    private List<String> specialties;

    // Tag associated with the practice (if any)
    private String tag;

    // List of doctor names associated with the practice
    private List<String> doctors;
}
