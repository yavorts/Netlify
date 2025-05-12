import { test, expect } from '../fixtures/test-fixtures';
import { TEST_DATA } from '../fixtures/test-data';
import { isValidEmail } from '../../utils/helpers';

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
        await homePage.newsletter.waitForFormToBeHidden();
        const isFormVisible = await homePage.newsletter.isFormVisible();
        
        expect(isFormVisible).toBeFalsy();
        // Verify URL contains success path
        const currentUrl = await homePage.getCurrentUrl();
        expect(currentUrl).toContain('thanks-for-signing-up');

        // Verify success message content
        const successMessage = await homePage.newsletter.getSuccessMessage();
        expect(successMessage).toBe(TEST_DATA.successMessage);

        // Verify detailed success message content
        const detailedSuccessMessage = await homePage.newsletter.getDetailedSuccessMessage();
        expect(detailedSuccessMessage).toBe(TEST_DATA.detailedSuccessMessage);
    });

    const invalidEmailData = TEST_DATA.invalidEmails.map(email => ({
        email,
        description: `invalid email: ${email}`,
        expectedError: TEST_DATA.errorMessageForInvalidFormat
    }));

    for (const data of invalidEmailData) {
        test(`should show error with ${data.description}`, async ({ homePage }) => {
            await homePage.newsletter.submitForm(data.email);
            
            // Verify form is still visible for invalid submissions
            const isFormVisible = await homePage.newsletter.isFormVisible();
            expect(isFormVisible).toBeTruthy();
            
            const errorMessage = await homePage.newsletter.getErrorMessage();
            expect(errorMessage).toBe(data.expectedError);
            expect(isValidEmail(data.email)).toBeFalsy();
        });
    }
}); 