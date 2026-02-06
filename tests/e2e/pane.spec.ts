import { test, expect } from '@playwright/test';

test.describe('Pane component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Scroll to the Pane section
    const paneSection = page.getByRole('heading', { name: 'Pane Component', exact: true });
    await paneSection.scrollIntoViewIfNeeded();
  });

  test('permanent pane renders with handle visible', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Permanent Pane with Partial State' }) });
    await section.scrollIntoViewIfNeeded();

    // Handle should be visible
    const handle = section.locator('.pane__handle').first();
    await expect(handle).toBeVisible();

    // Pane should start closed
    const pane = section.locator('.pane').first();
    await expect(pane).toHaveClass(/pane--closed/);
  });

  test('handle click cycles through states with partial', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Permanent Pane with Partial State' }) });
    await section.scrollIntoViewIfNeeded();

    const handle = section.locator('.pane__handle').first();
    const pane = section.locator('.pane').first();

    // Starts closed
    await expect(pane).toHaveClass(/pane--closed/);

    // Click → partial
    await handle.click();
    await expect(pane).toHaveClass(/pane--partial/);

    // Click → open
    await handle.click();
    await expect(pane).toHaveClass(/pane--open/);

    // Click → closed
    await handle.click();
    await expect(pane).toHaveClass(/pane--closed/);
  });

  test('right pane opens and closes', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Right Position' }) });
    await section.scrollIntoViewIfNeeded();

    const handle = section.locator('.pane__handle').first();
    const pane = section.locator('.pane').first();

    // Starts closed
    await expect(pane).toHaveClass(/pane--closed/);
    await expect(pane).toHaveClass(/pane--right/);

    // Open
    await handle.click();
    await expect(pane).toHaveClass(/pane--open/);

    // Close
    await handle.click();
    await expect(pane).toHaveClass(/pane--closed/);
  });

  test('temporary overlay pane opens with backdrop', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Temporary Overlay Pane' }) });
    await section.scrollIntoViewIfNeeded();

    // Click the open button
    const openButton = section.locator('button', { hasText: 'Open Settings Pane' });
    await openButton.click();

    // Pane should be open
    const pane = section.locator('.pane');
    await expect(pane).toHaveClass(/pane--open/);
    await expect(pane).toHaveClass(/pane--overlay/);

    // Backdrop should be visible
    const backdrop = section.locator('.pane__backdrop--visible');
    await expect(backdrop).toBeVisible();
  });

  test('temporary overlay pane closes on backdrop click', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Temporary Overlay Pane' }) });
    await section.scrollIntoViewIfNeeded();

    // Open the pane
    const openButton = section.locator('button', { hasText: 'Open Settings Pane' });
    await openButton.click();

    const pane = section.locator('.pane');
    await expect(pane).toHaveClass(/pane--open/);

    // Click the backdrop
    const backdrop = section.locator('.pane__backdrop');
    await backdrop.click({ position: { x: 5, y: 5 }, force: true });

    // Pane should be closed
    await expect(pane).toHaveClass(/pane--closed/);
  });

  test('temporary overlay pane closes on Escape', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Temporary Overlay Pane' }) });
    await section.scrollIntoViewIfNeeded();

    // Open the pane
    const openButton = section.locator('button', { hasText: 'Open Settings Pane' });
    await openButton.click();

    const pane = section.locator('.pane');
    await expect(pane).toHaveClass(/pane--open/);

    // Press Escape
    await page.keyboard.press('Escape');

    // Pane should be closed
    await expect(pane).toHaveClass(/pane--closed/);
  });

  test('top and bottom panes have correct position classes', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Top & Bottom Positions' }) });
    await section.scrollIntoViewIfNeeded();

    const topPane = section.locator('.pane--top');
    const bottomPane = section.locator('.pane--bottom');

    await expect(topPane).toBeVisible();
    await expect(bottomPane).toBeVisible();
  });

  test('size variant panes render correctly', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Size Variants' }) }).last();
    await section.scrollIntoViewIfNeeded();

    const compactPane = section.locator('.pane--compact');
    const spaciousPane = section.locator('.pane--spacious');

    await expect(compactPane).toBeVisible();
    await expect(spaciousPane).toBeVisible();
  });

  test('pane aria-expanded reflects state', async ({ page }) => {
    const section = page.locator('.card', { has: page.locator('h3', { hasText: 'Permanent Pane with Partial State' }) });
    await section.scrollIntoViewIfNeeded();

    const pane = section.locator('.pane').first();
    const handle = section.locator('.pane__handle').first();

    // Closed - aria-expanded should be false
    await expect(pane).toHaveAttribute('aria-expanded', 'false');

    // Open it
    await handle.click();
    await expect(pane).toHaveAttribute('aria-expanded', 'true');
  });
});
