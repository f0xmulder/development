const puppeteer = require('puppeteer')
const { analyzeAccessibility } = require('./accessibility')

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

describe('on page load', () => {
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

    describe('the Homepage', () => {
        it('should not have accessibility issues', async () => {
            await page.goto(baseUrl, { waitUntil: 'load' });
            const accessibilityReport = await analyzeAccessibility(
                page,
                `home.accessibility.png`,
            );

            expect(accessibilityReport).toHaveNoAccessibilityIssues();
        });
    })

    test('homepage is visible', async () => {
        const html = await page.$eval('main h1', e => e.innerHTML)
        await page.screenshot({ path: 'screenshots/01-homepage-is-visible.png' });
        expect(html).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid')
    })

    describe('navigating to the About page', () => {
        beforeAll(async () => {
            await page.click('.Navigation li:nth-child(4) a')
        })

        test('about page is visible', async () => {
            const html = await page.$eval('main h1', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/02-about-page-is-visible.png' });
            expect(html).toBe('Over')
        })
    })

    describe('navigating to the Overview page', () => {
        beforeAll(async () => {
            await page.click('.Navigation li:nth-child(2) a')
        })

        test('overview page is visible', async () => {
            const html = await page.$eval('main h1', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/03-overview-page-is-visible.png' });
            expect(html).toBe(`Overzicht van alle beschikbare API's`)
        })
    })

    describe('navigating to the Submit API page', () => {
        beforeAll(async () => {
            await page.click('.Navigation li:nth-child(3) a')
        })

        test('submit API page is visible', async () => {
            const html = await page.$eval('main h1', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/04-submit-api-page-is-visible.png' });
            expect(html).toBe('API toevoegen')
        })
    })

    describe('navigating to the first API detail page', () => {
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

        test('detail page is visible', async () => {
            await page.waitForSelector('dl dt')
            const apiDocumentationLabel = await page.$eval('dl dt', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/04-api-detail-page-is-visible.png' })
            expect(apiDocumentationLabel).toBe('Documentatie')
        })
    })
})
