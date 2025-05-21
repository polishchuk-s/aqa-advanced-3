import { test, expect, Page } from '@playwright/test';
import { emailForSignup } from './emailForSignup.page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
});

test('Successful user creation', async ({ page }) => {
    await page.locator(`button[class*="hero"]`).click();
    await page.locator('#signupName').fill('John');
    await page.locator('#signupLastName').fill('Doe');
    await page.locator('#signupEmail').fill(await emailForSignup());
    await page.locator('#signupPassword').fill('abcD1234');
    await page.locator('#signupRepeatPassword').fill('abcD1234');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('Registration complete')).toBeVisible();
});

test('Check error when name field is empty', async ({ page }) => {
    await page.locator(`button[class*="hero"]`).click();
    await page.locator('#signupName').click();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Name required', { exact: true })).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});

test('Check error when name field is filled with invalid symbol', async ({ page }) => {
    await page.locator(`button[class*="hero"]`).click();
    await page.locator(`#signupName`).fill('a');
    await page.keyboard.press('Tab');
    await expect(page.getByText('Name has to be from 2 to 20')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});

test('Check error when name in field is too long', async ({ page }) => {
    await page.locator(`button[class*="hero"]`).click();
    await page.locator(`#signupName`).fill('abcdabcdabcdabcdabcda');
    await page.keyboard.press('Tab');
    await expect(page.getByText('Name has to be from 2 to 20')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});

test('Check error when last name field is empty', async ({ page }) => {
    await page.locator(`button[class*="hero"]`).click();
    await page.locator(`#signupLastName`).click();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Last name required', { exact: true })).toBeVisible();
    await expect(page.locator(`#signupLastName`)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});

test('Check error when last name field is filled with invalid symbol', async ({ page }) => {
    await page.locator(`button[class*="hero"]`).click();
    await page.locator(`#signupLastName`).fill('12');
    await page.keyboard.press('Tab');
    await expect(page.getByText('Last name is invalid', { exact: true })).toBeVisible();
    await expect(page.locator(`#signupLastName`)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});
