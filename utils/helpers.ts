import { Page } from '@playwright/test';

export async function checkUrlAccessibility(page: Page, url: string): Promise<boolean> {
    try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
        return response?.status() === 200;
    } catch (error) {
        return false;
    }
}

export async function hasNoIndexMetaTag(page: Page): Promise<boolean> {
    const metaRobots = await page.$('meta[name="robots"]');
    if (!metaRobots) return false;
    
    const content = await metaRobots.getAttribute('content');
    return content?.toLowerCase().includes('noindex') || false;
}

export async function getSitemapUrls(page: Page): Promise<string[]> {
    const response = await page.goto('https://www.netlify.com/sitemap.xml');
    const content = await response?.text() || '';
    
    // Simple XML parsing to extract URLs
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls: string[] = [];
    let match;
    
    while ((match = urlRegex.exec(content)) !== null) {
        urls.push(match[1]);
    }
    
    return urls;
}



export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function checkLinkStatus(page: Page, url: string): Promise<number> {
    try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
        return response?.status() || 0;
    } catch (error) {
        return 0;
    }
} 