const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('Overview', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/apis`, { waitUntil: 'load' });
    })

    it('should not have accessibility issues', async () => {
        const accessibilityReport = await analyzeAccessibility(page, `overview.accessibility.png`)
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })
})
