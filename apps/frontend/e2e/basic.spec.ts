import { test, expect } from '@playwright/test';

test('should successfully log in with Keycloak provider', async ({ page }) => {
  // Mock the /auth/login request to simulate a successful login
  await page.route('**/auth/login', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      }),
    });
  });

  await page.goto('/login');

  // Click the "Sign in with Keycloak" button
  await page.getByRole('button', { name: 'Sign in with Keycloak' }).click();

  // Wait for navigation to the dashboard
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
