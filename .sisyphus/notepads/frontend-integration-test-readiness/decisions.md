# Decisions - Frontend Integration Test Readiness

## 2026-02-06: Blocker Resolution Decision

### Decision
**Tasks 12-13 are BLOCKED by compilation failures. Cannot proceed without fixing TypeScript errors.**

### Rationale
1. **Task 12 (Integration Tests)**: Cannot create or run tests without a clean build
2. **Task 13 (Final Gate)**: All verification commands (compile, build, test, e2e) will fail

### Chosen Approach
**Option 1 - Systematic Error Fix** is recommended

### Why Option 1?
- Maintains type safety (no `// @ts-ignore`)
- Addresses root causes rather than symptoms
- Aligns with plan's "strictness" guardrail
- Reduces technical debt long-term

### Rejected Approaches
**Option 2 (Disable Strictness)**: REJECTED
- Hides real bugs
- Breaks type safety
- Creates maintenance burden

**Option 3 (Critical Path Only)**: REJECTED
- Partial fix creates inconsistent codebase
- High risk of regressions
- More complex than comprehensive fix

### Priority Order for Error Categories
1. **Critical Path Errors** (must fix for Tasks 12-13):
   - ZodError type handling
   - React Query v5 pagination API
   - ApiResponse type definitions

2. **Integration Test Scope Errors** (if limiting scope):
   - NamespaceList/PodList API types
   - Table render signatures in test target pages
   - Toast API in test target pages

3. **Remaining Pages** (fix for completeness):
   - Badge component props
   - Button size enum
   - Table render signatures in all list pages

### Next Steps Required
1. Create new plan or add tasks to address compilation errors
2. Delegate systematic error fixing in priority order
3. Verify compilation passes
4. Return to Task 12 (integration tests)
5. Complete Task 13 (final gate)
