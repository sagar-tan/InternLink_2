package com.internlink.backend.dto;

import lombok.Data;

@Data
public class ParticipationDTO {
    private Boolean pmInternshipPrevious;
    private Boolean pmSkillingPrevious;
    private Boolean otherGovtScheme;
    private Boolean natsNapsTraining;
    private String pmLevelDetails;
}
