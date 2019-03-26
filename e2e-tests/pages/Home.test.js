const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('Home', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging())
        await page.goto(baseUrl, { waitUntil: 'load' });
    })

    it('should show the page title', async () => {
        const html = await page.$eval('main h1', e => e.innerHTML)
        await page.screenshot({ path: 'screenshots/home.page-title.png' });
        expect(html).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid')
    })

    it('should not have accessibility issues', async () => {
        const accessibilityReport = await analyzeAccessibility(page, `home.accessibility.png`)
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })
})
