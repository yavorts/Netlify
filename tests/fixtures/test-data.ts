export const TEST_DATA = {
    validEmail: 'validuser@gmail.com',
    invalidEmails: [
        'invalid-email',
        'test@',
        '@example.com',
        'test@example',
    ],
    navigationLinks: [
        '/pricing',
        '/features',
        '/blog',
        '/docs',
        '/support'
    ],
    footerLinks: [
        '/about',
        '/careers',
        '/contact',
        '/legal',
        '/privacy'
    ],
    successMessage: 'Thank you for signing up!',
    detailedSuccessMessage: 'We are looking forward to keep you posted with updates and interesting articles.',
    errorMessage: 'Please complete this required field.',
    errorMessageForInvalidFormat: 'Email must be formatted correctly.'
    
} as const;
