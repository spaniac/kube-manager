# Frontend Stabilization for Backend↔Frontend API Integration Testing

## TL;DR

> **Quick Summary**: Make `apps/frontend` typecheck/build clean, align shared UI component contracts, fix API base URL/proxy/port mismatches, then add deterministic frontend integration tests (MSW + Vitest) and a Playwright E2E smoke path.
>
> **Deliverables**:
> - `apps/frontend` compiles (`npm -C apps/frontend run compile`) with 0 TS errors
> - Networking configuration is consistent for dev + tests (Vite proxy for `/api` + `/auth`, ws path strategy)
> - Playwright E2E harness is runnable + has at least 1 stable smoke spec
> - MSW-backed frontend integration tests exist for at least 1 data page + auth refresh behavior
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES (2 waves after baseline)
> **Critical Path**: Fix TS errors/contracts → fix network/port alignment → add test harness (MSW/Playwright) → add integration tests

---

## Context

### Original Request
- Backend와 frontend의 API 통합 테스트를 진행하기 전에, frontend가 전반적으로 통합 테스트를 진행하기에 문제가 없는지 확인하고 싶다.
- 그리고 발견된 모든 이슈들을 해결하기 위한 계획을 수립한다.

### Key Findings (Repo Evidence)

**TypeScript compile blockers**
- `@types/*` alias usage triggers TS6137 (“Cannot import type declaration files”) across many pages, e.g. `apps/frontend/src/pages/DeploymentList.tsx`.
  - Root cause: path prefix `@types/` is reserved in TS module resolution even when used as a Vite/TS alias.
  - Evidence: `apps/frontend/tsconfig.app.json` defines `"@types/*": ["./src/types/*"]`.

**UI component contract mismatches**
- Toast: `apps/frontend/src/components/Toast.tsx` exports `ToastProvider`, `useToast`, `ToastStyles`; no `Toast` export exists.
  - Many call sites use `Toast.show(message, type)` (36 matches across 14 files).
  - Example: `apps/frontend/src/pages/WorkloadCreate.tsx` uses `Toast.show(...)` while importing `useToast` but not using it.
- ConfirmationDialog: `apps/frontend/src/components/ConfirmationDialog.tsx` expects `isOpen`, `onClose`, `type`, but callers pass `onCancel`, `variant`.
- Table: `apps/frontend/src/components/Table.tsx` constrains `T extends Record<string, unknown>`, which rejects interfaces like `Deployment` (no index signature). Sorting uses `<`/`>` on `unknown`-typed values.
- Components index: `apps/frontend/src/components/index.ts` re-exports defaults that do not exist; LSP shows multiple `has no exported member 'default'` errors.

**Routing/layout bug that will break E2E and integration flows**
- `apps/frontend/src/router.tsx` wraps `<AppLayout />` inside `<ProtectedRoute>...</ProtectedRoute>`, but `apps/frontend/src/components/ProtectedRoute.tsx` ignores children and returns `<Outlet />`.
  - This means authenticated users may never see `AppLayout` header/sidebar even though routes exist.
  - Fix should support both patterns: render `children` if provided; otherwise render `<Outlet />`.

**Test harness drift / non-runnable e2e**
- Playwright config exists (`apps/frontend/playwright.config.ts`), but `@playwright/test` is not in `apps/frontend/package.json`.
- Playwright config assumes Vite runs on 5173 (`baseURL`/`url`), but Vite dev server is configured to use port 3000 (`apps/frontend/vite.config.ts`).
- Existing `apps/frontend/e2e/basic.spec.ts` does not match current Login UI (`apps/frontend/src/pages/Login.tsx` uses provider buttons, not email/password).

**API base URL + proxy mismatches**
- Frontend API modules hardcode `/api/v1/...` paths (e.g. `apps/frontend/src/api/pod.ts`, `apps/frontend/src/api/deployment.ts`, `apps/frontend/src/api/terminal.ts`).
- `apps/frontend/src/api/client.ts` sets `baseURL: import.meta.env.VITE_API_BASE_URL || ''`.
  - In `docker-compose.yml`, `VITE_API_BASE_URL` is set to `http://backend:8080/api/v1`, which would create double prefixes (`.../api/v1/api/v1/...`).
- Vite proxy only defines `/api` (`apps/frontend/vite.config.ts`), but auth calls are to `/auth/*` (e.g. `apps/frontend/src/contexts/AuthContext.tsx`).
- WebSocket URL for terminal uses `VITE_WS_BASE_URL` + `/api/v1/terminal/ws` (`apps/frontend/src/api/terminal.ts`).

### Metis Review (Gaps + Guardrails Applied)
- Gaps surfaced: environment URL authority (dev/docker/k8s), auth contract clarity (cookie vs bearer), websocket path/auth.
- Guardrails applied in this plan:
  - Prioritize compile/typecheck correctness; do not “fix” by turning off strictness or sprinkling `any` everywhere.
  - Fixes target integration-test reliability (dev/CI) first; deployment hardening (runtime env injection for Vite) is explicitly not the primary goal.
  - E2E scope is one stable smoke flow before expanding coverage.

---

## Work Objectives

### Core Objective
Make the frontend a reliable target for backend↔frontend API integration testing by eliminating TS/build breakage, aligning contracts, and establishing deterministic test harnesses.

### Scope
- IN:
  - `apps/frontend` compile/typecheck fixes
  - Shared component contract alignment (Toast, ConfirmationDialog, Table, components index)
  - Network config alignment relevant to dev/CI integration tests (Vite proxy, ports, base URLs)
  - Add deterministic frontend integration tests (Vitest + MSW)
  - Add runnable Playwright E2E smoke path
- OUT (guardrails):
  - Large UI redesign
  - Backend feature changes
  - Full production runtime config system for Vite (can be a follow-up)

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> Every acceptance criterion is agent-executable (commands, Playwright runs, grep checks). No “manually verify”.

### Test Decision
- **Infrastructure exists**: YES (`apps/frontend/vitest.config.ts`)
- **Automated tests**: Tests-after (we will add/extend tests as we stabilize code)
- **Frameworks**:
  - Unit/Integration: Vitest + React Testing Library
  - E2E smoke: Playwright
  - Network mocking (determinism): MSW (Node integration)

### Global Verification Commands (used repeatedly)

```bash
# Frontend compile/typecheck (strict)
npm -C apps/frontend run compile

# Build (tsc -b + vite build)
npm -C apps/frontend run build

# Unit/component tests (single-run)
npm -C apps/frontend run test:run
```

---

## Execution Strategy

### Parallel Execution Waves

Wave 0 (Baseline, sequential):
- Task 1

Wave 1 (Typecheck unblockers):
- Task 2, 3, 4, 5, 6, 7 (some can parallelize but expect merge conflicts)

Wave 2 (Network + harness):
- Task 8, 9, 10, 11

Wave 3 (Integration tests + final gate):
- Task 12, 13

Critical Path: 2 → 4 → 6 → 8 → 9 → 10 → 12 → 13

---

## TODOs

- [x] 1. Establish a failing baseline + error ledger for `apps/frontend`

  **What to do**:
  - Create evidence directory: `mkdir -p .sisyphus/evidence`.
  - Run `npm -C apps/frontend run compile` and capture output to `.sisyphus/evidence/frontend-compile-baseline.txt`.
  - Run `npm -C apps/frontend run test:run` (expected to fail until compile fixed) and capture output to `.sisyphus/evidence/frontend-test-baseline.txt`.
  - Create a short ledger (markdown) mapping top error categories → owning area (aliases/components/table/react-query/auth).

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: none

  **References**:
  - `apps/frontend/package.json` (scripts: `compile`, `test:run`, `build`)

  **Acceptance Criteria**:
  - [ ] `.sisyphus/evidence/frontend-compile-baseline.txt` exists and contains TypeScript diagnostics
  - [ ] Ledger file exists at `.sisyphus/evidence/frontend-error-ledger.md`

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Capture baseline failures
    Tool: Bash
    Steps:
      1. Run: npm -C apps/frontend run compile
      2. Redirect stdout/stderr to: .sisyphus/evidence/frontend-compile-baseline.txt
      3. Run: npm -C apps/frontend run test:run
      4. Redirect stdout/stderr to: .sisyphus/evidence/frontend-test-baseline.txt
    Expected Result: Evidence files created for later comparison
  ```

- [x] 2. Remove reserved `@types/*` alias; replace with safe alias and update imports

  **What to do**:
  - Rename the TS/Vite alias `@types` → `@app-types` (or similar) in:
    - `apps/frontend/tsconfig.app.json`
    - `apps/frontend/vite.config.ts`
    - `apps/frontend/vitest.config.ts`
  - Replace all imports `@types/...` → `@app-types/...`.
  - Ensure no `@types/` imports remain.

  **Must NOT do**:
  - Do not disable strictness or `noUnusedLocals` to “get green”.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: none

  **References**:
  - `apps/frontend/tsconfig.app.json` (current alias)
  - `apps/frontend/vite.config.ts` (current alias)
  - `apps/frontend/vitest.config.ts` (current alias)
  - Example failing imports: `apps/frontend/src/pages/DeploymentList.tsx`, `apps/frontend/src/pages/PodList.tsx`

  **Acceptance Criteria**:
  - [ ] `grep -R "@types/" apps/frontend/src` returns 0 matches
  - [ ] `npm -C apps/frontend run compile` shows TS6137 count reduced to 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Alias rename correctness
    Tool: Bash
    Steps:
      1. Run: npm -C apps/frontend run compile
      2. Run: grep search for "@types/" under apps/frontend/src
    Expected Result: compile proceeds without TS6137; no reserved alias usage
  ```

- [x] 3. Fix `apps/frontend/src/components/index.ts` to match actual component exports

  **What to do**:
  - Update `apps/frontend/src/components/index.ts` to stop re-exporting `default` where modules have no default export.
  - Prefer re-exporting named exports (e.g. `export { Button, ButtonStyles } from './Button'`).
  - Keep exports stable for existing import styles where possible.

  **References**:
  - `apps/frontend/src/components/index.ts` (currently broken)
  - LSP error evidence (default exports missing)
  - `apps/frontend/src/components/Button.tsx`, `apps/frontend/src/components/Input.tsx`, `apps/frontend/src/components/Table.tsx`, `apps/frontend/src/components/Modal.tsx`, `apps/frontend/src/components/Select.tsx`, `apps/frontend/src/components/ConfirmationDialog.tsx`

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run compile` contains 0 instances of `has no exported member 'default'` related to `components/index.ts`

- [x] 4. Standardize Toast usage: remove `Toast.show()` calls; use `useToast().showToast({ message, type })`

  **What to do**:
  - Replace all `Toast.show(message, type)` patterns (and missing-import uses of `Toast`) with the hook:
    - `const { showToast } = useToast();`
    - `showToast({ message, type: 'success' })`
  - Remove invalid imports `import { Toast } from '@components/Toast'`.
  - Ensure `useToast` imports are actually used (avoid `noUnusedLocals`).

  **References**:
  - Toast implementation: `apps/frontend/src/components/Toast.tsx`
  - `Toast.show` occurrences (examples):
    - `apps/frontend/src/pages/DeploymentDetails.tsx`
    - `apps/frontend/src/pages/DeploymentList.tsx`
    - `apps/frontend/src/pages/WorkloadCreate.tsx`

  **Acceptance Criteria**:
  - [ ] `grep -R "Toast\\.show(" apps/frontend/src` returns 0 matches
  - [ ] `grep -R "import { Toast }" apps/frontend/src` returns 0 matches
  - [ ] `npm -C apps/frontend run compile` has 0 errors related to Toast exports/imports

- [x] 5. Align ConfirmationDialog props with usage OR update call sites consistently

  **Default approach (recommended)**:
  - Make `ConfirmationDialog` accept the prevailing call-site props with backward compatibility:
    - Support `onCancel` as alias for `onClose`
    - Support `variant` as alias for `type`
    - Make `isOpen` optional (default true) to support conditional rendering patterns

  **References**:
  - Component: `apps/frontend/src/components/ConfirmationDialog.tsx`
  - Example mismatch evidence: `apps/frontend/src/pages/DeploymentList.tsx` (LSP shows `onCancel` and `variant` not accepted)

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run compile` has 0 errors for `onCancel`/`variant`/`isOpen` mismatches

- [x] 6. Fix Table typing + sorting so strict interface types (e.g. `Deployment`) work

  **What to do**:
  - Update `apps/frontend/src/components/Table.tsx`:
    - Remove the overly strict constraint `T extends Record<string, unknown>` (it rejects interfaces without index signatures).
    - Fix sorting to handle `string | number | boolean | null | undefined` safely (type guards) and avoid comparing `unknown`.
    - Keep `Column.key` typed as `keyof T` and ensure `render` signature is compatible with common call-site patterns.
  - Update pages where Table generics are inferred incorrectly (e.g. `apps/frontend/src/pages/DeploymentList.tsx`).

  **Must NOT do**:
  - Do not add index signatures to every API type just to satisfy `Record<string, unknown>`.

  **References**:
  - Table: `apps/frontend/src/components/Table.tsx`
  - Example failing usage: `apps/frontend/src/pages/DeploymentList.tsx` (Table expects `Record<string, unknown>`)
  - Types: `apps/frontend/src/types/api.ts:Deployment`

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run compile` contains 0 errors mentioning `Column<Record<string, unknown>>` or `Record<string, unknown>[]`

- [x] 7. Update React Query mutation state usage (v5): `isLoading` → `isPending` (and related changes)

  **What to do**:
  - Replace `mutation.isLoading` with `mutation.isPending` (React Query v5).
  - Ensure loading indicators still work.

  **References**:
  - Example LSP evidence: `apps/frontend/src/pages/DeploymentList.tsx` (`isLoading` does not exist)

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run compile` has 0 errors referencing `Property 'isLoading' does not exist on type 'UseMutationResult'`

- [x] 8. Fix ProtectedRoute to correctly render layout (children) and keep outlet behavior

  **What to do**:
  - Update `apps/frontend/src/components/ProtectedRoute.tsx` so it supports BOTH router usage styles:
    - If `children` are provided: render `children` when authenticated
    - If no `children`: render `<Outlet />` when authenticated
  - Ensure unauthenticated redirect behavior remains the same.
  - Ensure `apps/frontend/src/router.tsx` works as intended with `AppLayout`.

  **References**:
  - `apps/frontend/src/components/ProtectedRoute.tsx` (currently returns `<Outlet />` only)
  - `apps/frontend/src/router.tsx` (wraps `<AppLayout />` as children)
  - `apps/frontend/src/layouts/AppLayout.tsx` (expected protected layout)

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run compile` passes
  - [ ] When authenticated in a Playwright test, visiting `/` shows header nav links (e.g. `link[name="Namespaces"]`)

- [x] 9. Fix port + proxy alignment for dev/test parity (Vite + auth + websocket)

  **What to do**:
  - Choose and enforce a single dev/test port (recommended: 5173) and align:
    - `apps/frontend/vite.config.ts` `server.port`
    - `apps/frontend/playwright.config.ts` `use.baseURL` + `webServer.url`
  - Extend Vite proxy to include `/auth` (and, if needed, websocket path proxies).
  - Unify auth refresh URL usage between:
    - `apps/frontend/src/api/client.ts` (interceptor refresh)
    - `apps/frontend/src/contexts/AuthContext.tsx` (login/refresh)
  - Decide canonical API base URL strategy:
    - Recommended for dev/CI integration tests: **proxy-first** with relative `/api/v1/...` and Vite proxy for `/api` and `/auth`.

  **References**:
  - `apps/frontend/vite.config.ts` (port=3000, proxy only `/api`)
  - `apps/frontend/playwright.config.ts` (baseURL expects 5173)
  - `apps/frontend/src/api/client.ts` (refresh uses `${VITE_API_BASE_URL || '/api'}/auth/refresh`)
  - `apps/frontend/src/contexts/AuthContext.tsx` (calls `/auth/login`, `/auth/refresh`)
  - WS: `apps/frontend/src/api/terminal.ts` (VITE_WS_BASE_URL + `/api/v1/terminal/ws`)

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run compile` passes
  - [ ] Playwright config and Vite config agree on dev server URL and port
  - [ ] `VITE_API_BASE_URL` no longer causes double-prefix when set to include `/api/v1` (enforced by docs/tests)

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Dev server proxies API + auth routes
    Tool: Bash (curl)
    Preconditions: backend running on localhost:8080; frontend dev server running
    Steps:
      1. curl -i http://localhost:5173/api/v1/cluster/health
      2. Assert: status is 200 or 401 (but NOT 404/502)
      3. curl -i http://localhost:5173/auth/refresh
      4. Assert: status is 200/401/405 (but NOT 404/502)
    Expected Result: proxy routing works for both prefixes
  ```

- [x] 10. Make Playwright E2E runnable + update smoke spec to match current Login UI

  **What to do**:
  - Add `@playwright/test` to `apps/frontend` devDependencies and add scripts (e.g. `e2e`, `e2e:ui`).
  - Update `apps/frontend/playwright.config.ts` so `webServer.command` starts the app on the expected port.
  - Replace brittle `apps/frontend/e2e/basic.spec.ts` flows:
    - Login test should click `button` with name `Sign in with Keycloak` (matches `apps/frontend/src/pages/Login.tsx`).
    - Prefer `getByRole` selectors over test IDs that depend on real cluster state.
  - For determinism in CI, mock `/auth/login` and at least one `/api/v1/...` request using Playwright routing (`page.route`) OR run backend in test mode.

  **References**:
  - Current login UI: `apps/frontend/src/pages/Login.tsx`
  - Routes: `apps/frontend/src/router.tsx` (dashboard is index at `/`)
  - Existing E2E: `apps/frontend/e2e/basic.spec.ts`
  - Playwright config: `apps/frontend/playwright.config.ts`

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run e2e` exists and exits 0
  - [ ] At least one smoke spec passes in headless mode
  - [ ] Artifacts are produced on failure (trace/screenshot) under `apps/frontend/test-results/`

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: E2E smoke - login redirect and landing page render
    Tool: Playwright
    Preconditions: frontend dev server started by Playwright webServer
    Steps:
      1. page.goto('/login')
      2. Click: button.provider-button with accessible name containing 'Sign in with Keycloak'
      3. Wait for navigation to '/' (timeout: 10s)
      4. Assert: URL path is '/' and ProtectedRoute content renders (e.g. presence of navigation)
      5. Screenshot: .sisyphus/evidence/task-9-e2e-smoke.png
    Expected Result: login flow completes (mocked or real) and app renders protected layout
  ```

- [ ] 11. Add MSW to enable deterministic frontend integration tests (Vitest)

  **What to do**:
  - Add MSW (Node) setup for Vitest:
    - Server lifecycle in `setupFiles` (Vitest already uses `src/test/setup.ts` and `src/test/vi-setup.ts`).
    - Central handler definitions for key endpoints used by pages/hooks.
  - Ensure handlers cover:
    - A happy-path API response (e.g. `/api/v1/namespaces`)
    - An error response (e.g. 500) to validate UI error states
    - Auth refresh path (401 → refresh → retry) if needed.

  **External References**:
  - MSW Node integration: https://mswjs.io/docs/integrations/node
  - MSW Quick Start: https://mswjs.io/docs/quick-start/

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run test:run` passes after MSW setup is added

- [ ] 12. Add at least 2 integration tests that prove API integration readiness (RTL + MSW)

  **What to do**:
  - Add a page-level integration test for one list page that uses react-query + Table (good candidates):
    - `apps/frontend/src/pages/NamespaceList.tsx` or `apps/frontend/src/pages/PodList.tsx`
  - Add an auth behavior test:
    - Verify that when an API call returns 401, refresh endpoint is called and the original call is retried (based on `apps/frontend/src/api/client.ts`).
  - Tests must be deterministic using MSW and must assert UI output (empty/error/loading) and toast behavior if applicable.

  **References**:
  - API client interceptor: `apps/frontend/src/api/client.ts`
  - Example pages: `apps/frontend/src/pages/NamespaceList.tsx`, `apps/frontend/src/pages/PodList.tsx`
  - Test utilities: `apps/frontend/src/test/test-utils.tsx` (if present) and `apps/frontend/src/test/setup.ts`

  **Acceptance Criteria**:
  - [ ] `npm -C apps/frontend run test:run` reports new tests and exits 0

- [ ] 13. Final gate: green compile + build + tests + E2E smoke

  **What to do**:
  - Run and capture outputs:
    - `npm -C apps/frontend run compile`
    - `npm -C apps/frontend run build`
    - `npm -C apps/frontend run test:run`
    - `npm -C apps/frontend run e2e`
  - Store final logs in `.sisyphus/evidence/`.

  **Acceptance Criteria**:
  - [ ] All commands exit code 0
  - [ ] Evidence files exist:
    - `.sisyphus/evidence/frontend-compile-final.txt`
    - `.sisyphus/evidence/frontend-build-final.txt`
    - `.sisyphus/evidence/frontend-test-final.txt`
    - `.sisyphus/evidence/frontend-e2e-final.txt`

---

## Commit Strategy

- Commit after each gate closes:
  - Gate 1: alias + components index + Toast/ConfirmationDialog/Table/react-query fixes
  - Gate 2: networking/port/proxy alignment
  - Gate 3: Playwright runnable + smoke updated
  - Gate 4: MSW + integration tests

---

## Success Criteria

### Verification Commands
```bash
npm -C apps/frontend run compile
npm -C apps/frontend run build
npm -C apps/frontend run test:run
npm -C apps/frontend run e2e
```

### Final Checklist
- [ ] No TypeScript compile errors
- [ ] No reserved `@types/*` alias usage
- [ ] Toast and ConfirmationDialog contract mismatches eliminated
- [ ] Table works with strict interface types
- [ ] Playwright E2E smoke passes and matches current UI
- [ ] Deterministic frontend integration tests exist (MSW-backed)
