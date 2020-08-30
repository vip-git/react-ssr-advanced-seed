/* eslint-disable */
// Library
const webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
  'browserName': 'Chrome',
  'browser_version': '79.0',
  'os': 'Windows',
  'os_version': '10',
  'resolution': '1024x768',
  'browserstack.user': 'bsuser10422',
  'browserstack.key': 'cmffipt5pwL4c5QyRwji',
  'build': 'React SSR Advanced Seed',
  'name': 'React SSR Advanced Seed'
}

var driver = new webdriver.Builder().
usingServer('http://hub-cloud.browserstack.com/wd/hub').
withCapabilities(capabilities).
build();

driver.get('https://confident-mestorf-ab8ce9.netlify.com');
driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
driver.findElement(webdriver.By.name('btnG')).click();

driver.getTitle().then(function (title) {
    console.log(title);
});

driver.quit();