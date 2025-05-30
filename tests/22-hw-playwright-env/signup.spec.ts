import { test, expect, Page } from '@playwright/test';
import { BasePage } from './pageObjects/BasePage';
import { SignupModal } from './pageObjects/SignupModal';

test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.open();  
});

test('Successful user creation', async ({ page }) => {
    const signupModal = new SignupModal(page);

    await signupModal.navigateTo();
    await signupModal.fillName();
    await signupModal.fillLastname();
    await signupModal.fillEmail();
    await signupModal.fillPassword();
    await signupModal.fillRepeatPassword();
    await signupModal.clickRegister();
    await expect(page.getByText('Registration complete')).toBeVisible();
});

test('Check error when name field is empty', async ({ page }) => {
    const signupModal = new SignupModal(page);

    await signupModal.navigateTo();
    await signupModal.clickOnName();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Name required', { exact: true })).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});

test('Check error when name field is filled with invalid symbol', async ({ page }) => {
    const signupModal = new SignupModal(page);

    await signupModal.navigateTo();
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
    const signupModal = new SignupModal(page);
    
    await signupModal.navigateTo();
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
    const signupModal = new SignupModal(page);

    await signupModal.navigateTo();
    await signupModal.clickOnLastname();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Last name required', { exact: true })).toBeVisible();
    await expect(page.locator(`#signupLastName`)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});

test('Check error when last name field is filled with invalid symbol', async ({ page }) => {
    const signupModal = new SignupModal(page);

    await signupModal.navigateTo();
    await page.locator(`#signupLastName`).fill('12');
    await page.keyboard.press('Tab');
    await expect(page.getByText('Last name is invalid', { exact: true })).toBeVisible();
    await expect(page.locator(`#signupLastName`)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
    );
    await expect(page.locator(`.modal-footer > .btn`)).toBeDisabled();
});
