import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts', './src/test/vi-setup.ts', './src/test/setup-msw.ts'],
    css: true,
    pool: 'forks',
    deps: {
      interopDefault: true,
    },
    transformMode: {
      web: [/\.[jt]sx?$/],
      ssr: [/\.tsx$/],
    },
    testTimeout: 10000,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'e2e/',
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.d.ts',
        '**/test/**',
        '**/index.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/types/**',
        'src/contexts/**',
        'src/layouts/**',
        'src/pages/**',
      ],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@common': path.resolve(__dirname, './src/common'),
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});
