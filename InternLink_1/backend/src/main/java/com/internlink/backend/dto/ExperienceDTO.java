package com.internlink.backend.dto;

import lombok.Data;

@Data
public class ExperienceDTO {
    private String companyName;
    private String position;
    private String startDate;
    private String endDate;
    private String responsibilities;
    private String keyAchievements;
    private Boolean workHereNow;
}
