/* eslint-disable */
const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words(),
};

describe('H1 Text', () => {
  test('h1 loads correctly', async () => {
    const browser = await puppeteer.launch({
	  headless: false,
    });
    const page = await browser.newPage();

    page.emulate({
	  viewport: {
        width: 500,
        height: 2400,
	  },
	  userAgent: '',
    });

    await page.goto('http://localhost:3002/');
    await page.waitForSelector('.App-title');

    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');

    browser.close();
  }, 16000);
});
