import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class NewsletterComponent extends BasePage {
    private readonly form = '#hubspot-form-site-footer form';
    private readonly emailInput = 'input[type="email"]';
    private readonly submitButton = '.hs_submit input[type="submit"]';
    private readonly subscribeSuccessMessage = 'main h1';
    private readonly subscribeDetailedMessage = 'main h1+p';
    private readonly errorMessage = '[role="alert"] .hs-error-msg';

    constructor(page: Page) {
        super(page);
    }

    async isFormVisible() {
        return await this.isVisible(this.form);
    }

    async submitForm(email: string) {
        // Scroll to form
        await this.page.locator(this.emailInput).scrollIntoViewIfNeeded();
        
        await this.fill(this.emailInput, email);
        await this.page.locator(this.submitButton).click();
    }

    async isSuccessMessageVisible() {
        return await this.isVisible(this.subscribeSuccessMessage);
    }

    async isDetailedSuccessMessageVisible() {
        return await this.isVisible(this.subscribeDetailedMessage);
    }

    async getSuccessMessage() {
        return await this.getText(this.subscribeSuccessMessage);
    }

    async getDetailedSuccessMessage() {
        return await this.getText(this.subscribeDetailedMessage);
    }

    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }
} 