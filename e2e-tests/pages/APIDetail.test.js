const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('API Detail', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging())
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

        it('should contain the page documentation label', async () => {
            await page.waitForSelector('dl dt')
            const apiDocumentationLabel = await page.$eval('dl dt', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/api-detail.documentation-label.png' });
            expect(apiDocumentationLabel).toBe('Documentatie')
        })

        it('should not have accessibility issues', async () => {
            const accessibilityReport = await analyzeAccessibility(page, `api-detail.accessibility.png`)
            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        })
    })
})
