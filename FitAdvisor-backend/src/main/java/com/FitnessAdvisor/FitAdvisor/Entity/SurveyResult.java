package com.FitnessAdvisor.FitAdvisor.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "survey_results")
public class SurveyResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String experienceLevel;
    private String goalsCsv;
    private String availableDaysCsv;
    private String limitationsCsv;
    private String preferredEnvironment;

    private LocalDateTime createdAt;

    public SurveyResult() {}

    public SurveyResult(String userId,
                        String experienceLevel,
                        String goalsCsv,
                        String availableDaysCsv,
                        String limitationsCsv,
                        String preferredEnvironment,
                        LocalDateTime createdAt) {
        this.userId = userId;
        this.experienceLevel = experienceLevel;
        this.goalsCsv = goalsCsv;
        this.availableDaysCsv = availableDaysCsv;
        this.limitationsCsv = limitationsCsv;
        this.preferredEnvironment = preferredEnvironment;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getUserId() { return userId; }
    public String getExperienceLevel() { return experienceLevel; }
    public String getGoalsCsv() { return goalsCsv; }
    public String getAvailableDaysCsv() { return availableDaysCsv; }
    public String getLimitationsCsv() { return limitationsCsv; }
    public String getPreferredEnvironment() { return preferredEnvironment; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setUserId(String userId) { this.userId = userId; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }
    public void setGoalsCsv(String goalsCsv) { this.goalsCsv = goalsCsv; }
    public void setAvailableDaysCsv(String availableDaysCsv) { this.availableDaysCsv = availableDaysCsv; }
    public void setLimitationsCsv(String limitationsCsv) { this.limitationsCsv = limitationsCsv; }
    public void setPreferredEnvironment(String preferredEnvironment) { this.preferredEnvironment = preferredEnvironment; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}


