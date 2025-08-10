package com.FitnessAdvisor.FitAdvisor.Repo;

import com.FitnessAdvisor.FitAdvisor.Entity.SurveyResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SurveyResultRepository extends JpaRepository<SurveyResult, Long> {
    @Query("select s from SurveyResult s where s.userId = :userId order by s.createdAt desc")
    List<SurveyResult> findByUserIdOrderByCreatedAtDesc(@Param("userId") String userId);
}


