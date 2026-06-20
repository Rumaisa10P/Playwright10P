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