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

        describe('opening the score details drawer', async () => {
            beforeAll(async () => {
                await Promise.all([
                    page.waitForNavigation(),
                    page.click('[data-testid="score-detail-link-desktop"]')
                ]);
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
})
