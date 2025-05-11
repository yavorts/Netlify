import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ENV } from '../config/environment';
import { NewsletterComponent } from './components/newsletter.component';
import { NavigationComponent } from './components/navigation.component';

export class HomePage extends BasePage {
    readonly newsletter: NewsletterComponent;
    readonly navigation: NavigationComponent;

    constructor(page: Page) {
        super(page);
        this.newsletter = new NewsletterComponent(page);
        this.navigation = new NavigationComponent(page);
    }

    async navigate() {
        await super.navigate(ENV.paths.home);
    }

 
} 