// const { analyzeAccessibility } = require('../accessibility')
// const { getBaseUrl, isDebugging } = require('../environment')

// describe('Submit Event', () => {
//     beforeAll(async () => {
//         const baseUrl = getBaseUrl(isDebugging());
//         await page.setBypassCSP(true);
//         await page.goto(`${baseUrl}/events/add`, { waitUntil: 'load' });
//     })

//     it('should show the page title', async () => {
//         const html = await page.$eval('main h1', e => e.innerHTML)
//         await page.screenshot({ path: 'screenshots/submit-event.page-title.png' });
//         expect(html).toBe('Event toevoegen')
//     })

//     it('should not have accessibility issues', async () => {
//         const accessibilityReport = await analyzeAccessibility(page, `submit-event.accessibility.png`)
//         expect(accessibilityReport).toHaveNoAccessibilityIssues();
//     })
// })
