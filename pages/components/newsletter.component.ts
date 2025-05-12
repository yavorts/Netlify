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

    async waitForFormToBeHidden() {
        await this.page.waitForSelector(this.form, { state: 'hidden' });
    }

    async submitForm(email: string) {
        
        // Fill email with explicit wait
        await this.page.waitForSelector(this.emailInput, { state: 'visible' });
        await this.fill(this.emailInput, email);
        
        // Click submit with explicit wait and force option
        await this.page.waitForSelector(this.submitButton, { state: 'visible' });
        await this.page.click(this.submitButton);
        
        // Wait for navigation or success message
        await this.page.waitForLoadState('networkidle');
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