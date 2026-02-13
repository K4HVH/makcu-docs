import { test, expect } from '@playwright/test';

test.describe('Combobox behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Navigate to the Combobox demo section via sidebar
    await page.evaluate(() => {
      const activeContent = document.querySelector('.pane--permanent .pane__content--active');
      const tabs = activeContent!.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      for (const t of tabs) {
        if (t.getAttribute('aria-label') === 'Combobox' || t.textContent?.trim() === 'Combobox') { t.click(); return; }
      }
    });
  });

  test('disabled options cannot be clicked and do not close dropdown', async ({ page }) => {
    // Scroll to top first to ensure clean positioning
    await page.evaluate(() => window.scrollTo(0, 0));

    // Find the "With Disabled Options" combobox - scroll to it first
    const comboboxCard = page.locator('.card', { hasText: 'With Disabled Options' }).first();
    await comboboxCard.scrollIntoViewIfNeeded();

    const trigger = comboboxCard.locator('.combobox__trigger');

    // Open the dropdown
    await trigger.click();

    // Wait for dropdown to appear
    await page.waitForSelector('.combobox__dropdown', { state: 'visible' });

    // Get the initial selected value
    const selectedTextBefore = await comboboxCard.locator('small').textContent();

    // Try to click the disabled option (Bookmark) - use force since it may be overlapped
    const disabledOption = page.locator('.combobox__option--disabled').filter({ hasText: 'Bookmark' });
    await disabledOption.click({ force: true });

    // Wait a bit for any potential state changes
    await page.waitForTimeout(100);

    // Dropdown should still be visible (not closed)
    const dropdown = page.locator('.combobox__dropdown');
    await expect(dropdown).toBeVisible();

    // Selected value should not have changed
    const selectedTextAfter = await comboboxCard.locator('small').textContent();
    expect(selectedTextAfter).toBe(selectedTextBefore);

    // Now click a non-disabled option to verify normal behavior works
    const enabledOption = page.locator('.combobox__option').filter({ hasText: 'Star' }).first();
    await enabledOption.click();

    // Dropdown should close
    await expect(dropdown).not.toBeVisible();

    // Selected value should have changed
    const selectedTextFinal = await comboboxCard.locator('small').textContent();
    expect(selectedTextFinal).toContain('star');
  });

  test('dropdown position updates when scrolling', async ({ page }) => {
    // Scroll the page to top first to ensure clean state
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Find the "Long List" combobox
    const comboboxCard = page.locator('.card', { hasText: 'Long List' }).first();
    await comboboxCard.scrollIntoViewIfNeeded();

    const trigger = comboboxCard.locator('.combobox__trigger');

    // Open the dropdown
    await trigger.click();

    // Wait for dropdown to appear
    await page.waitForSelector('.combobox__dropdown', { state: 'visible' });

    // Wait for menu positioning to complete (Menu uses RAF for positioning)
    await page.waitForTimeout(100);

    // Get the menu container (what's actually positioned by Menu component)
    const menu = page.locator('.menu').filter({ has: page.locator('.combobox__dropdown') });
    await expect(menu).toBeVisible();
    const initialMenuBox = await menu.boundingBox();
    const initialTriggerBox = await trigger.boundingBox();
    expect(initialMenuBox).not.toBeNull();
    expect(initialTriggerBox).not.toBeNull();

    // Determine if menu is above or below trigger (auto-flip may place it either way)
    const isAbove = initialMenuBox!.y < initialTriggerBox!.y;

    // Calculate offset based on placement
    let initialOffset: number;
    if (isAbove) {
      // Menu is above: measure gap from menu bottom to trigger top
      initialOffset = initialTriggerBox!.y - (initialMenuBox!.y + initialMenuBox!.height);
    } else {
      // Menu is below: measure gap from trigger bottom to menu top
      initialOffset = initialMenuBox!.y - (initialTriggerBox!.y + initialTriggerBox!.height);
    }

    // Gap should be approximately 4px
    expect(Math.abs(initialOffset - 4)).toBeLessThan(10);

    // Scroll the page down
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(200); // Wait for scroll event handlers

    // Get new positions after scrolling
    const newMenuBox = await menu.boundingBox();
    const newTriggerBox = await trigger.boundingBox();
    expect(newMenuBox).not.toBeNull();
    expect(newTriggerBox).not.toBeNull();

    // Calculate new offset - should maintain same relationship (above or below)
    let newOffset: number;
    if (isAbove) {
      // Should still be above
      newOffset = newTriggerBox!.y - (newMenuBox!.y + newMenuBox!.height);
      expect(newMenuBox!.y).toBeLessThan(newTriggerBox!.y);
    } else {
      // Should still be below
      newOffset = newMenuBox!.y - (newTriggerBox!.y + newTriggerBox!.height);
      expect(newMenuBox!.y).toBeGreaterThan(newTriggerBox!.y + newTriggerBox!.height);
    }

    // Gap should still be approximately 4px
    expect(Math.abs(newOffset - 4)).toBeLessThan(10);
  });
});
