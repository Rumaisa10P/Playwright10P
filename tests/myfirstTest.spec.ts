import { test, expect } from '@playwright/test';
test('Verify user can open Playwright website', async ({ page }) => {
  // Navigate to website
  await page.goto('https://playwright.dev');
  // Verify page title
  await expect(page).toHaveTitle(/Playwright/);
  // Verify Get Started button is visible
  await expect(
    page.getByRole('link', { name: 'Get started' })
  ).toBeVisible();
});