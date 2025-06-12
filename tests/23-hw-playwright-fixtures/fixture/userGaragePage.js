import { test as base } from '@playwright/test';
import { config } from '../../../playwright.config';

export const test = base.extend({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'tests/23-hw-playwright-fixtures/auth/auth.json',
        });

        const garageUrl = config.garageUrl;

        const page = await context.newPage();
        await page.goto(garageUrl);
        await use(page);
        await page.close();
        await context.close();
    },
});