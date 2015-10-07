var server = require('./server');
var wd = require("wd");
var TouchAction = wd.TouchAction;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('touch dnd', function () {
    before(function (done) {
        server.start(done);
    });

    after(function () {
        server.close();
    });

    beforeEach(function () {
        browser.driver.get('http://localhost:3000/');
    });

    it('should be able to reorder top 2 items', function (done) {
        this.timeout(30000);

        // var firstEl = browser.driver.findElement(by.css('.item:first-child'));
        // var secondEl = browser.driver.findElement(by.css('.item:nth-child(2)'));
        browser.driver.findElement(by.css('.item:first-child'))
            .then(function (el) {
                var action = new TouchAction(wdBrowser);
                console.log(el);
                console.log(wdBrowser.swEl(el));
                action
                    .press({ el: wdBrowser.swEl(el), x: 10, y: 10})
                    .wait(500)
                    .moveTo({ x: 10, y: 70 })
                    .release();

                return action.perform();
            })
            .then(function () {
                return wdBrowser.wdEl(element(by.css('li:first-child'))).text();
            })
            .then(function (text) {
                expect(text).to.equal('1 Item');
                done();
            })
            .catch(done);
    });
});