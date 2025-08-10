package com.FitnessAdvisor.FitAdvisor.Service;

import com.FitnessAdvisor.FitAdvisor.Entity.SurveyResult;
import com.FitnessAdvisor.FitAdvisor.Repo.SurveyResultRepository;
import com.FitnessAdvisor.FitAdvisor.Web.dto.AIFeedbackResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AiService {

    private final SurveyResultRepository surveyResultRepository;

    public AiService(SurveyResultRepository surveyResultRepository) {
        this.surveyResultRepository = surveyResultRepository;
    }

    public AIFeedbackResponse generateFeedbackAndRoutine(String userId) {
        SurveyResult latest = surveyResultRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No survey found for user: " + userId));

        String feedback = "목표와 현재 경험 수준을 고려했을 때, 전신 중심의 균형 잡힌 루틴을 권장합니다. 부상 이력은 워밍업과 스트레칭으로 관리하세요.";
        List<String> routine = List.of(
                "Day 1: 상체(푸시) — 벤치프레스, 숄더프레스, 트라이셉스 익스텐션",
                "Day 2: 하체 — 스쿼트, 루마니안 데드리프트, 레그컬",
                "Day 3: 상체(풀) — 랫풀다운, 바벨로우, 이지바 컬",
                "Day 4: 코어 & 컨디셔닝 — 플랭크, 레그레이즈, 20분 인터벌"
        );

        return new AIFeedbackResponse(
                latest.getId(),
                latest.getUserId(),
                feedback,
                routine,
                LocalDateTime.now()
        );
    }
}


