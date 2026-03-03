import { test, expect } from '@playwright/test';

test.describe('Titlebar component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Navigate to the Titlebar demo section via sidebar
    await page.evaluate(() => {
      const activeContent = document.querySelector('.pane--permanent .pane__content--active');
      const tabs = activeContent!.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      for (const t of tabs) {
        if (t.getAttribute('aria-label') === 'Titlebar' || t.textContent?.trim() === 'Titlebar') {
          t.click();
          return;
        }
      }
    });

    const heading = page.getByRole('heading', { name: 'Titlebar Component Examples', exact: true });
    await heading.scrollIntoViewIfNeeded();
  });

  test('renders basic titlebar with title', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const titlebar = firstCard.locator('.titlebar');
    await expect(titlebar).toBeVisible();
    await expect(titlebar.locator('.titlebar__title')).toHaveText('Dashboard');
  });

  test('renders titlebar with subtitle', async ({ page }) => {
    const cards = page.locator('.card');
    const subtitleCard = cards.nth(1);
    const titlebar = subtitleCard.locator('.titlebar');
    await expect(titlebar.locator('.titlebar__title')).toHaveText('Settings');
    await expect(titlebar.locator('.titlebar__subtitle')).toHaveText('Manage your account preferences');
  });

  test('renders left and right content', async ({ page }) => {
    const cards = page.locator('.card');
    const lrCard = cards.nth(2);
    const titlebar = lrCard.locator('.titlebar');

    await expect(titlebar.locator('.titlebar__left')).toBeVisible();
    await expect(titlebar.locator('.titlebar__right')).toBeVisible();
    await expect(titlebar.locator('.titlebar__title')).toHaveText('Project Overview');
  });

  test('renders all three variants', async ({ page }) => {
    const cards = page.locator('.card');
    const variantCard = cards.nth(5);
    await variantCard.scrollIntoViewIfNeeded();

    await expect(variantCard.locator('.titlebar--default')).toBeVisible();
    await expect(variantCard.locator('.titlebar--emphasized')).toBeVisible();
    await expect(variantCard.locator('.titlebar--subtle')).toBeVisible();
  });

  test('renders all three sizes', async ({ page }) => {
    const cards = page.locator('.card');
    const sizeCard = cards.nth(6);
    await sizeCard.scrollIntoViewIfNeeded();

    await expect(sizeCard.locator('.titlebar--compact')).toBeVisible();
    await expect(sizeCard.locator('.titlebar--spacious')).toBeVisible();
    // Normal size has no extra class — just .titlebar
    const normalTitlebar = sizeCard.locator('.titlebar').nth(1);
    await expect(normalTitlebar).not.toHaveClass(/titlebar--compact|titlebar--spacious/);
  });

  test('renders disabled state', async ({ page }) => {
    const cards = page.locator('.card');
    const disabledCard = cards.nth(7);
    await disabledCard.scrollIntoViewIfNeeded();

    const titlebar = disabledCard.locator('.titlebar');
    await expect(titlebar).toHaveClass(/titlebar--disabled/);
  });

  test('renders complex layout with multiple components', async ({ page }) => {
    const cards = page.locator('.card');
    const complexCard = cards.nth(8);
    await complexCard.scrollIntoViewIfNeeded();

    const titlebar = complexCard.locator('.titlebar');
    await expect(titlebar).toHaveClass(/titlebar--emphasized/);
    await expect(titlebar.locator('.titlebar__left')).toBeVisible();
    await expect(titlebar.locator('.titlebar__right')).toBeVisible();
    await expect(titlebar.locator('.titlebar__title')).toHaveText('Team Members');
    await expect(titlebar.locator('.titlebar__subtitle')).toHaveText('12 active members');
  });
});
