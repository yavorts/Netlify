import { test, expect } from '../fixtures/test-fixtures';
import { TEST_DATA } from '../fixtures/test-data';
import { isValidEmail, getCurrentUrl } from '../../utils/helpers';

test.describe('Newsletter Form Validation', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    });

    test('should display newsletter form', async ({ homePage }) => {
        const isFormVisible = await homePage.newsletter.isFormVisible();
        expect(isFormVisible).toBeTruthy();
    });

    test('should submit form with valid email', async ({ homePage }) => {
        await homePage.newsletter.submitForm(TEST_DATA.validEmail);
        // Verify URL contains success path
        const currentUrl = await homePage.getCurrentUrl();
        expect(currentUrl).toContain('thanks-for-signing-up');
        // Verify success message is visible
        const isSuccessVisible = await homePage.newsletter.isSuccessMessageVisible();
        expect(isSuccessVisible).toBeTruthy();

        // Verify detailed success message is visible
        const isDetailedSuccessVisible = await homePage.newsletter.isDetailedSuccessMessageVisible();
        expect(isDetailedSuccessVisible).toBeTruthy();

        // Verify success message content
        const successMessage = await homePage.newsletter.getSuccessMessage();
        expect(successMessage).toBe(TEST_DATA.successMessage);

        // Verify detailed success message content
        const detailedSuccessMessage = await homePage.newsletter.getDetailedSuccessMessage();
        expect(detailedSuccessMessage).toBe(TEST_DATA.detailedSuccessMessage);
    });

    test('should show error with invalid email', async ({ homePage }) => {
        for (const email of TEST_DATA.invalidEmails) {
            await homePage.newsletter.submitForm(email);
            const errorMessage = await homePage.newsletter.getErrorMessage();
            expect(errorMessage).toBe(TEST_DATA.errorMessage);
            expect(isValidEmail(email)).toBeFalsy();
        }
    });
}); 