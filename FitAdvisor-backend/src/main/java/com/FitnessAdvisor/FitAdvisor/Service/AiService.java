package com.FitnessAdvisor.FitAdvisor.Service;

import com.FitnessAdvisor.FitAdvisor.Entity.SurveyResult;
import com.FitnessAdvisor.FitAdvisor.Repo.SurveyResultRepository;
import com.FitnessAdvisor.FitAdvisor.Web.dto.AIFeedbackResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.signer.Aws4Signer;
import software.amazon.awssdk.auth.signer.params.Aws4SignerParams;
import software.amazon.awssdk.http.SdkHttpFullRequest;
import software.amazon.awssdk.http.SdkHttpMethod;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.regions.Region;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class AiService {

    private final SurveyResultRepository surveyResultRepository;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final AwsCredentialsProvider credentialsProvider;

    @Value("${aws.region:us-east-1}")
    private String region;

    public AiService(SurveyResultRepository surveyResultRepository) {
        this.surveyResultRepository = surveyResultRepository;
        this.webClient = WebClient.builder().build();
        this.objectMapper = new ObjectMapper();
        this.credentialsProvider = DefaultCredentialsProvider.builder().build();
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
            System.err.println("--- AI 피드백 생성 실패 ---");
            e.printStackTrace();
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
        String bedrockUrl = String.format("https://bedrock-runtime.%s.amazonaws.com/model/%s/invoke", region, modelId);

        ObjectNode requestBodyJson = objectMapper.createObjectNode();
        requestBodyJson.put("anthropic_version", "bedrock-2023-05-31");
        requestBodyJson.put("max_tokens", 1000);

        ArrayNode messagesArray = objectMapper.createArrayNode();
        ObjectNode userMessage = objectMapper.createObjectNode();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);
        messagesArray.add(userMessage);

        requestBodyJson.set("messages", messagesArray);

        String requestBody = objectMapper.writeValueAsString(requestBodyJson);
        
        System.out.println("--- Bedrock API 호출 시작 ---");
        System.out.println("요청 URL: " + bedrockUrl);
        System.out.println("요청 본문: " + requestBody);

        try {
            System.out.println("1. 자격 증명 불러오기...");
            AwsCredentials awsCredentials = credentialsProvider.resolveCredentials();
            System.out.println("   - 자격 증명 성공: " + awsCredentials.accessKeyId().substring(0, 4) + "...");

            System.out.println("2. 요청 서명...");
            Aws4Signer signer = Aws4Signer.create();
            
            InputStream contentStream = new ByteArrayInputStream(requestBody.getBytes(StandardCharsets.UTF_8));

            SdkHttpFullRequest.Builder requestBuilder = SdkHttpFullRequest.builder()
                    .method(SdkHttpMethod.POST)
                    .uri(URI.create(bedrockUrl))
                    .putHeader("Content-Type", "application/json")
                    .putHeader("X-Amz-Target", "AmazonBedrock.InvokeModel")
                    .putHeader("X-Amz-Bedrock-Model-Id", modelId)
                    .contentStreamProvider(() -> contentStream);

            SdkHttpFullRequest request = requestBuilder.build();
            
            Aws4SignerParams signerParams = Aws4SignerParams.builder()
                    .signingName("bedrock")
                    .signingRegion(Region.of(region))
                    .awsCredentials(awsCredentials)
                    .build();

            SdkHttpFullRequest signedRequest = signer.sign(request, signerParams);
            System.out.println("   - 요청 서명 성공");

            System.out.println("3. WebClient로 HTTP 요청 전송...");
            System.out.println("요청 헤더: " + signedRequest.headers());

            String response = webClient.post()
                    .uri(bedrockUrl)
                    .headers(headers -> {
                        signedRequest.headers().forEach(headers::put);
                    })
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            System.out.println("   - HTTP 요청 성공. 응답 수신.");
            System.out.println("--- Bedrock API 호출 종료 ---");
            System.out.println("AI 응답: " + response);

            JsonNode jsonResponse = objectMapper.readTree(response);
            
            JsonNode outputNode = jsonResponse.get("Output");
            if (outputNode != null && outputNode.has("__type")) {
                throw new Exception("Bedrock API 호출 오류: " + outputNode.get("__type").asText());
            }

            JsonNode contentNode = jsonResponse.get("content");
            
            if (contentNode == null || !contentNode.isArray() || contentNode.size() == 0) {
                throw new Exception("Bedrock 응답에 'content' 필드가 없거나 비어 있습니다: " + response);
            }
            
            JsonNode firstContentNode = contentNode.get(0);
            if (firstContentNode == null) {
                throw new Exception("Bedrock 응답의 'content' 배열이 비어 있습니다: " + response);
            }

            JsonNode textNode = firstContentNode.get("text");
            if (textNode == null) {
                throw new Exception("Bedrock 응답의 'content' 필드에 'text' 필드가 없습니다: " + response);
            }
            
            return textNode.asText();
            
        } catch (Exception e) {
            System.err.println("--- Bedrock API 호출 실패 ---");
            System.err.println("오류 메시지: " + e.getMessage());
            e.printStackTrace();
            System.err.println("----------------------------");

            throw e;
        }
    }

    private AIFeedbackResponse parseAiResponse(SurveyResult survey, String aiResponse) throws Exception {
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