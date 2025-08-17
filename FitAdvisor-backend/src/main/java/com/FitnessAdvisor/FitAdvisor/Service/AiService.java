package com.FitnessAdvisor.FitAdvisor.Service;

import com.FitnessAdvisor.FitAdvisor.Entity.SurveyResult;
import com.FitnessAdvisor.FitAdvisor.Repo.SurveyResultRepository;
import com.FitnessAdvisor.FitAdvisor.Web.dto.AIFeedbackResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.auth.signer.Aws4Signer;
import software.amazon.awssdk.auth.signer.params.Aws4SignerParams;
import software.amazon.awssdk.http.SdkHttpFullRequest;
import software.amazon.awssdk.http.SdkHttpMethod;
import software.amazon.awssdk.regions.Region;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class AiService {

    private final SurveyResultRepository surveyResultRepository;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${aws.region:us-east-1}")
    private String region;

    @Value("${aws.access-key-id:}")
    private String accessKeyId;

    @Value("${aws.secret-access-key:}")
    private String secretAccessKey;

    public AiService(SurveyResultRepository surveyResultRepository) {
        this.surveyResultRepository = surveyResultRepository;
        this.webClient = WebClient.builder().build();
        this.objectMapper = new ObjectMapper();
    }

    public AIFeedbackResponse generateFeedbackAndRoutine(String userId) {
        SurveyResult latest = surveyResultRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No survey found for user: " + userId));

        try {
            String prompt = buildPrompt(latest);
            String aiResponse = callBedrock(prompt);
            return parseAiResponse(latest, aiResponse);
        } catch (Exception e) {
            // Fallback to hardcoded response if AI call fails
            return generateFallbackResponse(latest);
        }
    }

    private String buildPrompt(SurveyResult survey) {
        return String.format("""
            당신은 전문적인 피트니스 트레이너입니다. 다음 사용자의 설문 결과를 바탕으로 개인화된 피드백과 운동 루틴을 제공해주세요.
            
            사용자 정보:
            - 경험 수준: %s
            - 목표: %s
            - 가능한 요일: %s
            - 부상/제한사항: %s
            - 선호 환경: %s
            
            다음 JSON 형식으로 응답해주세요:
            {
                "feedback": "개인화된 피드백 메시지",
                "routine": [
                    "Day 1: 운동 설명",
                    "Day 2: 운동 설명",
                    "Day 3: 운동 설명",
                    "Day 4: 운동 설명"
                ]
            }
            
            한국어로 응답하고, 부상 이력을 고려한 안전한 운동을 제안해주세요.
            """,
            survey.getExperienceLevel(),
            survey.getGoalsCsv(),
            survey.getAvailableDaysCsv(),
            survey.getLimitationsCsv(),
            survey.getPreferredEnvironment()
        );
    }

    private String callBedrock(String prompt) throws Exception {
        String modelId = "anthropic.claude-3-sonnet-20240229-v1:0";
        String bedrockUrl = String.format("https://bedrock-runtime.%s.amazonaws.com/invoke", region);
        
        String requestBody = String.format("""
            {
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1000,
                "messages": [
                    {
                        "role": "user",
                        "content": "%s"
                    }
                ]
            }
            """, prompt.replace("\"", "\\\""));

        // For now, return mock response if credentials are not configured
        if (accessKeyId.isEmpty() || secretAccessKey.isEmpty()) {
            return """
                {
                    "feedback": "현재 경험 수준과 목표를 고려한 맞춤형 피드백입니다. 부상 이력이 있으니 워밍업과 스트레칭을 충분히 하시고, 점진적으로 강도를 높여가세요.",
                    "routine": [
                        "Day 1: 상체(푸시) — 벤치프레스 3x8, 숄더프레스 3x10, 트라이셉스 익스텐션 3x12",
                        "Day 2: 하체 — 스쿼트 3x8, 루마니안 데드리프트 3x10, 레그컬 3x12",
                        "Day 3: 상체(풀) — 랫풀다운 3x10, 바벨로우 3x8, 이지바 컬 3x12",
                        "Day 4: 코어 & 컨디셔닝 — 플랭크 3x30초, 레그레이즈 3x15, 20분 인터벌"
                    ]
                }
                """;
        }

        // Implement AWS Signature v4 signing for Bedrock REST API
        try {
            AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
            Aws4Signer signer = Aws4Signer.create();
            
            SdkHttpFullRequest.Builder requestBuilder = SdkHttpFullRequest.builder()
                    .method(SdkHttpMethod.POST)
                    .uri(URI.create(bedrockUrl))
                    .putHeader("Content-Type", "application/json")
                    .putHeader("X-Amz-Target", "com.amazonaws.bedrock.runtime.model.InvokeModel")
                    .putHeader("X-Amz-Bedrock-Model-Id", modelId);

            SdkHttpFullRequest request = requestBuilder.build();
            
            Aws4SignerParams signerParams = Aws4SignerParams.builder()
                    .signingName("bedrock")
                    .signingRegion(Region.of(region))
                    .awsCredentials(awsCredentials)
                    .build();

            SdkHttpFullRequest signedRequest = signer.sign(request, signerParams);
            
            // Add the signed headers to the request
            String response = webClient.post()
                    .uri(bedrockUrl)
                    .headers(headers -> {
                        headers.putAll(signedRequest.headers());
                        headers.set("Content-Type", "application/json");
                    })
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode jsonResponse = objectMapper.readTree(response);
            return jsonResponse.get("content").get(0).get("text").asText();
            
        } catch (Exception e) {
            // Fallback to mock response if AWS call fails
            return """
                {
                    "feedback": "AWS Bedrock 호출 중 오류가 발생했습니다: %s",
                    "routine": [
                        "Day 1: 상체(푸시) — 벤치프레스 3x8, 숄더프레스 3x10, 트라이셉스 익스텐션 3x12",
                        "Day 2: 하체 — 스쿼트 3x8, 루마니안 데드리프트 3x10, 레그컬 3x12",
                        "Day 3: 상체(풀) — 랫풀다운 3x10, 바벨로우 3x8, 이지바 컬 3x12",
                        "Day 4: 코어 & 컨디셔닝 — 플랭크 3x30초, 레그레이즈 3x15, 20분 인터벌"
                    ]
                }
                """.formatted(e.getMessage());
        }
    }

    private AIFeedbackResponse parseAiResponse(SurveyResult survey, String aiResponse) throws Exception {
        // Extract JSON from AI response
        int start = aiResponse.indexOf("{");
        int end = aiResponse.lastIndexOf("}") + 1;
        if (start == -1 || end == 0) {
            throw new Exception("Invalid AI response format");
        }
        
        String jsonPart = aiResponse.substring(start, end);
        JsonNode responseJson = objectMapper.readTree(jsonPart);
        
        String feedback = responseJson.get("feedback").asText();
        List<String> routine = objectMapper.convertValue(responseJson.get("routine"), 
                objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
        
        return new AIFeedbackResponse(
                survey.getId(),
                survey.getUserId(),
                feedback,
                routine,
                LocalDateTime.now()
        );
    }

    private AIFeedbackResponse generateFallbackResponse(SurveyResult survey) {
        String feedback = "목표와 현재 경험 수준을 고려했을 때, 전신 중심의 균형 잡힌 루틴을 권장합니다. 부상 이력은 워밍업과 스트레칭으로 관리하세요.";
        List<String> routine = List.of(
                "Day 1: 상체(푸시) — 벤치프레스, 숄더프레스, 트라이셉스 익스텐션",
                "Day 2: 하체 — 스쿼트, 루마니안 데드리프트, 레그컬",
                "Day 3: 상체(풀) — 랫풀다운, 바벨로우, 이지바 컬",
                "Day 4: 코어 & 컨디셔닝 — 플랭크, 레그레이즈, 20분 인터벌"
        );

        return new AIFeedbackResponse(
                survey.getId(),
                survey.getUserId(),
                feedback,
                routine,
                LocalDateTime.now()
        );
    }
}


