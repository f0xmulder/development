const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('Code Overview', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/code`, { waitUntil: 'load' });
        await page.waitForSelector('[data-test="total"]');
    })

    it('should not have accessibility issues', async () => {
        const accessibilityReport = await analyzeAccessibility(page, `code-overview.accessibility.png`)
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })
})
