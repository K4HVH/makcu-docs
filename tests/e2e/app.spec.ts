import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /hello world/i })).toBeVisible();
  });

  test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Solid App/);
  });
});
