import { Page } from "@playwright/test";
import { config } from "../../../playwright.config";

export class BasePage {
    constructor (page, url) {
        this.page = page;
        this.url = config.baseUrl;
    };
    async open () {
        await this.page.goto(this.url);
    };
};