// const { analyzeAccessibility } = require('../accessibility')
// const { getBaseUrl, isDebugging } = require('../environment')

// describe('Event Overview', () => {
//     beforeAll(async () => {
//         const baseUrl = getBaseUrl(isDebugging());
//         await page.setBypassCSP(true);
//         await page.goto(`${baseUrl}/events`, { waitUntil: 'load' });
//     })

//     it('should not have accessibility issues', async () => {
//         const accessibilityReport = await analyzeAccessibility(page, `event-overview.accessibility.png`)
//         expect(accessibilityReport).toHaveNoAccessibilityIssues();
//     })
// })
