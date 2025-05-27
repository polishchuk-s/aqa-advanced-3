import { Page } from "@playwright/test";

export class BasePage {
    constructor (page, url) {
        this.page = page;
        this.url = url;
    };
    async open () {
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    };
};