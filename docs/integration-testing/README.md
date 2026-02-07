# K8s Manager Integration Test Guide

이 문서는 로컬 Docker Compose 기반 통합 테스트 환경 구성, 실행 방법, E2E 시나리오를 정의한다.

## 1) Docker Compose 개선 사항

수정 파일: `docker-compose.yml`

### 반영된 개선점

1. 서비스 의존성(`depends_on`) 강화
   - `backend`가 `postgres`, `keycloak`, `prometheus`의 `service_healthy`를 기다리도록 변경
   - `frontend`가 `backend`의 `service_healthy`를 기다리도록 변경

2. Healthcheck 안정성 개선
   - `prometheus`, `backend` healthcheck에서 잘못된 exec-array 형태(`|| exit 1` 미해석) 제거 후 `CMD-SHELL`로 통일
   - `backend` healthcheck 경로를 컨텍스트 경로 반영된 `/api/v1/actuator/health`로 변경
   - `keycloak` healthcheck를 단순 TCP 체크 대신 `http://localhost:8080/realms/master` HTTP 체크로 변경

3. 프론트엔드 통신 경로 보정
   - 브라우저 기준 접근 가능한 API URL 사용: `VITE_API_BASE_URL=http://localhost:8080/api/v1`
   - WebSocket base URL 추가: `VITE_WS_BASE_URL=ws://localhost:8080/api/v1`
   - 기존 `http://backend:8080` 값은 브라우저에서 DNS 해석되지 않아 통합 테스트 시 실패 가능

4. 볼륨 마운트 적용
   - 프론트엔드에 `./apps/frontend:/app` 바인드 마운트 적용
   - `frontend-node-modules` named volume 적용으로 의존성 캐시/충돌 완화
   - DB/Prometheus 데이터는 named volume으로 유지

5. Dockerfile 비수정 원칙 준수
   - 프론트엔드는 compose에서 `node:18-alpine` + `npm run dev` 방식으로 실행
   - 기존 Dockerfile을 변경하지 않고 테스트 워크플로우 유지

## 2) 전체 스택 통합 테스트 실행 방법

실행 스크립트: `scripts/run-integration-tests.sh`

### 사전 조건

- Docker + Docker Compose v2
- Java 21 (백엔드 테스트 실행용)
- Node.js 18+ (프론트 E2E 실행용)
- Keycloak realm `k8smanager`는 수동 생성/설정되어 있어야 함

### 기본 실행

```bash
./scripts/run-integration-tests.sh
```

스크립트 동작:

1. `docker compose up -d --build`로 전체 스택 시작
2. `postgres`, `keycloak`, `prometheus`, `backend`, `frontend` health 상태 대기
3. 백엔드 통합 테스트 실행 (`./gradlew test --tests '*IntegrationTest' --tests '*IT'`)
4. 프론트 E2E 실행 (`npm run e2e -- --project=chromium`)
5. 완료 후 `docker compose down -v --remove-orphans`로 정리

### 디버깅 모드 (스택 유지)

```bash
./scripts/run-integration-tests.sh --keep-stack
```

테스트 종료 후 스택을 유지하고, 수동 검증/로그 분석 후 아래로 정리:

```bash
docker compose down -v --remove-orphans
```

## 3) 통합 테스트 범위

### 3.1 Backend API 통합 테스트

- 프레임워크: Spring Boot Test (`@SpringBootTest` + `MockMvc`)
- 권장 분리:
  - `src/test/java/.../integration/*IntegrationTest.java` (실제 통합 시나리오)
  - 단위 테스트와 통합 테스트를 네이밍 규칙으로 분리
- 핵심 검증 항목:
  - DB 연결/마이그레이션(Flyway)
  - 보안 필터 체인 및 인증 실패/성공 응답
  - 모니터링 API 경로 및 응답 구조

### 3.2 Frontend E2E 테스트 (Playwright)

- 위치: `apps/frontend/e2e/`
- 설정: `apps/frontend/playwright.config.ts`
- 브라우저: Chromium 단일 프로젝트로 시작, 필요 시 cross-browser 확장

권장 파일 구조:

```text
apps/frontend/e2e/
  auth-login.spec.ts
  dashboard.spec.ts
  yaml-editor.spec.ts
  fixtures/
    test-users.ts
    test-yaml.ts
```

### 3.3 핵심 사용자 흐름 시나리오

시나리오: 로그인 -> 대시보드 진입 -> YAML 편집 -> 저장

1. 로그인
   - Keycloak 로그인 페이지 이동/인증
   - 액세스 토큰 저장 확인
2. 대시보드
   - 위젯/리소스 카드 렌더링 확인
   - 주요 API 호출 성공(HTTP 200) 확인
3. YAML 편집
   - 리소스 선택 후 에디터 값 변경
   - 유효성 검증 메시지 확인
   - Secret 인코딩/디프/포맷/undo-redo 동작 확인
4. 저장
   - 저장 API 요청 성공
   - 성공 토스트/상태 배지/갱신 타임스탬프 확인

## 4) 테스트 데이터 준비 방안

1. DB 시드
   - `postgres/init-scripts/*.sql` 기반 초기 데이터 유지
   - 사용자/역할/권한 기본값을 통합 테스트 시작 전 보장

2. 인증 데이터
   - Keycloak에 테스트 사용자 수동 생성 (예: `admin@k8smanager.local`)
   - realm/client/redirect URI 수동 검증 체크리스트 운영

3. YAML 샘플 데이터
   - 정상/오류 케이스 YAML fixture 분리
   - Secret/ConfigMap/Deployment 최소 3종 준비

4. 테스트 격리
   - 테스트마다 고유 리소스명 접미사 사용 (`-e2e-<timestamp>`)
   - 테스트 종료 시 삭제 API 호출 또는 DB 초기화

## 5) 검증 체크리스트

### 환경/인프라

- [ ] `docker compose ps` 기준 모든 서비스 `healthy` 또는 `running`
- [ ] `http://localhost:5173` 프론트 페이지 접근 가능
- [ ] `http://localhost:8080/api/v1/actuator/health` 응답 정상
- [ ] `http://localhost:8081` Keycloak 로그인 페이지 접근 가능
- [ ] `http://localhost:9090/-/healthy` Prometheus 응답 정상

### 백엔드

- [ ] 통합 테스트 클래스가 실제 컨텍스트 부팅으로 통과
- [ ] 인증 없는 보호 API 접근 시 401/403 기대값 일치
- [ ] 인증 후 핵심 API 응답 스키마 일치

### 프론트 E2E

- [ ] 로그인 성공 후 대시보드 라우팅 확인
- [ ] 대시보드 데이터 로딩 및 주요 카드 렌더링 확인
- [ ] YAML validation/diff/format/undo-redo 시나리오 통과
- [ ] 저장 성공 후 사용자 피드백(토스트/상태) 확인

## 6) 운영 팁

- CI에서는 `--keep-stack` 없이 실행하고, 실패 시 `docker compose logs`를 아티팩트로 보관
- 로컬 디버깅 시 `--keep-stack`으로 재현 속도를 높이고 Playwright trace/html report를 우선 확인
