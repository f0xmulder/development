const puppeteer = require('puppeteer')
const { analyzeAccessibility } = require('../accessibility')

const { getBaseUrl, isDebugging, getConfig } = require('../prepare-browser')

describe('About', () => {
    let browser
    let page
    let baseUrl

    beforeAll(async () => {
        console.info(`Running E2E tests on ${getBaseUrl()}`)

        const config = getConfig(isDebugging())
        baseUrl = getBaseUrl(isDebugging())

        browser = await puppeteer.launch(config)
        page = await browser.newPage()

        page.emulate({
            viewport: {
                width: 1024,
                height: 768
            },
            userAgent: ''
        })

        await page.goto(baseUrl)
    })

    afterAll(() => {
        browser.close()
    })

    describe('navigating to the About page', () => {
        beforeAll(async () => {
            await page.click('.Navigation li:nth-child(4) a')
        })

        it('should show the page title', async () => {
            const html = await page.$eval('main h1', e => e.innerHTML)
            expect(html).toBe('Over')
        })

        it('should not have accessibility issues', async () => {
            const accessibilityReport = await analyzeAccessibility(
                page,
                `about.accessibility.png`,
            )
            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        })
    })
})
