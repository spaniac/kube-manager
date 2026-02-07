import { test, expect } from '@playwright/test';
import { getTestUser } from './fixtures/test-users';
import {
  getYamlFixture,
  yamlFixtures,
} from './fixtures/test-yaml';

test.describe('YAML Editor', () => {
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

    await page.goto('/namespaces');
    await page.waitForSelector('[data-testid="namespace-row"]', { timeout: 10000 });
  });

  test('should navigate to YAML editor for a resource', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForURL(/\/namespaces\/.*\/edit/, { timeout: 5000 });

    await expect(page).toHaveURL(/\/namespaces\/.*\/edit/);
    await expect(page.locator('[data-testid="yaml-editor"]')).toBeVisible();
  });

  test('should display Monaco editor with syntax highlighting', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('[data-testid="yaml-editor"]');
    await expect(editor).toBeVisible();

    const monacoContainer = page.locator('.monaco-editor');
    await expect(monacoContainer).toBeVisible();
  });

  test('should validate YAML and show errors', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.invalidPodMissingField);

    await page.click('button:has-text("Dry Run")');

    await page.waitForSelector('[data-testid="validation-error"]', { timeout: 5000 });

    const errors = page.locator('[data-testid="validation-error"]');
    await expect(errors.first()).toBeVisible();
  });

  test('should show validation success for valid YAML', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.validPod);

    await page.click('button:has-text("Dry Run")');

    await page.waitForSelector('[data-testid="validation-success"]', { timeout: 5000 });

    const successMessage = page.locator('[data-testid="validation-success"]');
    await expect(successMessage).toBeVisible();
  });

  test('should show Secret encoding controls for Secret resources', async ({ page }) => {
    await page.goto('/secrets');
    await page.waitForSelector('[data-testid="secret-row"]', { timeout: 10000 });

    const firstSecret = page.locator('[data-testid="secret-row"]').first();
    await firstSecret.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const encodeButton = page.locator('button:has-text("Encode All")');
    const decodeButton = page.locator('button:has-text("Decode All")');
    const hideButton = page.locator('button:has-text("Hide Values")');

    await expect(encodeButton).toBeVisible();
    await expect(decodeButton).toBeVisible();
    await expect(hideButton).toBeVisible();
  });

  test('should encode stringData to base64', async ({ page }) => {
    await page.goto('/secrets');
    await page.waitForSelector('[data-testid="secret-row"]', { timeout: 10000 });

    const firstSecret = page.locator('[data-testid="secret-row"]').first();
    await firstSecret.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.validSecretStringData);

    await page.click('button:has-text("Encode All")');

    const editorContent = await page.locator('.view-lines').textContent();

    expect(editorContent).toContain('data:');
    expect(editorContent).not.toContain('stringData:');
  });

  test('should decode base64 data to stringData', async ({ page }) => {
    await page.goto('/secrets');
    await page.waitForSelector('[data-testid="secret-row"]', { timeout: 10000 });

    const firstSecret = page.locator('[data-testid="secret-row"]').first();
    await firstSecret.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.validSecret);

    await page.click('button:has-text("Decode All")');

    const editorContent = await page.locator('.view-lines').textContent();

    expect(editorContent).toContain('stringData:');
    expect(editorContent).not.toContain('data:');
  });

  test('should show warning for unencoded stringData on save', async ({ page }) => {
    await page.goto('/secrets');
    await page.waitForSelector('[data-testid="secret-row"]', { timeout: 10000 });

    const firstSecret = page.locator('[data-testid="secret-row"]').first();
    await firstSecret.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.validSecretStringData);

    await page.click('button:has-text("Save")');

    await page.waitForSelector('[data-testid="warning-banner"]', { timeout: 3000 });

    const warningBanner = page.locator('[data-testid="warning-banner"]');
    await expect(warningBanner).toBeVisible();
    await expect(warningBanner).toContainText('Unencoded');
  });

  test('should show diff mode for changes', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.originalYaml);

    await page.click('button:has-text("Diff")');

    await page.waitForSelector('[data-testid="diff-mode"]', { timeout: 3000 });

    const diffMode = page.locator('[data-testid="diff-mode"]');
    await expect(diffMode).toBeVisible();

    const addedLines = page.locator('[data-testid="diff-line-added"]');
    const removedLines = page.locator('[data-testid="diff-line-removed"]');

    await expect(addedLines.count()).resolves.toBeGreaterThan(0);
    await expect(removedLines.count()).resolves.toBeGreaterThan(0);
  });

  test('should format YAML with Beautify button', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.minifiedYaml);

    const beforeFormat = await page.locator('.view-lines').textContent();

    await page.click('button:has-text("Beautify")');

    await page.waitForTimeout(1000);

    const afterFormat = await page.locator('.view-lines').textContent();

    expect(afterFormat).not.toBe(beforeFormat);
    expect(afterFormat).toContain('  ');
    expect(afterFormat).toContain('\n');
  });

  test('should minify YAML with Minify button', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.validPod);

    const beforeMinify = await page.locator('.view-lines').textContent();

    await page.click('button:has-text("Minify")');

    await page.waitForTimeout(1000);

    const afterMinify = await page.locator('.view-lines').textContent();

    expect(afterMinify).not.toBe(beforeMinify);
    expect(afterMinify).not.toContain('  ');
  });

  test('should support undo operation', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    const beforeUndo = await page.locator('.view-lines').textContent();

    await page.keyboard.type('# This is a comment\n');

    await page.keyboard.press('Control+Z');

    const afterUndo = await page.locator('.view-lines').textContent();

    expect(afterUndo).toBe(beforeUndo);
  });

  test('should support redo operation', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.type('# This is a comment\n');

    const beforeUndo = await page.locator('.view-lines').textContent();

    await page.keyboard.press('Control+Z');

    const afterUndo = await page.locator('.view-lines').textContent();

    expect(afterUndo).not.toBe(beforeUndo);

    await page.keyboard.press('Control+Y');

    const afterRedo = await page.locator('.view-lines').textContent();

    expect(afterRedo).toBe(beforeUndo);
  });

  test('should use keyboard shortcuts for undo/redo', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    const beforeEdit = await page.locator('.view-lines').textContent();

    await page.keyboard.type('# Comment\n# Another\n');

    await page.keyboard.press('Meta+Z');

    const afterUndo = await page.locator('.view-lines').textContent();

    expect(afterUndo).not.toContain('# Another');

    await page.keyboard.press('Meta+Shift+Z');

    const afterRedo = await page.locator('.view-lines').textContent();

    expect(afterRedo).toContain('# Another');
  });

  test('should save YAML changes successfully', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const editor = page.locator('.view-lines');

    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(yamlFixtures.validConfigMap);

    await page.click('button:has-text("Save")');

    await page.waitForSelector('[data-testid="toast-success"]', { timeout: 5000 });

    const toast = page.locator('[data-testid="toast-success"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('saved');
  });

  test('should show template dropdown for creating new resources', async ({ page }) => {
    await page.goto('/namespaces/create');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const templateSelect = page.locator('[data-testid="template-select"]');
    await expect(templateSelect).toBeVisible();

    await templateSelect.click();

    const templates = page.locator('option');
    const templateCount = await templates.count();

    expect(templateCount).toBeGreaterThan(0);
  });

  test('should load selected template into editor', async ({ page }) => {
    await page.goto('/namespaces/create');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    const templateSelect = page.locator('[data-testid="template-select"]');
    await templateSelect.selectOption('Deployment');

    await page.waitForTimeout(1000);

    const editorContent = await page.locator('.view-lines').textContent();

    expect(editorContent).toContain('kind: Deployment');
  });

  test('should support Find and Replace', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    await page.click('button:has-text("Find")');

    const findInput = page.locator('input[placeholder*="Find"]');
    await expect(findInput).toBeVisible();
  });

  test('should preview YAML in read-only mode', async ({ page }) => {
    const firstRow = page.locator('[data-testid="namespace-row"]').first();
    await firstRow.click();

    await page.click('button:has-text("View YAML")');

    await page.waitForSelector('[data-testid="yaml-editor"]', { timeout: 10000 });

    await page.click('button:has-text("Preview")');

    await page.waitForSelector('[data-testid="preview-mode"]', { timeout: 3000 });

    const previewMode = page.locator('[data-testid="preview-mode"]');
    await expect(previewMode).toBeVisible();

    const previewContent = page.locator('pre');
    await expect(previewContent).toBeVisible();
  });
});
