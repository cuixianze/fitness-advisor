package com.FitnessAdvisor.FitAdvisor.Web.dto;

import java.time.LocalDateTime;
import java.util.List;

public record SurveyItemResponse(
        Long id,
        String userId,
        String experienceLevel,
        List<String> goals,
        List<String> availableDays,
        List<String> injuriesOrLimitations,
        String preferredEnvironment,
        LocalDateTime createdAt
) {}


