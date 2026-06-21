import { Page, expect } from '@playwright/test';

export async function loginUser(page: Page, username: string | undefined, password: string | undefined) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const loginUrl = process.env.LOGIN_URL || 'https://practicetestautomation.com/practice-test-login/';

  try {
    // Navigate to login page
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

    // Enter credentials
    await page.getByRole('textbox', { name: 'username' }).fill(username);
    await page.getByRole('textbox', { name: 'password' }).fill(password);
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for successful login
    await page.waitForURL('**/logged-in-successfully/**', { timeout: 10000 });
    await expect(page.locator("p.has-text-align-center")).toContainText('Congratulations');

    console.log('✓ Login successful for user:', username);
  } catch (error: any) {
    throw new Error(`Login failed for user ${username}: ${error.message}`);
  }
}
