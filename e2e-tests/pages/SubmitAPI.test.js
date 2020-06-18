const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('Submit API', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging());
        await page.setBypassCSP(true);
        await page.goto(`${baseUrl}/add-api`, { waitUntil: 'load' });
    })

    it('should show the page title', async () => {
        const html = await page.$eval('main h1', e => e.innerHTML)
        await page.screenshot({ path: 'screenshots/submit-api.page-title.png' });
        expect(html).toBe('API toevoegen')
    })

    it('should not have accessibility issues', async () => {
        const accessibilityReport = await analyzeAccessibility(page, `submit-api.accessibility.png`)
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })
})
