const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('API Overview', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/apis`, { waitUntil: 'load' });
        await page.waitForSelector('[data-test="total"]');
    })

    it('should not have accessibility issues', async () => {
        const accessibilityReport = await analyzeAccessibility(page, `api-overview.accessibility.png`)
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })
})
