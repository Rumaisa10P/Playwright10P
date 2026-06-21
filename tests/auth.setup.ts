import { test as setup, expect, Page } from '@playwright/test';
import { loginUser } from '../helpers/loginHelper';

const authFile = 'playwright/.auth/authentication.json';

/**
 * Setup: Login and save authentication state
 * This setup runs before all tests and stores the user session in a JSON file
 * Tests can then reuse this session via storageState instead of logging in repeatedly
 */
setup('Login and save authentication state', async ({ page }) => {
  try {
    // Login using valid credentials from environment variables
    const username = process.env.USERNAME || 'student';
    const password = process.env.PASSWORD || 'Password123';

    await loginUser(page, username, password);

    // Save authentication state (cookies + sessionStorage) to file
    await page.context().storageState({ path: authFile });
    console.log('✓ Authentication state saved to file:', authFile);
  } catch (error) {
    throw new Error(`Setup failed to login and save auth state: ${error}`);
  }
});
