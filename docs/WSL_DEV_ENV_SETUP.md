# Windows/WSL 개발환경 구축 가이드

이 문서는 Windows WSL (Ubuntu) 환경에서 kube-manager 프로젝트 개발에 필요한 모든 도구를 설치하고 설정하는 방법을 안내합니다.

## 사전 요구사항

- Windows 10/11
- WSL2 Ubuntu 설치됨
- sudo 권한

## 목차

1. [SDKMAN! 설치 및 Java 21 설정](#1-sdkman-설치-및-java-21-설정)
2. [bun 설치](#2-bun-설치)
3. [opencode, oh-my-opencode 설치](#3-opencode-oh-my-opencode-설치)
4. [OAuth 인증 설정](#4-oauth-인증-설정)
5. [LSP 설치 및 설정](#5-lsp-설치-및-설정)
6. [Playwright 설치 및 설정](#6-playwright-설치-및-설정)
7. [PATH 환경변수 확인](#7-path-환경변수-확인)

---

## 1. SDKMAN! 설치 및 Java 21 설정

### 1.1 SDKMAN! 설치

```bash
# SDKMAN! 설치
curl -s "https://get.sdkman.io" | bash

# 쉘 설정 새로고침
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

### 1.2 PATH 확인 및 설정

```bash
# SDKMAN! PATH 확인
echo $PATH | grep sdkman

# PATH에 없다면 쉘 설정 파일에 추가
echo 'export PATH="$HOME/.sdkman/bin:$PATH"' >> ~/.bashrc

# 설정 적용
source ~/.bashrc
```

### 1.3 eclipse-temurin 21 설치

```bash
# 최신 SDKMAN! 버전 업데이트
sdk selfupdate

# eclipse-temurin 21 설치
sdk install java 21.0.6-tem

# 기본 Java 버전으로 설정
sdk default java 21.0.6-tem

# 설치 확인
java -version
javac -version
```

**예상 출력:**
```
openjdk version "21.0.6" 2025-01-21 LTS
OpenJDK Runtime Environment Temurin-21.0.6+7 (build 21.0.6+7-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.6+7 (build 21.0.6+7-LTS, mixed mode)
```

### 1.4 JAVA_HOME 설정

```bash
# JAVA_HOME 자동 설정 확인
echo $JAVA_HOME

# ~/.bashrc에 JAVA_HOME 추가 (SDKMAN!이 자동으로 설정하지만 확인)
echo 'export JAVA_HOME="$HOME/.sdkman/candidates/java/current"' >> ~/.bashrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.bashrc

# 설정 적용
source ~/.bashrc

# 확인
echo $JAVA_HOME
which java
```

---

## 2. bun 설치

### 2.1 bun 설치

```bash
# bun 설치 스크립트
curl -fsSL https://bun.sh/install | bash
```

### 2.2 PATH 확인 및 설정

```bash
# bun PATH 확인
echo $PATH | grep bun

# PATH에 없다면 쉘 설정 파일에 추가
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc

# 설정 적용
source ~/.bashrc

# 설치 확인
bun --version
```

**예상 출력:**
```
1.x.x
```

### 2.3 bun 유틸리티 위치 확인

```bash
# bun 설치된 위치 확인
which bun
which bunx

# bun 관련 심볼릭 링크 확인
ls -la ~/.bun/bin/
```

---

## 3. opencode, oh-my-opencode 설치

### 3.1 bun을 사용한 opencode 설치

```bash
# bunx로 opencode 설치
bun install --global opencode

# 설치 확인
which opencode
opencode --version
```

### 3.2 oh-my-opencode 설치

```bash
# opencode 설치 후 oh-my-opencode 설치
bun install --global oh-my-opencode

# 설치 확인
which oh-my-opencode
oh-my-opencode --version
```

### 3.3 PATH 확인

```bash
# opencode, oh-my-opencode PATH 확인
echo $PATH | grep bun
which opencode
which oh-my-opencode

# 모두 ~/.bun/bin에 설치되어 있어야 함
```

### 3.4 opencode 설정 파일 초기화

```bash
# opencode 설정 디렉토리 확인
ls -la ~/.config/opencode 2>/dev/null || echo "설정 디렉토리가 아직 생성되지 않음"

# 설정 파일이 없다면 초기화
opencode init
```

---

## 4. OAuth 인증 설정

### 4.1 opencode-openai-codex-auth로 OpenAI 인증

```bash
# OpenAI Codex 인증
bun install --global opencode-openai-codex-auth
opencode-openai-codex-auth login
```

**인증 절차:**
1. 명령어 실행 후 터미널에 표시되는 URL 열기
2. OpenAI 계정으로 로그인
3. 권한 승인
4. 터미널에 표시되는 인증 완료 메시지 확인

### 4.2 opencode-antigravity-auth로 Antigravity 인증

```bash
# Antigravity 인증
bun install --global opencode-antigravity-auth
opencode-antigravity-auth login
```

**인증 절차:**
1. 명령어 실행 후 터미널에 표시되는 URL 열기
2. Antigravity 계정으로 로그인
3. 권한 승인
4. 터미널에 표시되는 인증 완료 메시지 확인

### 4.3 opencode.json에서 provider 설정

```bash
# 설정 파일 확인
cat ~/.config/opencode/opencode.json
```

**opencode.json 구조 (예시):**

```json
{
  "auth": {
    "defaultProvider": "antigravity",
    "providers": {
      "openai-codex": {
        "enabled": true,
        "apiKey": "...",
        "token": "..."
      },
      "antigravity": {
        "enabled": true,
        "apiKey": "...",
        "token": "..."
      }
    }
  },
  "lsp": {
    ...
  }
}
```

### 4.4 기본 provider 설정

```bash
# 기본 provider를 antigravity로 설정
# opencode.json을 직접 편집하거나 CLI 명령어 사용
# (CLI 명령어가 있다면 해당 명령어 사용)

# 설정 파일 직접 편집 (nano 또는 vim 사용)
nano ~/.config/opencode/opencode.json
```

**수정할 내용:**
```json
{
  "auth": {
    "defaultProvider": "antigravity"
  }
}
```

### 4.5 인증 확인

```bash
# 인증 상태 확인
opencode auth status

# provider 목록 확인
opencode auth list
```

---

## 5. LSP 설치 및 설정

### 5.1 LSP 저장소 생성

```bash
# LSP 설치 디렉토리 생성
mkdir -p ~/workspace/lsp
cd ~/workspace/lsp
```

### 5.2 jdtls (Java LSP) 설치

```bash
cd ~/workspace/lsp

# jdtls 다운로드 (최신 버전 확인)
wget https://download.eclipse.org/jdtls/snapshots/jdt-language-server-latest.tar.gz

# 압축 해제
tar -xzf jdt-language-server-latest.tar.gz

# 압축 해제된 디렉토리 확인
ls -la

# jdtls 실행 파일 경로 확인
find . -name "jdtls" -type f

# 보통 ~/workspace/lsp/jdt-language-server-xxx/bin/jdtls 경로
```

**PATH 설정:**

```bash
# jdtls 디렉토리 구조 확인
JDTLS_DIR=$(find ~/workspace/lsp -type d -name "jdt-language-server-*" | head -n 1)
echo "jdtls 설치 경로: $JDTLS_DIR"

# 심볼릭 링크 생성 (편의성)
ln -sf $JDTLS_DIR ~/workspace/lsp/jdtls

# PATH에 추가
echo 'export PATH="$HOME/workspace/lsp/jdtls/bin:$PATH"' >> ~/.bashrc

# 설정 적용
source ~/.bashrc

# 설치 확인
jdtls --version
```

### 5.3 biome (JavaScript/TypeScript LSP) 설치

```bash
# bun을 사용한 biome 설치
bun install --global @biomejs/biome

# 설치 확인
which biome
biome --version

# bun 글로벌 설치 경로 이미 PATH에 있으므로 추가 설정 불필요
```

### 5.4 yaml-language-server 설치

```bash
# bun을 사용한 yaml-language-server 설치
bun install --global yaml-language-server

# 설치 확인
which yaml-language-server
yaml-language-server --version
```

### 5.5 marksman (Markdown LSP) 설치

```bash
# marksman 다운로드 (GitHub releases 확인)
cd ~/workspace/lsp

# 최신 버전 확인 후 다운로드 (Linux용)
wget https://github.com/artempyanykh/marksman/releases/latest/download/marksman-linux-x64

# 실행 권한 부여
chmod +x marksman-linux-x64

# 심볼릭 링크 생성
ln -sf ~/workspace/lsp/marksman-linux-x64 ~/workspace/lsp/marksman

# PATH에 추가
echo 'export PATH="$HOME/workspace/lsp:$PATH"' >> ~/.bashrc

# 설정 적용
source ~/.bashrc

# 설치 확인
which marksman
marksman version
```

### 5.6 groovy-language-server 설치

```bash
cd ~/workspace/lsp

# groovy-language-server GitHub 클론
git clone https://github.com/prominic/groovy-language-server.git

# 빌드 (Gradle이 필요한 경우)
cd groovy-language-server
./gradlew build

# 빌드된 JAR 파일 확인
ls -la build/libs/

# LSP JAR 파일 심볼릭 링크
JAR_FILE=$(find build/libs -name "*all.jar" | head -n 1)
ln -sf $(pwd)/$JAR_FILE ~/workspace/lsp/groovy-language-server-all.jar

# PATH 설정은 불필요 (JAR 파일이므로 opencode.json에서 경로 지정)
```

### 5.7 opencode.json에 LSP 설정

```bash
# 설정 파일 편집
nano ~/.config/opencode/opencode.json
```

**opencode.json LSP 설정 추가:**

```json
{
  "lsp": {
    "jdtls": {
      "command": "~/workspace/lsp/jdtls/bin/jdtls",
      "enabled": true
    },
    "biome": {
      "command": "~/.bun/bin/biome",
      "enabled": true
    },
    "yaml-ls": {
      "command": "~/.bun/bin/yaml-language-server",
      "enabled": true
    },
    "marksman": {
      "command": "~/workspace/lsp/marksman",
      "enabled": true
    },
    "groovy": {
      "command": "java",
      "args": ["-jar", "~/workspace/lsp/groovy-language-server-all.jar"],
      "enabled": true
    }
  }
}
```

---

## 6. Playwright 설치 및 설정

### 6.1 Playwright 설치

Playwright는 E2E 테스트를 위한 브라우저 자동화 도구입니다. kube-manager 프로젝트의 devDependencies에 이미 포함되어 있습니다.

```bash
# 프로젝트 frontend 디렉토리로 이동
cd /path/to/kube-manager/apps/frontend

# Playwright 설치 (bun을 사용)
bun install @playwright/test

# 또는 이미 package.json에 포함된 경우
bun install
```

### 6.2 브라우저 설치

Playwright는 테스트에 필요한 브라우저를 별도로 설치해야 합니다.

```bash
# Playwright 브라우저 설치
bunx playwright install

# 필요한 브라우저만 선택 설치 (Chromium, Firefox, WebKit)
bunx playwright install chromium
bunx playwright install firefox
bunx playwright install webkit

# 또는 모든 브라우저 한 번에 설치
bunx playwright install --with-deps
```

**참고:** `--with-deps` 옵션은 시스템 의존성도 함께 설치합니다. WSL 환경에서 권장합니다.

### 6.3 WSL 특이사항 - 디스플레이 서버 설정

WSL 환경에서 Playwright가 UI 브라우저를 실행하려면 디스플레이 서버가 필요합니다.

**옵션 1: Xvfb (Virtual Framebuffer) 사용**

```bash
# Xvfb 설치
sudo apt update
sudo apt install -y xvfb

# Xvfb로 Playwright 실행
xvfb-run bunx playwright test
```

**옵션 2: 헤드리스 모드 사용 (권장)**

```bash
# playwright.config.ts에서 이미 헤드리스 모드로 설정되어 있는지 확인
# 헤드리스 모드로 테스트 실행
bunx playwright test --headed=false
# 또는 간단히
bunx playwright test
```

**옵션 3: WSL2 + Windows X Server 연동**

WSL2에서 Windows의 X 서버(WSLg 또는 VcXsrv)를 사용하여 GUI 앱을 실행할 수 있습니다. 자세한 설정은 별도 문서 참조하세요.

### 6.4 PATH 확인 및 설정

```bash
# Playwright 실행 파일 경로 확인
which playwright

# bun 글로벌 모듈 경로 확인 (bunx)
which bunx

# Playwright CLI 버전 확인
bunx playwright --version
```

**예상 출력:**
```
Version 1.x.x
```

### 6.5 Playwright 설정 파일 확인

```bash
# playwright.config.ts 파일 확인
cat /path/to/kube-manager/apps/frontend/playwright.config.ts
```

**일반적인 playwright.config.ts 구조:**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 6.6 Playwright 설치 검증

```bash
# Playwright 버전 확인
bunx playwright --version

# 설치된 브라우저 확인
bunx playwright install --dry-run

# Playwright 도움말 확인
bunx playwright --help
```

### 6.7 E2E 테스트 실행 테스트

```bash
# 프로젝트 frontend 디렉토리로 이동
cd /path/to/kube-manager/apps/frontend

# 모든 테스트 실행 (헤드리스 모드)
bunx playwright test

# 특정 파일 테스트
bunx playwright test basic.spec.ts

# UI 모드로 테스트 실행 (디버깅용)
bunx playwright test --ui

# headed 모드로 테스트 실행 (브라우저 GUI 표시)
bunx playwright test --headed

# 테스트 코드 생성
bunx playwright codegen http://localhost:5173
```

### 6.8 WSL에서 Playwright 실행 스크립트

편의를 위해 WSL에서 Playwright를 실행하는 스크립트를 만들 수 있습니다.

```bash
# 스크립트 생성
cat > ~/playwright-test.sh << 'EOF'
#!/bin/bash
# Playwright 테스트 실행 스크립트

# 프로젝트 경로 설정
PROJECT_DIR="/path/to/kube-manager/apps/frontend"
cd "$PROJECT_DIR"

# 옵션: 디스플레이 서버 사용 여부
USE_XVFB="${USE_XVFB:-false}"

if [ "$USE_XVFB" = "true" ]; then
    echo "Running with Xvfb..."
    xvfb-run -a bunx playwright test "$@"
else
    echo "Running headless..."
    bunx playwright test "$@"
fi
EOF

# 실행 권한 부여
chmod +x ~/playwright-test.sh

# 사용 예시
~/playwright-test.sh
~/playwright-test.sh basic.spec.ts
USE_XVFB=true ~/playwright-test.sh --headed
```

### 6.9 Playwright 업데이트

```bash
# Playwright 버전 업데이트
bunx playwright install --force

# 브라우저 업데이트
bunx playwright install --with-deps

# 최신 버전 설치
bun update @playwright/test
```

### 6.10 Playwright 테스트 리포트 확인

```bash
# HTML 리포트 열기
bunx playwright show-report

# 트레이스 뷰어 열기
bunx playwright show-trace trace.zip
```

---

## 7. PATH 환경변수 확인

### 7.1 전체 PATH 확인

```bash
# 현재 PATH 확인
echo $PATH

# PATH를 한 줄씩 표시
echo $PATH | tr ':' '\n'
```

### 7.2 각 도구별 PATH 확인

```bash
# Java
echo "=== Java ==="
which java
which javac
echo "JAVA_HOME: $JAVA_HOME"

# bun
echo "=== bun ==="
which bun
which bunx

# opencode
echo "=== opencode ==="
which opencode
which oh-my-opencode

# LSP 서버들
echo "=== LSP Servers ==="
which jdtls
which biome
which yaml-language-server
which marksman

# Playwright
echo "=== Playwright ==="
which playwright
bunx playwright --version
```

### 7.3 최종 ~/.bashrc 확인

```bash
# 현재 .bashrc 내용 확인
cat ~/.bashrc

# 추가된 PATH 설정들 확인
grep "export PATH" ~/.bashrc
```

**예상 ~/.bashrc PATH 설정:**

```bash
# SDKMAN!
export PATH="$HOME/.sdkman/bin:$PATH"

# JAVA_HOME
export JAVA_HOME="$HOME/.sdkman/candidates/java/current"
export PATH="$JAVA_HOME/bin:$PATH"

# bun (Playwright는 bunx를 통해 실행됨)
export PATH="$HOME/.bun/bin:$PATH"

# LSP
export PATH="$HOME/workspace/lsp/jdtls/bin:$PATH"
export PATH="$HOME/workspace/lsp:$PATH"

# Playwright 별도 PATH 설정 불필요 (bunx를 통해 실행)
```

### 7.4 설정 적용 및 최종 확인

```bash
# 모든 설정 적용
source ~/.bashrc

# 최종 버전 확인
echo "=== 버전 확인 ==="
java -version
bun --version
opencode --version
biome --version
yaml-language-server --version
marksman version
echo "=== Playwright ==="
bunx playwright --version
```

---

## 8. 설치 검증 테스트

### 8.1 Java 프로젝트 테스트

```bash
cd /path/to/kube-manager/apps/backend
./gradlew --version
```

### 8.2 Frontend 프로젝트 테스트

```bash
cd /path/to/kube-manager/apps/frontend
bun install
bun run dev
```

### 8.3 LSP 테스트

프로젝트에서 LSP가 정상 작동하는지 확인:

- **Java 파일** (`*.java`): jdtls 자동완성 테스트
- **TypeScript 파일** (`*.ts`, `*.tsx`): biome lint 테스트
- **YAML 파일** (`*.yaml`, `*.yml`): yaml-language-server 자동완성 테스트
- **Markdown 파일** (`*.md`): marksman 자동완성 테스트
- **Gradle 파일** (`*.gradle`): groovy-language-server 테스트

### 8.4 Playwright 테스트

E2E 테스트가 정상 작동하는지 확인:

```bash
cd /path/to/kube-manager/apps/frontend

# 기본 테스트 실행
bunx playwright test

# 특정 테스트 파일 실행
bunx playwright test basic.spec.ts

# 테스트 UI 실행
bunx playwright test --ui
```

**테스트 성공 확인:**
- 모든 테스트가 통과 (PASSED)
- HTML 리포트 생성: `bunx playwright show-report`
- 테스트 커버리지 확인

---

## 9. 문제 해결

### 9.1 SDKMAN! PATH 문제

**문제:** `sdk: command not found`

**해결:**
```bash
# SDKMAN! 초기화 스크립트 실행
source "$HOME/.sdkman/bin/sdkman-init.sh"

# .bashrc에 추가
echo 'source "$HOME/.sdkman/bin/sdkman-init.sh"' >> ~/.bashrc
source ~/.bashrc
```

### 9.2 bun PATH 문제

**문제:** `bun: command not found`

**해결:**
```bash
# bun 설치 스크립트 재실행
curl -fsSL https://bun.sh/install | bash

# PATH 추가
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 9.3 LSP 서버 실행 오류

**문제:** LSP 서버를 찾을 수 없음

**해결:**
```bash
# 각 LSP 서버 경로 확인
which jdtls
which biome
which yaml-language-server
which marksman

# 경로가 틀리면 opencode.json 수정
nano ~/.config/opencode/opencode.json
```

### 9.4 jdtls jar 파일 오류

**문제:** groovy-language-server jar 파일을 찾을 수 없음

**해결:**
```bash
cd ~/workspace/lsp/groovy-language-server
./gradlew clean build

# JAR 파일 경로 확인
find build/libs -name "*all.jar"

# 심볼릭 링크 재생성
JAR_FILE=$(find build/libs -name "*all.jar" | head -n 1)
ln -sf $(pwd)/$JAR_FILE ~/workspace/lsp/groovy-language-server-all.jar
```

### 9.5 Playwright 브라우저 설치 실패

**문제:** `ERROR: Executables don't exist at ...`

**해결:**
```bash
# 브라우저 재설치
bunx playwright install --force --with-deps

# 시스템 의존성 업데이트
sudo apt update
sudo apt install -y libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2
```

### 9.6 Playwright 디스플레이 오류 (WSL)

**문제:** `Error: Failed to launch browser! spawn xvfb-run ENOENT` 또는 디스플레이 관련 오류

**해결 1: 헤드리스 모드 사용**
```bash
# 기본적으로 헤드리스 모드로 실행
bunx playwright test

# 명시적으로 헤드리스 모드 지정
bunx playwright test --headed=false
```

**해결 2: Xvfb 설치**
```bash
# Xvfb 설치
sudo apt install -y xvfb

# Xvfb로 실행
xvfb-run -a bunx playwright test
```

**해결 3: WSL2 + Windows X 서버 사용**
- Windows에서 WSLg 활성화 (Windows 11 버전 22000 이상)
- 또는 VcXsrv (X Server) 설치 및 설정

### 9.7 Playwright 테스트 타임아웃

**문제:** `Test timeout of 30000ms exceeded`

**해결:**
```bash
# playwright.config.ts에서 타임아웃 설정 확인 및 수정
# 또는 명령줄에서 타임아웃 지정
bunx playwright test --timeout=60000
```

**playwright.config.ts 수정:**
```typescript
export default defineConfig({
  timeout: 60000,  // 60초로 증가
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  // ...
});
```

---

## 10. 참고 자료

### 10.1 개발 도구

- [SDKMAN! 공식 문서](https://sdkman.io/)
- [Eclipse Temurin](https://adoptium.net/)
- [bun 공식 문서](https://bun.sh/)
- [opencode 문서](https://github.com/opencode-dev/opencode)

### 10.2 LSP 서버

- [JDTLS 문서](https://github.com/eclipse-jdtls/eclipse.jdt.ls)
- [Biome 문서](https://biomejs.dev/)
- [YAML Language Server](https://github.com/redhat-developer/yaml-language-server)
- [Marksman](https://github.com/artempyanykh/marksman)
- [Groovy Language Server](https://github.com/prominic/groovy-language-server)

### 10.3 Playwright

- [Playwright 공식 문서](https://playwright.dev/)
- [Playwright 퀵 스타트](https://playwright.dev/docs/intro)
- [Playwright 테스트 가이드](https://playwright.dev/docs/writing-tests)
- [Playwright WSL 가이드](https://playwright.dev/docs/ci#docker)
- [Playwright 브라우저 지원](https://playwright.dev/docs/browsers)
- [Playwright GitHub](https://github.com/microsoft/playwright)

### 10.4 WSL 관련

- [WSL 공식 문서](https://learn.microsoft.com/en-us/windows/wsl/)
- [WSLg (GUI 지원)](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps)
- [VcXsrv (X Server for Windows)](https://sourceforge.net/projects/vcxsrv/)
