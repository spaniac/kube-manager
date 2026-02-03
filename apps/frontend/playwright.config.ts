import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Run tests in parallel (configurable per environment)
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,

  // Fail build on CI if test.only is left
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  // Output directory
  outputDir: 'test-results',

  // Use configuration
  use: {
    // Base URL for relative navigation
    baseURL: process.env.BASE_URL || 'http://localhost:5173',

    // Collect trace on first retry for debugging
    trace: 'on-first-retry',

    // Screenshot settings
    screenshot: 'only-on-failure',

    // Video settings
    video: 'retain-on-failure',

    // Action timeout
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Browser projects for cross-browser testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Web server configuration for Vite
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
