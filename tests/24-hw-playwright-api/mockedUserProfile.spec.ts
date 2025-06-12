import { test, expect, Page, request } from '@playwright/test';
import { BasePage } from './pageObjects/BasePage';
import { config } from '../../playwright.config';

test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.open();  
});

test('User should be able to signin and see mocked profile name', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(`${config.credentials.email}`);
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(`${config.credentials.password}`);
  await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await page.getByRole('button', { name: 'Login' }).click();

  await page.route(`https://qauto.forstudy.space/api/users/profile`, async route => {
      const response = await route.fetch();
      const json = {
        status: "ok",
        data: {
        userId: 1,
        photoFilename: "default-user.png",
        name: "Jim",
        lastName: "Newman"
        }
      };
      await route.fulfill({response, json});
    });

  await page.getByRole('link', { name: ' Profile' }).click();
  await expect(page.locator('app-profile')).toContainText('Jim Newman');
});