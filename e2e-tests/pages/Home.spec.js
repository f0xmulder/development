// const { analyzeAccessibility } = require('../accessibility')
// const { getBaseUrl, isDebugging } = require('../environment')

describe('Home', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
//     beforeAll(async () => {
//         const baseUrl = getBaseUrl(isDebugging());
//         await page.setBypassCSP(true);
//         await page.goto(baseUrl, { waitUntil: 'load' });
//         await page.waitForSelector('main h1');
//     })

//     it('should show the page title', async () => {
//         const html = await page.$eval('main h1', e => e.innerHTML)
//         await page.screenshot({ path: 'screenshots/home.page-title.png' });
//         expect(html).toBe('Eén centrale plek voor de developer die voor of met de overheid ontwikkelt')
//     })

//     it('should not have accessibility issues', async () => {
//         const accessibilityReport = await analyzeAccessibility(page, `home.accessibility.png`)
//         expect(accessibilityReport).toHaveNoAccessibilityIssues();
//     })
})
