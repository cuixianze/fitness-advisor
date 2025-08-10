package com.FitnessAdvisor.FitAdvisor.Web.dto;

import java.time.LocalDateTime;
import java.util.List;

public record AIFeedbackResponse(
        Long surveyId,
        String userId,
        String feedback,
        List<String> routine,
        LocalDateTime generatedAt
) {}


