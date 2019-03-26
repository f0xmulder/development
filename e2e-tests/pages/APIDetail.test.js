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

describe('API Detail', () => {
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

    describe('navigating to the first API Detail page', () => {
        beforeAll(async () => {
            await Promise.all([
                page.waitForNavigation(),
                page.click('.Navigation li:nth-child(2) a')
            ]);

            await page.waitForSelector('[data-test="link"]')

            await Promise.all([
                page.waitForNavigation(),
                page.click('[data-test="link"]')
            ]);
        })

        it('should contain the page documentation label', async () => {
            await page.waitForSelector('dl dt')
            const apiDocumentationLabel = await page.$eval('dl dt', e => e.innerHTML)
            expect(apiDocumentationLabel).toBe('Documentatie')
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
