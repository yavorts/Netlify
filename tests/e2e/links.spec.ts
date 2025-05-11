import { test, expect } from '../fixtures/test-fixtures';
import { TEST_DATA } from '../fixtures/test-data';
import { checkLinkStatus } from '../../utils/helpers';

test.describe('404 Link Verification', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    });

    test('should not have 404 links on home page', async ({ homePage, page }) => {
        const links = await homePage.navigation.getAllLinks();
        const netlifyLinks = links.filter(link => 
            link.href.startsWith('https://www.netlify.com/') || 
            link.href.startsWith('/')
        );

        for (const link of netlifyLinks) {
            const url = link.href.startsWith('/') 
                ? `https://www.netlify.com${link.href}`
                : link.href;
            
            const status = await checkLinkStatus(page, url);
            expect(status).not.toBe(404);
        }
    });

    test('should verify navigation links', async ({ page }) => {
        for (const path of TEST_DATA.navigationLinks) {
            const url = `https://www.netlify.com${path}`;
            const status = await checkLinkStatus(page, url);
            expect(status).toBe(200);
        }
    });

    test('should check footer links', async ({ page }) => {
        for (const path of TEST_DATA.footerLinks) {
            const url = `https://www.netlify.com${path}`;
            const status = await checkLinkStatus(page, url);
            expect(status).toBe(200);
        }
    });
}); 