# User Service

사용자 정보 관리 및 FCM 토큰 관리를 담당하는 서비스.

## 기술 스택

| 항목          | 내용 |
|-------------|------|
| Language    | TypeScript (NestJS) |
| DB          | MySQL (TypeORM) |
| Token Store | Redis |
| 통신          | REST API (인바운드), gRPC Server (타 서비스 요청 수신) |
| 서비스 등록      | Netflix Eureka Client |

## 주요 기능

### REST API
- `POST /user` — 유저 생성
- `POST /user/fcm` — FCM 토큰 등록
- `GET /user/today` — 오늘 방문 유저 조회
- `GET /user/:id` — 특정 유저 조회
- `GET /user/verify/:id` — 유저 인증 상태 확인

### gRPC Server
- 타 서비스(Auth, Notification)로부터 유저 정보 조회 요청 수신
- FCM 토큰 조회 제공 (Notification 서비스 연동)

### 내부 기능
- 유저 통계 조회 (UserStatsService)
- 푸시 알림 전송 (UserNotificationService, Firebase FCM)
