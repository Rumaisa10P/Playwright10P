import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import { USERNAME } from '../Fixtures/constants';

test('Locators', async ({ page }) => {
  
await page.goto("https://practicetestautomation.com/practice-test-login/");


// await page.getByRole('textbox',{name:'username'}).fill("rumaisa");
// await page.getByRole('textbox',{name:'password'}).fill("123");
// await page.getByRole('button',{name:'Submit'}).click();

// await expect(page.getByRole('textbox',{name:'username'})).toBeVisible();
// await expect(page.getByRole('textbox',{name:'password'})).toBeVisible();
// await expect(page.getByRole('button',{name:'Submit'})).toBeEnabled();

//==================================================================================

const loginpage = new LoginPage(page);
await loginpage.enterusername(USERNAME);
await loginpage.enterpassword("Password123");
await loginpage.btnclick();
await expect(loginpage.validation).toBeVisible();
await expect(loginpage.validation).toContainText("Your username is invalid!");





});