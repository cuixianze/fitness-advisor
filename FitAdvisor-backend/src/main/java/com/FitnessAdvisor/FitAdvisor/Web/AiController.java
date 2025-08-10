package com.FitnessAdvisor.FitAdvisor.Web;

import com.FitnessAdvisor.FitAdvisor.Service.AiService;
import com.FitnessAdvisor.FitAdvisor.Web.dto.AIFeedbackResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/feedback")
    public ResponseEntity<?> getFeedback(@RequestParam("userId") String userId) {
        if (userId == null || userId.isBlank()) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Missing required query param: userId"));
        }
        AIFeedbackResponse response = aiService.generateFeedbackAndRoutine(userId);
        return ResponseEntity.ok(response);
    }
}


