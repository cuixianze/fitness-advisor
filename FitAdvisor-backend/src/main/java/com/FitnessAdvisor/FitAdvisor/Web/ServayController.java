package com.FitnessAdvisor.FitAdvisor.Web;

import com.FitnessAdvisor.FitAdvisor.Entity.SurveyResult;
import com.FitnessAdvisor.FitAdvisor.Service.SurveyService;
import com.FitnessAdvisor.FitAdvisor.Web.dto.SurveyRequest;
import com.FitnessAdvisor.FitAdvisor.Web.dto.SurveyResponse;
import com.FitnessAdvisor.FitAdvisor.Web.dto.SurveyItemResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workouts")
@CrossOrigin
public class ServayController {

    private final SurveyService surveyService;

    public ServayController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public ResponseEntity<SurveyResponse> submitSurvey(@RequestBody SurveyRequest surveyRequest) {
        SurveyResult saved = surveyService.saveSurvey(surveyRequest);
        SurveyResponse response = new SurveyResponse("saved", String.valueOf(saved.getId()));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyItemResponse> getSurvey(@PathVariable Long id) {
        return ResponseEntity.ok(surveyService.getById(id));
    }

    @GetMapping
    public ResponseEntity<?> listByUser(@RequestParam(value = "userId", required = false) String userId) {
        if (userId == null || userId.isBlank()) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Missing required query param: userId"));
        }
        return ResponseEntity.ok(surveyService.listByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SurveyItemResponse> updateSurvey(@PathVariable Long id,
                                                           @RequestBody SurveyRequest surveyRequest) {
        return ResponseEntity.ok(surveyService.update(id, surveyRequest));
    }
}


