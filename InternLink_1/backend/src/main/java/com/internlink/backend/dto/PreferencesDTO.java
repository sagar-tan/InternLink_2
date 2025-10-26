package com.internlink.backend.dto;

import lombok.Data;

@Data
public class PreferencesDTO {
    private String preferredDomain;
    private String preferredLocation;
    private String preferredDuration;
    private String monthlyStipend;
}
