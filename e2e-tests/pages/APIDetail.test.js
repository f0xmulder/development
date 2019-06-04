const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('API Detail', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/overzicht`, { waitUntil: 'load' });
    })

    describe('navigating to the first API Detail page', () => {
        beforeAll(async () => {
            await page.waitForSelector('[data-test="link"]')

            await Promise.all([
                page.waitForNavigation(),
                page.click('[data-test="link"]')
            ]);
        })

        it('should contain a link to the API specification', async () => {
            await page.waitForSelector('[data-test="api-specification"]')
            const apiSpecificationLinkText = await page.$eval('[data-test="api-specification"] a', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/api-detail.specification.png' });
            expect(apiSpecificationLinkText).toBe('Lees meer')
        })

        it('should not have accessibility issues', async () => {
            const accessibilityReport = await analyzeAccessibility(page, `api-detail.accessibility.png`)
            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        })
    })
})
