const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('API Detail', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/apis`, { waitUntil: 'load' });
    })

    describe('navigating to the first API Detail page', () => {
        beforeAll(async () => {
            await page.setViewport({
                width: 1024,
                height: 768,
                deviceScaleFactor: 1,
            });

            await page.waitForSelector('[data-test="link"]')

            await Promise.all([
                page.waitForNavigation(),
                page.click('[data-test="link"]')
            ]);
        })

        it('should contain a link to the API specification', async () => {
            await page.waitForSelector('[data-test="api-specification-url"]')
            const apiSpecificationLinkText = await page.$eval('[data-test="api-specification-url"]', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/api-detail.specification.png' });
            expect(apiSpecificationLinkText).toEqual(expect.stringContaining('Specificatie'))
        })

        it('should not have accessibility issues', async () => {
            const accessibilityReport = await analyzeAccessibility(page, `api-detail.accessibility.png`)
            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        })
    })
})

const REST_TYPES = [
    'rest_json',
    'rest_xml',
]
const NON_REST_TYPES = [
    'unknown',
    'soap_xml',
    'grpc',
    'graphql',
    'sparql',
    'wfs',
    'wms',
]

describe('API Detail for REST API', () => {
    beforeAll(async () => {
        // Search for REST API's
        const queryString = REST_TYPES.map((type) => `type=${type}`).join('&')

        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/apis?${queryString}`, { waitUntil: 'load' });

        // Navigate to the first API Detail page
        await page.setViewport({
            width: 1024,
            height: 768,
            deviceScaleFactor: 1,
        });

        await page.waitForSelector('[data-test="link"]')

        await Promise.all([
            page.waitForNavigation(),
            page.click('[data-test="link"]')
        ]);
    })

    describe('opening the Design Rules score drawer', () => {
        beforeAll(async () => {
            await page.waitForSelector('[data-testid="score-detail-link-desktop"]')

            await Promise.all([
                page.waitForNavigation(),
                page.click('[data-testid="score-detail-link-desktop"]')
            ]);

            // Wait for drawer opening animation
            await page.waitFor(2000)
        })

        it('should show the page title', async () => {
            // Grab the h1 inside the drawer
            const html = await page.$eval('[data-testid="content"] h1', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/design-rules-score-detail.page-title.png' });
            expect(html).toBe('Opbouw API Score')
        })

        it('should not have accessibility issues', async () => {
            const accessibilityReport = await analyzeAccessibility(page, `design-rules-score-detail.accessibility.png`)
            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        })
    })
})

describe('API Detail for non-REST API', () => {
    beforeAll(async () => {
        // Search for non-REST API's
        const queryString = NON_REST_TYPES.map((type) => `type=${type}`).join('&')

        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/apis?${queryString}`, { waitUntil: 'load' });

        // Navigate to the first API Detail page
        await page.setViewport({
            width: 1024,
            height: 768,
            deviceScaleFactor: 1,
        });

        await page.waitForSelector('[data-test="link"]')

        await Promise.all([
            page.waitForNavigation(),
            page.click('[data-test="link"]')
        ]);
    })

    describe('opening the API score drawer', () => {
        beforeAll(async () => {
            await page.waitForSelector('[data-testid="score-detail-link-desktop"]')

            await Promise.all([
                page.waitForNavigation(),
                page.click('[data-testid="score-detail-link-desktop"]')
            ]);

            // Wait for drawer opening animation
            await page.waitFor(2000)
        })

        it('should show the page title', async () => {
            // Grab the h1 inside the drawer
            const html = await page.$eval('[data-testid="content"] h1', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/api-score-detail.page-title.png' });
            expect(html).toBe('Opbouw API Score')
        })

        it('should not have accessibility issues', async () => {
            const accessibilityReport = await analyzeAccessibility(page, `api-score-detail.accessibility.png`)
            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        })
    })
})
