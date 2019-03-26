const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('About', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging())
        await page.goto(`${baseUrl}/overzicht`, { waitUntil: 'load' });
    })

    it('should show the page title', async () => {
        const html = await page.$eval('main h1', e => e.innerHTML)
        await page.screenshot({ path: 'screenshots/overview.page-title.png' })
        expect(html).toBe(`Overzicht van alle beschikbare API's`)
    })

    it('should not have accessibility issues', async () => {
        const accessibilityReport = await analyzeAccessibility(page, `overview.accessibility.png`)
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })
})
