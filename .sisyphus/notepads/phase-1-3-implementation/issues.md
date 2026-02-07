## [2026-02-06] Week 1, Task 3A: Alert frontend components

### Issues

- Frontend build initially failed with `TS2307` because `@xterm/addon-search` was imported in `src/components/Terminal.tsx` but not present in installed modules. Resolved locally by installing the package without saving to `package.json`.
- `lsp_diagnostics` was initially unavailable for TypeScript because `typescript-language-server` was not installed in the environment. Resolved by installing `typescript-language-server` and `typescript` globally.
