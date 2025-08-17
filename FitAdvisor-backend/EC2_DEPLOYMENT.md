# FitAdvisor EC2 배포 가이드

## 1. EC2 인스턴스 설정

### 필수 요구사항
- Java 17 이상
- Maven 3.6 이상
- AWS 자격 증명 설정

### Java 설치
```bash
sudo yum update -y
sudo yum install java-17-amazon-corretto -y
java -version
```

### Maven 설치
```bash
sudo wget https://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
sudo yum install -y apache-maven
mvn -version
```

## 2. 애플리케이션 배포

### 프로젝트 업로드
```bash
# EC2에 프로젝트 파일 업로드
git clone <your-repo-url>
cd FitAdvisor
```

### AWS 자격 증명 설정
```bash
# 방법 1: 환경 변수 설정
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1

# 방법 2: application.properties에 설정
aws.access-key-id=your_access_key
aws.secret-access-key=your_secret_key
aws.region=us-east-1
```

### 애플리케이션 실행
```bash
# 개발 모드
./mvnw spring-boot:run

# 프로덕션 모드 (백그라운드)
nohup ./mvnw spring-boot:run > app.log 2>&1 &
```

## 3. AWS Bedrock 권한 설정

### IAM 정책 예시
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeModel"
            ],
            "Resource": [
                "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0"
            ]
        }
    ]
}
```

### EC2 인스턴스 프로필 설정
1. IAM 역할 생성
2. 위의 정책 연결
3. EC2 인스턴스에 역할 연결

## 4. API 테스트

### 설문 생성
```bash
curl -X POST http://localhost:8080/api/surveys \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "u-123",
    "experienceLevel": "beginner",
    "goals": ["fat_loss", "mobility"],
    "availableDays": ["Mon", "Wed", "Fri"],
    "injuriesOrLimitations": ["knee_pain"],
    "preferredEnvironment": "gym"
  }'
```

### AI 피드백 요청
```bash
curl http://localhost:8080/api/ai/feedback?userId=u-123
```

## 5. 보안 그룹 설정

### 인바운드 규칙
- SSH (22): 개발용
- HTTP (80): 웹 접근용
- HTTPS (443): SSL 접근용

## 6. 모니터링

### 로그 확인
```bash
# 실시간 로그
tail -f app.log

# 에러 로그
grep ERROR app.log
```

### 프로세스 확인
```bash
ps aux | grep java
```

## 7. 문제 해결

### AWS Bedrock 연결 실패
1. 자격 증명 확인
2. IAM 권한 확인
3. 리전 설정 확인
4. 네트워크 연결 확인

### 메모리 부족
```bash
# JVM 힙 크기 조정
export JAVA_OPTS="-Xmx2g -Xms1g"
./mvnw spring-boot:run
```
