import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1400, height: 980 } })
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Compare with base snapshot
  await expect(page).toHaveScreenshot()
});

