import { Page } from "@playwright/test";
import { emailForSignup } from '../emailForSignup.page';

export class SignupModal {
    constructor (page) {
        this.page = page;
    };

    async navigateTo () {
        await this.page.locator(`button[class*="hero"]`).click();
    };
    async fillName () {
        await this.page.locator('#signupName').fill('John');
    };
    async clickOnName () {
        await this.page.locator('#signupName').click();
    };
    async fillLastname () {
        await this.page.locator('#signupLastName').fill('Doe');
    };
    async clickOnLastname () {
        await this.page.locator('#signupLastName').click();
    };
    async fillEmail () {
        await this.page.locator('#signupEmail').fill(await emailForSignup());
    };
    async fillPassword () {
        await this.page.locator('#signupPassword').fill('abcD1234');
    };
    async fillRepeatPassword () {
        await this.page.locator('#signupRepeatPassword').fill('abcD1234');
    };
    async clickRegister () {
        await this.page.getByRole('button', { name: 'Register' }).click();
    };

};