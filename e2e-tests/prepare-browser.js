module.exports.isDebugging = () =>
    process.env.NODE_ENV === 'debug'

module.exports.getConfig = isDebugging =>
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

module.exports.getBaseUrl = () => process.env.URL
