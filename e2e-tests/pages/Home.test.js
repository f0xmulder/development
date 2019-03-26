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

describe('Home', () => {
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

    it('should not have accessibility issues', async () => {
        await page.goto(baseUrl, { waitUntil: 'load' });
        const accessibilityReport = await analyzeAccessibility(
            page,
            `home.accessibility.png`,
        );

        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })

    it('should show the page title', async () => {
        const html = await page.$eval('main h1', e => e.innerHTML)
        await page.screenshot({ path: 'screenshots/01-homepage-is-visible.png' });
        expect(html).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid')
    })
})
