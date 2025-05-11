export const TEST_DATA = {
    validEmail: 'test@example.com',
    invalidEmails: [
        'invalid-email',
        'test@',
        '@example.com',
        'test@example',
        ''
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
    successMessage: 'Thank you for subscribing to our newsletter!',
    detailedSuccessMessage: 'You’ve been added to our list. Check your email for a confirmation link. You can unsubscribe at any time.',
    errorMessage: 'Email must be formatted correctly.'
    
} as const;
