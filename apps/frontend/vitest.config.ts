import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  test: {
    // TypeScript & JSX support is built-in
    globals: true, // Use test/describe without imports

    // DOM environment for React Testing Library
    environment: 'jsdom',

    // Setup files run before each test
    setupFiles: ['./src/test/setup.ts'],

    // Test file patterns
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],

    // Code coverage configuration
    coverage: {
      provider: 'v8', // Fast V8-based coverage
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/dist/',
        '**/coverage/',
        '**/vite-env.d.ts',
      ],
      // Coverage thresholds
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    // Watch mode for HMR during development
    watch: true,

    // Parallel test execution
    fileParallelism: true,
  },

  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
      '@test': path.resolve(__dirname, './src/test'),
    },
  },
});
