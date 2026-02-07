import { test, expect } from '@playwright/test';
import { getTestUser } from './fixtures/test-users';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login page', async ({ page }) => {
    await expect(page).toHaveTitle(/K8s Manager/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation error for empty fields', async ({ page }) => {
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should redirect to Keycloak for OAuth login', async ({ page }) => {
    const user = getTestUser('admin');

    await page.fill('input[type="email"]', user.username);
    await page.fill('input[type="password"]', user.password);
    await page.locator('button[type="submit"]').click();

    await page.waitForURL(/keycloak/);

    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page, context }) => {
    const user = getTestUser('admin');

    await page.goto('/login');
    await page.fill('input[type="email"]', user.username);
    await page.fill('input[type="password"]', user.password);
    await page.locator('button[type="submit"]').click();

    await page.waitForURL(/keycloak/);

    await page.fill('input[name="username"]', user.username);
    await page.fill('input[name="password"]', user.password);
    await page.locator('input[type="submit"]').click();

    await page.waitForURL('/', { timeout: 15000 });

    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should store access token and maintain session', async ({ page, context }) => {
    const user = getTestUser('admin');

    await page.goto('/login');
    await page.fill('input[type="email"]', user.username);
    await page.fill('input[type="password"]', user.password);
    await page.locator('button[type="submit"]').click();

    await page.waitForURL(/keycloak/);

    await page.fill('input[name="username"]', user.username);
    await page.fill('input[name="password"]', user.password);
    await page.locator('input[type="submit"]').click();

    await page.waitForURL('/', { timeout: 15000 });

    const cookies = await context.cookies();
    const hasAccessToken = cookies.some(cookie => cookie.name.includes('access_token') || cookie.name.includes('token'));

    expect(hasAccessToken).toBeTruthy();

    await page.reload();

    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.locator('button[type="submit"]').click();

    await page.waitForURL(/keycloak/);

    await page.fill('input[name="username"]', 'invaliduser');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.locator('input[type="submit"]').click();

    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });

  test('should redirect unauthenticated users to login page', async ({ page }) => {
    await page.goto('/');

    await page.waitForURL('/login', { timeout: 5000 });

    await expect(page).toHaveURL('/login');
  });

  test('should allow logout and redirect to login', async ({ page, context }) => {
    const user = getTestUser('admin');

    await page.goto('/login');
    await page.fill('input[type="email"]', user.username);
    await page.fill('input[type="password"]', user.password);
    await page.locator('button[type="submit"]').click();

    await page.waitForURL(/keycloak/);

    await page.fill('input[name="username"]', user.username);
    await page.fill('input[name="password"]', user.password);
    await page.locator('input[type="submit"]').click();

    await page.waitForURL('/', { timeout: 15000 });

    await page.click('button:has-text("Logout")');

    await page.waitForURL('/login', { timeout: 5000 });

    await expect(page).toHaveURL('/login');
  });
});
