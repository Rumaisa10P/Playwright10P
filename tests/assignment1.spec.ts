import { test, expect } from '@playwright/test';


test('Test case 1: Positive LogIn test', async ({ page }) => {
  
await page.goto("https://practicetestautomation.com/practice-test-login/");


await page.getByRole('textbox',{name:'username'}).fill("student");
await page.getByRole('textbox',{name:'password'}).fill("Password123");
await page.getByRole('button',{name:'Submit'}).click();

await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully\//);
await expect(page.locator("p.has-text-align-center")).toContainText("Congratulations student. You successfully logged in!");
await expect(page.getByRole('link',{name:'Log out'})).toBeVisible();

});

test('Test case 2: Negative username test', async ({ page }) => {
  
await page.goto("https://practicetestautomation.com/practice-test-login/");


await page.getByRole('textbox',{name:'username'}).fill("incorrectUser");
await page.getByRole('textbox',{name:'password'}).fill("Password123");
await page.getByRole('button',{name:'Submit'}).click();

await expect(page.locator("#error")).toBeVisible();
await expect(page.locator("#error")).toContainText("Your username is invalid!");

});
test('Test case 3: Negative password test', async ({ page }) => {
  
await page.goto("https://practicetestautomation.com/practice-test-login/");


await page.getByRole('textbox',{name:'username'}).fill("student");
await page.getByRole('textbox',{name:'password'}).fill("incorrectPassword");
await page.getByRole('button',{name:'Submit'}).click();

await expect(page.locator("#error")).toBeVisible();
await expect(page.locator("#error")).toContainText("Your password is invalid!");

});