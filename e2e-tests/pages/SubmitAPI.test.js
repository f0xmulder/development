const puppeteer = require('puppeteer')
const { analyzeAccessibility } = require('../accessibility')

const isDebugging = () =>
    process.env.NODE_ENV === 'debug'

const getConfig = isDebugging =>
    isDebugging ? {
        headless: false,
        sloMo: 250,
        devtools: true,
        ignoreHTTPSErrors: true
    } : {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    };

const getBaseUrl = () => process.env.URL

describe('Submit API', () => {
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

    describe('navigating to the Submit API page', () => {
        beforeAll(async () => {
            await page.click('.Navigation li:nth-child(3) a')
        })

        it('should show the page title', async () => {
            const html = await page.$eval('main h1', e => e.innerHTML)
            expect(html).toBe('API toevoegen')
        })

        it('should not have accessibility issues', async () => {
            const accessibilityReport = await analyzeAccessibility(
                page,
                `overview.accessibility.png`,
            );

            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        })
    })
})
