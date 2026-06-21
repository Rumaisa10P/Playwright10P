import { test, expect } from '@playwright/test';

test.describe('As a user I should be able to login successfully', () => {
    test.use({ storageState: 'playwright/.auth/authentication.json' });

    test('Verify that user can login successfully', async ({ page }) => {
        // Navigate to the logged-in page — auth state from setup is already applied
        await page.goto('https://practicetestautomation.com/logged-in-successfully/');

        // Assertions
        await expect(page).toHaveURL(/logged-in-successfully/);
        await expect(page.locator('p.has-text-align-center')).toContainText('Congratulations student. You successfully logged in!');
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    });
});
