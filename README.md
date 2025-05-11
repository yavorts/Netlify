# Netlify Website Test Suite

This project contains automated tests for the Netlify website using Playwright and TypeScript.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Test Execution

Run all tests:
```bash
npx playwright test
```

Run tests with UI:
```bash
npx playwright test --ui
```

Generate HTML report:
```bash
npx playwright show-report
```

## Test Tracing

The project is configured to capture traces for all test runs. Traces include:
- Screenshots
- Network requests
- Console logs
- DOM snapshots

To view traces after running tests:
```bash
npx playwright show-trace test-results/trace.zip
```

Available trace options in `playwright.config.ts`:
- `'on'`: Capture trace for all tests
- `'off'`: Don't capture trace
- `'retain-on-failure'`: Capture trace for all tests, but remove it from successful test runs
- `'on-first-retry'`: Capture trace only when retrying a test for the first time

## Test Structure

The test suite is organized into three main test cases:

1. Lead Capture Form Validation
   - Tests the newsletter form functionality
   - Validates form submission with valid/invalid data
   - Verifies user feedback

2. Sitemap and Crawlability Verification
   - Checks sitemap.xml existence and accessibility
   - Verifies URL accessibility
   - Validates robots meta tags
   - Ensures important pages are crawlable

3. 404 Link Verification
   - Scans all pages for broken links
   - Verifies no 404 errors in navigation

