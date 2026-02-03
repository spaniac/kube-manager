import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should login and access protected page', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:5173/login');

    // In production, this would redirect to Keycloak
    // For testing, we'll use test credentials
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('testpassword');

    // Click login button
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait for dashboard to load
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({
      timeout: 5000,
    });
  });

  test('should display error on invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');

    await page.getByRole('button', { name: 'Sign in' }).click();

    // Expect error message
    await expect(page.getByText('Invalid credentials')).toBeVisible({
      timeout: 3000,
    });
  });
});

test.describe('Dashboard Navigation', () => {
  test('should navigate to pods page', async ({ page }) => {
    // Start from dashboard
    await page.goto('http://localhost:5173/dashboard');

    // Click on Pods navigation
    await page.getByRole('link', { name: 'Pods' }).click();

    // Verify pods page is visible
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible({
      timeout: 5000,
    });
  });

  test('should navigate to cluster page', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');

    // Click on Cluster navigation
    await page.getByRole('link', { name: 'Cluster' }).click();

    // Verify cluster page is visible
    await expect(page.getByRole('heading', { name: 'Cluster' })).toBeVisible({
      timeout: 5000,
    });
  });
});

test.describe('Terminal Component', () => {
  test('should open terminal from pod details', async ({ page }) => {
    // Navigate to pods page
    await page.goto('http://localhost:5173/pods');

    // Click on a pod
    const podRow = page.getByTestId('pod-test-pod');
    await podRow.click();

    // Click on terminal button
    await page.getByRole('button', { name: 'Open Terminal' }).click();

    // Verify terminal dialog is visible
    await expect(page.getByRole('dialog', { name: 'Terminal' })).toBeVisible({
      timeout: 5000,
    });
  });

  test('should send command in terminal', async ({ page }) => {
    // Navigate to pods page and open terminal
    await page.goto('http://localhost:5173/pods');
    const podRow = page.getByTestId('pod-test-pod');
    await podRow.click();
    await page.getByRole('button', { name: 'Open Terminal' }).click();

    // Wait for terminal input
    const terminalInput = page.locator('.xterm-helper-textarea');
    await terminalInput.waitFor({ state: 'visible' });

    // Type command
    await terminalInput.fill('ls -la');

    // Press Enter
    await page.keyboard.press('Enter');

    // Wait for output
    await page.locator('.xterm-rows').toContainText('total');
  });
});
