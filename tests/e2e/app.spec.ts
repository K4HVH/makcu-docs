import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /home page/i })).toBeVisible();
    await expect(page.getByText('Welcome to your SolidJS application!')).toBeVisible();
  });

  test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Solid App/);
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Go to About');
    await expect(page.getByRole('heading', { name: /about page/i })).toBeVisible();
    await expect(page).toHaveURL(/\/about/);
  });

  test('navigates back to home from about', async ({ page }) => {
    await page.goto('/about');

    await page.click('text=Go to Home');
    await expect(page.getByRole('heading', { name: /home page/i })).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });

  test('shows 404 page for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent');

    await expect(page.getByRole('heading', { name: /404/i })).toBeVisible();
    await expect(page.getByText(/page you're looking for doesn't exist/i)).toBeVisible();
  });
});
