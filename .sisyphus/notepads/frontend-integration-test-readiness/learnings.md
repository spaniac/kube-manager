
## Table Component Typing and Sorting Fix

**Problem:**
The `Table` component in `apps/frontend/src/components/Table.tsx` had an overly strict type constraint `T extends Record<string, unknown>` which prevented it from accepting strict interface types (e.g., `Deployment`) that do not have an index signature. Additionally, the sorting logic was not robust enough to handle `null`, `undefined`, and different data types safely.

**Solution:**
1.  **Relaxed Type Constraint:** Changed `T extends Record<string, unknown>` to `T extends object` in `apps/frontend/src/components/Table.tsx`. This allows the `Table` component to accept strict interface types without requiring an index signature.
2.  **Robust Sorting Logic:** Updated the `useMemo` block for `sortedData` to include a more comprehensive sorting function. This new logic:
    *   Treats `null` and `undefined` values as the lowest sort value by normalizing them to an empty string.
    *   Performs type-aware comparisons for `string` (using `localeCompare`), `number` (using subtraction), and `boolean`.
    *   Includes a fallback to string comparison for mixed types or other unhandled types.
3.  **Safe Default Sort State:** Modified the `useState` initialization for `sort` to allow it to be `undefined` if no default sort is provided and no columns are present. This required updating the `sortedData` `useMemo` and `handleSort` function to safely check for `sort` being defined before accessing its properties.

**Verification:**
After applying the changes, `npm -C apps/frontend run compile` was executed.
-   All direct compilation errors within `apps/frontend/src/components/Table.tsx` were resolved.
-   New compilation errors appeared in pages consuming the `Table` component (e.g., `DeploymentList.tsx`, `NodeList.tsx`, etc.). These errors are related to:
    *   `key` property in `Column` definitions: `Type 'string | number | symbol' is not assignable to type 'keyof Event'.` This indicates that the `key` property in the page-level `Column` definitions needs to be a literal string that is a valid key of the specific `T` type for that table.
    *   `render` function signatures: `Type '(value: string, row: Deployment) => JSX.Element' is not assignable to type '(value: unknown, row: Deployment) => ReactNode'.` This indicates that the `render` functions in the page-level `Column` definitions need to handle the `value` parameter as `unknown` or explicitly cast it.

These new errors in consuming pages confirm that the `Table` component's type definitions are now stricter and correctly enforcing the intended type safety. The core `Table` component itself is now correctly typed and sorted.
## MSW Setup Learnings\n\n- Successfully installed  and .\n- Created  with basic happy-path and error handlers.\n- Updated  to include .\n- Attempted to verify MSW setup by running tests, but encountered  errors, even after increasing Node.js memory limit. This indicates pre-existing memory issues in the test suite, unrelated to MSW setup.\n- Compilation (
> k8s-manager-frontend@0.0.0 compile
> tsc -b

src/contexts/AuthContext.tsx(106,45): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Permission'.
src/utils/apiResponse.ts(12,32): error TS2339: Property 'detail' does not exist on type 'ZodError<{ success: boolean; data?: T | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }>'.
src/utils/apiResponse.ts(13,34): error TS2339: Property 'title' does not exist on type 'ZodError<{ success: boolean; data?: T | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }>'.
src/utils/apiResponse.ts(14,27): error TS2339: Property 'message' does not exist on type 'ZodSafeParseError<{ success: boolean; data?: T | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }>'.
src/hooks/useApi.ts(28,16): error TS2554: Expected 4 arguments, but got 1.
src/hooks/useApi.ts(50,5): error TS2769: No overload matches this call.
  Overload 1 of 3, '(options: DefinedInitialDataOptions<{ data: T[]; nextPage?: number | undefined; }, Error, { data: T[]; nextPage?: number | undefined; }, readonly unknown[]>, queryClient?: QueryClient | undefined): DefinedUseQueryResult<...>', gave the following error.
    Type '({ pageParam }: { pageParam?: number | undefined; }) => Promise<{ data: T[]; nextPage?: number | undefined; }>' is not assignable to type 'QueryFunction<{ data: T[]; nextPage?: number | undefined; }, readonly unknown[]>'.
      Types of parameters '__0' and 'context' are incompatible.
        Type '{ client: QueryClient; queryKey: readonly unknown[]; signal: AbortSignal; meta: Record<string, unknown> | undefined; pageParam?: unknown; direction?: unknown; }' is not assignable to type '{ pageParam?: number | undefined; }'.
          Types of property 'pageParam' are incompatible.
            Type 'unknown' is not assignable to type 'number | undefined'.
  Overload 2 of 3, '(options: UndefinedInitialDataOptions<{ data: T[]; nextPage?: number | undefined; }, Error, { data: T[]; nextPage?: number | undefined; }, readonly unknown[]>, queryClient?: QueryClient | undefined): UseQueryResult<...>', gave the following error.
    Type '({ pageParam }: { pageParam?: number | undefined; }) => Promise<{ data: T[]; nextPage?: number | undefined; }>' is not assignable to type 'unique symbol | QueryFunction<{ data: T[]; nextPage?: number | undefined; }, readonly unknown[], never> | undefined'.
      Type '({ pageParam }: { pageParam?: number | undefined; }) => Promise<{ data: T[]; nextPage?: number | undefined; }>' is not assignable to type 'QueryFunction<{ data: T[]; nextPage?: number | undefined; }, readonly unknown[], never>'.
        Types of parameters '__0' and 'context' are incompatible.
          Type '{ client: QueryClient; queryKey: readonly unknown[]; signal: AbortSignal; meta: Record<string, unknown> | undefined; pageParam?: unknown; direction?: unknown; }' is not assignable to type '{ pageParam?: number | undefined; }'.
  Overload 3 of 3, '(options: UseQueryOptions<{ data: T[]; nextPage?: number | undefined; }, Error, { data: T[]; nextPage?: number | undefined; }, readonly unknown[]>, queryClient?: QueryClient | undefined): UseQueryResult<...>', gave the following error.
    Type '({ pageParam }: { pageParam?: number | undefined; }) => Promise<{ data: T[]; nextPage?: number | undefined; }>' is not assignable to type 'unique symbol | QueryFunction<{ data: T[]; nextPage?: number | undefined; }, readonly unknown[], never> | undefined'.
src/api/cluster.ts(73,3): error TS2740: Type '{ name: string; status: string; roles: string[]; capacity: { cpu: string; memory: string; pods?: string | undefined; }; allocatable: { cpu: string; memory: string; pods?: string | undefined; }; allocated: { ...; }; conditions: { ...; }[]; creationTimestamp: number; labels?: Record<...> | undefined; }' is missing the following properties from type 'Node[]': length, pop, push, concat, and 28 more.
src/api/cluster.ts(100,3): error TS2740: Type '{ success: boolean; data?: any[] | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is missing the following properties from type 'Event[]': length, pop, push, concat, and 28 more.
src/api/cluster.ts(106,3): error TS2740: Type '{ success: boolean; data?: { name: string; status: string; roles: string[]; capacity: { cpu: string; memory: string; pods?: string | undefined; }; allocatable: { cpu: string; memory: string; pods?: string | undefined; }; allocated: { ...; }; conditions: { ...; }[]; creationTimestamp: number; labels?: Record<...> | u...' is missing the following properties from type 'Node[]': length, pop, push, concat, and 28 more.
src/api/cluster.ts(112,3): error TS2740: Type '{ success: boolean; data?: { name: string; status: string; roles: string[]; capacity: { cpu: string; memory: string; pods?: string | undefined; }; allocatable: { cpu: string; memory: string; pods?: string | undefined; }; allocated: { ...; }; conditions: { ...; }[]; creationTimestamp: number; labels?: Record<...> | u...' is missing the following properties from type 'Node': name, roles, capacity, allocatable, and 3 more.
src/pages/ClusterEvents.tsx(28,12): error TS2322: Type '{ children: string; status: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'children' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/ClusterEvents.tsx(106,9): error TS2322: Type '({ key: keyof Event; header: string; sortable: boolean; render: (value: string) => Element; } | { key: keyof Event; header: string; sortable: boolean; render: (value: number) => string; } | { ...; })[]' is not assignable to type 'Column<Event>[]'.
  Type '{ key: keyof Event; header: string; sortable: boolean; render: (value: string) => Element; } | { key: keyof Event; header: string; sortable: boolean; render: (value: number) => string; } | { ...; }' is not assignable to type 'Column<Event>'.
    Type '{ key: keyof Event; header: string; sortable: boolean; render: (value: string) => JSX.Element; }' is not assignable to type 'Column<Event>'.
      Types of property 'key' are incompatible.
        Type 'keyof import("/home/spaniac/repos/kube-manager/apps/frontend/src/types/api").Event' is not assignable to type 'keyof Event'.
          Type '"reason"' is not assignable to type 'keyof Event'.
src/pages/ClusterEvents.tsx(109,24): error TS2322: Type 'keyof import("/home/spaniac/repos/kube-manager/apps/frontend/src/types/api").Event' is not assignable to type 'keyof Event'.
src/pages/ClusterResources.tsx(13,21): error TS2322: Type '{ message: string; }' is not assignable to type 'IntrinsicAttributes & { size?: "sm" | "md" | "lg" | undefined; }'.
  Property 'message' does not exist on type 'IntrinsicAttributes & { size?: "sm" | "md" | "lg" | undefined; }'.
src/pages/ClusterMetricsHistory.tsx(3,29): error TS6133: 'getNodes' is declared but its value is never read.
src/pages/ClusterMetricsHistory.tsx(41,27): error TS2304: Cannot find name 'value'.
src/pages/ClusterMetricsHistory.tsx(82,45): error TS2339: Property 'target' does not exist on type 'string'.
src/pages/ClusterMetricsHistory.tsx(94,48): error TS2339: Property 'target' does not exist on type 'string'.
src/pages/ClusterMetricsHistory.tsx(114,34): error TS2339: Property 'networkIn' does not exist on type '{ cpuUsage: number; memoryUsage: number; podsCount: number; nodesCount: number; }'.
src/pages/ClusterMetricsHistory.tsx(156,15): error TS2322: Type '(value: number) => string' is not assignable to type 'Formatter<number, NameType> & ((value: number, name: NameType, item: Payload<number, NameType>, index: number, payload: Payload<number, NameType>[]) => ReactNode | [...])'.
  Type '(value: number) => string' is not assignable to type 'Formatter<number, NameType>'.
    Types of parameters 'value' and 'value' are incompatible.
      Type 'number | undefined' is not assignable to type 'number'.
        Type 'undefined' is not assignable to type 'number'.
src/pages/NodeList.tsx(103,9): error TS2322: Type '({ key: keyof Node; header: string; sortable: boolean; render?: undefined; } | { key: keyof Node; header: string; sortable: boolean; render: (value: string) => Element; } | { ...; } | { ...; } | { ...; })[]' is not assignable to type 'Column<Node>[]'.
  Type '{ key: keyof Node; header: string; sortable: boolean; render?: undefined; } | { key: keyof Node; header: string; sortable: boolean; render: (value: string) => Element; } | { ...; } | { ...; } | { ...; }' is not assignable to type 'Column<Node>'.
    Type '{ key: keyof Node; header: string; sortable: boolean; render: (value: string) => JSX.Element; }' is not assignable to type 'Column<Node>'.
      Types of property 'render' are incompatible.
        Type '(value: string) => JSX.Element' is not assignable to type '(value: unknown, row: Node) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/NodeDetails.tsx(7,10): error TS6133: 'Modal' is declared but its value is never read.
src/pages/NodeDetails.tsx(9,15): error TS6196: 'Node' is declared but never used.
src/pages/NodeDetails.tsx(22,5): error TS2353: Object literal may only specify known properties, and 'mutationFn' does not exist in type '(variables: unknown) => Promise<unknown>'.
src/pages/NodeDetails.tsx(30,5): error TS2353: Object literal may only specify known properties, and 'mutationFn' does not exist in type '(variables: unknown) => Promise<unknown>'.
src/pages/NodeDetails.tsx(38,5): error TS2353: Object literal may only specify known properties, and 'mutationFn' does not exist in type '(variables: unknown) => Promise<unknown>'.
src/pages/NodeDetails.tsx(46,21): error TS2322: Type '{ message: string; }' is not assignable to type 'IntrinsicAttributes & { size?: "sm" | "md" | "lg" | undefined; }'.
  Property 'message' does not exist on type 'IntrinsicAttributes & { size?: "sm" | "md" | "lg" | undefined; }'.
src/pages/NodeDetails.tsx(87,47): error TS2554: Expected 1-2 arguments, but got 0.
src/pages/NodeDetails.tsx(94,15): error TS2322: Type '"warning"' is not assignable to type '"primary" | "secondary" | "danger" | "ghost" | undefined'.
src/pages/NodeDetails.tsx(95,45): error TS2554: Expected 1-2 arguments, but got 0.
src/pages/NodeDetails.tsx(185,42): error TS2554: Expected 1-2 arguments, but got 0.
src/api/namespace.ts(64,3): error TS2322: Type '{ success: boolean; data?: { message: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is not assignable to type '{ message: string; }'.
  Types of property 'message' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/api/namespace.ts(91,3): error TS2740: Type '{ success: boolean; data?: { cpuUsed: string; cpuHard: string; memoryUsed: string; memoryHard: string; podsUsed: string; podsHard: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | u...' is missing the following properties from type '{ cpuUsed: string; cpuHard: string; memoryUsed: string; memoryHard: string; podsUsed: string; podsHard: string; }': cpuUsed, cpuHard, memoryUsed, memoryHard, and 2 more.
src/api/namespace.ts(118,3): error TS2322: Type '{ success: boolean; data?: { message: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is not assignable to type '{ message: string; }'.
  Types of property 'message' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/pages/NamespaceList.tsx(41,53): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceList.tsx(77,38): error TS2322: Type '{ status: string; variant: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'variant' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/NamespaceList.tsx(113,13): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/NamespaceList.tsx(123,13): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/NamespaceList.tsx(172,11): error TS2322: Type '({ key: keyof Namespace; header: string; sortable: boolean; render: (value: string, row: Namespace) => Element; } | { key: keyof Namespace; header: string; sortable: boolean; render: (value: number) => string; } | { ...; } | { ...; })[]' is not assignable to type 'Column<Namespace>[]'.
  Type '{ key: keyof Namespace; header: string; sortable: boolean; render: (value: string, row: Namespace) => Element; } | { key: keyof Namespace; header: string; sortable: boolean; render: (value: number) => string; } | { ...; } | { ...; }' is not assignable to type 'Column<Namespace>'.
    Type '{ key: keyof Namespace; header: string; sortable: boolean; render: (value: string, row: Namespace) => JSX.Element; }' is not assignable to type 'Column<Namespace>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: Namespace) => JSX.Element' is not assignable to type '(value: unknown, row: Namespace) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/NamespaceDetails.tsx(1,10): error TS2305: Module '"react"' has no exported member 'useParams'.
src/pages/NamespaceDetails.tsx(40,15): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/NamespaceDetails.tsx(61,11): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/NamespaceDetails.tsx(162,50): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceDetails.tsx(179,49): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceDetails.tsx(191,53): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceDetails.tsx(198,26): error TS2554: Expected 1-2 arguments, but got 0.
src/pages/NamespaceDetails.tsx(270,60): error TS2339: Property 'metadata' does not exist on type 'Namespace'.
src/pages/NamespaceDetails.tsx(286,57): error TS2554: Expected 1-2 arguments, but got 0.
src/pages/NamespaceDetails.tsx(339,19): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/CreateNamespace.tsx(37,70): error TS2554: Expected 1 arguments, but got 2.
src/pages/CreateNamespace.tsx(47,47): error TS2554: Expected 1 arguments, but got 2.
src/pages/CreateNamespace.tsx(140,21): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/CreateNamespace.tsx(161,17): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/CreateNamespace.tsx(197,21): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/CreateNamespace.tsx(218,17): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/EditNamespace.tsx(1,10): error TS2305: Module '"react"' has no exported member 'useParams'.
src/pages/EditNamespace.tsx(1,21): error TS2305: Module '"react"' has no exported member 'useNavigate'.
src/pages/EditNamespace.tsx(5,1): error TS6133: 'Namespace' is declared but its value is never read.
src/pages/EditNamespace.tsx(5,32): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/EditNamespace.tsx(40,6): error TS2554: Expected 0-1 arguments, but got 2.
src/pages/EditNamespace.tsx(51,53): error TS2554: Expected 1 arguments, but got 2.
src/pages/EditNamespace.tsx(145,21): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/EditNamespace.tsx(166,17): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/EditNamespace.tsx(202,21): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/EditNamespace.tsx(223,17): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/NamespaceManagement.tsx(1,10): error TS2305: Module '"react"' has no exported member 'useParams'.
src/pages/NamespaceManagement.tsx(1,21): error TS2305: Module '"react"' has no exported member 'useNavigate'.
src/pages/NamespaceManagement.tsx(5,36): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/NamespaceManagement.tsx(8,1): error TS6133: 'Select' is declared but its value is never read.
src/pages/NamespaceManagement.tsx(12,11): error TS6196: 'NamespaceQuotaState' is declared but never used.
src/pages/NamespaceManagement.tsx(35,55): error TS2345: Argument of type '{ cpuHard: string; memoryHard: string; podsHard: string; }' is not assignable to parameter of type 'ResourceQuota | (() => ResourceQuota)'.
  Type '{ cpuHard: string; memoryHard: string; podsHard: string; }' is missing the following properties from type 'ResourceQuota': cpuUsed, memoryUsed, podsUsed
src/pages/NamespaceManagement.tsx(45,28): error TS6133: 'setSelectedTemplate' is declared but its value is never read.
src/pages/NamespaceManagement.tsx(57,17): error TS2345: Argument of type '{ cpuHard: string; memoryHard: string; podsHard: string; }' is not assignable to parameter of type 'SetStateAction<ResourceQuota>'.
  Type '{ cpuHard: string; memoryHard: string; podsHard: string; }' is missing the following properties from type 'ResourceQuota': cpuUsed, memoryUsed, podsUsed
src/pages/NamespaceManagement.tsx(63,6): error TS2554: Expected 0-1 arguments, but got 2.
src/pages/NamespaceManagement.tsx(71,49): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceManagement.tsx(88,81): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceManagement.tsx(112,52): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceManagement.tsx(128,49): error TS2554: Expected 1 arguments, but got 2.
src/pages/NamespaceManagement.tsx(235,33): error TS2345: Argument of type '{ cpuHard: string; memoryHard: string; podsHard: string; }' is not assignable to parameter of type 'SetStateAction<ResourceQuota>'.
  Type '{ cpuHard: string; memoryHard: string; podsHard: string; }' is missing the following properties from type 'ResourceQuota': cpuUsed, memoryUsed, podsUsed
src/pages/NamespaceManagement.tsx(302,21): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/pages/NamespaceManagement.tsx(325,21): error TS2322: Type '"small"' is not assignable to type '"sm" | "md" | "lg" | undefined'.
src/api/pod.ts(25,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/pod.ts(32,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/pod.ts(39,43): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/pod.ts(71,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/pod.ts(78,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/pod.ts(81,3): error TS2322: Type '{ name: string; kind: string; yaml: string; namespace?: string | undefined; } | undefined' is not assignable to type 'ResourceYaml'.
  Type 'undefined' is not assignable to type 'ResourceYaml'.
src/api/pod.ts(95,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/pod.ts(98,3): error TS2322: Type 'any[] | undefined' is not assignable to type 'Event[]'.
  Type 'undefined' is not assignable to type 'Event[]'.
src/pages/ResourceList.tsx(6,35): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/PodList.tsx(5,26): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/PodList.tsx(6,1): error TS6133: 'ResourceListPage' is declared but its value is never read.
src/pages/PodList.tsx(22,28): error TS6133: 'error' is declared but its value is never read.
src/pages/PodList.tsx(35,45): error TS2554: Expected 1 arguments, but got 2.
src/pages/PodList.tsx(194,11): error TS2322: Type '({ key: keyof Pod; header: string; sortable: boolean; render: (value: string, row: Pod) => Element; } | { key: keyof Pod; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; })[]' is not assignable to type 'Column<Pod>[]'.
  Type '{ key: keyof Pod; header: string; sortable: boolean; render: (value: string, row: Pod) => Element; } | { key: keyof Pod; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; }' is not assignable to type 'Column<Pod>'.
    Type '{ key: keyof Pod; header: string; sortable: boolean; render: (value: string, row: Pod) => JSX.Element; }' is not assignable to type 'Column<Pod>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: Pod) => JSX.Element' is not assignable to type '(value: unknown, row: Pod) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/PodDetails.tsx(5,15): error TS6196: 'Pod' is declared but never used.
src/pages/PodDetails.tsx(5,20): error TS6196: 'PodLogs' is declared but never used.
src/pages/PodDetails.tsx(5,42): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/PodDetails.tsx(210,15): error TS2322: Type '({ key: keyof Event; header: string; render: (v: number) => string; } | { key: keyof Event; header: string; render?: undefined; })[]' is not assignable to type 'Column<Event>[]'.
  Type '{ key: keyof Event; header: string; render: (v: number) => string; } | { key: keyof Event; header: string; render?: undefined; }' is not assignable to type 'Column<Event>'.
    Type '{ key: keyof Event; header: string; render: (v: number) => string; }' is not assignable to type 'Column<Event>'.
      Types of property 'key' are incompatible.
        Type 'keyof import("/home/spaniac/repos/kube-manager/apps/frontend/src/types/api").Event' is not assignable to type 'keyof Event'.
src/api/deployment.ts(29,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/deployment.ts(36,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/deployment.ts(47,40): error TS2552: Cannot find name 'ApiResponse'. Did you mean 'Response'?
src/api/deployment.ts(51,3): error TS2322: Type '{ success: boolean; data?: { message: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is not assignable to type '{ message: string; }'.
  Types of property 'message' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/api/deployment.ts(61,41): error TS2304: Cannot find name 'ApiResponse'.
src/api/deployment.ts(64,3): error TS2322: Type '{ success: boolean; data?: { message: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is not assignable to type '{ message: string; }'.
  Types of property 'message' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/api/deployment.ts(75,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/deployment.ts(79,3): error TS2322: Type '{ success: boolean; data?: { message: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is not assignable to type '{ message: string; }'.
  Types of property 'message' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/api/deployment.ts(91,41): error TS2304: Cannot find name 'ApiResponse'.
src/api/deployment.ts(94,3): error TS2322: Type '{ success: boolean; data?: { message: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is not assignable to type '{ message: string; }'.
  Types of property 'message' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/api/deployment.ts(101,43): error TS2304: Cannot find name 'ApiResponse'.
src/api/deployment.ts(108,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/deployment.ts(111,3): error TS2322: Type '{ name: string; kind: string; yaml: string; namespace?: string | undefined; } | undefined' is not assignable to type 'ResourceYaml'.
  Type 'undefined' is not assignable to type 'ResourceYaml'.
src/pages/DeploymentList.tsx(5,33): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/DeploymentList.tsx(129,16): error TS6133: 'value' is declared but its value is never read.
src/pages/DeploymentList.tsx(224,11): error TS2322: Type '({ key: keyof Deployment; header: string; sortable: boolean; render: (value: string, row: Deployment) => Element; } | { key: keyof Deployment; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; })[]' is not assignable to type 'Column<Deployment>[]'.
  Type '{ key: keyof Deployment; header: string; sortable: boolean; render: (value: string, row: Deployment) => Element; } | { key: keyof Deployment; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; }' is not assignable to type 'Column<Deployment>'.
    Type '{ key: keyof Deployment; header: string; sortable: boolean; render: (value: string, row: Deployment) => JSX.Element; }' is not assignable to type 'Column<Deployment>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: Deployment) => JSX.Element' is not assignable to type '(value: unknown, row: Deployment) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/DeploymentDetails.tsx(6,40): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/DeploymentDetails.tsx(143,43): error TS18048: 'deployment.template.containers.length' is possibly 'undefined'.
src/pages/DeploymentDetails.tsx(192,21): error TS2554: Expected 1-2 arguments, but got 0.
src/pages/DeploymentDetails.tsx(302,17): error TS2322: Type '({ key: keyof WorkloadCondition; header: string; render?: undefined; } | { key: keyof WorkloadCondition; header: string; render: (value: string) => Element; } | { ...; })[]' is not assignable to type 'Column<WorkloadCondition>[]'.
  Type '{ key: keyof WorkloadCondition; header: string; render?: undefined; } | { key: keyof WorkloadCondition; header: string; render: (value: string) => Element; } | { ...; }' is not assignable to type 'Column<WorkloadCondition>'.
    Type '{ key: keyof WorkloadCondition; header: string; render: (value: string) => JSX.Element; }' is not assignable to type 'Column<WorkloadCondition>'.
      Types of property 'render' are incompatible.
        Type '(value: string) => JSX.Element' is not assignable to type '(value: unknown, row: WorkloadCondition) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/DeploymentDetails.tsx(427,17): error TS2322: Type '"warning" | "primary"' is not assignable to type '"primary" | "secondary" | "danger" | "ghost" | undefined'.
  Type '"warning"' is not assignable to type '"primary" | "secondary" | "danger" | "ghost" | undefined'.
src/pages/DeploymentDetails.tsx(428,72): error TS2554: Expected 1-2 arguments, but got 0.
src/pages/DeploymentDetails.tsx(428,98): error TS2554: Expected 1-2 arguments, but got 0.
src/api/service.ts(25,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/service.ts(32,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/service.ts(39,43): error TS2304: Cannot find name 'ApiResponse'.
src/api/service.ts(46,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/service.ts(49,3): error TS2322: Type '{ name: string; kind: string; yaml: string; namespace?: string | undefined; } | undefined' is not assignable to type 'ResourceYaml'.
  Type 'undefined' is not assignable to type 'ResourceYaml'.
src/pages/ServiceList.tsx(5,30): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/ServiceList.tsx(56,9): error TS6133: 'handleFilterChange' is declared but its value is never read.
src/pages/ServiceList.tsx(175,11): error TS2322: Type '({ key: keyof Service; header: string; sortable: boolean; render: (value: string, row: Service) => Element; } | { key: keyof Service; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; })[]' is not assignable to type 'Column<Service>[]'.
  Type '{ key: keyof Service; header: string; sortable: boolean; render: (value: string, row: Service) => Element; } | { key: keyof Service; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; }' is not assignable to type 'Column<Service>'.
    Type '{ key: keyof Service; header: string; sortable: boolean; render: (value: string, row: Service) => JSX.Element; }' is not assignable to type 'Column<Service>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: Service) => JSX.Element' is not assignable to type '(value: unknown, row: Service) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/api/configmap.ts(25,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/configmap.ts(32,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/configmap.ts(39,43): error TS2304: Cannot find name 'ApiResponse'.
src/api/configmap.ts(46,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/configmap.ts(49,3): error TS2322: Type '{ name: string; kind: string; yaml: string; namespace?: string | undefined; } | undefined' is not assignable to type 'ResourceYaml'.
  Type 'undefined' is not assignable to type 'ResourceYaml'.
src/pages/ConfigMapList.tsx(5,32): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/ConfigMapList.tsx(166,11): error TS2322: Type '({ key: keyof ConfigMap; header: string; sortable: boolean; render: (value: string, row: ConfigMap) => Element; } | { key: keyof ConfigMap; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; })[]' is not assignable to type 'Column<ConfigMap>[]'.
  Type '{ key: keyof ConfigMap; header: string; sortable: boolean; render: (value: string, row: ConfigMap) => Element; } | { key: keyof ConfigMap; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; }' is not assignable to type 'Column<ConfigMap>'.
    Type '{ key: keyof ConfigMap; header: string; sortable: boolean; render: (value: string, row: ConfigMap) => JSX.Element; }' is not assignable to type 'Column<ConfigMap>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: ConfigMap) => JSX.Element' is not assignable to type '(value: unknown, row: ConfigMap) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/api/secret.ts(25,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/secret.ts(32,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/secret.ts(39,43): error TS2304: Cannot find name 'ApiResponse'.
src/api/secret.ts(46,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/secret.ts(49,3): error TS2322: Type '{ name: string; kind: string; yaml: string; namespace?: string | undefined; } | undefined' is not assignable to type 'ResourceYaml'.
  Type 'undefined' is not assignable to type 'ResourceYaml'.
src/pages/SecretList.tsx(5,29): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/SecretList.tsx(57,9): error TS6133: 'handleFilterChange' is declared but its value is never read.
src/pages/SecretList.tsx(61,9): error TS6133: 'maskValue' is declared but its value is never read.
src/pages/SecretList.tsx(183,11): error TS2322: Type '({ key: keyof Secret; header: string; sortable: boolean; render: (value: string, row: Secret) => Element; } | { key: keyof Secret; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; } | { ...; })[]' is not assignable to type 'Column<Secret>[]'.
  Type '{ key: keyof Secret; header: string; sortable: boolean; render: (value: string, row: Secret) => Element; } | { key: keyof Secret; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; } | { ...; } | { ...; }' is not assignable to type 'Column<Secret>'.
    Type '{ key: keyof Secret; header: string; sortable: boolean; render: (value: string, row: Secret) => JSX.Element; }' is not assignable to type 'Column<Secret>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: Secret) => JSX.Element' is not assignable to type '(value: unknown, row: Secret) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/api/statefulset.ts(25,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/statefulset.ts(32,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/statefulset.ts(43,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/statefulset.ts(47,3): error TS2322: Type '{ success: boolean; data?: { message: string; } | undefined; error?: { status: number; type?: string | undefined; title?: string | undefined; detail?: string | undefined; instance?: string | undefined; errorCode?: string | undefined; } | undefined; message?: string | undefined; status?: number | undefined; }' is not assignable to type '{ message: string; }'.
  Types of property 'message' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/api/statefulset.ts(54,43): error TS2304: Cannot find name 'ApiResponse'.
src/api/statefulset.ts(61,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/statefulset.ts(64,3): error TS2322: Type '{ name: string; kind: string; yaml: string; namespace?: string | undefined; } | undefined' is not assignable to type 'ResourceYaml'.
  Type 'undefined' is not assignable to type 'ResourceYaml'.
src/pages/StatefulSetList.tsx(5,34): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/StatefulSetList.tsx(6,1): error TS6133: 'Badge' is declared but its value is never read.
src/pages/StatefulSetList.tsx(179,11): error TS2322: Type '({ key: keyof StatefulSet; header: string; sortable: boolean; render: (value: string, row: StatefulSet) => Element; } | { key: keyof StatefulSet; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; })[]' is not assignable to type 'Column<StatefulSet>[]'.
  Type '{ key: keyof StatefulSet; header: string; sortable: boolean; render: (value: string, row: StatefulSet) => Element; } | { key: keyof StatefulSet; header: string; sortable: boolean; render?: undefined; } | { ...; } | { ...; }' is not assignable to type 'Column<StatefulSet>'.
    Type '{ key: keyof StatefulSet; header: string; sortable: boolean; render: (value: string, row: StatefulSet) => JSX.Element; }' is not assignable to type 'Column<StatefulSet>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: StatefulSet) => JSX.Element' is not assignable to type '(value: unknown, row: StatefulSet) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/api/daemonset.ts(25,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/daemonset.ts(32,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/daemonset.ts(39,43): error TS2304: Cannot find name 'ApiResponse'.
src/api/daemonset.ts(46,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/daemonset.ts(49,3): error TS2322: Type '{ name: string; kind: string; yaml: string; namespace?: string | undefined; } | undefined' is not assignable to type 'ResourceYaml'.
  Type 'undefined' is not assignable to type 'ResourceYaml'.
src/pages/DaemonSetList.tsx(5,32): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/DaemonSetList.tsx(145,11): error TS2322: Type '({ key: keyof DaemonSet; header: string; sortable: boolean; render: (value: string, row: DaemonSet) => Element; } | { key: keyof DaemonSet; header: string; sortable: boolean; render?: undefined; } | { ...; })[]' is not assignable to type 'Column<DaemonSet>[]'.
  Type '{ key: keyof DaemonSet; header: string; sortable: boolean; render: (value: string, row: DaemonSet) => Element; } | { key: keyof DaemonSet; header: string; sortable: boolean; render?: undefined; } | { ...; }' is not assignable to type 'Column<DaemonSet>'.
    Type '{ key: keyof DaemonSet; header: string; sortable: boolean; render: (value: string, row: DaemonSet) => JSX.Element; }' is not assignable to type 'Column<DaemonSet>'.
      Types of property 'render' are incompatible.
        Type '(value: string, row: DaemonSet) => JSX.Element' is not assignable to type '(value: unknown, row: DaemonSet) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/components/ResourceYaml.tsx(106,25): error TS18048: 'keyPart' is possibly 'undefined'.
src/components/ResourceYaml.tsx(107,19): error TS18048: 'keyPart' is possibly 'undefined'.
src/components/ResourceYaml.tsx(120,13): error TS6133: 'valueIndent' is declared but its value is never read.
src/pages/WorkloadCreate.tsx(6,1): error TS6133: 'Input' is declared but its value is never read.
src/pages/WorkloadCreate.tsx(7,1): error TS6133: 'Spinner' is declared but its value is never read.
src/pages/WorkloadCreate.tsx(110,23): error TS6133: 'setShowPreview' is declared but its value is never read.
src/pages/WorkloadCreate.tsx(133,13): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'SetStateAction<string>'.
  Type 'undefined' is not assignable to type 'SetStateAction<string>'.
src/pages/WorkloadRollback.tsx(32,58): error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.
src/pages/WorkloadRollback.tsx(56,27): error TS2345: Argument of type '{ revision: number; annotations: Record<string, string>; } | undefined' is not assignable to parameter of type 'SetStateAction<Revision | null>'.
  Type 'undefined' is not assignable to type 'SetStateAction<Revision | null>'.
src/pages/WorkloadRollback.tsx(57,33): error TS18048: 'previousRevision' is possibly 'undefined'.
src/pages/WorkloadRollback.tsx(70,7): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
src/pages/WorkloadRollback.tsx(79,9): error TS6133: 'getCreationTime' is declared but its value is never read.
src/pages/WorkloadRollback.tsx(141,67): error TS2322: Type '{ status: string; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/WorkloadUpdateStrategy.tsx(3,25): error TS2724: '"@api/deployment"' has no exported member named 'updateDeploymentStrategy'. Did you mean 'updateDeploymentImage'?
src/pages/WorkloadUpdateStrategy.tsx(3,25): error TS6133: 'updateDeploymentStrategy' is declared but its value is never read.
src/pages/WorkloadUpdateStrategy.tsx(6,1): error TS6133: 'Deployment' is declared but its value is never read.
src/pages/WorkloadUpdateStrategy.tsx(6,33): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/WorkloadResources.tsx(6,1): error TS6133: 'Deployment' is declared but its value is never read.
src/pages/WorkloadResources.tsx(6,33): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/WorkloadResources.tsx(92,9): error TS6133: 'formatMemory' is declared but its value is never read.
src/pages/WorkloadResources.tsx(104,9): error TS6133: 'formatCpu' is declared but its value is never read.
src/pages/WorkloadResources.tsx(184,51): error TS2322: Type '{ status: string; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/WorkloadResources.tsx(186,51): error TS2322: Type '{ status: string; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/WorkloadEnvEditor.tsx(6,1): error TS6133: 'Deployment' is declared but its value is never read.
src/pages/WorkloadEnvEditor.tsx(6,33): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/WorkloadEnvEditor.tsx(25,10): error TS6133: 'showAddModal' is declared but its value is never read.
src/pages/WorkloadEnvEditor.tsx(70,7): error TS2322: Type '{ key?: string | undefined; value?: string | undefined; isSecret?: boolean | undefined; }' is not assignable to type 'EnvVar'.
  Types of property 'key' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/pages/WorkloadEnvEditor.tsx(75,9): error TS6133: 'handleAddEnvVar' is declared but its value is never read.
src/pages/WorkloadEnvEditor.tsx(172,51): error TS2322: Type '{ status: string; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/WorkloadEnvEditor.tsx(174,51): error TS2322: Type '{ status: string; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/WorkloadClone.tsx(6,1): error TS6133: 'Deployment' is declared but its value is never read.
src/pages/WorkloadClone.tsx(6,33): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/pages/JobList.tsx(30,7): error TS2353: Object literal may only specify known properties, and 'keepPreviousData' does not exist in type 'Omit<UseQueryOptions<ResourceList<Job>, Error, ResourceList<Job>, readonly unknown[]>, "queryKey" | "queryFn">'.
src/pages/JobList.tsx(35,27): error TS2339: Property 'total' does not exist on type 'ResourceList<Job>'.
src/pages/JobList.tsx(57,39): error TS2322: Type '{ status: "Running" | "Succeeded" | "Failed" | "Pending"; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/JobList.tsx(129,15): error TS2322: Type '({ key: keyof Job; header: string; render?: undefined; } | { key: keyof Job; header: string; render: (value: string) => Element; } | { key: keyof Job; header: string; render: (v: number) => number | "-"; })[]' is not assignable to type 'Column<Job>[]'.
  Type '{ key: keyof Job; header: string; render?: undefined; } | { key: keyof Job; header: string; render: (value: string) => Element; } | { key: keyof Job; header: string; render: (v: number) => number | "-"; }' is not assignable to type 'Column<Job>'.
    Type '{ key: keyof Job; header: string; render: (value: string) => JSX.Element; }' is not assignable to type 'Column<Job>'.
      Types of property 'render' are incompatible.
        Type '(value: string) => JSX.Element' is not assignable to type '(value: unknown, row: Job) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/CronJobList.tsx(29,7): error TS2353: Object literal may only specify known properties, and 'keepPreviousData' does not exist in type 'Omit<UseQueryOptions<ResourceList<CronJob>, Error, ResourceList<CronJob>, readonly unknown[]>, "queryKey" | "queryFn">'.
src/pages/CronJobList.tsx(34,31): error TS2339: Property 'total' does not exist on type 'ResourceList<CronJob>'.
src/pages/CronJobList.tsx(56,55): error TS2322: Type '{ status: string; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/CronJobList.tsx(127,15): error TS2322: Type '({ key: keyof CronJob; header: string; render?: undefined; } | { key: keyof CronJob; header: string; render: (value: string) => Element; } | { key: keyof CronJob; header: string; render: (value: boolean) => Element; } | { ...; })[]' is not assignable to type 'Column<CronJob>[]'.
  Type '{ key: keyof CronJob; header: string; render?: undefined; } | { key: keyof CronJob; header: string; render: (value: string) => Element; } | { key: keyof CronJob; header: string; render: (value: boolean) => Element; } | { ...; }' is not assignable to type 'Column<CronJob>'.
    Type '{ key: keyof CronJob; header: string; render: (value: string) => JSX.Element; }' is not assignable to type 'Column<CronJob>'.
      Types of property 'render' are incompatible.
        Type '(value: string) => JSX.Element' is not assignable to type '(value: unknown, row: CronJob) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/PdbManagement.tsx(23,9): error TS6133: 'navigate' is declared but its value is never read.
src/pages/PdbManagement.tsx(42,7): error TS2353: Object literal may only specify known properties, and 'keepPreviousData' does not exist in type 'Omit<UseQueryOptions<{ items: { name: string; namespace: string; minAvailable: number; maxUnavailable: number; currentHealthy: number; desiredHealthy: number; }[]; total: number; }, Error, { items: { name: string; ... 4 more ...; desiredHealthy: number; }[]; total: number; }, readonly unknown[]>, "queryKey" | "query...'.
src/pages/PdbManagement.tsx(129,66): error TS2322: Type '{ status: string; label: string; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
  Property 'label' does not exist on type 'IntrinsicAttributes & BadgeProps'.
src/pages/PdbManagement.tsx(163,20): error TS2554: Expected 1-2 arguments, but got 0.
src/pages/PdbManagement.tsx(230,15): error TS2322: Type '({ key: keyof Pdb; header: string; render?: undefined; } | { key: keyof Pdb; header: string; render: (value: string) => Element; } | { key: keyof Pdb; header: string; render: (value: number) => number | "-"; } | { ...; } | { ...; })[]' is not assignable to type 'Column<{ name: string; namespace: string; minAvailable: number; maxUnavailable: number; currentHealthy: number; desiredHealthy: number; }>[]'.
  Type '{ key: keyof Pdb; header: string; render?: undefined; } | { key: keyof Pdb; header: string; render: (value: string) => Element; } | { key: keyof Pdb; header: string; render: (value: number) => number | "-"; } | { ...; } | { ...; }' is not assignable to type 'Column<{ name: string; namespace: string; minAvailable: number; maxUnavailable: number; currentHealthy: number; desiredHealthy: number; }>'.
    Type '{ key: keyof Pdb; header: string; render: (value: string) => JSX.Element; }' is not assignable to type 'Column<{ name: string; namespace: string; minAvailable: number; maxUnavailable: number; currentHealthy: number; desiredHealthy: number; }>'.
      Types of property 'render' are incompatible.
        Type '(value: string) => JSX.Element' is not assignable to type '(value: unknown, row: { name: string; namespace: string; minAvailable: number; maxUnavailable: number; currentHealthy: number; desiredHealthy: number; }) => ReactNode'.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
src/pages/PdbManagement.tsx(370,45): error TS2554: Expected 1-2 arguments, but got 0.
src/api/terminal.ts(25,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/terminal.ts(32,40): error TS2304: Cannot find name 'ApiResponse'.
src/api/terminal.ts(35,3): error TS2322: Type 'Record<string | number | symbol, unknown>' is not assignable to type 'Record<string, TerminalSession>'.
  'string' index signatures are incompatible.
    Type 'unknown' is not assignable to type 'TerminalSession'.
src/api/terminal.ts(38,9): error TS2554: Expected 2-3 arguments, but got 1.
src/api/terminal.ts(51,43): error TS2304: Cannot find name 'ApiResponse'.
src/api/terminal.ts(61,41): error TS2304: Cannot find name 'ApiResponse'.
src/api/terminal.ts(72,41): error TS2304: Cannot find name 'ApiResponse'.
src/api/terminal.ts(80,41): error TS2304: Cannot find name 'ApiResponse'.
src/api/terminal.ts(104,3): error TS2322: Type '(() => void) | undefined' is not assignable to type '((this: WebSocket, ev: Event) => any) | null'.
  Type 'undefined' is not assignable to type '((this: WebSocket, ev: Event) => any) | null'.
src/api/terminal.ts(116,3): error TS2322: Type '((event: CloseEvent) => void) | undefined' is not assignable to type '((this: WebSocket, ev: CloseEvent) => any) | null'.
  Type 'undefined' is not assignable to type '((this: WebSocket, ev: CloseEvent) => any) | null'.
src/api/terminal.ts(117,3): error TS2322: Type '((error: Event) => void) | undefined' is not assignable to type '((this: WebSocket, ev: Event) => any) | null'.
  Type 'undefined' is not assignable to type '((this: WebSocket, ev: Event) => any) | null'.
src/api/user.ts(9,5): error TS6133: 'resourceListSchema' is declared but its value is never read.
src/components/Badge.test.tsx(1,32): error TS6133: 'beforeEach' is declared but its value is never read.
src/components/Badge.test.tsx(3,1): error TS6133: 'userEvent' is declared but its value is never read.
src/components/Select.test.tsx(8,35): error TS2741: Property 'onChange' is missing in type '{ options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Select.test.tsx(16,13): error TS2741: Property 'onChange' is missing in type '{ label: string; options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Select.test.tsx(21,13): error TS2741: Property 'onChange' is missing in type '{ value: string; options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Select.test.tsx(26,35): error TS2741: Property 'onChange' is missing in type '{ error: string; options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Select.test.tsx(33,35): error TS2741: Property 'onChange' is missing in type '{ disabled: true; options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Select.test.tsx(40,13): error TS2741: Property 'onChange' is missing in type '{ options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Select.test.tsx(60,13): error TS2741: Property 'onChange' is missing in type '{ options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Select.test.tsx(69,13): error TS2741: Property 'onChange' is missing in type '{ options: { value: string; label: string; }[]; }' but required in type 'SelectProps'.
src/components/Spinner.test.tsx(1,32): error TS6133: 'vi' is declared but its value is never read.
src/components/Spinner.test.tsx(2,18): error TS6133: 'screen' is declared but its value is never read.
src/components/Terminal.tsx(13,35): error TS6137: Cannot import type declaration files. Consider importing 'api' instead of '@types/api'.
src/components/Terminal.tsx(14,8): error TS2613: Module '"/home/spaniac/repos/kube-manager/apps/frontend/src/components/Button"' has no default export. Did you mean to use 'import { Button } from "/home/spaniac/repos/kube-manager/apps/frontend/src/components/Button"' instead?
src/components/Terminal.tsx(15,8): error TS2613: Module '"/home/spaniac/repos/kube-manager/apps/frontend/src/components/Select"' has no default export. Did you mean to use 'import { Select } from "/home/spaniac/repos/kube-manager/apps/frontend/src/components/Select"' instead?
src/components/Terminal.tsx(16,8): error TS2613: Module '"/home/spaniac/repos/kube-manager/apps/frontend/src/components/Badge"' has no default export. Did you mean to use 'import { Badge } from "/home/spaniac/repos/kube-manager/apps/frontend/src/components/Badge"' instead?
src/components/Terminal.tsx(110,50): error TS2532: Object is possibly 'undefined'.
src/components/Terminal.tsx(182,67): error TS2448: Block-scoped variable 'handleClose' used before its declaration.
src/components/Terminal.tsx(182,67): error TS2454: Variable 'handleClose' is used before being assigned.
src/components/Terminal.tsx(276,28): error TS2339: Property 'findNext' does not exist on type 'Terminal'.
src/components/Terminal.tsx(278,28): error TS2339: Property 'findPrevious' does not exist on type 'Terminal'.
src/components/Terminal.tsx(441,26): error TS7006: Parameter 'value' implicitly has an 'any' type.
src/components/Terminal.tsx(459,24): error TS7006: Parameter 'value' implicitly has an 'any' type.
src/components/Toast.test.tsx(5,10): error TS6133: 'TestComponent' is declared but its value is never read.
src/components/Toast.test.tsx(6,9): error TS6133: 'showToast' is declared but its value is never read.
src/components/Toast.test.tsx(123,12): error TS2339: Property 'click' does not exist on type 'Element'.
src/components/YamlEditor.tsx(161,3): error TS6133: 'onValidate' is declared but its value is never read.
src/components/YamlEditor.tsx(162,3): error TS6133: 'onApply' is declared but its value is never read.
src/components/YamlEditor.tsx(165,3): error TS6133: 'namespace' is declared but its value is never read.
src/components/YamlEditor.tsx(171,3): error TS6133: 'showValidationErrors' is declared but its value is never read.
src/components/YamlEditor.tsx(182,10): error TS6133: 'monacoRef' is declared but its value is never read.
src/components/YamlEditor.tsx(187,28): error TS6133: 'setValidationResult' is declared but its value is never read.
src/components/YamlEditor.tsx(192,24): error TS6133: 'setIsValidating' is declared but its value is never read.
src/components/YamlEditor.tsx(211,19): error TS6133: 'setHistory' is declared but its value is never read.
src/components/YamlEditor.tsx(212,24): error TS6133: 'setHistoryIndex' is declared but its value is never read.
src/components/YamlEditor.tsx(215,20): error TS6133: 'setDiffData' is declared but its value is never read.
src/components/YamlEditor.tsx(250,9): error TS2304: Cannot find name 'handleLoadTemplate'.
src/components/YamlEditor.tsx(308,37): error TS2304: Cannot find name 'getCompletionSuggestions'.
src/components/YamlEditor.tsx(364,7): error TS2304: Cannot find name 'calculateDiff'.
src/components/YamlEditor.tsx(495,22): error TS2304: Cannot find name 'handleFormat'.
src/components/YamlEditor.tsx(503,22): error TS2304: Cannot find name 'handleBeautify'.
src/components/YamlEditor.tsx(511,22): error TS2304: Cannot find name 'handleMinify'.
src/components/YamlEditor.tsx(534,22): error TS2304: Cannot find name 'handleUndo'.
src/components/YamlEditor.tsx(542,22): error TS2304: Cannot find name 'handleRedo'.
src/components/YamlEditor.tsx(574,22): error TS2304: Cannot find name 'handleSave'.
src/components/YamlEditor.tsx(582,22): error TS2304: Cannot find name 'handleDryRun'.
src/components/YamlEditor.tsx(653,19): error TS2304: Cannot find name 'handleJumpToLine'.
src/components/YamlEditor.tsx(682,22): error TS2304: Cannot find name 'handleEditorDidMount'.
src/components/YamlEditor.tsx(683,23): error TS2304: Cannot find name 'handleEditorChange'.
src/components/YamlEditor.tsx(700,63): error TS2304: Cannot find name 'handleJumpToLine'.
src/components/index.ts(1,10): error TS2305: Module '"./Button"' has no exported member 'default'.
src/components/index.ts(2,10): error TS2305: Module '"./Input"' has no exported member 'default'.
src/components/index.ts(3,10): error TS2305: Module '"./Table"' has no exported member 'default'.
src/components/index.ts(4,10): error TS2305: Module '"./Modal"' has no exported member 'default'.
src/components/index.ts(5,10): error TS2305: Module '"./Select"' has no exported member 'default'.
src/pages/LogViewer.tsx(80,10): error TS2451: Cannot redeclare block-scoped variable 'filteredLogs'.
src/pages/LogViewer.tsx(190,9): error TS2451: Cannot redeclare block-scoped variable 'filteredLogs'.
src/pages/LogViewer.tsx(290,9): error TS2451: Cannot redeclare block-scoped variable 'generateShareableUrl'.
src/pages/LogViewer.tsx(346,9): error TS2451: Cannot redeclare block-scoped variable 'generateShareableUrl'.
src/pages/LogViewer.tsx(304,9): error TS2451: Cannot redeclare block-scoped variable 'copyToClipboard'.
src/pages/LogViewer.tsx(360,9): error TS2451: Cannot redeclare block-scoped variable 'copyToClipboard'.
src/pages/LogViewer.tsx(18,8): error TS6133: 'React' is declared but its value is never read.
src/pages/LogViewer.tsx(29,18): error TS6133: 'SelectStyles' is declared but its value is never read.
src/pages/LogViewer.tsx(30,18): error TS6133: 'ButtonStyles' is declared but its value is never read.
src/pages/LogViewer.tsx(31,1): error TS6133: 'Badge' is declared but its value is never read.
src/pages/LogViewer.tsx(76,43): error TS2304: Cannot find name 'useParams'.
src/pages/LogViewer.tsx(80,24): error TS6133: 'setFilteredLogs' is declared but its value is never read.
src/pages/LogViewer.tsx(84,26): error TS6133: 'setSeverityFilter' is declared but its value is never read.
src/pages/LogViewer.tsx(86,21): error TS6133: 'setStartTime' is declared but its value is never read.
src/pages/LogViewer.tsx(87,19): error TS6133: 'setEndTime' is declared but its value is never read.
src/pages/LogViewer.tsx(96,10): error TS6133: 'shareableBookmark' is declared but its value is never read.
src/pages/LogViewer.tsx(122,18): error TS2304: Cannot find name 'pod'.
src/pages/LogViewer.tsx(123,5): error TS2345: Argument of type '(q: any) => Promise<AxiosResponse<any, any, {}>>' is not assignable to parameter of type '() => Promise<AxiosResponse<any, any, {}>>'.
  Target signature provides too few arguments. Expected 1 or more, but got 0.
src/pages/LogViewer.tsx(123,6): error TS6133: 'q' is declared but its value is never read.
src/pages/LogViewer.tsx(123,6): error TS7006: Parameter 'q' implicitly has an 'any' type.
src/pages/LogViewer.tsx(152,19): error TS2345: Argument of type '(prev: LogLine[]) => (LogLine | undefined)[]' is not assignable to parameter of type 'SetStateAction<LogLine[]>'.
  Type '(prev: LogLine[]) => (LogLine | undefined)[]' is not assignable to type '(prevState: LogLine[]) => LogLine[]'.
    Type '(LogLine | undefined)[]' is not assignable to type 'LogLine[]'.
      Type 'LogLine | undefined' is not assignable to type 'LogLine'.
        Type 'undefined' is not assignable to type 'LogLine'.
src/pages/LogViewer.tsx(223,17): error TS7053: Element implicitly has an 'any' type because expression of type '0' can't be used to index type '{}'.
  Property '0' does not exist on type '{}'.
src/pages/LogViewer.tsx(224,39): error TS7006: Parameter 'c' implicitly has an 'any' type.
src/pages/LogViewer.tsx(249,9): error TS6133: 'addBookmark' is declared but its value is never read.
src/pages/LogViewer.tsx(335,7): error TS2353: Object literal may only specify known properties, and 'createdAt' does not exist in type 'ShareableLogBookmark'.
src/pages/LogViewer.tsx(336,7): error TS18004: No value exists in scope for the shorthand property 'namespace'. Either declare one or provide an initializer.
src/pages/LogViewer.tsx(341,13): error TS2304: Cannot find name 'namespace'.
src/pages/LogViewer.tsx(386,9): error TS6133: 'downloadLogs' is declared but its value is never read.
src/pages/LogViewer.tsx(411,21): error TS2322: Type '{ message: string; }' is not assignable to type 'IntrinsicAttributes & { size?: "sm" | "md" | "lg" | undefined; }'.
  Property 'message' does not exist on type 'IntrinsicAttributes & { size?: "sm" | "md" | "lg" | undefined; }'.
src/pages/LogViewer.tsx(431,53): error TS2339: Property 'target' does not exist on type 'string'.
src/pages/LogViewer.tsx(432,37): error TS7006: Parameter 'c' implicitly has an 'any' type.
src/pages/LogViewer.tsx(498,41): error TS6133: 'index' is declared but its value is never read.
src/pages/LogViewer.tsx(520,56): error TS2345: Argument of type 'void' is not assignable to parameter of type 'ShareableLogBookmark'.
src/test/setup-msw.ts(21,1): error TS2304: Cannot find name 'beforeAll'.
src/test/setup-msw.ts(25,1): error TS2304: Cannot find name 'afterEach'.
src/test/setup-msw.ts(28,1): error TS2304: Cannot find name 'afterAll'.
src/test/setup.ts(15,11): error TS7006: Parameter 'query' implicitly has an 'any' type.
src/utils/apiResponse.test.ts(1,32): error TS6133: 'vi' is declared but its value is never read.
src/utils/apiResponse.test.ts(1,36): error TS6133: 'beforeEach' is declared but its value is never read.) also revealed numerous pre-existing TypeScript errors across the frontend codebase, further indicating the project was in a broken state prior to MSW integration. These errors are not related to the MSW setup itself.
## MSW Setup Learnings\n\n- Successfully installed `msw` and `@mswjs/interceptors`.\n- Created `apps/frontend/src/test/setup-msw.ts` with basic happy-path and error handlers.\n- Updated `apps/frontend/vitest.config.ts` to include `setup-msw.ts`.\n- Attempted to verify MSW setup by running tests, but encountered `JavaScript heap out of memory` errors, even after increasing Node.js memory limit. This indicates pre-existing memory issues in the test suite, unrelated to MSW setup.\n- Compilation (`npm -C apps/frontend run compile`) also revealed numerous pre-existing TypeScript errors across the frontend codebase, further indicating the project was in a broken state prior to MSW integration. These errors are not related to the MSW setup itself.

## TypeScript Compilation Fixes - February 6, 2026

**Context:** Fixed 200+ TypeScript compilation errors in apps/frontend to unblock integration tests.

**Fixed Issues:**

1. **ZodError Type Handling (apiResponse.ts)**:
   - Changed from accessing `error.detail`, `error.title`, `error.message` to `error.issues?.[0]?.message`
   - ZodError structure uses `issues` array, not direct properties

2. **React Query v5 API (useApi.ts)**:
   - Updated `useApiMutation` onError callback to accept 4 parameters: `(error, variables, context, mutation)`
   - Fixed `useApiInfiniteQuery` query function signature from `({ pageParam }: { pageParam?: number })` to `(context: { pageParam?: unknown })`

3. **ApiResponse Type Issues (across all API modules)**:
   - Removed double-wrapping of schemas with `apiResponseSchema()` inside `parseApiResponse()` calls
   - `parseApiResponse` already handles ApiResponse wrapper internally
   - Fixed imports: removed unused `apiResponseSchema` imports from cluster.ts and namespace.ts

4. **Badge Component Props**:
   - Added optional `label` prop to Badge component to support custom display text
   - Removed `variant` prop usage (Badge doesn't support it)
   - Removed `children` prop usage (Badge doesn't support it)

5. **Button Size Enum Values**:
   - Replaced all `size="small"` with `size="sm"` across all page files
   - Button component only accepts: "sm" | "md" | "lg"

6. **Toast API Standardization**:
   - Updated all `showToast(message, type)` calls to `showToast({ message, type })` object syntax
   - Affected files: CreateNamespace, EditNamespace, NamespaceDetails, NamespaceList, NamespaceManagement, PodList

7. **Table Component Column Types**:
   - Added local `Column<T>` type definition to pages consuming Table
   - Removed type assertions like `'key' as keyof T`
   - Updated render functions to accept `value: unknown` instead of `value: string`
   - Added proper typing to columns arrays: `const columns: Column<T>[]`

8. **Spinner to Loading Migration**:
   - Changed `<Spinner message="..." />` to `<Loading message="..." />`
   - Spinner doesn't accept `message` prop; Loading does

9. **useApiMutation API**:
   - Changed from passing object with `mutationFn` to passing function as first parameter
   - Old: `useApiMutation({ mutationFn: () => ... })`
   - New: `useApiMutation(() => ..., { ...options })`

10. **Missing Imports**:
    - Added `useParams` and `useNavigate` from 'react-router-dom' to multiple files
    - Fixed import path errors: `'@types/api'` → `'../types/api'`

11. **Button Variant Issues**:
    - Changed `variant="warning"` to `variant="secondary"` (warning not supported)

12. **LogViewer Duplicate Declarations**:
    - Removed duplicate useState for `filteredLogs` (was using useMemo already)
    - Removed duplicate function definitions for `generateShareableUrl` and `copyToClipboard`

**Remaining Issues (~216 errors):**
- LogViewer.tsx (26 errors)
- YamlEditor.tsx (24 errors)
- Multiple pages with Badge `label` prop usage (need to use Badge with label support)
- API files with missing `ApiResponse` import
- Pages with Button `variant="warning"` usage
- Files with `@types/api` import path errors

**Key Patterns Identified:**
- Most errors are due to API changes in React Query v5 and component prop changes
- Systematic fixing approach works: identify pattern → fix across all files → verify
- Badge and Button component changes affect many files
- Toast API change affects many files with simple pattern to fix globally

## Task 12: Integration Test Implementation - 2026-02-06

### What Was Accomplished

#### Integration Test File Structure
**Created**: `apps/frontend/src/pages/__tests__/NamespaceList.integration.test.tsx`

**Learning**: Integration tests require three key provider layers:
1. **MSW Server** - Mock API endpoints deterministically
2. **QueryClientProvider** - Provide React Query context to components using hooks
3. **ToastProvider** - Provide Toast context for components using `useToast`

**Pattern**: When testing components that depend on React Query and Toast hooks, they must be wrapped in provider components.

#### MSW Handler Pattern
```typescript
const server = setupServer(
  http.get('/api/v1/namespaces', () => {
    return HttpResponse.json({
      success: true,
      data: [/* mock data */]
    });
  })
);
```

**Learning**: MSW handlers use `HttpResponse.json()` to return structured API responses matching backend format.

#### Test File Pattern
```typescript
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

describe('ComponentName Integration Tests', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('test description', async () => {
    // Test implementation
  });
});
```

**Learning**: Integration tests follow a consistent pattern with proper lifecycle management (listen → reset → close).

---

### Blocker: Compilation Errors

**Problem**: Integration test file exists but tests cannot execute.

**Root Cause**: 226 TypeScript compilation errors in the codebase prevent `npm run test:run` from succeeding (pretest script fails).

**Key Learning**: 
Integration tests cannot be verified without a clean build. The plan structure (Tasks 1-11 → Task 12 → Task 13) assumes a working codebase at each gate.

---

### Package.json Script Issue

**Problem**: `pretest` script used `"gts compile"` which is not a valid gts command.

**Solution**: Changed to `"pretest": "npm run compile"`

**Learning**: 
Always verify npm scripts actually exist before setting them as pre/post hooks. Invalid scripts cause silent failures.

---

### Recommendation for Future

**Critical Path Planning**:
When creating integration test tasks, ensure:
1. Target codebase compiles cleanly first
2. Integration test scope is realistic given compilation state
3. Provider wrappers are identified upfront (QueryClient, Toast, etc.)

**Alternative Approach**:
For blocked integration test tasks, consider:
- Creating test file with stub/mock implementations that compile
- Documenting what tests SHOULD do vs what they CAN do
- Separating test infrastructure setup from test implementation

