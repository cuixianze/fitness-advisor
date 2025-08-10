package com.FitnessAdvisor.FitAdvisor.Web.dto;

import java.util.List;

public record SurveyRequest(
        String userId,
        String experienceLevel,
        List<String> goals,
        List<String> availableDays,
        List<String> injuriesOrLimitations,
        String preferredEnvironment
) {}


