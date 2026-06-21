import { test, expect, Page } from '@playwright/test';
import baseUrl from '../Fixtures/baseURL.json';

const loginUrl = `${baseUrl.baseUrl}${baseUrl.loginUrl}`;

test('Valid login using environment variables', async ({ page }) => {
  await navigateToSite(page);
  await enterCredentials(page, process.env.USERNAME!, process.env.PASSWORD!);
  await verifySuccessfulLogin(page, process.env.EXPECTED_URL!, process.env.EXPECTED_MESSAGE!);
});

test('Invalid login shows error message', async ({ page }) => {
  await navigateToSite(page);
  await enterCredentials(page, process.env.INVALID_USERNAME!, process.env.INVALID_PASSWORD!);
  await verifyFailedLogin(page, process.env.EXPECTED_ERROR!);
});

async function navigateToSite(page: Page) {
  await page.goto(loginUrl);
}

async function enterCredentials(page: Page, username: string, password: string) {
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Submit' }).click();
}

async function verifySuccessfulLogin(page: Page, expectedUrl: string, expectedMessage: string) {
  await expect(page).toHaveURL(expectedUrl);
  await expect(page.locator('strong')).toContainText(expectedMessage);
}

async function verifyFailedLogin(page: Page, expectedError: string) {
  await expect(page.locator('#error')).toContainText(expectedError);
}

// ============================================
// ASSIGNMENT 2: Tests Using Stored Authentication State
// ============================================
// These tests use the authentication saved from auth.setup.ts
// The storageState is automatically applied, so users start as logged-in

test.describe('Authenticated User Tests - Using Stored Session', () => {
  // Apply stored authentication to all tests in this block
  test.use({ storageState: 'playwright/.auth/authentication.json' });

  test('Verify user is logged in when accessing home page', async ({ page }) => {
    // Navigate to logged-in page - should work because we're authenticated
    await page.goto('https://practicetestautomation.com/logged-in-successfully/');

    // Verify success message (proof of being logged in)
    const successMessage = page.locator('p.has-text-align-center');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Congratulations');
  });

  test('Verify logout link is available for authenticated user', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/logged-in-successfully/');

    // Check that logout link is visible
    const logoutLink = page.getByRole('link', { name: 'Log out' });
    await expect(logoutLink).toBeVisible();
  });

  test('Verify user can navigate within logged-in area', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/logged-in-successfully/');

    // Verify correct URL
    expect(page.url()).toContain('logged-in-successfully');

    // Verify page content is accessible
    await expect(page.locator('body')).toBeTruthy();
  });
});