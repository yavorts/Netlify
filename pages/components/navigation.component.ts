import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class NavigationComponent extends BasePage {
    private readonly navLinks = 'header nav a';
    private readonly footerLinks = 'footer a';

    constructor(page: Page) {
        super(page);
    }

    async getNavigationLinks() {
        return await this.page.$$eval(this.navLinks, links =>
            links.map(link => ({
                href: (link as HTMLAnchorElement).href,
                text: link.textContent?.trim() || ''
            }))
        );
    }

    async getFooterLinks() {
        return await this.page.$$eval(this.footerLinks, links =>
            links.map(link => ({
                href: (link as HTMLAnchorElement).href,
                text: link.textContent?.trim() || ''
            }))
        );
    }

    async getAllLinks() {
        return await this.page.$$eval('a', links => 
            links.map(link => ({
                href: (link as HTMLAnchorElement).href,
                text: link.textContent?.trim() || ''
            }))
        );
    }
} 