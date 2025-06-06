import { expect } from '@playwright/test';
import { test } from './fixture/userGaragePage';

test('Should be possible to add a car', async ({ userGaragePage }) => { 
    const page = userGaragePage;

    await page.getByRole('button', { name: 'Add car' }).click();
    await page.getByLabel('Brand').selectOption('1: 2');
    await page.locator('#addCarModel').selectOption('X5');
    await page.getByRole('spinbutton', { name: 'Mileage' }).fill('100000');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Car added')).toBeVisible();
});