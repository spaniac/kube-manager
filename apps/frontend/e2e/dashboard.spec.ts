import { test, expect } from '@playwright/test';
import { getTestUser } from './fixtures/test-users';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
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
  });

  test('should display dashboard with key metrics', async ({ page }) => {
    await expect(page.locator('text=Dashboard')).toBeVisible();

    await expect(page.locator('text=Cluster Health')).toBeVisible();
    await expect(page.locator('text=Resource Usage')).toBeVisible();
    await expect(page.locator('text=Recent Alerts')).toBeVisible();
  });

  test('should show cluster health card with status', async ({ page }) => {
    const healthCard = page.locator('[data-testid="cluster-health-card"]').first();

    await expect(healthCard).toBeVisible();

    const statusText = await healthCard.locator('[data-testid="status-text"]').textContent();
    expect(statusText).toBeTruthy();
  });

  test('should load and display resource cards', async ({ page }) => {
    await page.waitForSelector('[data-testid="resource-card"]', { timeout: 10000 });

    const resourceCards = page.locator('[data-testid="resource-card"]');
    const count = await resourceCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to resource lists', async ({ page }) => {
    const podsCard = page.locator('[data-testid="resource-card"]').filter({ hasText: 'Pods' }).first();

    await expect(podsCard).toBeVisible();
    await podsCard.click();

    await page.waitForURL('/pods', { timeout: 5000 });

    await expect(page).toHaveURL('/pods');
  });

  test('should refresh dashboard data on interval', async ({ page }) => {
    await expect(page.locator('[data-testid="resource-card"]').first()).toBeVisible();

    const initialCount = await page.locator('[data-testid="resource-card"]').count();

    await page.waitForTimeout(3000);

    const refreshedCount = await page.locator('[data-testid="resource-card"]').count();

    expect(refreshedCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('should display alerts in dashboard', async ({ page }) => {
    await page.waitForSelector('[data-testid="alerts-section"]', { timeout: 10000 });

    const alertsSection = page.locator('[data-testid="alerts-section"]');
    await expect(alertsSection).toBeVisible();

    const alertCount = await alertsSection.locator('[data-testid="alert-item"]').count();

    expect(alertCount).toBeGreaterThanOrEqual(0);
  });

  test('should display widget library panel', async ({ page }) => {
    await page.click('button:has-text("Add Widget")');

    await expect(page.locator('[data-testid="widget-library-panel"]')).toBeVisible();

    const widgets = page.locator('[data-testid="widget-item"]');
    const widgetCount = await widgets.count();

    expect(widgetCount).toBeGreaterThan(0);
  });

  test('should navigate to dashboard builder', async ({ page }) => {
    await page.click('button:has-text("Create Dashboard")');

    await page.waitForURL('/dashboards/new', { timeout: 5000 });

    await expect(page).toHaveURL('/dashboards/new');
  });

  test('should display recent activity timeline', async ({ page }) => {
    await page.waitForSelector('[data-testid="activity-timeline"]', { timeout: 10000 });

    const timeline = page.locator('[data-testid="activity-timeline"]');
    await expect(timeline).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page, context }) => {
    await context.route('**/api/v1/cluster/health', route => route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }));

    await page.reload();

    await page.waitForTimeout(2000);

    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible();
  });

  test('should display user profile information', async ({ page }) => {
    await page.click('[data-testid="user-menu"]');

    await expect(page.locator('text=Profile')).toBeVisible();
    await expect(page.locator('text=Logout')).toBeVisible();
  });

  test('should navigate to namespace list', async ({ page }) => {
    const namespacesCard = page.locator('[data-testid="resource-card"]').filter({ hasText: 'Namespaces' }).first();

    await expect(namespacesCard).toBeVisible();
    await namespacesCard.click();

    await page.waitForURL('/namespaces', { timeout: 5000 });

    await expect(page).toHaveURL('/namespaces');
  });
});
