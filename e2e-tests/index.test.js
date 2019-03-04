const puppeteer = require('puppeteer')

const devEnvironment = 'http://localhost:3000'
const prodEnvironment = 'https://don.commonground.nl'

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

const getBaseUrl = isDebugging =>
    isDebugging ? devEnvironment : prodEnvironment;

describe('on page load', () => {
    let browser
    let page
    let baseUrl

    beforeAll(async () => {
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

    test('homepage is visible', async () => {
        const html = await page.$eval('h1', e => e.innerHTML)
        await page.screenshot({ path: 'screenshots/01-homepage-is-visible.png' });
        expect(html).toBe('API overview')
    })

    describe('navigating to the About page', () => {
        beforeAll(async () => {
            await page.click('hr + ul li:nth-child(3) a')
        })

        test('about page is visible', async () => {
            const html = await page.$eval('h1', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/02-about-page-is-visible.png' });
            expect(html).toBe('About')
        })
    })

    describe('navigating to the Submit API page', () => {
        beforeAll(async () => {
            await page.click('hr + ul li:nth-child(2) a')
        })

        test('submit API page is visible', async () => {
            const html = await page.$eval('h1', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/03-submit-api-page-is-visible.png' });
            expect(html).toBe('Submit your API')
        })
    })

    describe('navigating to the first API detail page', () => {
        beforeAll(async () => {
            await Promise.all([
                page.waitForNavigation(),
                page.click('hr + ul li:nth-child(1) a')
            ]);

            await page.waitForSelector('[data-test="link"]')

            await Promise.all([
                page.waitForNavigation(),
                page.click('[data-test="link"]')
            ]);
        })

        test('detail page is visible', async () => {
            await page.waitForSelector('dl dt')
            const apiUrlLabel = await page.$eval('dl dt', e => e.innerHTML)
            await page.screenshot({ path: 'screenshots/04-api-detail-page-is-visible.png' })
            expect(apiUrlLabel).toBe('API URL')
        })
    })
})
