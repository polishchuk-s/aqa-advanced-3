import { test as setup, expect } from '@playwright/test';
import { BasePage } from './pageObjects/BasePage';
import { config } from '../../playwright.config';

const authFile = 'tests/23-hw-playwright-fixtures/auth/auth.json';

setup ('authenticate', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.open(); 

    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(`${config.credentials.email}`);
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill(`${config.credentials.password}`);
    await page.getByRole('checkbox', { name: 'Remember me' }).check();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect.soft(page.getByText('You have been successfully')).toBeVisible();
    await page.context().storageState({ path: authFile });
    await page.close();
})