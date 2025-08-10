package com.FitnessAdvisor.FitAdvisor.Service;

import com.FitnessAdvisor.FitAdvisor.Entity.SurveyResult;
import com.FitnessAdvisor.FitAdvisor.Repo.SurveyResultRepository;
import com.FitnessAdvisor.FitAdvisor.Web.dto.SurveyRequest;
import com.FitnessAdvisor.FitAdvisor.Web.dto.SurveyItemResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class SurveyService {

    private final SurveyResultRepository surveyResultRepository;

    public SurveyService(SurveyResultRepository surveyResultRepository) {
        this.surveyResultRepository = surveyResultRepository;
    }

    public SurveyResult saveSurvey(SurveyRequest request) {
        SurveyResult entity = new SurveyResult();
        entity.setUserId(request.userId());
        entity.setExperienceLevel(request.experienceLevel());
        entity.setGoalsCsv(joinCsv(request.goals()));
        entity.setAvailableDaysCsv(joinCsv(request.availableDays()));
        entity.setLimitationsCsv(joinCsv(request.injuriesOrLimitations()));
        entity.setPreferredEnvironment(request.preferredEnvironment());
        entity.setCreatedAt(LocalDateTime.now());
        return surveyResultRepository.save(entity);
    }

    public SurveyItemResponse getById(Long id) {
        SurveyResult s = surveyResultRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found: " + id));
        return toResponse(s);
    }

    public List<SurveyItemResponse> listByUser(String userId) {
        return surveyResultRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).toList();
    }

    public SurveyItemResponse update(Long id, SurveyRequest request) {
        SurveyResult s = surveyResultRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Survey not found: " + id));
        if (request.experienceLevel() != null) s.setExperienceLevel(request.experienceLevel());
        if (request.goals() != null) s.setGoalsCsv(joinCsv(request.goals()));
        if (request.availableDays() != null) s.setAvailableDaysCsv(joinCsv(request.availableDays()));
        if (request.injuriesOrLimitations() != null) s.setLimitationsCsv(joinCsv(request.injuriesOrLimitations()));
        if (request.preferredEnvironment() != null) s.setPreferredEnvironment(request.preferredEnvironment());
        if (request.userId() != null) s.setUserId(request.userId());
        SurveyResult saved = surveyResultRepository.save(s);
        return toResponse(saved);
    }

    private SurveyItemResponse toResponse(SurveyResult s) {
        return new SurveyItemResponse(
                s.getId(),
                s.getUserId(),
                s.getExperienceLevel(),
                splitCsv(s.getGoalsCsv()),
                splitCsv(s.getAvailableDaysCsv()),
                splitCsv(s.getLimitationsCsv()),
                s.getPreferredEnvironment(),
                s.getCreatedAt()
        );
    }

    private List<String> splitCsv(String csv) {
        if (csv == null || csv.isEmpty()) return List.of();
        return List.of(csv.split(","))
                .stream()
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    private String joinCsv(List<String> items) {
        if (items == null || items.isEmpty()) {
            return "";
        }
        return items.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.joining(","));
    }
}


