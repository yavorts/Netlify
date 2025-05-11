import { test, expect } from '../fixtures/test-fixtures';
import { TEST_DATA } from '../fixtures/test-data';
import { getSitemapUrls, checkUrlAccessibility, hasNoIndexMetaTag } from '../../utils/helpers';

test.describe('Sitemap and Crawlability Verification', () => {
    test('should have accessible sitemap.xml', async ({ page }) => {
        const sitemapUrl = 'https://www.netlify.com/sitemap.xml';
        const isAccessible = await checkUrlAccessibility(page, sitemapUrl);
        expect(isAccessible).toBeTruthy();
    });

    test('should have valid URLs in sitemap', async ({ page }) => {
        const urls = await getSitemapUrls(page);
        expect(urls.length).toBeGreaterThan(0);

        // Check first 5 URLs to avoid long test execution
        const sampleUrls = urls.slice(0, 5);
        for (const url of sampleUrls) {
            const isAccessible = await checkUrlAccessibility(page, url);
            expect(isAccessible).toBeTruthy();
        }
    });

    test('should not have noindex meta tags on important pages', async ({ page }) => {
        for (const path of TEST_DATA.navigationLinks) {
            await page.goto(`https://www.netlify.com${path}`);
            const hasNoIndex = await hasNoIndexMetaTag(page);
            expect(hasNoIndex).toBeFalsy();
        }
    });

    test('should have crawlable important pages', async ({ page }) => {
        for (const path of TEST_DATA.navigationLinks) {
            const url = `https://www.netlify.com${path}`;
            const isAccessible = await checkUrlAccessibility(page, url);
            expect(isAccessible).toBeTruthy();
        }
    });
}); 