import { Page } from '@playwright/test';
import { ENV } from '../config/environment';

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = ENV.baseUrl;
    }

    protected async navigate(path = '/') {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    protected async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    protected async getText(selector: string) {
        return await this.page.textContent(selector);
    }

    protected async isVisible(selector: string) {
        return await this.page.isVisible(selector);
    }

    protected async click(selector: string) {
        await this.waitForSelector(selector);
        await this.page.click(selector);
    }

    protected async fill(selector: string, value: string) {
        await this.waitForSelector(selector);
        await this.page.fill(selector, value);
    }

    public async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
} 