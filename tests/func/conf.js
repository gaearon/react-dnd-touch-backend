exports.config = {
    // sauceUser: process.env.SAUCE_USERNAME,
    // sauceKey: process.env.SAUCE_ACCESS_KEY,
    seleniumAddress: 'http://localhost:4723/wd/hub',
    specs: ['dnd.spec.js'],
    framework: 'mocha',
    baseUrl: 'http://localhost:3000',
    name: process.env.TRAVIS_BRANCH || 'manual',
    multiCapabilities: [
        {
            browserName: 'Safari',
            platformVersion: '9.0',
            platformName: 'iOS',
            deviceName: 'iPhone Simulator',
            // tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        },
        // {
        //     browserName: 'android',
        //     platformVersion: '4.4.2',
        //     platformName: 'Android',
        //     tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        // }
    ],
    build: process.env.TRAVIS_BUILD_NUMBER,
    tags: [
        process.env.TRAVIS_PULL_REQUEST,
        process.env.TRAVIS_BRANCH,
        process.env.TRAVIS_BUILD_NUMBER
    ],
    onPrepare: function () {
        var wd = require('wd');
        var protractor = require('protractor');
        var wdBridge = require('wd-bridge')(protractor, wd);

        wdBridge.initFromProtractor(exports.config);
    }
};