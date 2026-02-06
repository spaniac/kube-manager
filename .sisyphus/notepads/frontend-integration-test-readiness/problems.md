# Blocker Documentation - Frontend Integration Test Readiness

## Date: 2026-02-06

## Summary

The **frontend integration test readiness plan cannot proceed** because TypeScript compilation is failing with 200+ errors. Tasks 12 (integration tests) and 13 (final gate) require a clean build to execute.

## Blocker Details

### Primary Blocker: Compilation Failure

**Command**: `npm -C apps/frontend run compile`
**Result**: FAIL - 200+ TypeScript errors

### Error Categories

#### 1. ZodError Type Mismatches (3 errors)
**Location**: `src/utils/apiResponse.ts`
**Errors**:
- Property 'detail' does not exist on type 'ZodError'
- Property 'title' does not exist on type 'ZodError'
- Property 'message' does not exist on type 'ZodError'

**Root Cause**: ZodError type structure change or incorrect type casting

#### 2. React Query v5 API Changes (2 errors)
**Location**: `src/hooks/useApi.ts`
**Errors**:
- Expected 4 arguments, but got 1 (useApi hook)
- No overload matches query function - pageParam signature incompatible

**Root Cause**: React Query v5 changed `QueryFunction` signature for pagination:
- Old: `({ pageParam }: { pageParam?: number }) => ...`
- New: `(context: { pageParam?: unknown }) => ...`

#### 3. API Response Type Mismatches (~20 errors)
**Locations**: `src/api/cluster.ts`, `src/api/namespace.ts`, `src/api/pod.ts`, `src/api/deployment.ts`, `src/api/service.ts`, `src/api/configmap.ts`, `src/api/secret.ts`, `src/api/statefulset.ts`, `src/api/daemonset.ts`

**Errors**:
- Type missing properties from type 'Node[]' / 'Event[]' / 'Deployment[]'
- Type 'ApiResponse' not found (missing import or incorrect type name)
- Type mismatches: `undefined` not assignable to required fields

**Root Cause**:
- ApiResponse type not properly defined or imported
- API response wrappers not properly unwrapped
- Some APIs returning wrapped responses but consumers expecting direct arrays

#### 4. Badge Component Prop Changes (~15 errors)
**Locations**: Multiple page files (ClusterEvents, NamespaceList, NodeList, etc.)

**Errors**:
- Property 'children' does not exist on type 'BadgeProps'
- Property 'variant' does not exist on type 'BadgeProps'
- Property 'label' does not exist on type 'BadgeProps'

**Root Cause**: Badge component API changed - now uses different prop names

#### 5. Button Size Enum Changes (~20 errors)
**Locations**: Multiple page files
**Errors**: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'

**Root Cause**: Button size prop changed from `"small"` to `"sm"`

#### 6. Table Render Function Signature (~30 errors)
**Locations**: Multiple list pages using Table component

**Errors**:
- Type mismatch in render functions: `(value: string) => JSX.Element` vs `(value: unknown, row: T) => ReactNode`
- Type mismatch: key of imported type vs key of local type

**Root Cause**: Table component was updated in Task 6, but many consuming pages still use old render function signature

#### 7. Toast API Usage (~10 errors)
**Locations**: Various pages
**Errors**:
- Expected 1 arguments, but got 2 (showToast)
- Expected 1-2 arguments, but got 0

**Root Cause**: Incomplete migration from Task 4 - some pages still using old Toast API

#### 8. Unused Imports and Variables (~50 warnings)
**Root Cause**: Strict TS settings catching unused code after refactor

## Impact on Remaining Tasks

### Task 12: Add at least 2 integration tests
**Status**: BLOCKED
**Reason**: Cannot create integration tests without a clean build
**Dependency**: Compilation must pass first

### Task 13: Final gate (compile + build + tests + E2E)
**Status**: BLOCKED
**Reason**: All verification commands will fail
**Dependencies**:
- Compilation must pass
- Build must pass
- Tests must run
- E2E must run

## Recommended Resolution Path

### Option 1: Systematic Error Fix (Recommended)
1. Fix ZodError type handling in apiResponse.ts
2. Update useApi hook for React Query v5 pagination API
3. Fix ApiResponse type definitions and imports across all API modules
4. Update Badge component usage throughout pages
5. Update Button size prop values throughout pages
6. Update Table render function signatures in all list pages
7. Complete Toast API migration

**Estimated Effort**: Large (4-6 hours)
**Risk**: High - changes across many files

### Option 2: Temporary Disable Strictness (NOT Recommended)
Add `// @ts-ignore` or disable strict TS settings to get green build
**Risk**: Very High - hides real issues, breaks type safety

### Option 3: Focus on Critical Path Only
Fix only errors in:
1. apiResponse.ts
2. useApi.ts
3. A subset of API files for integration test scope
4. Pages used in Task 12 integration tests

**Estimated Effort**: Medium (2-3 hours)
**Risk**: Medium - partial fix, may miss regressions

## Next Steps

**IMMEDIATE ACTION REQUIRED**:
1. Choose resolution approach (Option 1 recommended)
2. Delegate systematic error fixing
3. Verify compilation passes
4. Then proceed to Task 12 (integration tests)
5. Then Task 13 (final gate)

## Notes

- Tasks 1-11 were marked complete but compilation issues remain
- Some fixes in previous tasks may have introduced new errors
- This blocker prevents any progress on Tasks 12-13
- CI environment also has memory limitations (libnspr4.so missing) for test execution

---

## Task 12 Update: 2026-02-06

### What Was Accomplished

#### Integration Test File Created
**File**: `apps/frontend/src/pages/__tests__/NamespaceList.integration.test.tsx`
**Status**: ✅ Created with proper structure

**Contents**:
- MSW server setup with handlers for `/api/v1/namespaces` endpoint
- QueryClient wrapper to provide React Query context
- ToastProvider wrapper to provide Toast context
- Basic test case: "renders without crashing"
- Proper test lifecycle hooks: `beforeEach`, `afterEach`, `afterAll`
- Mock data structure matching Namespace type

#### Package.json Fixed
**Change**: `"pretest": "gts compile"` → `"pretest": "npm run compile"`
**Status**: ✅ Fixed - now uses correct compilation command

#### Test Infrastructure Ready
- MSW handlers configured and imported
- Test structure follows Vitest + RTL patterns
- Component wrappers added (QueryClientProvider, ToastProvider)

---

### Current Blocker: 226 TypeScript Compilation Errors

**Compilation Status**: `npm -C apps/frontend run compile` returns 226 errors

**Impact on Task 12**:
- ❌ Integration tests **cannot run** - pretest script fails
- ❌ Cannot verify test implementations
- ❌ MSW mocks cannot be validated

**Critical Categories**:
1. Table render signature mismatches (~30 errors in list pages)
2. Missing/incorrect imports (@types vs @app-types)
3. Component prop changes (Badge, Button variants, etc.)
4. React Query v5 API changes
5. API response type issues
6. Auth/navigation import issues

---

### Task 12 Status Assessment

**Formal Status**: ⚠️ **PARTIALLY COMPLETE - BLOCKED**

**Completed:**
- ✅ Test file structure created
- ✅ MSW handlers implemented
- ✅ Test infrastructure ready

**Blocked:**
- ❌ Tests cannot execute (compilation errors)
- ❌ Cannot verify test functionality
- ❌ Cannot proceed to Task 13

**Root Cause**: 
Tasks 1-11 were marked complete but left significant technical debt. The plan incorrectly assumes a clean build state that does not exist.

---

### Tasks 13 Status

**Status**: ❌ **BLOCKED - Cannot Execute**

**Blocker**: All verification commands will fail:
- `npm -C apps/frontend run compile` → 226 errors
- `npm -C apps/frontend run build` → will fail
- `npm -C apps/frontend run test:run` → will fail
- `npm -C apps/frontend run e2e` → will fail

---

### Recommendations

**Option A: Continue to Task 13 (Document Failure)**
- Run all verification commands anyway
- Capture evidence in `.sisyphus/evidence/`
- Mark Task 13 as complete with known failures
- Document that 226 errors remain as technical debt
- **Pros**: Completes plan as structured, documents current state
- **Cons**: Does not actually deliver "green" build/tests

**Option B: Create Compilation Fix Task (Recommended)**
- Insert new task: "Task 11.5: Fix 226 remaining compilation errors"
- Fix all errors systematically
- Then complete Tasks 12-13 properly
- **Pros**: Delivers actual value, removes blockers
- **Cons**: Adds task to plan (7 tasks remain → 8 tasks)

**Option C: Focused Fix for Task 12 (Alternative)**
- Fix only critical path errors for integration test scope:
  - Table render signatures in NamespaceList, PodList
  - API types for namespaces, pods
  - Auth imports in test files
- Allow Task 12 tests to run
- Fix remaining 200+ errors as follow-up
- **Pros**: Unblocks Task 12, demonstrates value
- **Cons**: Partial fix, leaves debt

---

## Next Actions Required

**IMMEDIATE**: Choose approach (A, B, or C)
**THEN**: Delegate appropriate task based on chosen approach

