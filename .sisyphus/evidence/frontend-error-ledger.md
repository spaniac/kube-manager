# Frontend Baseline Error Ledger

## Compilation Errors

### TypeScript Errors (TS6137, TS2339, TS2305, TS2322)
- **Count**: 0 (using npm run compile output)

**Error Categories & Affected Files**

#### 1. Reserved `@types/*` Alias Usage (TS6137)
- **Files affected**: 20+ files
- **Root cause**: `@types/*` path prefix is reserved in TS module resolution when used as Vite/TS alias
- **Evidence**:
  - `apps/frontend/tsconfig.app.json` defines `"@types/*": ["./src/types/*"]`
  - Example files using `@types/`:
    - `apps/frontend/src/pages/DeploymentList.tsx`: `import type { Deployment } from '@types/api';`
    - `apps/frontend/src/pages/PodList.tsx`: `import type { Pod } from '@types/api';`
    - `apps/frontend/src/pages/NamespaceList.tsx`: `import type { Namespace } from '@types/api';`
    - `apps/frontend/src/pages/CreateNamespace.tsx`: `import type { Namespace } from '@types/api';`
    - `apps/frontend/src/pages/EditNamespace.tsx`: `import type { Namespace } from '@types/api';`
    - `apps/frontend/src/pages/StatefulSetList.tsx`: `import type { StatefulSet } from '@types/api';`
    - `apps/frontend/src/pages/DaemonSetList.tsx`: `import type { DaemonSet } from '@types/api';`
    - `apps/frontend/src/pages/ConfigMapList.tsx`: `import type { ConfigMap } from '@types/api';`
    - `apps/frontend/src/pages/SecretList.tsx`: `import type { Secret } from '@types/api';`
    - `apps/frontend/src/pages/ServiceList.tsx`: `import type { Service } from '@types/api';`
    - `apps/frontend/src/pages/PdbManagement.tsx`: `import type { PodDisruptionBudget } from '@types/api';`
    - `apps/frontend/src/pages/WorkloadCreate.tsx`: `import type { WorkloadCreateRequest } from '@types/api';`
    - `apps/frontend/src/pages/WorkloadUpdateStrategy.tsx`: `import type { UpdateStrategyRequest } from '@types/api';`
    - `apps/frontend/src/pages/WorkloadResources.tsx`: `import type { UpdateContainerResourcesRequest } from '@types/api';`
    - `apps/frontend/src/pages/WorkloadEnvEditor.tsx`: `import type { UpdateContainerEnvRequest } from '@types/api';`
    - `apps/frontend/src/pages/WorkloadRollback.tsx`: `import type { RollbackDeploymentRequest } from '@types/api';`
    - `pages/WorkloadClone.tsx`: `import type { CloneWorkloadRequest } from '@types/api';`
    - `apps/frontend/src/components/Terminal.tsx`: `import type { PodContainer } from '@types/api';`
- **Fix**: Rename alias `@types` → `@app-types` and update all imports

#### 2. Component Index Exports (Missing default exports)
- **Files affected**: 6 components
- **Root cause**: `apps/frontend/src/components/index.ts` re-exports `default` where modules have no default export
- **Evidence**:
  - `apps/frontend/src/components/index.ts` exports:
    - `export { default as Button, ButtonStyles } from './Button';` (Button has no default)
    - `export { default as Input, InputStyles } from './Input';` (Input has no default)
    - `export { default as Table, TableStyles } from './Table';` (Table has no default)
    - `export { default as Modal, ModalStyles } from './Modal';` (Modal has no default)
    - `export { default as Select, SelectStyles } from './Select';` (Select has no default)
- - **Fix**: Stop re-exporting `default` where not supported; use named exports

#### 3. Toast API Mismatch (Static calls to non-existent export)
- **Files affected**: 14 pages
- **Root cause**: Toast exports `ToastProvider`, `useToast`, `ToastStyles`; no `Toast` object
- **Evidence**:
  - `Toast.show(message, type)` found in 36 locations across 14 files
  - Examples:
    - `apps/frontend/src/pages/DeploymentDetails.tsx`: `Toast.show('Deployment scaled successfully', 'success')`
    - `apps/frontend/src/pages/DeploymentList.tsx`: `Toast.show('Deployment deleted successfully', 'success')`
    - `apps/frontend/src/pages/WorkloadCreate.tsx`: `Toast.show('Validation successful - workload is valid', 'success')`
    - `apps/frontend/src/pages/PdbManagement.tsx`: `Toast.show('PodDisruptionBudget created successfully', 'success')`
- **Fix**: Replace with hook `useToast().showToast({ message, type })`

#### 4. ConfirmationDialog Prop Mismatch
- **Files affected**: Multiple pages
- **Root cause**: Component expects `isOpen`, `onClose`, `type`; callers use `onCancel`, `variant`
- **Evidence**:
  - `apps/frontend/src/pages/DeploymentList.tsx`: LSP shows `onCancel`/`variant`/`isOpen` mismatches
- **Fix**: Accept prevailing props (`onCancel`, `variant`) with backward compatibility

#### 5. Table Type Constraint (Rejects strict interfaces)
- **Files affected**: 12+ pages
- **Root cause**: `T extends Record<string, unknown>` rejects interfaces like `Deployment` (no index signature)
- **Evidence**:
  - LSP errors in pages: `Type '{ ... }[]' is not assignable to type 'Column<Record<string, unknown>>'`
- **Fix**: Relax constraint or add index signatures to interfaces

#### 6. React Query v5: `isLoading` → `isPending`
- **Files affected**: 6+ pages
- **Root cause**: React Query v5 mutation state uses `isLoading`; old properties removed
- **Evidence**:
  - `apps/frontend/src/pages/DeploymentList.tsx`: `mutation.isLoading` does not exist on type
  - **Fix**: Use `mutation.isPending`

#### 7. ProtectedRoute Bug (Ignores children)
- **Files affected**: 1 component
- **Root cause**: `apps/frontend/src/components/ProtectedRoute.tsx` returns `<Outlet />` even with children
- **Evidence**:
  - Authenticated users never see AppLayout header/sidebar
  - `apps/frontend/src/router.tsx` wraps `<AppLayout />` as children
- **Fix**: Render children when provided; otherwise render `<Outlet />`

## Test Status

### Unit/Component Tests
- **Command**: `npm -C apps/frontend run test:run`
- **Result**: NOT RUN (vitest not found)
- **Expected**: Should fail until compile fixed

---
Generated: 2026-02-06T01:00:10Z
